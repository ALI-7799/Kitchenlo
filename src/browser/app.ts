/**
 * Global behaviour present on every page: image fallbacks, theme, navigation,
 * the search overlay, save buttons, header account state and the newsletter.
 */
import * as Recipes from '../data/recipes.js';
import guides from '../data/guides.js';
import { auth, type User } from './auth.js';
import * as store from './store.js';
import { $, $$, ROOT, escapeHtml } from './dom.js';

/* ------------------------------------------------------- image fallback -- */

/**
 * Every recipe photo is hotlinked from a third-party host, so any of them can
 * disappear without warning. Rather than showing a broken-image icon, swap in
 * the locally generated cover art for that recipe.
 *
 * The error event does not bubble, so this listens in the capture phase, which
 * also catches images added later by the index, favorites and planner views.
 */
document.addEventListener(
  'error',
  (event) => {
    const img = event.target as HTMLImageElement | null;
    if (!img || img.tagName !== 'IMG') return;

    const fallback = img.getAttribute('data-fallback');
    if (!fallback) return;

    // Clear the attribute first, so a failing fallback cannot loop.
    img.removeAttribute('data-fallback');
    img.classList.add('is-fallback');
    img.src = fallback;
  },
  true
);

/* ------------------------------------------------------------------ year -- */

$$('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* ----------------------------------------------------------------- theme -- */

const themeToggle = $('#themeToggle');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('kitchenlo-theme', next);
  } catch {
    /* preference simply will not persist */
  }
  themeToggle.setAttribute(
    'aria-label',
    next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
});

/* ------------------------------------------------------------ navigation -- */

const navToggle = $('#navToggle');
const siteNav = $('#siteNav');

if (navToggle && siteNav) {
  const closeNav = () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  };

  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  siteNav.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) closeNav();
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (!siteNav.contains(target) && !navToggle.contains(target)) closeNav();
  });
}

/* -------------------------------------------------------- search overlay -- */

const overlay = $('#searchOverlay');
const searchInput = $<HTMLInputElement>('#searchOverlayInput');
const searchResults = $('#searchOverlayResults');

function renderSearch(term: string): void {
  if (!searchResults) return;

  const recipeHits = Recipes.query({ query: term, sort: 'popular' }).slice(0, 6);
  const needle = term.toLowerCase();
  const guideHits = term
    ? guides
        .filter((g) =>
          `${g.title} ${g.description} ${g.keywords.join(' ')}`.toLowerCase().includes(needle)
        )
        .slice(0, 3)
    : [];

  if (!recipeHits.length && !guideHits.length) {
    searchResults.innerHTML = `<p class="search-empty">No matches for &ldquo;${escapeHtml(
      term
    )}&rdquo;. Try a single ingredient.</p>`;
    return;
  }

  const src = (image: string) => (/^https?:/.test(image) ? image : ROOT + image);

  const recipeRows = recipeHits
    .map(
      (r) => `<a class="search-result" href="${ROOT}recipes/${r.slug}.html">
        <img src="${escapeHtml(src(r.image))}" alt="" loading="lazy" data-fallback="${escapeHtml(
        ROOT + r.fallbackImage
      )}" />
        <span><strong>${escapeHtml(r.title)}</strong><span>${Recipes.totalMinutes(
        r
      )} min &middot; ${escapeHtml(r.difficulty)}</span></span></a>`
    )
    .join('');

  const guideRows = guideHits
    .map(
      (g) => `<a class="search-result" href="${ROOT}guides/${g.slug}.html">
        <img src="${escapeHtml(g.image)}" alt="" loading="lazy" />
        <span><strong>${escapeHtml(g.title)}</strong><span>Guide &middot; ${
        g.readMinutes
      } min read</span></span></a>`
    )
    .join('');

  searchResults.innerHTML = recipeRows + guideRows;
}

function openSearch(): void {
  if (!overlay || !searchInput) return;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  searchInput.focus();
  renderSearch('');
}

function closeSearch(): void {
  if (!overlay || !searchInput) return;
  overlay.hidden = true;
  document.body.style.overflow = '';
  searchInput.value = '';
}

$('#searchTrigger')?.addEventListener('click', openSearch);
$('#searchClose')?.addEventListener('click', closeSearch);

overlay?.addEventListener('click', (event) => {
  if (event.target === overlay) closeSearch();
});

if (searchInput) {
  let timer: number | undefined;
  searchInput.addEventListener('input', () => {
    window.clearTimeout(timer);
    const value = searchInput.value;
    timer = window.setTimeout(() => renderSearch(value), 120);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && overlay && !overlay.hidden) closeSearch();

  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
  if (typing) return;

  if (event.key === '/' || (event.key === 'k' && (event.metaKey || event.ctrlKey))) {
    event.preventDefault();
    openSearch();
  }
});

/* --------------------------------------------------------------- saving -- */

document.addEventListener('click', (event) => {
  const btn = (event.target as Element).closest<HTMLElement>('[data-fav]');
  if (!btn) return;
  event.preventDefault();
  store.toggleFavorite(btn.getAttribute('data-fav')!);
});

store.onChange((data) => {
  const saved = new Set(data.favorites);

  $$('[data-fav]').forEach((btn) => {
    const isSaved = saved.has(btn.getAttribute('data-fav')!);
    btn.setAttribute('aria-pressed', String(isSaved));
    if (btn.hasAttribute('data-fav-label')) {
      btn.textContent = isSaved ? 'Saved' : 'Save recipe';
    }
  });

  $$('[data-favorites-count]').forEach((badge) => {
    badge.textContent = String(data.favorites.length);
    badge.hidden = data.favorites.length === 0;
  });
});

/* -------------------------------------------------------- account state -- */

function renderAuthState(user: User | null): void {
  $$('[data-auth-anon]').forEach((el) => (el.hidden = Boolean(user)));
  $$('[data-auth-user]').forEach((el) => (el.hidden = !user));
  $$('[data-requires-auth]').forEach((el) => (el.hidden = !user));
  $$('[data-requires-anon]').forEach((el) => (el.hidden = Boolean(user)));

  if (!user) return;
  $$('[data-user-name]').forEach((el) => (el.textContent = user.name));
  $$('[data-user-email]').forEach((el) => (el.textContent = user.email));
  $$('[data-user-initials]').forEach(
    (el) => (el.textContent = user.name.trim().charAt(0).toUpperCase() || 'K')
  );
}

auth.onChange(renderAuthState);

const accountTrigger = $('#accountTrigger');
const accountDropdown = $('#accountDropdown');

if (accountTrigger && accountDropdown) {
  accountTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = accountDropdown.hidden;
    accountDropdown.hidden = !open;
    accountTrigger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', () => {
    accountDropdown.hidden = true;
    accountTrigger.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', (event) => {
  if (!(event.target as Element).closest('[data-signout]')) return;
  event.preventDefault();
  void auth.signOut().then(() => {
    window.location.href = ROOT + 'index.html';
  });
});

/* ----------------------------------------------------------- newsletter -- */

$$<HTMLFormElement>('[data-newsletter]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[type="email"]')!;
    const status = form.querySelector('.form-status')!;
    const value = input.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status is-error';
      input.focus();
      return;
    }

    try {
      const subs = JSON.parse(localStorage.getItem('kitchenlo-newsletter') ?? '[]') as string[];
      if (!subs.includes(value)) subs.push(value);
      localStorage.setItem('kitchenlo-newsletter', JSON.stringify(subs));
    } catch {
      /* the confirmation should still show */
    }

    status.textContent = 'Thanks. You are on the list.';
    status.className = 'form-status is-success';
    form.reset();
  });
});

/* --------------------------------------------------------- back to top --- */

const backToTop = $('#backToTop');
if (backToTop) {
  const onScroll = () => {
    backToTop.hidden = window.scrollY < 600;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
