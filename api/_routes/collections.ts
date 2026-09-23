/**
 * GET /api/collections
 *
 * Curated collections, with each one resolved to the recipes it actually
 * contains. A collection is defined either by a filter or by an explicit slug
 * list — never both — which the CollectionSelector union enforces in
 * TypeScript and the collections_selector_is_exclusive constraint enforces in
 * the database. Resolving both forms here means callers do not have to know
 * which kind they are looking at.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import { assertMethod, cachePublic, json, withErrors } from '../_lib/http.js';
import { allCollections, allRecipes } from '../_lib/repo.js';
import type { RecipeRecord } from '../_lib/recipe-row.js';

interface Filter {
  diet?: string[];
  maxTime?: number;
}

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'GET');

  const [collections, recipes] = await Promise.all([allCollections(), allRecipes()]);

  cachePublic(res, 600);
  json(res, 200, {
    collections: collections.map((collection) => {
      const members = collection.slugs
        ? bySlugs(recipes, collection.slugs)
        : byFilter(recipes, (collection.filter ?? {}) as Filter);

      return {
        slug: collection.slug,
        title: collection.title,
        heading: collection.heading,
        description: collection.description,
        keywords: collection.keywords ?? [],
        image: collection.image,
        imageAlt: collection.image_alt,
        intro: collection.intro,
        faqs: collection.faqs,
        recipeCount: members.length,
        recipes: members.map((r) => ({
          slug: r.slug,
          title: r.title,
          image: r.image,
          totalMinutes: r.prepMinutes + r.cookMinutes
        }))
      };
    })
  });
});

/** Preserves the curated order rather than the order rows came back in. */
function bySlugs(recipes: RecipeRecord[], slugs: string[]): RecipeRecord[] {
  const index = new Map(recipes.map((r) => [r.slug, r]));
  return slugs.flatMap((slug) => {
    const recipe = index.get(slug);
    return recipe ? [recipe] : [];
  });
}

function byFilter(recipes: RecipeRecord[], filter: Filter): RecipeRecord[] {
  return recipes.filter((recipe) => {
    // Every listed tag must be present, matching the AND semantics the
    // collection pages already use.
    if (filter.diet?.length) {
      if (!filter.diet.every((tag) => recipe.diet.includes(tag as never))) return false;
    }
    if (filter.maxTime && recipe.prepMinutes + recipe.cookMinutes > filter.maxTime) {
      return false;
    }
    return true;
  });
}
