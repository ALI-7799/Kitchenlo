/**
 * POST /api/admin/login
 *
 * Defences here, in the order they matter:
 *
 *   1. Per-account lockout in the database, so an attacker rotating through
 *      addresses still only gets LOGIN_MAX_FAILURES attempts at one account.
 *      This is the one that actually works against credential stuffing; an
 *      in-memory per-instance counter would reset on every cold start.
 *   2. A uniform error message and a uniform response time whether the
 *      account exists or not, so this endpoint cannot be used to enumerate
 *      admin addresses.
 *   3. Origin checking on top of the SameSite=Strict session cookie.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, badRequest, body, cacheNever, json,
  tooMany, unauthorized, withErrors
} from '../_lib/http.js';
import {
  createSession, hashedIp, purgeExpiredSessions, setSessionCookie, verifyPassword
} from '../_lib/auth.js';
import { db } from '../_lib/db.js';
import { LOGIN_LOCK_MINUTES, LOGIN_MAX_FAILURES, overLimit } from '../_lib/rate-limit.js';

interface AdminRow {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  failed_logins: number;
  locked_until: Date | null;
}

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'POST');
  assertSameOrigin(req);
  cacheNever(res);

  const { email, password } = body<{ email?: string; password?: string }>(req);
  const address = String(email ?? '').trim().toLowerCase();
  const secret = String(password ?? '');

  if (!address || !secret) throw badRequest('Email and password are both required');

  // A coarse per-instance cap in front of the real per-account lockout, so a
  // flood costs an attacker connections before it costs us scrypt time.
  if (overLimit(`login:${hashedIp(req)}`, 20, 15 * 60_000)) {
    throw tooMany('Too many sign-in attempts. Try again shortly.');
  }

  const rows = await db()<AdminRow[]>`
    select id, email, name, password_hash, failed_logins, locked_until
      from admin_users where email = ${address} limit 1
  `;
  const user = rows[0];

  if (user?.locked_until && new Date(user.locked_until).getTime() > Date.now()) {
    const minutes = Math.ceil(
      (new Date(user.locked_until).getTime() - Date.now()) / 60_000
    );
    throw tooMany(`Account temporarily locked. Try again in ${minutes} minute(s).`);
  }

  /*
   * Always run a verification, even with no such account.
   *
   * Returning early for an unknown address would make a missing account
   * answer in a millisecond and a real one in ~100ms, which is a reliable
   * oracle for "is this an admin address". Hashing against a dummy of the same
   * cost removes the difference.
   */
  const stored = user?.password_hash ?? DUMMY_HASH;
  const ok = await verifyPassword(secret, stored);

  if (!user || !ok) {
    if (user) await recordFailure(user);
    // Identical message either way.
    throw unauthorized('Email or password is incorrect');
  }

  await db()`
    update admin_users
       set failed_logins = 0, locked_until = null, last_login_at = now()
     where id = ${user.id}::uuid
  `;

  const { token, expiresAt } = await createSession(user.id, req);
  setSessionCookie(res, token, expiresAt);

  // Cheap housekeeping on a rare request, rather than a scheduled job that
  // could quietly stop running.
  void purgeExpiredSessions().catch(() => {});

  json(res, 200, {
    user: { id: user.id, email: user.email, name: user.name },
    expiresAt: expiresAt.toISOString()
  });
});

async function recordFailure(user: AdminRow): Promise<void> {
  const failures = user.failed_logins + 1;
  const lock = failures >= LOGIN_MAX_FAILURES;

  await db()`
    update admin_users
       set failed_logins = ${lock ? 0 : failures},
           locked_until = ${lock
             ? new Date(Date.now() + LOGIN_LOCK_MINUTES * 60_000)
             : null}
     where id = ${user.id}::uuid
  `;
}

/**
 * A real scrypt hash of an unguessable value, used only to spend the same CPU
 * time on a nonexistent account as on a real one. It must be a genuine hash in
 * the stored format, or verifyPassword would reject it early and reintroduce
 * the timing difference this exists to remove.
 */
const DUMMY_HASH =
  'scrypt$32768$8$1$' +
  'Y2FuYXJ5c2FsdGNhbmFyeXM=$' +
  'ZG8gbm90IG1hdGNoIGFueXRoaW5nIC0gdGhpcyBpcyBhIHRpbWluZyBjYW5hcnkgdmFsdWUu';
