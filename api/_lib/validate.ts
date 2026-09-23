/**
 * Validation for recipe payloads written through the admin API.
 *
 * This is the one place a bad recipe can be stopped. Everything downstream —
 * the generator, the Recipe structured data, the sitemap — assumes the shape
 * is already correct, and a recipe that reaches the database malformed becomes
 * a broken page or, worse, invalid schema.org markup that Search Console only
 * complains about days later.
 *
 * Hand-written rather than pulled from a schema library: the rules are few,
 * they mirror src/types.ts one-for-one, and the error messages can then say
 * something an admin can act on ("Step 3 is missing its text") instead of
 * a path expression.
 */
import type { CategorySlug, DietTag, Difficulty } from '../../src/types.js';
import type { RecipeRecord, RecipeVideo } from './recipe-row.js';
import { badRequest } from './http.js';

export const CATEGORY_SLUGS: CategorySlug[] = [
  'quick-dinners', 'healthy-food', 'breakfast', 'desserts', 'comfort-food'
];

export const DIET_TAGS: DietTag[] = [
  'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
  'high-protein', 'high-fibre', 'low-carb'
];

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

/** Matches the CHECK constraint on recipes.slug, so both agree. */
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

class Problems {
  private readonly list: string[] = [];

  add(message: string): void {
    this.list.push(message);
  }

  /** Throws a single 400 carrying every problem, so one round trip fixes all. */
  throwIfAny(): void {
    if (this.list.length) {
      throw badRequest(
        this.list.length === 1
          ? this.list[0]!
          : `${this.list.length} problems with this recipe`,
        this.list
      );
    }
  }
}

/* ----------------------------------------------------------- primitives -- */

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === 'string' ? v.trim() : ''))
    .filter((v) => v.length > 0);
}

function int(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function num(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''));
  return Number.isFinite(n) ? n : fallback;
}

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    // Strip the combining marks NFKD just split off, so "Creme Brulee" keeps
    // its letters instead of losing the accented ones entirely. Written as
    // escapes because the literal characters are invisible in an editor.
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

const today = (): string => new Date().toISOString().slice(0, 10);

/* -------------------------------------------------------------- recipe --- */

/**
 * Validates and normalises an incoming recipe.
 *
 * `partial` is set for PUT, where an absent field means "leave it alone"
 * rather than "clear it". Required-field checks are skipped in that mode and
 * the caller merges the result over the existing row.
 */
export function parseRecipe(
  input: unknown,
  options: { partial?: boolean } = {}
): Partial<RecipeRecord> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw badRequest('Expected a recipe object');
  }
  const raw = input as Record<string, unknown>;
  const partial = options.partial === true;
  const problems = new Problems();
  const out: Partial<RecipeRecord> = {};

  const has = (key: string): boolean => raw[key] !== undefined;

  /* -- identity -- */

  if (has('slug') || !partial) {
    const title = str(raw['title']);
    const slug = str(raw['slug']) || slugify(title);
    if (!slug) problems.add('A recipe needs a slug, or a title to derive one from');
    else if (!SLUG_RE.test(slug)) {
      problems.add(
        `"${slug}" is not a usable slug — use lowercase letters, numbers and single hyphens`
      );
    } else out.slug = slug;
  }

  if (has('title') || !partial) {
    const title = str(raw['title']);
    if (!title) problems.add('A recipe needs a title');
    else if (title.length > 120) problems.add('Title is longer than 120 characters');
    else out.title = title;
  }

  if (has('description') || !partial) {
    const description = str(raw['description']);
    if (!partial && !description) {
      // This becomes the meta description and the card copy, so an empty one
      // degrades the search result, not just the page.
      problems.add('A recipe needs a description — it is used as the meta description');
    } else if (description.length > 320) {
      problems.add('Description is longer than 320 characters and will be truncated in search results');
    } else out.description = description;
  }

  if (has('intro')) out.intro = str(raw['intro']);

  /* -- taxonomy -- */

  if (has('category') || !partial) {
    const category = str(raw['category']) as CategorySlug;
    if (!CATEGORY_SLUGS.includes(category)) {
      problems.add(`Category must be one of: ${CATEGORY_SLUGS.join(', ')}`);
    } else out.category = category;
  }

  if (has('cuisine')) out.cuisine = str(raw['cuisine']);
  if (has('course')) out.course = str(raw['course']);
  if (has('method')) out.method = str(raw['method']);

  if (has('diet')) {
    const diet = strArray(raw['diet']);
    const unknown = diet.filter((d) => !DIET_TAGS.includes(d as DietTag));
    if (unknown.length) problems.add(`Unknown diet tag(s): ${unknown.join(', ')}`);
    else out.diet = diet as DietTag[];
  }

  if (has('keywords')) out.keywords = strArray(raw['keywords']);

  /* -- imagery -- */

  if (has('image')) {
    const image = str(raw['image']);
    // Empty is stored as null, which is what asks the generator for cover art.
    // Storing '' instead would render <img src=""> and fetch the page itself.
    out.image = image === '' ? null : image;
  }
  if (has('imageAlt')) out.imageAlt = str(raw['imageAlt']);

  /* -- timings -- */

  if (has('prepMinutes')) {
    const v = int(raw['prepMinutes']);
    if (v < 0) problems.add('Prep time cannot be negative');
    else out.prepMinutes = v;
  }
  if (has('cookMinutes')) {
    const v = int(raw['cookMinutes']);
    if (v < 0) problems.add('Cook time cannot be negative');
    else out.cookMinutes = v;
  }
  if (has('servings')) {
    const v = int(raw['servings'], 1);
    if (v < 1) problems.add('Servings must be at least 1');
    else out.servings = v;
  }
  if (has('yieldText')) out.yieldText = str(raw['yieldText']);

  if (has('difficulty')) {
    const d = str(raw['difficulty']) as Difficulty;
    if (!DIFFICULTIES.includes(d)) {
      problems.add(`Difficulty must be one of: ${DIFFICULTIES.join(', ')}`);
    } else out.difficulty = d;
  }

  /* -- ratings -- */

  if (has('rating')) {
    const v = num(raw['rating']);
    if (v < 0 || v > 5) problems.add('Rating must be between 0 and 5');
    else out.rating = v;
  }
  if (has('ratingCount')) {
    const v = int(raw['ratingCount']);
    if (v < 0) problems.add('Rating count cannot be negative');
    else out.ratingCount = v;
  }

  /* -- dates -- */

  for (const key of ['datePublished', 'dateModified'] as const) {
    if (!has(key)) continue;
    const value = str(raw[key]);
    if (value && !ISO_DATE_RE.test(value)) {
      problems.add(`${key} must be a date like 2026-01-31`);
    } else if (value) out[key] = value;
  }
  // Any write is a modification, so this is stamped rather than trusted to the
  // client. It feeds <lastmod> in the sitemap.
  if (!partial || has('title') || has('ingredients') || has('instructions')) {
    out.dateModified = today();
  }
  if (!partial && !out.datePublished) out.datePublished = today();

  /* -- nutrition -- */

  if (has('nutrition')) {
    const n = (raw['nutrition'] ?? {}) as Record<string, unknown>;
    out.nutrition = {
      calories: num(n['calories']), protein: num(n['protein']),
      carbs: num(n['carbs']), fat: num(n['fat']),
      fiber: num(n['fiber']), sugar: num(n['sugar']),
      sodium: num(n['sodium'])
    };
  }

  /* -- body -- */

  if (has('equipment')) out.equipment = strArray(raw['equipment']);

  if (has('ingredients') || !partial) {
    const groups = Array.isArray(raw['ingredients']) ? raw['ingredients'] : [];
    const parsed = groups.flatMap((entry, index) => {
      if (!entry || typeof entry !== 'object') {
        problems.add(`Ingredient group ${index + 1} is malformed`);
        return [];
      }
      const record = entry as Record<string, unknown>;
      const items = strArray(record['items']);
      if (!items.length) {
        problems.add(`Ingredient group ${index + 1} has no ingredients in it`);
        return [];
      }
      return [{ group: str(record['group']), items }];
    });
    if (!partial && !parsed.length) problems.add('A recipe needs at least one ingredient');
    out.ingredients = parsed;
  }

  if (has('instructions') || !partial) {
    const steps = Array.isArray(raw['instructions']) ? raw['instructions'] : [];
    const parsed = steps.flatMap((entry, index) => {
      if (!entry || typeof entry !== 'object') {
        problems.add(`Step ${index + 1} is malformed`);
        return [];
      }
      const record = entry as Record<string, unknown>;
      const text = str(record['text']);
      if (!text) {
        // HowToStep requires text; an empty step produces invalid markup.
        problems.add(`Step ${index + 1} is missing its text`);
        return [];
      }
      return [{ title: str(record['title']), text }];
    });
    if (!partial && !parsed.length) problems.add('A recipe needs at least one instruction step');
    out.instructions = parsed;
  }

  if (has('tips')) out.tips = strArray(raw['tips']);
  if (has('variations')) out.variations = strArray(raw['variations']);
  if (has('storage')) out.storage = str(raw['storage']);

  if (has('faqs')) {
    const faqs = Array.isArray(raw['faqs']) ? raw['faqs'] : [];
    out.faqs = faqs.flatMap((entry) => {
      if (!entry || typeof entry !== 'object') return [];
      const record = entry as Record<string, unknown>;
      const q = str(record['q']);
      const a = str(record['a']);
      // A half-filled FAQ would emit an FAQPage entry with an empty answer,
      // which is a structured-data error rather than a cosmetic one.
      return q && a ? [{ q, a }] : [];
    });
  }

  if (has('related')) {
    const related = strArray(raw['related']);
    const bad = related.filter((s) => !SLUG_RE.test(s));
    if (bad.length) problems.add(`Related slugs are malformed: ${bad.join(', ')}`);
    // Self-reference renders a card linking to the page you are already on.
    else out.related = related.filter((s) => s !== out.slug);
  }

  /* -- video -- */

  if (has('video')) {
    out.video = parseVideo(raw['video'], problems);
  }

  if (has('published')) out.published = raw['published'] !== false;

  problems.throwIfAny();
  return out;
}

/* --------------------------------------------------------------- video --- */

/**
 * Accepts null (no video — renders the existing placeholder), a bare URL
 * string, or an object with optional poster/title/seconds.
 */
function parseVideo(input: unknown, problems: Problems): RecipeVideo | null {
  if (input === null || input === undefined || input === '') return null;

  const record: Record<string, unknown> =
    typeof input === 'string' ? { url: input } : (input as Record<string, unknown>);

  const url = str(record['url']);
  if (!url) return null;

  if (!isSafeUrl(url)) {
    problems.add('Video URL must be an https:// address or a path inside assets/');
    return null;
  }

  const seconds = int(record['seconds']);
  return {
    url,
    ...(str(record['poster']) ? { poster: str(record['poster']) } : {}),
    ...(str(record['title']) ? { title: str(record['title']) } : {}),
    ...(seconds > 0 ? { seconds } : {})
  };
}

/**
 * Rejects anything that is not plain https or a site-relative asset path.
 *
 * The value is interpolated into a `src` attribute, so permitting `javascript:`
 * or `data:` here would be a stored XSS hole on every recipe page that used it.
 */
export function isSafeUrl(value: string): boolean {
  if (/^https:\/\/[^\s"'<>]+$/i.test(value)) return true;
  // Relative asset paths, as the existing videos.ts entries are written.
  if (/^assets\/[A-Za-z0-9._\-/]+$/.test(value)) return true;
  return false;
}
