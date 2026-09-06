/**
 * Per-user persisted state: saved recipes, the weekly meal plan, the shopping
 * list and preferences.
 *
 * Data is namespaced by user id so two accounts on one browser cannot see each
 * other's data. Signed-out visitors write to a "guest" namespace, which is
 * merged into the account on first sign-in so nothing saved before registering
 * is lost.
 */
import { auth } from './auth.js';
import { readStorage, removeStorage, writeStorage } from './dom.js';
import type { DietTag } from '../types.js';

const PREFIX = 'kitchenlo-data:';
const GUEST = 'guest';

export interface ListItem {
  id: string;
  text: string;
  source: string;
  checked: boolean;
}

export interface Preferences {
  diet: DietTag | '';
  servings: number;
  metric: boolean;
}

export interface StoreData {
  favorites: string[];
  /** Day name -> recipe slug. */
  plan: Record<string, string>;
  list: ListItem[];
  prefs: Preferences;
}

function defaults(): StoreData {
  return { favorites: [], plan: {}, list: [], prefs: { diet: '', servings: 4, metric: false } };
}

function namespaceFor(): string {
  return auth.current()?.id ?? GUEST;
}

function keyFor(namespace: string): string {
  return PREFIX + namespace;
}

function read(namespace: string): StoreData {
  return { ...defaults(), ...readStorage<Partial<StoreData>>(keyFor(namespace), {}) };
}

function write(namespace: string, data: StoreData): void {
  writeStorage(keyFor(namespace), data);
}

type Listener = (data: StoreData) => void;
let listeners: Listener[] = [];

function emit(): void {
  const snapshot = all();
  for (const listener of listeners) {
    try {
      listener(snapshot);
    } catch {
      /* ignore */
    }
  }
}

function update(mutate: (data: StoreData) => void): StoreData {
  const namespace = namespaceFor();
  const data = read(namespace);
  mutate(data);
  write(namespace, data);
  emit();
  return data;
}

export function all(): StoreData {
  return read(namespaceFor());
}

export function onChange(listener: Listener): () => void {
  listeners.push(listener);
  listener(all());
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export const refresh = emit;

/* ------------------------------------------------------------ favorites -- */

export function favorites(): string[] {
  return all().favorites;
}

export function isFavorite(slug: string): boolean {
  return all().favorites.includes(slug);
}

/** @returns true if the recipe was added, false if it was removed. */
export function toggleFavorite(slug: string): boolean {
  let added = false;
  update((data) => {
    const index = data.favorites.indexOf(slug);
    if (index === -1) {
      data.favorites.push(slug);
      added = true;
    } else {
      data.favorites.splice(index, 1);
    }
  });
  return added;
}

export function clearFavorites(): void {
  update((data) => {
    data.favorites = [];
  });
}

/* ----------------------------------------------------------------- plan -- */

export function plan(): Record<string, string> {
  return all().plan;
}

export function setPlanDay(day: string, slug: string | null): void {
  update((data) => {
    if (slug) data.plan[day] = slug;
    else delete data.plan[day];
  });
}

export function clearPlan(): void {
  update((data) => {
    data.plan = {};
  });
}

/* ------------------------------------------------------------- shopping -- */

export function list(): ListItem[] {
  return all().list;
}

/**
 * Adds items, skipping any whose text already appears.
 * @returns how many were actually added.
 */
export function addItems(items: string[], source = ''): number {
  let added = 0;
  update((data) => {
    for (const raw of items) {
      const text = String(raw).trim();
      if (!text) continue;
      if (data.list.some((entry) => entry.text.toLowerCase() === text.toLowerCase())) continue;
      data.list.push({
        id: 'i_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text,
        source,
        checked: false
      });
      added++;
    }
  });
  return added;
}

export function toggleItem(id: string): void {
  update((data) => {
    for (const entry of data.list) {
      if (entry.id === id) entry.checked = !entry.checked;
    }
  });
}

export function removeItem(id: string): void {
  update((data) => {
    data.list = data.list.filter((entry) => entry.id !== id);
  });
}

export function clearChecked(): void {
  update((data) => {
    data.list = data.list.filter((entry) => !entry.checked);
  });
}

export function clearList(): void {
  update((data) => {
    data.list = [];
  });
}

/* ---------------------------------------------------------------- prefs -- */

export function prefs(): Preferences {
  return all().prefs;
}

export function setPrefs(updates: Partial<Preferences>): void {
  update((data) => {
    data.prefs = { ...data.prefs, ...updates };
  });
}

/* ------------------------------------------------------------ lifecycle -- */

/** Folds anything saved while signed out into the account's namespace. */
export function mergeGuestInto(userId: string): void {
  const guest = read(GUEST);
  const hasData =
    guest.favorites.length > 0 || Object.keys(guest.plan).length > 0 || guest.list.length > 0;
  if (!hasData) return;

  const target = read(userId);

  for (const slug of guest.favorites) {
    if (!target.favorites.includes(slug)) target.favorites.push(slug);
  }
  for (const [day, slug] of Object.entries(guest.plan)) {
    target.plan[day] ??= slug;
  }
  for (const entry of guest.list) {
    if (!target.list.some((e) => e.text.toLowerCase() === entry.text.toLowerCase())) {
      target.list.push(entry);
    }
  }

  write(userId, target);
  write(GUEST, defaults());
  emit();
}

export function exportData(): { exportedAt: string; user: unknown; data: StoreData } {
  return { exportedAt: new Date().toISOString(), user: auth.current(), data: all() };
}

export function wipe(): void {
  removeStorage(keyFor(namespaceFor()));
  emit();
}

/* Rebind every view when the account changes. */
let previous = auth.current();
auth.onChange((user) => {
  if (user && !previous) mergeGuestInto(user.id);
  previous = user;
  emit();
});

/* Keep multiple tabs in sync. */
window.addEventListener('storage', (event) => {
  if (event.key?.startsWith(PREFIX)) emit();
});
