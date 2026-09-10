/**
 * Page shell: <head>, header and footer.
 * Every generated page passes through here, so the navigation and footer are
 * defined exactly once and rebuilding propagates changes across the whole site.
 */
import site from '../data/site.js';
import * as Recipes from '../data/recipes.js';
import type { Depth, NavItem, PageSpec } from '../types.js';
const recipeCount = Recipes.all.length;

/** Escapes text destined for HTML body content or attribute values. */
function esc(value: unknown): string {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Serialises JSON-LD, neutralising any "</script>" sequence inside strings. */
function jsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

/**
 * Rewrites a root-relative href for a page nested `depth` directories deep.
 * Pages live in the repo root or one directory down (recipes/, category/, guides/),
 * so a depth of 1 turns "recipes.html" into "../recipes.html".
 */
function rel(href: string, depth: Depth): string {
  if (!href || /^(https?:|mailto:|tel:|#|\/)/.test(href)) return href;
  // 404.html is served for arbitrary URLs, so it links from the site root.
  if (depth === 'abs') return (site.basePath || '') + '/' + href;
  return depth > 0 ? '../'.repeat(depth) + href : href;
}

function navMarkup(active: string, depth: Depth): string {
  return site.nav
    .map((item: NavItem) => {
      const isActive = active === item.href || (item.children || []).some((c: NavItem) => c.href === active);
      const current = isActive ? ' aria-current="page"' : '';
      const cls = isActive ? ' class="is-active"' : '';

      if (!item.children) {
        return `<li><a href="${esc(rel(item.href, depth))}"${cls}${current}>${esc(item.label)}</a></li>`;
      }

      const submenu = item.children
        .map(
          (child: NavItem) =>
            `<li><a href="${esc(rel(child.href, depth))}"${
              active === child.href ? ' aria-current="page"' : ''
            }>${esc(child.label)}</a></li>`
        )
        .join('\n              ');

      return `<li class="has-submenu">
            <a href="${esc(rel(item.href, depth))}"${cls}${current}>${esc(item.label)}<svg class="chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></a>
            <ul class="submenu">
              ${submenu}
            </ul>
          </li>`;
    })
    .join('\n          ');
}

function headerMarkup(active: string, depth: Depth): string {
  return `<a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header" id="siteHeader">
      <div class="container nav-wrap">
        <a class="brand" href="${esc(rel('index.html', depth))}" aria-label="${esc(site.name)} home">
          <svg class="brand-mark" width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M10 9v8a3 3 0 0 0 3 3v5m0-16v6m3-6v6M22 9c-1.5 1.5-2 4-2 6s.5 3 2 3v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>${esc(site.name)}</span>
        </a>

        <nav class="site-nav" id="siteNav" aria-label="Main">
          <ul>
          ${navMarkup(active, depth)}
          </ul>
        </nav>

        <div class="header-actions">
          <button class="icon-btn" type="button" id="searchTrigger" aria-label="Search recipes">
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <a class="icon-btn" href="${esc(rel('favorites.html', depth))}" aria-label="Saved recipes">
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17s-6-3.9-6-8a3.6 3.6 0 0 1 6-2.4A3.6 3.6 0 0 1 16 9c0 4.1-6 8-6 8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            <span class="badge" data-favorites-count hidden>0</span>
          </a>
          <button class="icon-btn" type="button" id="themeToggle" aria-label="Switch colour theme">
            <svg class="icon-sun" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="4" fill="currentColor"/><path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.6 3.6l1.4 1.4m10 10l1.4 1.4m0-11.4l-1.4 1.4m-10 10l-1.4 1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <svg class="icon-moon" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M16 12.5A7 7 0 0 1 7.5 4a7 7 0 1 0 8.5 8.5z" fill="currentColor"/></svg>
          </button>

          <div class="auth-slot" data-auth-slot>
            <a class="btn btn-ghost btn-sm" href="${esc(rel('login.html', depth))}" data-auth-anon>Sign in</a>
            <a class="btn btn-primary btn-sm" href="${esc(rel('signup.html', depth))}" data-auth-anon>Sign up</a>
            <div class="account-menu" data-auth-user hidden>
              <button type="button" class="avatar-btn" id="accountTrigger" aria-expanded="false" aria-haspopup="true">
                <span class="avatar" data-user-initials>K</span>
                <span class="account-name" data-user-name>Account</span>
              </button>
              <div class="account-dropdown" id="accountDropdown" hidden>
                <a href="${esc(rel('account.html', depth))}">My account</a>
                <a href="${esc(rel('favorites.html', depth))}">Saved recipes</a>
                <a href="${esc(rel('meal-planner.html', depth))}">Meal planner</a>
                <a href="${esc(rel('shopping-list.html', depth))}">Shopping list</a>
                <button type="button" data-signout>Sign out</button>
              </div>
            </div>
          </div>

          <button class="nav-toggle" type="button" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="search-overlay" id="searchOverlay" hidden>
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search recipes">
        <div class="search-input-row">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="search" id="searchOverlayInput" placeholder="Search ${recipeCount} recipes and guides..." autocomplete="off" aria-label="Search recipes" />
          <button type="button" class="icon-btn" id="searchClose" aria-label="Close search">&times;</button>
        </div>
        <div class="search-results" id="searchOverlayResults" aria-live="polite"></div>
      </div>
    </div>`;
}

function footerMarkup(depth: Depth): string {
  const columns = site.footer
    .map(
      (col: (typeof site.footer)[number]) => `<div class="footer-col">
            <h3>${esc(col.title)}</h3>
            <ul>
              ${col.links
                .map((l: { label: string; href: string }) => `<li><a href="${esc(rel(l.href, depth))}">${esc(l.label)}</a></li>`)
                .join('\n              ')}
            </ul>
          </div>`
    )
    .join('\n          ');

  const socials = site.social
    .map(
      (s: (typeof site.social)[number]) =>
        `<a href="${esc(s.href)}" rel="noopener noreferrer" target="_blank" aria-label="${esc(
          s.label
        )}" class="social-link">${esc(s.label[0])}</a>`
    )
    .join('\n            ');

  return `<footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="brand" href="${esc(rel('index.html', depth))}">
              <svg class="brand-mark" width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M10 9v8a3 3 0 0 0 3 3v5m0-16v6m3-6v6M22 9c-1.5 1.5-2 4-2 6s.5 3 2 3v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>${esc(site.name)}</span>
            </a>
            <p>${esc(site.description)}</p>
            <div class="social-row">
            ${socials}
            </div>
          </div>
          ${columns}
        </div>

        <div class="footer-newsletter">
          <div>
            <h3>Get one good recipe a week</h3>
            <p>No spam, no 2,000-word life stories. Just a tested recipe and what to shop for.</p>
          </div>
          <form class="newsletter-form" data-newsletter novalidate>
            <label class="sr-only" for="footerEmail">Email address</label>
            <input type="email" id="footerEmail" name="email" placeholder="you@example.com" required />
            <button class="btn btn-primary" type="submit">Subscribe</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>

        <div class="footer-bottom">
          <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(
    site.name
  )}. All rights reserved.</p>
          <p class="footer-legal">
            <a href="${esc(rel('privacy.html', depth))}">Privacy</a>
            <a href="${esc(rel('terms.html', depth))}">Terms</a>
            <a href="${esc(rel('sitemap.xml', depth))}">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="backToTop" type="button" aria-label="Back to top" hidden>
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16V4m0 0L4 10m6-6l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>`;
}

/**
 * Renders a complete HTML document.
 * @param {{title:string, description:string, canonical:string, body:string,
 *          active?:string, depth?:number, image?:string, type?:string,
 *          schema?:object[], bodyClass?:string, scripts?:string[],
 *          noindex?:boolean, breadcrumbs?:{name:string,href:string}[]}} page
 */
function render(page: PageSpec): string {
  const depth = page.absolute ? 'abs' : page.depth || 0;
  const canonical = site.origin + '/' + page.canonical.replace(/^\//, '');
  const image = page.image || site.ogImage;
  const schemas = (page.schema || []).slice();

  if (page.breadcrumbs && page.breadcrumbs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: site.origin + '/' + crumb.href.replace(/^\//, '')
      }))
    });
  }

  const schemaTags = schemas
    .map((s: unknown) => `    <script type="application/ld+json">\n${jsonLd(s)}\n    </script>`)
    .join('\n');

  const breadcrumbNav =
    page.breadcrumbs && page.breadcrumbs.length > 1
      ? `<nav class="breadcrumbs" aria-label="Breadcrumb">
        <div class="container">
          <ol>
            ${page.breadcrumbs
              .map((crumb, i: number, arr: { name: string; href: string }[]) =>
                i === arr.length - 1
                  ? `<li aria-current="page">${esc(crumb.name)}</li>`
                  : `<li><a href="${esc(rel(crumb.href, depth))}">${esc(crumb.name)}</a></li>`
              )
              .join('\n            ')}
          </ol>
        </div>
      </nav>`
      : '';

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${esc(canonical)}" />
    ${page.noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />'}

    <meta property="og:type" content="${esc(page.type || 'website')}" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:locale" content="${esc(site.locale)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${esc(site.twitter)}" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <meta name="theme-color" content="#d96a2b" />

    <link rel="icon" href="${esc(rel('favicon.svg', depth))}" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="${esc(rel('favicon.svg', depth))}" />
    <link rel="manifest" href="${esc(rel('site.webmanifest', depth))}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${esc(rel('assets/css/styles.css', depth))}" />

    <script>
      /* Applies the stored theme before first paint so the page never flashes. */
      (function () {
        try {
          var saved = localStorage.getItem('kitchenlo-theme');
          var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {}
      })();
    </script>
${schemaTags}
  </head>
  <body class="${esc(page.bodyClass || '')}">
    ${headerMarkup(page.active || '', depth)}
    ${breadcrumbNav}
    <main id="main">
${page.body}
    </main>
    ${footerMarkup(depth)}

    <!-- Runtime config stays unbundled so keys can be changed without a rebuild. -->
    <script src="${esc(rel('assets/js/config.js', depth))}"></script>
    <script src="${esc(rel('assets/js/kitchenlo.js', depth))}" defer></script>
  </body>
</html>
`;
}

export { render, esc, rel, jsonLd, site };
