/**
 * Translation between a `recipes` row and the authored `RecipeSource` shape.
 *
 * This module is the seam that lets the database replace the TypeScript recipe
 * literals without anything downstream noticing. The generator, the templates
 * and the browser all keep consuming `RecipeSource` / `Recipe` exactly as they
 * do today; only where those objects come from changes.
 *
 * It is deliberately pure — no database client, no environment, no I/O — so
 * both the serverless functions and the build-time generator can import it,
 * and so a round-trip can be unit-tested without a database.
 *
 * The round-trip property that matters:
 *
 *     rowToRecipe(recipeToRow(r))  deep-equals  r
 *
 * tools/migrate.ts asserts exactly that against all 55 recipes before it
 * writes anything, which is what makes the migration provably lossless.
 */
import type {
  CategorySlug,
  DietTag,
  Difficulty,
  Faq,
  IngredientGroup,
  InstructionStep,
  Nutrition,
  RecipeSource,
  RecipeVideo
} from '../../src/types.js';

/**
 * A recipe plus the fields that exist only in the database.
 *
 * Both extras now live on RecipeSource itself as optional fields, so that the
 * generator and the browser can read a video off a pulled recipe without
 * importing anything from api/. This alias remains because it names the
 * intent — "a row, fully populated" — at the call sites in this module.
 */
export type RecipeRecord = RecipeSource;

export type { RecipeVideo } from '../../src/types.js';

/** The snake_case row as Postgres returns it. */
export interface RecipeRow {
  slug: string;
  title: string;
  description: string;
  intro: string;
  category: string;
  cuisine: string;
  course: string;
  method: string;
  diet: string[] | null;
  keywords: string[] | null;
  image: string | null;
  image_alt: string;
  prep_minutes: number;
  cook_minutes: number;
  servings: number;
  yield_text: string;
  difficulty: string;
  rating: string | number;
  rating_count: number;
  date_published: Date | string;
  date_modified: Date | string;
  nutrition: unknown;
  equipment: string[] | null;
  ingredients: unknown;
  instructions: unknown;
  tips: string[] | null;
  variations: string[] | null;
  storage: string;
  faqs: unknown;
  related: string[] | null;
  video_url: string | null;
  video_poster: string | null;
  video_title: string | null;
  video_seconds: number | null;
  published: boolean;
}

/* ------------------------------------------------------------ coercion --- */

const NUTRITION_KEYS = [
  'calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'
] as const;

function textArray(value: string[] | null | undefined): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === 'string') : [];
}

/**
 * Postgres `date` columns come back as a Date in some drivers and a string in
 * others, and a Date would serialise to a full ISO timestamp. The authored
 * shape is a plain `YYYY-MM-DD`, and it reaches the sitemap's <lastmod> and
 * the Recipe schema's datePublished, so it is pinned to that form here rather
 * than trusted to whatever the driver felt like returning.
 */
function isoDate(value: Date | string | null | undefined): string {
  if (!value) return '';
  if (value instanceof Date) {
    // Read the UTC parts rather than toISOString() on a local-midnight Date,
    // which can roll backwards a day for negative offsets.
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, '0');
    const d = String(value.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value).slice(0, 10);
}

function nutritionFrom(value: unknown): Nutrition {
  const source = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>;
  const out = {} as Nutrition;
  for (const key of NUTRITION_KEYS) {
    const raw = source[key];
    out[key] = typeof raw === 'number' && Number.isFinite(raw) ? raw : Number(raw) || 0;
  }
  return out;
}

function ingredientsFrom(value: unknown): IngredientGroup[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): IngredientGroup[] => {
    if (!entry || typeof entry !== 'object') return [];
    const record = entry as Record<string, unknown>;
    return [{
      group: typeof record['group'] === 'string' ? record['group'] : '',
      items: Array.isArray(record['items'])
        ? (record['items'] as unknown[]).filter((i): i is string => typeof i === 'string')
        : []
    }];
  });
}

function instructionsFrom(value: unknown): InstructionStep[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): InstructionStep[] => {
    if (!entry || typeof entry !== 'object') return [];
    const record = entry as Record<string, unknown>;
    return [{
      title: typeof record['title'] === 'string' ? record['title'] : '',
      text: typeof record['text'] === 'string' ? record['text'] : ''
    }];
  });
}

function faqsFrom(value: unknown): Faq[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): Faq[] => {
    if (!entry || typeof entry !== 'object') return [];
    const record = entry as Record<string, unknown>;
    return [{
      q: typeof record['q'] === 'string' ? record['q'] : '',
      a: typeof record['a'] === 'string' ? record['a'] : ''
    }];
  });
}

/* ------------------------------------------------------------- row -> ts -- */

export function rowToRecipe(row: RecipeRow): RecipeRecord {
  const video: RecipeVideo | null = row.video_url
    ? {
        url: row.video_url,
        ...(row.video_poster ? { poster: row.video_poster } : {}),
        ...(row.video_title ? { title: row.video_title } : {}),
        ...(row.video_seconds ? { seconds: row.video_seconds } : {})
      }
    : null;

  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? '',
    intro: row.intro ?? '',
    category: row.category as CategorySlug,
    cuisine: row.cuisine ?? '',
    course: row.course ?? '',
    method: row.method ?? '',
    diet: textArray(row.diet) as DietTag[],
    keywords: textArray(row.keywords),
    // Preserved as null, not coerced to ''. normalise() in src/data/recipes.ts
    // treats null as "generate cover art" and '' as a real (broken) path.
    image: row.image ?? null,
    imageAlt: row.image_alt ?? '',
    prepMinutes: Number(row.prep_minutes) || 0,
    cookMinutes: Number(row.cook_minutes) || 0,
    servings: Number(row.servings) || 1,
    yieldText: row.yield_text ?? '',
    difficulty: row.difficulty as Difficulty,
    // numeric(2,1) arrives as a string from most Postgres drivers; the
    // templates compare and format it as a number.
    rating: Number(row.rating) || 0,
    ratingCount: Number(row.rating_count) || 0,
    datePublished: isoDate(row.date_published),
    dateModified: isoDate(row.date_modified),
    nutrition: nutritionFrom(row.nutrition),
    equipment: textArray(row.equipment),
    ingredients: ingredientsFrom(row.ingredients),
    instructions: instructionsFrom(row.instructions),
    tips: textArray(row.tips),
    variations: textArray(row.variations),
    storage: row.storage ?? '',
    faqs: faqsFrom(row.faqs),
    related: textArray(row.related),
    video,
    published: row.published !== false
  };
}

/* ------------------------------------------------------------- ts -> row -- */

/** Column order used by every insert/upsert, so the two cannot drift. */
export const RECIPE_COLUMNS = [
  'slug', 'title', 'description', 'intro', 'category', 'cuisine', 'course',
  'method', 'diet', 'keywords', 'image', 'image_alt', 'prep_minutes',
  'cook_minutes', 'servings', 'yield_text', 'difficulty', 'rating',
  'rating_count', 'date_published', 'date_modified', 'nutrition', 'equipment',
  'ingredients', 'instructions', 'tips', 'variations', 'storage', 'faqs',
  'related', 'video_url', 'video_poster', 'video_title', 'video_seconds',
  'published'
] as const;

export function recipeToRow(recipe: RecipeRecord): Record<string, unknown> {
  const video = recipe.video ?? null;
  return {
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description ?? '',
    intro: recipe.intro ?? '',
    category: recipe.category,
    cuisine: recipe.cuisine ?? '',
    course: recipe.course ?? '',
    method: recipe.method ?? '',
    diet: recipe.diet ?? [],
    keywords: recipe.keywords ?? [],
    image: recipe.image ?? null,
    image_alt: recipe.imageAlt ?? '',
    prep_minutes: recipe.prepMinutes ?? 0,
    cook_minutes: recipe.cookMinutes ?? 0,
    servings: recipe.servings ?? 1,
    yield_text: recipe.yieldText ?? '',
    difficulty: recipe.difficulty ?? 'Easy',
    rating: recipe.rating ?? 0,
    rating_count: recipe.ratingCount ?? 0,
    date_published: recipe.datePublished,
    date_modified: recipe.dateModified,
    nutrition: nutritionFrom(recipe.nutrition),
    equipment: recipe.equipment ?? [],
    ingredients: recipe.ingredients ?? [],
    instructions: recipe.instructions ?? [],
    tips: recipe.tips ?? [],
    variations: recipe.variations ?? [],
    storage: recipe.storage ?? '',
    faqs: recipe.faqs ?? [],
    related: recipe.related ?? [],
    video_url: video?.url ?? null,
    video_poster: video?.poster ?? null,
    video_title: video?.title ?? null,
    video_seconds: video?.seconds ?? null,
    published: recipe.published !== false
  };
}

/**
 * Strips the database-only fields back off, yielding the exact authored shape.
 * Used by the migration's round-trip check and by `npm run pull`, both of which
 * compare against the original TypeScript literals.
 */
export function toRecipeSource(record: RecipeRecord): RecipeSource {
  const { video: _video, published: _published, ...source } = record;
  return source;
}
