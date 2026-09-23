/**
 * Rate limiting.
 *
 * Two tiers, because the two things worth limiting have different shapes.
 *
 * Login is limited *per account*, in the database, via `failed_logins` and
 * `locked_until` on admin_users. That is the tier that actually matters: it
 * survives across serverless instances and across a rotating source address,
 * which is exactly what a credential-stuffing attempt looks like.
 *
 * Everything else uses the in-memory limiter below, which is per-instance and
 * therefore leaky — an attacker spread across enough cold starts gets more
 * than the nominal budget. It is deliberately not backed by the database:
 * writing a row per request to throttle requests inverts the cost, and the
 * abuse it defends against (someone inflating a view counter) is not worth a
 * write amplification. Treat it as a speed bump, not a wall.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Cap on distinct keys held, so a spray of unique keys cannot grow this without bound. */
const MAX_KEYS = 10_000;

/**
 * Records a hit and reports whether the caller is over budget.
 *
 * @param key    Identity to limit on — already hashed where it derives from an IP.
 * @param limit  Permitted hits per window.
 * @param windowMs Window length in milliseconds.
 */
export function overLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) sweep(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

/**
 * Drops expired buckets, and if that frees nothing, drops the oldest half.
 * Without the second step a flood of simultaneous unique keys would sit at the
 * cap forever and lock out new ones.
 */
function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size < MAX_KEYS) return;

  const byAge = [...buckets.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
  for (const [key] of byAge.slice(0, Math.floor(byAge.length / 2))) {
    buckets.delete(key);
  }
}

/* --------------------------------------------------------- login lockout -- */

/** Failed sign-ins tolerated before the account is briefly locked. */
export const LOGIN_MAX_FAILURES = 5;

/**
 * Lockout length. Long enough to make online guessing hopeless, short enough
 * that a genuine admin who mistyped their password is not locked out of their
 * own site for the evening.
 */
export const LOGIN_LOCK_MINUTES = 15;
