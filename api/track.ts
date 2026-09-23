/**
 * POST /api/track — record one page view.
 *
 * What this stores, in full: a path, today's date, and one of five referrer
 * buckets. That is the entire record. There is no cookie, no visitor id, no
 * session, no IP address, no user agent, and no timestamp finer than the day.
 * Rows are counters keyed by (path, date, bucket), so two people reading the
 * same recipe increment the same row and are indistinguishable afterwards —
 * not pseudonymised, genuinely not recorded.
 *
 * That design is what lets this run without a consent banner. The site's
 * consent module (src/browser/consent.ts) gates optional categories, but this
 * collects no personal data to gate: there is nothing here that could identify
 * a visitor even given the whole table. Do Not Track is still honoured on the
 * client side, because a visitor who has asked not to be counted should not be.
 *
 * The caller never waits for this and never sees an error from it. A failed
 * counter must not be visible on a recipe page.
 */
import type { VercelRequest, VercelResponse } from './_lib/vercel.js';
import { assertMethod, body, cacheNever, json, withErrors } from './_lib/http.js';
import { recordView } from './_lib/repo.js';
import { hashedIp } from './_lib/auth.js';
import { overLimit } from './_lib/rate-limit.js';

/** Only paths the site actually serves; anything else is discarded. */
const TRACKABLE = /^\/(?:$|recipes(?:\/[a-z0-9-]+)?$|category\/[a-z0-9-]+$|collection\/[a-z0-9-]+$|guides(?:\/[a-z0-9-]+)?$|categories$|meal-planner$|about$|contact$)/;

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'POST');
  cacheNever(res);

  const payload = body<{ path?: string; referrer?: string }>(req);
  const path = normalisePath(String(payload.path ?? ''));

  // Silently accepted rather than rejected: a 400 here would show up in the
  // browser console on a page the visitor is only reading.
  if (!path) {
    json(res, 202, { ok: true });
    return;
  }

  // A crude per-instance cap. It cannot stop a determined inflater — that
  // would need per-visitor state this endpoint deliberately does not keep —
  // but it stops a stuck loop in one tab from writing thousands of rows.
  if (overLimit(`track:${hashedIp(req)}`, 120, 60_000)) {
    json(res, 202, { ok: true });
    return;
  }

  void recordView(path, bucketReferrer(String(payload.referrer ?? ''))).catch(() => {});

  json(res, 202, { ok: true });
});

/**
 * Reduces a path to one the site serves, or rejects it.
 *
 * The query string and hash are dropped before the allowlist test: they can
 * carry personal data (an email in a share link, a token pasted by mistake)
 * and are of no analytic use here.
 */
function normalisePath(raw: string): string | null {
  if (!raw || raw.length > 200) return null;

  let path = raw.split('?')[0]!.split('#')[0]!;
  if (!path.startsWith('/')) path = '/' + path;
  // cleanUrls is on, so /recipes/x.html and /recipes/x are the same page and
  // must not become two rows.
  path = path.replace(/\.html$/, '').replace(/\/+$/, '') || '/';

  return TRACKABLE.test(path) ? path : null;
}

/**
 * Collapses a referrer to one of five buckets.
 *
 * A full referring URL can carry a search query, a session token or a private
 * page title, so it is never stored. The bucket answers the only question
 * worth asking of it — roughly where readers arrive from — and nothing more.
 */
function bucketReferrer(referrer: string): string {
  if (!referrer) return 'direct';

  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return 'other';
  }

  if (host.endsWith('kitchenlo.com')) return 'internal';
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./.test(host)) return 'search';
  if (/(^|\.)(facebook|instagram|pinterest|x|twitter|t|reddit|tiktok|youtube|linkedin)\./.test(host)) {
    return 'social';
  }
  return 'other';
}
