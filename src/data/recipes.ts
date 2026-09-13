/**
 * Merges every recipe collection into one array and exposes the lookup helpers
 * the generator and the browser both use.
 *
 * Registering a collection is a single import plus a single array entry. There
 * is deliberately no second list anywhere: an earlier version repeated the
 * collection list in the Node loader, the browser loader and the page template,
 * and it drifted immediately, so the browser silently served a stale subset.
 */
import type { CategorySlug, Recipe, RecipeQuery, RecipeSource, SortKey } from '../types.js';

import quickDinners from './recipes-quick-dinners.js';
import healthyFood from './recipes-healthy-food.js';
import breakfast from './recipes-breakfast.js';
import desserts from './recipes-desserts.js';
import comfortFood from './recipes-comfort-food.js';

const sources: RecipeSource[] = [
  ...quickDinners,
  ...healthyFood,
  ...breakfast,
  ...desserts,
  ...comfortFood
];

/**
 * Resolves the authored shape into the rendered shape.
 *
 * Cover art is generated for every recipe, not only those without a photograph.
 * Where a photo exists the art becomes its load fallback, because every photo
 * points at a third-party host and can vanish without notice.
 */
function normalise(source: RecipeSource): Recipe {
  const fallbackImage = `assets/img/recipe-${source.slug}.svg`;
  return {
    ...source,
    image: source.image ?? fallbackImage,
    imageAlt: source.imageAlt || source.title,
    fallbackImage,
    generatedImage: source.image === null
  };
}

export const all: Recipe[] = sources.map(normalise);

const bySlugIndex = new Map(all.map((recipe) => [recipe.slug, recipe]));

export function bySlug(slug: string): Recipe | undefined {
  return bySlugIndex.get(slug);
}

/**
 * Lookup for build-time code, where a missing slug is a content bug rather than
 * a runtime condition. Turns a typo in a `related` list or a hand-written
 * collection into a failed build instead of a page with a hole in it.
 */
export function requireBySlug(slug: string): Recipe {
  const recipe = bySlugIndex.get(slug);
  if (!recipe) throw new Error(`Unknown recipe slug: "${slug}"`);
  return recipe;
}

export function byCategory(slug: CategorySlug): Recipe[] {
  return all.filter((recipe) => recipe.category === slug);
}

export function totalMinutes(recipe: Recipe): number {
  return recipe.prepMinutes + recipe.cookMinutes;
}

/** Flattens the grouped ingredient structure into a plain list. */
export function flatIngredients(recipe: Recipe): string[] {
  return recipe.ingredients.flatMap((group) => group.items);
}

/** The text a recipe is matched against by the search box. */
export function searchIndex(recipe: Recipe): string {
  return [
    recipe.title,
    recipe.description,
    recipe.cuisine,
    recipe.course,
    recipe.difficulty,
    recipe.keywords.join(' '),
    recipe.diet.join(' '),
    flatIngredients(recipe).join(' ')
  ]
    .join(' ')
    .toLowerCase();
}

const searchCache = new Map<string, string>();

function haystack(recipe: Recipe): string {
  let value = searchCache.get(recipe.slug);
  if (value === undefined) {
    value = searchIndex(recipe);
    searchCache.set(recipe.slug, value);
  }
  return value;
}

const sorters: Record<SortKey, (a: Recipe, b: Recipe) => number> = {
  popular: (a, b) => b.ratingCount - a.ratingCount,
  rating: (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
  newest: (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
  quickest: (a, b) => totalMinutes(a) - totalMinutes(b),
  az: (a, b) => a.title.localeCompare(b.title)
};

/** Filters and sorts the library. Every field is optional and ANDed together. */
export function query(options: RecipeQuery = {}): Recipe[] {
  let results = all.slice();

  if (options.slugs) {
    const wanted = new Set(options.slugs);
    results = results.filter((recipe) => wanted.has(recipe.slug));
  }
  if (options.category) {
    results = results.filter((recipe) => recipe.category === options.category);
  }
  if (options.difficulty) {
    results = results.filter((recipe) => recipe.difficulty === options.difficulty);
  }
  if (options.maxTime) {
    results = results.filter((recipe) => totalMinutes(recipe) <= options.maxTime!);
  }
  if (options.diet?.length) {
    results = results.filter((recipe) =>
      options.diet!.every((tag) => recipe.diet.includes(tag))
    );
  }
  if (options.query) {
    const terms = options.query.toLowerCase().split(/\s+/).filter(Boolean);
    results = results.filter((recipe) => {
      const text = haystack(recipe);
      return terms.every((term) => text.includes(term));
    });
  }

  return results.sort(sorters[options.sort ?? 'popular']);
}


/* --------------------------------------------------- recipe of the day --- */

/**
 * Calendar date in the site's own timezone, as [year, month, day].
 *
 * Not the visitor's date. Two people loading the page at the same instant in
 * Tokyo and Los Angeles are on different calendar dates, so reading their
 * local clock would show them different recipes at the same moment. One fixed
 * zone is what makes the choice identical for everybody.
 *
 * Intl resolves the zone's offset for that specific instant, so DST changes
 * are handled and the day still turns at local midnight across them.
 */
function siteDateParts(now: Date, timezone: string): [number, number, number] {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return [get('year'), get('month'), get('day')];
}

/**
 * Whole days from the epoch to that calendar date.
 *
 * Date.UTC on the site-local Y-M-D counts calendar days directly, with no
 * offset arithmetic to get wrong: the value increments by exactly one at each
 * local midnight, including the 23- and 25-hour DST days.
 */
export function siteDayNumber(now: Date, timezone: string): number {
  const [y, m, d] = siteDateParts(now, timezone);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

/** Deterministic 32-bit PRNG, so one seed always replays the same sequence. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = a;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The day's recipe, chosen so that every recipe gets a turn.
 *
 * A plain hash-modulo would be simpler, but it can land on the same recipe two
 * days running and leaves some recipes never chosen. Instead the whole list is
 * shuffled once per cycle of N days, seeded by the cycle number, and the day's
 * position in that cycle indexes it. So within any cycle each recipe appears
 * exactly once, and the order is different in the next one.
 *
 * The result depends only on the date, never on when or how often the page is
 * loaded, so every visitor gets the same recipe all day and a refresh cannot
 * change it.
 */
export function recipeOfTheDay(now: Date, timezone: string): Recipe {
  const list = all;
  if (!list.length) throw new Error('No recipes to choose from');

  const day = siteDayNumber(now, timezone);
  const n = list.length;
  // Floor division, so the cycle is still correct for dates before the epoch.
  const cycle = Math.floor(day / n);
  const position = ((day % n) + n) % n;

  const order = list.map((_, i) => i);
  const rand = mulberry32(cycle);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = order[i]!;
    order[i] = order[j]!;
    order[j] = tmp;
  }
  return list[order[position]!]!;
}

export default {
  all,
  bySlug,
  byCategory,
  totalMinutes,
  flatIngredients,
  searchIndex,
  query,
  siteDayNumber,
  recipeOfTheDay
};
