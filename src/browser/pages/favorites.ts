/**
 * Saved recipes page: renders whatever is in the store and stays in sync as
 * hearts are toggled anywhere on the page.
 */
import * as Recipes from '../../data/recipes.js';
import { recipeCard } from '../../templates/components.js';
import { $, $$, depth } from '../dom.js';
import * as store from '../store.js';

const grid = $('#favoritesGrid');

if (grid) {
  const empty = $('#favoritesEmpty');
  const count = $('[data-fav-count]');
  const clearBtn = $('[data-clear-favorites]');

  clearBtn?.addEventListener('click', () => {
    if (window.confirm('Remove every saved recipe?')) store.clearFavorites();
  });

  store.onChange((data) => {
    const list = data.favorites
      .map((slug) => Recipes.bySlug(slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r));

    grid.innerHTML = list.map((r) => recipeCard(r, depth)).join('');
    grid.hidden = list.length === 0;
    if (empty) empty.hidden = list.length !== 0;
    if (clearBtn) clearBtn.hidden = list.length === 0;

    if (count) {
      count.textContent = `${list.length} saved ${list.length === 1 ? 'recipe' : 'recipes'}`;
    }

    // Mark the hearts on the cards just rebuilt.
    $$('[data-fav]', grid).forEach((btn) => btn.setAttribute('aria-pressed', 'true'));
  });
}
