/**
 * Weekly meal planner: assign a recipe per day, summarise the week and push
 * every ingredient into the shopping list in one action.
 */
(function () {
  'use strict';

  var Recipes = window.Kitchenlo;
  var Store = window.KitchenloStore;
  var UI = window.KitchenloUI;
  if (!Recipes || !Store || !UI) return;

  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  var summary = document.getElementById('plannerSummary');
  var status = document.querySelector('[data-plan-status]');
  if (!document.getElementById('plannerGrid')) return;

  function setStatus(message, type) {
    if (!status) return;
    status.textContent = message || '';
    status.className = 'form-status' + (type ? ' is-' + type : '');
  }

  function render(snapshot) {
    var plan = snapshot.plan;
    var planned = [];

    DAYS.forEach(function (day) {
      var slot = document.querySelector('[data-slot="' + day + '"]');
      var select = document.querySelector('[data-day-select="' + day + '"]');
      if (!slot) return;

      var recipe = plan[day] ? Recipes.bySlug(plan[day]) : null;

      if (!recipe) {
        slot.innerHTML = '';
        if (select) select.value = '';
        return;
      }

      planned.push(recipe);
      if (select) select.value = recipe.slug;

      slot.innerHTML =
        '<div class="planner-card">' +
        '<button class="planner-remove" type="button" data-remove-day="' + day +
        '" aria-label="Remove ' + UI.escapeHtml(recipe.title) + ' from ' + day + '">&times;</button>' +
        '<a href="recipes/' + recipe.slug + '.html">' +
        '<img src="' + UI.escapeHtml(recipe.image) + '" alt="" loading="lazy" />' +
        '<span class="planner-title">' + UI.escapeHtml(recipe.title) + '</span></a>' +
        '<span class="planner-meta">' + Recipes.totalMinutes(recipe) + ' min &middot; ' +
        recipe.nutrition.calories + ' cal</span>' +
        '</div>';
    });

    if (summary) {
      summary.hidden = planned.length === 0;

      var totalTime = planned.reduce(function (sum, r) {
        return sum + Recipes.totalMinutes(r);
      }, 0);
      var avgCalories = planned.length
        ? Math.round(
            planned.reduce(function (sum, r) {
              return sum + r.nutrition.calories;
            }, 0) / planned.length
          )
        : 0;

      var meals = summary.querySelector('[data-plan-meals]');
      var cals = summary.querySelector('[data-plan-calories]');
      var time = summary.querySelector('[data-plan-time]');

      if (meals) meals.textContent = planned.length;
      if (cals) cals.textContent = avgCalories;
      if (time) time.textContent = UI.timeLabel(totalTime);
    }
  }

  /* ------------------------------------------------------------- events -- */

  document.addEventListener('change', function (event) {
    var select = event.target.closest('[data-day-select]');
    if (!select) return;
    Store.setPlanDay(select.getAttribute('data-day-select'), select.value);
    setStatus('');
  });

  document.addEventListener('click', function (event) {
    var remove = event.target.closest('[data-remove-day]');
    if (remove) {
      Store.setPlanDay(remove.getAttribute('data-remove-day'), null);
      return;
    }

    if (event.target.closest('[data-clear-plan]')) {
      if (!window.confirm('Clear the whole week?')) return;
      Store.clearPlan();
      setStatus('Week cleared.');
      return;
    }

    if (event.target.closest('[data-random-plan]')) {
      var pool = Recipes.all.slice();
      // Fisher-Yates, so days never repeat a recipe.
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i];
        pool[i] = pool[j];
        pool[j] = tmp;
      }
      DAYS.forEach(function (day, index) {
        Store.setPlanDay(day, pool[index].slug);
      });
      setStatus('Seven recipes picked for you.', 'success');
      return;
    }

    if (event.target.closest('[data-build-list]')) {
      var plan = Store.plan();
      var slugs = DAYS.map(function (d) {
        return plan[d];
      }).filter(Boolean);

      if (!slugs.length) {
        setStatus('Add at least one recipe to the week first.', 'error');
        return;
      }

      var added = 0;
      slugs.forEach(function (slug) {
        var recipe = Recipes.bySlug(slug);
        if (!recipe) return;
        added += Store.addItems(Recipes.flatIngredients(recipe), recipe.title);
      });

      setStatus(
        added === 0
          ? 'Everything from this plan is already on your list.'
          : 'Added ' + added + ' items to your shopping list.',
        'success'
      );
    }
  });

  Store.onChange(render);
})();
