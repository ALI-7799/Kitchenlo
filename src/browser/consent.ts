/**
 * Cookie and storage consent.
 *
 * Two things live here: the record of what the visitor allowed, and the UI for
 * changing it. Nothing else in the bundle reads or writes that record, so the
 * rules stay in one file.
 *
 * What this site actually stores, which is what the categories below describe:
 *
 *   - Nothing is written to the visitor's device before they choose, except
 *     the consent record itself once they have. No cookie is set for visitors
 *     at all; everything is first-party localStorage.
 *   - Fonts are served from this origin (see section 0 of styles.css), so no
 *     third party is contacted while a page loads. There is no analytics
 *     script, no advertising script and no tag manager anywhere in the bundle.
 *   - The only optional thing that runs today is a first-party page counter,
 *     src/browser/analytics.ts, and it is gated on `analytics` below.
 *
 * The gate for anything optional:
 *
 *     import { allows, onChange } from './consent.js';
 *     if (allows('analytics')) start();
 *     onChange(() => { ... });          // react to a later change of mind
 *
 * Unbundled scripts can use the same gate through window.KitchenloConsent.
 */
import { $, ROOT, readStorage, writeStorage } from './dom.js';

/**
 * Bump when the meaning of an existing answer changes, and every visitor is
 * asked again. Adding a category needs no bump: a stored record that predates
 * it is treated as undecided, because a question that was never put cannot
 * have been answered.
 *
 * 2: categories were renamed and re-scoped, and a first-party page counter now
 *    exists where the previous version said nothing optional ran at all. An
 *    answer given to the old wording cannot be carried over honestly.
 */
const VERSION = 2;
const KEY = 'kitchenlo-consent';

/**
 * Categories the visitor chooses. Off until explicitly allowed, never
 * pre-ticked, and never implied by dismissing anything.
 */
const OPTIONAL = [
  {
    id: 'analytics',
    title: 'Analytics',
    description:
      'A count of which pages are opened, kept on our own server. It records the page address, the date and roughly where the visit came from — never your IP address, and nothing that identifies you or your device.'
  },
  {
    id: 'advertising',
    title: 'Advertising',
    description:
      'Measuring or personalising adverts. Kitchenlo shows no adverts and loads no advertising code today, so allowing this switches nothing on; the answer is kept in case that changes.'
  }
] as const;

/**
 * Categories that run without a choice, listed so they are disclosed rather
 * than hidden. Neither is a toggle, and the reason is stated in the dialog:
 * both are limited to what a feature the visitor has actively used needs in
 * order to work, which is the narrow case consent rules exempt. Nothing
 * optional is folded in here.
 */
const ALWAYS_ON = [
  {
    id: 'necessary',
    title: 'Necessary',
    description:
      'The record of this choice, and your signed-in session if you create an account. Without these the site cannot remember that you have answered, or that you are signed in.'
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description:
      'Your light or dark theme, saved recipes, meal plan and shopping list. Written only when you use one of those features, kept in your browser, and never sent anywhere. Switching them off would mean the feature could not work, so they are not offered as a choice — clear your site data to remove them.'
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

/**
 * Forgets the answer and asks again. This is what makes consent withdrawable
 * rather than merely adjustable: a visitor can return the site to the state it
 * was in before they ever answered.
 */
export function withdraw(): void {
  writeStorage(KEY, null);
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage disabled or full. The record is already overwritten with null,
    // which decision() reads as no answer, so the outcome is the same.
  }
  listeners.forEach((listener) => listener({}));
  showBanner();
}

/* ---------------------------------------------------------------- banner -- */

let banner: HTMLElement | null = null;

function removeBanner(): void {
  banner?.remove();
  banner = null;
}

const privacyHref = `${ROOT}privacy`;

function showBanner(): void {
  if (banner || $('#cookieBanner')) return;

  banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-labelledby', 'cookieBannerTitle');

  /*
   * There is deliberately no close button.
   *
   * A dismiss control on a consent notice has to mean something, and the only
   * honest meanings are "reject" — which the Reject all button already says
   * plainly — or "ask me again", which would put the banner back on the next
   * page and be read as nagging. A close button that silently means "accept",
   * or that hides the question without answering it, is the pattern these
   * rules exist to prevent, so there is none.
   *
   * Accept and Reject share a two-column grid at identical weight. Making
   * refusal the harder of the two to find is the thing consent banners are
   * most criticised for, and equal columns cost nothing.
   */
  banner.innerHTML = `
    <h2 id="cookieBannerTitle">Cookies</h2>
    <p>
      We keep your theme, saved recipes and meal plan in your browser.
      Optional cookies stay off until you allow them.
    </p>
    <div class="cookie-actions">
      <button class="btn btn-primary btn-sm" type="button" data-cookie-accept>Accept all</button>
      <button class="btn btn-secondary btn-sm" type="button" data-cookie-reject>Reject all</button>
    </div>
    <p class="cookie-links">
      <button class="cookie-manage" type="button" data-cookie-preferences>Manage preferences</button>
      <span aria-hidden="true">&middot;</span>
      <a href="${privacyHref}">Privacy Policy</a>
    </p>`;

  /* First in the document, so the keyboard reaches it before the page even
     though it is painted at the bottom. Focus is left where it was rather than
     yanked out from under the visitor. */
  document.body.insertBefore(banner, document.body.firstChild);
}

/* ---------------------------------------------------------------- dialog -- */

let dialog: HTMLElement | null = null;
let lastFocused: Element | null = null;

/** A category the visitor cannot switch off, rendered as a disclosure. */
function alwaysOnRow(c: (typeof ALWAYS_ON)[number]): string {
  return `
        <div class="cookie-option">
          <input type="checkbox" id="cookie-${c.id}" checked disabled />
          <div>
            <label for="cookie-${c.id}">${c.title} <span class="cookie-locked">Always on</span></label>
            <p>${c.description}</p>
          </div>
        </div>`;
}

/** A category the visitor chooses. Never pre-ticked; open() sets the state. */
function optionalRow(c: (typeof OPTIONAL)[number]): string {
  return `
        <div class="cookie-option">
          <input type="checkbox" id="cookie-${c.id}" data-cookie-option="${c.id}" />
          <div>
            <label for="cookie-${c.id}">${c.title}</label>
            <p>${c.description}</p>
          </div>
        </div>`;
}

function buildDialog(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'cookie-dialog';
  el.id = 'cookieDialog';
  el.hidden = true;
  el.innerHTML = `
    <div class="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookieDialogTitle">
      <div class="cookie-panel-head">
        <h2 id="cookieDialogTitle">Cookie preferences</h2>
        <button class="cookie-close" type="button" data-cookie-close aria-label="Close without changing anything">
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="cookie-panel-body">
        ${ALWAYS_ON.map(alwaysOnRow).join('')}
        ${OPTIONAL.map(optionalRow).join('')}
        <p class="cookie-note">
          Kitchenlo sets no cookies for visitors and loads no third-party code:
          the fonts are served from this site, and there is no analytics script,
          advertising script or tag manager anywhere on it. The only optional
          thing that runs today is the page counter described above.
          <a href="${privacyHref}">Read the Privacy Policy</a>.
        </p>
      </div>
      <div class="cookie-panel-foot">
        <button class="btn btn-primary btn-sm" type="button" data-cookie-save>Save preferences</button>
        <button class="btn btn-ghost btn-sm" type="button" data-cookie-close>Cancel</button>
        <button class="cookie-withdraw" type="button" data-cookie-withdraw>Withdraw consent</button>
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

/** Opens the preferences dialog, ticked to whatever is already allowed. */
export function open(): void {
  dialog ??= buildDialog();

  /* Reflects the stored answer, so an unanswered category opens unticked.
     Nothing here defaults to true. */
  const current = decision() ?? {};
  OPTIONAL.forEach((c) => {
    const input = dialog!.querySelector<HTMLInputElement>(`[data-cookie-option="${c.id}"]`);
    if (input) input.checked = current[c.id] === true;
  });

  // Withdrawing is only meaningful once something has been decided.
  const withdrawButton = dialog.querySelector<HTMLElement>('[data-cookie-withdraw]');
  if (withdrawButton) withdrawButton.hidden = decision() === null;

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

  if (target.closest('[data-cookie-withdraw]')) {
    close();
    withdraw();
    return;
  }

  /* Closing changes nothing, which is why the control is labelled "Close
     without changing anything" rather than being an implied answer. */
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
      withdraw: typeof withdraw;
    };
  }
}

window.KitchenloConsent = { allows, decision, onChange, open, withdraw };
