/**
 * Request/response types for the serverless functions.
 *
 * These mirror the shapes Vercel's Node runtime passes to a handler. They are
 * declared here rather than imported from `@vercel/node` on purpose: the two
 * interfaces below are the entire surface this codebase uses from that
 * package, and depending on it would pull in a large build-tool tree — undici,
 * path-to-regexp, ajv — whose advisories would then need tracking for no gain.
 * Vercel supplies the actual runtime at deploy time; nothing here ships.
 *
 * If a handler ever needs more of the platform API, prefer widening these to
 * adding the dependency back.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';

/** What Vercel's Node runtime hands a function as its first argument. */
export interface VercelRequest extends IncomingMessage {
  /** Parsed query string. Repeated keys arrive as an array. */
  query: Record<string, string | string[] | undefined>;
  /** Parsed cookies. The auth code reads the header directly instead. */
  cookies: Record<string, string>;
  /**
   * Parsed body. An object for JSON content types, a string when the runtime
   * could not parse it, and undefined for bodyless methods — `body()` in
   * http.ts normalises all three.
   */
  body: unknown;
}

/** The response object, with the Express-style helpers the runtime adds. */
export interface VercelResponse extends ServerResponse {
  send: (body: string | Buffer | object) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  status: (code: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
}
