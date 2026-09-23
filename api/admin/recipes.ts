/**
 * GET /api/admin/recipes — the editor's list, drafts included.
 *
 * Separate from the public /api/recipes because it returns unpublished rows,
 * which must never appear on a public endpoint however it is filtered. Keeping
 * the two apart means a mistake in a query parameter cannot leak a draft.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import { assertMethod, cacheNever, json, param, withErrors } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { allRecipes } from '../_lib/repo.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');
  await requireAdmin(req);
  cacheNever(res);

  const recipes = await allRecipes({ includeDrafts: true });
  const search = param(req, 'q').trim().toLowerCase();

  const filtered = search
    ? recipes.filter((r) =>
        r.title.toLowerCase().includes(search) || r.slug.includes(search))
    : recipes;

  json(res, 200, {
    recipes: filtered.map((recipe) => ({
      slug: recipe.slug,
      title: recipe.title,
      category: recipe.category,
      image: recipe.image,
      difficulty: recipe.difficulty,
      totalMinutes: recipe.prepMinutes + recipe.cookMinutes,
      dateModified: recipe.dateModified,
      published: recipe.published !== false,
      hasVideo: Boolean(recipe.video?.url),
      // Surfaced in the list so a recipe missing an image or a video is
      // visible without opening it.
      hasImage: Boolean(recipe.image)
    })),
    total: filtered.length
  });
});
