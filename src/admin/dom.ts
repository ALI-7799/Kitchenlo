/**
 * DOM helpers for the admin.
 *
 * The important one is `esc`. Recipe text is written by an admin, but it is
 * also read back from the database and rendered into this page with innerHTML,
 * so a title containing `<script>` would run here even though the public site
 * escapes it correctly. Every interpolation in the admin goes through `esc`
 * for that reason — the editor is not a trusted rendering context just because
 * only trusted people can reach it.
 */

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Escapes the five characters that can break out of text or an attribute. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escapes a value for use in a URL-bearing attribute.
 *
 * `esc` alone is not enough there: it leaves `javascript:alert(1)` intact,
 * which is inert as text but executes as an href or a src. Anything that is
 * not plainly http(s) or a rooted path is replaced rather than emitted.
 */
export function escUrl(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  if (/^(https?:\/\/|\/)/i.test(raw)) return esc(raw);
  return '';
}

/** Splits a comma or newline separated field into a clean list. */
export function splitList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Splits a textarea into one entry per non-empty line. */
export function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''));
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  });
}

/** Reads a File as a data: URL, which is what the upload endpoint accepts. */
export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read that file'));
    reader.readAsDataURL(file);
  });
}
