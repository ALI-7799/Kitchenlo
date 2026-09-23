/**
 * The API's single entry point.
 *
 * Every /api/* request lands here and is dispatched to a handler in
 * api/_routes/. The URLs are unchanged — /api/recipes/shakshuka is still
 * /api/recipes/shakshuka — but the whole API is now one Serverless Function
 * instead of one per file.
 *
 * Why it is shaped this way
 * ------------------------
 * Vercel turns every non-underscore file under api/ into its own function, and
 * the Hobby plan allows twelve. Fourteen route files exceeded that on their
 * own; worse, the `functions` glob in vercel.json was written as
 * "api/**\/*.ts", which also matched the eight helpers in api/_lib/. Naming a
 * path in `functions` opts it *in* as a function source, overriding the rule
 * that underscore-prefixed files are skipped — so the deployment was trying to
 * create twenty-two functions, and eight of them were modules with no handler
 * at all.
 *
 * Both problems go away by having exactly one routable file. The handlers keep
 * their own modules under api/_routes/, which is underscore-prefixed and so
 * can never be routed to directly; this file is the only thing Vercel sees.
 *
 * One function rather than a few also suits the plan: a single warm instance
 * serves every endpoint, so there are fewer cold starts than when each route
 * had to warm up separately. The handlers already shared api/_lib/, so the
 * bundle is barely larger than any one of them was.
 */
import type { VercelRequest, VercelResponse } from './_lib/vercel.js';
import { json, securityHeaders, cacheNever } from './_lib/http.js';

import recipesList from './_routes/recipes-list.js';
import recipesItem from './_routes/recipes-item.js';
import categories from './_routes/categories.js';
import collections from './_routes/collections.js';
import recipeOfTheDay from './_routes/recipe-of-the-day.js';
import search from './_routes/search.js';
import track from './_routes/track.js';
import adminLogin from './_routes/admin-login.js';
import adminSession from './_routes/admin-session.js';
import adminStats from './_routes/admin-stats.js';
import adminPublish from './_routes/admin-publish.js';
import adminUpload from './_routes/admin-upload.js';
import adminRotd from './_routes/admin-rotd.js';
import adminRecipes from './_routes/admin-recipes.js';

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<void> | void;

/**
 * Fixed paths, matched first.
 *
 * Keyed by the full path below /api, so the table reads as the URL map it is.
 * Method checking stays inside each handler, which already does it and already
 * returns the right 405 with an Allow list.
 */
const EXACT: Record<string, Handler> = {
  'recipes': recipesList,
  'categories': categories,
  'collections': collections,
  'recipe-of-the-day': recipeOfTheDay,
  'search': search,
  'track': track,
  'admin/login': adminLogin,
  'admin/session': adminSession,
  'admin/stats': adminStats,
  'admin/publish': adminPublish,
  'admin/upload': adminUpload,
  'admin/rotd': adminRotd,
  'admin/recipes': adminRecipes
};

export default async function route(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  securityHeaders(res);

  const segments = segmentsOf(req);
  const path = segments.join('/');

  const exact = EXACT[path];
  if (exact) {
    await exact(req, res);
    return;
  }

  /*
   * /api/recipes/:slug
   *
   * The handler still reads the slug with param(req, 'slug'), as it did when
   * it was api/recipes/[slug].ts. A catch-all route supplies the segments
   * under a different query key, so the slug is put where the handler already
   * looks rather than changing the handler to suit the routing.
   */
  if (segments.length === 2 && segments[0] === 'recipes') {
    req.query = { ...req.query, slug: segments[1]! };
    await recipesItem(req, res);
    return;
  }

  cacheNever(res);
  json(res, 404, { error: `No API route for /${path}` });
}

/**
 * The path below /api, as clean segments.
 *
 * Read from the catch-all parameter where it is present, and otherwise parsed
 * from the URL. The fallback matters: the parameter is absent for a request to
 * /api itself, and a local `vercel dev` can differ from production in how it
 * populates it.
 */
function segmentsOf(req: VercelRequest): string[] {
  const raw = req.query['route'];

  const fromQuery = Array.isArray(raw)
    ? raw
    : typeof raw === 'string' && raw
      ? raw.split('/')
      : null;

  const source = fromQuery ?? (req.url ?? '')
    .split('?')[0]!
    .replace(/^\/+api\/?/, '')
    .split('/');

  return source
    .map((segment) => {
      // Segments arrive percent-encoded; a malformed escape must not throw.
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .map((segment) => segment.trim())
    .filter(Boolean)
    // Defence in depth against a traversal attempt reaching the lookup. The
    // table is an allowlist so nothing could match anyway, but stripping these
    // keeps the 404 message from echoing an odd path back.
    .filter((segment) => segment !== '.' && segment !== '..');
}
