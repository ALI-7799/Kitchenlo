/**
 * Kitchenlo admin — entry point.
 *
 * Bundled separately from the public site (see tools/bundle.mjs): visitors
 * never download the editor, and the editor never carries the public bundle's
 * recipe payload.
 *
 * The session is an HttpOnly cookie this code cannot read, so "am I signed in"
 * is answered by asking the server, not by inspecting storage. On load it
 * calls /api/admin/session; a 401 simply shows the sign-in form.
 */
import { api, ApiError, setSessionLostHandler, type AdminUser, type RecipeListItem,
  type RotdDay, type Stats } from './api.js';
import { $, $$, esc, formatDate } from './dom.js';
import { renderEditor } from './editor.js';

const signIn = $('#signIn')!;
const app = $('#app')!;
const toastEl = $('#toast')!;

let toastTimer: number | undefined;

/** Shows a transient status line. Errors stay up longer than confirmations. */
function toast(message: string, isError = false): void {
  window.clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.toggle('is-error', isError);
  toastEl.hidden = false;
  toastTimer = window.setTimeout(() => { toastEl.hidden = true; }, isError ? 8000 : 4000);
}

/* ---------------------------------------------------------------- session -- */

setSessionLostHandler(() => {
  app.hidden = true;
  signIn.hidden = false;
});

async function boot(): Promise<void> {
  try {
    const { user } = await api.session();
    enter(user);
  } catch {
    // Not signed in, which is the expected state on a first visit.
    signIn.hidden = false;
  }
}

function enter(user: AdminUser): void {
  signIn.hidden = true;
  app.hidden = false;
  $('#whoami')!.textContent = user.email;
  show('dashboard');
}

$<HTMLFormElement>('#signInForm')!.addEventListener('submit', async (event) => {
  event.preventDefault();

  const button = $<HTMLButtonElement>('#signInButton')!;
  const error = $('#signInError')!;
  const email = $<HTMLInputElement>('#email')!.value.trim();
  const password = $<HTMLInputElement>('#password')!.value;

  error.hidden = true;
  button.disabled = true;
  button.textContent = 'Signing in…';

  try {
    const { user } = await api.signIn(email, password);
    $<HTMLInputElement>('#password')!.value = '';
    enter(user);
  } catch (err) {
    error.textContent = err instanceof Error ? err.message : 'Could not sign in';
    error.hidden = false;
  } finally {
    button.disabled = false;
    button.textContent = 'Sign in';
  }
});

$('#signOutButton')!.addEventListener('click', async () => {
  try {
    await api.signOut();
  } finally {
    // Whatever the server said, stop showing the dashboard.
    app.hidden = true;
    signIn.hidden = false;
  }
});

/* ------------------------------------------------------------------ views -- */

type ViewName = 'dashboard' | 'recipes' | 'rotd' | 'editor';

function show(view: ViewName): void {
  (['dashboard', 'recipes', 'rotd', 'editor'] as ViewName[]).forEach((name) => {
    $(`#view-${name}`)!.hidden = name !== view;
  });
  $$('.tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.getAttribute('data-view') === view);
  });

  if (view === 'dashboard') void drawDashboard();
  if (view === 'recipes') void drawRecipes();
  if (view === 'rotd') void drawRotd();
}

$$('.tab').forEach((tab) => {
  tab.addEventListener('click', () => show(tab.getAttribute('data-view') as ViewName));
});

/* -------------------------------------------------------------- dashboard -- */

async function drawDashboard(): Promise<void> {
  const container = $('#view-dashboard')!;
  container.innerHTML = '<p class="empty">Loading…</p>';

  let data: Stats;
  try {
    data = await api.stats();
  } catch (error) {
    container.innerHTML =
      `<p class="empty">${esc(error instanceof Error ? error.message : 'Could not load')}</p>`;
    return;
  }

  const peak = Math.max(1, ...data.daily.map((d) => d.views));

  container.innerHTML = `
    <h1>Dashboard</h1>

    <div class="grid grid-stats" style="margin-bottom:1.5rem">
      ${stat(data.totals.recipes, 'Published recipes')}
      ${stat(data.totals.drafts, 'Drafts')}
      ${stat(data.views.today, 'Views today')}
      ${stat(data.views.week, 'Views this week')}
      ${stat(data.views.month, 'Views this month')}
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <h2>Last 30 days</h2>
      ${data.daily.length
        ? `<div class="spark">
             ${data.daily.map((d) => `
               <div class="spark-bar" style="height:${Math.round((d.views / peak) * 100)}%"
                 title="${esc(d.on_date)}: ${d.views} views"></div>`).join('')}
           </div>`
        : '<p class="hint">No views recorded yet. Data appears once the site is live.</p>'}
    </div>

    <div class="grid grid-2">
      <div class="card">
        <h2>Most read recipes</h2>
        ${list(data.topRecipes.map((r) => [r.slug, `${r.views} views`]),
               'No recipe views recorded yet.')}
      </div>
      <div class="card">
        <h2>Top searches</h2>
        ${list(data.topSearches.map((s) => [s.term, `${s.searches}×`]),
               'No searches recorded yet.')}
      </div>
      <div class="card">
        <h2>Searches with no results</h2>
        <p class="hint">Recipes people looked for and the site does not have.</p>
        ${list(data.missedSearches.map((s) => [s.term, `${s.searches}×`]),
               'Every search found something.')}
      </div>
    </div>`;
}

const stat = (value: number, label: string): string => `
  <div class="card">
    <div class="stat-value">${value}</div>
    <div class="stat-label">${esc(label)}</div>
  </div>`;

const list = (rows: [string, string][], empty: string): string =>
  rows.length
    ? `<table><tbody>${rows.map(([left, right]) =>
        `<tr><td>${esc(left)}</td><td style="text-align:right">${esc(right)}</td></tr>`
      ).join('')}</tbody></table>`
    : `<p class="hint">${esc(empty)}</p>`;

/* ---------------------------------------------------------------- recipes -- */

async function drawRecipes(query = ''): Promise<void> {
  const container = $('#view-recipes')!;

  let recipes: RecipeListItem[];
  try {
    ({ recipes } = await api.listRecipes(query));
  } catch (error) {
    container.innerHTML =
      `<p class="empty">${esc(error instanceof Error ? error.message : 'Could not load')}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="toolbar">
      <h1 style="margin:0">Recipes</h1>
      <input type="text" id="recipeSearch" placeholder="Filter by title or slug"
        value="${esc(query)}" />
      <span class="hint">${recipes.length} recipe${recipes.length === 1 ? '' : 's'}</span>
      <button class="btn btn-primary spacer" id="newRecipe" type="button">New recipe</button>
    </div>

    <div class="card table-wrap">
      <table>
        <thead>
          <tr>
            <th></th><th>Title</th><th>Category</th><th>Time</th>
            <th>Video</th><th>Updated</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${recipes.map(row).join('') ||
            '<tr><td colspan="8" class="empty">No recipes match.</td></tr>'}
        </tbody>
      </table>
    </div>`;

  $('#newRecipe')!.addEventListener('click', () => openEditor(null));

  const search = $<HTMLInputElement>('#recipeSearch')!;
  let timer: number | undefined;
  search.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      void drawRecipes(search.value.trim()).then(() => {
        // Re-rendering replaces the input, so restore focus and caret.
        const next = $<HTMLInputElement>('#recipeSearch');
        next?.focus();
        next?.setSelectionRange(next.value.length, next.value.length);
      });
    }, 200);
  });

  container.querySelectorAll<HTMLElement>('[data-edit]').forEach((button) => {
    button.addEventListener('click', () => openEditor(button.dataset['edit']!));
  });
}

function row(recipe: RecipeListItem): string {
  return `
    <tr>
      <td>${recipe.image
        ? `<img class="thumb" src="${esc(recipe.image)}" alt="" loading="lazy" />`
        : '<span class="pill">art</span>'}</td>
      <td><strong>${esc(recipe.title)}</strong><br /><span class="hint">${esc(recipe.slug)}</span></td>
      <td>${esc(recipe.category)}</td>
      <td>${recipe.totalMinutes} min</td>
      <td>${recipe.hasVideo ? '✓' : '—'}</td>
      <td>${esc(formatDate(recipe.dateModified))}</td>
      <td><span class="pill ${recipe.published ? 'pill-live' : 'pill-draft'}">
        ${recipe.published ? 'Live' : 'Draft'}</span></td>
      <td><button class="btn btn-sm" type="button" data-edit="${esc(recipe.slug)}">Edit</button></td>
    </tr>`;
}

function openEditor(slug: string | null): void {
  show('editor');
  renderEditor($('#view-editor')!, slug, {
    toast,
    onDone: () => show('recipes')
  });
}

/* --------------------------------------------------------- recipe of day -- */

async function drawRotd(): Promise<void> {
  const container = $('#view-rotd')!;

  let days: RotdDay[];
  let timezone: string;
  try {
    ({ days, timezone } = await api.rotd());
  } catch (error) {
    container.innerHTML =
      `<p class="empty">${esc(error instanceof Error ? error.message : 'Could not load')}</p>`;
    return;
  }

  container.innerHTML = `
    <h1>Recipe of the Day</h1>
    <p class="hint" style="margin-bottom:1rem">
      The day's recipe is chosen automatically and changes at midnight
      ${esc(timezone)} time. Every visitor sees the same one, and refreshing
      cannot change it. Every recipe gets a turn before any repeats — so you
      only need to pin a date for something specific, like a holiday.
    </p>

    <div class="card table-wrap">
      <table>
        <thead>
          <tr><th>Date</th><th>Showing</th><th>Automatic pick</th><th>Pin a recipe</th><th></th></tr>
        </thead>
        <tbody>
          ${days.map(dayRow).join('')}
        </tbody>
      </table>
    </div>`;

  container.querySelectorAll<HTMLElement>('[data-pin]').forEach((button) => {
    button.addEventListener('click', async () => {
      const date = button.dataset['pin']!;
      const input = container.querySelector<HTMLInputElement>(`[data-slug="${date}"]`)!;
      const slug = input.value.trim();

      try {
        if (slug) await api.pinRotd(date, slug);
        else await api.unpinRotd(date);
        toast(slug ? `Pinned ${slug} to ${date}.` : `Cleared the pin on ${date}.`);
        void drawRotd();
      } catch (error) {
        toast(error instanceof Error ? error.message : 'Could not update', true);
      }
    });
  });
}

function dayRow(day: RotdDay): string {
  return `
    <tr>
      <td><strong>${esc(day.date)}</strong></td>
      <td>${esc(day.effective ?? '—')}
        ${day.pinned ? '<span class="pill">pinned</span>' : ''}</td>
      <td class="hint">${esc(day.computed ?? '—')}</td>
      <td><input type="text" data-slug="${esc(day.date)}" value="${esc(day.pinned ?? '')}"
        placeholder="recipe-slug" /></td>
      <td><button class="btn btn-sm" type="button" data-pin="${esc(day.date)}">Save</button></td>
    </tr>`;
}

/* ---------------------------------------------------------------- publish -- */

$('#publishButton')!.addEventListener('click', async () => {
  const button = $<HTMLButtonElement>('#publishButton')!;

  const confirmed = window.confirm(
    'Rebuild and publish the live site?\n\n' +
      'This regenerates every page from the current database contents. ' +
      'It usually takes a minute or two.'
  );
  if (!confirmed) return;

  button.disabled = true;
  button.textContent = 'Publishing…';

  try {
    const result = await api.publish();
    toast(result.note);
  } catch (error) {
    if (error instanceof ApiError && error.details.length) {
      toast(`${error.message} (${error.details.join('; ')})`, true);
    } else {
      toast(error instanceof Error ? error.message : 'Could not publish', true);
    }
  } finally {
    button.disabled = false;
    button.textContent = 'Publish';
  }
});

void boot();
