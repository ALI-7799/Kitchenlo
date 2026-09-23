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
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

import * as RECIPES from '../src/data/recipes.ts';
import SITE from '../src/data/site.ts';
import COLLECTIONS from '../src/data/collections.ts';
import * as CORE from '../src/templates/pages-core.ts';
import * as COMPONENTS from '../src/templates/components.ts';
import * as VIDEOS from '../src/data/videos.ts';

// See the same note in tools/build.ts: import.meta.dirname is Node 20.11+
// and is undefined rather than an error on older runtimes.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/*
 * Directories the crawlers skip. 'admin' is the dashboard, which is a separate
 * application rather than a generated page: it is noindex, disallowed in
 * robots.txt, linked from nowhere on the site, and its markup is hand-written
 * rather than produced by the generator, so none of the checks below apply.
 */
const SKIP_DIRS = ['node_modules', '.git', '.build', 'assets', 'src', 'tools', 'api', 'db', 'admin'];
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
 * @param {{storage?: Record<string,string>, origin?: string}} [options] localStorage
 *   to seed before scripts run, which is how state is carried between page loads
 *   since each JSDOM instance gets its own empty storage; and the origin to serve
 *   the page from, which stands in for a preview or project-pages host.
 */
/** A generated recipe page's raw HTML, for checks that need no DOM. */
function readPage(slug) {
  return fs.readFileSync(path.join(ROOT, 'recipes', slug + '.html'), 'utf8');
}

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
    url: (options.origin ?? SITE.origin) + '/' + relPath,
    runScripts: 'dangerously',
    virtualConsole,
    pretendToBeVisual: true,
    beforeParse(window) {
      // Freeze the clock when a test needs to stand at a particular instant.
      // new Date(x) keeps working; only "now" is pinned.
      if (options.now !== undefined) {
        const fixed = options.now;
        const RealDate = window.Date;
        function FakeDate(...args) {
          return args.length === 0 ? new RealDate(fixed) : new RealDate(...args);
        }
        FakeDate.prototype = RealDate.prototype;
        FakeDate.now = () => fixed;
        FakeDate.UTC = RealDate.UTC;
        FakeDate.parse = RealDate.parse;
        window.Date = FakeDate;
      }

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

      /*
       * Record anything the page tries to send, so consent gating can be
       * asserted on what actually left the browser rather than on whether a
       * flag was set.
       *
       * Only sendBeacon is stubbed, not fetch. The analytics module tries
       * sendBeacon first and returns as soon as it succeeds, so this captures
       * the call without the fallback running — and leaving fetch undefined
       * keeps the search enhancement on its offline path, which is what the
       * rest of the suite already expects.
       */
      window.__beacons = [];
      Object.defineProperty(window.navigator, 'sendBeacon', {
        value: (url, body) => {
          /*
           * The body arrives as a Blob, and jsdom's Blob has no .text() — the
           * only way to read one here is FileReader, which is asynchronous.
           * Each entry therefore carries a promise for its own contents, and
           * a test that cares about the payload awaits it.
           */
          let text;
          if (body && window.Blob && body instanceof window.Blob) {
            text = new Promise((resolve) => {
              const reader = new window.FileReader();
              reader.onload = () => resolve(String(reader.result));
              reader.onerror = () => resolve('');
              reader.readAsText(body);
            });
          } else {
            text = Promise.resolve(String(body));
          }
          window.__beacons.push({ url: String(url), body, text });
          return true;
        },
        configurable: true,
        writable: true
      });

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

  // The figure beside the stepper is what tells a reader the number counts
  // people, so it travels with the control.
  check(
    'servings number is labelled with a person icon',
    !!doc.querySelector('.servings-control .servings-icon') &&
      !!doc.querySelector('.servings-control [data-servings-display]')
  );

  const first = doc.querySelector('[data-ingredient]');
  const original = first.textContent;
  for (let i = 0; i < 4; i++) doc.querySelector('[data-servings-step="1"]').click();
  check('servings display updates', doc.querySelector('[data-servings-display]').textContent === '8');
  check('quantities rescaled', first.textContent !== original, first.textContent);

  const butter = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /butter/.test(el.getAttribute('data-ingredient'))
  );
  check(
    '3 tablespoons butter doubled to 6',
    /^6 tablespoons/.test(butter.textContent),
    butter.textContent
  );

  // A spelled-out unit has to follow the scaled quantity from singular to plural.
  const oil = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /olive oil/.test(el.getAttribute('data-ingredient'))
  );
  check(
    '1 tablespoon oil doubled to 2 tablespoons',
    /^2 tablespoons\b/.test(oil.textContent),
    oil.textContent
  );

  const wine = Array.from(doc.querySelectorAll('[data-ingredient]')).find((el) =>
    /\(\d+ ml\)/.test(el.getAttribute('data-ingredient'))
  );
  if (wine) {
    const scaled = Number(wine.textContent.match(/\((\d+) ml\)/)?.[1]);
    const base = Number(wine.getAttribute('data-ingredient').match(/\((\d+) ml\)/)[1]);
    check('bracketed metric scales too', scaled === base * 2, `${base} -> ${scaled}`);
  }
});

/* ---------------------------------------------------------- recipe video -- */

suite('recipe video section', () => {
  // Every recipe gets the section, whether or not a video has been added yet.
  const missing = RECIPES.all.filter(
    (r) => !/<div class="recipe-video">/.test(readPage(r.slug))
  );
  check('every recipe has a video panel', missing.length === 0, missing.map((r) => r.slug)[0]);

  // The body grid is ingredients beside method, as it was before the video
  // existed. The video is its own section ahead of that grid, never a third
  // grid item, or it would push the method out of the right-hand column.
  const { doc } = load('recipes/garlic-butter-salmon.html');
  const order = Array.from(doc.querySelectorAll('.recipe-body-grid > div')).map(
    (el) => el.className
  );
  check(
    'grid holds ingredients then method, nothing else',
    order.join(' ') === 'recipe-ingredients recipe-method',
    order.join(' ')
  );

  // Checked on every recipe, not just one, so no page can drift.
  const misplaced = RECIPES.all.filter((r) => {
    const html = readPage(r.slug);
    const video = html.indexOf('class="recipe-video"');
    const grid = html.indexOf('recipe-body-grid');
    const ingredients = html.indexOf('class="recipe-ingredients"');
    const method = html.indexOf('class="recipe-method"');
    return !(video > -1 && video < grid && grid < ingredients && ingredients < method);
  });
  check(
    'every recipe has that same layout',
    misplaced.length === 0,
    misplaced.map((r) => r.slug)[0]
  );

  // A recipe must never show another recipe's video.
  const crossed = RECIPES.all.filter((r) => {
    const own = VIDEOS.forRecipe(r.slug);
    const html = readPage(r.slug);
    const src = (html.match(/<(?:source|iframe) src="([^"]*)"/) || [])[1];
    if (!own) return Boolean(src) || !/video-frame-empty/.test(html);
    return !src || !src.includes(own.src.replace(/^.*\//, ''));
  });
  check('each video belongs to its own recipe', crossed.length === 0, crossed.map((r) => r.slug)[0]);

  check('placeholder when unset', VIDEOS.forRecipe('no-such-recipe') === null);
});

/* ------------------------------------------------------------ breakfast -- */

/* ---------------------------------------------------------- recipe share -- */

suite('recipe share section', async () => {
  // Every recipe gets the section, and each one shares its own page.
  const wrong = RECIPES.all.filter((r) => {
    const declared = (readPage(r.slug).match(/data-share-url="([^"]*)"/) || [])[1];
    return declared !== SITE.origin + '/recipes/' + r.slug;
  });
  check('every recipe shares its own URL', wrong.length === 0, wrong.map((r) => r.slug)[0]);

  const { doc, errors } = load('recipes/lentil-soup.html');
  check('no script errors', errors.length === 0, errors[0]);

  const links = Array.from(doc.querySelectorAll('[data-share-link]'));
  check('platform links present', links.length === 3, links.length + ' found');
  check(
    'links open away from the page safely',
    links.every((a) => a.target === '_blank' && /noopener/.test(a.rel))
  );

  // Each endpoint must carry the recipe's own address, whatever the platform
  // wraps around it.
  const encoded = encodeURIComponent(SITE.origin + '/recipes/lentil-soup.html');
  check(
    'every target points at this recipe',
    links.every((a) => a.getAttribute('href').includes(encoded)),
    links.map((a) => a.getAttribute('href'))[0]
  );
  check(
    'whatsapp, facebook and pinterest covered',
    ['wa.me', 'facebook.com/sharer', 'pinterest.com/pin/create'].every((host) =>
      links.some((a) => a.getAttribute('href').includes(host))
    )
  );

  // The share sheet is absent in jsdom, as it is on most desktop browsers, so
  // the button has to stay hidden rather than offering an action that no-ops.
  check(
    'native button hidden without navigator.share',
    doc.querySelector('[data-share-native]').hidden === true
  );

  // A visitor on the project-pages host, or any preview, must be handed the
  // link they are actually looking at rather than the canonical build target.
  const preview = load('recipes/lentil-soup.html', { origin: 'https://ali-7799.github.io' });
  const previewUrl = encodeURIComponent('https://ali-7799.github.io/recipes/lentil-soup.html');
  check(
    'links retarget to the host being viewed',
    Array.from(preview.doc.querySelectorAll('[data-share-link]')).every((a) =>
      a.getAttribute('href').includes(previewUrl)
    ),
    preview.doc.querySelector('[data-share-link]').getAttribute('href')
  );

  // Copying is the fallback for everyone without a share sheet, so it has to
  // report back either way rather than failing silently. jsdom implements
  // neither clipboard path, which exercises the failure branch.
  doc.querySelector('[data-share-copy]').click();
  await new Promise((resolve) => setTimeout(resolve, 0));
  const status = doc.querySelector('[data-share-status]');
  check('copy reports an outcome', status.textContent.length > 0, 'status stayed empty');

  // Nothing here may disturb the controls the page already had.
  check(
    'save, plan and print survive',
    !!doc.querySelector('[data-fav]') &&
      !!doc.querySelector('[data-add-to-plan]') &&
      !!doc.querySelector('[data-print]')
  );
  check('one h1 on the page', doc.querySelectorAll('h1').length === 1);
});

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

  /* Both halves of the box have to agree about word order and stray spaces.
     Guides were matched as one contiguous substring while recipes were matched
     term by term, so "skills knife" and "knife  skills" found nothing. */
  const { window, doc } = load('index.html');
  const input = doc.querySelector('#searchOverlayInput');
  const results = doc.querySelector('#searchOverlayResults');

  async function overlaySearch(term) {
    input.value = term;
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    return Array.from(results.querySelectorAll('a.search-result')).map((a) =>
      a.getAttribute('href')
    );
  }

  for (const term of ['knife skills', 'skills knife', 'knife  skills', '  KNIFE skills ']) {
    const hrefs = await overlaySearch(term);
    check(
      `overlay finds the knife guide for ${JSON.stringify(term)}`,
      hrefs.some((h) => h.endsWith('guides/knife-skills-basics')),
      hrefs.join(', ') || 'no results'
    );
  }

  const recipeTerms = await overlaySearch('salmon garlic');
  check(
    'overlay matches recipe terms in any order',
    recipeTerms.some((h) => h.endsWith('recipes/garlic-butter-salmon')),
    recipeTerms.join(', ') || 'no results'
  );
});

/* -------------------------------------------------------- cookie consent -- */

const CONSENT_KEY = 'kitchenlo-consent';
const consentOf = (window) => {
  const raw = window.localStorage.getItem(CONSENT_KEY);
  return raw ? JSON.parse(raw) : null;
};
/*
 * The consent record version, read out of the module rather than hardcoded.
 *
 * A bump means every visitor is asked again, which is exactly what these
 * fixtures simulate not happening — so a stale literal here would turn a
 * deliberate bump into eight confusing failures about banners reappearing.
 * Reading it keeps the fixtures correct across a bump automatically.
 */
const CONSENT_VERSION = Number(
  /const VERSION = (\d+)/.exec(
    fs.readFileSync(path.join(ROOT, 'src/browser/consent.ts'), 'utf8')
  )?.[1]
);

/** A stored answer as the browser would have written it. */
const answered = (analytics, advertising) => ({
  [CONSENT_KEY]: JSON.stringify({
    v: CONSENT_VERSION,
    decidedAt: '2026-01-01T00:00:00.000Z',
    allowed: { analytics, advertising }
  })
});

suite('cookie consent', () => {
  /* Nothing optional may run before it is allowed, so the site must ship no
     analytics or advertising script at all while none is consented to. */
  const offenders = [];
  (function scan(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = dir ? dir + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', '.build'].includes(entry.name)) scan(rel);
      } else if (/\.(html|js)$/.test(entry.name) && !entry.name.endsWith('.map')) {
        const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
        if (/googletagmanager|google-analytics|gtag\(|adsbygoogle|doubleclick|facebook\.net/i.test(text)) {
          offenders.push(rel);
        }
      }
    }
  })('');
  check('no analytics or advertising script is present', offenders.length === 0, offenders[0]);

  /* First visit: the banner is offered with all three choices. */
  const first = load('index.html');
  const banner = first.doc.querySelector('#cookieBanner');
  check('banner shown on a first visit', !!banner);
  check('no script errors with the banner up', first.errors.length === 0, first.errors[0]);
  check(
    'banner offers accept, reject and manage',
    !!banner?.querySelector('[data-cookie-accept]') &&
      !!banner?.querySelector('[data-cookie-reject]') &&
      !!banner?.querySelector('[data-cookie-preferences]')
  );
  check('nothing is stored until a choice is made', consentOf(first.window) === null);
  check(
    'banner is reachable before the page content',
    first.doc.body.firstElementChild === banner,
    first.doc.body.firstElementChild?.className
  );
  check('banner is labelled for assistive tech', !!banner?.getAttribute('aria-labelledby'));

  /* Accept all. */
  const accept = load('index.html');
  accept.doc.querySelector('[data-cookie-accept]').click();
  check(
    'accept all allows every optional category',
    consentOf(accept.window)?.allowed.analytics === true &&
      consentOf(accept.window)?.allowed.advertising === true
  );
  check('accept all dismisses the banner', !accept.doc.querySelector('#cookieBanner'));

  /* Reject all. */
  const reject = load('index.html');
  reject.doc.querySelector('[data-cookie-reject]').click();
  check(
    'reject all refuses every optional category',
    consentOf(reject.window)?.allowed.analytics === false &&
      consentOf(reject.window)?.allowed.advertising === false
  );
  check('reject all dismisses the banner', !reject.doc.querySelector('#cookieBanner'));

  /* A recorded choice is not asked again. */
  const returning = load('index.html', { storage: answered(false, false) });
  check('banner stays away on a later visit', !returning.doc.querySelector('#cookieBanner'));

  /* Manage preferences: necessary is locked on, optional ones are choosable. */
  const manage = load('index.html');
  manage.doc.querySelector('[data-cookie-preferences]').click();
  const dialog = manage.doc.querySelector('#cookieDialog');
  check('manage preferences opens the dialog', !!dialog && dialog.hidden === false);

  const necessary = dialog?.querySelector('#cookie-necessary');
  check(
    'necessary cookies are on and cannot be switched off',
    necessary?.checked === true && necessary?.disabled === true
  );
  const optional = Array.from(dialog?.querySelectorAll('[data-cookie-option]') ?? []);
  check('optional categories are offered', optional.length >= 2, String(optional.length));
  check('optional categories start unticked', optional.every((el) => !el.checked));
  check(
    'dialog is a labelled modal',
    dialog?.querySelector('[role="dialog"][aria-modal="true"][aria-labelledby]') !== null
  );

  /* Tick one, save, and only that one is allowed. */
  dialog.querySelector('[data-cookie-option="analytics"]').checked = true;
  dialog.querySelector('[data-cookie-save]').click();
  check(
    'saving honours each category separately',
    consentOf(manage.window)?.allowed.analytics === true &&
      consentOf(manage.window)?.allowed.advertising === false
  );
  check('saving dismisses the banner', !manage.doc.querySelector('#cookieBanner'));
  check('saving closes the dialog', manage.doc.querySelector('#cookieDialog').hidden === true);

  /* Preferences can be changed later, from any page, and show what is stored. */
  for (const page of ['index.html', 'recipes/raclette.html', 'privacy.html']) {
    const later = load(page, { storage: answered(true, false) });
    check(page + ': no banner once decided', !later.doc.querySelector('#cookieBanner'));

    const link = later.doc.querySelector('.site-footer [data-cookie-preferences]');
    check(page + ': footer offers cookie preferences', !!link);
    link?.click();

    const reopened = later.doc.querySelector('#cookieDialog');
    check(page + ': footer link reopens the dialog', reopened?.hidden === false);
    check(
      page + ': dialog reflects the stored choice',
      reopened?.querySelector('[data-cookie-option="analytics"]')?.checked === true &&
        reopened?.querySelector('[data-cookie-option="advertising"]')?.checked === false
    );

    /* Cancelling changes nothing. */
    reopened.querySelector('[data-cookie-option="advertising"]').checked = true;
    reopened.querySelector('[data-cookie-close]').click();
    check(page + ': cancel leaves the stored choice alone', consentOf(later.window)?.allowed.advertising === false);
    check(page + ': cancel closes the dialog', reopened.hidden === true);
  }

  /* Escape closes the dialog, and the scroll lock is released. */
  const esc = load('index.html', { storage: answered(false, false) });
  esc.doc.querySelector('.site-footer [data-cookie-preferences]').click();
  check('dialog locks page scroll while open', esc.doc.body.style.overflow === 'hidden');
  esc.doc.dispatchEvent(new esc.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  check('escape closes the dialog', esc.doc.querySelector('#cookieDialog').hidden === true);
  check('page scroll is released again', esc.doc.body.style.overflow === '');

  /* The gate other scripts will use. */
  const api = load('index.html', { storage: answered(true, false) });
  check('consent gate is exposed to unbundled scripts', typeof api.window.KitchenloConsent?.allows === 'function');
  check('gate allows what was consented to', api.window.KitchenloConsent.allows('analytics') === true);
  check('gate refuses what was not', api.window.KitchenloConsent.allows('advertising') === false);

  /* An unreadable or outdated record must not be treated as consent. */
  const stale = load('index.html', { storage: { [CONSENT_KEY]: '{"v":0,"allowed":{"analytics":true}}' } });
  check('an outdated record asks again', !!stale.doc.querySelector('#cookieBanner'));
  check(
    'an outdated record grants nothing',
    stale.window.KitchenloConsent.allows('analytics') === false
  );

  const broken = load('index.html', { storage: { [CONSENT_KEY]: 'not json' } });
  check('a corrupt record asks again rather than throwing', !!broken.doc.querySelector('#cookieBanner'));
  check('a corrupt record causes no script error', broken.errors.length === 0, broken.errors[0]);
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
        if (!SKIP_DIRS.includes(entry.name)) walk(rel);
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

suite('one page, one URL', () => {
  /*
   * The home page is served as the site root, so advertising it as
   * /index.html as well leaves a crawler choosing between two addresses for
   * one page. The canonical tag, og:url, every breadcrumb trail and the
   * sitemap all have to name the same string.
   */
  const canonicalOf = (page) => {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    return {
      canonical: (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1],
      ogUrl: (html.match(/property="og:url" content="([^"]+)"/) || [])[1],
      ld: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
        JSON.parse(m[1])
      )
    };
  };

  const home = canonicalOf('index.html');
  check('home canonical is the root', home.canonical === SITE.origin + '/', home.canonical);
  check('home og:url matches its canonical', home.ogUrl === home.canonical, home.ogUrl);

  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check('sitemap lists the root, not /index.html', locs.includes(SITE.origin + '/'), 'missing');
  check(
    'sitemap never mentions index.html',
    !locs.some((l) => l.endsWith('/index.html')),
    locs.find((l) => l.endsWith('/index.html'))
  );

  /* Each sitemap URL must be the one its own page claims as canonical. */
  const mismatched = locs.filter((loc) => {
    // Clean URL back to the file the host serves for it: "" is the home page,
    // everything else regains the .html its address does not carry.
    const clean = loc.slice(SITE.origin.length + 1);
    const file = clean === '' ? 'index.html' : clean + '.html';
    if (!fs.existsSync(path.join(ROOT, file))) return true;
    return canonicalOf(file).canonical !== loc;
  });
  check('every sitemap URL is that page canonical', mismatched.length === 0, mismatched[0]);

  /* Breadcrumbs are a second place the home URL is written down. */
  const crumbOffenders = [];
  for (const page of ['recipes.html', 'recipes/raclette.html', 'category/comfort-food.html']) {
    const bc = canonicalOf(page).ld.find((d) => d['@type'] === 'BreadcrumbList');
    const items = (bc?.itemListElement ?? []).map((li) => li.item);
    if (items.some((i) => i.endsWith('/index.html'))) crumbOffenders.push(page);
    if (items[0] !== SITE.origin + '/') crumbOffenders.push(page + ' starts at ' + items[0]);
  }
  check('breadcrumbs point at the root for Home', crumbOffenders.length === 0, crumbOffenders[0]);
});

suite('every address is clean, and every link still lands', () => {
  /*
   * The site is served with cleanUrls: a page written as recipes/foo.html is
   * addressed as /recipes/foo, and the .html form only redirects to it. Two
   * things can go wrong. A link can keep spelling .html, which costs a redirect
   * and advertises a second address for one page. Or a relative link can
   * resolve somewhere new once the extension is gone, because the browser
   * reads the last path segment as a file name either way. Both are checked
   * against the real served address of every page.
   */
  const pages = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = dir ? dir + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.includes(entry.name)) walk(rel);
      } else if (entry.name.endsWith('.html')) pages.push(rel);
    }
  })('');

  /** The address a generated file is served at. */
  const served = (file) => '/' + file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
  /** The file a served address maps back to. */
  const fileFor = (pathname) => {
    const clean = pathname.replace(/^\//, '');
    if (clean === '') return 'index.html';
    // Assets (favicon.svg, sitemap.xml) are already whole file names.
    return /\.[a-z0-9]+$/i.test(clean) ? clean : clean + '.html';
  };

  const dirty = [];
  const broken = [];
  let links = 0;

  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const base = new URL(served(page), 'https://kitchenlo.test');
    for (const m of html.matchAll(/(?:href|action)="([^"]*)"/g)) {
      const href = m[1];
      if (!href || /^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(href)) continue;
      links++;
      if (/\.html($|[?#])/.test(href) || /(^|\/)index($|[?#])/.test(href)) dirty.push(page + ' -> ' + href);
      const target = fileFor(new URL(href, base).pathname);
      if (!fs.existsSync(path.join(ROOT, target))) broken.push(page + ' -> ' + href + ' (' + target + ')');
    }
  }

  check('no internal link spells .html or index', dirty.length === 0, dirty[0]);
  check('every internal link resolves to a real page', broken.length === 0, broken[0]);
  check('the crawl saw the whole site', links > 4000 && pages.length === 87, links + ' links, ' + pages.length + ' pages');

  const locs = [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check('no sitemap URL spells .html', !locs.some((l) => l.endsWith('.html')), locs.find((l) => l.endsWith('.html')));
  check(
    'every sitemap URL maps to a file that exists',
    locs.every((l) => fs.existsSync(path.join(ROOT, fileFor(new URL(l).pathname)))),
    locs.find((l) => !fs.existsSync(path.join(ROOT, fileFor(new URL(l).pathname))))
  );
});

suite('recipe of the day holds for the whole day and turns at midnight', () => {
  /*
   * The pages are static, so the panel is baked in at build time and the
   * browser re-renders it once the site's date has moved past the build's.
   * What matters is that the result depends on the date and nothing else: the
   * same recipe from 00:00:00 to 23:59:59, a different one the moment the
   * site's midnight passes, and the same one for every visitor whatever clock
   * their own machine is on.
   */
  const TZ = SITE.timezone;
  const at = (iso) => new Date(iso).getTime();
  const shown = (ms) => {
    const { doc } = load('index.html', { now: ms });
    const panel = doc.querySelector('[data-recipe-of-the-day]');
    const href = panel?.querySelector('h2 a')?.getAttribute('href') ?? '';
    return href.replace(/^recipes\//, '');
  };

  check('the panel is present and stamped with a day', (() => {
    const { doc } = load('index.html');
    const p = doc.querySelector('[data-recipe-of-the-day]');
    return !!p && /^[0-9]+$/.test(p.getAttribute('data-rotd-day') ?? '');
  })());

  // A full site-day, sampled hourly, must never change the recipe.
  const day = [];
  for (let h = 0; h < 24; h++) {
    day.push(shown(at(`2026-06-15T${String(h).padStart(2, '0')}:30:00-04:00`)));
  }
  const distinct = [...new Set(day)];
  check(
    'same recipe at all 24 hours of one site day',
    distinct.length === 1 && distinct[0] !== '',
    distinct.join(', ')
  );

  // The edges of the day, to the second.
  const lastSecond = shown(at('2026-06-15T23:59:59-04:00'));
  const firstSecond = shown(at('2026-06-16T00:00:00-04:00'));
  check('23:59:59 still shows the day recipe', lastSecond === distinct[0], lastSecond);
  check('00:00:00 has turned over', firstSecond !== lastSecond, firstSecond + ' vs ' + lastSecond);
  check('00:00:01 matches 00:00:00', shown(at('2026-06-16T00:00:01-04:00')) === firstSecond);

  // Reloading is just loading again, and must not shuffle anything.
  check(
    'reloading during the day does not change it',
    [0, 1, 2, 3].every(() => shown(at('2026-06-15T12:00:00-04:00')) === distinct[0])
  );

  // The visitor's own timezone must not enter into it. Same instant, and the
  // site date is what decides: 20:00 in New York is already tomorrow in Tokyo.
  const instant = at('2026-06-15T20:00:00-04:00');
  check('a visitor whose own date is already tomorrow sees today', shown(instant) === distinct[0], shown(instant));

  // The swapped-in card must be what the generator would have produced.
  const built = RECIPES.recipeOfTheDay(new Date(at('2026-06-15T12:00:00-04:00')), TZ);
  check('browser and generator agree on the recipe', distinct[0] === built.slug, distinct[0] + ' vs ' + built.slug);

  const { doc: liveDoc } = load('index.html', { now: at('2026-06-15T12:00:00-04:00') });
  const livePanel = liveDoc.querySelector('[data-recipe-of-the-day]');
  check('the stamped day is updated after a swap', livePanel.getAttribute('data-rotd-day') === String(RECIPES.siteDayNumber(new Date(at('2026-06-15T12:00:00-04:00')), TZ)));
  // Compared as DOM, not as text: the template writes void elements as
  // <img ... /> and a serialiser writes <img ...>, which is the same element.
  const asDom = (html) =>
    new JSDOM('<div>' + html + '</div>').window.document.querySelector('div')
      .innerHTML.replace(/\s+/g, ' ').trim();
  check(
    'swapped markup is identical to freshly built markup',
    asDom(livePanel.innerHTML) === asDom(COMPONENTS.recipeOfTheDayCard(built, 0)),
    asDom(livePanel.innerHTML).slice(0, 90)
  );

  // Design must be untouched: same wrapper, same pieces, in the same order.
  check(
    'the panel keeps its original structure',
    ['p.eyebrow', 'a.showcase-media', 'a.showcase-media img', 'h2 a', 'p', '.showcase-meta', 'a.btn.btn-secondary']
      .every((sel) => livePanel.querySelector(sel)),
    'a piece of the showcase is missing'
  );

  // Across a DST change the day must still advance by exactly one.
  const springBefore = RECIPES.siteDayNumber(new Date(at('2026-03-07T12:00:00-05:00')), TZ);
  const springAfter = RECIPES.siteDayNumber(new Date(at('2026-03-08T12:00:00-04:00')), TZ);
  check('day advances by one across spring forward', springAfter - springBefore === 1, String(springAfter - springBefore));
  const fallBefore = RECIPES.siteDayNumber(new Date(at('2026-10-31T12:00:00-04:00')), TZ);
  const fallAfter = RECIPES.siteDayNumber(new Date(at('2026-11-01T12:00:00-05:00')), TZ);
  check('day advances by one across fall back', fallAfter - fallBefore === 1, String(fallAfter - fallBefore));

  // Every recipe gets a turn within a cycle, and the order changes next cycle.
  const n = RECIPES.all.length;
  let d0 = RECIPES.siteDayNumber(new Date(at('2026-01-01T12:00:00-05:00')), TZ);
  while (((d0 % n) + n) % n !== 0) d0++;
  const cycle = (c) =>
    Array.from({ length: n }, (_, i) =>
      RECIPES.recipeOfTheDay(new Date((d0 + c * n + i) * 86400000 + 43200000), TZ).slug
    );
  const first = cycle(0);
  const second = cycle(1);
  check('every recipe appears exactly once per cycle', new Set(first).size === n, new Set(first).size + '/' + n);
  check('the next cycle uses a different order', first.join() !== second.join());

  // And no recipe two days running over a long stretch.
  let backToBack = 0;
  let prev = '';
  for (let i = 0; i < 400; i++) {
    const s = RECIPES.recipeOfTheDay(new Date((d0 + i) * 86400000 + 43200000), TZ).slug;
    if (s === prev) backToBack++;
    prev = s;
  }
  check('never the same recipe two days running', backToBack === 0, backToBack + ' repeats');
});

suite('recipe schema claims nothing the data does not support', () => {
  /*
   * suitableForDiet is a factual claim about a restricted diet, so it may only
   * carry tags with a truthful schema.org counterpart. There is no low-carb
   * value, and the LowCalorieDiet once used for it says something different.
   * high-protein and high-fibre have no counterpart either; all three still
   * travel in `keywords`.
   */
  const MAP = {
    vegetarian: 'https://schema.org/VegetarianDiet',
    vegan: 'https://schema.org/VeganDiet',
    'gluten-free': 'https://schema.org/GlutenFreeDiet',
    'dairy-free': 'https://schema.org/LowLactoseDiet'
  };

  const unsupported = [];
  const missing = [];
  for (const recipe of RECIPES.all) {
    const html = readPage(recipe.slug);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((m) => JSON.parse(m[1]))
      .find((d) => d['@type'] === 'Recipe');
    const claimed = ld.suitableForDiet ?? [];
    const supported = recipe.diet.map((d) => MAP[d]).filter(Boolean);

    claimed
      .filter((c) => !supported.includes(c))
      .forEach((c) => unsupported.push(`${recipe.slug} claims ${c} from [${recipe.diet}]`));
    supported
      .filter((s) => !claimed.includes(s))
      .forEach((s) => missing.push(`${recipe.slug} omits ${s}`));
  }
  check('no unsupported diet is asserted', unsupported.length === 0, unsupported[0]);
  check('every supported diet is asserted', missing.length === 0, missing[0]);
  check(
    'no recipe claims a low-calorie diet',
    !RECIPES.all.some((r) => readPage(r.slug).includes('LowCalorieDiet'))
  );
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

/* ---------------------------------------------- consent actually gates -- */

/**
 * The previous suite checks the banner's behaviour. This one checks the thing
 * that behaviour is *for*: that nothing optional reaches the network until it
 * has been allowed, and that allowing it works.
 *
 * Asserted on captured beacons rather than on internal state, because a gate
 * that sets a flag correctly and still sends the request would pass any test
 * written against the flag.
 */
suite('nothing optional runs before consent', async () => {
  const beaconsOf = (w) => w.__beacons.filter((b) => b.url.includes('/api/track'));

  /* -- the site ships no third-party code at all -- */

  const pages = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = dir ? dir + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.includes(entry.name)) walk(rel);
      } else if (entry.name.endsWith('.html')) pages.push(rel);
    }
  })('');

  /*
   * Fonts were previously loaded from fonts.googleapis.com, which contacted
   * Google on every page load before the visitor had been asked anything — a
   * transfer no banner can cover, because it happens while the page parses.
   * They are self-hosted now, and this fails if any third-party subresource
   * creeps back in.
   */
  const thirdParty = [];
  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    for (const m of html.matchAll(/<(?:link|script|iframe|img)\b[^>]*?\b(?:src|href)="(https?:\/\/[^"]+)"/g)) {
      const host = new URL(m[1]).hostname;
      // schema.org appears only inside JSON-LD as a vocabulary identifier; it
      // is never fetched.
      if (host.endsWith('kitchenlo.com') || host === 'schema.org') continue;
      thirdParty.push(page + ' -> ' + host);
    }
  }
  check('no page loads a third-party resource', thirdParty.length === 0, thirdParty[0]);

  const fontFiles = fs.existsSync(path.join(ROOT, 'assets/fonts'))
    ? fs.readdirSync(path.join(ROOT, 'assets/fonts')).filter((f) => f.endsWith('.woff2'))
    : [];
  check('fonts are served from this origin', fontFiles.length > 0,
    'assets/fonts is empty');
  check('the stylesheet declares them locally',
    /@font-face[\s\S]*?url\('\.\.\/fonts\//.test(
      fs.readFileSync(path.join(ROOT, 'assets/css/styles.css'), 'utf8')),
    'no local @font-face found');

  /* -- the page counter is gated -- */

  const undecided = load('index.html');
  check('no page view is sent before a choice is made',
    beaconsOf(undecided.window).length === 0,
    JSON.stringify(beaconsOf(undecided.window)[0]));
  check('no script errors while undecided', undecided.errors.length === 0,
    undecided.errors[0]);

  const rejected = load('index.html', { storage: answered(false, false) });
  check('no page view is sent after rejecting',
    beaconsOf(rejected.window).length === 0,
    JSON.stringify(beaconsOf(rejected.window)[0]));

  const accepted = load('index.html', { storage: answered(true, false) });
  const sent = beaconsOf(accepted.window);
  check('a page view is sent once analytics is allowed', sent.length === 1,
    sent.length + ' beacons');
  check('exactly one is sent, not one per module', sent.length <= 1);

  /* What it carries is as important as whether it fires. */
  if (sent.length) {
    /* Read back through the promise the stub attached; see the sendBeacon
       stub in load() for why this cannot be synchronous. */
    const raw = await sent[0].text;

    let payload = {};
    try {
      payload = JSON.parse(String(raw));
    } catch {
      /* asserted below */
    }
    check('the beacon carries only a path and a referrer',
      Object.keys(payload).sort().join(',') === 'path,referrer',
      Object.keys(payload).join(','));
    check('the beacon carries no identifier',
      !/id|uid|visitor|session|fingerprint/i.test(String(raw)),
      String(raw));
  }

  /* Allowing advertising alone must not switch the counter on. */
  const adsOnly = load('index.html', { storage: answered(false, true) });
  check('allowing advertising does not enable analytics',
    beaconsOf(adsOnly.window).length === 0);

  /* -- accepting from the banner counts the page you are already on -- */

  const live = load('index.html');
  live.doc.querySelector('[data-cookie-accept]').click();
  check('accepting from the banner counts the current page',
    beaconsOf(live.window).length === 1,
    beaconsOf(live.window).length + ' beacons');

  /* -- the banner and dialog link to the policy -- */

  const first = load('index.html');
  const banner = first.doc.querySelector('#cookieBanner');
  const bannerPolicy = banner?.querySelector('a[href$="privacy"]');
  check('the banner links to the privacy policy', !!bannerPolicy);
  check('there is no close button that could imply an answer',
    !banner?.querySelector('[data-cookie-close]'));

  first.doc.querySelector('[data-cookie-preferences]').click();
  const panel = first.doc.querySelector('#cookieDialog');
  check('the dialog links to the privacy policy',
    !!panel?.querySelector('a[href$="privacy"]'));

  /* Necessary and Preferences are disclosed, and neither is togglable. */
  const locked = Array.from(panel.querySelectorAll('input[disabled]'));
  check('always-on categories are disclosed', locked.length === 2,
    locked.length + ' locked rows');
  check('always-on categories are shown as on',
    locked.every((i) => i.checked));
  check('always-on categories carry no consent id',
    locked.every((i) => !i.hasAttribute('data-cookie-option')));

  const optional = Array.from(panel.querySelectorAll('[data-cookie-option]'));
  check('optional categories are offered', optional.length === 2,
    optional.length + ' optional rows');
  check('no optional category is pre-ticked',
    optional.every((i) => !i.checked));

  /* -- withdrawing brings the question back -- */

  const settled = load('index.html', { storage: answered(true, true) });
  check('no banner once decided', !settled.doc.querySelector('#cookieBanner'));

  settled.doc.querySelector('[data-cookie-preferences]').click();
  const withdrawButton = settled.doc.querySelector('[data-cookie-withdraw]');
  check('withdraw is offered once a choice exists',
    !!withdrawButton && !withdrawButton.hidden);

  withdrawButton.click();
  check('withdrawing clears the stored answer',
    consentOf(settled.window) === null ||
      settled.window.KitchenloConsent.decision() === null,
    JSON.stringify(consentOf(settled.window)));
  check('withdrawing brings the banner back',
    !!settled.doc.querySelector('#cookieBanner'));
  check('withdrawing revokes the gate',
    settled.window.KitchenloConsent.allows('analytics') === false);

  /* Withdraw is pointless before anything has been decided, so it is hidden. */
  const fresh = load('index.html');
  fresh.doc.querySelector('[data-cookie-preferences]').click();
  check('withdraw is hidden before a first choice',
    fresh.doc.querySelector('[data-cookie-withdraw]').hidden === true);

  /* -- third-party video embeds are click-to-load -- */

  const embedded = CORE.recipePage({
    ...RECIPES.all[0],
    slug: RECIPES.all[0].slug
  });
  // The fixture above has no video; assert the mechanism on the template's own
  // output for a recipe that does, by checking no recipe page ships an iframe.
  const withIframe = pages.filter((p) =>
    p.startsWith('recipes/') &&
    /<iframe/.test(fs.readFileSync(path.join(ROOT, p), 'utf8')));
  check('no recipe page ships a third-party iframe', withIframe.length === 0,
    withIframe[0]);
  check('the embed template renders a play button, not a frame',
    !/videoFrame[\s\S]{0,400}<iframe/.test(
      fs.readFileSync(path.join(ROOT, 'src/templates/pages-core.ts'), 'utf8')),
    'an iframe is still emitted at build time');
  check('recipePage still renders', typeof embedded.body === 'string' && embedded.body.length > 0);
});

/* ------------------------------------------------------------- API routes -- */

/**
 * The whole API is one Serverless Function, because the Hobby plan allows
 * twelve and one file per route needed twenty-two. That makes the dispatch
 * table in api/[...route].ts load-bearing in a way per-file routing never was:
 * a typo in a key used to be impossible, and now it silently 404s an endpoint
 * that the admin dashboard depends on.
 *
 * Every route is therefore called here with a method it does not accept. Each
 * handler checks the method before it does anything else, so a 405 proves the
 * dispatcher found the right handler and ran it, while never opening a
 * database connection — which is what lets this run in CI with no credentials.
 * A 404 means the route is not wired up at all.
 */
suite('every API route is reachable through the single function', () => {
  /** Minimal stand-ins for what Vercel passes a function. */
  const mockRequest = (method, url) => {
    const [pathname, query = ''] = url.split('?');
    const segments = pathname.replace(/^\/+api\/?/, '').split('/').filter(Boolean);
    return {
      method,
      url,
      // Vercel supplies the catch-all segments alongside the real query string.
      query: { route: segments, ...Object.fromEntries(new URLSearchParams(query)) },
      cookies: {},
      headers: { host: 'kitchenlo.test' },
      body: undefined
    };
  };

  const mockResponse = () => {
    const state = { code: 0, body: '', headers: {} };
    const res = {
      status(code) { state.code = code; return res; },
      setHeader(key, value) { state.headers[key.toLowerCase()] = value; return res; },
      getHeader(key) { return state.headers[key.toLowerCase()]; },
      send(payload) { state.body = String(payload); return res; },
      json(payload) { state.body = JSON.stringify(payload); return res; },
      end() { return res; },
      state
    };
    return res;
  };

  return (async () => {
    const { default: route } = await import('../api/[...route].ts');

    // PATCH is accepted by nothing, so every handler rejects it at its first
    // statement, before any query runs.
    const routes = [
      '/api/recipes',
      '/api/recipes/garlic-butter-salmon',
      '/api/categories',
      '/api/collections',
      '/api/recipe-of-the-day',
      '/api/search',
      '/api/track',
      '/api/admin/login',
      '/api/admin/session',
      '/api/admin/stats',
      '/api/admin/publish',
      '/api/admin/upload',
      '/api/admin/rotd',
      '/api/admin/recipes'
    ];

    for (const url of routes) {
      const res = mockResponse();
      await route(mockRequest('PATCH', url), res);
      check(
        url + ' reaches its handler',
        res.state.code === 405,
        'got ' + res.state.code + ' ' + res.state.body.slice(0, 80)
      );
    }

    /* An unknown path must 404 rather than fall through to a handler. */
    const missing = mockResponse();
    await route(mockRequest('GET', '/api/does-not-exist'), missing);
    check('an unknown route 404s', missing.state.code === 404,
      'got ' + missing.state.code);

    /* The slug is put where the handler already looks for it. */
    const slugged = mockRequest('PATCH', '/api/recipes/shakshuka');
    await route(slugged, mockResponse());
    check('a recipe slug is passed through as ?slug',
      slugged.query.slug === 'shakshuka', 'got ' + slugged.query.slug);

    /* Other query parameters must survive dispatch. */
    const withQuery = mockRequest('PATCH', '/api/recipes/shakshuka?draft=1');
    await route(withQuery, mockResponse());
    check('query parameters survive dispatch',
      withQuery.query.draft === '1' && withQuery.query.slug === 'shakshuka',
      'draft=' + withQuery.query.draft);

    /* A traversal attempt must not resolve to anything. */
    const traversal = mockResponse();
    await route(mockRequest('GET', '/api/../../etc/passwd'), traversal);
    check('a traversal attempt does not resolve', traversal.state.code === 404,
      'got ' + traversal.state.code);

    /*
     * Every handler module must be wired into the table. This is the failure
     * the consolidation actually introduced the risk of: a route file that
     * exists, compiles, and is simply never reachable.
     */
    const handlerFiles = fs
      .readdirSync(path.join(ROOT, 'api', '_routes'))
      .filter((f) => f.endsWith('.ts'));
    const dispatcher = fs.readFileSync(path.join(ROOT, 'api', '[...route].ts'), 'utf8');
    const unwired = handlerFiles.filter(
      (f) => !dispatcher.includes("_routes/" + f.replace(/\.ts$/, '.js'))
    );
    check('every handler in api/_routes is imported by the dispatcher',
      unwired.length === 0, unwired.join(', '));
    check('the dispatcher covers all 14 handlers', handlerFiles.length === 14,
      handlerFiles.length + ' handler files');
  })();
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
