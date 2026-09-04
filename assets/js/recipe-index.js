/**
 * Recipe index: live search, faceted filtering, sorting and URL sync.
 * Reads its initial state from the query string so links like
 * recipes.html?diet=vegan&time=under-30 deep-link into a filtered view.
 */
(function () {
  'use strict';

  var Recipes = window.Kitchenlo;
  var UI = window.KitchenloUI;
  var site = window.KITCHENLO_SITE;
  if (!Recipes || !UI) return;

  var grid = document.getElementById('recipeResults');
  var empty = document.getElementById('emptyState');
  var countEl = document.getElementById('resultsCount');
  var searchEl = document.getElementById('recipeSearch');
  var sortEl = document.getElementById('sortSelect');
  var bar = document.getElementById('filterBar');
  if (!grid || !bar) return;

  var state = { query: '', category: '', time: '', diet: '', difficulty: '', sort: 'popular' };

  /* --------------------------------------------------------- rendering -- */

  /** Delegates to the shared renderer so cards match the generated markup. */
  function card(recipe) {
    return UI.recipeCardHtml(recipe, '');
  }

  /* ----------------------------------------------------------- filtering */

  function maxTimeFor(id) {
    var match = (site.filters.time || []).find(function (t) {
      return t.id === id;
    });
    return match ? match.max : null;
  }

  function apply() {
    var results = Recipes.query({
      query: state.query,
      category: state.category || null,
      difficulty: state.difficulty || null,
      maxTime: maxTimeFor(state.time),
      diet: state.diet ? [state.diet] : [],
      sort: state.sort
    });

    grid.innerHTML = results.map(card).join('');
    grid.hidden = results.length === 0;
    if (empty) empty.hidden = results.length !== 0;

    if (countEl) {
      countEl.textContent =
        results.length === 0
          ? 'No recipes found'
          : 'Showing ' + results.length + (results.length === 1 ? ' recipe' : ' recipes');
    }

    if (window.KitchenloStore) window.KitchenloStore.refresh();
    syncUrl();
  }

  function syncUrl() {
    var params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category) params.set('category', state.category);
    if (state.time) params.set('time', state.time);
    if (state.diet) params.set('diet', state.diet);
    if (state.difficulty) params.set('difficulty', state.difficulty);
    if (state.sort !== 'popular') params.set('sort', state.sort);

    var qs = params.toString();
    history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
  }

  function syncChips() {
    UI.$$('.chip', bar).forEach(function (chip) {
      var group = chip.getAttribute('data-filter');
      var value = chip.getAttribute('data-value');
      chip.classList.toggle('is-active', state[group] === value);
    });
  }

  /* ------------------------------------------------------------- events */

  bar.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    state[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    apply();
  });

  if (searchEl) {
    var timer;
    searchEl.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.query = searchEl.value.trim();
        apply();
      }, 160);
    });
  }

  if (sortEl) {
    sortEl.addEventListener('change', function () {
      state.sort = sortEl.value;
      apply();
    });
  }

  function reset() {
    state = { query: '', category: '', time: '', diet: '', difficulty: '', sort: 'popular' };
    if (searchEl) searchEl.value = '';
    if (sortEl) sortEl.value = 'popular';
    syncChips();
    apply();
  }

  var clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', reset);

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-reset-filters]')) reset();
  });

  /* ------------------------------------------------------ initial state */

  (function init() {
    var params = new URLSearchParams(window.location.search);
    state.query = params.get('q') || '';
    state.category = params.get('category') || '';
    state.time = params.get('time') || '';
    state.diet = params.get('diet') || '';
    state.difficulty = params.get('difficulty') || '';
    state.sort = params.get('sort') || 'popular';

    if (searchEl) searchEl.value = state.query;
    if (sortEl) sortEl.value = state.sort;

    var hasFilters =
      state.query || state.category || state.time || state.diet || state.difficulty ||
      state.sort !== 'popular';

    syncChips();
    // The server already rendered the unfiltered list, so only re-render if needed.
    if (hasFilters) apply();
  })();
})();
