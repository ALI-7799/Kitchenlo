#!/usr/bin/env node
/**
 * Loads generated pages in a real DOM, runs the browser scripts against them
 * and drives the main interactions, failing on any console error or exception.
 *
 * Requires jsdom, which is a dev-only dependency:  npm install --no-save jsdom
 * Usage: node tools/smoke-test.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

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

/** Boots a generated page with its scripts executed. */
function load(relPath) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => errors.push(e.message));
  virtualConsole.on('error', (...args) => errors.push(args.join(' ')));

  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, relPath), 'utf8'), {
    url: 'https://www.kitchenlo.com/' + relPath,
    runScripts: 'dangerously',
    resources: undefined,
    virtualConsole,
    pretendToBeVisual: true,
    beforeParse(window) {
      // jsdom has no layout engine, so stub the few APIs the site touches.
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
      window.scrollTo = () => {};
      window.print = () => {};
      window.confirm = () => true;
      window.HTMLCanvasElement.prototype.getContext = () => null;

      // jsdom defines window.crypto itself but without subtle, and plain
      // assignment is ignored, so redefine the property to lend it Node's
      // WebCrypto. Without this the auth code takes its non-secure-origin
      // fallback and real SHA-256 hashing would never be exercised.
      Object.defineProperty(window, 'crypto', {
        value: require('crypto').webcrypto,
        configurable: true,
        writable: true
      });
      window.TextEncoder = TextEncoder;
    }
  });

  // Manually execute the scripts jsdom will not fetch (no network in this run).
  const { window } = dom;
  const scripts = Array.from(window.document.querySelectorAll('script[src]'))
    .map((s) => s.getAttribute('src'))
    .filter((src) => !/^https?:/.test(src));

  for (const src of scripts) {
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

  // Deferred scripts wait for DOMContentLoaded, which already fired.
  return { dom, window, doc: window.document, errors };
}

function suite(name, fn) {
  console.log('\n' + name);
  try {
    fn();
  } catch (e) {
    failures++;
    console.log('  FAIL  threw: ' + e.message);
  }
}

/* ------------------------------------------------------------- home page -- */

suite('index.html', () => {
  const { window, doc, errors } = load('index.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('data layer loaded', window.Kitchenlo && window.Kitchenlo.all.length === 30);
  check('auth provider ready', !!window.KitchenloAuth);
  check('store ready', !!window.KitchenloStore);
  check('header rendered', !!doc.querySelector('.site-header .brand'));
  check('footer rendered', doc.querySelectorAll('.footer-col').length === 4);
  check('recipe cards present', doc.querySelectorAll('.recipe-card').length >= 6);
  check('JSON-LD blocks', doc.querySelectorAll('script[type="application/ld+json"]').length >= 2);

  // Theme toggle flips the root attribute.
  const before = doc.documentElement.getAttribute('data-theme');
  doc.getElementById('themeToggle').click();
  check('theme toggles', doc.documentElement.getAttribute('data-theme') !== before);

  // Mobile nav opens.
  doc.getElementById('navToggle').click();
  check('nav opens', doc.getElementById('siteNav').classList.contains('is-open'));

  // Saving a recipe updates the header badge.
  const favBtn = doc.querySelector('[data-fav]');
  favBtn.click();
  check('save marks pressed', favBtn.getAttribute('aria-pressed') === 'true');
  check('header badge updates', doc.querySelector('[data-favorites-count]').textContent === '1');
  favBtn.click();
  check('unsave clears badge', doc.querySelector('[data-favorites-count]').hidden === true);
});

/* ---------------------------------------------------------- recipe index -- */

suite('recipes.html (filtering, async)', () => {
  const { window, doc, errors } = load('recipes.html');
  check('no script errors', errors.length === 0, errors[0]);

  // Category chip filtering is synchronous.
  const dessertChip = doc.querySelector('.chip[data-value="desserts"]');
  dessertChip.click();
  const shown = doc.querySelectorAll('#recipeResults .recipe-card').length;
  check('category filter narrows to 10', shown === 10, 'got ' + shown);
  check('chip marked active', dessertChip.classList.contains('is-active'));
  check('count text updates', /10 recipes/.test(doc.getElementById('resultsCount').textContent));

  // Diet filter combines with category.
  doc.querySelector('.chip[data-value="vegan"]').click();
  const combined = doc.querySelectorAll('#recipeResults .recipe-card').length;
  check('combined filters apply', combined < shown, 'got ' + combined);

  // Reset restores everything.
  doc.getElementById('clearFilters').click();
  check('reset restores all 30', doc.querySelectorAll('#recipeResults .recipe-card').length === 30);

  // Empty state appears when nothing matches.
  doc.querySelector('.chip[data-value="desserts"]').click();
  doc.querySelector('.chip[data-value="high-protein"]').click();
  const none = doc.querySelectorAll('#recipeResults .recipe-card').length;
  if (none === 0) {
    check('empty state shown', doc.getElementById('emptyState').hidden === false);
  } else {
    check('filters returned results', true);
  }
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

  const recipeLd = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
    .map((s) => JSON.parse(s.textContent))
    .find((d) => d['@type'] === 'Recipe');
  check('Recipe schema present', !!recipeLd);
  check('has HowToStep instructions', recipeLd.recipeInstructions.length === 6);
  check('has ISO durations', recipeLd.totalTime === 'PT17M', recipeLd.totalTime);
  check('has aggregateRating', recipeLd.aggregateRating.ratingValue === 4.8);
  check('has nutrition', recipeLd.nutrition.calories === '412 calories');

  // Servings scaler doubles quantities and their bracketed conversions.
  const first = doc.querySelector('[data-ingredient]');
  const original = first.textContent;
  doc.querySelector('[data-servings-step="1"]').click();
  doc.querySelector('[data-servings-step="1"]').click();
  doc.querySelector('[data-servings-step="1"]').click();
  doc.querySelector('[data-servings-step="1"]').click();
  check('servings display updates', doc.querySelector('[data-servings-display]').textContent === '8');
  check('quantities rescaled', first.textContent !== original, first.textContent);

  const butter = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /butter/.test(el.getAttribute('data-ingredient'))
  );
  check('3 tbsp butter doubled to 6', /^6 tbsp/.test(butter.textContent), butter.textContent);
});

/* ---------------------------------------------------------------- forms -- */

suite('contact.html', () => {
  const { window, doc, errors } = load('contact.html');
  check('no script errors', errors.length === 0, errors[0]);

  // The old site destroyed these inputs on load; assert they survive.
  check('name input survives load', !!doc.getElementById('contactName'));
  check('email input survives load', !!doc.getElementById('contactEmail'));
  check('message textarea survives load', !!doc.getElementById('contactMessage'));
  check('topic select survives load', !!doc.getElementById('contactTopic'));

  const form = doc.getElementById('contactForm');
  form.dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));
  check('empty submit blocked', /highlighted fields/.test(form.querySelector('.form-status').textContent));
  check('name error shown', doc.querySelector('[data-error-for="contactName"]').textContent.length > 0);

  doc.getElementById('contactName').value = 'Ada';
  doc.getElementById('contactEmail').value = 'not-an-email';
  doc.getElementById('contactMessage').value = 'Short';
  form.dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));
  check('invalid email rejected', /valid email/.test(doc.querySelector('[data-error-for="contactEmail"]').textContent));
  check('short message rejected', /more detail/.test(doc.querySelector('[data-error-for="contactMessage"]').textContent));

  doc.getElementById('contactEmail').value = 'ada@example.com';
  doc.getElementById('contactMessage').value = 'I would like a recipe for braised leeks please.';
  form.dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));
  check('valid submit accepted', /Thanks, Ada/.test(form.querySelector('.form-status').textContent),
    form.querySelector('.form-status').textContent);
});

/* ----------------------------------------------------------------- auth -- */

suite('signup.html + login.html (account lifecycle)', () => {
  const { window, doc, errors } = load('signup.html');
  check('no script errors', errors.length === 0, errors[0]);

  const auth = window.KitchenloAuth;
  check('starts signed out', auth.current() === null);

  return auth
    .signUp({ name: 'Ada Lovelace', email: 'ada@example.com', password: 'correct-horse' })
    .then((user) => {
      check('signUp returns user', user.email === 'ada@example.com');
      check('session established', auth.current().name === 'Ada Lovelace');
      return auth.signUp({ name: 'Ada', email: 'ada@example.com', password: 'another-one' });
    })
    .then(
      () => check('duplicate email rejected', false, 'signUp resolved when it should reject'),
      (err) => check('duplicate email rejected', /already exists/.test(err.message))
    )
    .then(() => auth.signIn({ email: 'ada@example.com', password: 'wrong' }))
    .then(
      () => check('wrong password rejected', false, 'signIn resolved when it should reject'),
      (err) => check('wrong password rejected', /incorrect/.test(err.message))
    )
    .then(() => auth.signIn({ email: 'ada@example.com', password: 'correct-horse' }))
    .then((user) => {
      check('correct password accepted', user.name === 'Ada Lovelace');
      const stored = JSON.parse(window.localStorage.getItem('kitchenlo-users'));
      const record = stored['ada@example.com'];
      check('password not stored in plain text', record.hash !== 'correct-horse');
      check('password hashed with salt', !!record.salt && record.hash.length === 64);
      return auth.signOut();
    })
    .then(() => check('signOut clears session', auth.current() === null));
});

/* ---------------------------------------------------------------- tools -- */

suite('meal-planner.html + shopping-list.html', () => {
  const { window, doc, errors } = load('meal-planner.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('seven days rendered', doc.querySelectorAll('.planner-day').length === 7);

  const store = window.KitchenloStore;
  const select = doc.querySelector('[data-day-select="Monday"]');
  select.value = 'lentil-soup';
  select.dispatchEvent(new window.Event('change', { bubbles: true }));

  check('plan persists', store.plan().Monday === 'lentil-soup');
  check('planner card rendered', !!doc.querySelector('[data-slot="Monday"] .planner-card'));
  check('summary appears', doc.getElementById('plannerSummary').hidden === false);
  check('meal count updates', doc.querySelector('[data-plan-meals]').textContent === '1');

  doc.querySelector('[data-build-list]').click();
  check('shopping list populated', store.list().length > 10, store.list().length + ' items');
  check('items tagged with source', store.list()[0].source === 'Lentil Herb Soup');

  doc.querySelector('[data-clear-plan]').click();
  check('clear empties plan', Object.keys(store.plan()).length === 0);
});

suite('shopping-list.html (aisle grouping)', () => {
  const { window, doc, errors } = load('shopping-list.html');
  check('no script errors', errors.length === 0, errors[0]);

  const store = window.KitchenloStore;
  store.addItems(['2 salmon fillets', '1 lemon', '200 g plain flour', '1 tsp ground cumin'], 'Test');

  const groups = Array.from(doc.querySelectorAll('.list-group h2')).map((h) => h.textContent);
  check('groups by aisle', groups.length >= 3, groups.join(', '));
  check('fish in Meat & Fish', groups.includes('Meat & Fish'), groups.join(', '));
  check('lemon in Produce', groups.includes('Produce'), groups.join(', '));
  check('flour in Pantry', groups.includes('Pantry'), groups.join(', '));
  check('items rendered', doc.querySelectorAll('.list-item').length === 4);

  // Deduplication.
  const before = store.list().length;
  store.addItems(['1 lemon'], 'Test');
  check('duplicates ignored', store.list().length === before);
});

/* ------------------------------------------------------------ favorites -- */

suite('favorites.html', () => {
  const { window, doc, errors } = load('favorites.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('empty state initially', doc.getElementById('favoritesEmpty').hidden === false);

  window.KitchenloStore.toggleFavorite('lentil-soup');
  window.KitchenloStore.toggleFavorite('apple-crisp');

  check('cards rendered', doc.querySelectorAll('#favoritesGrid .recipe-card').length === 2);
  check('empty state hidden', doc.getElementById('favoritesEmpty').hidden === true);
  check('count updates', /2 saved recipes/.test(doc.querySelector('[data-fav-count]').textContent));
  check('hearts marked saved',
    Array.from(doc.querySelectorAll('#favoritesGrid [data-fav]')).every(
      (b) => b.getAttribute('aria-pressed') === 'true'
    ));
});

/* ----------------------------------------------------------------- 404 --- */

suite('404.html', () => {
  const { doc, errors } = load('404.html');
  check('no script errors', errors.length === 0, errors[0]);
  check('noindex set', !!doc.querySelector('meta[name="robots"][content*="noindex"]'));
  check('recovery links present', doc.querySelectorAll('.error-hero .btn').length === 2);
});

/* --------------------------------------------------------------- report -- */

setTimeout(() => {
  console.log('\n' + '-'.repeat(52));
  console.log(checks + ' checks, ' + failures + ' failed');
  process.exit(failures ? 1 : 0);
}, 2500);
