/**
 * Click-to-load for third-party video embeds.
 *
 * The generator renders a play button holding the embed URL in a data
 * attribute instead of an iframe, so a recipe page contacts YouTube or Vimeo
 * only when somebody actually asks to watch. Pressing the button swaps in the
 * iframe, and that press is the visitor's own decision to load it.
 *
 * Self-hosted video files are untouched by any of this: they come from
 * kitchenlo.com, involve no third party, and are rendered as an ordinary
 * <video> element by the template.
 *
 * Nothing here depends on the consent categories. Gating embeds on a category
 * would mean a visitor who declined analytics could not watch a video they had
 * deliberately clicked on, which is not what that answer was about.
 */
import { $$ } from './dom.js';

const frames = $$('[data-video-embed]');

for (const frame of frames) {
  const button = frame.querySelector('button');
  if (!button) continue;

  button.addEventListener(
    'click',
    () => {
      const src = frame.getAttribute('data-video-embed');
      if (!src) return;

      const iframe = document.createElement('iframe');
      // autoplay=1 because the visitor has already pressed play once; making
      // them press it again inside the player would be the wrong reward for
      // the extra click this pattern costs them.
      iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
      iframe.title = frame.getAttribute('data-video-title') ?? 'Recipe video';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      frame.replaceChildren(iframe);
      frame.classList.remove('video-frame-embed');
    },
    { once: true }
  );
}
