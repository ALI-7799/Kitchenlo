# Kitchenlo

A recipe website for home cooks: 40 tested recipes with measured ingredients, real
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

That writes 71 pages plus `sitemap.xml`, `robots.txt`, `site.webmanifest` and
`favicon.svg`.

There is a smoke-test suite that loads the generated pages in a real DOM, runs the
browser scripts and drives the actual interactions — filtering, ingredient
scaling, form validation, the full signup/login lifecycle, the planner and the
shopping list. Run it after any change:

```
npm install        # once, for jsdom
npm test           # builds, then runs 99 checks
```

## Project layout

```
src/data/           Content — the source of truth
  site.js             Brand, navigation, footer, categories, filter facets
  recipes.js          Merges the collections, plus query/search helpers
  recipes-*.js        The four recipe collections (10 recipes each)
  collections.js      Curated cross-cutting collections (diet, time, meal prep)
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

**Change the design.** Edit `assets/css/styles.css`. No rebuild needed for
CSS-only changes. The header comment states the five rules the system follows;
the short version is that structure comes from hairline rules and space rather
than drop shadows, corners are nearly square, and every measurement comes from
the spacing and type scales in section 1 rather than being typed by hand.

## SEO

Built for recipe search from the ground up:

- Every recipe emits full `Recipe` structured data — ingredients, `HowToStep`
  instructions, ISO 8601 times and `NutritionInformation` — which is what makes
  Google eligible to show rich recipe results. (`AggregateRating` is deliberately
  omitted; see below.)
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
- Six curated collection pages target long-tail queries the categories miss, each
  with original copy rather than a bare filtered list.

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

## Images

Recipe photography is hotlinked from Unsplash. The ten breakfast recipes have no
photograph yet, so they carry `image: null` and the generator produces
deterministic SVG cover art in `assets/img/` instead — distinct per recipe,
derived from the slug. This is deliberate: a duplicated stock photo or a hotlink
that 404s is worse than honest illustration.

To swap in a real photo, replace the `null` with a URL and rebuild.

Cover art is generated for **every** recipe, not just the ten without a photo.
The extra 30 act as fallbacks: each `<img>` carries a `data-fallback`, and if a
hotlinked photo fails to load the browser swaps in that recipe's artwork instead
of showing a broken-image icon. Every photo on this site points at a third-party
host, so any of them can disappear without warning. All 40 files together are
about 40 KB.

Two of the original photos are also reused across recipes (one appears on four),
which predates this rebuild and is worth fixing when you commission photography:

    photo-1488477181946  herbed-yogurt-bowl, berry-tartlets, berry-crumble, yogurt-parfait
    photo-1529042410759  quinoa-bowl, stuffed-peppers

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

> **The custom domain is not connected yet.** `www.kitchenlo.com` resolves to a
> Namecheap parking page. Canonical URLs, Open Graph tags and `sitemap.xml` all
> point at that domain, so search engines will not index the site correctly until
> it is attached to whichever host you are using.

`origin` and `basePath` at the top of `src/data/site.ts` drive every canonical
URL, share tag and sitemap entry. Set them to match wherever the site actually
answers, then rebuild.

### Vercel (current host)

`vercel.json` is configured already. The generator writes into the repo root
rather than a `dist` directory, so `outputDirectory` is `"."`; Vercel's "Other"
preset would otherwise look for `public/`.

Two things to know:

- `engines.node` must be a **pinned major** such as `"22.x"`. Vercel rejects
  ranges like `">=18"` and aborts before the build starts.
- `cleanUrls` is deliberately off. Every internal link is written with an
  explicit `.html`, so enabling it would 301-redirect all of them.

To attach the domain: **Project → Settings → Domains**, add `www.kitchenlo.com`,
then replace the parking records at Namecheap with what Vercel shows you, which
is normally:

| Type  | Host  | Value                   |
| ----- | ----- | ----------------------- |
| A     | `@`   | `76.76.21.21`           |
| CNAME | `www` | `cname.vercel-dns.com.` |

TLS is issued automatically once DNS propagates. Leave `origin` as
`https://www.kitchenlo.com` and no rebuild is needed.

If you would rather stay on the `.vercel.app` URL for now, set `origin` to it
and rebuild, so canonicals point somewhere that actually serves the site.

### GitHub Pages (alternative)

Works too, since the generated HTML is committed. Enable **Settings → Pages →
Deploy from branch → `main` / root**. For the project URL rather than a custom
domain, set:

```ts
const origin = 'https://ali-7799.github.io';
const basePath = '/Kitchenlo';
```

and rebuild. For a custom domain on Pages the DNS records are different from
Vercel's: four A records pointing at `185.199.108-111.153` plus a `www` CNAME to
`ali-7799.github.io.`. Do not point the domain at both hosts at once.

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
