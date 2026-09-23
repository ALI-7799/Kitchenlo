/**
 * The admin's only route to the server.
 *
 * Every request goes through `call`, which means credentials, error shaping
 * and the session-expiry redirect are handled once rather than at forty call
 * sites. Nothing here holds a token: the session lives in an HttpOnly cookie
 * the browser attaches automatically and this code cannot read, which is what
 * makes a script injected into this page unable to steal it.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    override readonly message: string,
    /** Field-level problems from the validator, when it sent any. */
    readonly details: string[] = []
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Fired when the server says the session is gone, so the UI can sign out. */
export type SessionLostHandler = () => void;

let onSessionLost: SessionLostHandler = () => {};

export function setSessionLostHandler(handler: SessionLostHandler): void {
  onSessionLost = handler;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...init,
      // The session cookie is SameSite=Strict, so it travels on same-origin
      // requests; being explicit keeps it working if the admin is ever served
      // from a different subdomain.
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init.headers ?? {})
      }
    });
  } catch {
    // A network failure, not an HTTP error — worth distinguishing, because
    // "you are offline" and "the server refused that" need different fixes.
    throw new ApiError(0, 'Could not reach the server. Check your connection.');
  }

  if (response.status === 204) return undefined as T;

  let payload: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      // A non-JSON body from an API route means something upstream answered
      // instead — a platform error page, usually. Say so rather than showing
      // the visitor a fragment of HTML.
      throw new ApiError(response.status, `Unexpected response (${response.status})`);
    }
  }

  if (!response.ok) {
    const record = (payload ?? {}) as { error?: string; details?: unknown };

    if (response.status === 401) {
      onSessionLost();
      throw new ApiError(401, record.error ?? 'Your session has expired. Sign in again.');
    }

    throw new ApiError(
      response.status,
      record.error ?? `Request failed (${response.status})`,
      Array.isArray(record.details) ? record.details.map(String) : []
    );
  }

  return payload as T;
}

/* ----------------------------------------------------------------- types -- */

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface RecipeListItem {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  difficulty: string;
  totalMinutes: number;
  dateModified: string;
  published: boolean;
  hasVideo: boolean;
  hasImage: boolean;
}

export interface IngredientGroup {
  group: string;
  items: string[];
}

export interface InstructionStep {
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Nutrition {
  calories: number; protein: number; carbs: number;
  fat: number; fiber: number; sugar: number; sodium: number;
}

export interface RecipeVideo {
  url: string;
  poster?: string;
  title?: string;
  seconds?: number;
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  intro: string;
  category: string;
  cuisine: string;
  course: string;
  method: string;
  diet: string[];
  keywords: string[];
  image: string | null;
  imageAlt: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  yieldText: string;
  difficulty: string;
  rating: number;
  ratingCount: number;
  datePublished: string;
  dateModified: string;
  nutrition: Nutrition;
  equipment: string[];
  ingredients: IngredientGroup[];
  instructions: InstructionStep[];
  tips: string[];
  variations: string[];
  storage: string;
  faqs: Faq[];
  related: string[];
  video?: RecipeVideo | null;
  published?: boolean;
}

export interface Stats {
  totals: { recipes: number; drafts: number; guides: number; collections: number };
  views: { today: number; week: number; month: number };
  topRecipes: { path: string; slug: string; views: number }[];
  topSearches: { term: string; searches: number; hits: number }[];
  missedSearches: { term: string; searches: number }[];
  daily: { on_date: string; views: number }[];
}

export interface RotdDay {
  date: string;
  computed: string | null;
  pinned: string | null;
  note: string;
  effective: string | null;
}

/* ------------------------------------------------------------- endpoints -- */

export const api = {
  /* auth */
  signIn: (email: string, password: string) =>
    call<{ user: AdminUser }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  session: () => call<{ user: AdminUser }>('/api/admin/session'),

  signOut: () => call<void>('/api/admin/session', { method: 'DELETE' }),

  /* recipes */
  listRecipes: (query = '') =>
    call<{ recipes: RecipeListItem[]; total: number }>(
      `/api/admin/recipes${query ? `?q=${encodeURIComponent(query)}` : ''}`
    ),

  // draft=1 so the editor can open an unpublished recipe.
  getRecipe: (slug: string) =>
    call<{ recipe: Recipe }>(`/api/recipes/${encodeURIComponent(slug)}?draft=1`),

  createRecipe: (recipe: Partial<Recipe>) =>
    call<{ recipe: Recipe }>('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe)
    }),

  updateRecipe: (slug: string, recipe: Partial<Recipe>) =>
    call<{ recipe: Recipe }>(`/api/recipes/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      body: JSON.stringify(recipe)
    }),

  deleteRecipe: (slug: string) =>
    call<{ deleted: string }>(`/api/recipes/${encodeURIComponent(slug)}`, {
      method: 'DELETE'
    }),

  /* media */
  uploadImage: (filename: string, dataUrl: string) =>
    call<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: JSON.stringify({ filename, data: dataUrl })
    }),

  /* recipe of the day */
  rotd: () => call<{ days: RotdDay[]; timezone: string }>('/api/admin/rotd'),

  pinRotd: (date: string, slug: string, note = '') =>
    call<void>('/api/admin/rotd', {
      method: 'POST',
      body: JSON.stringify({ date, slug, note })
    }),

  unpinRotd: (date: string) =>
    call<void>(`/api/admin/rotd?date=${encodeURIComponent(date)}`, { method: 'DELETE' }),

  /* dashboard */
  stats: () => call<Stats>('/api/admin/stats'),

  publish: () => call<{ queued: boolean; note: string }>('/api/admin/publish', {
    method: 'POST'
  })
};
