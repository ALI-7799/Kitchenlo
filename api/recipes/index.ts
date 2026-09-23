/**
 * GET  /api/recipes   list recipes, with the same filters the index page uses
 * POST /api/recipes   create a recipe (admin only)
 *
 * The list is the API mirror of `Recipes.query()`; the filter names match the
 * query string the recipe index already puts in the URL, so a link like
 * /recipes?diet=vegan&time=under-30 and the API call behind it stay in step.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, body, cacheNever, cachePublic,
  intParam, json, param, withErrors
} from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { allRecipes, createRecipe } from '../_lib/repo.js';
import { parseRecipe } from '../_lib/validate.js';
import type { RecipeRecord } from '../_lib/recipe-row.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  const method = assertMethod(req, 'GET', 'POST');
  if (method === 'POST') return create(req, res);
  return list(req, res);
});

/* ----------------------------------------------------------------- read -- */

async function list(req: VercelRequest, res: VercelResponse): Promise<void> {
  const category = param(req, 'category');
  const diet = param(req, 'diet').split(',').map((d) => d.trim()).filter(Boolean);
  const maxTime = intParam(req, 'maxTime', 0);
  const difficulty = param(req, 'difficulty');
  const sort = param(req, 'sort') || 'popular';
  const limit = Math.min(Math.max(intParam(req, 'limit', 100), 1), 200);
  const offset = Math.max(intParam(req, 'offset', 0), 0);

  let recipes = await allRecipes();

  if (category) recipes = recipes.filter((r) => r.category === category);
  if (difficulty) recipes = recipes.filter((r) => r.difficulty === difficulty);
  if (maxTime > 0) {
    recipes = recipes.filter((r) => r.prepMinutes + r.cookMinutes <= maxTime);
  }
  // Every requested tag must be present, matching the AND semantics of the
  // diet filter on the recipe index rather than a looser "any of".
  if (diet.length) {
    recipes = recipes.filter((r) => diet.every((tag) => r.diet.includes(tag as never)));
  }

  recipes.sort(sorterFor(sort));

  const total = recipes.length;
  const page = recipes.slice(offset, offset + limit);

  cachePublic(res, 300);
  json(res, 200, {
    recipes: page.map(summarise),
    total,
    limit,
    offset
  });
}

/**
 * The list view returns a card-sized projection, not whole recipes.
 *
 * A full recipe carries its intro, every step, tips, variations and FAQs —
 * around 4 KB each. Sending 55 of those to render a grid of cards would be a
 * quarter-megabyte response for data the page never shows. The single-recipe
 * endpoint returns everything.
 */
function summarise(recipe: RecipeRecord) {
  return {
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    cuisine: recipe.cuisine,
    image: recipe.image,
    imageAlt: recipe.imageAlt,
    prepMinutes: recipe.prepMinutes,
    cookMinutes: recipe.cookMinutes,
    totalMinutes: recipe.prepMinutes + recipe.cookMinutes,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    diet: recipe.diet,
    keywords: recipe.keywords,
    rating: recipe.rating,
    ratingCount: recipe.ratingCount,
    datePublished: recipe.datePublished,
    hasVideo: Boolean(recipe.video?.url)
  };
}

const sorters: Record<string, (a: RecipeRecord, b: RecipeRecord) => number> = {
  popular: (a, b) => b.ratingCount - a.ratingCount,
  rating: (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
  newest: (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
  quickest: (a, b) =>
    a.prepMinutes + a.cookMinutes - (b.prepMinutes + b.cookMinutes),
  az: (a, b) => a.title.localeCompare(b.title)
};

const sorterFor = (key: string) => sorters[key] ?? sorters['popular']!;

/* ---------------------------------------------------------------- write -- */

async function create(req: VercelRequest, res: VercelResponse): Promise<void> {
  assertSameOrigin(req);
  await requireAdmin(req);

  const parsed = parseRecipe(body(req)) as RecipeRecord;
  const created = await createRecipe(parsed);

  cacheNever(res);
  json(res, 201, { recipe: created });
}
