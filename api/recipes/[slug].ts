/**
 * GET    /api/recipes/:slug   one recipe, in full
 * PUT    /api/recipes/:slug   update it (admin only)
 * DELETE /api/recipes/:slug   remove it (admin only)
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, badRequest, body, cacheNever, cachePublic,
  json, notFound, param, withErrors
} from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { deleteRecipe, recipeBySlug, updateRecipe } from '../_lib/repo.js';
import { parseRecipe } from '../_lib/validate.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  const method = assertMethod(req, 'GET', 'PUT', 'DELETE');

  const slug = param(req, 'slug');
  if (!slug) throw badRequest('No recipe slug given');

  if (method === 'GET') return read(slug, req, res);

  // Everything past here changes data.
  assertSameOrigin(req);
  await requireAdmin(req);

  if (method === 'PUT') return update(slug, req, res);
  return remove(slug, res);
});

async function read(slug: string, req: VercelRequest, res: VercelResponse): Promise<void> {
  // An admin previewing a draft passes ?draft=1; the extra rows are only
  // returned once requireAdmin has approved, never to an anonymous caller.
  const wantsDrafts = param(req, 'draft') === '1';
  if (wantsDrafts) await requireAdmin(req);

  const recipe = await recipeBySlug(slug, { includeDrafts: wantsDrafts });
  if (!recipe) throw notFound(`No recipe with the slug "${slug}"`);

  if (wantsDrafts) cacheNever(res);
  else cachePublic(res, 300);

  json(res, 200, { recipe });
}

async function update(slug: string, req: VercelRequest, res: VercelResponse): Promise<void> {
  const patch = parseRecipe(body(req), { partial: true });

  // A rename has to move every inbound `related` reference with it, or the
  // next build fails on a slug that requireBySlug() can no longer resolve.
  const renamingTo = patch.slug && patch.slug !== slug ? patch.slug : null;

  const updated = await updateRecipe(slug, patch);
  if (renamingTo) await repointRelated(slug, renamingTo);

  cacheNever(res);
  json(res, 200, { recipe: updated, renamedFrom: renamingTo ? slug : undefined });
}

/** Rewrites `related` lists that still name the old slug after a rename. */
async function repointRelated(from: string, to: string): Promise<void> {
  const { db } = await import('../_lib/db.js');
  await db()`
    update recipes
       set related = array_replace(related, ${from}, ${to})
     where ${from} = any(related)
  `;
}

async function remove(slug: string, res: VercelResponse): Promise<void> {
  // deleteRecipe also strips the slug out of other recipes' related lists,
  // so a deletion cannot leave a dangling reference behind.
  await deleteRecipe(slug);
  cacheNever(res);
  json(res, 200, { deleted: slug });
}
