/**
 * Shared domain types.
 *
 * The distinction that matters here is between the shape a recipe is *authored*
 * in and the shape the rest of the site *consumes*. Authored recipes may leave
 * `image` null to request generated cover art; by the time anything renders one,
 * `image` and `fallbackImage` are both resolved. Keeping those as two types
 * means no template has to defensively check for a null image.
 */

export type CategorySlug =
  | 'quick-dinners'
  | 'healthy-food'
  | 'breakfast'
  | 'desserts'
  | 'comfort-food';

export type DietTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'high-protein'
  | 'high-fibre'
  | 'low-carb';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type SortKey = 'popular' | 'rating' | 'newest' | 'quickest' | 'az';

/** An ISO date, `YYYY-MM-DD`. Not enforceable by the type system, but documented. */
export type IsoDate = string;

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface IngredientGroup {
  group: string;
  items: string[];
}

export interface InstructionStep {
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** A recipe as written in src/data/recipes-*.ts. */
export interface RecipeSource {
  slug: string;
  title: string;
  description: string;
  intro: string;
  category: CategorySlug;
  cuisine: string;
  course: string;
  method: string;
  diet: DietTag[];
  keywords: string[];
  /** Absolute photo URL, or null to have cover art generated for it. */
  image: string | null;
  imageAlt: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  yieldText: string;
  difficulty: Difficulty;
  /** Placeholder until real reviews exist; see site.ratings in src/data/site.ts. */
  rating: number;
  ratingCount: number;
  datePublished: IsoDate;
  dateModified: IsoDate;
  nutrition: Nutrition;
  equipment: string[];
  ingredients: IngredientGroup[];
  instructions: InstructionStep[];
  tips: string[];
  variations: string[];
  storage: string;
  faqs: Faq[];
  /** Slugs of related recipes. Validated at build time. */
  related: string[];
}

/** A recipe after normalisation, which is what every template receives. */
export interface Recipe extends Omit<RecipeSource, 'image'> {
  image: string;
  /** Locally generated cover art, used as the image or as the load fallback. */
  fallbackImage: string;
  /** True when `image` is the generated art rather than a photograph. */
  generatedImage?: boolean;
}

export interface RecipeQuery {
  query?: string;
  category?: CategorySlug | null;
  diet?: DietTag[];
  maxTime?: number | null;
  difficulty?: Difficulty | null;
  sort?: SortKey;
  slugs?: string[];
}

/* ------------------------------------------------------------- guides ---- */

export type BlockType = 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'callout';

export type Block =
  | { type: 'p' | 'h2' | 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string };

export interface Guide {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readMinutes: number;
  datePublished: IsoDate;
  dateModified: IsoDate;
  keywords: string[];
  related: string[];
  body: Block[];
  faqs: Faq[];
}

/* -------------------------------------------------------- collections ---- */

/**
 * A collection is defined either by a filter or by an explicit slug list,
 * never both. The union makes the wrong combination a compile error.
 */
export type CollectionSelector =
  | { filter: { diet?: DietTag[]; maxTime?: number }; slugs?: never }
  | { slugs: string[]; filter?: never };

export type Collection = CollectionSelector & {
  slug: string;
  title: string;
  heading: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  intro: string[];
  faqs: Faq[];
};

/* -------------------------------------------------------------- site ----- */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Category {
  slug: CategorySlug;
  title: string;
  short: string;
  tagline: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  keywords: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  origin: string;
  /** Sub-path when served from GitHub Pages project URL, otherwise ''. */
  basePath: string;
  description: string;
  locale: string;
  twitter: string;
  ogImage: string;
  email: string;
  founded: string;
  /** While disabled, no aggregateRating is emitted and stars are hidden. */
  ratings: { enabled: boolean };
  author: { name: string; url: string };
  social: { label: string; href: string; icon: string }[];
  nav: NavItem[];
  footer: FooterColumn[];
  categories: Category[];
  filters: {
    time: { id: string; label: string; max: number }[];
    diet: { id: DietTag; label: string }[];
    difficulty: { id: Difficulty; label: string }[];
    sort: { id: SortKey; label: string }[];
  };
  stats: { value: string; label: string }[];
}

/* ------------------------------------------------------------- pages ----- */

export interface Breadcrumb {
  name: string;
  href: string;
}

/** Depth of a page below the site root; 'abs' links from the root instead. */
export type Depth = number | 'abs';

export interface PageSpec {
  /** Output path relative to the repo root, e.g. "recipes/shakshuka.html". */
  file: string;
  title: string;
  description: string;
  canonical: string;
  body: string;
  depth?: number;
  active?: string;
  image?: string;
  type?: string;
  bodyClass?: string;
  schema?: Record<string, unknown>[];
  noindex?: boolean;
  absolute?: boolean;
  breadcrumbs?: Breadcrumb[];
}
