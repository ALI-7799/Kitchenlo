/**
 * Templates for the content pages: home, recipe index, categories, single
 * recipe, guides index and single guide.
 */
import { esc, rel, site } from './layout.js';
import * as C from './components.js';
import * as Recipes from '../data/recipes.js';
import guides from '../data/guides.js';
import collections from '../data/collections.js';
import type { Block, Category, Collection, Depth, Guide, PageSpec, Recipe } from '../types.js';

/* ------------------------------------------------------------------ home -- */

function home(): PageSpec {
  const popular = Recipes.query({ sort: 'popular' }).slice(0, 6);
  const quickest = Recipes.query({ sort: 'quickest' }).slice(0, 3);
  const featured = Recipes.requireBySlug('lentil-soup');
  const total = Recipes.all.length;

  const body = `      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${esc(site.tagline)}</p>
            <h1>Cook meals that feel cozy, bright, and effortless.</h1>
            <p class="lede">${total} tested recipes with measured ingredients, real timings and nutrition for every dish. Quick dinners, healthy bowls and easy desserts, written for people who cook on weeknights.</p>
            <form class="hero-search" action="recipes.html" method="get" role="search">
              <label class="sr-only" for="heroSearch">Search recipes</label>
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              <input type="search" id="heroSearch" name="q" placeholder="Try &quot;chickpea&quot;, &quot;30 minutes&quot;, &quot;vegan&quot;..." />
              <button class="btn btn-primary" type="submit">Search</button>
            </form>
            <div class="hero-badges">
              <a class="badge-link" href="recipes.html?time=under-30">30-minute meals</a>
              <a class="badge-link" href="recipes.html?diet=vegetarian">Vegetarian</a>
              <a class="badge-link" href="recipes.html?diet=high-protein">High protein</a>
              <a class="badge-link" href="category/desserts.html">Desserts</a>
            </div>
          </div>
          <div class="hero-card">
            <div class="recipe-showcase">
              <p class="eyebrow">Recipe of the day</p>
              <a href="recipes/${esc(featured.slug)}.html" class="showcase-media">
                <img src="${esc(C.imageUrl(featured, 0))}" alt="${esc(
    featured.imageAlt
  )}" width="600" height="400" loading="eager" decoding="async" data-fallback="${esc(
    featured.fallbackImage
  )}" />
              </a>
              <h2><a href="recipes/${esc(featured.slug)}.html">${esc(featured.title)}</a></h2>
              <p>${esc(featured.description)}</p>
              <div class="showcase-meta">
                ${
                  site.ratings.enabled
                    ? `${C.stars(featured.rating)}<span>${featured.ratingCount} ratings</span>`
                    : `<span>${esc(featured.difficulty)}</span>`
                }
                <span class="meta-dot">&middot;</span>
                <span>${esc(C.timeLabel(Recipes.totalMinutes(featured)))}</span>
                <span class="meta-dot">&middot;</span>
                <span>${featured.nutrition.calories} cal</span>
              </div>
              <a class="btn btn-secondary" href="recipes/${esc(featured.slug)}.html">See this recipe</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="stats-grid">
            ${site.stats
              .map(
                (s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`
              )
              .join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${C.sectionHeading('Browse by category', 'Find something that fits tonight.', `${site.categories.length} collections covering dinner, lunch, breakfast and pudding.`)}
          <div class="card-grid">
            ${site.categories
              .map((cat: Category) => C.categoryCard(cat, Recipes.byCategory(cat.slug).length, 0))
              .join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('Popular this week', 'Make something delicious tonight.', null, {
            href: 'recipes.html',
            label: `View all ${total} recipes`
          })}
          ${C.recipeGrid(popular, 0, { eager: true })}
        </div>
      </section>

      <section class="section">
        <div class="container split-section">
          <div>
            <p class="eyebrow">Why cooks trust us</p>
            <h2>Every recipe is measured, timed and tested.</h2>
            <p>No vague instructions, no missing quantities. Each recipe lists exact amounts in both metric and imperial, tells you what the food should look like at each stage, and explains the one technical detail that decides whether it works.</p>
            <ul class="check-list">
              <li>Full nutrition per serving, calculated for every dish</li>
              <li>Ingredient scaling built in, from 1 to 12 servings</li>
              <li>Storage and make-ahead notes on every recipe</li>
              <li>Answers to the questions that actually come up</li>
            </ul>
            <a class="btn btn-primary" href="about.html">How we test recipes</a>
          </div>
          <div class="preview-stack">
            <div class="preview-card">
              <h3>Save what you like</h3>
              <p>Create a free account and keep every recipe you want to come back to in one place.</p>
            </div>
            <div class="preview-card">
              <h3>Plan the week</h3>
              <p>Drop recipes onto a seven-day planner and see the whole week at a glance.</p>
            </div>
            <div class="preview-card">
              <h3>Shop in one pass</h3>
              <p>Turn any set of recipes into a single combined shopping list, grouped by aisle.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('In a hurry', 'Dinner in under 25 minutes.', null, {
            href: 'recipes.html?time=under-30',
            label: 'More quick recipes'
          })}
          ${C.recipeGrid(quickest, 0)}
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${C.sectionHeading('Curated collections', 'Cooking around something specific?', 'Hand-picked lists for the way people actually search: by diet, by time, by how well a dish keeps.')}
          <div class="collection-grid">
            ${collections
              .map((c: Collection) => {
                const count = collectionRecipes(c).length;
                return `<a class="collection-tile" href="collection/${esc(c.slug)}.html">
              <span class="collection-count">${count}</span>
              <span class="collection-name">${esc(c.title)}</span>
            </a>`;
              })
              .join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('Cooking guides', 'Learn the technique, not just the recipe.', 'Long-form guides on the fundamentals that make everything else easier.', {
            href: 'guides.html',
            label: 'All guides'
          })}
          <div class="card-grid">
            ${guides
              .slice(0, 3)
              .map((g: Guide) => C.guideCard(g, 0))
              .join('\n            ')}
          </div>
        </div>
      </section>

      ${C.newsletterCta()}`;

  return {
    file: 'index.html',
    title: `${site.name} | Fresh Recipes for Every Home Cook`,
    description: site.description,
    canonical: 'index.html',
    active: 'index.html',
    body,
    image: C.absoluteImageUrl(featured),
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.origin + '/',
        description: site.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: site.origin + '/recipes.html?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        url: site.origin + '/',
        logo: site.origin + '/favicon.svg',
        email: site.email,
        sameAs: site.social.map((s) => s.href)
      }
    ]
  };
}

/* --------------------------------------------------------- recipe index -- */

function recipesIndex(): PageSpec {
  const all = Recipes.query({ sort: 'popular' });

  const chips = (
    name: string,
    items: { id: string; label: string }[],
    allLabel: string
  ) => `<div class="filter-group" role="group" aria-label="${esc(name)}">
              <button type="button" class="chip is-active" data-filter="${esc(
                name
              )}" data-value="">${esc(allLabel)}</button>
              ${items
                .map(
                  (i: { id: string; label: string }) =>
                    `<button type="button" class="chip" data-filter="${esc(name)}" data-value="${esc(
                      i.id
                    )}">${esc(i.label)}</button>`
                )
                .join('\n              ')}
            </div>`;

  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Recipe collection</p>
          <h1>All ${all.length} recipes, searchable and filterable.</h1>
          <p class="lede">Search by ingredient, filter by diet or time, and sort by whatever matters tonight. Everything updates instantly.</p>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="filter-bar" id="filterBar">
            <div class="search-row">
              <label class="sr-only" for="recipeSearch">Search recipes</label>
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              <input type="search" id="recipeSearch" placeholder="Search by name or ingredient..." autocomplete="off" />
              <button type="button" class="btn btn-ghost btn-sm" id="clearFilters">Reset</button>
            </div>

            <details class="filter-drawer" open>
              <summary>Filters</summary>
              <div class="filter-groups">
                ${chips('category', site.categories.map((c) => ({ id: c.slug, label: c.title })), 'All categories')}
                ${chips('time', site.filters.time, 'Any time')}
                ${chips('diet', site.filters.diet, 'Any diet')}
                ${chips('difficulty', site.filters.difficulty, 'Any level')}
              </div>
            </details>

            <div class="results-row">
              <p class="results-count" id="resultsCount" role="status" aria-live="polite">Showing ${
                all.length
              } recipes</p>
              <label class="sort-label" for="sortSelect">Sort
                <select id="sortSelect">
                  ${site.filters.sort
                    .map((s: { id: string; label: string }) => `<option value="${esc(s.id)}">${esc(s.label)}</option>`)
                    .join('\n                  ')}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="card-grid" id="recipeResults">
            ${all.map((r: Recipe, i: number) => C.recipeCard(r, 0, { eager: i < 3 })).join('\n            ')}
          </div>
          <div class="empty-state" id="emptyState" hidden>
            <h2>No recipes match those filters</h2>
            <p>Try removing a filter or searching for a single ingredient instead.</p>
            <button class="btn btn-secondary" type="button" data-reset-filters>Clear all filters</button>
          </div>
        </div>
      </section>

      ${C.newsletterCta()}`;

  return {
    file: 'recipes.html',
    title: `All Recipes | ${site.name}`,
    description:
      `Browse all ${all.length} Kitchenlo recipes. Search by ingredient and filter by diet, cooking time or difficulty to find quick dinners, healthy bowls, breakfasts and easy desserts.`,
    canonical: 'recipes.html',
    active: 'recipes.html',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Recipes', href: 'recipes.html' }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'All Recipes',
        url: site.origin + '/recipes.html',
        description: 'The complete Kitchenlo recipe library.',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: all.length,
          itemListElement: all.map((r: Recipe, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.origin}/recipes/${r.slug}.html`,
            name: r.title
          }))
        }
      }
    ]
  };
}

/* ------------------------------------------------------------ categories -- */

function categoriesIndex(): PageSpec {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Browse by category</p>
          <h1>Find recipes that match your mood, time, and cravings.</h1>
          <p class="lede">${site.categories.length} collections, ${Recipes.all.length} tested recipes, organised by how you actually decide what to cook.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card-grid">
            ${site.categories
              .map((cat: Category) => C.categoryCard(cat, Recipes.byCategory(cat.slug).length, 0))
              .join('\n            ')}
          </div>
        </div>
      </section>

      ${site.categories
        .map((cat: Category) => {
          const list = Recipes.byCategory(cat.slug).sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 3);
          return `<section class="section${site.categories.indexOf(cat) % 2 ? ' alt-bg' : ''}">
        <div class="container">
          ${C.sectionHeading(cat.tagline, cat.title, cat.description, {
            href: `category/${cat.slug}.html`,
            label: `All ${Recipes.byCategory(cat.slug).length} ${cat.title.toLowerCase()}`
          })}
          ${C.recipeGrid(list, 0)}
        </div>
      </section>`;
        })
        .join('\n\n      ')}

      ${C.newsletterCta()}`;

  return {
    file: 'categories.html',
    title: `Recipe Categories | ${site.name}`,
    description:
      'Browse Kitchenlo recipes by category: quick 30-minute dinners, healthy meal-prep bowls, breakfasts and easy desserts, each a collection of tested recipes.',
    canonical: 'categories.html',
    active: 'categories.html',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Categories', href: 'categories.html' }
    ]
  };
}

function categoryPage(cat: Category): PageSpec {
  const list = Recipes.byCategory(cat.slug).sort((a, b) => b.ratingCount - a.ratingCount);
  const fastest = list.slice().sort((a, b) => Recipes.totalMinutes(a) - Recipes.totalMinutes(b))[0]!;
  const avgTime = Math.round(
    list.reduce((s, r) => s + Recipes.totalMinutes(r), 0) / list.length
  );

  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">${esc(cat.tagline)}</p>
          <h1>${esc(cat.title)}</h1>
          <p class="lede">${esc(cat.description)}</p>
          <div class="hero-badges">
            <span class="badge-link">${list.length} recipes</span>
            <span class="badge-link">Average ${esc(C.timeLabel(avgTime))}</span>
            <span class="badge-link">Fastest ${esc(C.timeLabel(Recipes.totalMinutes(fastest)))}</span>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container narrow">
          <div class="prose">
            <p>${esc(cat.intro)}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${C.recipeGrid(list, 1, { eager: true })}
        </div>
      </section>

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('Keep exploring', 'Other collections', null)}
          <div class="card-grid">
            ${site.categories
              .filter((c: Category) => c.slug !== cat.slug)
              .map((c: Category) => C.categoryCard(c, Recipes.byCategory(c.slug).length, 1))
              .join('\n            ')}
          </div>
        </div>
      </section>`;

  return {
    file: `category/${cat.slug}.html`,
    depth: 1,
    title: `${cat.title} Recipes | ${site.name}`,
    description: cat.description,
    canonical: `category/${cat.slug}.html`,
    active: `category/${cat.slug}.html`,
    image: cat.image,
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Categories', href: 'categories.html' },
      { name: cat.title, href: `category/${cat.slug}.html` }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${cat.title} Recipes`,
        url: `${site.origin}/category/${cat.slug}.html`,
        description: cat.description,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: list.length,
          itemListElement: list.map((r: Recipe, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.origin}/recipes/${r.slug}.html`,
            name: r.title
          }))
        }
      }
    ]
  };
}

/* --------------------------------------------------------- recipe detail -- */

function recipePage(recipe: Recipe): PageSpec {
  const total = Recipes.totalMinutes(recipe);
  const cat = site.categories.find((c) => c.slug === recipe.category);
  const related = (recipe.related ?? []).map(Recipes.requireBySlug);
  const flat = Recipes.flatIngredients(recipe);

  const ingredientGroups = recipe.ingredients
    .map(
      (group) => `<div class="ingredient-group">
                <h3>${esc(group.group)}</h3>
                <ul class="ingredient-list">
                  ${group.items
                    .map(
                      (item: string) => `<li>
                    <label class="ingredient">
                      <input type="checkbox" />
                      <span data-ingredient="${esc(item)}">${esc(item)}</span>
                    </label>
                  </li>`
                    )
                    .join('\n                  ')}
                </ul>
              </div>`
    )
    .join('\n              ');

  const steps = recipe.instructions
    .map(
      (step: { title: string; text: string }, i: number) => `<li class="step">
                  <div class="step-number">${i + 1}</div>
                  <div class="step-body">
                    <h3>${esc(step.title)}</h3>
                    <p>${esc(step.text)}</p>
                  </div>
                </li>`
    )
    .join('\n                ');

  const n = recipe.nutrition;
  const nutritionRows = ([
    ['Calories', n.calories + ' kcal'],
    ['Protein', n.protein + ' g'],
    ['Carbohydrates', n.carbs + ' g'],
    ['Fat', n.fat + ' g'],
    ['Fibre', n.fiber + ' g'],
    ['Sugar', n.sugar + ' g'],
    ['Sodium', n.sodium + ' mg']
  ] as [string, string][])
    .map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join('\n                ');

  const body = `      <article class="recipe" itemscope itemtype="https://schema.org/Recipe">
        <section class="recipe-hero">
          <div class="container recipe-hero-grid">
            <div class="recipe-hero-copy">
              <p class="eyebrow"><a href="../category/${esc(recipe.category)}.html">${esc(
    cat ? cat.title : ''
  )}</a></p>
              <h1 itemprop="name">${esc(recipe.title)}</h1>
              <p class="lede" itemprop="description">${esc(recipe.description)}</p>
              <div class="recipe-byline">
                ${
                  site.ratings.enabled
                    ? `${C.stars(recipe.rating)}
                <span><strong>${recipe.rating}</strong> from ${recipe.ratingCount} ratings</span>
                <span class="meta-dot">&middot;</span>`
                    : `<span>${esc(recipe.cuisine)} ${esc(recipe.course.toLowerCase())}</span>
                <span class="meta-dot">&middot;</span>`
                }
                <span>Updated ${esc(
                  new Date(recipe.dateModified).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                )}</span>
              </div>
              <div class="recipe-actions">
                <button class="btn btn-primary" type="button" data-fav="${esc(
                  recipe.slug
                )}" data-fav-label aria-pressed="false">Save recipe</button>
                <button class="btn btn-secondary" type="button" data-add-to-plan="${esc(
                  recipe.slug
                )}">Add to meal plan</button>
                <button class="btn btn-ghost" type="button" data-print>Print</button>
              </div>
            </div>
            <figure class="recipe-hero-media">
              <img src="${esc(C.imageUrl(recipe, 1))}" alt="${esc(
    recipe.imageAlt
  )}" itemprop="image" width="1200" height="800" loading="eager" decoding="async" fetchpriority="high" data-fallback="${esc(
    rel(recipe.fallbackImage, 1)
  )}" />
            </figure>
          </div>
        </section>

        <section class="section-tight">
          <div class="container">
            <div class="recipe-meta-strip">
              <div><span>Prep</span><strong>${esc(C.timeLabel(recipe.prepMinutes))}</strong></div>
              <div><span>Cook</span><strong>${esc(
                recipe.cookMinutes ? C.timeLabel(recipe.cookMinutes) : 'None'
              )}</strong></div>
              <div><span>Total</span><strong>${esc(C.timeLabel(total))}</strong></div>
              <div><span>Serves</span><strong data-base-servings="${
                recipe.servings
              }">${recipe.servings}</strong></div>
              <div><span>Difficulty</span><strong>${esc(recipe.difficulty)}</strong></div>
              <div><span>Calories</span><strong>${n.calories} kcal</strong></div>
            </div>
          </div>
        </section>

        <section class="section-tight">
          <div class="container narrow">
            <div class="prose"><p>${esc(recipe.intro)}</p></div>
          </div>
        </section>

        <section class="section">
          <div class="container recipe-body-grid">
            <div class="recipe-ingredients">
              <div class="ingredients-head">
                <h2>Ingredients</h2>
                <div class="servings-scaler" role="group" aria-label="Adjust servings">
                  <button type="button" data-servings-step="-1" aria-label="Fewer servings">&minus;</button>
                  <span data-servings-display>${recipe.servings}</span>
                  <button type="button" data-servings-step="1" aria-label="More servings">+</button>
                </div>
              </div>
              <p class="scale-note">Quantities scale automatically. Cooking times stay the same.</p>
              ${ingredientGroups}
              <button class="btn btn-secondary btn-block" type="button" data-add-ingredients="${esc(
                recipe.slug
              )}">Add all to shopping list</button>

              <div class="equipment-box">
                <h3>Equipment</h3>
                <ul>
                  ${recipe.equipment.map((e: string) => `<li>${esc(e)}</li>`).join('\n                  ')}
                </ul>
              </div>
            </div>

            <div class="recipe-method">
              <h2>Method</h2>
              <ol class="steps">
                ${steps}
              </ol>

              <div class="tips-box">
                <h3>Cook&rsquo;s tips</h3>
                <ul>
                  ${recipe.tips.map((t: string) => `<li>${esc(t)}</li>`).join('\n                  ')}
                </ul>
              </div>

              <div class="tips-box variations">
                <h3>Variations</h3>
                <ul>
                  ${recipe.variations.map((t: string) => `<li>${esc(t)}</li>`).join('\n                  ')}
                </ul>
              </div>

              <div class="storage-box">
                <h3>Storage and make-ahead</h3>
                <p>${esc(recipe.storage)}</p>
              </div>

              <div class="nutrition-box">
                <h3>Nutrition per serving</h3>
                <table class="nutrition-table">
                  <tbody>
                ${nutritionRows}
                  </tbody>
                </table>
                <p class="disclaimer">Nutrition is estimated from ingredient averages and will vary with brands and portioning.</p>
              </div>
            </div>
          </div>
        </section>
      </article>

      ${C.faqBlock(recipe.faqs, `${recipe.title}: your questions answered`)}

      <section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('You might also like', 'Related recipes', null)}
          ${C.recipeGrid(related, 1)}
        </div>
      </section>`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: [C.absoluteImageUrl(recipe)],
    author: { '@type': 'Organization', name: site.author.name, url: site.author.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: site.origin + '/favicon.svg' }
    },
    datePublished: recipe.datePublished,
    dateModified: recipe.dateModified,
    prepTime: C.isoDuration(recipe.prepMinutes),
    cookTime: C.isoDuration(recipe.cookMinutes),
    totalTime: C.isoDuration(total),
    recipeYield: recipe.yieldText,
    recipeCategory: recipe.course,
    recipeCuisine: recipe.cuisine,
    keywords: (recipe.keywords || []).join(', '),
    suitableForDiet: (recipe.diet || [])
      .map((d: string) =>
        ({
          vegetarian: 'https://schema.org/VegetarianDiet',
          vegan: 'https://schema.org/VeganDiet',
          'gluten-free': 'https://schema.org/GlutenFreeDiet',
          'low-carb': 'https://schema.org/LowCalorieDiet'
        }[d])
      )
      .filter(Boolean),
    recipeIngredient: flat,
    recipeInstructions: recipe.instructions.map((s: { title: string; text: string }, i: number) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.text,
      url: `${site.origin}/recipes/${recipe.slug}.html#step-${i + 1}`
    })),
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1 serving',
      calories: n.calories + ' calories',
      proteinContent: n.protein + ' g',
      carbohydrateContent: n.carbs + ' g',
      fatContent: n.fat + ' g',
      fiberContent: n.fiber + ' g',
      sugarContent: n.sugar + ' g',
      sodiumContent: n.sodium + ' mg'
    }
  };

  if (!(schema.suitableForDiet as string[]).length) delete schema.suitableForDiet;

  // Only publish a rating once it reflects genuine reviews; see site.ratings.
  if (site.ratings.enabled) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating,
      ratingCount: recipe.ratingCount,
      bestRating: 5,
      worstRating: 1
    };
  }

  return {
    file: `recipes/${recipe.slug}.html`,
    depth: 1,
    title: `${recipe.title} Recipe | ${site.name}`,
    description: recipe.description,
    canonical: `recipes/${recipe.slug}.html`,
    active: 'recipes.html',
    image: C.absoluteImageUrl(recipe),
    type: 'article',
    bodyClass: 'recipe-page',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Recipes', href: 'recipes.html' },
      { name: cat ? cat.title : 'Recipes', href: `category/${recipe.category}.html` },
      { name: recipe.title, href: `recipes/${recipe.slug}.html` }
    ],
    schema: [schema, C.faqSchema(recipe.faqs)]
  };
}

/* --------------------------------------------------------- collections --- */

/** Resolves a collection's filter (or explicit slug list) to recipes. */
function collectionRecipes(collection: Collection): Recipe[] {
  if (collection.slugs) {
    return collection.slugs.map(Recipes.requireBySlug);
  }
  return Recipes.query({ sort: 'quickest', ...collection.filter });
}

function collectionPage(collection: Collection): PageSpec {
  const list = collectionRecipes(collection);
  const others = collections.filter((c) => c.slug !== collection.slug);

  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Collection &middot; ${list.length} recipes</p>
          <h1>${esc(collection.heading)}</h1>
          <p class="lede">${esc(collection.description)}</p>
        </div>
      </section>

      <section class="section-tight">
        <div class="container narrow">
          <div class="prose">
            ${collection.intro.map((p: string) => `<p>${esc(p)}</p>`).join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${C.recipeGrid(list, 1, { eager: true })}
        </div>
      </section>

      ${C.faqBlock(collection.faqs, `${collection.title}: common questions`)}

      <section class="section">
        <div class="container">
          ${C.sectionHeading('Keep browsing', 'Other collections', null)}
          <div class="chip-links">
            ${others
              .map(
                (c: Collection) =>
                  `<a class="badge-link" href="${esc(rel(`collection/${c.slug}.html`, 1))}">${esc(
                    c.title
                  )}</a>`
              )
              .join('\n            ')}
            <a class="badge-link" href="${esc(rel('recipes.html', 1))}">All ${Recipes.all.length} recipes</a>
          </div>
        </div>
      </section>`;

  return {
    file: `collection/${collection.slug}.html`,
    depth: 1,
    title: `${collection.title} | ${site.name}`,
    description: collection.description,
    canonical: `collection/${collection.slug}.html`,
    active: 'recipes.html',
    image: collection.image,
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Recipes', href: 'recipes.html' },
      { name: collection.title, href: `collection/${collection.slug}.html` }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collection.title,
        url: `${site.origin}/collection/${collection.slug}.html`,
        description: collection.description,
        keywords: (collection.keywords || []).join(', '),
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: list.length,
          itemListElement: list.map((r: Recipe, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.origin}/recipes/${r.slug}.html`,
            name: r.title
          }))
        }
      },
      C.faqSchema(collection.faqs)
    ]
  };
}

/* ------------------------------------------------------------- guides ---- */

function guidesIndex(): PageSpec {
  const body = `      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Cooking guides</p>
          <h1>Learn the technique, not just the recipe.</h1>
          <p class="lede">Long-form guides on the fundamentals: seasoning, knife skills, meal prep and building a pantry that lets you cook without shopping first.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card-grid">
            ${guides.map((g: Guide) => C.guideCard(g, 0)).join('\n            ')}
          </div>
        </div>
      </section>

      ${C.newsletterCta()}`;

  return {
    file: 'guides.html',
    title: `Cooking Guides | ${site.name}`,
    description:
      'In-depth cooking guides from Kitchenlo: how to meal prep, pantry essentials, knife skills, seasoning technique and cutting food waste.',
    canonical: 'guides.html',
    active: 'guides.html',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Guides', href: 'guides.html' }
    ]
  };
}

function guidePage(guide: Guide): PageSpec {
  const related = (guide.related ?? []).map(Recipes.requireBySlug);
  type Heading = { type: 'p' | 'h2' | 'h3'; text: string };
  const headings = guide.body.filter((b): b is Heading => b.type === 'h2');

  const body = `      <article class="guide">
        <section class="page-hero">
          <div class="container narrow">
            <p class="eyebrow">Cooking guide &middot; ${guide.readMinutes} min read</p>
            <h1>${esc(guide.title)}</h1>
            <p class="lede">${esc(guide.description)}</p>
          </div>
        </section>

        <figure class="guide-media">
          <div class="container">
            <img src="${esc(guide.image)}" alt="${esc(
    guide.imageAlt
  )}" width="1200" height="700" loading="eager" decoding="async" />
          </div>
        </figure>

        <section class="section">
          <div class="container guide-grid">
            <aside class="guide-toc">
              <h2>On this page</h2>
              <ol>
                ${headings
                  .map(
                    (h: Heading) =>
                      `<li><a href="#${esc(
                        h.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                      )}">${esc(h.text)}</a></li>`
                  )
                  .join('\n                ')}
              </ol>
            </aside>
            <div class="prose guide-body">
              ${C.richText(guide.body)}
            </div>
          </div>
        </section>
      </article>

      ${C.faqBlock(guide.faqs)}

      ${
        related.length
          ? `<section class="section alt-bg">
        <div class="container">
          ${C.sectionHeading('Put it into practice', 'Recipes that use this', null)}
          ${C.recipeGrid(related, 1)}
        </div>
      </section>`
          : ''
      }`;

  return {
    file: `guides/${guide.slug}.html`,
    depth: 1,
    title: `${guide.title} | ${site.name}`,
    description: guide.description,
    canonical: `guides/${guide.slug}.html`,
    active: 'guides.html',
    image: guide.image,
    type: 'article',
    body,
    breadcrumbs: [
      { name: 'Home', href: 'index.html' },
      { name: 'Guides', href: 'guides.html' },
      { name: guide.title, href: `guides/${guide.slug}.html` }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        image: [guide.image],
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        author: { '@type': 'Organization', name: site.author.name, url: site.author.url },
        publisher: {
          '@type': 'Organization',
          name: site.name,
          logo: { '@type': 'ImageObject', url: site.origin + '/favicon.svg' }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.origin}/guides/${guide.slug}.html` },
        keywords: (guide.keywords || []).join(', ')
      },
      C.faqSchema(guide.faqs)
    ]
  };
}

export {
  home,
  collectionPage,
  collectionRecipes,
  recipesIndex,
  categoriesIndex,
  categoryPage,
  recipePage,
  guidesIndex,
  guidePage
};
