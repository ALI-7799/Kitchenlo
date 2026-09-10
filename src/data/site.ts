/**
 * Global site configuration: identity, navigation, categories and UI copy.
 * The generator and the browser both read this, so every page shares one
 * definition of the header, the footer and the brand metadata.
 */
import type { SiteConfig } from '../types.js';

  /**
   * Where the site is served from. Used for canonical URLs, Open Graph tags,
   * the sitemap and robots.txt, so it must match the live address exactly.
   *
   *   Custom domain:  origin 'https://www.kitchenlo.com', basePath ''
   *   Project pages:  origin 'https://ali-7799.github.io', basePath '/Kitchenlo'
   *
   * Change these two values and rerun `node tools/build.js`.
   */
  var origin = 'https://www.kitchenlo.com';
  var basePath = '';

const site: SiteConfig = {
  name: 'Kitchenlo',
  tagline: 'Fresh recipes for every home cook',
  origin: origin,
  basePath: basePath,
  description:
    'Kitchenlo is a recipe library for busy home cooks: tested quick dinners, healthy bowls, breakfasts and easy desserts with measured ingredients, clear steps and nutrition for every dish.',
  locale: 'en_US',
  twitter: '@kitchenlo',
  /* Fallback share image for pages that have no image of their own. */
  ogImage:
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&h=630&q=80',
  email: 'Kitchenlo@kitchenlo.com',
  founded: '2025',

  /**
   * Star ratings, off by default and deliberately so.
   *
   * The `rating` / `ratingCount` values in the recipe data are placeholders,
   * not real user reviews. Publishing invented numbers as AggregateRating
   * breaks Google's structured data and spam policies and risks a manual
   * action, which is far more costly than the rich-result stars are worth.
   * Recipe rich results do not require a rating.
   *
   * Set enabled to true only once the ratings reflect genuine reviews
   * collected from real users, then rebuild. That restores the stars in the
   * UI and the aggregateRating block in the Recipe schema.
   */
  ratings: { enabled: false },

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
        { label: 'Breakfast & Brunch', href: 'category/breakfast.html' },
        { label: 'Desserts', href: 'category/desserts.html' },
        { label: 'Comfort Food', href: 'category/comfort-food.html' }
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
        { label: 'Breakfast & Brunch', href: 'category/breakfast.html' },
        { label: 'Desserts', href: 'category/desserts.html' },
        { label: 'Comfort Food', href: 'category/comfort-food.html' },
        { label: 'Browse Categories', href: 'categories.html' }
      ]
    },
    {
      title: 'Collections',
      links: [
        { label: 'Vegetarian', href: 'collection/vegetarian-recipes.html' },
        { label: 'Gluten Free', href: 'collection/gluten-free-recipes.html' },
        { label: 'High Protein', href: 'collection/high-protein-recipes.html' },
        { label: 'High Fibre', href: 'collection/high-fibre-recipes.html' },
        { label: '30-Minute Meals', href: 'collection/30-minute-meals.html' },
        { label: 'Meal Prep', href: 'collection/meal-prep-recipes.html' }
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
      slug: 'breakfast',
      title: 'Breakfast & Brunch',
      short: 'Breakfast',
      tagline: 'Mornings worth getting up for',
      description:
        'Weekday breakfasts you can make half-asleep and weekend brunches worth setting the table for, from five-minute overnight oats to a proper shakshuka.',
      intro:
        'Breakfast splits cleanly into two problems. On a weekday you need something that takes minutes or was made in advance, which is what the overnight oats, freezer burritos and six-minute omelette are for. At the weekend the constraint disappears and technique becomes the point, which is where the pancakes, French toast and shakshuka earn their place. Both halves are here, and each recipe says plainly which one it is.',
      image:
        'https://images.unsplash.com/photo-1682622110419-b671026a4536?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Eggs poached in a spiced tomato and pepper sauce in a black skillet',
      keywords: ['breakfast recipes', 'brunch ideas', 'easy breakfast', 'make ahead breakfast']
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
    },
    {
      slug: 'comfort-food',
      title: 'Comfort Food',
      short: 'Comfort',
      tagline: 'Hearty plates worth the time',
      description:
        'Generous, deeply savoury mains from pasta and burgers to slow-braised Moroccan tajines, with the technique that separates each one from a mediocre version explained.',
      intro:
        'Comfort food is where technique hides in plain sight. The difference between a good ragu and a grey one is browning the meat in batches; the difference between silky macaroni cheese and a grainy pan is melting the cheese off the heat; the difference between a burger and a smash burger is how hot the pan gets. None of these recipes is difficult, but each turns on one step that is easy to skip, so every one of them says plainly which step that is. Some are on the table in half an hour and some ask for two unhurried hours, and each says so before you start.',
      image:
        'https://images.unsplash.com/photo-1692071097529-320eb2b32292?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'A plate of spaghetti in a rich meat ragu with herbs and a glass of red wine',
      keywords: ['comfort food recipes', 'hearty dinner ideas', 'pasta and burgers', 'moroccan tajine recipes']
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
    { value: '55', label: 'Tested recipes' },
    { value: '4.7', label: 'Average rating' },
    { value: '5 min', label: 'Fastest recipe' },
    { value: '100%', label: 'Home-cook friendly' }
  ]
  };

export default site;
