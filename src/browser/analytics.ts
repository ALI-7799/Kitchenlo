/**
 * Page-view counting.
 *
 * One fire-and-forget beacon per page load, carrying the path and a referrer.
 * No cookie is set, no identifier is generated, and nothing is stored in the
 * browser — there is deliberately no state here that could follow a visitor
 * between pages or between visits. The server aggregates by (path, day) and
 * keeps no visitor record either; see the comment at the top of api/track.ts.
 *
 * Three ways a visitor is not counted:
 *
 *   - Do Not Track, or Global Privacy Control, is enabled. Both are explicit
 *     requests not to be measured, and honouring them costs a number nobody
 *     was going to act on.
 *   - The page is being prerendered by the browser, so no one has seen it.
 *   - The request fails, which is ignored rather than retried.
 *
 * The site's consent module gates *optional* categories. This is not one:
 * with no identifier and no storage there is no personal data to consent to,
 * which is what allows an honest banner to keep saying the site runs no
 * tracking. Adding anything here that identifies a visitor would change that,
 * and would have to move behind consent.allows('analytics').
 */

/** Respects both the older DNT header and the newer GPC signal. */
function optedOut(): boolean {
  const nav = navigator as Navigator & {
    doNotTrack?: string;
    msDoNotTrack?: string;
    globalPrivacyControl?: boolean;
  };
  const win = window as Window & { doNotTrack?: string };

  const dnt = nav.doNotTrack ?? win.doNotTrack ?? nav.msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') return true;
  if (nav.globalPrivacyControl === true) return true;

  return false;
}

/**
 * Counts one page view.
 *
 * The whole body is wrapped so that nothing in here can ever surface on the
 * page. A view counter that throws a ReferenceError into the console — or
 * worse, aborts the module that runs after it — has done far more damage than
 * a missing number ever would, so every step is treated as optional.
 */
export function trackPageView(): void {
  try {
    send();
  } catch {
    // Deliberately silent: analytics is never worth a visible error.
  }
}

function send(): void {
  if (optedOut()) return;

  // A prerendered page has not been seen by anyone yet. Counting it would
  // inflate views for whatever the browser guessed the visitor might click.
  const doc = document as Document & { prerendering?: boolean };
  if (doc.prerendering) {
    document.addEventListener('prerenderingchange', () => trackPageView(), { once: true });
    return;
  }

  const payload = JSON.stringify({
    // Path only. The query string and hash are dropped here as well as on the
    // server, so a share link carrying an address never leaves the browser.
    path: window.location.pathname,
    // Same-origin referrers are reported so internal navigation can be told
    // apart from arrivals; the server reduces this to a coarse bucket and
    // never stores the URL itself.
    referrer: document.referrer || ''
  });

  /*
   * sendBeacon survives the page being closed, which a fetch() started during
   * unload does not. It is also non-blocking by definition, so it cannot delay
   * a navigation. Where it is unavailable, keepalive fetch does the same job.
   */
  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      if (navigator.sendBeacon('/api/track', blob)) return;
    }
  } catch {
    // Some browsers throw on a Blob with a non-simple type; fall through.
  }

  // Checked rather than assumed. This module is also executed outside a real
  // browser — the smoke test runs the bundle under JSDOM — and an environment
  // without fetch must degrade to doing nothing, not to a ReferenceError.
  if (typeof fetch !== 'function') return;

  void fetch('/api/track', {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    // Counting must never be a reason a page feels slow or an error appears
    // in the console.
    credentials: 'omit'
  }).catch(() => {});
}
