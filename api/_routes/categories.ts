/**
 * GET /api/categories
 *
 * The five recipe categories, each with a live count of the recipes in it.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import { assertMethod, cachePublic, json, withErrors } from '../_lib/http.js';
import { allCategories, allRecipes } from '../_lib/repo.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');

  const [categories, recipes] = await Promise.all([allCategories(), allRecipes()]);

  const counts = new Map<string, number>();
  for (const recipe of recipes) {
    counts.set(recipe.category, (counts.get(recipe.category) ?? 0) + 1);
  }

  cachePublic(res, 600);
  json(res, 200, {
    categories: categories.map((category) => ({
      slug: category.slug,
      title: category.title,
      short: category.short,
      tagline: category.tagline,
      description: category.description,
      intro: category.intro,
      image: category.image,
      imageAlt: category.image_alt,
      keywords: category.keywords ?? [],
      recipeCount: counts.get(category.slug) ?? 0
    }))
  });
});
