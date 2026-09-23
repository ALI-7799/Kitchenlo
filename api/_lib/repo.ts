/**
 * Every query the site makes, in one place.
 *
 * Both the serverless functions and the build-time generator import from here,
 * which is the same discipline src/data/recipes.ts already applies to the
 * recipe list: one definition, so the API and the generated HTML cannot
 * disagree about what the library contains.
 *
 * All SQL goes through the `postgres` tagged template, so every interpolated
 * value is sent as a bound parameter. There is no string concatenation into a
 * query anywhere in this file, which is what rules out SQL injection rather
 * than any filtering of the input.
 */
import { db } from './db.js';
import { notFound, conflict } from './http.js';
import {
  rowToRecipe,
  recipeToRow,
  type RecipeRecord,
  type RecipeRow
} from './recipe-row.js';

/* -------------------------------------------------------------- recipes -- */

/** Column list shared by every recipe SELECT, so they all return the same shape. */
const RECIPE_SELECT = `
  slug, title, description, intro, category, cuisine, course, method,
  diet, keywords, image, image_alt, prep_minutes, cook_minutes, servings,
  yield_text, difficulty, rating, rating_count, date_published, date_modified,
  nutrition, equipment, ingredients, instructions, tips, variations, storage,
  faqs, related, video_url, video_poster, video_title, video_seconds, published
`;

/**
 * Every published recipe, ordered the way the generator expects.
 *
 * `includeDrafts` exists for the admin list; the build and the public API
 * never pass it, so an unfinished recipe cannot reach the live site or the
 * sitemap.
 */
export async function allRecipes(
  options: { includeDrafts?: boolean } = {}
): Promise<RecipeRecord[]> {
  const sql = db();
  const rows = options.includeDrafts
    ? await sql<RecipeRow[]>`
        select ${sql.unsafe(RECIPE_SELECT)} from recipes order by title asc`
    : await sql<RecipeRow[]>`
        select ${sql.unsafe(RECIPE_SELECT)} from recipes
         where published = true order by title asc`;

  return rows.map(rowToRecipe);
}

export async function recipeBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Promise<RecipeRecord | null> {
  const sql = db();
  const rows = options.includeDrafts
    ? await sql<RecipeRow[]>`
        select ${sql.unsafe(RECIPE_SELECT)} from recipes where slug = ${slug} limit 1`
    : await sql<RecipeRow[]>`
        select ${sql.unsafe(RECIPE_SELECT)} from recipes
         where slug = ${slug} and published = true limit 1`;

  const row = rows[0];
  return row ? rowToRecipe(row) : null;
}

/**
 * Inserts a recipe, failing if the slug is taken.
 *
 * Create and update are separate functions rather than one upsert because the
 * admin UI needs the distinction: POSTing a slug that already exists is a
 * mistake worth a 409, not a silent overwrite of someone else's work.
 */
export async function createRecipe(recipe: RecipeRecord): Promise<RecipeRecord> {
  const sql = db();
  const row = recipeToRow(recipe);

  const existing = await sql`select 1 from recipes where slug = ${recipe.slug} limit 1`;
  if (existing.length) throw conflict(`A recipe with the slug "${recipe.slug}" already exists`);

  const inserted = await sql<RecipeRow[]>`
    insert into recipes ${sql(row)}
    returning ${sql.unsafe(RECIPE_SELECT)}
  `;
  return rowToRecipe(inserted[0]!);
}

/** Applies a partial update. Absent fields are left as they are. */
export async function updateRecipe(
  slug: string,
  patch: Partial<RecipeRecord>
): Promise<RecipeRecord> {
  const sql = db();

  // Build the row from the patch alone, then drop the keys the caller did not
  // supply. Passing the whole row would reset every unmentioned column to its
  // default, quietly wiping fields the admin form did not happen to include.
  const full = recipeToRow({ ...(patch as RecipeRecord) });
  const columns = columnsFor(patch);
  if (!columns.length) {
    const current = await recipeBySlug(slug, { includeDrafts: true });
    if (!current) throw notFound(`No recipe with the slug "${slug}"`);
    return current;
  }

  const row: Record<string, unknown> = {};
  for (const column of columns) row[column] = full[column];

  const updated = await sql<RecipeRow[]>`
    update recipes set ${sql(row)}
     where slug = ${slug}
    returning ${sql.unsafe(RECIPE_SELECT)}
  `;

  const result = updated[0];
  if (!result) throw notFound(`No recipe with the slug "${slug}"`);
  return rowToRecipe(result);
}

/** Maps the camelCase fields present in a patch to the columns they write. */
function columnsFor(patch: Partial<RecipeRecord>): string[] {
  const map: Record<string, string | string[]> = {
    slug: 'slug', title: 'title', description: 'description', intro: 'intro',
    category: 'category', cuisine: 'cuisine', course: 'course', method: 'method',
    diet: 'diet', keywords: 'keywords', image: 'image', imageAlt: 'image_alt',
    prepMinutes: 'prep_minutes', cookMinutes: 'cook_minutes',
    servings: 'servings', yieldText: 'yield_text', difficulty: 'difficulty',
    rating: 'rating', ratingCount: 'rating_count',
    datePublished: 'date_published', dateModified: 'date_modified',
    nutrition: 'nutrition', equipment: 'equipment', ingredients: 'ingredients',
    instructions: 'instructions', tips: 'tips', variations: 'variations',
    storage: 'storage', faqs: 'faqs', related: 'related',
    published: 'published',
    // One field fans out to four columns, so clearing a video clears all of it.
    video: ['video_url', 'video_poster', 'video_title', 'video_seconds']
  };

  const columns: string[] = [];
  for (const [field, column] of Object.entries(map)) {
    if (patch[field as keyof RecipeRecord] === undefined) continue;
    if (Array.isArray(column)) columns.push(...column);
    else columns.push(column);
  }
  return columns;
}

export async function deleteRecipe(slug: string): Promise<void> {
  const sql = db();
  const deleted = await sql`delete from recipes where slug = ${slug} returning slug`;
  if (!deleted.length) throw notFound(`No recipe with the slug "${slug}"`);

  // A deleted recipe may still be named in other recipes' `related` lists, and
  // requireBySlug() in the generator turns a dangling slug into a failed build.
  // Removing the references here means deleting a recipe cannot break the next
  // deploy.
  await sql`
    update recipes
       set related = array_remove(related, ${slug})
     where ${slug} = any(related)
  `;
}

/* --------------------------------------------------------------- search -- */

export interface SearchHit extends RecipeRecord {
  rank: number;
}

/**
 * Full-text search over title, keywords, description, cuisine, diet and
 * ingredients — the same fields searchIndex() covers in src/data/recipes.ts,
 * so the API and the client-side fallback agree on what matches.
 *
 * `websearch_to_tsquery` is used rather than `plainto_tsquery` because it
 * accepts what people actually type — quoted phrases, OR, a leading minus to
 * exclude — and, unlike `to_tsquery`, never throws on malformed input, which
 * would otherwise turn a stray quote into a 500.
 */
export async function searchRecipes(
  term: string,
  options: { category?: string; diet?: string[]; limit?: number } = {}
): Promise<SearchHit[]> {
  const sql = db();
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
  const category = options.category || null;
  const diet = options.diet?.length ? options.diet : null;

  const rows = await sql<(RecipeRow & { rank: number })[]>`
    select ${sql.unsafe(RECIPE_SELECT)},
           ts_rank(search_vector, websearch_to_tsquery('english', ${term})) as rank
      from recipes
     where published = true
       and search_vector @@ websearch_to_tsquery('english', ${term})
       and (${category}::text is null or category = ${category})
       and (${diet}::text[] is null or diet @> ${diet})
     order by rank desc, title asc
     limit ${limit}
  `;

  if (rows.length) {
    return rows.map((row) => ({ ...rowToRecipe(row), rank: Number(row.rank) }));
  }

  // Nothing matched. Fall back to trigram similarity on the title, which is
  // what rescues a misspelling ("stroganof") that full-text search cannot stem
  // its way to.
  const fuzzy = await sql<(RecipeRow & { rank: number })[]>`
    select ${sql.unsafe(RECIPE_SELECT)}, similarity(title, ${term}) as rank
      from recipes
     where published = true
       and similarity(title, ${term}) > 0.2
       and (${category}::text is null or category = ${category})
       and (${diet}::text[] is null or diet @> ${diet})
     order by rank desc
     limit ${limit}
  `;

  return fuzzy.map((row) => ({ ...rowToRecipe(row), rank: Number(row.rank) }));
}

/* ----------------------------------------------------------- taxonomies -- */

export interface CategoryRow {
  slug: string; title: string; short: string; tagline: string;
  description: string; intro: string; image: string; image_alt: string;
  keywords: string[] | null; position: number;
}

export async function allCategories(): Promise<CategoryRow[]> {
  return db()<CategoryRow[]>`
    select slug, title, short, tagline, description, intro, image, image_alt,
           keywords, position
      from categories order by position asc, title asc`;
}

export interface CollectionRow {
  slug: string; title: string; heading: string; description: string;
  keywords: string[] | null; image: string; image_alt: string;
  intro: unknown; faqs: unknown; filter: unknown; slugs: string[] | null;
  position: number;
}

export async function allCollections(): Promise<CollectionRow[]> {
  return db()<CollectionRow[]>`
    select slug, title, heading, description, keywords, image, image_alt,
           intro, faqs, filter, slugs, position
      from collections order by position asc, title asc`;
}

export interface GuideRow {
  slug: string; title: string; description: string; excerpt: string;
  image: string; image_alt: string; read_minutes: number;
  date_published: Date | string; date_modified: Date | string;
  keywords: string[] | null; related: string[] | null;
  body: unknown; faqs: unknown;
}

export async function allGuides(): Promise<GuideRow[]> {
  return db()<GuideRow[]>`
    select slug, title, description, excerpt, image, image_alt, read_minutes,
           date_published, date_modified, keywords, related, body, faqs
      from guides where published = true order by date_published desc`;
}

/* ------------------------------------------------- recipe of the day ----- */

/**
 * The pinned recipe for a date, if an admin set one.
 *
 * Returning null is the normal case and means "use the computed choice" —
 * recipeOfTheDay() in src/data/recipes.ts, which derives the pick from the
 * date alone. Overrides are the exception, not the mechanism.
 */
export async function rotdOverrideFor(isoDate: string): Promise<string | null> {
  const rows = await db()<{ recipe_slug: string }[]>`
    select o.recipe_slug
      from rotd_overrides o
      join recipes r on r.slug = o.recipe_slug and r.published = true
     where o.on_date = ${isoDate}::date
     limit 1
  `;
  return rows[0]?.recipe_slug ?? null;
}

/** All overrides from today forward, for the admin calendar. */
export async function upcomingOverrides(): Promise<{ on_date: string; recipe_slug: string; note: string }[]> {
  const rows = await db()<{ on_date: Date | string; recipe_slug: string; note: string }[]>`
    select on_date, recipe_slug, note
      from rotd_overrides
     where on_date >= current_date
     order by on_date asc
     limit 90
  `;
  return rows.map((r) => ({
    on_date: typeof r.on_date === 'string' ? r.on_date.slice(0, 10)
      : r.on_date.toISOString().slice(0, 10),
    recipe_slug: r.recipe_slug,
    note: r.note
  }));
}

export async function setRotdOverride(
  isoDate: string,
  slug: string,
  note = ''
): Promise<void> {
  await db()`
    insert into rotd_overrides (on_date, recipe_slug, note)
    values (${isoDate}::date, ${slug}, ${note})
    on conflict (on_date) do update
      set recipe_slug = excluded.recipe_slug, note = excluded.note
  `;
}

export async function clearRotdOverride(isoDate: string): Promise<void> {
  await db()`delete from rotd_overrides where on_date = ${isoDate}::date`;
}

/* ------------------------------------------------------------ analytics -- */

/**
 * Records one page view.
 *
 * Aggregated on write: one row per (path, date, referrer bucket) with a
 * counter, rather than one row per hit. The table therefore grows with the
 * size of the site and not with its traffic, and there is no per-visitor row
 * that could be correlated even in principle.
 */
export async function recordView(path: string, referrer: string): Promise<void> {
  await db()`
    insert into page_views (path, on_date, referrer, views)
    values (${path}, current_date, ${referrer}, 1)
    on conflict (path, on_date, referrer) do update
      set views = page_views.views + 1
  `;
}

export async function recordSearch(term: string, hits: number): Promise<void> {
  await db()`
    insert into search_queries (term, on_date, searches, hits)
    values (${term}, current_date, 1, ${hits})
    on conflict (term, on_date) do update
      set searches = search_queries.searches + 1,
          hits = excluded.hits
  `;
}

export interface Stats {
  totals: { recipes: number; drafts: number; guides: number; collections: number };
  views: { today: number; week: number; month: number };
  topRecipes: { path: string; views: number }[];
  topSearches: { term: string; searches: number; hits: number }[];
  missedSearches: { term: string; searches: number }[];
  daily: { on_date: string; views: number }[];
}

/** Everything the admin dashboard shows, in one round trip per panel. */
export async function stats(): Promise<Stats> {
  const sql = db();

  const [totals, views, topRecipes, topSearches, missedSearches, daily] = await Promise.all([
    sql<{ recipes: number; drafts: number; guides: number; collections: number }[]>`
      select
        (select count(*) from recipes where published = true)  as recipes,
        (select count(*) from recipes where published = false) as drafts,
        (select count(*) from guides)                          as guides,
        (select count(*) from collections)                     as collections`,
    sql<{ today: number; week: number; month: number }[]>`
      select
        coalesce(sum(views) filter (where on_date = current_date), 0)               as today,
        coalesce(sum(views) filter (where on_date > current_date - 7), 0)           as week,
        coalesce(sum(views) filter (where on_date > current_date - 30), 0)          as month
      from page_views`,
    sql<{ path: string; views: number }[]>`
      select path, sum(views)::int as views
        from page_views
       where on_date > current_date - 30 and path like '/recipes/%'
       group by path order by views desc limit 10`,
    sql<{ term: string; searches: number; hits: number }[]>`
      select term, sum(searches)::int as searches, max(hits)::int as hits
        from search_queries
       where on_date > current_date - 30
       group by term order by searches desc limit 10`,
    // Searches that found nothing are the most actionable number here: they
    // are people asking for a recipe the site does not have yet.
    sql<{ term: string; searches: number }[]>`
      select term, sum(searches)::int as searches
        from search_queries
       where on_date > current_date - 30 and hits = 0
       group by term order by searches desc limit 10`,
    sql<{ on_date: Date | string; views: number }[]>`
      select on_date, sum(views)::int as views
        from page_views
       where on_date > current_date - 30
       group by on_date order by on_date asc`
  ]);

  return {
    totals: totals[0] ?? { recipes: 0, drafts: 0, guides: 0, collections: 0 },
    views: views[0] ?? { today: 0, week: 0, month: 0 },
    topRecipes,
    topSearches,
    missedSearches,
    daily: daily.map((d) => ({
      on_date: typeof d.on_date === 'string'
        ? d.on_date.slice(0, 10)
        : d.on_date.toISOString().slice(0, 10),
      views: d.views
    }))
  };
}
