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

const sources: RecipeSource[] = [...quickDinners, ...healthyFood, ...breakfast, ...desserts];

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

export default { all, bySlug, byCategory, totalMinutes, flatIngredients, searchIndex, query };
