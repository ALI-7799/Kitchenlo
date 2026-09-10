/**
 * Loads generated pages in a real DOM, runs the bundled browser code against
 * them and drives the actual interactions, failing on any console error.
 *
 * These tests deliberately go through the UI rather than reaching into module
 * internals. Since the TypeScript migration the client exposes nothing on
 * `window`, so the only way in is the way a visitor comes in: click things and
 * assert on what the page and localStorage end up holding.
 *
 * Written in plain JavaScript on purpose and excluded from tsconfig; esbuild
 * bundles it so it can import the TypeScript sources directly.
 *
 * Run: npm test   (builds first)   or   node .build/smoke-test.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { webcrypto } from 'node:crypto';
import { JSDOM, VirtualConsole } from 'jsdom';

import * as RECIPES from '../src/data/recipes.ts';
import SITE from '../src/data/site.ts';
import COLLECTIONS from '../src/data/collections.ts';
import * as CORE from '../src/templates/pages-core.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const TOTAL = RECIPES.all.length;

let failures = 0;
let checks = 0;

function check(label, condition, detail) {
  checks++;
  if (condition) {
    console.log('  PASS  ' + label);
  } else {
    failures++;
    console.log('  FAIL  ' + label + (detail ? '  -> ' + detail : ''));
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Boots a generated page with its scripts executed.
 * @param {string} relPath page to load, relative to the repo root
 * @param {{storage?: Record<string,string>}} [options] localStorage to seed
 *   before scripts run, which is how state is carried between page loads since
 *   each JSDOM instance gets its own empty storage.
 */
function load(relPath, options = {}) {
  const errors = [];
  const virtualConsole = new VirtualConsole();

  virtualConsole.on('jsdomError', (e) => {
    // jsdom has no navigation, and several flows end by assigning
    // location.href. That is expected, not a failure.
    if (/Not implemented: navigation/i.test(e.message)) return;
    errors.push(e.message);
  });
  virtualConsole.on('error', (...args) => errors.push(args.join(' ')));

  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, relPath), 'utf8'), {
    url: 'https://www.kitchenlo.com/' + relPath,
    runScripts: 'dangerously',
    virtualConsole,
    pretendToBeVisual: true,
    beforeParse(window) {
      // jsdom has no layout engine, so stub the few APIs the site touches.
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
      window.scrollTo = () => {};
      window.print = () => {};
      window.confirm = () => true;
      window.HTMLCanvasElement.prototype.getContext = () => null;

      // jsdom defines window.crypto without subtle, and plain assignment is
      // ignored, so redefine it with Node's WebCrypto. Without this the auth
      // code takes its non-secure-origin fallback and real SHA-256 hashing
      // would never be exercised.
      Object.defineProperty(window, 'crypto', {
        value: webcrypto,
        configurable: true,
        writable: true
      });
      window.TextEncoder = TextEncoder;

      for (const [key, value] of Object.entries(options.storage ?? {})) {
        window.localStorage.setItem(key, value);
      }
    }
  });

  const { window } = dom;

  // jsdom will not fetch scripts here, so execute the local ones by hand.
  const scripts = Array.from(window.document.querySelectorAll('script[src]'))
    .map((s) => s.getAttribute('src'))
    .filter((src) => !/^https?:/.test(src));

  for (const rawSrc of scripts) {
    // Static assets carry a ?v= cache-busting hash, which is part of the URL
    // a browser requests but not part of the filename on disk.
    const src = rawSrc.split('?')[0];
    // 404.html links from the site root, so resolve those against ROOT.
    const file = src.startsWith('/')
      ? path.join(ROOT, src.slice(1))
      : path.resolve(path.dirname(path.join(ROOT, relPath)), src);

    if (!fs.existsSync(file)) {
      errors.push('missing script ' + src);
      continue;
    }
    try {
      window.eval(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      errors.push(src + ': ' + e.message);
    }
  }

  return { dom, window, doc: window.document, errors };
}

const suites = [];
const suite = (name, fn) => suites.push({ name, fn });

/* ------------------------------------------------------------- home page -- */

suite('index.html', () => {
  const { doc, errors } = load('index.html');
  check('no script errors', errors.length === 0, errors[0]);

  // The bundle filling the footer year proves it parsed, executed and reached
  // the DOM. There are no globals left to inspect.
  const year = doc.querySelector('[data-year]');
  check('bundle executed', year?.textContent === String(new Date().getFullYear()), year?.textContent);

  check('header rendered', !!doc.querySelector('.site-header .brand'));
  check('footer renders every configured column', doc.querySelectorAll('.footer-col').length === SITE.footer.length);
  check('signed-out auth actions shown', doc.querySelectorAll('[data-auth-anon]:not([hidden])').length === 2);
  check('recipe cards present', doc.querySelectorAll('.recipe-card').length >= 6);
  check('JSON-LD blocks', doc.querySelectorAll('script[type="application/ld+json"]').length >= 2);

  const before = doc.documentElement.getAttribute('data-theme');
  doc.getElementById('themeToggle').click();
  check('theme toggles', doc.documentElement.getAttribute('data-theme') !== before);

  doc.getElementById('navToggle').click();
  check('nav opens', doc.getElementById('siteNav').classList.contains('is-open'));

  // Saving proves the store is wired to both the button and the header badge.
  const favBtn = doc.querySelector('[data-fav]');
  favBtn.click();
  check('save marks pressed', favBtn.getAttribute('aria-pressed') === 'true');
  check('header badge updates', doc.querySelector('[data-favorites-count]').textContent === '1');
  favBtn.click();
  check('unsave clears badge', doc.querySelector('[data-favorites-count]').hidden === true);
});

/* ---------------------------------------------------------- recipe index -- */

suite('recipes.html (search and filters)', () => {
  const { doc, errors } = load('recipes.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('every recipe rendered', doc.querySelectorAll('.recipe-card').length === TOTAL, 'expected ' + TOTAL);

  const dessertChip = doc.querySelector('.chip[data-value="desserts"]');
  dessertChip.click();
  const shown = doc.querySelectorAll('#recipeResults .recipe-card').length;
  const expected = RECIPES.byCategory('desserts').length;
  check('category filter narrows correctly', shown === expected, 'got ' + shown);
  check('chip marked active', dessertChip.classList.contains('is-active'));
  check('count text updates', doc.getElementById('resultsCount').textContent.includes(String(expected)));

  doc.querySelector('.chip[data-value="vegan"]').click();
  const combined = doc.querySelectorAll('#recipeResults .recipe-card').length;
  check('filters combine', combined <= shown, 'got ' + combined);

  doc.getElementById('clearFilters').click();
  check('reset restores every recipe', doc.querySelectorAll('#recipeResults .recipe-card').length === TOTAL);

  // Client-rendered cards must match the generator's markup, since both now
  // come from the same recipeCard function.
  const card = doc.querySelector('#recipeResults .recipe-card');
  check('client cards carry a fallback', card.querySelector('img[data-fallback]') !== null);
  check('client cards carry a save button', card.querySelector('[data-fav]') !== null);
});

/* --------------------------------------------------------- recipe detail -- */

suite('recipes/garlic-butter-salmon.html', () => {
  const { doc, errors } = load('recipes/garlic-butter-salmon.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('ingredients rendered', doc.querySelectorAll('[data-ingredient]').length > 5);
  check('steps rendered', doc.querySelectorAll('.step').length === 6);
  check('nutrition table', doc.querySelectorAll('.nutrition-table tr').length === 7);
  check('faq items', doc.querySelectorAll('.faq-item').length === 3);
  check('breadcrumbs', doc.querySelectorAll('.breadcrumbs li').length === 4);

  const ld = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map((s) =>
    JSON.parse(s.textContent)
  );
  const recipeLd = ld.find((d) => d['@type'] === 'Recipe');
  check('Recipe schema present', !!recipeLd);
  check('has HowToStep instructions', recipeLd.recipeInstructions.length === 6);
  check('has ISO durations', recipeLd.totalTime === 'PT17M', recipeLd.totalTime);
  check('has nutrition', recipeLd.nutrition.calories === '412 calories');
  // Placeholder ratings must not be published as review data.
  check(
    'aggregateRating matches ratings config',
    'aggregateRating' in recipeLd === SITE.ratings.enabled
  );

  const first = doc.querySelector('[data-ingredient]');
  const original = first.textContent;
  for (let i = 0; i < 4; i++) doc.querySelector('[data-servings-step="1"]').click();
  check('servings display updates', doc.querySelector('[data-servings-display]').textContent === '8');
  check('quantities rescaled', first.textContent !== original, first.textContent);

  const butter = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /butter/.test(el.getAttribute('data-ingredient'))
  );
  check('3 tbsp butter doubled to 6', /^6 tbsp/.test(butter.textContent), butter.textContent);

  const wine = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /\(\d+ ml\)/.test(el.getAttribute('data-ingredient'))
  );
  if (wine) {
    const scaled = Number(wine.textContent.match(/\((\d+) ml\)/)?.[1]);
    const base = Number(wine.getAttribute('data-ingredient').match(/\((\d+) ml\)/)[1]);
    check('bracketed metric scales too', scaled === base * 2, `${base} -> ${scaled}`);
  }
});

/* ------------------------------------------------------------ breakfast -- */

suite('generated cover art', () => {
  const generated = RECIPES.all.filter((r) => r.generatedImage);
  const photographed = RECIPES.all.filter((r) => !r.generatedImage);
  // Derived, not a fixed count: how many recipes ship without photography
  // changes as collections are added, so assert the invariant instead.
  check(
    'recipes without a photo use their generated art',
    generated.every((r) => r.image === r.fallbackImage),
    'a photoless recipe is not using its art'
  );
  check(
    'photographed recipes keep their photo',
    photographed.every((r) => r.image !== r.fallbackImage),
    'a photographed recipe fell back to art'
  );
  check(
    'every cover exists on disk',
    RECIPES.all.every((r) => fs.existsSync(path.join(ROOT, r.fallbackImage)))
  );
  check(
    'covers are unique per recipe',
    new Set(RECIPES.all.map((r) => r.fallbackImage)).size === TOTAL
  );

  const { doc, errors } = load('recipes/shakshuka.html');
  check('breakfast recipe page renders', errors.length === 0 && !!doc.querySelector('h1'), errors[0]);
  const hero = doc.querySelector('.recipe-hero-media img');
  // The hero may be a photo or the art itself, but the fallback it degrades to
  // must always resolve from a nested directory.
  const heroFallback = hero.getAttribute('data-fallback');
  check(
    'cover resolves from a nested page',
    !!heroFallback && heroFallback.startsWith('../assets/img/'),
    heroFallback
  );

  const ld = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
    .map((s) => JSON.parse(s.textContent))
    .find((d) => d['@type'] === 'Recipe');
  check('schema image is absolute', ld.image[0].startsWith('https://'), ld.image[0]);
});

/* ---------------------------------------------------------- collections -- */

suite('collection/vegetarian-recipes.html', () => {
  const { doc, errors } = load('collection/vegetarian-recipes.html');
  const spec = COLLECTIONS.find((c) => c.slug === 'vegetarian-recipes');
  const expected = CORE.collectionRecipes(spec).length;

  check('no script errors', errors.length === 0, errors[0]);
  check('renders every qualifying recipe', doc.querySelectorAll('.recipe-card').length === expected, 'expected ' + expected);
  check('has original intro copy', doc.querySelectorAll('.prose p').length >= 3);
  check('has faqs', doc.querySelectorAll('.faq-item').length === spec.faqs.length);
  check('cross-links other collections', doc.querySelectorAll('.chip-links a').length >= 6);

  const ld = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map((s) =>
    JSON.parse(s.textContent)
  );
  const list = ld.find((d) => d['@type'] === 'CollectionPage');
  check('ItemList schema present', !!list && list.mainEntity.numberOfItems === expected);
  check('FAQPage schema present', ld.some((d) => d['@type'] === 'FAQPage'));
});

/* ---------------------------------------------------------------- forms -- */

suite('contact.html', () => {
  const { window, doc, errors } = load('contact.html');
  check('no script errors', errors.length === 0, errors[0]);

  // The pre-rebuild site destroyed these on load; assert they survive.
  check('name input survives load', !!doc.getElementById('contactName'));
  check('email input survives load', !!doc.getElementById('contactEmail'));
  check('message textarea survives load', !!doc.getElementById('contactMessage'));
  check('topic select survives load', !!doc.getElementById('contactTopic'));

  const form = doc.getElementById('contactForm');
  const submit = () =>
    form.dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));

  submit();
  check('empty submit blocked', /highlighted fields/.test(form.querySelector('.form-status').textContent));
  check('name error shown', doc.querySelector('[data-error-for="contactName"]').textContent.length > 0);

  doc.getElementById('contactName').value = 'Ada';
  doc.getElementById('contactEmail').value = 'not-an-email';
  doc.getElementById('contactMessage').value = 'Short';
  submit();
  check('invalid email rejected', /valid email/.test(doc.querySelector('[data-error-for="contactEmail"]').textContent));
  check('short message rejected', /more detail/.test(doc.querySelector('[data-error-for="contactMessage"]').textContent));

  doc.getElementById('contactEmail').value = 'ada@example.com';
  doc.getElementById('contactMessage').value = 'I would like a recipe for braised leeks please.';
  submit();
  check('valid submit accepted', /Thanks, Ada/.test(form.querySelector('.form-status').textContent), form.querySelector('.form-status').textContent);
});

/* ----------------------------------------------------------------- auth -- */

suite('account lifecycle, driven through the forms', async () => {
  const signup = load('signup.html');
  check('no script errors on signup', signup.errors.length === 0, signup.errors[0]);

  const signupForm = signup.doc.getElementById('signupForm');
  const fill = (doc, id, value) => {
    doc.getElementById(id).value = value;
  };

  fill(signup.doc, 'signupName', 'Ada Lovelace');
  fill(signup.doc, 'signupEmail', 'ada@example.com');
  fill(signup.doc, 'signupPassword', 'correct-horse');
  fill(signup.doc, 'signupConfirm', 'correct-horse');
  signup.doc.getElementById('signupTerms').checked = true;

  signupForm.dispatchEvent(new signup.window.Event('submit', { cancelable: true, bubbles: true }));
  await wait(120);

  const usersRaw = signup.window.localStorage.getItem('kitchenlo-users');
  check('account persisted', !!usersRaw);

  const record = JSON.parse(usersRaw ?? '{}')['ada@example.com'];
  check('record created', !!record);
  check('password not stored in plain text', record.hash !== 'correct-horse');
  check('password hashed with a salt', !!record.salt && record.hash.length === 64, 'hash len ' + record?.hash?.length);
  check('weak fallback not used', record.weak === false);
  check('session established', !!signup.window.localStorage.getItem('kitchenlo-session'));

  // Duplicate registration, on a fresh page seeded with the stored account.
  const dup = load('signup.html', { storage: { 'kitchenlo-users': usersRaw } });
  fill(dup.doc, 'signupName', 'Someone Else');
  fill(dup.doc, 'signupEmail', 'ada@example.com');
  fill(dup.doc, 'signupPassword', 'another-password');
  fill(dup.doc, 'signupConfirm', 'another-password');
  dup.doc.getElementById('signupTerms').checked = true;
  dup.doc
    .getElementById('signupForm')
    .dispatchEvent(new dup.window.Event('submit', { cancelable: true, bubbles: true }));
  await wait(120);
  check(
    'duplicate email rejected',
    /already exists/.test(dup.doc.querySelector('#signupForm .form-status').textContent),
    dup.doc.querySelector('#signupForm .form-status').textContent
  );

  // Wrong password.
  const bad = load('login.html', { storage: { 'kitchenlo-users': usersRaw } });
  fill(bad.doc, 'loginEmail', 'ada@example.com');
  fill(bad.doc, 'loginPassword', 'wrong-password');
  bad.doc
    .getElementById('loginForm')
    .dispatchEvent(new bad.window.Event('submit', { cancelable: true, bubbles: true }));
  await wait(120);
  check(
    'wrong password rejected',
    /incorrect/.test(bad.doc.querySelector('#loginForm .form-status').textContent),
    bad.doc.querySelector('#loginForm .form-status').textContent
  );
  check('no session after failed login', !bad.window.localStorage.getItem('kitchenlo-session'));

  // Correct password.
  const good = load('login.html', { storage: { 'kitchenlo-users': usersRaw } });
  fill(good.doc, 'loginEmail', 'ada@example.com');
  fill(good.doc, 'loginPassword', 'correct-horse');
  good.doc
    .getElementById('loginForm')
    .dispatchEvent(new good.window.Event('submit', { cancelable: true, bubbles: true }));
  await wait(120);
  check(
    'correct password accepted',
    /Welcome back, Ada Lovelace/.test(good.doc.querySelector('#loginForm .form-status').textContent),
    good.doc.querySelector('#loginForm .form-status').textContent
  );
  check('session created on login', !!good.window.localStorage.getItem('kitchenlo-session'));
});

/* ---------------------------------------------------------------- tools -- */

suite('meal-planner.html', () => {
  const { window, doc, errors } = load('meal-planner.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('seven days rendered', doc.querySelectorAll('.planner-day').length === 7);

  const select = doc.querySelector('[data-day-select="Monday"]');
  select.value = 'lentil-soup';
  select.dispatchEvent(new window.Event('change', { bubbles: true }));

  check('planner card rendered', !!doc.querySelector('[data-slot="Monday"] .planner-card'));
  check('summary appears', doc.getElementById('plannerSummary').hidden === false);
  check('meal count updates', doc.querySelector('[data-plan-meals]').textContent === '1');

  doc.querySelector('[data-build-list]').click();
  const status = doc.querySelector('[data-plan-status]').textContent;
  check('shopping list built from plan', /Added \d+ items/.test(status), status);

  const stored = JSON.parse(window.localStorage.getItem('kitchenlo-data:guest'));
  check('items persisted', stored.list.length > 10, stored.list.length + ' items');
  check('items tagged with source', stored.list[0].source === 'Lentil Herb Soup', stored.list[0].source);

  doc.querySelector('[data-clear-plan]').click();
  check('clear empties the week', !doc.querySelector('[data-slot="Monday"] .planner-card'));
});

suite('shopping-list.html (aisle grouping)', () => {
  const { window, doc, errors } = load('shopping-list.html');
  check('no script errors', errors.length === 0, errors[0]);

  const add = (text) => {
    doc.getElementById('newItem').value = text;
    doc
      .getElementById('addItemForm')
      .dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));
  };

  add('2 salmon fillets');
  add('1 lemon');
  add('200 g plain flour');
  add('1 tsp ground cumin');

  const groups = Array.from(doc.querySelectorAll('.list-group h2')).map((h) => h.textContent);
  check('groups by aisle', groups.length >= 3, groups.join(', '));
  check('fish in Meat & Fish', groups.includes('Meat & Fish'), groups.join(', '));
  check('lemon in Produce', groups.includes('Produce'), groups.join(', '));
  check('flour in Pantry', groups.includes('Pantry'), groups.join(', '));
  check('items rendered', doc.querySelectorAll('.list-item').length === 4);

  add('1 lemon');
  check('duplicates ignored', doc.querySelectorAll('.list-item').length === 4);

  doc.querySelector('.list-item input[type="checkbox"]').click();
  check('checking marks the row', !!doc.querySelector('.list-item.is-checked'));

  doc.querySelector('[data-clear-checked]').click();
  check('clear checked removes it', doc.querySelectorAll('.list-item').length === 3);
});

suite('favorites.html', () => {
  const { doc, errors } = load('favorites.html', {
    storage: {
      'kitchenlo-data:guest': JSON.stringify({
        favorites: ['lentil-soup', 'apple-crisp'],
        plan: {},
        list: [],
        prefs: { diet: '', servings: 4, metric: false }
      })
    }
  });

  check('no script errors', errors.length === 0, errors[0]);
  check('saved recipes rendered', doc.querySelectorAll('#favoritesGrid .recipe-card').length === 2);
  check('empty state hidden', doc.getElementById('favoritesEmpty').hidden === true);
  check('count updates', /2 saved recipes/.test(doc.querySelector('[data-fav-count]').textContent));
  check(
    'hearts marked saved',
    Array.from(doc.querySelectorAll('#favoritesGrid [data-fav]')).every(
      (b) => b.getAttribute('aria-pressed') === 'true'
    )
  );

  // Unsaving removes the card, proving the view re-renders from the store.
  doc.querySelector('#favoritesGrid [data-fav]').click();
  check('unsaving removes the card', doc.querySelectorAll('#favoritesGrid .recipe-card').length === 1);
});

suite('empty favorites', () => {
  const { doc } = load('favorites.html');
  check('empty state shown', doc.getElementById('favoritesEmpty').hidden === false);
  check('no cards', doc.querySelectorAll('#favoritesGrid .recipe-card').length === 0);
});

/* ------------------------------------------------------- image fallback -- */

suite('broken image fallback', () => {
  const { window, doc, errors } = load('index.html');
  check('no script errors', errors.length === 0, errors[0]);

  const img = doc.querySelector('.card-media img[data-fallback]');
  check('cards declare a fallback', !!img);

  const expected = img.getAttribute('data-fallback');
  check('fallback differs from the photo', expected !== img.getAttribute('src'));

  img.dispatchEvent(new window.Event('error'));
  check('src swapped to generated art', img.getAttribute('src') === expected, img.getAttribute('src'));
  check('marked as fallback', img.classList.contains('is-fallback'));
  check('attribute cleared so it cannot loop', !img.hasAttribute('data-fallback'));

  img.dispatchEvent(new window.Event('error'));
  check('second failure is inert', img.getAttribute('src') === expected);
});

/* ------------------------------------------------------------------ 404 -- */

suite('404.html', () => {
  const { doc, errors } = load('404.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('noindex set', !!doc.querySelector('meta[name="robots"][content*="noindex"]'));
  check('recovery links present', doc.querySelectorAll('.error-hero .btn').length === 2);
});

/* --------------------------------------------- client-rendered search ---- */

/*
 * The search dropdown builds its rows in the browser, so none of them appear
 * in the generated HTML and the page checks above cannot see them. Recipe rows
 * and guide rows are built by two separate code paths, and the guide path once
 * emitted a site-relative image path without the per-page prefix, which
 * resolved to a 404 from every nested page.
 */
suite('search results resolve their images from every page depth', async () => {
  // One page per directory the generator emits. A client-built image path is
  // relative to the page it was built on, so a page at the wrong assumed depth
  // asks for a file that is not there and the row renders broken.
  const pages = [
    'index.html',
    'recipes.html',
    'recipes/raclette.html',
    'category/comfort-food.html',
    'collection/vegetarian-recipes.html',
    'guides/knife-skills-basics.html',
    'favorites.html'
  ];

  for (const page of pages) {
    const { window, doc } = load(page);
    const input = doc.querySelector('#searchOverlayInput');
    const results = doc.querySelector('#searchOverlayResults');
    if (!input || !results) {
      check(page + ': search present', false, 'no overlay');
      continue;
    }

    // 'knife' matches a guide by title, so recipe rows and guide rows - which
    // are built by two different code paths - are both exercised.
    input.value = 'knife';
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));

    const rows = Array.from(results.querySelectorAll('a.search-result'));
    const dir = path.dirname(page);
    const broken = rows
      .map((a) => {
        const img = a.querySelector('img');
        return img ? img.getAttribute('src') : '';
      })
      .filter((src) => !src || (!/^https?:/.test(src) && !fs.existsSync(path.join(ROOT, dir, src))));

    check(
      page + ': every result image resolves',
      rows.length > 0 && broken.length === 0,
      rows.length + ' rows, ' + broken.length + ' broken: ' + broken.join(', ')
    );
  }
});

suite('every image on every generated page resolves', () => {
  /*
   * Walks the whole output and resolves each img src and data-fallback
   * relative to the page that references it. A path built without the page's
   * depth still looks plausible in the markup and only 404s once served, which
   * is how six guide pages shipped with a broken hero image.
   */
  const pages = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = dir ? dir + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', '.build', 'assets', 'src', 'tools'].includes(entry.name)) walk(rel);
      } else if (entry.name.endsWith('.html')) {
        pages.push(rel);
      }
    }
  })('');

  const broken = [];
  let refs = 0;
  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const found = [
      ...Array.from(html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)).map((m) => m[1]),
      ...Array.from(html.matchAll(/data-fallback="([^"]+)"/g)).map((m) => m[1])
    ];
    for (const raw of found) {
      const src = raw.replace(/&amp;/g, '&').split('?')[0];
      if (/^(https?:|data:)/.test(src)) continue;
      refs++;
      const target = src.startsWith('/')
        ? path.join(ROOT, src.slice(1))
        : path.resolve(path.dirname(path.join(ROOT, page)), src);
      if (!fs.existsSync(target)) broken.push(page + ' -> ' + src);
    }
  }
  check('pages scanned', pages.length > 50, String(pages.length));
  check('local image references resolve', broken.length === 0, refs + ' refs; broken: ' + broken.slice(0, 5).join(' | '));
});

suite('share images are absolute', () => {
  // og:image and twitter:image are fetched by crawlers with no page context,
  // so a site-relative value is silently useless.
  for (const page of ['index.html', 'category/comfort-food.html', 'collection/vegetarian-recipes.html', 'guides/knife-skills-basics.html', 'recipes/raclette.html']) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const og = (html.match(/property="og:image" content="([^"]+)"/) || [])[1] || '';
    const tw = (html.match(/name="twitter:image" content="([^"]+)"/) || [])[1] || '';
    check(page + ': share images absolute', /^https?:\/\//.test(og) && /^https?:\/\//.test(tw), og);
  }
});

suite('every page declares its depth to the client', () => {
  // The client reads body[data-depth] to rebuild paths. If a page omits it,
  // the client silently falls back to guessing from the URL.
  const pages = [
    ['index.html', '0'],
    ['recipes.html', '0'],
    ['recipes/raclette.html', '1'],
    ['category/comfort-food.html', '1'],
    ['collection/vegetarian-recipes.html', '1'],
    ['guides/knife-skills-basics.html', '1']
  ];
  for (const [page, expected] of pages) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const found = (html.match(/<body[^>]*data-depth="(\d+)"/) || [])[1];
    check(page + ': data-depth=' + expected, found === expected, 'got ' + found);
  }
});

/* --------------------------------------------------------------- runner -- */

for (const { name, fn } of suites) {
  console.log('\n' + name);
  try {
    await fn();
  } catch (e) {
    failures++;
    console.log('  FAIL  threw: ' + e.message);
  }
}

console.log('\n' + '-'.repeat(52));
console.log(checks + ' checks, ' + failures + ' failed');
process.exit(failures ? 1 : 0);
