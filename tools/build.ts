#!/usr/bin/env node
/**
 * KIT static site generator.
 *
 * Reads src/data/*, renders every page through src/templates/* and writes the
 * result to the repo root so GitHub Pages can serve it directly. Also emits
 * sitemap.xml, robots.txt, the web manifest and the favicon.
 *
 * Usage: node tools/build.js
 */
import fs from 'node:fs';
import path from 'node:path';

import { render } from '../src/templates/layout.js';
import * as core from '../src/templates/pages-core.js';
import * as statics from '../src/templates/pages-static.js';
import * as Recipes from '../src/data/recipes.js';
import guides from '../src/data/guides.js';
import collections from '../src/data/collections.js';
import site from '../src/data/site.js';
import { placeholderSvg } from '../src/templates/placeholder.js';
import type { PageSpec } from '../src/types.js';

const ROOT = path.resolve(import.meta.dirname, '..');

function write(relPath: string, contents: string): string {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  return relPath;
}

/* ------------------------------------------------------------ collect ---- */

const pages: PageSpec[] = [
  core.home(),
  core.recipesIndex(),
  core.categoriesIndex(),
  core.guidesIndex(),
  statics.about(),
  statics.contact(),
  statics.login(),
  statics.signup(),
  statics.account(),
  statics.favorites(),
  statics.mealPlanner(),
  statics.shoppingList(),
  statics.privacy(),
  statics.terms(),
  statics.notFound()
];

site.categories.forEach((cat) => pages.push(core.categoryPage(cat)));
collections.forEach((collection) => pages.push(core.collectionPage(collection)));
Recipes.all.forEach((recipe) => pages.push(core.recipePage(recipe)));
guides.forEach((guide) => pages.push(core.guidePage(guide)));

/* ------------------------------------------------- generated cover art --- */

// Art is written for every recipe: as the image where there is no photograph,
// and as the browser fallback where a hotlinked photo might fail.
Recipes.all.forEach((recipe) => write(recipe.fallbackImage, placeholderSvg(recipe)));
const generated = Recipes.all.filter((r) => r.generatedImage);

/* -------------------------------------------------------------- render --- */

const written = pages.map((page) => write(page.file, render(page)));

/* ------------------------------------------------------------- sitemap --- */

const today = new Date().toISOString().slice(0, 10);

/** Pages excluded from the sitemap: private tools and error pages. */
const excluded = new Set([
  '404.html',
  'login.html',
  'signup.html',
  'account.html',
  'favorites.html',
  'shopping-list.html'
]);

function priorityFor(file: string): string {
  if (file === 'index.html') return '1.0';
  if (file === 'recipes.html' || file === 'categories.html') return '0.9';
  if (file.startsWith('recipes/') || file.startsWith('category/')) return '0.8';
  if (file.startsWith('collection/')) return '0.8';
  if (file.startsWith('guides/') || file === 'guides.html') return '0.7';
  return '0.5';
}

function lastModFor(page: PageSpec): string {
  const recipe = Recipes.bySlug(path.basename(page.file, '.html'));
  if (recipe && page.file.startsWith('recipes/')) return recipe.dateModified;
  const guide = guides.find((g) => page.file === `guides/${g.slug}.html`);
  if (guide) return guide.dateModified;
  return today;
}

const urls = pages
  .filter((p: PageSpec) => !excluded.has(p.file))
  .map((p: PageSpec) => {
    const loc = site.origin + '/' + (p.file === 'index.html' ? '' : p.file);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModFor(p)}</lastmod>
    <changefreq>${p.file === 'index.html' ? 'daily' : 'weekly'}</changefreq>
    <priority>${priorityFor(p.file)}</priority>
  </url>`;
  })
  .join('\n');

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

/* -------------------------------------------------------------- robots --- */

write(
  'robots.txt',
  `# ${site.name}
User-agent: *
Allow: /
Disallow: /account.html
Disallow: /login.html
Disallow: /signup.html
Disallow: /favorites.html
Disallow: /shopping-list.html

Sitemap: ${site.origin}/sitemap.xml
`
);

/* ------------------------------------------------------------ manifest --- */

write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      description: site.description,
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#f7f2ea',
      theme_color: '#d96a2b',
      icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }]
    },
    null,
    2
  ) + '\n'
);

/* ------------------------------------------------------------- favicon --- */

write(
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#d96a2b"/>
  <path d="M10 8v9a3 3 0 0 0 3 3v5m0-17v7m3-7v7M22 8c-1.6 1.6-2.2 4.2-2.2 6.3 0 1.6.7 2.7 2.2 2.7v8"
        fill="none" stroke="#fffdf9" stroke-width="2.2" stroke-linecap="round"/>
</svg>
`
);

/* --------------------------------------------------------------- done ---- */

const counts = {
  recipes: Recipes.all.length,
  categories: site.categories.length,
  guides: guides.length
};

console.log(`KIT build complete`);
console.log(`  ${written.length} pages written`);
console.log(`    ${counts.recipes} recipe pages`);
console.log(`    ${counts.categories} category pages`);
console.log(`    ${counts.guides} guide pages`);
console.log(`    ${written.length - counts.recipes - counts.categories - counts.guides} other pages`);
console.log(`  sitemap.xml with ${pages.length - excluded.size} URLs`);
console.log(`  robots.txt, site.webmanifest, favicon.svg`);
console.log(`  ${Recipes.all.length} cover images (${generated.length} used directly, rest as photo fallbacks)`);
