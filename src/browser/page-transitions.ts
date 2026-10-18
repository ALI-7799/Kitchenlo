/**
 * A soft crossfade between pages on internal navigation.
 *
 * The page itself rises in on load via the `.page-enter` CSS animation
 * (applied server-side in the layout template). This module only handles the
 * outgoing half: it intercepts clicks on ordinary internal links, fades the
 * `.page-transition-veil` over the page, then lets the browser navigate.
 * Buttons keep whatever click handling they already have — this never calls
 * preventDefault on anything but a plain same-origin link.
 */
const veil = document.querySelector<HTMLElement>('.page-transition-veil');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const VEIL_MS = 260;

function isPlainClick(event: MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function isTransitionable(link: HTMLAnchorElement): boolean {
  if (link.target && link.target !== '_self') return false;
  if (link.hasAttribute('download')) return false;
  if (link.origin !== window.location.origin) return false;

  const href = link.getAttribute('href') || '';
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  // A same-page jump (including plain "#top" back-to-top links) should keep
  // its native scroll instead of fading the whole page out.
  if (link.pathname === window.location.pathname && link.hash) return false;

  return true;
}

if (veil && !reduceMotion) {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || !isPlainClick(event)) return;

    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!link || !isTransitionable(link)) return;

    event.preventDefault();
    veil.classList.add('is-active');
    window.setTimeout(() => {
      window.location.href = link.href;
    }, VEIL_MS);
  });
}

// Back/forward restores from cache can leave the veil showing; clear it.
window.addEventListener('pageshow', () => {
  veil?.classList.remove('is-active');
});
