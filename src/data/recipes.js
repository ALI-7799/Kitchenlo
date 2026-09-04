/**
 * Merges every recipe collection into a single array and exposes the lookup
 * helpers that both the generator and the browser rely on.
 *
 * In Node the collections are require()d; in the browser they are expected to
 * have been loaded already as <script> tags that populate window.KITCHENLO_DATA.
 */
(function (root, factory) {
  /**
   * The one place collections are registered. `file` is what the generator
   * loads and what layout.js emits as a script tag; `key` is the property each
   * collection sets on window.KITCHENLO_DATA in the browser. Adding a
   * collection means adding one line here and nothing else.
   */
  var COLLECTIONS = [
    { file: './recipes-quick-dinners.js', key: 'quickDinners' },
    { file: './recipes-healthy-food.js', key: 'healthyFood' },
    { file: './recipes-breakfast.js', key: 'breakfast' },
    { file: './recipes-desserts.js', key: 'desserts' }
  ];

  if (typeof module === 'object' && module.exports) {
    var api = factory(
      COLLECTIONS.map(function (c) {
        return require(c.file);
      })
    );
    api.COLLECTION_FILES = COLLECTIONS.map(function (c) {
      return c.file.replace('./', 'src/data/');
    });
    module.exports = api;
  } else {
    var data = root.KITCHENLO_DATA || {};
    root.Kitchenlo = factory(
      COLLECTIONS.map(function (c) {
        return data[c.key] || [];
      })
    );
    root.KITCHENLO_RECIPES = root.Kitchenlo.all;
  }
})(typeof self !== 'undefined' ? self : this, function (collections) {
  var all = collections.reduce(function (acc, list) {
    return acc.concat(list);
  }, []);

  /* Every recipe gets generated cover art, stored site-root-relative so the
     depth-aware link helper can resolve it from nested directories.
     - No photograph: the artwork is the image.
     - Has a photograph: the artwork is the fallback, swapped in by the browser
       if the hotlinked photo fails to load. Every photo here points at a
       third-party host, so a 404 there should degrade to something deliberate
       rather than a broken-image icon. */
  all.forEach(function (recipe) {
    recipe.fallbackImage = 'assets/img/recipe-' + recipe.slug + '.svg';
    if (!recipe.image) {
      recipe.image = recipe.fallbackImage;
      recipe.imageAlt = recipe.imageAlt || recipe.title;
      recipe.generatedImage = true;
    }
  });

  function totalMinutes(recipe) {
    return (recipe.prepMinutes || 0) + (recipe.cookMinutes || 0);
  }

  function bySlug(slug) {
    for (var i = 0; i < all.length; i++) {
      if (all[i].slug === slug) return all[i];
    }
    return null;
  }

  function byCategory(slug) {
    return all.filter(function (r) {
      return r.category === slug;
    });
  }

  /** Flattens the grouped ingredient structure into a plain list of strings. */
  function flatIngredients(recipe) {
    return (recipe.ingredients || []).reduce(function (acc, group) {
      return acc.concat(group.items || []);
    }, []);
  }

  /** The text blob a recipe is matched against by the search box. */
  function searchIndex(recipe) {
    return [
      recipe.title,
      recipe.description,
      recipe.cuisine,
      recipe.course,
      recipe.difficulty,
      (recipe.keywords || []).join(' '),
      (recipe.diet || []).join(' '),
      flatIngredients(recipe).join(' ')
    ]
      .join(' ')
      .toLowerCase();
  }

  var sorters = {
    popular: function (a, b) {
      return b.ratingCount - a.ratingCount;
    },
    rating: function (a, b) {
      return b.rating - a.rating || b.ratingCount - a.ratingCount;
    },
    newest: function (a, b) {
      return new Date(b.datePublished) - new Date(a.datePublished);
    },
    quickest: function (a, b) {
      return totalMinutes(a) - totalMinutes(b);
    },
    az: function (a, b) {
      return a.title.localeCompare(b.title);
    }
  };

  /**
   * Filters and sorts the library.
   * @param {{query?:string, category?:string, diet?:string[], maxTime?:number,
   *          difficulty?:string, sort?:string, slugs?:string[]}} opts
   */
  function query(opts) {
    opts = opts || {};
    var results = all.slice();

    if (opts.slugs) {
      results = results.filter(function (r) {
        return opts.slugs.indexOf(r.slug) !== -1;
      });
    }
    if (opts.category) {
      results = results.filter(function (r) {
        return r.category === opts.category;
      });
    }
    if (opts.difficulty) {
      results = results.filter(function (r) {
        return r.difficulty === opts.difficulty;
      });
    }
    if (opts.maxTime) {
      results = results.filter(function (r) {
        return totalMinutes(r) <= opts.maxTime;
      });
    }
    if (opts.diet && opts.diet.length) {
      results = results.filter(function (r) {
        return opts.diet.every(function (d) {
          return (r.diet || []).indexOf(d) !== -1;
        });
      });
    }
    if (opts.query) {
      var terms = opts.query.toLowerCase().split(/\s+/).filter(Boolean);
      results = results.filter(function (r) {
        var haystack = searchIndex(r);
        return terms.every(function (t) {
          return haystack.indexOf(t) !== -1;
        });
      });
    }

    return results.sort(sorters[opts.sort] || sorters.popular);
  }

  return {
    all: all,
    bySlug: bySlug,
    byCategory: byCategory,
    totalMinutes: totalMinutes,
    flatIngredients: flatIngredients,
    searchIndex: searchIndex,
    query: query
  };
});
