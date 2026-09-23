#!/usr/bin/env node
/**
 * One-shot import of the authored content into Postgres.
 *
 * The important property of this script is that it reads the *same TypeScript
 * modules the generator reads* — not the rendered HTML, not a hand-written
 * dump. The objects it inserts are the very objects that produced the current
 * live site, so there is no transcription step in which a field could be
 * dropped or a number rounded.
 *
 * Before writing anything it proves the round trip:
 *
 *     rowToRecipe(recipeToRow(recipe))  deep-equals  recipe
 *
 * for all 55 recipes. If any field would not survive a trip through the
 * database, the script refuses to run and names the field. That check is the
 * actual guarantee behind "migrated without losing any information"; the
 * insert afterwards is the easy part.
 *
 * Usage:
 *   node .build/migrate.mjs --check        verify the round trip, write nothing
 *   node .build/migrate.mjs                import content
 *   node .build/migrate.mjs --admin        also create the first admin user
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

import quickDinners from '../src/data/recipes-quick-dinners.js';
import healthyFood from '../src/data/recipes-healthy-food.js';
import breakfast from '../src/data/recipes-breakfast.js';
import desserts from '../src/data/recipes-desserts.js';
import comfortFood from '../src/data/recipes-comfort-food.js';
import guides from '../src/data/guides.js';
import collections from '../src/data/collections.js';
import site from '../src/data/site.js';
import videosTable, { forRecipe } from '../src/data/videos.js';

import { db, close, isConfigured } from '../api/_lib/db.js';
import { jsonbReady } from '../api/_lib/repo.js';
import {
  recipeToRow,
  rowToRecipe,
  type RecipeRecord,
  type RecipeRow
} from '../api/_lib/recipe-row.js';
import { hashPassword } from '../api/_lib/auth.js';
import type { RecipeSource } from '../src/types.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const CHECK_ONLY = args.has('--check');
const WITH_ADMIN = args.has('--admin');

loadDotEnv();

/* ------------------------------------------------------------- env ------- */

/**
 * Minimal .env reader.
 *
 * Node's own --env-file only arrived in 20.6 and this repo is expected to run
 * on older local installs, so the few lines here are cheaper than a dependency
 * and than a support question about why the script cannot see DATABASE_URL.
 */
function loadDotEnv(): void {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;

  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip one layer of matching quotes, which is how most .env files are
    // written when a value contains spaces or a '#'.
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

/* ------------------------------------------------------- source content -- */

const sources: RecipeSource[] = [
  ...quickDinners, ...healthyFood, ...breakfast, ...desserts, ...comfortFood
];

/**
 * Folds the existing videos.ts entries into the recipe records.
 *
 * The table is empty today, so this normally contributes nothing — but if a
 * video is added before the migration runs, it carries across rather than
 * being silently left behind in a file the backend no longer reads.
 */
function withVideo(recipe: RecipeSource): RecipeRecord {
  const resolved = forRecipe(recipe.slug);
  if (!resolved) return { ...recipe, video: null, published: true };

  return {
    ...recipe,
    video: {
      url: resolved.src,
      ...(resolved.poster ? { poster: resolved.poster } : {}),
      ...(resolved.title ? { title: resolved.title } : {}),
      ...(resolved.seconds ? { seconds: resolved.seconds } : {})
    },
    published: true
  };
}

const records: RecipeRecord[] = sources.map(withVideo);

/* ----------------------------------------------------- round-trip proof -- */

/** Structural comparison that reports the first differing path, not just false. */
function firstDifference(a: unknown, b: unknown, at = ''): string | null {
  if (a === b) return null;

  if (a === null || b === null || a === undefined || b === undefined) {
    return `${at || '(root)'}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
  }
  if (typeof a !== typeof b) return `${at}: type ${typeof a} vs ${typeof b}`;

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return `${at}: array vs non-array`;
    if (a.length !== b.length) return `${at}: length ${a.length} vs ${b.length}`;
    for (let i = 0; i < a.length; i++) {
      const diff = firstDifference(a[i], b[i], `${at}[${i}]`);
      if (diff) return diff;
    }
    return null;
  }

  if (typeof a === 'object') {
    const ao = a as Record<string, unknown>;
    const bo = b as Record<string, unknown>;
    const keys = new Set([...Object.keys(ao), ...Object.keys(bo)]);
    for (const key of keys) {
      const diff = firstDifference(ao[key], bo[key], at ? `${at}.${key}` : key);
      if (diff) return diff;
    }
    return null;
  }

  return `${at}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
}

/**
 * Simulates the database trip in memory.
 *
 * recipeToRow produces exactly what is inserted; feeding it straight back
 * through rowToRecipe exercises every coercion the real read path applies —
 * the numeric-to-string rating, the date handling, the jsonb shapes — without
 * needing a database to be reachable.
 */
function verifyRoundTrip(): number {
  let failures = 0;

  for (const record of records) {
    const row = recipeToRow(record) as unknown as RecipeRow;
    // The driver returns numeric columns as strings; mimic that so the check
    // is pessimistic rather than flattering.
    const asDriverWouldReturn: RecipeRow = { ...row, rating: String(row.rating) };
    const returned = rowToRecipe(asDriverWouldReturn);

    const diff = firstDifference(record, returned);
    if (diff) {
      console.error(`  ✗ ${record.slug}  ${diff}`);
      failures++;
    }
  }

  if (failures) {
    console.error(`\n${failures} of ${records.length} recipes would not survive the round trip.`);
  } else {
    console.log(`  ✓ all ${records.length} recipes round-trip with no field lost`);
  }
  return failures;
}

/* ------------------------------------------------------------- imports --- */

async function importCategories(): Promise<number> {
  const sql = db();
  let n = 0;
  for (const [index, category] of site.categories.entries()) {
    await sql`
      insert into categories
        (slug, title, short, tagline, description, intro, image, image_alt, keywords, position)
      values (
        ${category.slug}, ${category.title}, ${category.short}, ${category.tagline},
        ${category.description}, ${category.intro}, ${category.image},
        ${category.imageAlt}, ${category.keywords}, ${index}
      )
      on conflict (slug) do update set
        title = excluded.title, short = excluded.short, tagline = excluded.tagline,
        description = excluded.description, intro = excluded.intro,
        image = excluded.image, image_alt = excluded.image_alt,
        keywords = excluded.keywords, position = excluded.position
    `;
    n++;
  }
  return n;
}

async function importRecipes(): Promise<number> {
  const sql = db();
  let n = 0;

  for (const record of records) {
    // jsonbReady is the same helper the admin API writes through, so the
    // migration and a later edit cannot bind these columns differently.
    const prepared = jsonbReady(sql, recipeToRow(record));

    await sql`
      insert into recipes ${sql(prepared)}
      on conflict (slug) do update set ${sql(prepared)}
    `;
    n++;
  }
  return n;
}

async function importCollections(): Promise<number> {
  const sql = db();
  let n = 0;

  for (const [index, collection] of collections.entries()) {
    // The CollectionSelector union guarantees exactly one of these is set, and
    // the collections_selector_is_exclusive constraint asserts the same thing
    // in the database.
    const filter = 'filter' in collection && collection.filter ? collection.filter : null;
    const slugs = 'slugs' in collection && collection.slugs ? collection.slugs : null;

    await sql`
      insert into collections
        (slug, title, heading, description, keywords, image, image_alt,
         intro, faqs, filter, slugs, position)
      values (
        ${collection.slug}, ${collection.title}, ${collection.heading},
        ${collection.description}, ${collection.keywords}, ${collection.image},
        ${collection.imageAlt}, ${sql.json(collection.intro as never)},
        ${sql.json(collection.faqs as never)},
        ${filter ? sql.json(filter as never) : null},
        ${slugs}, ${index}
      )
      on conflict (slug) do update set
        title = excluded.title, heading = excluded.heading,
        description = excluded.description, keywords = excluded.keywords,
        image = excluded.image, image_alt = excluded.image_alt,
        intro = excluded.intro, faqs = excluded.faqs,
        filter = excluded.filter, slugs = excluded.slugs,
        position = excluded.position
    `;
    n++;
  }
  return n;
}

async function importGuides(): Promise<number> {
  const sql = db();
  let n = 0;

  for (const guide of guides) {
    await sql`
      insert into guides
        (slug, title, description, excerpt, image, image_alt, read_minutes,
         date_published, date_modified, keywords, related, body, faqs, published)
      values (
        ${guide.slug}, ${guide.title}, ${guide.description}, ${guide.excerpt},
        ${guide.image}, ${guide.imageAlt}, ${guide.readMinutes},
        ${guide.datePublished}::date, ${guide.dateModified}::date,
        ${guide.keywords}, ${guide.related},
        ${sql.json(guide.body as never)}, ${sql.json(guide.faqs as never)}, true
      )
      on conflict (slug) do update set
        title = excluded.title, description = excluded.description,
        excerpt = excluded.excerpt, image = excluded.image,
        image_alt = excluded.image_alt, read_minutes = excluded.read_minutes,
        date_published = excluded.date_published,
        date_modified = excluded.date_modified,
        keywords = excluded.keywords, related = excluded.related,
        body = excluded.body, faqs = excluded.faqs
    `;
    n++;
  }
  return n;
}

/* --------------------------------------------------------------- admin --- */

async function createAdmin(): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const email = (await rl.question('Admin email: ')).trim().toLowerCase();
    if (!email.includes('@')) throw new Error('That is not an email address');

    const password = (await rl.question('Password (min 12 characters): ')).trim();
    if (password.length < 12) {
      // Short passwords are the single most likely way this admin area gets
      // broken into, and scrypt does not rescue a six-character one.
      throw new Error('Password must be at least 12 characters');
    }

    const name = (await rl.question('Display name: ')).trim() || 'Admin';
    const hash = await hashPassword(password);

    await db()`
      insert into admin_users (email, name, password_hash)
      values (${email}, ${name}, ${hash})
      on conflict (email) do update set
        password_hash = excluded.password_hash, name = excluded.name
    `;
    console.log(`  ✓ admin user ${email} ready`);
  } finally {
    rl.close();
  }
}

/* ----------------------------------------------------------------- run --- */

async function main(): Promise<void> {
  console.log('Kitchenlo content migration\n');

  console.log('Verifying the round trip before touching the database...');
  const failures = verifyRoundTrip();
  if (failures) {
    console.error('\nRefusing to migrate: fix the mapping in api/_lib/recipe-row.ts first.');
    process.exitCode = 1;
    return;
  }

  // Reported so an unset video table cannot be mistaken for a lost one.
  const videoCount = Object.keys(videosTable).length;
  console.log(`  ${records.length} recipes, ${videoCount} with a video entry in src/data/videos.ts`);

  if (CHECK_ONLY) {
    console.log('\n--check given, nothing written.');
    return;
  }

  if (!isConfigured()) {
    console.error(
      '\nDATABASE_URL is not set.\n' +
      'Copy .env.example to .env and fill it in, then run this again.'
    );
    process.exitCode = 1;
    return;
  }

  console.log('\nImporting...');
  // Categories first: recipes carry a foreign key into that table.
  console.log(`  ${await importCategories()} categories`);
  console.log(`  ${await importRecipes()} recipes`);
  console.log(`  ${await importCollections()} collections`);
  console.log(`  ${await importGuides()} guides`);

  // Every `related` slug must resolve, because requireBySlug() in the
  // generator turns a dangling one into a failed build rather than a bad page.
  const dangling = await db()<{ slug: string; missing: string }[]>`
    select r.slug, x.missing
      from recipes r,
           lateral unnest(r.related) as x(missing)
     where not exists (select 1 from recipes r2 where r2.slug = x.missing)
  `;
  if (dangling.length) {
    console.warn(`\n  ! ${dangling.length} related-recipe reference(s) point at a missing slug:`);
    for (const row of dangling) console.warn(`      ${row.slug} -> ${row.missing}`);
  } else {
    console.log('  ✓ every related-recipe reference resolves');
  }

  if (WITH_ADMIN) {
    console.log('');
    await createAdmin();
  }

  console.log('\nDone. Run `npm run build` to regenerate the site from the database.');
}

main()
  .catch((error) => {
    console.error('\nMigration failed:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => close());
