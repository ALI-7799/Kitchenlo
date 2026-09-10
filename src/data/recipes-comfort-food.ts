/**
 * Comfort Food collection.
 * Merged into the library by src/data/recipes.ts.
 */
import type { RecipeSource } from '../types.js';

const recipes: RecipeSource[] = [
  {
    slug: 'creamy-tomato-rigatoni',
    title: 'Creamy Tomato Rigatoni',
    description: 'Rigatoni in a deeply savoury tomato sauce enriched with mascarpone, built on caramelised tomato paste rather than cream alone.',
    intro: 'Most creamy tomato pasta tastes flat because the cream is doing all the work. This one gets its depth from three tablespoons of tomato paste cooked until it darkens and sticks to the pan, which takes four unglamorous minutes and changes the whole dish. The mascarpone goes in at the end, off the heat, where it rounds the acidity without muting it. Rigatoni is the right shape because the ridges and the wide tube both hold sauce.',
    category: 'comfort-food',
    cuisine: 'Italian',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['vegetarian'],
    keywords: ['creamy tomato pasta', 'rigatoni recipe', 'tomato mascarpone pasta', 'easy pasta dinner'],
    image: 'https://images.unsplash.com/photo-1785502108067-15548a5ae170?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rigatoni coated in a creamy tomato sauce topped with grated parmesan',
    prepMinutes: 10,
    cookMinutes: 25,
    servings: 4,
    yieldText: '4 large bowls',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 176,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 624, protein: 18, carbs: 79, fat: 25, fiber: 6, sugar: 11, sodium: 690 },
    equipment: ['Large pot', 'Wide deep skillet or saute pan', 'Colander', 'Wooden spoon'],
    ingredients: [
      { group: 'For the sauce', items: [
        '2 tbsp olive oil',
        '1 medium onion, finely diced',
        '4 garlic cloves, thinly sliced',
        '3 tbsp tomato paste',
        '1/2 tsp chilli flakes, or to taste',
        '1 can (14 oz / 400 g) whole peeled tomatoes, crushed by hand',
        '1 tsp fine sea salt',
        '1/2 tsp sugar, only if the tomatoes are sharp'
      ] },
      { group: 'For the pasta and finish', items: [
        '1 lb (450 g) rigatoni',
        '1/2 cup (120 g) mascarpone, at room temperature',
        '3/4 cup (65 g) grated parmesan, plus more to serve',
        'Large handful of basil leaves, torn',
        'Reserved pasta water',
        'Black pepper to taste'
      ] }
    ],
    instructions: [
      { title: 'Start the pasta water', text: 'Bring a large pot of water to a boil and salt it until it tastes like a mild broth. Do not cook the pasta yet; the sauce needs a head start.' },
      { title: 'Soften the aromatics', text: 'Heat the olive oil in a wide skillet over medium. Cook the onion with a pinch of salt for 6-8 minutes until soft and translucent but not coloured, then add the garlic and chilli flakes and cook 1 minute more.' },
      { title: 'Caramelise the tomato paste', text: 'Add the tomato paste and stir it constantly for 3-4 minutes. It will darken from bright red to brick and start to stick to the base of the pan. That stuck layer is the flavour; do not rush this step and do not let it burn black.' },
      { title: 'Simmer the sauce', text: 'Tip in the crushed tomatoes with the salt, scraping the base to lift everything up. Simmer gently for 12-15 minutes, until the sauce thickens and the oil separates slightly at the edges. Taste and add the sugar only if it needs it.' },
      { title: 'Cook the rigatoni', text: 'Boil the rigatoni for 1 minute less than the package says, so it still has bite. Reserve two mugs of pasta water before draining.' },
      { title: 'Bring it together', text: 'Pull the sauce off the heat and stir in the mascarpone until smooth. Add the drained pasta and the parmesan, then splash in pasta water a little at a time, tossing hard, until the sauce turns glossy and clings to every tube. Fold through the basil, grind over black pepper and serve at once.' }
    ],
    tips: [
      'Crush the whole tomatoes by hand rather than buying them chopped. Chopped tomatoes are packed with added calcium chloride, which keeps the pieces firm and stops them breaking into a smooth sauce.',
      'Take the mascarpone out of the fridge when you start cooking. Cold cheese hitting a hot pan is what makes creamy sauces split.',
      'Reserve far more pasta water than you think you need. The rigatoni keeps drinking liquid as it sits, so the sauce should look slightly loose in the pan.'
    ],
    variations: [
      'Add a splash of vodka with the tomato paste and cook it off for a rosa-style sauce.',
      'Stir a ball of torn mozzarella through at the end and let it melt into strands.',
      'Fry 4 oz of pancetta before the onion and use the rendered fat in place of the olive oil.'
    ],
    storage: 'Keeps in the fridge for 3 days in an airtight container. Reheat in a pan over low heat with a good splash of water, tossing until the sauce loosens again. The microwave tends to break the mascarpone and leave the pasta oily.',
    faqs: [
      { q: 'Can I make this without mascarpone?', a: 'Yes. Heavy cream works, though it thins the sauce, so add it during the simmer rather than at the end. Full-fat cream cheese loosened with a spoon of pasta water is the closest substitute, and ricotta gives a lighter, slightly grainier finish.' },
      { q: 'Why did my sauce taste sour or tinny?', a: 'Almost always undercooked tomato paste, or tomatoes that were sharp to begin with. Give the paste the full four minutes until it darkens, and if it is still sharp add the half teaspoon of sugar; a small knob of butter at the end also softens the edge.' },
      { q: 'Can I use a different pasta shape?', a: 'Any ridged tubular shape works well here, so penne rigate, paccheri or mezzi rigatoni are all fine. Avoid long thin shapes like spaghetti, which this sauce is too heavy for.' }
    ],
    related: ['spaghetti-bolognese', 'baked-mac-and-cheese', 'smoky-tomato-pasta']
  },
  {
    slug: 'classic-smash-burgers',
    title: 'Classic Smash Burgers',
    description: 'Thin beef patties smashed onto a screaming hot pan for a lacy browned crust, stacked with melted cheese and a two-minute burger sauce.',
    intro: 'A smash burger is not a thinner version of a pub burger; it is a different technique aiming at a different thing. Pressing a loose ball of beef onto a very hot surface forces the maximum amount of meat into contact with metal, and what comes back is a dark, crisp, lacy crust that a thick patty can never produce. The whole cook takes about ninety seconds a side, so everything else needs to be ready before the beef goes near the heat.',
    category: 'comfort-food',
    cuisine: 'American',
    course: 'Dinner',
    method: 'Griddled',
    diet: ['high-protein'],
    keywords: ['smash burger recipe', 'homemade burgers', 'best burger sauce', 'diner style burger'],
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A double smash burger with melted cheese and pickles in a toasted bun',
    prepMinutes: 15,
    cookMinutes: 10,
    servings: 4,
    yieldText: '4 double burgers',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 241,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 782, protein: 43, carbs: 36, fat: 51, fiber: 2, sugar: 8, sodium: 1080 },
    equipment: ['Cast iron skillet or flat griddle', 'Stiff metal spatula', 'Small bowl for the sauce', 'Square of baking paper'],
    ingredients: [
      { group: 'For the patties', items: [
        '1.5 lb (680 g) ground beef chuck, 80/20',
        '1 tsp fine sea salt',
        '1/2 tsp freshly ground black pepper',
        '8 slices American cheese or mild cheddar',
        '1 tbsp neutral oil, for the pan'
      ] },
      { group: 'For the burger sauce', items: [
        '1/2 cup (110 g) mayonnaise',
        '2 tbsp ketchup',
        '1 tbsp yellow mustard',
        '2 tbsp dill pickles, very finely chopped',
        '1 tsp pickle brine from the jar',
        '1/2 tsp smoked paprika'
      ] },
      { group: 'To assemble', items: [
        '4 brioche or potato buns, split',
        '2 tbsp butter, softened',
        '1/2 small white onion, sliced paper thin',
        'Dill pickle slices',
        'Shredded iceberg lettuce (optional)'
      ] }
    ],
    instructions: [
      { title: 'Mix the sauce', text: 'Stir every sauce ingredient together in a small bowl and refrigerate. It is better after ten minutes and keeps for a week.' },
      { title: 'Portion the beef', text: 'Divide the beef into 8 loose balls of about 3 oz / 85 g each. Handle them as little as possible and do not season them yet. Compacted, pre-salted meat sets into a dense patty instead of a crisp one.' },
      { title: 'Toast the buns', text: 'Butter the cut sides and toast them face down in a dry pan over medium heat for 1-2 minutes until golden. Set them aside and have every topping laid out within reach.' },
      { title: 'Heat the pan properly', text: 'Wipe the skillet, add the oil and heat over high until it is just beginning to smoke. This is hotter than feels reasonable and it is the single thing that decides whether you get a crust.' },
      { title: 'Smash and sear', text: 'Lay two balls in the pan, cover each with a square of baking paper and press down hard and flat with a stiff spatula for a full 10 seconds, until roughly 1/4 inch thick. Peel off the paper, season the tops, and leave them completely alone for 90 seconds until the edges are dark and lacy.' },
      { title: 'Flip once and melt', text: 'Scrape under each patty with the spatula so the whole crust lifts, flip, and top immediately with a slice of cheese. Cook 30-45 seconds more, then stack one patty on the other. Repeat with the remaining beef.' },
      { title: 'Build', text: 'Sauce both bun halves, add lettuce if using, then the double patty stack, the raw onion and the pickles. Press the lid on gently and eat straight away.' }
    ],
    tips: [
      'Fat is not optional. 80/20 chuck renders as it sears and is what fries the crust; anything leaner than 85/15 gives you a dry, pale patty.',
      'Season after smashing, never before. Salt draws moisture to the surface and dissolves the proteins, and both work against browning.',
      'Cook two patties at a time at most. A crowded pan drops in temperature and the beef steams in its own juices instead of searing.'
    ],
    variations: [
      'Add the sliced onion to the pan and smash it underneath the patty for an Oklahoma-style onion burger.',
      'Swap the sauce for equal parts mayonnaise and gochujang, with a squeeze of lime.',
      'Use ground lamb with a teaspoon of ground cumin and serve with a garlic yogurt sauce.'
    ],
    storage: 'Smash burgers are a cook-and-eat dish and do not keep well; the crust softens within minutes. The sauce, however, keeps in the fridge for a week, and raw portioned beef balls can be covered and refrigerated for a day before cooking.',
    faqs: [
      { q: 'Do I need a cast iron pan?', a: 'You need something that holds heat, so cast iron or carbon steel is ideal. A heavy stainless pan works. Avoid non-stick, which should not be taken to this temperature and does not brown as well anyway.' },
      { q: 'Why is my patty sticking to the pan?', a: 'It is not ready to move. A seared crust releases itself, so if it grips, give it another 15-20 seconds. Using a stiff metal spatula and scraping flat along the pan base also matters; a flexible plastic one will tear the crust off and leave it behind.' },
      { q: 'How do I stop the kitchen filling with smoke?', a: 'Open a window and run the extractor before you start, and use a high smoke point oil such as refined sunflower, canola or beef dripping rather than olive oil. Some smoke is unavoidable at this heat.' }
    ],
    related: ['baked-mac-and-cheese', 'creamy-tomato-rigatoni', 'taco-rice-bowls']
  },
  {
    slug: 'moroccan-chicken-tajine',
    title: 'Moroccan Chicken Tajine with Olives and Preserved Lemon',
    description: 'Chicken thighs slow-braised with saffron, ginger and green olives, finished with preserved lemon for a bright, savoury Moroccan classic.',
    intro: 'This is the tajine most Moroccan households make, and its character comes from two ingredients that are hard to fake: saffron and preserved lemon. The marinade goes on first and does most of the seasoning, then the pot does the rest over a low flame for an hour with almost no attention. The olives and preserved lemon are stirred in near the end rather than at the start, because long cooking turns them bitter and flattens exactly the sharpness they are there to provide.',
    category: 'comfort-food',
    cuisine: 'Moroccan',
    course: 'Dinner',
    method: 'Braised',
    diet: ['gluten-free', 'dairy-free', 'high-protein'],
    keywords: ['moroccan chicken tajine', 'chicken tagine recipe', 'preserved lemon chicken', 'moroccan stew'],
    image: 'https://images.unsplash.com/photo-1680098021573-b9402ee336ec?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Chicken tajine with lemon slices, herbs and potatoes in a ceramic dish',
    prepMinutes: 20,
    cookMinutes: 75,
    servings: 4,
    yieldText: '4 generous portions',
    difficulty: 'Medium',
    rating: 4.9,
    ratingCount: 158,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 528, protein: 44, carbs: 16, fat: 31, fiber: 4, sugar: 5, sodium: 940 },
    equipment: ['Tajine or heavy lidded casserole', 'Small bowl for the marinade', 'Ladle'],
    ingredients: [
      { group: 'For the marinade', items: [
        '8 bone-in, skin-on chicken thighs (about 2.5 lb / 1.1 kg)',
        '4 garlic cloves, crushed to a paste',
        '1 tbsp fresh ginger, grated',
        '1 tsp ground cumin',
        '1 tsp ground coriander',
        '1 tsp sweet paprika',
        '1/2 tsp ground turmeric',
        'Generous pinch of saffron threads, crumbled',
        '3 tbsp olive oil',
        '1.5 tsp fine sea salt',
        '1/2 tsp black pepper'
      ] },
      { group: 'For the tajine', items: [
        '2 large onions, halved and thinly sliced',
        '1 cinnamon stick',
        '1.5 cups (360 ml) chicken stock or water',
        '1 cup (150 g) green olives, cracked and rinsed',
        '1 preserved lemon, flesh discarded and rind sliced thin',
        'Small bunch of coriander and flat-leaf parsley, tied together',
        '1 tbsp lemon juice, to finish'
      ] }
    ],
    instructions: [
      { title: 'Marinate the chicken', text: 'Combine every marinade ingredient in a bowl and rub it thoroughly into the chicken, getting under the skin where you can. Cover and leave at room temperature for 30 minutes, or refrigerate overnight for a noticeably better result.' },
      { title: 'Brown the thighs', text: 'Set the tajine or casserole over medium heat and lay the chicken in skin-side down in a single layer, without extra oil. Brown for 6-8 minutes until the skin is deep gold, then turn and give it 3 minutes more. Lift the pieces out onto a plate.' },
      { title: 'Build the onion base', text: 'Add the sliced onions to the pot with the cinnamon stick and a pinch of salt. Cook over medium-low for 10-12 minutes, scraping up the spiced fond from the base, until the onions collapse into a soft golden layer.' },
      { title: 'Braise low and slow', text: 'Return the chicken skin-side up and nestle it into the onions, add the stock and the tied herb bunch, and bring to a bare simmer. Cover and cook on the lowest heat that keeps it bubbling for 45 minutes. Resist lifting the lid; a tajine works by circulating its own steam.' },
      { title: 'Add the olives and lemon', text: 'Remove the herb bunch and stir the olives and preserved lemon rind into the sauce around the chicken. Re-cover and cook 15 minutes more, until the chicken pulls easily from the bone.' },
      { title: 'Reduce and finish', text: 'Lift the lid, raise the heat and let the sauce bubble for 5-8 minutes until it thickens to a glossy coating. Stir in the lemon juice, taste for salt, and rest 5 minutes before serving with bread or couscous.' }
    ],
    tips: [
      'Bloom the saffron in two tablespoons of warm water for ten minutes and add the liquid to the marinade. Dry threads dropped into a pot never release their full colour or perfume.',
      'Rinse the olives well and taste one. Together with the preserved lemon they carry a lot of salt, which is why the marinade is salted moderately and the final seasoning happens at the end.',
      'If you are cooking in a traditional clay tajine on a gas hob, use a heat diffuser and raise the temperature gradually. Clay cracks from thermal shock, not from long cooking.'
    ],
    variations: [
      'Add a handful of blanched almonds and a spoon of honey for a sweeter, festive version.',
      'Layer par-cooked potatoes and carrots under the chicken so they braise in the sauce.',
      'Use the same marinade and method with a whole jointed chicken, or with firm white fish, cutting the braise to 20 minutes.'
    ],
    storage: 'Refrigerate for up to 3 days; the flavour genuinely improves overnight as the spices settle. Reheat gently, covered, over low heat with a splash of water. It also freezes well for 3 months, though the olives soften a little on thawing.',
    faqs: [
      { q: 'Do I need an actual tajine pot?', a: 'No. The conical lid returns condensation to the food, but a heavy casserole with a tight lid over low heat does the same job. If your lid fits loosely, lay a sheet of foil under it or add a splash more stock partway through.' },
      { q: 'What can I use instead of preserved lemon?', a: 'There is no exact substitute, since the fermentation gives a salty depth fresh fruit lacks. The nearest approximation is the zest of one lemon simmered for 2 minutes in salted water, then stirred in with a tablespoon of juice. Preserved lemons keep for a year once opened, so they are worth buying.' },
      { q: 'Can I use chicken breast?', a: 'You can, but it is not suited to a 60-minute braise and will be dry. If breast is what you have, brown it, remove it, cook the sauce as written, and return it for only the last 12-15 minutes.' }
    ],
    related: ['lamb-apricot-tajine', 'lentil-soup', 'stuffed-peppers']
  },
  {
    slug: 'baked-mac-and-cheese',
    title: 'Baked Mac and Cheese',
    description: 'A proper baked macaroni cheese with a silky three-cheese bechamel and a crisp buttered breadcrumb top that never turns grainy.',
    intro: 'Grainy, oily macaroni cheese is a temperature problem, not a recipe problem. Cheese proteins tighten and squeeze out their fat above roughly 180F, so the sauce here is finished off the heat, a handful at a time, and the pasta comes out of the water while it is still firm because it has a further twenty minutes of oven time to soften. Get those two things right and the rest is a straightforward bechamel.',
    category: 'comfort-food',
    cuisine: 'American',
    course: 'Dinner',
    method: 'Baked',
    diet: ['vegetarian'],
    keywords: ['baked mac and cheese', 'macaroni cheese recipe', 'creamy mac and cheese', 'comfort food classic'],
    image: 'https://images.unsplash.com/photo-1654780105295-9227206f11ec?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Macaroni cheese baked with a golden breadcrumb crust in a casserole dish',
    prepMinutes: 15,
    cookMinutes: 35,
    servings: 6,
    yieldText: 'One 9x13 inch dish, 6 servings',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 203,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 704, protein: 29, carbs: 57, fat: 41, fiber: 3, sugar: 8, sodium: 860 },
    equipment: ['Large pot', 'Heavy saucepan', 'Whisk', '9x13 inch baking dish', 'Box grater'],
    ingredients: [
      { group: 'For the pasta', items: [
        '1 lb (450 g) elbow macaroni',
        '1 tbsp salt, for the water'
      ] },
      { group: 'For the sauce', items: [
        '5 tbsp (70 g) unsalted butter',
        '1/3 cup (45 g) plain flour',
        '4 cups (950 ml) whole milk, warmed',
        '1 tsp English or Dijon mustard',
        '1/2 tsp sweet paprika',
        '1/4 tsp freshly grated nutmeg',
        '1.5 tsp fine sea salt',
        '1/2 tsp white pepper',
        '10 oz (280 g) mature cheddar, grated',
        '4 oz (115 g) gruyere, grated',
        '2 oz (55 g) parmesan, finely grated'
      ] },
      { group: 'For the topping', items: [
        '1 cup (60 g) panko breadcrumbs',
        '2 tbsp butter, melted',
        '1/4 cup (20 g) grated parmesan'
      ] }
    ],
    instructions: [
      { title: 'Heat the oven and grate', text: 'Heat the oven to 375F / 190C and butter a 9x13 inch dish. Grate all the cheese now, off the block, and keep it at room temperature so it melts evenly later.' },
      { title: 'Undercook the macaroni', text: 'Boil the macaroni in well-salted water for 2 minutes less than the package says, so it is still noticeably firm. Drain, but do not rinse; the surface starch helps the sauce grip.' },
      { title: 'Make the roux', text: 'Melt the butter in a heavy saucepan over medium heat, whisk in the flour and cook for 2 minutes, whisking constantly. It should smell biscuity and turn a shade darker, which cooks out the raw flour taste without adding colour.' },
      { title: 'Build the bechamel', text: 'Pour in the warm milk in a slow stream, whisking hard after each addition to keep it smooth. Bring to a gentle simmer and cook 5-6 minutes until it thickens enough to coat the back of a spoon. Whisk in the mustard, paprika, nutmeg, salt and white pepper.' },
      { title: 'Melt the cheese off the heat', text: 'Take the pan completely off the hob and add the cheddar and gruyere a large handful at a time, stirring until each addition disappears before adding the next. The sauce should be glossy and pourable. This is where grainy sauces are made, so do not return it to the heat.' },
      { title: 'Combine and top', text: 'Fold the macaroni through the sauce and tip it into the dish. Toss the panko with the melted butter and parmesan and scatter it over the top.' },
      { title: 'Bake and rest', text: 'Bake for 20-25 minutes, until bubbling at the edges and deep golden on top. Rest for 10 minutes before serving so the sauce sets enough to hold a spoonful.' }
    ],
    tips: [
      'Grate your own cheese. Pre-shredded cheese is coated in potato starch or cellulose to stop it clumping, and that coating is what turns a sauce gritty.',
      'Warm the milk before it goes into the roux. Cold milk hitting hot flour is the usual cause of lumps, and it stalls the sauce for several minutes.',
      'The sauce should look slightly too loose before it goes in the oven. The pasta absorbs a surprising amount as it bakes, and a sauce that looks perfect in the pan will be stiff on the plate.'
    ],
    variations: [
      'Stir 6 oz of crisp bacon or chopped ham through the pasta before baking.',
      'Add a finely chopped chipotle in adobo and swap the gruyere for pepper jack.',
      'Fold in a pound of roasted broccoli or cauliflower florets to cut the richness.'
    ],
    storage: 'Refrigerate for up to 4 days. Reheat portions covered at 325F / 160C with a splash of milk stirred in, which brings the sauce back; the microwave works but dulls the crust. It can also be assembled a day ahead, refrigerated unbaked, and given an extra 10 minutes in the oven from cold.',
    faqs: [
      { q: 'Why did my sauce turn oily or grainy?', a: 'The cheese got too hot. Above roughly 180F the proteins tighten and squeeze their fat out, which reads as grease on top and grit underneath. Always melt the cheese off the heat, and add it gradually rather than all at once.' },
      { q: 'Which cheeses work best?', a: 'You want one for flavour and one for melt. Mature cheddar brings the flavour but can split on its own; gruyere, fontina, comte or young gouda melt smoothly and hold it together. Parmesan is for savoury depth rather than texture, so keep it to a small proportion.' },
      { q: 'Can I make it without baking it?', a: 'Yes. Stop after folding the pasta through the sauce and serve it straight from the pan, which gives a looser, creamier stovetop version. Cook the macaroni to full package time in that case, since it gets no oven time to soften.' }
    ],
    related: ['creamy-tomato-rigatoni', 'classic-smash-burgers', 'broccoli-quesadillas']
  },
  {
    slug: 'spaghetti-bolognese',
    title: 'Slow-Simmered Spaghetti Bolognese',
    description: 'A patient meat ragu built on a proper soffritto, milk and a two-hour simmer, for a sauce that coats pasta instead of sitting on it.',
    intro: 'A ragu is mostly a lesson in not hurrying. The soffritto needs fifteen minutes to sweeten, the meat needs to brown in batches rather than steam in a crowded pan, and the sauce needs two hours at a bare simmer for the connective tissue to break down and the flavours to fuse. The milk, added before the wine, is the step people skip and the one that makes the texture. Note that in Bologna this sauce is served with tagliatelle, not spaghetti; we call it what most people search for, but the wider noodle genuinely holds it better.',
    category: 'comfort-food',
    cuisine: 'Italian',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['high-protein'],
    keywords: ['spaghetti bolognese', 'beef ragu recipe', 'slow cooked bolognese', 'classic italian pasta'],
    image: 'https://images.unsplash.com/photo-1692071097529-320eb2b32292?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A plate of spaghetti in a rich meat ragu with herbs and a glass of red wine',
    prepMinutes: 20,
    cookMinutes: 130,
    servings: 6,
    yieldText: '6 servings, about 6 cups of sauce',
    difficulty: 'Medium',
    rating: 4.9,
    ratingCount: 288,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 648, protein: 36, carbs: 63, fat: 26, fiber: 6, sugar: 10, sodium: 710 },
    equipment: ['Heavy casserole or Dutch oven', 'Large pot', 'Wooden spoon', 'Sharp knife'],
    ingredients: [
      { group: 'For the soffritto', items: [
        '2 tbsp olive oil',
        '1 oz (30 g) butter',
        '1 large onion, very finely diced',
        '2 carrots, very finely diced',
        '2 celery sticks, very finely diced',
        '3 oz (85 g) pancetta, finely chopped'
      ] },
      { group: 'For the ragu', items: [
        '1 lb (450 g) ground beef chuck',
        '8 oz (225 g) ground pork',
        '1 cup (240 ml) whole milk',
        '1 cup (240 ml) dry white or red wine',
        '2 tbsp tomato paste',
        '1 can (28 oz / 800 g) whole peeled tomatoes, crushed by hand',
        '1 cup (240 ml) beef stock, plus more as needed',
        '1 bay leaf',
        '1.5 tsp fine sea salt',
        'Black pepper and grated nutmeg to taste'
      ] },
      { group: 'To serve', items: [
        '1 lb (450 g) spaghetti or tagliatelle',
        'Grated parmesan',
        'Reserved pasta water'
      ] }
    ],
    instructions: [
      { title: 'Sweat the soffritto', text: 'Heat the oil and butter in a heavy casserole over medium-low. Add the pancetta and cook until its fat renders, then add the onion, carrot and celery with a pinch of salt. Cook gently for 15 minutes, stirring now and then, until everything is soft and sweet with no colour.' },
      { title: 'Brown the meat', text: 'Raise the heat to medium-high and add the beef and pork in two batches, breaking them up and letting each batch sit long enough to catch and brown properly. Crowding the pan makes the meat release water and boil grey, which costs you most of the flavour.' },
      { title: 'Add the milk', text: 'Pour in the milk and simmer, stirring, until it has almost entirely evaporated, around 8-10 minutes. This tenderises the meat and gives the finished ragu its rounded texture, and it must go in before anything acidic.' },
      { title: 'Deglaze with wine', text: 'Add the wine and scrape the base of the pan clean. Let it bubble until the sharp alcohol smell has gone and the liquid has reduced by about half.' },
      { title: 'Build and simmer', text: 'Stir in the tomato paste and cook it for 2 minutes, then add the crushed tomatoes, stock, bay leaf and salt. Bring to a bare simmer, partially cover, and cook for at least 2 hours on the lowest heat, stirring every 20 minutes and adding a splash of stock if it looks dry. It is ready when the fat separates and glosses the surface.' },
      { title: 'Season and serve', text: 'Fish out the bay leaf, then season with black pepper, a scrape of nutmeg and more salt to taste. Cook the pasta 1 minute short of the package time, drain reserving a mug of water, and toss it directly into the sauce with a splash of that water until it coats every strand. Serve with parmesan.' }
    ],
    tips: [
      'Cut the soffritto vegetables far smaller than feels necessary, around 1/8 inch. They are meant to dissolve into the sauce rather than turn up as pieces of carrot.',
      'Never boil a ragu. You want the occasional lazy bubble; a rolling simmer toughens the meat and reduces the liquid before the collagen has broken down.',
      'Toss the pasta in the sauce in the pan rather than ladling sauce over a plate of naked spaghetti. Thirty seconds of tossing with a little pasta water is what makes the sauce cling.'
    ],
    variations: [
      'Add a parmesan rind to the pot during the simmer and remove it at the end for extra savoury depth.',
      'Replace 4 oz of the beef with chicken livers, finely chopped, for a richer traditional ragu.',
      'Use the same sauce layered with bechamel and pasta sheets for a straightforward lasagne.'
    ],
    storage: 'Refrigerate for up to 4 days and freeze for 3 months; this is a sauce that is better on day two than on the day it is made. Cool it quickly, portion it, and reheat gently with a splash of stock or water to loosen. Always cook the pasta fresh.',
    faqs: [
      { q: 'Can I make it in less than two hours?', a: 'You can, and one hour still gives a good sauce, but the difference is real. The two hours are what break down the connective tissue and turn the ragu silky rather than merely meaty. A pressure cooker gets you close in about 40 minutes at high pressure, followed by a 10-minute uncovered reduction.' },
      { q: 'Red wine or white?', a: 'Traditional Bolognese ragu uses dry white, which keeps the sauce lighter and lets the meat come through. Red gives a deeper, more robust result that most people outside Italy expect. Either is correct; use whichever you would drink.' },
      { q: 'Why is my bolognese watery?', a: 'Usually the lid was on too tight, or the meat was not browned in batches and released its liquid into the pot. Finish it uncovered for the last 20-30 minutes and let it reduce until the fat visibly separates and pools at the surface.' }
    ],
    related: ['creamy-tomato-rigatoni', 'baked-mac-and-cheese', 'pesto-tortellini']
  },
  {
    slug: 'lamb-apricot-tajine',
    title: 'Lamb and Apricot Tajine',
    description: 'Lamb shoulder braised until it falls apart with ras el hanout, dried apricots and honey, finished with toasted almonds and sesame.',
    intro: 'This is the sweet-savoury side of Moroccan cooking, and its balance is easy to get wrong in one direction: too much honey too early and the whole pot turns into pudding. The apricots go in for the last half hour only, by which point the lamb has had ninety minutes to give up its collagen, and the honey follows at the very end where you can taste as you go. Lamb shoulder is the cut for this; a lean leg will be dry no matter how long you cook it.',
    category: 'comfort-food',
    cuisine: 'Moroccan',
    course: 'Dinner',
    method: 'Braised',
    diet: ['gluten-free', 'dairy-free', 'high-protein'],
    keywords: ['lamb tagine recipe', 'lamb and apricot tajine', 'moroccan lamb stew', 'ras el hanout lamb'],
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A traditional clay tajine pot with its conical lid set beside the braised stew',
    prepMinutes: 20,
    cookMinutes: 135,
    servings: 6,
    yieldText: '6 servings',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 147,
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    nutrition: { calories: 612, protein: 39, carbs: 34, fat: 33, fiber: 6, sugar: 23, sodium: 780 },
    equipment: ['Tajine or heavy lidded casserole', 'Small dry frying pan', 'Tongs'],
    ingredients: [
      { group: 'For the lamb', items: [
        '3 lb (1.4 kg) boneless lamb shoulder, cut into 2 inch chunks',
        '2 tbsp olive oil',
        '2 tsp fine sea salt',
        '1 tsp black pepper',
        '1 tbsp plain flour or cornflour (optional, for a thicker sauce)'
      ] },
      { group: 'For the braise', items: [
        '2 large onions, thinly sliced',
        '4 garlic cloves, minced',
        '1 tbsp fresh ginger, grated',
        '2 tsp ras el hanout',
        '1 tsp ground cumin',
        '1 tsp ground cinnamon',
        '1/2 tsp ground turmeric',
        'Pinch of saffron threads, bloomed in warm water',
        '2 cups (480 ml) lamb or chicken stock',
        '1 can (14 oz / 400 g) chopped tomatoes'
      ] },
      { group: 'To finish', items: [
        '7 oz (200 g) soft dried apricots',
        '2 tbsp honey',
        '1/2 cup (60 g) blanched almonds',
        '1 tbsp sesame seeds',
        'Small handful of coriander, chopped',
        '1 tbsp lemon juice'
      ] }
    ],
    instructions: [
      { title: 'Season and brown', text: 'Pat the lamb dry and season it with the salt and pepper. Heat the oil in the casserole over medium-high and brown the chunks in three batches, 4-5 minutes a batch, until each has a dark crust. Move them to a plate as they are done.' },
      { title: 'Cook the onions', text: 'Lower the heat to medium and add the onions to the same pot with a pinch of salt, scraping up the browned bits. Cook 10 minutes until soft and golden, then stir in the garlic and ginger for a further minute.' },
      { title: 'Toast the spices', text: 'Add the ras el hanout, cumin, cinnamon and turmeric and stir for 45 seconds until fragrant. Dry spices need contact with hot fat to release properly, but they scorch quickly, so keep the spoon moving.' },
      { title: 'Braise', text: 'Return the lamb with any resting juices, add the saffron with its soaking water, the stock and the tomatoes. Bring to a bare simmer, cover, and cook on the lowest heat for 90 minutes, stirring occasionally, until the lamb yields completely to a spoon.' },
      { title: 'Add the apricots', text: 'Stir in the apricots, re-cover and cook 30 minutes more. They will plump and soften while thickening the sauce naturally with their pectin.' },
      { title: 'Toast the nuts', text: 'Meanwhile, toast the almonds in a dry pan over medium heat for 3-4 minutes until golden, then the sesame seeds for about 1 minute. Watch both closely; they go from pale to burnt in seconds.' },
      { title: 'Balance and serve', text: 'Uncover, stir in the honey and lemon juice, and simmer 5-10 minutes to reduce to a glossy sauce. Taste and adjust: more honey for sweetness, more lemon for lift, more salt for depth. Scatter over the almonds, sesame and coriander and serve with couscous or flatbread.' }
    ],
    tips: [
      'Buy shoulder, not leg. Shoulder is marbled and full of connective tissue that melts into gelatine over a long braise, which is exactly what gives this sauce its body.',
      'Brown in batches with space around each piece. It takes an extra ten minutes and it is the difference between a deep brown sauce and a pale, thin one.',
      'Add the honey only at the end. Sugar introduced early caramelises through the whole braise and pushes the dish towards dessert, which cannot be corrected later.'
    ],
    variations: [
      'Swap the apricots for pitted prunes and add a strip of orange peel to the braise.',
      'Add a can of drained chickpeas with the apricots to stretch it further.',
      'Use beef shin or bone-in lamb shanks instead, extending the braise to 2.5 hours.'
    ],
    storage: 'Keeps for 4 days in the fridge and improves markedly after a night, as the spices settle and the sauce thickens. Freeze for up to 3 months without the nuts, and toast those fresh when you reheat. Warm through gently over low heat with a splash of stock.',
    faqs: [
      { q: 'What is ras el hanout and can I substitute it?', a: 'It is a Moroccan house blend that typically runs to a dozen or more spices, among them cinnamon, cumin, coriander, ginger, allspice and rose petals. For a rough substitute, mix 1 tsp cumin, 1/2 tsp each of cinnamon, ginger and coriander, and 1/4 tsp each of allspice and cayenne.' },
      { q: 'Can I make this in a slow cooker?', a: 'Yes, and it suits one well. Brown the lamb and build the spiced onion base on the hob first, since a slow cooker cannot brown, then transfer everything and cook on low for 7-8 hours. Add the apricots for the final hour and reduce the sauce in a pan at the end if it is loose.' },
      { q: 'Should I soak the dried apricots first?', a: 'Not if they are the soft ready-to-eat kind, which is what this recipe assumes. Firmer, fully dried apricots benefit from 20 minutes in hot water, and you can add that soaking liquid to the braise rather than throwing it away.' }
    ],
    related: ['moroccan-chicken-tajine', 'spaghetti-bolognese', 'lentil-soup']
  }
];

export default recipes;
