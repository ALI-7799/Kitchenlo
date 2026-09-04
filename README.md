# Kitchenlo

A recipe website for home cooks: 30 tested recipes with measured ingredients, real
timings and nutrition, plus saved recipes, a weekly meal planner and a shopping list.

Live site: <https://www.kitchenlo.com>

## How it works

The site is **statically generated**. Content lives in plain JavaScript data files,
and a generator renders every page to HTML in the repo root, which GitHub Pages
serves directly. There is no framework and no build toolchain — just Node.

The important consequence: **do not edit the generated `.html` files.** They are
overwritten on every build. Edit the data or the templates and rebuild.

```
node tools/build.js
```

That writes 54 pages plus `sitemap.xml`, `robots.txt`, `site.webmanifest` and
`favicon.svg`.

## Project layout

```
src/data/           Content — the source of truth
  site.js             Brand, navigation, footer, categories, filter facets
  recipes.js          Merges the collections, plus query/search helpers
  recipes-*.js        The three recipe collections (10 recipes each)
  guides.js           Six long-form cooking guides
src/templates/      Rendering
  layout.js           <head>, header, footer, SEO tags, JSON-LD wrapper
  components.js       Cards, stars, FAQ blocks and other shared fragments
  pages-core.js       Home, recipe index, categories, recipe and guide pages
  pages-static.js     About, contact, auth, account tools, legal, 404
tools/build.js      The generator
assets/css/         Stylesheet
assets/js/          Browser code (auth, store, per-page scripts)
```

Everything else in the repo root is generated output.

## Common tasks

**Add a recipe.** Append an object to the relevant `src/data/recipes-*.js` file,
matching the shape of the existing entries, then rebuild. It automatically gets a
page, structured data, a sitemap entry, and a place in search, the category page
and the meal planner.

**Change the navigation or footer.** Edit `nav` or `footer` in `src/data/site.js`
and rebuild. Every page updates, because the header and footer are defined once in
`src/templates/layout.js`.

**Change the design.** Edit `assets/css/styles.css`. Colours, spacing and radii are
CSS custom properties at the top of the file, with a full dark theme below them.
No rebuild needed for CSS-only changes.

## SEO

Built for recipe search from the ground up:

- Every recipe emits full `Recipe` structured data — ingredients, `HowToStep`
  instructions, ISO 8601 times, `AggregateRating` and `NutritionInformation` —
  which is what makes Google eligible to show rich recipe results.
- Every recipe and guide also emits `FAQPage` schema from its Q&A section.
- `BreadcrumbList` on every page; `WebSite` + `SearchAction` and `Organization` on
  the home page; `ItemList` on the index and category pages.
- Unique title, meta description and canonical URL per page, plus Open Graph and
  Twitter card tags.
- `sitemap.xml` with per-page `lastmod` and priority, referenced from `robots.txt`.
- Private pages (`account`, `login`, `signup`, `favorites`, `shopping-list`) are
  `noindex` and excluded from the sitemap.
- Images carry explicit `width`/`height` to avoid layout shift, lazy-load below the
  fold, and the recipe hero uses `fetchpriority="high"`.

## Accounts

`assets/js/auth.js` defines one provider interface with two implementations:

- **`LocalAuthProvider`** (active by default). Accounts live in the visitor's
  browser. Passwords are hashed with SHA-256 over a per-account random salt rather
  than stored as plain text.
- **`SupabaseAuthProvider`** (ready, not wired). Real server-side accounts.

Local mode works with zero setup, which is why it is the default, but it is
**demo-grade**: anything in `localStorage` is readable by any script on the origin,
there is no server verifying anything, and clearing site data deletes the account.
This is stated plainly on the signup page rather than hidden.

To switch to real accounts, follow the three steps in `assets/js/config.js`.

## Development

Any static server works. From the repo root:

```
npx serve .
# or
python -m http.server 8000
```

Open the site and hit `/` or `Ctrl/Cmd+K` to bring up search.

## Browser features

- Light and dark themes, following the system setting until manually overridden,
  applied before first paint so there is no flash.
- Live recipe search with faceted filters that deep-link via the query string
  (`recipes.html?diet=vegan&time=under-30`).
- Ingredient scaling from 1 to 12 servings, snapping to kitchen fractions.
- Saved recipes, a seven-day meal planner and a shopping list grouped by aisle.
  Anything saved while signed out is merged into the account on first sign-in.
- Print stylesheet that strips the chrome from recipe pages.
- Keyboard accessible throughout, with a skip link, visible focus rings, ARIA
  live regions on results, and `prefers-reduced-motion` respected.

## Licence

Content and code are copyright Kitchenlo. Recipe photography is from Unsplash under
the Unsplash licence.
