/**
 * Global site configuration: identity, navigation, categories and UI copy.
 * The generator and the browser both read this, so every page shares one
 * definition of the header, the footer and the brand metadata.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KITCHENLO_SITE = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var origin = 'https://www.kitchenlo.com';

  return {
    name: 'Kitchenlo',
    tagline: 'Fresh recipes for every home cook',
    origin: origin,
    description:
      'Kitchenlo is a recipe library for busy home cooks: tested quick dinners, healthy bowls and easy desserts with measured ingredients, clear steps and nutrition for every dish.',
    locale: 'en_US',
    twitter: '@kitchenlo',
    email: 'hello@kitchenlo.com',
    founded: '2025',
    author: {
      name: 'The Kitchenlo Kitchen',
      url: origin + '/about.html'
    },
    social: [
      { label: 'Instagram', href: 'https://instagram.com/kitchenlo', icon: 'instagram' },
      { label: 'Pinterest', href: 'https://pinterest.com/kitchenlo', icon: 'pinterest' },
      { label: 'YouTube', href: 'https://youtube.com/@kitchenlo', icon: 'youtube' },
      { label: 'TikTok', href: 'https://tiktok.com/@kitchenlo', icon: 'tiktok' }
    ],

    /* Primary navigation, rendered into every generated page. */
    nav: [
      { label: 'Home', href: 'index.html' },
      { label: 'Recipes', href: 'recipes.html' },
      {
        label: 'Categories',
        href: 'categories.html',
        children: [
          { label: 'Quick Dinners', href: 'category/quick-dinners.html' },
          { label: 'Healthy Food', href: 'category/healthy-food.html' },
          { label: 'Desserts', href: 'category/desserts.html' }
        ]
      },
      { label: 'Meal Planner', href: 'meal-planner.html' },
      { label: 'Guides', href: 'guides.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Contact', href: 'contact.html' }
    ],

    /* Footer link columns. */
    footer: [
      {
        title: 'Recipes',
        links: [
          { label: 'All Recipes', href: 'recipes.html' },
          { label: 'Quick Dinners', href: 'category/quick-dinners.html' },
          { label: 'Healthy Food', href: 'category/healthy-food.html' },
          { label: 'Desserts', href: 'category/desserts.html' },
          { label: 'Browse Categories', href: 'categories.html' }
        ]
      },
      {
        title: 'Kitchen Tools',
        links: [
          { label: 'Meal Planner', href: 'meal-planner.html' },
          { label: 'Shopping List', href: 'shopping-list.html' },
          { label: 'Saved Recipes', href: 'favorites.html' },
          { label: 'Cooking Guides', href: 'guides.html' }
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: 'about.html' },
          { label: 'Contact', href: 'contact.html' },
          { label: 'Privacy Policy', href: 'privacy.html' },
          { label: 'Terms of Use', href: 'terms.html' }
        ]
      },
      {
        title: 'Account',
        links: [
          { label: 'Sign In', href: 'login.html' },
          { label: 'Create Account', href: 'signup.html' },
          { label: 'My Account', href: 'account.html' }
        ]
      }
    ],

    /* Recipe categories. Slugs match the `category` field on every recipe. */
    categories: [
      {
        slug: 'quick-dinners',
        title: 'Quick Dinners',
        short: 'Quick',
        tagline: 'Fast meals for busy nights',
        description:
          'Weeknight dinners that land on the table in 30 minutes or less, with short ingredient lists, one pan where possible and nothing that needs a special trip to the shops.',
        intro:
          'These are the recipes we reach for at 7pm on a Tuesday. Every one has been timed from a cold start, including the chopping, and none of them asks you to babysit a pan for an hour. Most use a single skillet, and several are built from things that live in the cupboard.',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'A fast weeknight dinner plated on a table',
        keywords: ['quick dinner recipes', '30 minute meals', 'easy weeknight dinners', 'fast dinner ideas']
      },
      {
        slug: 'healthy-food',
        title: 'Healthy Food',
        short: 'Healthy',
        tagline: 'Fresh bowls and bright lunches',
        description:
          'Vegetable-forward bowls, grain salads and soups with real nutrition numbers, built to keep well for meal prep and to taste good cold on the third day.',
        intro:
          'Healthy cooking fails when it is bland or when it does not keep. Everything in this collection is designed around both problems: assertive dressings, properly seasoned grains, and components that can be stored separately and assembled in minutes.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'A fresh healthy bowl with vegetables and grains',
        keywords: ['healthy recipes', 'meal prep bowls', 'high fibre lunch', 'nutritious dinner ideas']
      },
      {
        slug: 'desserts',
        title: 'Desserts',
        short: 'Sweet',
        tagline: 'Sweet endings for every day',
        description:
          'Approachable puddings, tarts and bakes with the technique explained, from a five-minute mug cake to a proper set panna cotta.',
        intro:
          'Dessert is where small technical details decide everything, so each recipe here explains the one that matters: why the butter must be cold, why the crust goes in hot, why you pull the mug cake early. Get that single step right and the rest is easy.',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'A styled dessert with fresh berries',
        keywords: ['easy dessert recipes', 'simple baking', 'quick desserts', 'homemade puddings']
      }
    ],

    /* Filter facets used by the recipe index search UI. */
    filters: {
      time: [
        { id: 'under-15', label: 'Under 15 min', max: 15 },
        { id: 'under-30', label: 'Under 30 min', max: 30 },
        { id: 'under-45', label: 'Under 45 min', max: 45 }
      ],
      diet: [
        { id: 'vegetarian', label: 'Vegetarian' },
        { id: 'vegan', label: 'Vegan' },
        { id: 'gluten-free', label: 'Gluten free' },
        { id: 'dairy-free', label: 'Dairy free' },
        { id: 'high-protein', label: 'High protein' },
        { id: 'high-fibre', label: 'High fibre' },
        { id: 'low-carb', label: 'Low carb' }
      ],
      difficulty: [
        { id: 'Easy', label: 'Easy' },
        { id: 'Medium', label: 'Medium' }
      ],
      sort: [
        { id: 'popular', label: 'Most popular' },
        { id: 'newest', label: 'Newest' },
        { id: 'quickest', label: 'Quickest' },
        { id: 'rating', label: 'Highest rated' },
        { id: 'az', label: 'A to Z' }
      ]
    },

    /* Home page trust strip. */
    stats: [
      { value: '30', label: 'Tested recipes' },
      { value: '4.7', label: 'Average rating' },
      { value: '5 min', label: 'Fastest recipe' },
      { value: '100%', label: 'Home-cook friendly' }
    ]
  };
});
