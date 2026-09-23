/**
 * Postgres access.
 *
 * One lazily-created client per warm serverless instance. Creating it on first
 * use rather than at module load matters twice over: a function that never
 * touches the database (the health check, a 401 from the auth guard) pays
 * nothing for it, and the build can import this module on a machine with no
 * DATABASE_URL at all without exploding at import time — which is what makes
 * the file-based fallback in src/data/recipes.ts reachable.
 *
 * Connection string comes from DATABASE_URL. On Supabase use the **pooler**
 * string (port 6543, `?pgbouncer=true`), not the direct one: serverless
 * functions scale to many short-lived instances and would otherwise exhaust
 * the connection limit under very little real traffic.
 */
import postgres from 'postgres';

export type Sql = postgres.Sql<Record<string, never>>;

let client: Sql | null = null;

/** True when a database is configured. The build branches on this. */
export function isConfigured(): boolean {
  return Boolean(process.env['DATABASE_URL']);
}

export function db(): Sql {
  if (client) return client;

  const url = process.env['DATABASE_URL'];
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env and fill it in, ' +
        'or see README.md → Backend for the Supabase setup.'
    );
  }

  client = postgres(url, {
    // pgbouncer in transaction mode cannot serve prepared statements, and
    // Supabase's pooler runs exactly that. Leaving this on produces
    // intermittent "prepared statement already exists" failures that only
    // appear once instances start being reused, which is a miserable way to
    // find out.
    prepare: false,
    // One connection per instance. The pooler multiplexes; opening more here
    // just holds pooler slots hostage while this instance sits idle.
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    // Supabase terminates TLS with a certificate this client has no root for.
    // The connection is still encrypted; it is the hostname check that is
    // relaxed, and the pooler is reached over Supabase's own network.
    ssl: url.includes('localhost') || url.includes('127.0.0.1') ? false : 'require',
    // Dates are handed to rowToRecipe(), which normalises them to YYYY-MM-DD.
    types: {},
    onnotice: () => {}
  });

  return client;
}

/**
 * Closes the pool. Only the CLI tools need this — a serverless function should
 * leave the connection open for the next invocation on the same instance.
 */
export async function close(): Promise<void> {
  if (client) {
    await client.end({ timeout: 5 });
    client = null;
  }
}
