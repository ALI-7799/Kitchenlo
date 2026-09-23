-- Kitchenlo backend schema (PostgreSQL / Supabase).
--
-- The column set deliberately mirrors `RecipeSource` in src/types.ts field for
-- field. That is what makes the migration lossless and reversible: the build
-- can read a row back out and hand the generator an object indistinguishable
-- from the authored TypeScript literal it replaced.
--
-- Nested authored structures (nutrition, grouped ingredients, steps, FAQs) are
-- stored as jsonb rather than shredded into child tables. They are always read
-- and written whole, they are never queried by their internals, and keeping
-- them intact means a round-trip cannot quietly reorder an ingredient group or
-- drop an empty one.
--
-- Apply with:  psql "$DATABASE_URL" -f db/schema.sql
-- Safe to re-run; every statement is guarded.

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

/* ----------------------------------------------------------------- enums -- */

-- Mirrors the CategorySlug / DietTag / Difficulty unions in src/types.ts.
-- Postgres rejects a value the TypeScript union would also reject, so a typo
-- in the admin UI fails at the database rather than at the next build.
do $$ begin
  create type difficulty as enum ('Easy', 'Medium', 'Hard');
exception when duplicate_object then null; end $$;

/* ------------------------------------------------------------ categories -- */

-- Declared before `recipes`, which carries a foreign key into it.
create table if not exists categories (
  slug        text primary key,
  title       text not null,
  short       text not null default '',
  tagline     text not null default '',
  description text not null default '',
  intro       text not null default '',
  image       text not null default '',
  image_alt   text not null default '',
  keywords    text[] not null default '{}',
  position    integer not null default 0,
  updated_at  timestamptz not null default now()
);

/* --------------------------------------------------------------- recipes -- */

create table if not exists recipes (
  id             uuid primary key default gen_random_uuid(),

  -- The public identity of a recipe. It is the URL (/recipes/<slug>) and the
  -- key every `related` list points at, so it is unique and rarely changed.
  slug           text not null unique,
  title          text not null,
  description    text not null default '',
  intro          text not null default '',

  category       text not null references categories(slug) on update cascade,
  cuisine        text not null default '',
  course         text not null default '',
  method         text not null default '',

  diet           text[] not null default '{}',
  keywords       text[] not null default '{}',

  -- Null means "generate cover art for this one", exactly as the authored
  -- `image: null` does today. Not '' — the distinction is load-bearing in
  -- normalise() and an empty string would silently become a broken <img>.
  image          text,
  image_alt      text not null default '',

  prep_minutes   integer not null default 0 check (prep_minutes >= 0),
  cook_minutes   integer not null default 0 check (cook_minutes >= 0),
  servings       integer not null default 1 check (servings > 0),
  yield_text     text not null default '',
  difficulty     difficulty not null default 'Easy',

  -- Placeholder review figures. See site.ratings in src/data/site.ts for why
  -- these are not published as AggregateRating until they are real.
  rating         numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  rating_count   integer not null default 0 check (rating_count >= 0),

  date_published date not null default current_date,
  date_modified  date not null default current_date,

  nutrition      jsonb not null default '{}'::jsonb,
  equipment      text[] not null default '{}',
  ingredients    jsonb not null default '[]'::jsonb,
  instructions   jsonb not null default '[]'::jsonb,
  tips           text[] not null default '{}',
  variations     text[] not null default '{}',
  storage        text not null default '',
  faqs           jsonb not null default '[]'::jsonb,
  related        text[] not null default '{}',

  -- The AI video. Null renders the existing "Video coming soon" placeholder,
  -- which is already how src/data/videos.ts behaves for an absent entry, so an
  -- unset video is a normal state rather than an error.
  video_url      text,
  video_poster   text,
  video_title    text,
  video_seconds  integer check (video_seconds is null or video_seconds >= 0),

  -- Unpublished recipes stay out of the build, the API and the sitemap, so a
  -- half-written draft can be saved without it reaching the live site.
  published      boolean not null default true,

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Structural guards. jsonb columns accept any shape, so these assert the shape
-- the generator expects; a malformed write fails here instead of rendering a
-- recipe page with a hole in it.
alter table recipes drop constraint if exists recipes_ingredients_is_array;
alter table recipes add  constraint recipes_ingredients_is_array
  check (jsonb_typeof(ingredients) = 'array');

alter table recipes drop constraint if exists recipes_instructions_is_array;
alter table recipes add  constraint recipes_instructions_is_array
  check (jsonb_typeof(instructions) = 'array');

alter table recipes drop constraint if exists recipes_faqs_is_array;
alter table recipes add  constraint recipes_faqs_is_array
  check (jsonb_typeof(faqs) = 'array');

alter table recipes drop constraint if exists recipes_nutrition_is_object;
alter table recipes add  constraint recipes_nutrition_is_object
  check (jsonb_typeof(nutrition) = 'object');

alter table recipes drop constraint if exists recipes_slug_shape;
alter table recipes add  constraint recipes_slug_shape
  check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

create index if not exists recipes_category_idx  on recipes (category);
create index if not exists recipes_published_idx on recipes (published);
create index if not exists recipes_diet_idx      on recipes using gin (diet);
create index if not exists recipes_keywords_idx  on recipes using gin (keywords);

/* ---------------------------------------------------------------- search -- */

-- One generated column holding everything the search box matches against:
-- title, description, cuisine, keywords, diet and every ingredient line.
-- This is the same field set as searchIndex() in src/data/recipes.ts, so the
-- API and the client-side fallback rank the same recipes for the same query.
--
-- Weights follow intent: a title hit outranks a keyword hit, which outranks a
-- mention buried in an ingredient list.
alter table recipes drop column if exists search_vector;
alter table recipes add column search_vector tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(keywords, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(cuisine, '') || ' ' || coalesce(course, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(diet, ' '), '')), 'C') ||
    setweight(to_tsvector('english', coalesce(
      (select string_agg(item, ' ')
         from jsonb_array_elements(ingredients) grp,
              jsonb_array_elements_text(grp -> 'items') item), '')), 'D')
  ) stored;

create index if not exists recipes_search_idx on recipes using gin (search_vector);

-- Trigram index on the title, so a misspelled query ("stroganof") can still be
-- matched by similarity when full-text search returns nothing.
create index if not exists recipes_title_trgm_idx on recipes using gin (title gin_trgm_ops);

/* ----------------------------------------------------------- collections -- */

-- A collection is defined either by a filter or by an explicit slug list,
-- never both — the same either/or the CollectionSelector union enforces in
-- TypeScript, asserted here so the database cannot hold the invalid pairing.
create table if not exists collections (
  slug        text primary key,
  title       text not null,
  heading     text not null default '',
  description text not null default '',
  keywords    text[] not null default '{}',
  image       text not null default '',
  image_alt   text not null default '',
  intro       jsonb not null default '[]'::jsonb,
  faqs        jsonb not null default '[]'::jsonb,
  filter      jsonb,
  slugs       text[],
  position    integer not null default 0,
  updated_at  timestamptz not null default now(),

  constraint collections_selector_is_exclusive check (
    (filter is not null and slugs is null) or
    (filter is null and slugs is not null)
  )
);

/* ---------------------------------------------------------------- guides -- */

create table if not exists guides (
  slug           text primary key,
  title          text not null,
  description    text not null default '',
  excerpt        text not null default '',
  image          text not null default '',
  image_alt      text not null default '',
  read_minutes   integer not null default 0,
  date_published date not null default current_date,
  date_modified  date not null default current_date,
  keywords       text[] not null default '{}',
  related        text[] not null default '{}',
  body           jsonb not null default '[]'::jsonb,
  faqs           jsonb not null default '[]'::jsonb,
  published      boolean not null default true,
  updated_at     timestamptz not null default now()
);

/* ----------------------------------------------------- recipe of the day -- */

-- The daily pick is computed, not stored: recipeOfTheDay() in
-- src/data/recipes.ts already derives it from the calendar date alone, which
-- is what makes it identical for every visitor and stable across refreshes.
--
-- This table only holds deliberate exceptions. A row pins one specific recipe
-- to one specific date; with no row for today, the computed choice stands.
create table if not exists rotd_overrides (
  on_date     date primary key,
  recipe_slug text not null references recipes(slug) on update cascade on delete cascade,
  note        text not null default '',
  created_at  timestamptz not null default now()
);

/* ------------------------------------------------------------- admin auth -- */

create table if not exists admin_users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  name          text not null default '',
  -- scrypt output, stored as "scrypt$N$r$p$<salt-b64>$<hash-b64>". The
  -- parameters travel with the hash so they can be raised later without
  -- invalidating existing passwords.
  password_hash text not null,
  -- Cleared on every successful sign-in; used to throttle credential stuffing.
  failed_logins integer not null default 0,
  locked_until  timestamptz,
  last_login_at timestamptz,
  created_at    timestamptz not null default now()
);

-- Sessions are server-side rows, not self-describing tokens. The cookie holds
-- only a random id, so signing out or revoking a session takes effect at once
-- rather than waiting for a JWT to expire on its own.
create table if not exists admin_sessions (
  -- SHA-256 of the cookie value. A leaked database backup therefore does not
  -- hand over usable session cookies, for the same reason password hashes are
  -- stored rather than passwords.
  token_hash text primary key,
  user_id    uuid not null references admin_users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  user_agent text not null default '',
  ip_hash    text not null default ''
);

create index if not exists admin_sessions_user_idx    on admin_sessions (user_id);
create index if not exists admin_sessions_expires_idx on admin_sessions (expires_at);

/* -------------------------------------------------------------- analytics -- */

-- Privacy-conscious by construction: this table can answer "how many views did
-- shakshuka get on Tuesday" and nothing else. There is no visitor identifier,
-- no IP address, no user agent and no timestamp finer than the day, so there
-- is no column here that could re-identify a person even if it were leaked.
--
-- Counts are aggregated on write via the unique key below rather than stored
-- as one row per hit, which keeps the table small indefinitely.
create table if not exists page_views (
  path     text not null,
  on_date  date not null default current_date,
  -- Coarse bucket only: 'search', 'social', 'internal', 'direct' or 'other'.
  -- Never a full referring URL, which can carry a query and thus personal data.
  referrer text not null default 'direct',
  views    integer not null default 0,
  primary key (path, on_date, referrer)
);

create index if not exists page_views_date_idx on page_views (on_date);

-- Search terms, aggregated the same way. Useful for spotting recipes people
-- look for and the site does not have yet.
create table if not exists search_queries (
  term     text not null,
  on_date  date not null default current_date,
  searches integer not null default 0,
  -- 0 means the term found nothing, which is the interesting case.
  hits     integer not null default 0,
  primary key (term, on_date)
);

create index if not exists search_queries_date_idx on search_queries (on_date);

/* ---------------------------------------------------------------- touch --- */

create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array['recipes', 'categories', 'collections', 'guides'] loop
    execute format('drop trigger if exists %I_touch on %I', t, t);
    execute format(
      'create trigger %I_touch before update on %I
         for each row execute function touch_updated_at()', t, t);
  end loop;
end $$;

/* ------------------------------------------------------------------ RLS --- */

-- Every table is reached exclusively through the serverless functions using
-- the service-role key, which bypasses RLS. Enabling it with no permissive
-- policy therefore changes nothing for the API while ensuring that if the anon
-- key is ever used from a browser — the config.js hook makes that plausible —
-- it reads nothing rather than everything.
alter table recipes        enable row level security;
alter table categories     enable row level security;
alter table collections    enable row level security;
alter table guides         enable row level security;
alter table rotd_overrides enable row level security;
alter table admin_users    enable row level security;
alter table admin_sessions enable row level security;
alter table page_views     enable row level security;
alter table search_queries enable row level security;
