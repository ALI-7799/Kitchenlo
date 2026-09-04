/**
 * Saved recipes page: renders whatever is in the store and stays in sync as
 * hearts are toggled.
 */
(function () {
  'use strict';

  var Recipes = window.Kitchenlo;
  var Store = window.KitchenloStore;
  var UI = window.KitchenloUI;
  if (!Recipes || !Store || !UI) return;

  var grid = document.getElementById('favoritesGrid');
  var empty = document.getElementById('favoritesEmpty');
  var count = document.querySelector('[data-fav-count]');
  var clearBtn = document.querySelector('[data-clear-favorites]');
  if (!grid) return;

  function render(snapshot) {
    var list = snapshot.favorites.map(Recipes.bySlug).filter(Boolean);

    grid.innerHTML = list.map(function (r) {
      return UI.recipeCardHtml(r, '');
    }).join('');

    grid.hidden = list.length === 0;
    if (empty) empty.hidden = list.length !== 0;
    if (clearBtn) clearBtn.hidden = list.length === 0;

    if (count) {
      count.textContent =
        list.length + (list.length === 1 ? ' saved recipe' : ' saved recipes');
    }

    // Re-mark the hearts on the cards we just rebuilt.
    UI.$$('[data-fav]', grid).forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'true');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (!window.confirm('Remove every saved recipe?')) return;
      Store.clearFavorites();
    });
  }

  Store.onChange(render);
})();
