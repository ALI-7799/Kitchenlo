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
npm run build      # node tools/build.js
```

That writes 54 pages plus `sitemap.xml`, `robots.txt`, `site.webmanifest` and
`favicon.svg`.

There is a smoke-test suite that loads the generated pages in a real DOM, runs the
browser scripts and drives the actual interactions — filtering, ingredient
scaling, form validation, the full signup/login lifecycle, the planner and the
shopping list. Run it after any change:

```
npm install        # once, for jsdom
npm test           # builds, then runs 79 checks
```

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

### A deliberate omission: star ratings

The `rating` and `ratingCount` fields in the recipe data are **placeholders, not
real reviews**, so `site.ratings.enabled` is `false` and no `aggregateRating` is
published.

Marking up invented ratings is a direct violation of Google's structured data and
spam policies. The downside is not merely losing the stars — it risks a manual
action against the whole domain, which would undo every other optimisation here.
Recipe rich results do not require a rating, so the pages remain fully eligible
without one.

Once you are collecting genuine ratings from real users, set
`ratings: { enabled: true }` in `src/data/site.js` and rebuild. That restores the
stars across the UI and adds `aggregateRating` back to the Recipe schema.
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

## Deployment

> **The custom domain is not connected yet.** As of the last build,
> `www.kitchenlo.com` resolves to a Namecheap parking page, not to GitHub Pages.
> Canonical URLs, Open Graph tags and `sitemap.xml` all point at that domain, so
> search engines will not index the site correctly until DNS is pointed at GitHub.

Two supported setups. Whichever you choose, set `origin` and `basePath` at the top
of `src/data/site.js` to match, then rebuild — those two values drive every
canonical URL, share tag and sitemap entry.

### Option A — custom domain (what the config currently assumes)

```js
var origin = 'https://www.kitchenlo.com';
var basePath = '';
```

At your DNS provider (Namecheap), replace the parking records with:

| Type  | Host  | Value                  |
| ----- | ----- | ---------------------- |
| A     | `@`   | `185.199.108.153`      |
| A     | `@`   | `185.199.109.153`      |
| A     | `@`   | `185.199.110.153`      |
| A     | `@`   | `185.199.111.153`      |
| CNAME | `www` | `ali-7799.github.io.`  |

Then in the repo: **Settings → Pages → Custom domain**, enter `www.kitchenlo.com`
and save. GitHub commits a `CNAME` file for you and issues a TLS certificate once
DNS propagates (minutes to a few hours). Tick **Enforce HTTPS** afterwards.

No `CNAME` file is committed here deliberately — adding one before DNS is ready
would redirect the working `github.io` address to a parked domain and take the
site offline.

### Option B — GitHub Pages project URL (works immediately)

```js
var origin = 'https://ali-7799.github.io';
var basePath = '/Kitchenlo';
```

Rebuild, commit, and enable **Settings → Pages → Deploy from branch → `main` / root**.
The site is then live at `https://ali-7799.github.io/Kitchenlo/` with correct
canonicals. Switch to Option A whenever the domain is ready.

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
