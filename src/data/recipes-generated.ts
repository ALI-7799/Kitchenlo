/**
 * Recipes pulled from the database. GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * `npm run pull` overwrites this file with the current contents of the
 * `recipes` table. It is committed so that the repository is always a complete,
 * buildable checkout: a clone with no DATABASE_URL, or a deploy that happens
 * while the database is unreachable, still builds the full site from here.
 *
 * Exporting `null` — the state this file ships in — means "no database yet",
 * and src/data/recipes.ts falls back to the hand-authored recipes-*.ts files.
 * That is what keeps the site byte-identical before the migration is run.
 *
 * Once populated, this list *replaces* the authored files rather than merging
 * with them. Merging would mean a recipe deleted in the admin lived on in the
 * build, and a slug present in both would need a precedence rule nobody would
 * remember. One source is active at a time, and which one is obvious.
 */
import type { RecipeSource } from '../types.js';

const generated: RecipeSource[] | null = null;

export default generated;
