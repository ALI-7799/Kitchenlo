/**
 * GET /api/recipe-of-the-day
 *
 * Returns the recipe every visitor sees today, and the instant it changes.
 *
 * The choice is *computed*, not stored, by the same pickForDay() the generator
 * and the browser use — so this endpoint, the built HTML and a tab left open
 * across midnight can never disagree. The only stored state is an optional
 * admin override pinning a specific recipe to a specific date.
 *
 * "Changes at 00:00" means 00:00 in the site's own timezone, not the caller's.
 * Two people loading this at the same instant in Tokyo and Los Angeles are on
 * different calendar dates, and the requirement is that they see the same
 * recipe; one fixed zone is what makes that true.
 */
import type { VercelRequest, VercelResponse } from './_lib/vercel.js';
import { assertMethod, cachePublic, json, param, withErrors } from './_lib/http.js';
import { allRecipes, rotdOverrideFor } from './_lib/repo.js';
import { pickForDay, siteDayNumber } from '../src/data/recipes.js';
import site from '../src/data/site.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');

  const now = new Date();
  const timezone = site.timezone;
  const day = siteDayNumber(now, timezone);
  const isoDate = siteIsoDate(now, timezone);

  const recipes = await allRecipes();
  if (!recipes.length) {
    json(res, 200, { recipe: null, date: isoDate, dayNumber: day });
    return;
  }

  // Sorted by slug so the shuffle is seeded against a stable order. Without
  // this the pick would depend on the order Postgres happened to return rows
  // in, and could differ between two calls on the same day.
  const ordered = recipes.slice().sort((a, b) => a.slug.localeCompare(b.slug));

  const pinned = await rotdOverrideFor(isoDate);
  const chosen = pinned
    ? ordered.find((r) => r.slug === pinned) ?? pickForDay(ordered, day)
    : pickForDay(ordered, day);

  /*
   * Cache only until the site's next midnight.
   *
   * A fixed TTL would either serve yesterday's recipe into today or expire
   * pointlessly all day. Pinning the lifetime to the moment the answer
   * actually changes means the edge can hold it for hours and still never be
   * wrong. Overrides are excluded from shared caching, because an admin
   * pinning a recipe expects to see it immediately.
   */
  if (pinned) cachePublic(res, 30);
  else cachePublic(res, Math.max(60, secondsUntilSiteMidnight(now, timezone)));

  json(res, 200, {
    recipe: chosen,
    date: isoDate,
    dayNumber: day,
    timezone,
    pinned: Boolean(pinned),
    changesAt: new Date(Date.now() + secondsUntilSiteMidnight(now, timezone) * 1000).toISOString(),
    // Lets a caller confirm it is looking at the same library the site built
    // from, which is the usual cause of a mismatch worth investigating.
    poolSize: ordered.length,
    ...(param(req, 'debug') === '1' ? { order: ordered.map((r) => r.slug) } : {})
  });
});

/** The calendar date in the site's timezone, as YYYY-MM-DD. */
function siteIsoDate(now: Date, timezone: string): string {
  // en-CA formats as YYYY-MM-DD, which is exactly the shape wanted here.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
}

/**
 * Seconds until the site's date next changes.
 *
 * Counted by stepping forward hour by hour until the site day number differs,
 * the same technique src/browser/pages/home.ts uses to arm its midnight timer.
 * Doing it this way rather than with offset arithmetic keeps it correct on the
 * 23- and 25-hour days either side of a DST change.
 */
function secondsUntilSiteMidnight(now: Date, timezone: string): number {
  const today = siteDayNumber(now, timezone);
  const start = now.getTime();
  let next = Math.floor(start / 3600000) * 3600000;

  for (let i = 0; i <= 26; i++) {
    next += 3600000;
    if (siteDayNumber(new Date(next), timezone) !== today) {
      return Math.max(60, Math.ceil((next - start) / 1000));
    }
  }
  return 3600;
}
