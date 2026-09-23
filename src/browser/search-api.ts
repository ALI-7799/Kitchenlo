/**
 * Backend search, used as an enhancement over the bundled search.
 *
 * The recipe index already searches the library that ships inside the bundle,
 * and that path is instant, works offline and cannot fail. This module adds
 * what a database can do that a substring match cannot — relevance ranking and
 * tolerance for a misspelling — without making the page depend on it.
 *
 * The contract the index relies on:
 *
 *   - It never throws. Every failure resolves to null, meaning "use the local
 *     results", so an API outage is invisible to a visitor.
 *   - It never blocks. Local results render first; if the API answers in time
 *     and actually improves on them, the order is refined in place.
 *   - A stale response is discarded. Someone typing quickly fires several
 *     requests and they can return out of order; only the newest is applied.
 */

/** Abandoned past this point — a slow search is worse than a local one. */
const TIMEOUT_MS = 2500;

let latestRequest = 0;

export interface ApiSearchResult {
  slug: string;
  rank: number;
}

/**
 * Asks the backend to rank a query.
 *
 * Resolves to an ordered list of slugs, or null when the backend could not
 * answer for any reason — offline, rate-limited, timed out, not deployed.
 * Null is an ordinary outcome here, not an error worth reporting.
 */
export async function searchViaApi(
  query: string,
  options: { category?: string; diet?: string[] } = {}
): Promise<ApiSearchResult[] | null> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return null;

  // Both are checked rather than assumed, for the same reason as in
  // analytics.ts: this module runs under JSDOM in the smoke test and on older
  // browsers, and in either case the correct behaviour is to fall back to the
  // bundled search rather than to throw.
  if (typeof fetch !== 'function' || typeof AbortController !== 'function') return null;

  const token = ++latestRequest;

  const params = new URLSearchParams({ q: trimmed });
  if (options.category) params.set('category', options.category);
  if (options.diet?.length) params.set('diet', options.diet.join(','));

  // AbortController rather than a bare Promise.race, so a timed-out request is
  // actually cancelled instead of left running and holding a connection.
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`/api/search?${params}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      results?: { slug?: unknown; rank?: unknown }[];
      throttled?: boolean;
    };

    // A newer keystroke has already fired; this answer is for a query the
    // visitor has moved on from.
    if (token !== latestRequest) return null;
    // The server declined to search rather than finding nothing, so its empty
    // list must not be mistaken for "no matches".
    if (payload.throttled) return null;
    if (!Array.isArray(payload.results)) return null;

    return payload.results.flatMap((row) =>
      typeof row.slug === 'string'
        ? [{ slug: row.slug, rank: Number(row.rank) || 0 }]
        : []
    );
  } catch {
    // Offline, aborted, CORS, malformed JSON — all mean the same thing here.
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}
