/**
 * Shared request/response plumbing for the serverless functions.
 *
 * Everything an endpoint needs to be well-behaved — method checking, JSON
 * bodies, cache headers, error shaping — lives here so that no individual
 * route has to remember it, and so a fix applies everywhere at once.
 */
import type { VercelRequest, VercelResponse } from './vercel.js';

export type Handler = (req: VercelRequest, res: VercelResponse) => Promise<void> | void;

/**
 * An error carrying the status it should produce.
 *
 * Routes throw these; `withErrors` turns them into responses. That keeps the
 * happy path in each handler free of early-return plumbing.
 */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    override readonly message: string,
    readonly details?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const badRequest = (m: string, d?: unknown) => new HttpError(400, m, d);
export const unauthorized = (m = 'Sign in required') => new HttpError(401, m);
export const forbidden = (m = 'Not allowed') => new HttpError(403, m);
export const notFound = (m = 'Not found') => new HttpError(404, m);
export const conflict = (m: string) => new HttpError(409, m);
export const tooMany = (m = 'Too many requests') => new HttpError(429, m);

/* --------------------------------------------------------------- output -- */

export function json(res: VercelResponse, status: number, body: unknown): void {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(body));
}

/**
 * Cache policy for public reads.
 *
 * `s-maxage` lets Vercel's edge serve most traffic without waking a function,
 * and `stale-while-revalidate` means the refresh happens behind an already-
 * served response. Browsers are told not to cache (`max-age=0`) so an admin
 * edit is visible on their next load rather than after a private TTL lapses.
 */
export function cachePublic(res: VercelResponse, seconds = 300): void {
  res.setHeader(
    'Cache-Control',
    `public, max-age=0, s-maxage=${seconds}, stale-while-revalidate=${seconds * 4}`
  );
}

/** Anything authenticated or per-visitor must never be stored by a shared cache. */
export function cacheNever(res: VercelResponse): void {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
}

/* ------------------------------------------------------------- security -- */

/**
 * Headers applied to every API response.
 *
 * `nosniff` matters most here: without it a browser may treat a JSON response
 * containing attacker-influenced text as HTML and run it.
 */
export function securityHeaders(res: VercelResponse): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}

/**
 * The API is same-origin only — the site and the functions share a host, so
 * there is no legitimate cross-origin caller and therefore no Access-Control-
 * Allow-Origin header anywhere in this codebase. Declining to send one is what
 * stops another site from reading an admin response using a visitor's cookies.
 *
 * State-changing routes additionally check Origin explicitly, because
 * SameSite=Strict cookies are a strong defence but not a universal one across
 * every browser version in the wild.
 */
export function assertSameOrigin(req: VercelRequest): void {
  const origin = req.headers.origin;
  // Same-origin fetches from older browsers, and server-to-server calls, may
  // omit Origin entirely. A cross-site *browser* request always carries it,
  // which is the threat this guards.
  if (!origin) return;

  const host = req.headers.host;
  if (!host) throw forbidden('Missing Host header');

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw forbidden('Malformed Origin header');
  }

  if (originHost !== host) throw forbidden('Cross-origin request refused');
}

/* -------------------------------------------------------------- methods -- */

export function assertMethod(req: VercelRequest, ...allowed: string[]): string {
  const method = (req.method || 'GET').toUpperCase();
  if (!allowed.includes(method)) {
    throw new HttpError(405, `Method ${method} not allowed`, { allowed });
  }
  return method;
}

/* ----------------------------------------------------------------- body -- */

/**
 * Vercel parses JSON bodies already, but only when the content type says so
 * and the body is small enough. This normalises the three shapes a handler can
 * actually receive (parsed object, raw string, absent) into one.
 */
export function body<T = Record<string, unknown>>(req: VercelRequest): T {
  const raw = req.body;
  if (raw === undefined || raw === null || raw === '') return {} as T;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as T;
    } catch {
      throw badRequest('Request body is not valid JSON');
    }
  }
  return raw as T;
}

/** First value of a query parameter, which Vercel types as string | string[]. */
export function param(req: VercelRequest, name: string): string {
  const value = req.query[name];
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

export function intParam(req: VercelRequest, name: string, fallback: number): number {
  const raw = param(req, name);
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------------------------------------------------------- wrap --- */

/**
 * Wraps a handler so that security headers are always set and a thrown error
 * always becomes a response rather than an unhandled rejection.
 *
 * Unexpected errors are logged in full but answered with a generic message:
 * a Postgres error string can name tables, columns and constraints, and none
 * of that belongs in a public response body.
 */
export function withErrors(handler: Handler): Handler {
  return async (req, res) => {
    securityHeaders(res);
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof HttpError) {
        cacheNever(res);
        json(res, error.status, {
          error: error.message,
          ...(error.details ? { details: error.details } : {})
        });
        return;
      }
      console.error('[api] unhandled error', error);
      cacheNever(res);
      json(res, 500, { error: 'Internal server error' });
    }
  };
}
