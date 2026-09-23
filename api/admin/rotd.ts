/**
 * GET    /api/admin/rotd   upcoming pins, plus the computed pick for each day
 * POST   /api/admin/rotd   pin a recipe to a date
 * DELETE /api/admin/rotd   unpin a date
 *
 * The daily rotation needs no management — pickForDay() already gives every
 * recipe a turn and never repeats within a cycle. This endpoint exists for the
 * exception: pinning a specific recipe to a specific date, for a holiday or a
 * launch. Removing the pin returns that date to the computed choice.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, badRequest, body, cacheNever, json,
  notFound, param, withErrors
} from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import {
  allRecipes, clearRotdOverride, recipeBySlug, setRotdOverride, upcomingOverrides
} from '../_lib/repo.js';
import { pickForDay, siteDayNumber } from '../../src/data/recipes.js';
import site from '../../src/data/site.js';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  const method = assertMethod(req, 'GET', 'POST', 'DELETE');
  await requireAdmin(req);
  cacheNever(res);

  if (method === 'GET') return upcoming(res);

  assertSameOrigin(req);
  if (method === 'POST') return pin(req, res);
  return unpin(req, res);
});

/** The next 14 days: what is pinned, and what would otherwise be shown. */
async function upcoming(res: VercelResponse): Promise<void> {
  const [overrides, recipes] = await Promise.all([upcomingOverrides(), allRecipes()]);

  // Same ordering the public endpoint uses, so the preview shown here is the
  // pick visitors will actually get.
  const ordered = recipes.slice().sort((a, b) => a.slug.localeCompare(b.slug));
  const pinned = new Map(overrides.map((o) => [o.on_date, o]));

  const days = [];
  const today = siteDayNumber(new Date(), site.timezone);

  for (let i = 0; i < 14; i++) {
    const dayNumber = today + i;
    const date = new Date(dayNumber * 86400000).toISOString().slice(0, 10);
    const override = pinned.get(date);
    const computed = ordered.length ? pickForDay(ordered, dayNumber).slug : null;

    days.push({
      date,
      computed,
      pinned: override?.recipe_slug ?? null,
      note: override?.note ?? '',
      effective: override?.recipe_slug ?? computed
    });
  }

  json(res, 200, { days, timezone: site.timezone });
}

async function pin(req: VercelRequest, res: VercelResponse): Promise<void> {
  const { date, slug, note } = body<{ date?: string; slug?: string; note?: string }>(req);

  const on = String(date ?? '');
  if (!ISO_DATE.test(on)) throw badRequest('Give a date like 2026-12-25');

  const recipeSlug = String(slug ?? '');
  // Checked before writing, because the foreign key would otherwise reject it
  // with a constraint name rather than something an admin can act on.
  const recipe = await recipeBySlug(recipeSlug);
  if (!recipe) throw notFound(`No published recipe with the slug "${recipeSlug}"`);

  await setRotdOverride(on, recipeSlug, String(note ?? '').slice(0, 200));
  json(res, 200, { date: on, slug: recipeSlug });
}

async function unpin(req: VercelRequest, res: VercelResponse): Promise<void> {
  const on = param(req, 'date');
  if (!ISO_DATE.test(on)) throw badRequest('Give a date like 2026-12-25');

  await clearRotdOverride(on);
  json(res, 200, { date: on, cleared: true });
}
