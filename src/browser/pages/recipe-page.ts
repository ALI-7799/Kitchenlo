/**
 * Single recipe page: ingredient scaling, shopping list, meal plan and print.
 */
import { $, $$, setStatus } from '../dom.js';
import * as store from '../store.js';

const display = $('[data-servings-display]');
const baseEl = $('[data-base-servings]');

if (baseEl) {
  const base = Number(baseEl.getAttribute('data-base-servings'));
  let current = base;

  /* ---------------------------------------------- ingredient quantities -- */

  /** Leading quantity: "1.25", "1/2" or a mixed number like "1 1/2". */
  const QUANTITY = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/;

  const FRACTIONS: [number, string][] = [
    [1 / 8, '1/8'],
    [1 / 4, '1/4'],
    [1 / 3, '1/3'],
    [1 / 2, '1/2'],
    [2 / 3, '2/3'],
    [3 / 4, '3/4']
  ];

  function parseQuantity(text: string): number {
    if (!text.includes('/')) return parseFloat(text);
    const parts = text.trim().split(/\s+/);
    if (parts.length === 2) {
      const [num, den] = parts[1]!.split('/');
      return parseFloat(parts[0]!) + Number(num) / Number(den);
    }
    const [num, den] = parts[0]!.split('/');
    return Number(num) / Number(den);
  }

  /** Formats back to something a cook would write, snapping to kitchen fractions. */
  function formatQuantity(value: number): string {
    if (value <= 0) return '0';

    const whole = Math.floor(value);
    const remainder = value - whole;

    let best: { diff: number; label: string } | null = null;
    for (const [fraction, label] of FRACTIONS) {
      const diff = Math.abs(remainder - fraction);
      if (diff < 0.06 && (!best || diff < best.diff)) best = { diff, label };
    }

    if (remainder < 0.06) return String(whole || 0);
    if (best) return whole ? `${whole} ${best.label}` : best.label;
    return String(Math.round(value * 100) / 100);
  }

  /* Bracketed metric conversions such as "1/2 cup (120 ml)" have to scale with
     the leading quantity or the two disagree. Two kinds must be left alone:
     per-item sizes ("6 oz / 170 g each"), where the leading count is what
     scales, and percentages. */
  const MEASURE = /(\d+(?:\.\d+)?)(\s*)(kg|g|ml|L|l|oz|lb)\b/g;
  const SKIP_PAREN = /\beach\b|per cent|%/i;

  const roundMeasure = (value: number): string =>
    value >= 10 ? String(Math.round(value)) : String(Math.round(value * 10) / 10);

  function scaleConversions(text: string, factor: number): string {
    return text.replace(/\(([^)]*)\)/g, (whole, inner: string) => {
      if (SKIP_PAREN.test(inner) || !/\d/.test(inner)) return whole;
      return (
        '(' +
        inner.replace(MEASURE, (_m, amount: string, gap: string, unit: string) =>
          roundMeasure(parseFloat(amount) * factor) + gap + unit
        ) +
        ')'
      );
    });
  }

  /* Spelled-out units have to agree with the quantity in front of them, or
     halving "2 tablespoons" leaves "1 tablespoons". Plurality is read back off
     the formatted label rather than the raw value, so the word always matches
     the number actually on screen even where the label has been rounded. */
  const UNIT_WORD = /^(\s+)(tablespoon|teaspoon|cup)s?\b/;

  function agreeUnit(rest: string, label: string): string {
    const quantity = parseQuantity(label);
    return rest.replace(UNIT_WORD, (_m, gap: string, unit: string) =>
      gap + unit + (quantity > 1 ? 's' : '')
    );
  }

  function scaleIngredients(servings: number): void {
    const factor = servings / base;

    $$('[data-ingredient]').forEach((span) => {
      const original = span.getAttribute('data-ingredient')!;
      const match = original.match(QUANTITY);

      if (!match) {
        span.textContent = scaleConversions(original, factor);
        return;
      }

      const amount = parseQuantity(match[1]!);
      if (!Number.isFinite(amount)) {
        span.textContent = scaleConversions(original, factor);
        return;
      }

      const rest = scaleConversions(original.slice(match[1]!.length), factor);
      const label = formatQuantity(amount * factor);
      span.textContent = label + agreeUnit(rest, label);
    });
  }

  $$('[data-servings-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = Number(btn.getAttribute('data-servings-step'));
      const next = Math.min(12, Math.max(1, current + step));
      if (next === current) return;
      current = next;
      if (display) display.textContent = String(current);
      scaleIngredients(current);
    });
  });
}

/* ------------------------------------------------------- shopping list --- */

const addBtn = $('[data-add-ingredients]');
addBtn?.addEventListener('click', () => {
  const title = $('h1')?.textContent ?? '';
  const items = $$('[data-ingredient]').map((el) => el.textContent!.trim());
  const added = store.addItems(items, title);

  addBtn.textContent =
    added === 0
      ? 'Already on your list'
      : `Added ${added} ${added === 1 ? 'item' : 'items'} to your list`;

  window.setTimeout(() => {
    addBtn.textContent = 'Add all to shopping list';
  }, 2600);
});

/* ------------------------------------------------------------ meal plan -- */

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const planBtn = $('[data-add-to-plan]');
planBtn?.addEventListener('click', () => {
  const slug = planBtn.getAttribute('data-add-to-plan')!;
  const plan = store.plan();
  const free = DAYS.find((day) => !plan[day]);

  if (!free) {
    planBtn.textContent = 'Your week is full';
  } else {
    store.setPlanDay(free, slug);
    planBtn.textContent = `Added to ${free}`;
  }

  window.setTimeout(() => {
    planBtn.textContent = 'Add to meal plan';
  }, 2600);
});

/* ---------------------------------------------------------------- print -- */

$('[data-print]')?.addEventListener('click', () => window.print());

/* ---------------------------------------------------------------- share -- */

/* The links arrive from the generator already built around this recipe's
   canonical URL, so they work before this module runs. Everything here is
   enhancement: point them at the address the visitor is really on, offer the
   device share sheet where there is one, and copy the link on request. */

const share = $('[data-share]');

if (share) {
  const canonical = share.getAttribute('data-share-url') ?? '';

  /* The page being viewed, without the fragment or query string so a scroll
     position or a campaign parameter is never shared along with it. A file://
     or about: document falls back to the canonical URL, since its location
     would mean nothing to whoever received it. */
  const shareUrl = /^https?:$/.test(window.location.protocol)
    ? window.location.origin + window.location.pathname
    : canonical;

  /* Retarget the platform links by substituting the URL inside them rather than
     rebuilding each one, so the generator stays the only place the share
     endpoints are written down. encodeURIComponent works a character at a time,
     so the canonical URL encodes to the same substring whether it sits alone in
     a parameter or inside WhatsApp's longer message. */
  if (shareUrl !== canonical) {
    const from = encodeURIComponent(canonical);
    const to = encodeURIComponent(shareUrl);
    $$('[data-share-link]', share).forEach((link) => {
      link.setAttribute('href', (link.getAttribute('href') ?? '').split(from).join(to));
    });
  }

  let statusTimer = 0;

  function report(message: string, kind: 'success' | 'error'): void {
    setStatus(share!, message, kind);
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => setStatus(share!, ''), 2600);
  }

  /* The share sheet is the best option where it exists, and absent on most
     desktop browsers, so the button stays hidden until it is confirmed. */
  const nativeBtn = $('[data-share-native]', share);
  if (nativeBtn && typeof navigator.share === 'function') {
    nativeBtn.hidden = false;
    nativeBtn.addEventListener('click', () => {
      navigator
        .share({
          title: share.getAttribute('data-share-title') ?? document.title,
          text: share.getAttribute('data-share-text') ?? '',
          url: shareUrl
        })
        // Dismissing the sheet rejects, which is not an error worth reporting.
        .catch(() => {});
    });
  }

  /**
   * The Clipboard API where it is available, which needs a secure context,
   * with the older selection-based copy behind it for plain http and Safari.
   */
  async function copyLink(text: string): Promise<void> {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const field = document.createElement('input');
    field.value = text;
    field.readOnly = true;
    field.style.position = 'fixed';
    field.style.top = '0';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    field.remove();

    if (!copied) throw new Error('copy unavailable');
  }

  $('[data-share-copy]', share)?.addEventListener('click', () => {
    copyLink(shareUrl).then(
      () => report('Link copied to your clipboard.', 'success'),
      () => report(`Copying is blocked here. The link is ${shareUrl}`, 'error')
    );
  });
}

/* Anchor targets referenced by the HowToStep structured data. */
$$('.step').forEach((step, i) => {
  step.id = `step-${i + 1}`;
});
