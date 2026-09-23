# Kitchenlo

A recipe website for home cooks: 40 tested recipes with measured ingredients, real
timings and nutrition, plus saved recipes, a weekly meal planner and a shopping list.

Live site: <https://www.kitchenlo.com>

## How it works

The site is **statically generated from TypeScript**. Content lives in typed data
files, a generator renders every page to HTML in the repo root, and esbuild bundles
the client code into a single script. There is no framework.

The important consequence: **do not edit the generated `.html` files.** They are
overwritten on every build. Edit the data or the templates and rebuild.

```
npm install
npm run build      # typecheck, bundle, then generate
```

That writes 71 pages plus `sitemap.xml`, `robots.txt`, `site.webmanifest`,
`favicon.svg` and 40 cover images.

Individual steps, if you need them:

```
npm run typecheck  # tsc --noEmit, no output
npm run bundle     # esbuild -> assets/js/kitchenlo.js and .build/
npm run generate   # run the generator only
npm run dev        # esbuild in watch mode
```

### Tests

A smoke-test suite loads the generated pages in a real DOM, runs the bundled
browser code and drives the actual interactions: filtering, ingredient scaling,
form validation, the full signup and login lifecycle, the planner, the shopping
list and the image fallback.

```
npm test           # builds, then runs 207 checks
```

These tests deliberately go through the UI rather than reaching into internals.
The client exposes nothing on `window`, so the only way in is the way a visitor
comes in: click things and assert on what the page and `localStorage` hold.

## Project layout

```
src/
  types.ts            Domain types — the schema everything else is checked against
  data/               Content, the source of truth
    site.ts             Brand, navigation, footer, categories, filter facets
    recipes.ts          Merges the collections, plus query/search helpers
    recipes-*.ts        The four recipe collections (10 recipes each)
    collections.ts      Curated cross-cutting collections (diet, time, meal prep)
    guides.ts           Six long-form cooking guides
    videos.ts           Per-recipe videos, keyed by slug
    recipes-generated.ts  Pulled from the database; null until migrated
  templates/          Rendering, shared by the generator and the browser
    layout.ts           <head>, header, footer, SEO tags, JSON-LD wrapper
    components.ts       Cards, FAQ blocks and other shared fragments
    pages-core.ts       Home, recipe index, categories, recipe, guide, collections
    pages-static.ts     About, contact, auth, account tools, legal, 404
    placeholder.ts      Generated SVG cover art
  browser/            Client code, bundled into one script
    main.ts             Entry point; imports every page module
    app.ts              Theme, nav, search, saving, header account state
    auth.ts, store.ts, dom.ts
    pages/              One module per page, each guarding on its own elements
    analytics.ts        Anonymous view beacon
    search-api.ts       Backend search, used only to enrich the local results
  admin/              Admin dashboard, bundled separately from the public site
    main.ts             Sign-in, views, dashboard, Recipe of the Day
    editor.ts           The recipe editor
    api.ts, dom.ts
tools/
  build.ts            The generator
  bundle.mjs          esbuild driver
  smoke-test.mjs      DOM test suite (plain JS on purpose)
  migrate.ts          One-shot import of the authored content into Postgres
  pull.ts             Database -> src/data/recipes-generated.ts
api/
  [...route].ts       The only Serverless Function; dispatches every /api/* URL
  _lib/               Database, auth, validation, HTTP helpers
  _routes/            One module per endpoint, called by the dispatcher
db/schema.sql         Postgres schema
admin/index.html      Dashboard shell (noindex, disallowed in robots.txt)
assets/css/styles.css
assets/js/config.js     Runtime keys, deliberately unbundled
assets/js/kitchenlo.js  Build output, committed so the repo serves statically
assets/js/admin.js      Admin build output; never loaded by a public page
```

Everything else in the repo root is generated output.

### Why TypeScript

The recipe data is 40 objects of about 25 fields each, and nothing was enforcing
that shape. During the rebuild the collection list drifted between three files —
the Node loader, the browser loader and the page template — so the generator saw
40 recipes while the browser loaded 30 and silently dropped a whole category.

The types close that class of bug. `CategorySlug`, `DietTag` and `Difficulty` are
unions, so a typo is a compile error rather than a recipe that quietly vanishes
from every filter. `RecipeSource` and `Recipe` are separate types, so authored
recipes may leave `image` null while templates are guaranteed a resolved one.
`Collection` is a union that makes "filter and explicit slugs at once" unsayable.

Bundling closes the same class structurally: there is now exactly one collection
list, in `src/data/recipes.ts`, and the browser imports it rather than re-declaring
it in script tags. Pages went from 11 script tags to 2.

## Common tasks

**Add a recipe.** Append an object to the relevant `src/data/recipes-*.ts` file and
rebuild. TypeScript will tell you if a field is missing or misspelled. It
automatically gets a page, structured data, a sitemap entry, cover art, and a place
in search, its category page, the relevant collections and the meal planner.

**Add a category.** Add it to `CategorySlug` in `src/types.ts`, then to
`site.categories`. The compiler will point at everything else that needs updating.

**Add a recipe video.** Add one line to `src/data/videos.ts`, keyed by the recipe
slug, then rebuild. Every recipe already has a video panel beside its ingredients;
a recipe with no entry shows a "coming soon" placeholder, so videos can land one
at a time. Self-hosted files go in `assets/video/`, and YouTube or Vimeo links
work too — the file documents the three accepted shapes. A recipe with a video
also emits `VideoObject` structured data.

**Change the navigation or footer.** Edit `nav` or `footer` in `src/data/site.ts`
and rebuild. Every page updates, because both are defined once in
`src/templates/layout.ts`.

**Change the design.** Edit `assets/css/styles.css`; no rebuild needed. The header
comment states the five rules the system follows. The short version: structure
comes from hairline rules and space rather than drop shadows, corners are nearly
square, and every measurement comes from the spacing and type scales in section 1
rather than being typed by hand.

## SEO

Built for recipe search from the ground up:

- Every recipe emits full `Recipe` structured data — ingredients, `HowToStep`
  instructions, ISO 8601 times and `NutritionInformation` — which is what makes
  Google eligible to show rich recipe results. (`AggregateRating` is deliberately
  omitted; see below.)
- Every recipe, guide and collection also emits `FAQPage` schema.
- `BreadcrumbList` on every page; `WebSite` + `SearchAction` and `Organization` on
  the home page; `ItemList` on index, category and collection pages.
- Unique title, meta description and canonical URL per page, plus Open Graph and
  Twitter card tags.
- `sitemap.xml` with per-page `lastmod` and priority, referenced from `robots.txt`.
- Private pages (`account`, `login`, `signup`, `favorites`, `shopping-list`) are
  `noindex` and excluded from the sitemap.
- Images carry explicit `width`/`height` to avoid layout shift, lazy-load below the
  fold, and the recipe hero uses `fetchpriority="high"`.
- Six curated collection pages target long-tail queries the categories miss, each
  with original copy rather than a bare filtered list.

177 JSON-LD blocks across 71 pages, all validated on every build.

### A deliberate omission: star ratings

The `rating` and `ratingCount` fields are **placeholders, not real reviews**, so
`site.ratings.enabled` is `false` and no `aggregateRating` is published.

Marking up invented ratings violates Google's structured data and spam policies.
The downside is not merely losing the stars — it risks a manual action against the
whole domain, which would undo every other optimisation here. Recipe rich results
do not require a rating, so the pages remain fully eligible without one.

Once you are collecting genuine ratings from real users, set
`ratings: { enabled: true }` in `src/data/site.ts` and rebuild. That restores the
stars across the UI and adds `aggregateRating` back to the Recipe schema. The smoke
test asserts the schema and the flag agree, so they cannot drift.

## Images

Recipe photography is hotlinked from Unsplash. The ten breakfast recipes have no
photograph yet, so they carry `image: null` and the generator produces
deterministic SVG cover art in `assets/img/` instead, distinct per recipe and
derived from the slug. A duplicated stock photo or a hotlink that 404s is worse
than honest illustration.

To swap in a real photo, replace the `null` with a URL and rebuild.

Cover art is generated for **every** recipe, not just the ten without a photo. The
other 30 act as fallbacks: each `<img>` carries a `data-fallback`, and if a
hotlinked photo fails to load the browser swaps in that recipe's artwork rather
than showing a broken-image icon. Every photo points at a third-party host, so any
of them can vanish without warning. All 40 files together are about 40 KB.

Two of the original photos are reused across recipes (one appears on four), which
predates this rebuild and is worth fixing when you commission photography:

    photo-1488477181946  herbed-yogurt-bowl, berry-tartlets, berry-crumble, yogurt-parfait
    photo-1529042410759  quinoa-bowl, stuffed-peppers

## Accounts

`src/browser/auth.ts` defines one `AuthProvider` interface with two
implementations:

- **`LocalAuthProvider`** (active by default). Accounts live in the visitor's
  browser. Passwords are hashed with SHA-256 over a per-account random salt rather
  than stored as plain text.
- **`SupabaseAuthProvider`** (written, not wired). Real server-side accounts.

Local mode works with zero setup, which is why it is the default, but it is
**demo-grade**: anything in `localStorage` is readable by any script on the origin,
nothing server-side verifies a session, and clearing site data deletes the account.
This is stated plainly on the signup page rather than hidden.

To switch to real accounts, follow the steps in `assets/js/config.js`. That file is
deliberately left out of the bundle so keys can be changed without a rebuild.

## Backend

The site stays statically generated. The backend is an **authoring** layer, not a
rendering one: recipes live in Postgres and are edited through `/admin`, but every
public page is still pre-rendered at build time with its structured data, canonical
tag and sitemap entry exactly as before. Nothing a visitor loads goes through a
database.

```
admin edits  ->  Postgres  ->  "Publish"  ->  deploy hook  ->  npm run build
                                                                    |
                                                    npm run pull writes
                                                    src/data/recipes-generated.ts
                                                                    |
                                                    generator renders 87 pages
```

**Why not render recipe pages dynamically.** It would cost pre-rendered structured
data, a fast first byte, and the build-time validation that currently turns a typo
in a `related` list into a failed build rather than a live page with a hole in it.
There is no SEO upside to pay for that.

### Setup

1. Create a project at [supabase.com](https://supabase.com), then run
   `db/schema.sql` in the SQL editor.
2. Create a **public** Storage bucket named `recipe-images`.
3. `cp .env.example .env` and fill it in. Read the comments — the pooler
   connection string and the service-role key are both easy to get wrong.
4. Import the existing content and create your login:

   ```bash
   npm run migrate:check        # proves the round trip loses nothing, writes nothing
   npm run migrate -- --admin
   ```

5. Set the same variables in Vercel under **Settings → Environment Variables**,
   and create a deploy hook under **Settings → Git → Deploy Hooks** for
   `VERCEL_DEPLOY_HOOK_URL`.

### The fallback that keeps deploys safe

`src/data/recipes-generated.ts` is committed, and the build reads it. `npm run pull`
refreshes it from the database; if the database is unreachable, unconfigured, or
returns nothing, pull leaves the file alone and the build continues from the last
good copy. So a clone with no credentials still builds the whole site, and a
database outage cannot break a deploy.

Until the first migration is run that file exports `null` and the site builds from
the hand-authored `recipes-*.ts` files — byte for byte what it built before.

### API

| Route | |
| --- | --- |
| `GET /api/recipes` | List, with the same facets the index page uses |
| `GET /api/recipes/:slug` | One recipe in full |
| `POST /api/recipes` | Create (admin) |
| `PUT /api/recipes/:slug` | Update (admin) |
| `DELETE /api/recipes/:slug` | Delete (admin) |
| `GET /api/categories` | Categories with live recipe counts |
| `GET /api/collections` | Collections, resolved to their members |
| `GET /api/recipe-of-the-day` | Today's recipe and when it changes |
| `GET /api/search?q=` | Ranked full-text search |
| `POST /api/track` | Anonymous view counter |

### One function, not fourteen

Vercel turns every non-underscore file under `api/` into its own Serverless
Function, and the Hobby plan allows twelve. Fourteen route files exceeded that
on their own — and the `functions` glob in `vercel.json` was originally written
as `api/**/*.ts`, which also matched the eight helpers in `api/_lib/`. Naming a
path in `functions` opts it *in* as a function source, overriding the rule that
underscore-prefixed files are skipped, so the deployment tried to create
twenty-two functions, eight of which were modules with no handler at all.

So `api/[...route].ts` is now the only routable file. It holds the URL table
and dispatches to a handler in `api/_routes/`, which is underscore-prefixed and
therefore unreachable as a route. Every URL is unchanged, every handler is
unchanged, and the count is **1**.

Consolidating also suits the plan: one warm instance serves every endpoint, so
there are fewer cold starts than when each route warmed up separately, and
since the handlers already shared `api/_lib/` the bundle is barely larger than
any single one of them was.

The dispatch table is the one thing this arrangement makes fragile — a mistyped
key silently 404s an endpoint the dashboard needs, where per-file routing made
that impossible. `npm test` therefore calls all fourteen routes with a method
none of them accept: a 405 proves the dispatcher found the handler and ran it,
while opening no database connection. A 404 means it is not wired up.

### Recipe of the Day

Unchanged, and still computed rather than stored: `pickForDay()` derives the pick
from the calendar date in the site's own timezone, so every visitor sees the same
recipe, a refresh cannot change it, and it turns over at local midnight. The API
runs the identical function, so it cannot disagree with the built page. The only
stored state is an optional admin pin for a specific date.

### Search

The recipe index still searches the bundled library first, so results are instant
and work offline. The API adds relevance ranking and tolerance for a misspelling on
top, and is only allowed to *add* matches the local pass missed — never to remove
one. If `/api/search` is slow, rate-limited or not deployed, the page behaves
exactly as it does today and the visitor sees nothing amiss.

### Videos

Each recipe carries its own video URL, set in the admin. A recipe without one
renders the existing "Video coming soon" panel — the same graceful state
`src/data/videos.ts` already produced for a missing entry, never an error or an
empty frame. YouTube and Vimeo links are embedded; any other https URL is played
directly.

### Analytics

`page_views` holds a path, a date, a coarse referrer bucket and a counter — that is
the entire record. No cookie, no visitor id, no IP, no user agent, no timestamp
finer than the day. Two people reading the same recipe increment the same row and
are not distinguishable afterwards. Do Not Track and Global Privacy Control are
both honoured client-side.

### Security

- Admin passwords: scrypt (N=32768), never reversible, never in the bundle.
- Sessions: server-side rows; the cookie holds a random id, stored only as its
  SHA-256. `HttpOnly`, `Secure`, `SameSite=Strict`. Signing out revokes instantly.
- Login: per-account lockout after 5 failures, plus a uniform response time so the
  endpoint cannot be used to discover which addresses are admins.
- Every query is a parameterised tagged template; no SQL is ever concatenated.
- Uploads are validated by magic bytes, not by filename or declared type, so a
  `.jpg` that is really an SVG is rejected rather than served back as a scriptable
  document on the site's own origin.
- `/admin` is `noindex`, disallowed in `robots.txt`, and carries a CSP.
- Secrets live only in environment variables. The public bundle reads none.

## Deployment

> **The custom domain is not connected yet.** `www.kitchenlo.com` resolves to a
> Namecheap parking page. Canonical URLs, Open Graph tags and `sitemap.xml` all
> point at that domain, so search engines will not index the site correctly until
> it is attached to whichever host you are using.

`origin` and `basePath` at the top of `src/data/site.ts` drive every canonical URL,
share tag and sitemap entry. Set them to match wherever the site actually answers,
then rebuild.

### Vercel (current host)

`vercel.json` is configured already. The generator writes into the repo root rather
than a `dist` directory, so `outputDirectory` is `"."`; Vercel's "Other" preset
would otherwise look for `public/`.

Two things to know:

- `engines.node` must be a **pinned major** such as `"22.x"`. Vercel rejects ranges
  like `">=18"` and aborts before the build starts.
- `cleanUrls` is deliberately off. Every internal link is written with an explicit
  `.html`, so enabling it would 301-redirect all of them.

To attach the domain: **Project → Settings → Domains**, add `www.kitchenlo.com`,
then replace the parking records at Namecheap with what Vercel shows you, normally:

| Type  | Host  | Value                   |
| ----- | ----- | ----------------------- |
| A     | `@`   | `76.76.21.21`           |
| CNAME | `www` | `cname.vercel-dns.com.` |

TLS is issued automatically once DNS propagates. Leave `origin` as
`https://www.kitchenlo.com` and no rebuild is needed.

If you would rather stay on the `.vercel.app` URL for now, set `origin` to it and
rebuild, so canonicals point somewhere that actually serves the site.

### GitHub Pages (alternative)

Works too, since the generated HTML and the bundle are both committed. Enable
**Settings → Pages → Deploy from branch → `main` / root**. For the project URL
rather than a custom domain, set:

```ts
const origin = 'https://ali-7799.github.io';
const basePath = '/Kitchenlo';
```

and rebuild. For a custom domain on Pages the DNS records differ from Vercel's:
four A records pointing at `185.199.108-111.153` plus a `www` CNAME to
`ali-7799.github.io.`. Do not point the domain at both hosts at once.

## Browser features

- Light and dark themes, following the system setting until overridden, applied
  before first paint so there is no flash.
- Live recipe search with faceted filters that deep-link via the query string
  (`recipes.html?diet=vegan&time=under-30`).
- Ingredient scaling from 1 to 12 servings, snapping to kitchen fractions.
  Bracketed metric conversions scale with the quantity, while per-item sizes
  (`170 g each`) and percentages deliberately do not.
- Saved recipes, a seven-day meal planner and an aisle-grouped shopping list.
  Anything saved while signed out is merged into the account on first sign-in.
- Print stylesheet that strips the chrome from recipe pages.
- Sharing on every recipe page: the device share sheet where the browser has
  one, WhatsApp, Facebook and Pinterest otherwise, and a copy-link fallback.
  The links are generated with the canonical URL and rewritten in the browser to
  the address actually being viewed, so a link shared from a preview host or a
  project subpath still points at the page the visitor was reading.
- Keyboard accessible throughout: skip link, visible focus rings, ARIA live
  regions on results, `/` or `Ctrl/Cmd+K` for search, and `prefers-reduced-motion`
  respected.

## Licence

Content and code are copyright Kitchenlo. Recipe photography is from Unsplash under
the Unsplash licence.
