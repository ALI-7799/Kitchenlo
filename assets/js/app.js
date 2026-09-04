/**
 * Global behaviour present on every page: theme, navigation, the search
 * overlay, save buttons, the header account state and the newsletter form.
 */
(function () {
  'use strict';

  var Recipes = window.Kitchenlo;
  var Store = window.KitchenloStore;
  var Auth = window.KitchenloAuth;
  var guides = window.KITCHENLO_GUIDES || [];

  /** Depth-aware link prefix, so header links work from /recipes/ and /guides/. */
  var ROOT = (function () {
    var depth = window.location.pathname.split('/').filter(Boolean).length - 1;
    var onSubPage = /\/(recipes|category|guides)\/[^/]+$/.test(window.location.pathname);
    return onSubPage || depth > 0 ? '../' : '';
  })();

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /* ---------------------------------------------------------------- year */

  $$('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --------------------------------------------------------------- theme */

  var themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('kitchenlo-theme', next);
      } catch (e) {}
      themeToggle.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }

  /* ---------------------------------------------------------- navigation */

  var navToggle = $('#navToggle');
  var siteNav = $('#siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------ search overlay */

  var overlay = $('#searchOverlay');
  var searchInput = $('#searchOverlayInput');
  var searchResults = $('#searchOverlayResults');

  function openSearch() {
    if (!overlay) return;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    searchInput.focus();
    renderSearch('');
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    searchInput.value = '';
  }

  function renderSearch(term) {
    if (!searchResults || !Recipes) return;

    var recipeHits = Recipes.query({ query: term, sort: 'popular' }).slice(0, 6);
    var guideHits = term
      ? guides
          .filter(function (g) {
            var hay = (g.title + ' ' + g.description + ' ' + (g.keywords || []).join(' ')).toLowerCase();
            return hay.indexOf(term.toLowerCase()) !== -1;
          })
          .slice(0, 3)
      : [];

    if (!recipeHits.length && !guideHits.length) {
      searchResults.innerHTML =
        '<p class="search-empty">No matches for &ldquo;' +
        escapeHtml(term) +
        '&rdquo;. Try a single ingredient.</p>';
      return;
    }

    var html = recipeHits
      .map(function (r) {
        return (
          '<a class="search-result" href="' +
          ROOT +
          'recipes/' +
          r.slug +
          '.html">' +
          '<img src="' +
          r.image +
          '" alt="" loading="lazy" />' +
          '<span><strong>' +
          escapeHtml(r.title) +
          '</strong><span>' +
          Recipes.totalMinutes(r) +
          ' min &middot; ' +
          escapeHtml(r.difficulty) +
          '</span></span></a>'
        );
      })
      .join('');

    html += guideHits
      .map(function (g) {
        return (
          '<a class="search-result" href="' +
          ROOT +
          'guides/' +
          g.slug +
          '.html">' +
          '<img src="' +
          g.image +
          '" alt="" loading="lazy" />' +
          '<span><strong>' +
          escapeHtml(g.title) +
          '</strong><span>Guide &middot; ' +
          g.readMinutes +
          ' min read</span></span></a>'
        );
      })
      .join('');

    searchResults.innerHTML = html;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var searchTrigger = $('#searchTrigger');
  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);

  var searchClose = $('#searchClose');
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (overlay) {
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeSearch();
    });
  }

  if (searchInput) {
    var searchTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      var value = searchInput.value;
      searchTimer = setTimeout(function () {
        renderSearch(value);
      }, 120);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay && !overlay.hidden) closeSearch();
    if ((event.key === '/' || (event.key === 'k' && (event.metaKey || event.ctrlKey))) &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      event.preventDefault();
      openSearch();
    }
  });

  /* ----------------------------------------------------------- favorites */

  function syncFavoriteButtons() {
    if (!Store) return;
    var favorites = Store.favorites();

    $$('[data-fav]').forEach(function (btn) {
      var isSaved = favorites.indexOf(btn.getAttribute('data-fav')) !== -1;
      btn.setAttribute('aria-pressed', String(isSaved));
      if (btn.hasAttribute('data-fav-label')) {
        btn.textContent = isSaved ? 'Saved' : 'Save recipe';
      }
    });

    $$('[data-favorites-count]').forEach(function (badge) {
      badge.textContent = favorites.length;
      badge.hidden = favorites.length === 0;
    });
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-fav]');
    if (!btn || !Store) return;
    event.preventDefault();
    Store.toggleFavorite(btn.getAttribute('data-fav'));
  });

  if (Store) Store.onChange(syncFavoriteButtons);

  /* ------------------------------------------------------- account state */

  function renderAuthState(user) {
    $$('[data-auth-anon]').forEach(function (el) {
      el.hidden = !!user;
    });
    $$('[data-auth-user]').forEach(function (el) {
      el.hidden = !user;
    });
    $$('[data-requires-auth]').forEach(function (el) {
      el.hidden = !user;
    });
    $$('[data-requires-anon]').forEach(function (el) {
      el.hidden = !!user;
    });

    if (user) {
      $$('[data-user-name]').forEach(function (el) {
        el.textContent = user.name;
      });
      $$('[data-user-initials]').forEach(function (el) {
        el.textContent = user.name.trim().charAt(0).toUpperCase() || 'K';
      });
      $$('[data-user-email]').forEach(function (el) {
        el.textContent = user.email;
      });
    }
  }

  if (Auth) Auth.onChange(renderAuthState);

  var accountTrigger = $('#accountTrigger');
  var accountDropdown = $('#accountDropdown');

  if (accountTrigger && accountDropdown) {
    accountTrigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var open = accountDropdown.hidden;
      accountDropdown.hidden = !open;
      accountTrigger.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function () {
      accountDropdown.hidden = true;
      accountTrigger.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-signout]') || !Auth) return;
    event.preventDefault();
    Auth.signOut().then(function () {
      window.location.href = ROOT + 'index.html';
    });
  });

  /* ---------------------------------------------------------- newsletter */

  $$('[data-newsletter]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var status = form.querySelector('.form-status');
      var value = input.value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status is-error';
        input.focus();
        return;
      }

      try {
        var subs = JSON.parse(localStorage.getItem('kitchenlo-newsletter') || '[]');
        if (subs.indexOf(value) === -1) subs.push(value);
        localStorage.setItem('kitchenlo-newsletter', JSON.stringify(subs));
      } catch (e) {}

      status.textContent = 'Thanks. You are on the list.';
      status.className = 'form-status is-success';
      form.reset();
    });
  });

  /* --------------------------------------------------------- back to top */

  var backToTop = $('#backToTop');
  if (backToTop) {
    var onScroll = function () {
      backToTop.hidden = window.scrollY < 600;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------- shared form helpers */

  function stars(rating) {
    var rounded = Math.round(rating * 2) / 2;
    var out = '';
    for (var i = 1; i <= 5; i++) {
      if (rounded >= i) out += '<span class="star full">&#9733;</span>';
      else if (rounded >= i - 0.5) out += '<span class="star half">&#9733;</span>';
      else out += '<span class="star">&#9733;</span>';
    }
    return '<span class="stars" role="img" aria-label="' + rating + ' out of 5 stars">' + out + '</span>';
  }

  function timeLabel(minutes) {
    if (minutes < 60) return minutes + ' min';
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return m ? h + ' hr ' + m + ' min' : h + ' hr';
  }

  /** Client-side twin of the generator's recipe card, kept visually identical. */
  function recipeCardHtml(recipe, prefix) {
    var e = escapeHtml;
    var href = (prefix === undefined ? ROOT : prefix) + 'recipes/' + recipe.slug + '.html';
    var tags = (recipe.diet || [])
      .slice(0, 2)
      .map(function (d) {
        return '<span class="tag">' + e(d.replace(/-/g, ' ')) + '</span>';
      })
      .join('');

    return (
      '<article class="card recipe-card" data-slug="' + e(recipe.slug) + '">' +
      '<a class="card-media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + e(recipe.image) + '" alt="' + e(recipe.imageAlt) +
      '" loading="lazy" decoding="async" width="600" height="400" />' +
      '<span class="card-badge">' + e(recipe.difficulty) + '</span></a>' +
      '<button class="fav-btn" type="button" data-fav="' + e(recipe.slug) +
      '" aria-label="Save ' + e(recipe.title) + '" aria-pressed="false">' +
      '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17s-6-3.9-6-8a3.6 3.6 0 0 1 6-2.4A3.6 3.6 0 0 1 16 9c0 4.1-6 8-6 8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>' +
      '</button>' +
      '<div class="card-body"><div class="card-meta">' + stars(recipe.rating) +
      '<span class="meta-dot">&middot;</span><span>' +
      timeLabel(Recipes.totalMinutes(recipe)) + '</span></div>' +
      '<h3><a href="' + href + '">' + e(recipe.title) + '</a></h3>' +
      '<p>' + e(recipe.description) + '</p>' +
      '<div class="card-tags">' + tags +
      '<span class="tag tag-muted">' + recipe.nutrition.calories + ' cal</span></div>' +
      '</div></article>'
    );
  }

  window.KitchenloUI = {
    ROOT: ROOT,
    $: $,
    $$: $$,
    escapeHtml: escapeHtml,
    stars: stars,
    timeLabel: timeLabel,
    recipeCardHtml: recipeCardHtml,

    setStatus: function (form, message, type) {
      var status = form.querySelector('.form-status');
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    },

    setFieldError: function (id, message) {
      var field = document.getElementById(id);
      var error = document.querySelector('[data-error-for="' + id + '"]');
      if (field && field.closest('.field')) {
        field.closest('.field').classList.toggle('has-error', !!message);
      }
      if (error) error.textContent = message || '';
      return !message;
    },

    clearErrors: function (form) {
      $$('.field-error', form).forEach(function (el) {
        el.textContent = '';
      });
      $$('.field', form).forEach(function (el) {
        el.classList.remove('has-error');
      });
    },

    isEmail: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
    }
  };
})();
