/**
 * Weekly meal planner: assign a recipe per day, summarise the week and push
 * every ingredient into the shopping list in one action.
 */
import * as Recipes from '../../data/recipes.js';
import { $, escapeHtml } from '../dom.js';
import * as store from '../store.js';
import type { Recipe } from '../../types.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

if ($('#plannerGrid')) {
  const summary = $('#plannerSummary');
  const status = $('[data-plan-status]');

  function setStatus(message: string, kind: 'error' | 'success' | '' = ''): void {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status' + (kind ? ` is-${kind}` : '');
  }

  function timeLabel(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `${h} hr ${m} min` : `${h} hr`;
  }

  store.onChange((data) => {
    const planned: Recipe[] = [];

    for (const day of DAYS) {
      const slot = $(`[data-slot="${day}"]`);
      const select = $<HTMLSelectElement>(`[data-day-select="${day}"]`);
      if (!slot) continue;

      const slug = data.plan[day];
      const recipe = slug ? Recipes.bySlug(slug) : undefined;

      if (!recipe) {
        slot.innerHTML = '';
        if (select) select.value = '';
        continue;
      }

      planned.push(recipe);
      if (select) select.value = recipe.slug;

      const src = /^https?:/.test(recipe.image) ? recipe.image : recipe.image;
      slot.innerHTML = `<div class="planner-card">
        <button class="planner-remove" type="button" data-remove-day="${day}" aria-label="Remove ${escapeHtml(
        recipe.title
      )} from ${day}">&times;</button>
        <a href="recipes/${recipe.slug}.html">
          <img src="${escapeHtml(src)}" alt="" loading="lazy" data-fallback="${escapeHtml(
        recipe.fallbackImage
      )}" />
          <span class="planner-title">${escapeHtml(recipe.title)}</span>
        </a>
        <span class="planner-meta">${Recipes.totalMinutes(recipe)} min &middot; ${
        recipe.nutrition.calories
      } cal</span>
      </div>`;
    }

    if (!summary) return;
    summary.hidden = planned.length === 0;

    const totalTime = planned.reduce((sum, r) => sum + Recipes.totalMinutes(r), 0);
    const avgCalories = planned.length
      ? Math.round(planned.reduce((sum, r) => sum + r.nutrition.calories, 0) / planned.length)
      : 0;

    const meals = $('[data-plan-meals]', summary);
    const cals = $('[data-plan-calories]', summary);
    const time = $('[data-plan-time]', summary);
    if (meals) meals.textContent = String(planned.length);
    if (cals) cals.textContent = String(avgCalories);
    if (time) time.textContent = timeLabel(totalTime);
  });

  document.addEventListener('change', (event) => {
    const select = (event.target as Element).closest<HTMLSelectElement>('[data-day-select]');
    if (!select) return;
    store.setPlanDay(select.getAttribute('data-day-select')!, select.value || null);
    setStatus('');
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Element;

    const remove = target.closest('[data-remove-day]');
    if (remove) {
      store.setPlanDay(remove.getAttribute('data-remove-day')!, null);
      return;
    }

    if (target.closest('[data-clear-plan]')) {
      if (window.confirm('Clear the whole week?')) {
        store.clearPlan();
        setStatus('Week cleared.');
      }
      return;
    }

    if (target.closest('[data-random-plan]')) {
      // Fisher-Yates, so no day repeats a recipe.
      const pool = Recipes.all.slice();
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j]!, pool[i]!];
      }
      DAYS.forEach((day, index) => store.setPlanDay(day, pool[index]!.slug));
      setStatus('Seven recipes picked for you.', 'success');
      return;
    }

    if (target.closest('[data-build-list]')) {
      const plan = store.plan();
      const slugs = DAYS.map((day) => plan[day]).filter((slug): slug is string => Boolean(slug));

      if (!slugs.length) {
        setStatus('Add at least one recipe to the week first.', 'error');
        return;
      }

      let added = 0;
      for (const slug of slugs) {
        const recipe = Recipes.bySlug(slug);
        if (!recipe) continue;
        added += store.addItems(Recipes.flatIngredients(recipe), recipe.title);
      }

      setStatus(
        added === 0
          ? 'Everything from this plan is already on your list.'
          : `Added ${added} items to your shopping list.`,
        'success'
      );
    }
  });
}
