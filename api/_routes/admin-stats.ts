/**
 * GET /api/admin/stats
 *
 * The dashboard's numbers: library totals, view counts by period, the most
 * read recipes, and what people searched for.
 *
 * Everything here is derived from the aggregated counters in `page_views` and
 * `search_queries`, which hold no visitor identifiers at all — so this can
 * report what was read without being able to report who read it. See the
 * comment at the top of api/track.ts.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import { assertMethod, cacheNever, json, withErrors } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { stats } from '../_lib/repo.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');
  await requireAdmin(req);
  cacheNever(res);

  const data = await stats();

  json(res, 200, {
    ...data,
    // Titles are more useful than paths in the UI, and resolving them here
    // keeps the dashboard from having to fetch the whole recipe list to do it.
    topRecipes: data.topRecipes.map((row) => ({
      ...row,
      slug: row.path.replace(/^\/recipes\//, '')
    }))
  });
});
