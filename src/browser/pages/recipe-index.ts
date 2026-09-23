/**
 * Recipe index: live search, faceted filtering, sorting and URL sync, so a link
 * like recipes.html?diet=vegan&time=under-30 opens already filtered.
 *
 * Cards are rendered by the same function the generator uses, so the server
 * markup and the client markup cannot drift apart.
 */
import * as Recipes from '../../data/recipes.js';
import site from '../../data/site.js';
import { recipeCard } from '../../templates/components.js';
import { $, $$, depth } from '../dom.js';
import * as store from '../store.js';
import { searchViaApi } from '../search-api.js';
import type { CategorySlug, DietTag, Difficulty, Recipe, SortKey } from '../../types.js';

const grid = $('#recipeResults');
const bar = $('#filterBar');

if (grid && bar) {
  const empty = $('#emptyState');
  const countEl = $('#resultsCount');
  const searchEl = $<HTMLInputElement>('#recipeSearch');
  const sortEl = $<HTMLSelectElement>('#sortSelect');

  interface FilterState {
    query: string;
    category: CategorySlug | '';
    time: string;
    diet: DietTag | '';
    difficulty: Difficulty | '';
    sort: SortKey;
  }

  const blank = (): FilterState => ({
    query: '',
    category: '',
    time: '',
    diet: '',
    difficulty: '',
    sort: 'popular'
  });

  let state = blank();

  const maxTimeFor = (id: string): number | null =>
    site.filters.time.find((t) => t.id === id)?.max ?? null;

  /** Paints a result set into the grid. */
  function render(results: Recipe[]): void {
    grid!.innerHTML = results.map((r) => recipeCard(r, depth)).join('');
    grid!.hidden = results.length === 0;
    if (empty) empty.hidden = results.length !== 0;

    if (countEl) {
      countEl.textContent =
        results.length === 0
          ? 'No recipes found'
          : `Showing ${results.length} ${results.length === 1 ? 'recipe' : 'recipes'}`;
    }

    // Newly rendered cards need their saved state marked.
    store.refresh();
  }

  function apply(): void {
    const results = Recipes.query({
      query: state.query,
      category: state.category || null,
      difficulty: state.difficulty || null,
      maxTime: maxTimeFor(state.time),
      diet: state.diet ? [state.diet] : [],
      sort: state.sort
    });

    // Local results go up immediately. This is the only rendering path that
    // is guaranteed to run, so the page is never waiting on the network to
    // show something.
    render(results);
    syncUrl();

    void refineFromApi(results);
  }

  /*
   * Asks the backend to re-rank the current query, and applies the answer only
   * if it is still relevant and actually better.
   *
   * "Better" is deliberately narrow. The backend wins when it finds recipes
   * the substring match missed — a stemmed word, or a misspelling caught by
   * trigram similarity. It is not allowed to *remove* a local match, because
   * a visitor who typed an exact ingredient should not watch a correct result
   * vanish a moment later.
   */
  async function refineFromApi(local: Recipe[]): Promise<void> {
    const query = state.query;
    // Only a text query benefits; the facets are already exact locally.
    if (query.trim().length < 2) return;
    // Nothing to gain when the sort is not relevance-driven.
    if (state.sort !== 'popular') return;

    const ranked = await searchViaApi(query, {
      ...(state.category ? { category: state.category } : {}),
      ...(state.diet ? { diet: [state.diet] } : {})
    });
    if (!ranked) return;

    // The visitor kept typing, or changed a facet, while this was in flight.
    if (state.query !== query) return;

    const localSlugs = new Set(local.map((r) => r.slug));
    const extra = ranked
      .filter((hit) => !localSlugs.has(hit.slug))
      .flatMap((hit) => {
        const recipe = Recipes.bySlug(hit.slug);
        return recipe ? [recipe] : [];
      })
      // Respect the facets the visitor has set; the API filters on category
      // and diet but not on time or difficulty.
      .filter((recipe) => {
        const maxTime = maxTimeFor(state.time);
        if (maxTime && Recipes.totalMinutes(recipe) > maxTime) return false;
        if (state.difficulty && recipe.difficulty !== state.difficulty) return false;
        return true;
      });

    if (!extra.length) return;

    // Ordered by the backend's ranking, appended after the exact local hits.
    const order = new Map(ranked.map((hit, index) => [hit.slug, index]));
    extra.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));

    render([...local, ...extra]);
  }

  function syncUrl(): void {
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category) params.set('category', state.category);
    if (state.time) params.set('time', state.time);
    if (state.diet) params.set('diet', state.diet);
    if (state.difficulty) params.set('difficulty', state.difficulty);
    if (state.sort !== 'popular') params.set('sort', state.sort);

    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }

  function syncChips(): void {
    $$('.chip', bar!).forEach((chip) => {
      const group = chip.getAttribute('data-filter') as keyof FilterState;
      chip.classList.toggle('is-active', state[group] === chip.getAttribute('data-value'));
    });
  }

  bar.addEventListener('click', (event) => {
    const chip = (event.target as Element).closest<HTMLElement>('.chip');
    if (!chip) return;

    const value = chip.getAttribute('data-value') ?? '';

    // Assigned per-field rather than by computed key, so each filter keeps its
    // own union type and an unrecognised group is ignored instead of writing
    // an arbitrary string into the state.
    switch (chip.getAttribute('data-filter')) {
      case 'category':
        state.category = value as FilterState['category'];
        break;
      case 'time':
        state.time = value;
        break;
      case 'diet':
        state.diet = value as FilterState['diet'];
        break;
      case 'difficulty':
        state.difficulty = value as FilterState['difficulty'];
        break;
      default:
        return;
    }

    syncChips();
    apply();
  });

  if (searchEl) {
    let timer: number | undefined;
    searchEl.addEventListener('input', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        state.query = searchEl.value.trim();
        apply();
      }, 160);
    });
  }

  sortEl?.addEventListener('change', () => {
    state.sort = sortEl.value as SortKey;
    apply();
  });

  function reset(): void {
    state = blank();
    if (searchEl) searchEl.value = '';
    if (sortEl) sortEl.value = 'popular';
    syncChips();
    apply();
  }

  $('#clearFilters')?.addEventListener('click', reset);
  document.addEventListener('click', (event) => {
    if ((event.target as Element).closest('[data-reset-filters]')) reset();
  });

  /* Restore state from the query string on load. */
  const params = new URLSearchParams(window.location.search);
  state.query = params.get('q') ?? '';
  state.category = (params.get('category') ?? '') as FilterState['category'];
  state.time = params.get('time') ?? '';
  state.diet = (params.get('diet') ?? '') as FilterState['diet'];
  state.difficulty = (params.get('difficulty') ?? '') as FilterState['difficulty'];
  state.sort = (params.get('sort') ?? 'popular') as SortKey;

  if (searchEl) searchEl.value = state.query;
  if (sortEl) sortEl.value = state.sort;

  syncChips();

  // The generator already rendered the full unfiltered list, so only re-render
  // when the URL actually asks for something narrower.
  const hasFilters =
    state.query || state.category || state.time || state.diet || state.difficulty ||
    state.sort !== 'popular';
  if (hasFilters) apply();
}
