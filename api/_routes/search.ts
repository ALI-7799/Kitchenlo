/**
 * GET /api/search?q=...
 *
 * Postgres full-text search across title, keywords, description, cuisine,
 * diet and every ingredient line — the field set searchIndex() already
 * defines in src/data/recipes.ts, so this and the client-side fallback agree
 * on what a query matches.
 *
 * The recipe index treats this as an enhancement, not a dependency: if it is
 * slow or unreachable the page keeps using its bundled search and the visitor
 * sees nothing amiss. What the backend adds is relevance ranking, fuzzy
 * matching for typos, and a record of what people search for.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, cachePublic, intParam, json, param, withErrors
} from '../_lib/http.js';
import { recordSearch, searchRecipes } from '../_lib/repo.js';
import { hashedIp } from '../_lib/auth.js';
import { overLimit } from '../_lib/rate-limit.js';

/** Longer than any real query; a huge one is a probe, not a search. */
const MAX_TERM = 100;

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');

  const term = param(req, 'q').trim().slice(0, MAX_TERM);
  const category = param(req, 'category');
  const diet = param(req, 'diet').split(',').map((d) => d.trim()).filter(Boolean);
  const limit = intParam(req, 'limit', 50);

  if (term.length < 2) {
    cachePublic(res, 60);
    json(res, 200, { query: term, results: [], total: 0 });
    return;
  }

  if (overLimit(`search:${hashedIp(req)}`, 60, 60_000)) {
    // Answered as an empty result rather than a 429 on purpose: the recipe
    // index falls back to its bundled search on an error, and a rate-limited
    // visitor is better served by that than by an error state.
    cachePublic(res, 10);
    json(res, 200, { query: term, results: [], total: 0, throttled: true });
    return;
  }

  const hits = await searchRecipes(term, {
    ...(category ? { category } : {}),
    ...(diet.length ? { diet } : {}),
    limit
  });

  /*
   * Record the term and how many results it found.
   *
   * Stored aggregated by (term, day) with no visitor identifier attached, so
   * it can show which recipes people look for and never who looked. Queries
   * that found nothing are the useful ones — they are requests for recipes
   * the site does not have yet.
   *
   * Deliberately not awaited: the visitor should not wait on a counter, and a
   * failed write must not turn a working search into an error.
   */
  void recordSearch(term.toLowerCase(), hits.length).catch(() => {});

  cachePublic(res, 120);
  json(res, 200, {
    query: term,
    total: hits.length,
    results: hits.map((hit) => ({
      slug: hit.slug,
      title: hit.title,
      description: hit.description,
      category: hit.category,
      image: hit.image,
      imageAlt: hit.imageAlt,
      totalMinutes: hit.prepMinutes + hit.cookMinutes,
      difficulty: hit.difficulty,
      diet: hit.diet,
      rating: hit.rating,
      ratingCount: hit.ratingCount,
      rank: hit.rank
    }))
  });
});
