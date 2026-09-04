/**
 * Reusable markup fragments shared by every page template.
 */
const { esc, rel, site } = require('./layout.js');
const Recipes = require('../data/recipes.js');

/**
 * Renders stars only when site.ratings.enabled is on. Until the ratings are
 * real, cards lead with facts a cook can act on instead of invented scores.
 */
function stars(rating) {
  if (!site.ratings.enabled) return '';
  const rounded = Math.round(rating * 2) / 2;
  let out = '';
  for (let i = 1; i <= 5; i++) {
    if (rounded >= i) out += '<span class="star full">&#9733;</span>';
    else if (rounded >= i - 0.5) out += '<span class="star half">&#9733;</span>';
    else out += '<span class="star">&#9733;</span>';
  }
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">${out}</span>`;
}

/** Leading metadata for a card: stars when enabled, otherwise time and diet. */
function cardLead(recipe) {
  const total = Recipes.totalMinutes(recipe);
  if (site.ratings.enabled) {
    return `${stars(recipe.rating)}<span class="meta-dot">&middot;</span><span>${esc(
      timeLabel(total)
    )}</span>`;
  }
  return `<span class="meta-strong">${esc(timeLabel(total))}</span><span class="meta-dot">&middot;</span><span>${esc(
    recipe.course
  )}</span><span class="meta-dot">&middot;</span><span>${esc(recipe.cuisine)}</span>`;
}

function timeLabel(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/** ISO 8601 duration, required by Recipe structured data. */
function isoDuration(minutes) {
  if (!minutes) return undefined;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return 'PT' + (h ? h + 'H' : '') + (m ? m + 'M' : '');
}

function recipeCard(recipe, depth, opts) {
  opts = opts || {};
  const total = Recipes.totalMinutes(recipe);
  const href = rel(`recipes/${recipe.slug}.html`, depth);
  const diet = (recipe.diet || []).slice(0, 2);

  return `<article class="card recipe-card" data-slug="${esc(recipe.slug)}">
              <a class="card-media" href="${esc(href)}" tabindex="-1" aria-hidden="true">
                <img src="${esc(recipe.image)}" alt="${esc(recipe.imageAlt)}" loading="${
    opts.eager ? 'eager' : 'lazy'
  }" decoding="async" width="600" height="400" />
                <span class="card-badge">${esc(recipe.difficulty)}</span>
              </a>
              <button class="fav-btn" type="button" data-fav="${esc(
                recipe.slug
              )}" aria-label="Save ${esc(recipe.title)}" aria-pressed="false">
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17s-6-3.9-6-8a3.6 3.6 0 0 1 6-2.4A3.6 3.6 0 0 1 16 9c0 4.1-6 8-6 8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
              </button>
              <div class="card-body">
                <div class="card-meta">${cardLead(recipe)}</div>
                <h3><a href="${esc(href)}">${esc(recipe.title)}</a></h3>
                <p>${esc(recipe.description)}</p>
                <div class="card-tags">
                  ${diet.map((d) => `<span class="tag">${esc(d.replace(/-/g, ' '))}</span>`).join('\n                  ')}
                  <span class="tag tag-muted">${recipe.nutrition.calories} cal</span>
                </div>
              </div>
            </article>`;
}

function recipeGrid(list, depth, opts) {
  return `<div class="card-grid">
            ${list.map((r, i) => recipeCard(r, depth, { eager: opts && opts.eager && i < 3 })).join('\n            ')}
          </div>`;
}

function sectionHeading(eyebrow, title, text, action) {
  return `<div class="section-heading">
            ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
            <h2>${esc(title)}</h2>
            ${text ? `<p>${esc(text)}</p>` : ''}
            ${action ? `<a class="btn btn-secondary" href="${esc(action.href)}">${esc(action.label)}</a>` : ''}
          </div>`;
}

function guideCard(guide, depth) {
  const href = rel(`guides/${guide.slug}.html`, depth);
  return `<article class="card guide-card">
              <a class="card-media" href="${esc(href)}" tabindex="-1" aria-hidden="true">
                <img src="${esc(guide.image)}" alt="${esc(guide.imageAlt)}" loading="lazy" decoding="async" width="600" height="400" />
              </a>
              <div class="card-body">
                <div class="card-meta"><span>${guide.readMinutes} min read</span></div>
                <h3><a href="${esc(href)}">${esc(guide.title)}</a></h3>
                <p>${esc(guide.excerpt)}</p>
              </div>
            </article>`;
}

function categoryCard(category, count, depth) {
  const href = rel(`category/${category.slug}.html`, depth);
  return `<article class="card category-card">
              <a class="card-media" href="${esc(href)}" tabindex="-1" aria-hidden="true">
                <img src="${esc(category.image)}" alt="${esc(category.imageAlt)}" loading="lazy" decoding="async" width="600" height="400" />
              </a>
              <div class="card-body">
                <p class="eyebrow">${count} recipes</p>
                <h3><a href="${esc(href)}">${esc(category.title)}</a></h3>
                <p>${esc(category.description)}</p>
                <a class="btn btn-secondary" href="${esc(href)}">Browse ${esc(category.short)}</a>
              </div>
            </article>`;
}

/** Renders a guide body block array into HTML. */
function richText(blocks) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'h2':
          return `<h2 id="${esc(
            block.text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          )}">${esc(block.text)}</h2>`;
        case 'h3':
          return `<h3>${esc(block.text)}</h3>`;
        case 'ul':
          return `<ul>\n${block.items.map((i) => `            <li>${esc(i)}</li>`).join('\n')}\n          </ul>`;
        case 'ol':
          return `<ol>\n${block.items.map((i) => `            <li>${esc(i)}</li>`).join('\n')}\n          </ol>`;
        case 'callout':
          return `<aside class="callout"><h3>${esc(block.title)}</h3><p>${esc(block.text)}</p></aside>`;
        default:
          return `<p>${esc(block.text)}</p>`;
      }
    })
    .join('\n          ');
}

function faqBlock(faqs, heading) {
  if (!faqs || !faqs.length) return '';
  return `<section class="section faq-section">
        <div class="container narrow">
          <h2>${esc(heading || 'Frequently asked questions')}</h2>
          <div class="faq-list">
            ${faqs
              .map(
                (f) => `<details class="faq-item">
              <summary>${esc(f.q)}</summary>
              <div class="faq-answer"><p>${esc(f.a)}</p></div>
            </details>`
              )
              .join('\n            ')}
          </div>
        </div>
      </section>`;
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function newsletterCta() {
  return `<section class="section cta-band">
        <div class="container cta-inner">
          <div>
            <h2>Cook something good this week</h2>
            <p>Create a free account to save recipes, build a meal plan and generate a shopping list in one click.</p>
          </div>
          <div class="cta-actions">
            <a class="btn btn-primary" href="signup.html">Create free account</a>
            <a class="btn btn-ghost" href="recipes.html">Browse all recipes</a>
          </div>
        </div>
      </section>`;
}

module.exports = {
  stars,
  cardLead,
  timeLabel,
  isoDuration,
  recipeCard,
  recipeGrid,
  sectionHeading,
  guideCard,
  categoryCard,
  richText,
  faqBlock,
  faqSchema,
  newsletterCta
};
