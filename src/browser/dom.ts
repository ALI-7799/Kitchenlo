/**
 * Small DOM helpers shared by every browser module.
 *
 * These replace the old `window.KitchenloUI` global. Nothing on the client
 * hangs off `window` any more; modules import what they need and esbuild
 * resolves it at build time.
 */

export function $<T extends Element = HTMLElement>(
  selector: string,
  scope: ParentNode = document
): T | null {
  return scope.querySelector<T>(selector);
}

export function $$<T extends Element = HTMLElement>(
  selector: string,
  scope: ParentNode = document
): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

export function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]!);
}

/**
 * How many directories deep the current page sits, so links and image paths
 * built on the client match the ones the generator produced.
 *
 * The generator knows this exactly and publishes it as body[data-depth], so we
 * read it rather than infer it. Inferring it from the URL meant keeping a list
 * of nested directory names in sync with the generator by hand, and that list
 * silently omitted /collection/: every client-built image path on a collection
 * page came out one directory too shallow and 404ed, so search results there
 * rendered as broken images.
 *
 * The URL test survives only as a fallback for a page cached before the
 * attribute existed, and now names every directory the generator emits.
 */
function readDepth(): number {
  const declared = document.body?.getAttribute('data-depth');
  if (declared && /^\d+$/.test(declared)) return Number(declared);
  return /\/(recipes|category|collection|guides)\/[^/]*$/.test(window.location.pathname) ? 1 : 0;
}

export const depth: number = readDepth();

/** Prefix back to the site root, for hand-built links. */
export const ROOT = depth > 0 ? '../' : '';

export type StatusKind = 'error' | 'success' | '';

export function setStatus(form: ParentNode, message: string, kind: StatusKind = ''): void {
  const status = $('.form-status', form);
  if (!status) return;
  status.textContent = message;
  status.className = 'form-status' + (kind ? ' is-' + kind : '');
}

/**
 * Sets or clears the message under one field.
 * @returns true when the field is valid, so callers can AND results together.
 */
export function setFieldError(id: string, message: string): boolean {
  const field = document.getElementById(id);
  const error = $(`[data-error-for="${id}"]`);
  field?.closest('.field')?.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message || '';
  return !message;
}

export function clearErrors(form: ParentNode): void {
  $$('.field-error', form).forEach((el) => {
    el.textContent = '';
  });
  $$('.field', form).forEach((el) => el.classList.remove('has-error'));
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Reads localStorage without throwing where storage is blocked or full. */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable; nothing to remove */
  }
}
