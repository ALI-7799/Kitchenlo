/**
 * Admin authentication.
 *
 * Deliberately boring and entirely server-side:
 *
 *   - Passwords are hashed with scrypt, which is memory-hard. A GPU farm gets
 *     far less leverage against it than against SHA-256, which is what the
 *     visitor-facing demo auth in src/browser/auth.ts uses and openly admits
 *     is demo-grade.
 *   - Sessions are rows in `admin_sessions`, not self-describing tokens. The
 *     cookie carries a random id and nothing else, so signing out revokes
 *     access immediately instead of waiting for a JWT to expire on its own.
 *   - Only the SHA-256 of the cookie value is stored, so a leaked database
 *     backup does not hand anyone a working session.
 *
 * Nothing in this file is reachable from the browser bundle; the admin page
 * talks to it exclusively over /api/admin/*.
 */
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import type { VercelRequest, VercelResponse } from './vercel.js';

import { db } from './db.js';
import { unauthorized } from './http.js';

const scrypt = promisify(crypto.scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: crypto.ScryptOptions
) => Promise<Buffer>;

export const COOKIE_NAME = 'kl_admin';
const SESSION_DAYS = 7;

/*
 * scrypt cost. N=2^15 with r=8 needs ~32 MB and lands around 100ms on the
 * function's CPU — slow enough to make offline cracking expensive, fast enough
 * that a sign-in does not appear broken. maxmem must be raised to match, since
 * Node's 32 MB default is exactly on the boundary and throws.
 */
const SCRYPT = { N: 32768, r: 8, p: 1, maxmem: 96 * 1024 * 1024 } as const;
const KEYLEN = 64;

/* ------------------------------------------------------------ passwords -- */

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password.normalize('NFKC'), salt, KEYLEN, SCRYPT);
  // Parameters travel with the hash so they can be raised later without
  // invalidating every existing password.
  return [
    'scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p,
    salt.toString('base64'), hash.toString('base64')
  ].join('$');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  const salt = Buffer.from(parts[4]!, 'base64');
  const expected = Buffer.from(parts[5]!, 'base64');
  if (!N || !r || !p || !expected.length) return false;

  const actual = await scrypt(password.normalize('NFKC'), salt, expected.length, {
    N, r, p, maxmem: Math.max(SCRYPT.maxmem, 256 * N * r)
  });

  // Constant-time: a length-dependent early return would leak the hash length,
  // and a byte-wise comparison would leak how far the guess got.
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

/* ------------------------------------------------------------- sessions -- */

const sha256 = (value: string): string =>
  crypto.createHash('sha256').update(value).digest('hex');

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Issues a session and returns the cookie value. The caller sets the cookie;
 * only the hash reaches the database.
 */
export async function createSession(
  userId: string,
  req: VercelRequest
): Promise<{ token: string; expiresAt: Date }> {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400_000);

  await db()`
    insert into admin_sessions (token_hash, user_id, expires_at, user_agent, ip_hash)
    values (
      ${sha256(token)},
      ${userId}::uuid,
      ${expiresAt},
      ${String(req.headers['user-agent'] ?? '').slice(0, 200)},
      ${hashedIp(req)}
    )
  `;

  return { token, expiresAt };
}

/**
 * Resolves the caller's session, or throws 401.
 *
 * Expired rows are deleted opportunistically here rather than by a scheduled
 * job: the table is small, this runs on every admin request anyway, and it
 * removes a moving part that could silently stop running.
 */
export async function requireAdmin(req: VercelRequest): Promise<AdminUser> {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) throw unauthorized();

  const rows = await db()<{ id: string; email: string; name: string; expires_at: Date }[]>`
    select u.id, u.email, u.name, s.expires_at
      from admin_sessions s
      join admin_users u on u.id = s.user_id
     where s.token_hash = ${sha256(token)}
     limit 1
  `;

  const row = rows[0];
  if (!row) throw unauthorized();

  if (new Date(row.expires_at).getTime() <= Date.now()) {
    await db()`delete from admin_sessions where token_hash = ${sha256(token)}`;
    throw unauthorized('Session expired');
  }

  return { id: row.id, email: row.email, name: row.name };
}

export async function destroySession(req: VercelRequest): Promise<void> {
  const token = readCookie(req, COOKIE_NAME);
  if (token) await db()`delete from admin_sessions where token_hash = ${sha256(token)}`;
}

/** Housekeeping, called after a successful sign-in. */
export async function purgeExpiredSessions(): Promise<void> {
  await db()`delete from admin_sessions where expires_at < now()`;
}

/* -------------------------------------------------------------- cookies -- */

export function setSessionCookie(res: VercelResponse, token: string, expiresAt: Date): void {
  res.setHeader('Set-Cookie', serialiseCookie(token, expiresAt));
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader('Set-Cookie', serialiseCookie('', new Date(0)));
}

function serialiseCookie(value: string, expires: Date): string {
  const attributes = [
    `${COOKIE_NAME}=${value}`,
    'Path=/',
    // Unreadable from JavaScript, so an XSS flaw anywhere on the site cannot
    // exfiltrate an admin session.
    'HttpOnly',
    // Not sent on any cross-site navigation, which is what makes CSRF against
    // these endpoints impractical.
    'SameSite=Strict',
    `Expires=${expires.toUTCString()}`
  ];
  // Localhost is served over plain HTTP, and a Secure cookie would simply not
  // be stored there, making local admin work impossible.
  if (process.env['NODE_ENV'] !== 'development') attributes.push('Secure');
  return attributes.join('; ');
}

export function readCookie(req: VercelRequest, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

/* ------------------------------------------------------------------ ip --- */

/**
 * A salted, truncated hash of the caller's IP — enough to throttle one
 * attacker, not enough to identify a person or to link two sessions across a
 * salt rotation. The raw address is never written down.
 */
export function hashedIp(req: VercelRequest): string {
  const forwarded = String(req.headers['x-forwarded-for'] ?? '');
  const ip = forwarded.split(',')[0]?.trim() || 'unknown';
  const salt = process.env['ADMIN_SESSION_SECRET'] ?? 'kitchenlo-dev-salt';
  return crypto.createHmac('sha256', salt).update(ip).digest('hex').slice(0, 32);
}
