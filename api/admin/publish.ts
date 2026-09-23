/**
 * POST /api/admin/publish — rebuild and redeploy the static site.
 *
 * This is the step that makes an edit public. The admin writes to the
 * database, which changes nothing a visitor can see; publishing triggers a
 * Vercel Deploy Hook, the build runs `npm run pull` to write the recipes into
 * src/data/recipes-generated.ts, and the generator re-renders every page from
 * it.
 *
 * Doing it this way, rather than serving recipes dynamically, is what keeps
 * the site's SEO characteristics intact: every recipe page stays pre-rendered
 * with its structured data, its canonical tag and its sitemap entry, exactly
 * as it is today.
 *
 * The hook URL is a secret — anyone holding it can trigger unlimited builds —
 * so it lives only in the VERCEL_DEPLOY_HOOK_URL environment variable and is
 * never returned to the browser, not even partially.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, cacheNever, HttpError, json, withErrors
} from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { overLimit } from '../_lib/rate-limit.js';
import { db } from '../_lib/db.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'POST');
  assertSameOrigin(req);
  const user = await requireAdmin(req);
  cacheNever(res);

  const hook = process.env['VERCEL_DEPLOY_HOOK_URL'];
  if (!hook) {
    throw new HttpError(
      501,
      'Publishing is not configured. Add VERCEL_DEPLOY_HOOK_URL in the Vercel ' +
        'project settings (Settings → Git → Deploy Hooks) and redeploy.'
    );
  }

  // Builds are the expensive operation on the whole platform, and a stuck
  // button or an impatient click should not queue ten of them.
  if (overLimit(`publish:${user.id}`, 5, 10 * 60_000)) {
    throw new HttpError(429, 'Several builds were just queued. Give it a few minutes.');
  }

  /*
   * Refuse to publish a site that would fail to build.
   *
   * requireBySlug() in the generator throws on a `related` slug it cannot
   * resolve, which fails the deploy. Catching it here turns a broken build
   * ten minutes from now into a clear message right now, naming the recipes
   * at fault.
   */
  const dangling = await db()<{ slug: string; missing: string }[]>`
    select r.slug, x.missing
      from recipes r, lateral unnest(r.related) as x(missing)
     where r.published = true
       and not exists (
         select 1 from recipes r2 where r2.slug = x.missing and r2.published = true
       )
  `;

  if (dangling.length) {
    throw new HttpError(
      409,
      'Some recipes link to a recipe that is missing or unpublished, which would ' +
        'fail the build. Fix these first.',
      dangling.map((row) => `${row.slug} → ${row.missing}`)
    );
  }

  const response = await fetch(hook, { method: 'POST' });
  if (!response.ok) {
    // The hook URL itself must not reach the client, so only the status does.
    console.error('[publish] deploy hook returned', response.status);
    throw new HttpError(502, `The deploy hook rejected the request (${response.status})`);
  }

  json(res, 202, {
    queued: true,
    by: user.email,
    at: new Date().toISOString(),
    note: 'The site rebuilds in the background. Changes are usually live within a minute or two.'
  });
});
