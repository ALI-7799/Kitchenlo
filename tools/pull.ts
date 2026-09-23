#!/usr/bin/env node
/**
 * Writes src/data/recipes-generated.ts from the database.
 *
 * This is the join between the backend and the static site. The generator and
 * the browser bundle both read that file, so pulling before a build is what
 * makes an admin edit appear on the live site — and writing it as TypeScript,
 * rather than fetching at runtime, is what keeps every page static and every
 * recipe's structured data pre-rendered.
 *
 * Two properties are deliberate:
 *
 *   - It is safe to run with no database. `npm run build` calls it on every
 *     build, including on a laptop with no credentials and on a deploy where
 *     the database is unreachable. In that case it leaves the existing file
 *     untouched and exits 0, so the build continues from the last good pull.
 *
 *   - It refuses to write an empty list over a non-empty file. A transient
 *     failure that returned zero rows would otherwise silently publish a site
 *     with no recipes in it, which is far worse than publishing stale ones.
 *
 * Usage: node .build/pull.mjs [--quiet]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { db, close, isConfigured } from '../api/_lib/db.js';
import { allRecipes } from '../api/_lib/repo.js';
import { toRecipeSource, type RecipeRecord } from '../api/_lib/recipe-row.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = path.join(ROOT, 'src', 'data', 'recipes-generated.ts');
const QUIET = process.argv.includes('--quiet');

const log = (message: string): void => {
  if (!QUIET) console.log(message);
};

loadDotEnv();

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
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

/* ---------------------------------------------------------------- emit --- */

const HEADER = `/**
 * Recipes pulled from the database. GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Written by \`npm run pull\` (tools/pull.ts) from the \`recipes\` table, and
 * committed so the repository is always a complete, buildable checkout: a
 * clone with no DATABASE_URL still builds the whole site from this file.
 *
 * To change a recipe, edit it in the admin at /admin and publish. Editing this
 * file directly works until the next pull overwrites it.
 */
import type { RecipeSource } from '../types.js';

const generated: RecipeSource[] | null = `;

const FOOTER = `;

export default generated;
`;

/**
 * Serialises the recipes as a TypeScript literal.
 *
 * JSON.stringify rather than a bespoke printer: the output is data, it only
 * has to parse and typecheck, and hand-rolled quoting is exactly where an
 * apostrophe in "Grandma's" turns into a syntax error at build time.
 */
function serialise(records: RecipeRecord[]): string {
  const sources = records
    .map(toRecipeSource)
    .map((source, index) => ({ ...source, video: records[index]!.video ?? null }))
    // Stable order, so a pull that changed nothing produces no git diff.
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return HEADER + JSON.stringify(sources, null, 2) + FOOTER;
}

/* ----------------------------------------------------------------- run --- */

async function main(): Promise<void> {
  if (!isConfigured()) {
    log('pull: DATABASE_URL not set, keeping the committed recipes-generated.ts');
    return;
  }

  let records: RecipeRecord[];
  try {
    records = await allRecipes();
  } catch (error) {
    // A failed pull must not fail the build. The committed file is still a
    // complete copy of the library, so the deploy goes out with the previous
    // content rather than not going out at all.
    console.warn(
      'pull: could not reach the database (' +
        (error instanceof Error ? error.message : String(error)) +
        '), building from the committed recipes-generated.ts'
    );
    return;
  }

  if (!records.length) {
    console.warn(
      'pull: the database returned no recipes. Refusing to overwrite the ' +
        'committed file with an empty list — run the migration first.'
    );
    return;
  }

  const next = serialise(records);
  const current = fs.existsSync(TARGET) ? fs.readFileSync(TARGET, 'utf8') : '';

  if (next === current) {
    log(`pull: ${records.length} recipes, already up to date`);
    return;
  }

  fs.writeFileSync(TARGET, next, 'utf8');
  log(`pull: wrote ${records.length} recipes to src/data/recipes-generated.ts`);
}

main()
  .catch((error) => {
    console.error('pull failed:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => close());
