/**
 * Cookie consent.
 *
 * Two things live here: the record of what the visitor allowed, and the UI for
 * changing it. Nothing else in the bundle reads or writes that record, so the
 * rules stay in one file.
 *
 * Necessary storage is never gated. The theme, saved recipes, the meal plan and
 * the signed-in session are what make the site work, they stay in the visitor's
 * own browser, and the site cannot function without them.
 *
 * Optional categories are declared in OPTIONAL below and are off until the
 * visitor says otherwise. Kitchenlo runs no analytics and no advertising today,
 * and this file deliberately adds none. It exists so that when one is added it
 * can be gated:
 *
 *     import { allows, onChange } from './consent.js';
 *     if (allows('analytics')) startAnalytics();
 *     onChange(() => { ... });          // react to a later change of mind
 *
 * Unbundled scripts can use the same gate through window.KitchenloConsent.
 * Until such a call exists, granting analytics permission switches nothing on,
 * which is why the dialog says as much rather than implying otherwise.
 */
import { $, readStorage, writeStorage } from './dom.js';

/**
 * Bump when the meaning of an existing answer changes — a new purpose for a
 * category, say — and every visitor is asked again. Adding a category needs no
 * bump: a stored record that predates it is treated as undecided, because a
 * question that was never put cannot have been answered.
 */
const VERSION = 1;
const KEY = 'kitchenlo-consent';

/** Adding a category here is all it takes for it to appear in the dialog. */
const OPTIONAL = [
  {
    id: 'analytics',
    title: 'Analytics',
    description:
      'Anonymous statistics about which recipes people actually cook, so we know what is worth writing more of.'
  },
  {
    id: 'advertising',
    title: 'Advertising',
    description:
      'Measuring or personalising adverts, and sharing what is needed for that with an advertising provider.'
  }
] as const;

export type OptionalCategory = (typeof OPTIONAL)[number]['id'];

type Allowed = Partial<Record<OptionalCategory, boolean>>;

interface StoredConsent {
  v: number;
  decidedAt: string;
  allowed: Allowed;
}

type Listener = (allowed: Allowed) => void;

const listeners: Listener[] = [];

/* ------------------------------------------------------------- the record -- */

/**
 * The visitor's answer, or null when they have not given one. A record from an
 * older version, or one written before a category existed, counts as no answer.
 */
export function decision(): Allowed | null {
  const stored = readStorage<StoredConsent | null>(KEY, null);
  if (!stored || stored.v !== VERSION || typeof stored.allowed !== 'object') return null;
  if (OPTIONAL.some((c) => typeof stored.allowed[c.id] !== 'boolean')) return null;
  return stored.allowed;
}

/** Whether one optional category may run. Anything undecided is a no. */
export function allows(category: OptionalCategory): boolean {
  return decision()?.[category] === true;
}

/** Called after every change, including the first answer. */
export function onChange(listener: Listener): void {
  listeners.push(listener);
}

function save(allowed: Allowed): void {
  writeStorage(KEY, { v: VERSION, decidedAt: new Date().toISOString(), allowed });
  listeners.forEach((listener) => listener(allowed));
}

const everything = (value: boolean): Allowed =>
  Object.fromEntries(OPTIONAL.map((c) => [c.id, value])) as Allowed;

/* ---------------------------------------------------------------- banner -- */

let banner: HTMLElement | null = null;

function removeBanner(): void {
  banner?.remove();
  banner = null;
}

function showBanner(): void {
  if (banner || $('#cookieBanner')) return;

  banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-labelledby', 'cookieBannerTitle');
  banner.innerHTML = `
    <div class="container cookie-banner-inner">
      <div class="cookie-copy">
        <h2 id="cookieBannerTitle">Cookies on Kitchenlo</h2>
        <p>
          We keep a little in your browser to make the site work: your theme, saved
          recipes, meal plan and sign-in. That much is necessary. Anything optional,
          such as analytics, stays switched off until you allow it.
        </p>
      </div>
      <div class="cookie-actions">
        <button class="btn btn-primary btn-sm" type="button" data-cookie-accept>Accept all</button>
        <button class="btn btn-secondary btn-sm" type="button" data-cookie-reject>Reject all</button>
        <button class="btn btn-ghost btn-sm" type="button" data-cookie-preferences>Manage preferences</button>
      </div>
    </div>`;

  /* First in the document, so the keyboard reaches it before the page even
     though it is painted at the bottom. Focus is left where it was rather than
     yanked out from under the visitor. */
  document.body.insertBefore(banner, document.body.firstChild);
}

/* ---------------------------------------------------------------- dialog -- */

let dialog: HTMLElement | null = null;
let lastFocused: Element | null = null;

function buildDialog(): HTMLElement {
  const options = OPTIONAL.map(
    (c) => `
        <div class="cookie-option">
          <input type="checkbox" id="cookie-${c.id}" data-cookie-option="${c.id}" />
          <div>
            <label for="cookie-${c.id}">${c.title}</label>
            <p>${c.description}</p>
          </div>
        </div>`
  ).join('');

  const el = document.createElement('div');
  el.className = 'cookie-dialog';
  el.id = 'cookieDialog';
  el.hidden = true;
  el.innerHTML = `
    <div class="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookieDialogTitle">
      <div class="cookie-panel-head">
        <h2 id="cookieDialogTitle">Cookie preferences</h2>
        <button class="cookie-close" type="button" data-cookie-close aria-label="Close cookie preferences">
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="cookie-panel-body">
        <div class="cookie-option">
          <input type="checkbox" id="cookie-necessary" checked disabled />
          <div>
            <label for="cookie-necessary">Necessary <span class="cookie-locked">Always on</span></label>
            <p>
              Your theme, saved recipes, meal plan, shopping list and signed-in
              session. Kept in your browser, never sent anywhere, and required for
              the site to work.
            </p>
          </div>
        </div>
        ${options}
        <p class="cookie-note">
          Kitchenlo runs no analytics and no advertising at the moment, so there is
          nothing for these to switch on today. Your choice is recorded now and
          honoured if that ever changes.
        </p>
      </div>
      <div class="cookie-panel-foot">
        <button class="btn btn-primary btn-sm" type="button" data-cookie-save>Save preferences</button>
        <button class="btn btn-ghost btn-sm" type="button" data-cookie-close>Cancel</button>
      </div>
    </div>`;

  document.body.appendChild(el);
  return el;
}

function focusable(): HTMLElement[] {
  if (!dialog) return [];
  return Array.from(
    dialog.querySelectorAll<HTMLElement>('button, input:not([disabled]), [href]')
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

/** Opens the preferences dialog, pre-ticked with whatever is already allowed. */
export function open(): void {
  dialog ??= buildDialog();

  const current = decision() ?? {};
  OPTIONAL.forEach((c) => {
    const input = dialog!.querySelector<HTMLInputElement>(`[data-cookie-option="${c.id}"]`);
    if (input) input.checked = current[c.id] === true;
  });

  lastFocused = document.activeElement;
  dialog.hidden = false;
  document.body.style.overflow = 'hidden';

  /* Land on the first real choice rather than the close button, so the first
     keypress cannot dismiss the dialog by accident. */
  const firstChoice = dialog.querySelector<HTMLElement>('[data-cookie-option]');
  (firstChoice ?? focusable()[0])?.focus();
}

function close(): void {
  if (!dialog || dialog.hidden) return;
  dialog.hidden = true;
  document.body.style.overflow = '';
  (lastFocused as HTMLElement | null)?.focus?.();
  lastFocused = null;
}

function isOpen(): boolean {
  return !!dialog && !dialog.hidden;
}

/* --------------------------------------------------------------- wiring -- */

/* One delegated listener covers the banner, the dialog and the footer link on
   every page, so nothing needs per-page wiring and markup added later still
   works. */
document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  if (target.closest('[data-cookie-accept]')) {
    save(everything(true));
    removeBanner();
    close();
    return;
  }

  if (target.closest('[data-cookie-reject]')) {
    save(everything(false));
    removeBanner();
    close();
    return;
  }

  if (target.closest('[data-cookie-preferences]')) {
    event.preventDefault();
    open();
    return;
  }

  if (target.closest('[data-cookie-save]')) {
    const allowed: Allowed = {};
    OPTIONAL.forEach((c) => {
      const input = dialog?.querySelector<HTMLInputElement>(`[data-cookie-option="${c.id}"]`);
      allowed[c.id] = input?.checked === true;
    });
    save(allowed);
    removeBanner();
    close();
    return;
  }

  if (target.closest('[data-cookie-close]')) {
    close();
    return;
  }

  // Clicking the backdrop, but not the panel, closes without deciding.
  if (isOpen() && target === dialog) close();
});

document.addEventListener('keydown', (event) => {
  if (!isOpen()) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    close();
    return;
  }

  // Keep Tab inside the dialog while it is modal.
  if (event.key === 'Tab') {
    const items = focusable();
    if (!items.length) return;
    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

if (!decision()) showBanner();

/* The same gate, for scripts that are not part of the bundle. */
declare global {
  interface Window {
    KitchenloConsent?: {
      allows: typeof allows;
      decision: typeof decision;
      onChange: typeof onChange;
      open: typeof open;
    };
  }
}

window.KitchenloConsent = { allows, decision, onChange, open };
