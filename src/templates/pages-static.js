/**
 * Templates for the non-content pages: about, contact, auth, account tools
 * and legal.
 */
const { esc, site } = require('./layout.js');
const C = require('./components.js');
const Recipes = require('../data/recipes.js');

/* -------------------------------------------------------------- about ---- */

function about() {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">About Kitchenlo</p>
          <h1>We make home cooking feel inspired, practical, and joyful.</h1>
          <p class="lede">Kitchenlo is a recipe library for people who want to cook well on an ordinary Tuesday, without a professional kitchen or three hours to spare.</p>
        </div>
      </section>

      <section class="section">
        <div class="container about-grid">
          <div class="prose">
            <h2>Built for real kitchens</h2>
            <p>Most recipes online are written to be read, not cooked. They skip quantities, gloss over the step that actually decides the outcome, and assume you already know what "cook until done" means. We write the opposite way.</p>
            <p>Every recipe here lists exact measurements in metric and imperial, gives you a visual cue for each stage, and calls out the one technical detail that determines whether it works. When a step matters, we explain why, because knowing the reason is what lets you improvise later.</p>
            <h2>How we test</h2>
            <p>Nothing goes on the site until it has been cooked at least three times in a domestic kitchen, on a normal hob, with supermarket ingredients. We time recipes from a cold start, including the chopping, which is why our timings tend to run longer and more honestly than most.</p>
            <p>Nutrition figures are calculated per serving from ingredient averages. They are estimates rather than laboratory values, and we say so on every page rather than implying a precision we do not have.</p>
            <h2>What we will not do</h2>
            <p>We will not put a thousand words of memoir above the ingredient list. We will not invent a family tradition to lengthen a page. Every recipe opens with a short note on what makes it work and then gets out of the way.</p>
          </div>
          <div class="about-side">
            <div class="card highlight-card">
              <h3>What you will find</h3>
              <ul class="check-list">
                <li>30 tested recipes across three collections</li>
                <li>Measured ingredients in metric and imperial</li>
                <li>Full nutrition breakdown per serving</li>
                <li>Storage and make-ahead notes on everything</li>
                <li>Scaling from 1 to 12 servings, calculated live</li>
                <li>Six long-form technique guides</li>
              </ul>
            </div>
            <div class="card highlight-card">
              <h3>Free tools</h3>
              <ul class="check-list">
                <li>Save recipes to your account</li>
                <li>Build a seven-day meal plan</li>
                <li>Generate a combined shopping list</li>
              </ul>
              <a class="btn btn-primary btn-block" href="signup.html">Create a free account</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('By the numbers', 'What is on the site today', null)}
          <div class="stats-grid">
            <div><strong>30</strong><span>Tested recipes</span></div>
            <div><strong>3</strong><span>Collections</span></div>
            <div><strong>6</strong><span>Technique guides</span></div>
            <div><strong>190+</strong><span>Method steps written</span></div>
          </div>
        </div>
      </section>

      ${C.newsletterCta()}`;

  return {
    file: 'about.html',
    title: `About Us | ${site.name}`,
    description:
      'How Kitchenlo tests recipes, calculates nutrition and writes instructions that work in a real home kitchen. No thousand-word preambles, just tested cooking.',
    canonical: 'about.html',
    active: 'about.html',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'About', href: 'about.html' }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Kitchenlo',
        url: site.origin + '/about.html',
        description: 'How Kitchenlo tests and writes its recipes.'
      }
    ]
  };
}

/* ------------------------------------------------------------ contact ---- */

function contact() {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Contact us</p>
          <h1>Share a recipe idea or ask for help with one.</h1>
          <p class="lede">Tell us what you are cooking, what went wrong, or what you would like to see next. We read everything.</p>
        </div>
      </section>

      <section class="section">
        <div class="container contact-grid">
          <form class="card contact-form" id="contactForm" novalidate>
            <div class="field">
              <label for="contactName">Name</label>
              <input type="text" id="contactName" name="name" autocomplete="name" placeholder="Your name" required />
              <p class="field-error" data-error-for="contactName"></p>
            </div>

            <div class="field">
              <label for="contactEmail">Email</label>
              <input type="email" id="contactEmail" name="email" autocomplete="email" placeholder="you@example.com" required />
              <p class="field-error" data-error-for="contactEmail"></p>
            </div>

            <div class="field">
              <label for="contactTopic">Topic</label>
              <select id="contactTopic" name="topic">
                <option value="recipe-request">Recipe request</option>
                <option value="cooking-help">Help with a recipe</option>
                <option value="ingredient-swap">Ingredient swap</option>
                <option value="feedback">General feedback</option>
                <option value="partnership">Partnership or press</option>
              </select>
            </div>

            <div class="field">
              <label for="contactMessage">Message</label>
              <textarea id="contactMessage" name="message" rows="6" placeholder="Tell us what you would like to cook or learn" required minlength="10"></textarea>
              <p class="field-error" data-error-for="contactMessage"></p>
            </div>

            <button class="btn btn-primary btn-block" type="submit">Send message</button>
            <p class="form-status" role="status" aria-live="polite"></p>
            <p class="disclaimer">This form is not yet connected to a mail service, so messages are stored in your browser only. Email us directly at ${esc(
              site.email
            )} in the meantime.</p>
          </form>

          <div class="contact-side">
            <div class="card info-card">
              <h3>Reach us directly</h3>
              <dl class="info-list">
                <dt>Email</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd>
                <dt>Response time</dt><dd>Usually within one business day</dd>
                <dt>New recipes</dt><dd>Published every week</dd>
              </dl>
            </div>
            <div class="card info-card">
              <h3>Common questions</h3>
              <p>Many questions are already answered on the recipe itself, at the bottom of every page.</p>
              <ul class="check-list">
                <li><a href="guides/how-to-season-food.html">Why does my food taste flat?</a></li>
                <li><a href="guides/how-to-meal-prep.html">How do I meal prep properly?</a></li>
                <li><a href="guides/pantry-essentials.html">What should I keep in the cupboard?</a></li>
              </ul>
            </div>
            <div class="card info-card">
              <h3>Follow along</h3>
              <div class="social-row">
                ${site.social
                  .map(
                    (s) =>
                      `<a href="${esc(s.href)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${esc(
                        s.label
                      )}">${esc(s.label[0])}</a>`
                  )
                  .join('\n                ')}
              </div>
            </div>
          </div>
        </div>
      </section>`;

  return {
    file: 'contact.html',
    title: `Contact Us | ${site.name}`,
    description:
      'Get in touch with Kitchenlo. Request a recipe, ask for help with a dish that did not work, or send feedback. We reply within one business day.',
    canonical: 'contact.html',
    active: 'contact.html',
    body,
    scripts: ['assets/js/contact.js'],
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Contact', href: 'contact.html' }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Kitchenlo',
        url: site.origin + '/contact.html'
      }
    ]
  };
}

/* --------------------------------------------------------------- auth ---- */

function login() {
  const body = `      <section class="auth-section">
        <div class="container auth-grid">
          <div class="auth-card card">
            <h1>Welcome back</h1>
            <p class="auth-sub">Sign in to reach your saved recipes, meal plan and shopping list.</p>

            <form id="loginForm" novalidate>
              <div class="field">
                <label for="loginEmail">Email</label>
                <input type="email" id="loginEmail" name="email" autocomplete="email" placeholder="you@example.com" required />
                <p class="field-error" data-error-for="loginEmail"></p>
              </div>

              <div class="field">
                <label for="loginPassword">Password</label>
                <div class="password-wrap">
                  <input type="password" id="loginPassword" name="password" autocomplete="current-password" placeholder="Your password" required />
                  <button type="button" class="password-toggle" data-toggle-password="loginPassword" aria-label="Show password">Show</button>
                </div>
                <p class="field-error" data-error-for="loginPassword"></p>
              </div>

              <div class="field-row">
                <label class="checkbox"><input type="checkbox" id="rememberMe" checked /> <span>Keep me signed in</span></label>
                <a href="#" data-forgot>Forgot password?</a>
              </div>

              <button class="btn btn-primary btn-block" type="submit">Sign in</button>
              <p class="form-status" role="status" aria-live="polite"></p>
            </form>

            <p class="auth-alt">New here? <a href="signup.html">Create a free account</a></p>
          </div>

          <aside class="auth-aside">
            <h2>Why create an account?</h2>
            <ul class="check-list">
              <li>Save any recipe with one click and find it again instantly</li>
              <li>Build a seven-day meal plan from your saved recipes</li>
              <li>Generate one combined shopping list from a whole week</li>
              <li>Keep your servings preferences between visits</li>
            </ul>
            <div class="notice">
              <strong>Demo mode</strong>
              <p>Accounts are currently stored in your own browser rather than on a server, so they work immediately but do not sync between devices. Do not reuse an important password here.</p>
            </div>
          </aside>
        </div>
      </section>`;

  return {
    file: 'login.html',
    title: `Sign In | ${site.name}`,
    description: 'Sign in to your Kitchenlo account to reach your saved recipes, meal plan and shopping list.',
    canonical: 'login.html',
    active: 'login.html',
    bodyClass: 'auth-page',
    noindex: true,
    body,
    scripts: ['assets/js/auth-pages.js']
  };
}

function signup() {
  const body = `      <section class="auth-section">
        <div class="container auth-grid">
          <div class="auth-card card">
            <h1>Create your free account</h1>
            <p class="auth-sub">No card, no spam. Save recipes and plan your week in under a minute.</p>

            <form id="signupForm" novalidate>
              <div class="field">
                <label for="signupName">Name</label>
                <input type="text" id="signupName" name="name" autocomplete="name" placeholder="Your name" required />
                <p class="field-error" data-error-for="signupName"></p>
              </div>

              <div class="field">
                <label for="signupEmail">Email</label>
                <input type="email" id="signupEmail" name="email" autocomplete="email" placeholder="you@example.com" required />
                <p class="field-error" data-error-for="signupEmail"></p>
              </div>

              <div class="field">
                <label for="signupPassword">Password</label>
                <div class="password-wrap">
                  <input type="password" id="signupPassword" name="password" autocomplete="new-password" placeholder="At least 8 characters" required minlength="8" />
                  <button type="button" class="password-toggle" data-toggle-password="signupPassword" aria-label="Show password">Show</button>
                </div>
                <div class="strength" data-strength hidden>
                  <div class="strength-bar"><span></span></div>
                  <p class="strength-label"></p>
                </div>
                <p class="field-error" data-error-for="signupPassword"></p>
              </div>

              <div class="field">
                <label for="signupConfirm">Confirm password</label>
                <input type="password" id="signupConfirm" name="confirm" autocomplete="new-password" placeholder="Repeat your password" required />
                <p class="field-error" data-error-for="signupConfirm"></p>
              </div>

              <label class="checkbox"><input type="checkbox" id="signupTerms" required /> <span>I agree to the <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a></span></label>
              <p class="field-error" data-error-for="signupTerms"></p>

              <button class="btn btn-primary btn-block" type="submit">Create account</button>
              <p class="form-status" role="status" aria-live="polite"></p>
            </form>

            <p class="auth-alt">Already have an account? <a href="login.html">Sign in</a></p>
          </div>

          <aside class="auth-aside">
            <h2>What you unlock</h2>
            <ul class="check-list">
              <li>Unlimited saved recipes</li>
              <li>A seven-day drag-free meal planner</li>
              <li>Automatic shopping lists grouped by aisle</li>
              <li>Your preferences remembered across visits</li>
            </ul>
            <div class="notice">
              <strong>How your data is stored</strong>
              <p>Accounts currently live in your browser's local storage, not on a server. Passwords are hashed with SHA-256 and a per-account salt rather than stored in plain text, but this is demo-grade and not a substitute for a real backend. Use a password you do not use elsewhere.</p>
            </div>
          </aside>
        </div>
      </section>`;

  return {
    file: 'signup.html',
    title: `Create a Free Account | ${site.name}`,
    description: 'Create a free Kitchenlo account to save recipes, build meal plans and generate shopping lists.',
    canonical: 'signup.html',
    active: 'signup.html',
    bodyClass: 'auth-page',
    noindex: true,
    body,
    scripts: ['assets/js/auth-pages.js']
  };
}

function account() {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Your account</p>
          <h1 data-greeting>My account</h1>
          <p class="lede">Manage your profile, review what you have saved and control your data.</p>
        </div>
      </section>

      <section class="section" data-requires-auth hidden>
        <div class="container">
          <div class="account-grid">
            <nav class="account-nav" aria-label="Account sections">
              <a href="#profile" class="is-active">Profile</a>
              <a href="favorites.html">Saved recipes</a>
              <a href="meal-planner.html">Meal planner</a>
              <a href="shopping-list.html">Shopping list</a>
              <a href="#preferences">Preferences</a>
              <a href="#data">Your data</a>
            </nav>

            <div class="account-panels">
              <div class="card" id="profile">
                <h2>Profile</h2>
                <form id="profileForm" novalidate>
                  <div class="field">
                    <label for="profileName">Display name</label>
                    <input type="text" id="profileName" name="name" required />
                    <p class="field-error" data-error-for="profileName"></p>
                  </div>
                  <div class="field">
                    <label for="profileEmail">Email</label>
                    <input type="email" id="profileEmail" name="email" readonly />
                    <p class="disclaimer">Email cannot be changed in demo mode.</p>
                  </div>
                  <button class="btn btn-primary" type="submit">Save changes</button>
                  <p class="form-status" role="status" aria-live="polite"></p>
                </form>
              </div>

              <div class="card">
                <h2>Your activity</h2>
                <div class="stats-grid compact">
                  <div><strong data-stat-favorites>0</strong><span>Saved recipes</span></div>
                  <div><strong data-stat-planned>0</strong><span>Meals planned</span></div>
                  <div><strong data-stat-list>0</strong><span>Shopping items</span></div>
                  <div><strong data-stat-member>-</strong><span>Member since</span></div>
                </div>
              </div>

              <div class="card" id="preferences">
                <h2>Preferences</h2>
                <form id="prefsForm">
                  <div class="field">
                    <label for="prefDiet">Default diet filter</label>
                    <select id="prefDiet" name="diet">
                      <option value="">No filter</option>
                      ${site.filters.diet
                        .map((d) => `<option value="${esc(d.id)}">${esc(d.label)}</option>`)
                        .join('\n                      ')}
                    </select>
                  </div>
                  <div class="field">
                    <label for="prefServings">Default servings</label>
                    <input type="number" id="prefServings" name="servings" min="1" max="12" value="4" />
                  </div>
                  <label class="checkbox"><input type="checkbox" id="prefMetric" /> <span>Show metric units first</span></label>
                  <button class="btn btn-primary" type="submit">Save preferences</button>
                  <p class="form-status" role="status" aria-live="polite"></p>
                </form>
              </div>

              <div class="card" id="data">
                <h2>Your data</h2>
                <p>Everything is stored in this browser. You can export it as JSON or remove it entirely.</p>
                <div class="button-row">
                  <button class="btn btn-secondary" type="button" data-export>Export my data</button>
                  <button class="btn btn-ghost" type="button" data-signout>Sign out</button>
                  <button class="btn btn-danger" type="button" data-delete-account>Delete account</button>
                </div>
                <p class="form-status" role="status" aria-live="polite" data-data-status></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" data-requires-anon hidden>
        <div class="container narrow">
          <div class="card empty-state">
            <h2>You are not signed in</h2>
            <p>Sign in or create a free account to manage your profile, saved recipes and meal plan.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="login.html">Sign in</a>
              <a class="btn btn-secondary" href="signup.html">Create account</a>
            </div>
          </div>
        </div>
      </section>`;

  return {
    file: 'account.html',
    title: `My Account | ${site.name}`,
    description: 'Manage your Kitchenlo profile, preferences and saved data.',
    canonical: 'account.html',
    active: 'account.html',
    noindex: true,
    body,
    scripts: ['assets/js/account.js']
  };
}

/* -------------------------------------------------------------- tools ---- */

function favorites() {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Your collection</p>
          <h1>Saved recipes</h1>
          <p class="lede">Every recipe you have saved, in one place. Saved items stay in this browser and sync to your account when you are signed in.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="results-row">
            <p class="results-count" data-fav-count role="status" aria-live="polite">0 saved recipes</p>
            <button class="btn btn-ghost btn-sm" type="button" data-clear-favorites>Clear all</button>
          </div>
          <div class="card-grid" id="favoritesGrid"></div>
          <div class="empty-state" id="favoritesEmpty">
            <h2>Nothing saved yet</h2>
            <p>Tap the heart on any recipe to keep it here.</p>
            <a class="btn btn-primary" href="recipes.html">Browse recipes</a>
          </div>
        </div>
      </section>`;

  return {
    file: 'favorites.html',
    title: `Saved Recipes | ${site.name}`,
    description: 'Your saved Kitchenlo recipes, all in one place.',
    canonical: 'favorites.html',
    active: 'favorites.html',
    noindex: true,
    body,
    scripts: ['assets/js/favorites.js']
  };
}

function mealPlanner() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Plan the week</p>
          <h1>Meal planner</h1>
          <p class="lede">Assign a recipe to each day, then turn the whole week into one shopping list.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="planner-toolbar">
            <button class="btn btn-primary" type="button" data-build-list>Build shopping list from plan</button>
            <button class="btn btn-secondary" type="button" data-random-plan>Surprise me</button>
            <button class="btn btn-ghost" type="button" data-clear-plan>Clear week</button>
            <p class="form-status" role="status" aria-live="polite" data-plan-status></p>
          </div>

          <div class="planner-grid" id="plannerGrid">
            ${days
              .map(
                (d) => `<div class="planner-day" data-day="${esc(d)}">
              <h2>${esc(d)}</h2>
              <div class="planner-slot" data-slot="${esc(d)}"></div>
              <label class="sr-only" for="pick-${esc(d)}">Choose a recipe for ${esc(d)}</label>
              <select class="planner-select" id="pick-${esc(d)}" data-day-select="${esc(d)}">
                <option value="">Add a recipe...</option>
                ${site.categories
                  .map(
                    (cat) => `<optgroup label="${esc(cat.title)}">
                  ${Recipes.byCategory(cat.slug)
                    .map((r) => `<option value="${esc(r.slug)}">${esc(r.title)}</option>`)
                    .join('\n                  ')}
                </optgroup>`
                  )
                  .join('\n                ')}
              </select>
            </div>`
              )
              .join('\n            ')}
          </div>

          <div class="planner-summary card" id="plannerSummary" hidden>
            <h2>Week at a glance</h2>
            <div class="summary-stats">
              <div><strong data-plan-meals>0</strong><span>Meals planned</span></div>
              <div><strong data-plan-calories>0</strong><span>Avg calories/serving</span></div>
              <div><strong data-plan-time>0</strong><span>Total cook time</span></div>
            </div>
          </div>
        </div>
      </section>`;

  return {
    file: 'meal-planner.html',
    title: `Weekly Meal Planner | ${site.name}`,
    description:
      'Plan seven days of meals from the Kitchenlo recipe library and turn the week into a single combined shopping list.',
    canonical: 'meal-planner.html',
    active: 'meal-planner.html',
    body,
    scripts: ['assets/js/planner.js'],
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Meal Planner', href: 'meal-planner.html' }
    ]
  };
}

function shoppingList() {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Shop in one pass</p>
          <h1>Shopping list</h1>
          <p class="lede">Everything you have added from recipes and your meal plan, combined into one list.</p>
        </div>
      </section>

      <section class="section">
        <div class="container narrow">
          <form class="add-item-row" id="addItemForm">
            <label class="sr-only" for="newItem">Add an item</label>
            <input type="text" id="newItem" placeholder="Add something else..." autocomplete="off" />
            <button class="btn btn-primary" type="submit">Add</button>
          </form>

          <div class="list-toolbar">
            <p class="results-count" data-list-count role="status" aria-live="polite">0 items</p>
            <div class="button-row">
              <button class="btn btn-ghost btn-sm" type="button" data-copy-list>Copy list</button>
              <button class="btn btn-ghost btn-sm" type="button" data-clear-checked>Clear checked</button>
              <button class="btn btn-ghost btn-sm" type="button" data-clear-list>Clear all</button>
            </div>
          </div>

          <div id="shoppingList"></div>

          <div class="empty-state" id="listEmpty">
            <h2>Your list is empty</h2>
            <p>Add ingredients from any recipe, or build a list from your meal plan.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="recipes.html">Browse recipes</a>
              <a class="btn btn-secondary" href="meal-planner.html">Open meal planner</a>
            </div>
          </div>
        </div>
      </section>`;

  return {
    file: 'shopping-list.html',
    title: `Shopping List | ${site.name}`,
    description: 'Your combined Kitchenlo shopping list, built from saved recipes and your weekly meal plan.',
    canonical: 'shopping-list.html',
    active: 'shopping-list.html',
    noindex: true,
    body,
    scripts: ['assets/js/shopping-list.js']
  };
}

/* -------------------------------------------------------------- legal ---- */

function legalPage(slug, title, description, sections) {
  const body = `      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">Legal</p>
          <h1>${esc(title)}</h1>
          <p class="lede">Last updated ${esc(
            new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          )}</p>
        </div>
      </section>

      <section class="section">
        <div class="container narrow">
          <div class="prose">
            ${sections
              .map((s) => `<h2>${esc(s.h)}</h2>\n            ${s.p.map((p) => `<p>${esc(p)}</p>`).join('\n            ')}`)
              .join('\n            ')}
          </div>
        </div>
      </section>`;

  return {
    file: `${slug}.html`,
    title: `${title} | ${site.name}`,
    description,
    canonical: `${slug}.html`,
    active: `${slug}.html`,
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: title, href: `${slug}.html` }
    ]
  };
}

function privacy() {
  return legalPage(
    'privacy',
    'Privacy Policy',
    'How Kitchenlo handles your data. We store account details in your own browser and do not sell personal information.',
    [
      {
        h: 'What we collect',
        p: [
          'Kitchenlo currently operates without a server-side database. When you create an account, your name, email address and a hashed password are stored in your own browser using local storage. That data never leaves your device and is not transmitted to us.',
          'Saved recipes, meal plans, shopping lists and preferences are stored the same way, locally in your browser.'
        ]
      },
      {
        h: 'What we do not do',
        p: [
          'We do not sell personal information. We do not operate advertising trackers on this site. We do not have access to the accounts created in your browser, which also means we cannot recover a forgotten password for you.'
        ]
      },
      {
        h: 'Third-party services',
        p: [
          'Recipe photography is served from Unsplash, and web fonts are served from Google Fonts. Both providers receive your IP address as a normal consequence of your browser requesting those files, and each operates under its own privacy policy.',
          'If this site is hosted on GitHub Pages, GitHub may collect standard server logs including IP addresses for security and operational purposes.'
        ]
      },
      {
        h: 'Cookies and local storage',
        p: [
          'We do not set tracking cookies. We use local storage to remember your theme preference, your saved recipes, your meal plan and your signed-in session. You can clear all of it at any time from your account page or by clearing site data in your browser.'
        ]
      },
      {
        h: 'Your rights',
        p: [
          'Because your data lives in your browser, you have direct control over it. The account page provides an export function that produces a JSON copy of everything stored, and a delete function that removes it permanently.',
          'If this changes in future and we introduce server-side accounts, this policy will be updated before that feature ships.'
        ]
      },
      {
        h: 'Children',
        p: [
          'This site is not directed at children under 13 and we do not knowingly collect information from them.'
        ]
      },
      {
        h: 'Contact',
        p: ['Questions about this policy can be sent to ' + site.email + '.']
      }
    ]
  );
}

function terms() {
  return legalPage(
    'terms',
    'Terms of Use',
    'The terms governing use of the Kitchenlo website, its recipes and its free account features.',
    [
      {
        h: 'Acceptance',
        p: [
          'By using Kitchenlo you agree to these terms. If you do not agree with them, please do not use the site.'
        ]
      },
      {
        h: 'Use of recipes',
        p: [
          'Recipes and guides on this site are provided for personal, non-commercial use. You are welcome to cook them, adapt them and share a link to them. You may not republish the full text of a recipe or guide elsewhere without written permission.',
          'Recipe titles and lists of ingredients are not themselves protected by copyright, but the written method, headnotes, guides and photography on this site are.'
        ]
      },
      {
        h: 'Food safety and allergies',
        p: [
          'Cooking involves inherent risks including heat, sharp tools and raw ingredients. You are responsible for handling food safely, cooking proteins to safe internal temperatures and following sound hygiene practice.',
          'Ingredient lists are provided in good faith, but you must check labels yourself if you or anyone you are cooking for has an allergy or intolerance. We cannot account for cross-contamination, regional product differences or reformulated products.'
        ]
      },
      {
        h: 'Nutrition information',
        p: [
          'Nutrition figures are estimates calculated from average ingredient values. They will vary with brands, portion sizes and substitutions, and they are not medical or dietary advice. Consult a qualified professional for guidance specific to your health.'
        ]
      },
      {
        h: 'Accounts',
        p: [
          'Accounts are currently stored locally in your browser rather than on a server. This means we cannot recover your account, reset your password or restore your data if you clear your browser storage. Do not reuse an important password here, and export your data if it matters to you.'
        ]
      },
      {
        h: 'Availability',
        p: [
          'The site is provided as-is, without warranty of any kind. We do not guarantee uninterrupted availability and may change or remove content at any time.'
        ]
      },
      {
        h: 'Contact',
        p: ['Questions about these terms can be sent to ' + site.email + '.']
      }
    ]
  );
}

function notFound() {
  const popular = Recipes.query({ sort: 'popular' }).slice(0, 3);
  const body = `      <section class="page-hero error-hero">
        <div class="container narrow">
          <p class="eyebrow">Error 404</p>
          <h1>This page went the way of the leftovers.</h1>
          <p class="lede">The link is broken or the page has moved. Here is a way back into the kitchen.</p>
          <div class="button-row">
            <a class="btn btn-primary" href="${esc(site.basePath)}/index.html">Back to home</a>
            <a class="btn btn-secondary" href="${esc(site.basePath)}/recipes.html">Browse all recipes</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${C.sectionHeading('While you are here', 'Popular recipes', null)}
          ${C.recipeGrid(popular, 'abs')}
        </div>
      </section>`;

  return {
    file: '404.html',
    title: `Page Not Found | ${site.name}`,
    description: 'The page you were looking for could not be found.',
    canonical: '404.html',
    noindex: true,
    absolute: true,
    body
  };
}

module.exports = {
  about,
  contact,
  login,
  signup,
  account,
  favorites,
  mealPlanner,
  shoppingList,
  privacy,
  terms,
  notFound
};
