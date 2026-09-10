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
  },
  {
    slug: 'cheese-fondue',
    title: 'Swiss Cheese Fondue',
    description: 'Gruyere and Vacherin melted into white wine with a whisper of kirsch, kept smooth by a spoon of cornflour.',
    intro: 'Fondue splits for one reason: the cheese is heated too fast and the fat separates from the protein. Everything in this method exists to stop that. The cheese is tossed in cornflour before it goes anywhere near the pot, the wine goes in cold, the heat stays low, and the cheese is added a handful at a time so the emulsion is never asked to absorb more than it can. Get that right and the pot stays glossy from the first dip to the crust at the bottom.',
    category: 'comfort-food',
    cuisine: 'Swiss',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['vegetarian'],
    keywords: ['cheese fondue recipe', 'swiss fondue', 'gruyere fondue', 'fondue for two'],
    image: 'https://images.unsplash.com/photo-1754910568106-e71804067c2c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A pot of melted cheese fondue with forks dipping bread into it',
    prepMinutes: 15,
    cookMinutes: 20,
    servings: 4,
    yieldText: '4 servings, one caquelon',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 132,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 784, protein: 41, carbs: 38, fat: 46, fiber: 2, sugar: 3, sodium: 1120 },
    equipment: ['Caquelon or heavy enamelled pot', 'Fondue burner', 'Long fondue forks', 'Wooden spoon'],
    ingredients: [
      { group: 'For the fondue', items: [
        '10 oz (300 g) Gruyere, coarsely grated',
        '10 oz (300 g) Vacherin Fribourgeois or Emmental, coarsely grated',
        '1 tbsp cornflour',
        '1 garlic clove, halved',
        '1.5 cups (350 ml) dry white wine, such as Fendant or Riesling',
        '1 tsp lemon juice',
        '2 tbsp kirsch (optional)',
        'Freshly grated nutmeg and black pepper'
      ] },
      { group: 'To dip', items: [
        '1 large day-old crusty loaf, cut into 1 inch cubes with crust on every piece',
        'Cornichons and pickled onions',
        'Boiled new potatoes (optional)'
      ] }
    ],
    instructions: [
      { title: 'Toss the cheese in cornflour', text: 'Combine both cheeses in a bowl and toss thoroughly with the cornflour until every shred is dusted. The starch is what holds the emulsion together once the fat renders, and it is the single most reliable defence against a split pot.' },
      { title: 'Prepare the pot', text: 'Rub the cut garlic hard around the inside of the caquelon, then leave it in. Pour in the wine and the lemon juice and warm over medium-low until it steams and shows small bubbles at the edge, but do not let it boil.' },
      { title: 'Add the cheese gradually', text: 'Add the cheese one large handful at a time, stirring in a slow figure of eight with a wooden spoon. Wait until each addition has completely disappeared before adding the next. Rushing this is the other way fondue splits.' },
      { title: 'Season and finish', text: 'Once smooth and glossy, stir in the kirsch, a scrape of nutmeg and plenty of black pepper. The texture should coat a fork thickly and fall from it in a ribbon; loosen with a splash of warm wine if it is too tight.' },
      { title: 'Move to the burner', text: 'Set the pot over a low flame at the table. Keep it just below a simmer and keep stirring as people dip, so the base never scorches.' },
      { title: 'Eat, and save the crust', text: 'Spear each bread cube through the soft side and out through the crust so it holds, then stir it through the cheese. When the pot is nearly empty a golden crust forms on the base, called la religieuse; lift it out and share it.' }
    ],
    tips: [
      'Use day-old bread. Fresh bread is too soft and disintegrates off the fork halfway to your mouth.',
      'Never let the fondue boil. Above a gentle simmer the proteins tighten, the fat pools on top and the pot turns grainy.',
      'If it does split, take it off the heat and whisk in a slurry of a teaspoon of cornflour in a tablespoon of lemon juice. It will usually come back together.'
    ],
    variations: [
      'Moitie-moitie is the classic Fribourg half-and-half of Gruyere and Vacherin, which is what this recipe is.',
      'Stir a spoon of wholegrain mustard or a handful of sauteed mushrooms through at the end.',
      'For a wine-free pot, use strong vegetable stock with an extra teaspoon of lemon juice for the acidity the cheese needs.'
    ],
    storage: 'Fondue is a cook-and-eat dish and does not keep well; reheated cheese usually splits. Leftovers can be refrigerated for 2 days and used as a sauce, melted gently over low heat with a splash of milk, or spread on bread and grilled.',
    faqs: [
      { q: 'Why did my fondue go stringy or grainy?', a: 'Too much heat, or the cheese went in too fast. Cheese emulsions break above roughly 180F, and stringiness means the proteins have tightened into ropes. Keep the pot below a simmer and add the cheese a handful at a time.' },
      { q: 'Can I make fondue without alcohol?', a: 'Yes. The wine is there for acidity as much as flavour, and acidity is what keeps the cheese proteins apart. Replace it with vegetable stock plus an extra teaspoon or two of lemon juice, and skip the kirsch.' },
      { q: 'How much cheese do I need per person?', a: 'Around 5 oz / 150 g per person for a main course, which is what this recipe assumes. As a starter or with a lot of potatoes alongside, 3.5 oz / 100 g each is plenty.' }
    ],
    related: ['raclette', 'baked-mac-and-cheese', 'moussaka']
  },
  {
    slug: 'raclette',
    title: 'Raclette with Potatoes and Pickles',
    description: 'Melted raclette cheese scraped over hot waxy potatoes, with cornichons and cured meats to cut the richness.',
    intro: 'Raclette is less a recipe than an arrangement, and it lives or dies on two things: the potatoes must be waxy and genuinely hot, and there must be enough acidity on the table to keep the whole thing from becoming a wall of fat. The name comes from racler, to scrape, because the original version was a half wheel melted by a fire and scraped onto plates. A tabletop grill does the same job with less drama.',
    category: 'comfort-food',
    cuisine: 'Swiss',
    course: 'Dinner',
    method: 'Grilled',
    diet: ['vegetarian', 'gluten-free'],
    keywords: ['raclette recipe', 'raclette cheese dinner', 'swiss raclette', 'melted cheese potatoes'],
    image: 'https://images.unsplash.com/photo-1654796605349-015a7841f680?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Golden potatoes smothered in melted raclette cheese in a pan',
    prepMinutes: 20,
    cookMinutes: 30,
    servings: 6,
    yieldText: '6 servings',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 118,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 692, protein: 34, carbs: 44, fat: 42, fiber: 4, sugar: 4, sodium: 980 },
    equipment: ['Raclette grill or heavy ovenproof pan', 'Large pot for the potatoes', 'Small serving bowls'],
    ingredients: [
      { group: 'The cheese and potatoes', items: [
        '2.6 lb (1.2 kg) small waxy potatoes, such as Charlotte or new potatoes',
        '2.6 lb (1.2 kg) raclette cheese, sliced about 1/4 inch thick',
        '1 tbsp salt, for the potato water'
      ] },
      { group: 'On the table', items: [
        '1 jar cornichons, drained',
        '1 jar pickled silverskin onions, drained',
        '7 oz (200 g) air-dried ham or bresaola (omit to keep it vegetarian)',
        'Freshly ground black pepper',
        'Sweet paprika and grated nutmeg, in small bowls'
      ] },
      { group: 'Alongside', items: [
        'A green salad with a sharp mustard vinaigrette',
        'Cold dry white wine or hot black tea'
      ] }
    ],
    instructions: [
      { title: 'Boil the potatoes', text: 'Put the potatoes in a large pot, cover with cold water, add the salt and bring to a boil. Simmer 18-22 minutes until a knife slides in with no resistance. Leave the skins on; they hold the potato together under a load of cheese.' },
      { title: 'Keep them hot', text: 'Drain and return them to the warm pan with the lid ajar, or tip them into a covered dish. Lukewarm potatoes are the most common way this meal disappoints, because the cheese sets the moment it lands.' },
      { title: 'Heat the grill', text: 'Turn the raclette grill on 10 minutes before you sit down so the top plate and the little pans are properly hot. Without a raclette grill, lay cheese slices in a heavy ovenproof pan and melt them under a hot grill for 3-4 minutes.' },
      { title: 'Lay the table', text: 'Put the potatoes, cheese slices, pickles, cured meats and the paprika and nutmeg within everyone\'s reach. Each person needs a pan, a plate and a wooden spatula.' },
      { title: 'Melt and scrape', text: 'Everyone lays a slice or two of cheese in their pan and slides it under the heat for 3-5 minutes, until it bubbles and browns at the edges. Crush a potato on the plate, scrape the molten cheese over it, and season.' },
      { title: 'Keep going in rounds', text: 'Refill the pan and repeat. Raclette is eaten in rounds over an hour or more rather than plated all at once, so pace the potatoes and keep the pickles moving.' }
    ],
    tips: [
      'Waxy potatoes only. Floury varieties collapse into mash under hot cheese and turn the plate into a paste.',
      'Allow about 7 oz / 200 g of cheese per person. It sounds enormous and it is almost exactly right.',
      'Put the pickles on the table, not on the side. The acidity is structural here, not a garnish, and without it the meal becomes heavy within twenty minutes.'
    ],
    variations: [
      'Grill mushrooms, cherry tomatoes, courgette rounds or peppers in the little pans under the cheese.',
      'Smoked raclette gives a deeper, bacon-like note if you can find it.',
      'Swap in Morbier, young Gouda or Fontina, all of which melt smoothly and behave the same way.'
    ],
    storage: 'Best made only for the number of people at the table. Leftover boiled potatoes keep 3 days and fry beautifully for breakfast; leftover cheese keeps wrapped in the fridge for a week and melts fine, though it is at its best fresh.',
    faqs: [
      { q: 'Do I need a raclette grill?', a: 'No. Lay the cheese in a heavy ovenproof pan or on a lined baking tray and melt it under a hot grill for 3-4 minutes, then scrape it over the potatoes. You lose the round-by-round rhythm at the table, but the food is the same.' },
      { q: 'What can I use instead of raclette cheese?', a: 'Any good melting cheese with a bit of character: Morbier, Fontina, young Gouda, Comte or Taleggio. Avoid anything very hard or very aged, which will split rather than flow.' },
      { q: 'What do I serve with it?', a: 'A sharply dressed green salad and plenty of pickles, and that is genuinely enough. Traditionally you drink white wine or hot tea rather than anything cold and fizzy, which is said to sit badly with the volume of melted cheese.' }
    ],
    related: ['cheese-fondue', 'baked-mac-and-cheese', 'breakfast-hash']
  },
  {
    slug: 'chicken-tikka-masala',
    title: 'Chicken Tikka Masala',
    description: 'Yogurt-marinated chicken charred hard, then folded into a spiced tomato and cream sauce built on bloomed whole spices.',
    intro: 'The two halves of this dish are cooked separately and for good reason. The chicken needs fierce dry heat to char, which is where the tikka flavour actually comes from, and the sauce needs a long gentle simmer to lose its raw tomato edge. Cook them together in one pan and you get neither: pale chicken poached in a thin sauce. The yogurt marinade is not optional either, since its acidity and enzymes are what keep breast or thigh tender through that kind of heat.',
    category: 'comfort-food',
    cuisine: 'Indian',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['gluten-free', 'high-protein'],
    keywords: ['chicken tikka masala', 'indian curry recipe', 'tikka masala sauce', 'restaurant style curry'],
    image: 'https://images.unsplash.com/photo-1742599361574-6fb156181466?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A bowl of creamy orange chicken tikka masala topped with fresh mint',
    prepMinutes: 25,
    cookMinutes: 40,
    servings: 4,
    yieldText: '4 generous servings',
    difficulty: 'Medium',
    rating: 4.9,
    ratingCount: 274,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 624, protein: 46, carbs: 18, fat: 40, fiber: 3, sugar: 9, sodium: 890 },
    equipment: ['Large heavy skillet or wok', 'Grill pan or baking tray', 'Blender (optional, for a smooth sauce)'],
    ingredients: [
      { group: 'For the chicken tikka', items: [
        '2 lb (900 g) boneless chicken thighs, cut into 2 inch pieces',
        '3/4 cup (180 g) thick natural yogurt',
        '2 tbsp fresh ginger, grated',
        '4 garlic cloves, crushed',
        '2 tsp ground cumin',
        '2 tsp sweet paprika',
        '1 tsp ground turmeric',
        '1 tsp garam masala',
        '1.5 tsp fine sea salt',
        'Juice of 1 lemon'
      ] },
      { group: 'For the masala sauce', items: [
        '3 tbsp ghee or neutral oil',
        '2 large onions, finely diced',
        '4 garlic cloves, minced',
        '1 tbsp fresh ginger, grated',
        '2 tsp ground coriander',
        '1 tsp ground cumin',
        '1 tsp Kashmiri chilli powder',
        '1/2 tsp ground turmeric',
        '1 can (14 oz / 400 g) chopped tomatoes',
        '2 tsp tomato paste',
        '1 tsp caster sugar',
        '3/4 cup (180 ml) double cream',
        '1 tsp garam masala, to finish',
        'Coriander leaves and lemon wedges, to serve'
      ] }
    ],
    instructions: [
      { title: 'Marinate the chicken', text: 'Whisk every marinade ingredient together and fold the chicken through until each piece is coated. Cover and refrigerate for at least 2 hours, ideally overnight. The yogurt tenderises as much as it seasons, so this is worth the wait.' },
      { title: 'Char the chicken', text: 'Heat a grill pan or the oven grill as hot as it goes. Cook the chicken in a single layer for 4-5 minutes a side, until blackened in patches and just cooked through. Those charred edges are the whole point; a crowded pan steams instead and you lose them. Set aside.' },
      { title: 'Build the onion base', text: 'Melt the ghee in a large skillet over medium heat and cook the onions with a pinch of salt for 12-15 minutes, until deeply golden and sweet. This is the longest step and the one that decides how the sauce tastes.' },
      { title: 'Bloom the spices', text: 'Stir in the garlic and ginger for a minute, then the coriander, cumin, chilli and turmeric. Cook 45 seconds, stirring constantly, until fragrant. Ground spices need hot fat to release, but they scorch in seconds.' },
      { title: 'Simmer the sauce', text: 'Add the tomatoes, tomato paste, sugar and a splash of water. Simmer gently for 15-18 minutes, until the sauce darkens and the oil separates at the edges. For a restaurant-smooth texture, blend it at this point and return it to the pan.' },
      { title: 'Bring it together', text: 'Lower the heat, stir in the cream, then fold in the charred chicken with any resting juices. Warm through for 5 minutes without boiling. Finish with the garam masala, taste for salt, and scatter over coriander.' }
    ],
    tips: [
      'Thighs, not breast. They survive the char and the simmer without drying, and the extra fat carries the spice.',
      'Kashmiri chilli powder gives the colour people expect with very little heat. Ordinary chilli powder will make the dish considerably hotter at the same quantity.',
      'If the sauce tastes flat at the end, it usually wants salt and acid rather than more spice. A squeeze of lemon does more than another spoon of garam masala.'
    ],
    variations: [
      'Use paneer or roasted cauliflower in place of the chicken, marinated the same way.',
      'Stir a tablespoon of ground almonds or cashew paste into the sauce for a richer, korma-leaning version.',
      'Swap the cream for coconut cream to make it dairy-free, using oil rather than ghee and coconut yogurt in the marinade.'
    ],
    storage: 'Keeps 3 days in the fridge and improves overnight as the spices settle. Reheat gently over low heat with a splash of water; boiling can split the cream. Freezes for 3 months, though it is best frozen before the cream goes in and finished fresh.',
    faqs: [
      { q: 'What is the difference between tikka masala and butter chicken?', a: 'They overlap heavily. Butter chicken is generally milder, sweeter and thicker, built on butter and cashew or almond paste, while tikka masala carries more onion, more chilli and a looser, more tomato-forward sauce.' },
      { q: 'Can I skip the marinating time?', a: 'You can cook it after 30 minutes, but the chicken will be noticeably less tender and less seasoned through. If time is short, marinate while the oven heats and the onions cook, which gets you most of an hour without waiting around.' },
      { q: 'Why is my sauce orange rather than red?', a: 'That is correct. The colour comes from turmeric, paprika and Kashmiri chilli meeting cream, not from tomato alone. A vivid red usually means food colouring, which restaurants use and home kitchens do not need.' }
    ],
    related: ['thai-green-curry', 'moroccan-chicken-tajine', 'honey-soy-chicken']
  },
  {
    slug: 'beef-stroganoff',
    title: 'Beef Stroganoff',
    description: 'Fast-seared steak strips and browned mushrooms in a mustard and sour cream sauce, over buttered egg noodles.',
    intro: 'Stroganoff has a reputation as a heavy dish, which is usually the result of stewing the beef. It is not a stew. The strips want ninety seconds in a very hot pan and then to be taken out entirely while the sauce is built, going back in only at the end to warm through. The other rule is that sour cream must never boil, or it curdles into grains you cannot whisk out. Both rules are about restraint, and both take less time than doing it wrong.',
    category: 'comfort-food',
    cuisine: 'Russian',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['high-protein'],
    keywords: ['beef stroganoff recipe', 'stroganoff sauce', 'quick beef dinner', 'mushroom cream sauce'],
    image: 'https://images.unsplash.com/photo-1644592219048-5c070fd3c91c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beef stroganoff in a creamy mushroom sauce served over egg noodles',
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 196,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 596, protein: 42, carbs: 41, fat: 28, fiber: 3, sugar: 6, sodium: 720 },
    equipment: ['Large heavy skillet', 'Large pot for the noodles', 'Tongs'],
    ingredients: [
      { group: 'For the beef', items: [
        '1.5 lb (680 g) sirloin or rump steak, sliced into 1/2 inch strips across the grain',
        '1 tsp fine sea salt',
        '1/2 tsp black pepper',
        '2 tbsp neutral oil'
      ] },
      { group: 'For the sauce', items: [
        '2 tbsp butter',
        '1 large onion, thinly sliced',
        '14 oz (400 g) chestnut mushrooms, thickly sliced',
        '2 garlic cloves, minced',
        '1 tbsp plain flour',
        '1 cup (240 ml) beef stock',
        '2 tsp Dijon mustard',
        '1 tsp Worcestershire sauce',
        '3/4 cup (180 g) full-fat sour cream, at room temperature',
        'Chopped dill or parsley, to finish'
      ] },
      { group: 'To serve', items: [
        '12 oz (340 g) wide egg noodles',
        '1 tbsp butter, for the noodles'
      ] }
    ],
    instructions: [
      { title: 'Dry and season the beef', text: 'Pat the strips thoroughly dry and season with the salt and pepper. Wet meat will not brown, and browning is most of the flavour in a dish this quick.' },
      { title: 'Sear in batches', text: 'Heat the oil in a large skillet over high until it shimmers. Sear the beef in two or three batches, 60-90 seconds a batch, turning once. It should be brown outside and pink within. Move each batch to a plate.' },
      { title: 'Brown the mushrooms', text: 'Lower to medium-high, add the butter and the onion and cook 5 minutes. Add the mushrooms and leave them undisturbed for 3-4 minutes to colour before stirring. Cook until their water has evaporated and they are properly golden.' },
      { title: 'Make the sauce base', text: 'Stir in the garlic for a minute, then the flour, and cook 1 minute more. Pour in the stock while stirring, scraping the base clean, then add the mustard and Worcestershire. Simmer 4-5 minutes until it thickens enough to coat a spoon.' },
      { title: 'Add the sour cream off the boil', text: 'Take the pan off the heat and stir in the sour cream. Return it to the lowest heat only to warm through. If it boils it will split, and there is no recovering the texture.' },
      { title: 'Finish and serve', text: 'Return the beef with its resting juices and warm for 1-2 minutes, no longer. Toss the cooked noodles with butter, spoon the stroganoff over, and scatter with dill.' }
    ],
    tips: [
      'Slice across the grain. With a quick-cooking cut this is the difference between tender strips and chewy ones.',
      'Let the sour cream come to room temperature first. Cold dairy hitting a hot pan is the usual reason a stroganoff curdles.',
      'Do not crowd the pan when searing. Three small batches take four minutes total and give you a fond worth building on; one big batch gives you grey, watery beef.'
    ],
    variations: [
      'Use sliced chicken thigh or pork loin, seared exactly the same way.',
      'Make it vegetarian with 2 lb of mixed mushrooms, browned hard in batches, and vegetable stock.',
      'A splash of brandy or dry white wine into the pan before the stock adds depth; reduce it by half first.'
    ],
    storage: 'Keeps 2 days in the fridge. Reheat very gently over low heat, ideally with a splash of stock, and stop as soon as it is warm; the sour cream will split if it simmers. Not suitable for freezing, as the sauce separates on thawing.',
    faqs: [
      { q: 'Why did my sauce curdle?', a: 'The sour cream boiled, or it went in cold and straight onto high heat. Always add it off the heat, use full-fat rather than low-fat, and bring it to room temperature first. Low-fat sour cream splits far more readily.' },
      { q: 'Can I use a cheaper cut of beef?', a: 'Only if you change the method. Braising cuts like chuck need 90 minutes of gentle simmering, not 90 seconds, so cook them low and slow first and stir the sour cream in at the very end. For the quick version, use sirloin, rump or fillet.' },
      { q: 'What should I serve it with?', a: 'Wide egg noodles are the usual choice here, but buttered rice, mashed potato or boiled new potatoes all work. Something plain and starchy to catch the sauce is the only real requirement.' }
    ],
    related: ['spaghetti-bolognese', 'baked-mac-and-cheese', 'moussaka']
  },
  {
    slug: 'moussaka',
    title: 'Greek Moussaka',
    description: 'Layers of roasted aubergine and cinnamon-scented lamb under a thick baked bechamel, rested until it slices clean.',
    intro: 'Two habits separate a good moussaka from a greasy one. The aubergine is roasted rather than fried, because aubergine absorbs frying oil like a sponge and gives almost none of it back. And the bechamel is made deliberately thick and enriched with egg yolk, so it sets into a proper custard layer instead of running off the plate. The third thing is patience: it needs a full thirty minutes out of the oven before you cut it, or it will slump.',
    category: 'comfort-food',
    cuisine: 'Greek',
    course: 'Dinner',
    method: 'Baked',
    diet: ['gluten-free', 'high-protein'],
    keywords: ['moussaka recipe', 'greek moussaka', 'aubergine lamb bake', 'bechamel bake'],
    image: 'https://images.unsplash.com/photo-1777199311086-ec5ff230aefd?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A baked moussaka with a golden bechamel top in an oval dish',
    prepMinutes: 40,
    cookMinutes: 65,
    servings: 6,
    yieldText: 'One 9x13 inch dish, 6 servings',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 164,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 648, protein: 34, carbs: 29, fat: 44, fiber: 7, sugar: 12, sodium: 780 },
    equipment: ['Two large baking trays', 'Large skillet', 'Heavy saucepan', '9x13 inch baking dish', 'Whisk'],
    ingredients: [
      { group: 'For the aubergine', items: [
        '3 large aubergines (about 2.6 lb / 1.2 kg), cut into 1/2 inch rounds',
        '4 tbsp olive oil',
        '1 tsp fine sea salt'
      ] },
      { group: 'For the lamb', items: [
        '2 tbsp olive oil',
        '1 large onion, finely diced',
        '4 garlic cloves, minced',
        '1.5 lb (680 g) minced lamb',
        '2 tbsp tomato paste',
        '1 can (14 oz / 400 g) chopped tomatoes',
        '1/2 cup (120 ml) red wine',
        '1 tsp ground cinnamon',
        '1/2 tsp ground allspice',
        '1 bay leaf',
        '1 tsp dried oregano',
        '1 tsp fine sea salt, plus black pepper'
      ] },
      { group: 'For the bechamel', items: [
        '4 tbsp (60 g) butter',
        '1/3 cup (45 g) cornflour',
        '3 cups (720 ml) whole milk, warmed',
        '2 egg yolks',
        '3/4 cup (65 g) grated kefalotyri or parmesan',
        '1/4 tsp freshly grated nutmeg',
        'Salt and white pepper'
      ] }
    ],
    instructions: [
      { title: 'Roast the aubergine', text: 'Heat the oven to 425F / 220C. Brush the rounds on both sides with olive oil, season with the salt, and spread them over two trays in a single layer. Roast 25-30 minutes, turning once, until golden and collapsing. Roasting rather than frying is what keeps this dish out of grease.' },
      { title: 'Start the lamb', text: 'Meanwhile, heat the oil in a large skillet and cook the onion for 8 minutes until soft. Add the garlic for a minute, then the lamb, breaking it up and letting it brown properly rather than steam. Pour off the fat if there is a lot.' },
      { title: 'Simmer the sauce', text: 'Stir in the tomato paste and cook 2 minutes, then add the wine and let it reduce by half. Add the tomatoes, cinnamon, allspice, bay, oregano and seasoning. Simmer 20-25 minutes until thick and almost dry; a wet lamb layer makes a soggy moussaka.' },
      { title: 'Make a thick bechamel', text: 'Melt the butter in a saucepan, whisk in the cornflour and cook 1 minute. Add the warm milk in a slow stream, whisking hard, and cook 5-6 minutes until very thick. Off the heat, beat in the yolks one at a time, then the cheese, nutmeg and seasoning.' },
      { title: 'Layer it', text: 'Lower the oven to 350F / 180C. Lay half the aubergine in the dish, spread over all the lamb, then the remaining aubergine. Pour the bechamel over and smooth it flat to the edges so it seals the top.' },
      { title: 'Bake and rest', text: 'Bake 40-45 minutes until deeply golden and set with only a slight wobble at the centre. Rest for at least 30 minutes before cutting. This is not optional; cut it hot and it will slide apart on the plate.' }
    ],
    tips: [
      'Salting the aubergine is unnecessary with modern varieties, which are not bitter. Roasting them dry is what matters.',
      'The lamb layer should look almost too dry in the pan. It picks up moisture from the aubergine as it bakes.',
      'Cornflour rather than wheat flour keeps this gluten-free and gives a slightly cleaner, firmer set. Plain flour works if you do not need that.'
    ],
    variations: [
      'Add a layer of thinly sliced par-boiled potato on the base, which is common in many Greek households.',
      'Use minced beef, or a half-and-half mix of beef and lamb, for a milder result.',
      'For a vegetarian version, replace the lamb with brown lentils and finely chopped mushrooms cooked the same way.'
    ],
    storage: 'Refrigerate for up to 4 days; it slices far better cold and reheats well, covered, at 325F / 160C for 25 minutes. It can be assembled a day ahead and baked from cold with an extra 15 minutes. Freezes for 3 months, baked or unbaked.',
    faqs: [
      { q: 'Why is my moussaka watery?', a: 'Almost always the lamb sauce went in too loose, or the aubergine was not roasted long enough and released its water in the dish. Reduce the meat sauce until a spoon leaves a clear channel, and roast the aubergine until it is genuinely soft and browned.' },
      { q: 'Can I make it ahead?', a: 'Yes, and it is arguably better for it. Assemble it completely, refrigerate overnight, and bake from cold with an extra 15 minutes. The layers firm up and it slices more cleanly the next day.' },
      { q: 'What is the cinnamon doing in a savoury dish?', a: 'It is characteristic of Greek meat sauces and it is not there to taste sweet. Along with the allspice it gives the lamb a warm, rounded background note; leave it out and the dish tastes noticeably flatter.' }
    ],
    related: ['seafood-paella', 'lamb-apricot-tajine', 'stuffed-peppers']
  },
  {
    slug: 'seafood-paella',
    title: 'Seafood Paella',
    description: 'Saffron rice cooked flat and undisturbed with prawns, mussels and squid, finished with a crisp socarrat on the base.',
    intro: 'The single hardest instruction in paella is to leave it alone. Rice cooked in a wide flat pan without stirring absorbs stock evenly and forms socarrat, the caramelised crust on the base that Spaniards fight over. Stir it and you get risotto, which is a fine thing but not this. Everything else is preparation: a proper sofrito, good stock, bomba or another short absorbent rice, and enough patience to add the seafood in the order it actually needs.',
    category: 'comfort-food',
    cuisine: 'Spanish',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['gluten-free', 'dairy-free', 'high-protein'],
    keywords: ['seafood paella recipe', 'spanish paella', 'saffron rice', 'socarrat'],
    image: 'https://images.unsplash.com/photo-1746587293135-7a59f5764cd8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A pan of seafood paella with mussels, prawns and octopus on saffron rice',
    prepMinutes: 20,
    cookMinutes: 35,
    servings: 6,
    yieldText: 'One 15 inch pan, 6 servings',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 187,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 542, protein: 38, carbs: 62, fat: 14, fiber: 3, sugar: 5, sodium: 940 },
    equipment: ['Paella pan or wide shallow skillet, 15 inch', 'Small pan for the stock', 'Tongs'],
    ingredients: [
      { group: 'For the sofrito', items: [
        '4 tbsp olive oil',
        '1 onion, very finely diced',
        '1 red pepper, finely diced',
        '4 garlic cloves, minced',
        '2 ripe tomatoes, grated to a pulp and skins discarded',
        '1 tsp sweet smoked paprika'
      ] },
      { group: 'For the rice', items: [
        '2 cups (400 g) bomba or calasparra rice',
        '5 cups (1.2 l) hot fish or shellfish stock',
        'Generous pinch of saffron threads',
        '1 tsp fine sea salt'
      ] },
      { group: 'For the seafood', items: [
        '12 large raw prawns, shell on',
        '1 lb (450 g) mussels, scrubbed and debearded',
        '9 oz (250 g) squid, cleaned and cut into rings',
        'Lemon wedges and flat-leaf parsley, to serve'
      ] }
    ],
    instructions: [
      { title: 'Warm the stock with saffron', text: 'Crumble the saffron into the hot stock and keep it barely simmering in a pan alongside. Adding cold stock to hot rice stalls the cook and gives you uneven grains.' },
      { title: 'Sear the seafood briefly', text: 'Heat the oil in the paella pan and sear the prawns for about 45 seconds a side, then the squid for a minute. Both should be barely coloured, not cooked through. Lift them out and set aside.' },
      { title: 'Build the sofrito', text: 'In the same pan cook the onion and pepper over medium heat for 8-10 minutes until soft. Add the garlic, then the grated tomato and the paprika, and cook 5-6 minutes more until it darkens to a thick jammy base with the oil separating.' },
      { title: 'Toast the rice', text: 'Tip in the rice and stir for 1-2 minutes so every grain is coated in the sofrito. This is the last time you will stir it.' },
      { title: 'Add stock and stop stirring', text: 'Pour in the hot saffron stock and the salt, shake the pan flat, and spread the rice into an even layer. Simmer briskly for 10 minutes, then lower the heat and cook 8 minutes more. Do not stir at any point from here.' },
      { title: 'Add the seafood back', text: 'Nestle the prawns, squid and mussels into the surface, hinge-side down for the mussels. Cover loosely with foil and cook 5-6 minutes until the mussels open; discard any that stay shut.' },
      { title: 'Make the socarrat and rest', text: 'Remove the foil and raise the heat to high for 60-90 seconds. Listen for a crackle and smell toasted rice, not burning. Take it off the heat, cover with a cloth and rest 5 minutes, then serve with lemon.' }
    ],
    tips: [
      'Use a short absorbent rice such as bomba or calasparra. Risotto rice releases starch and turns creamy, which is the opposite of what paella wants.',
      'The rice layer should be shallow, around 1/2 inch. A deep layer steams unevenly and never forms socarrat, which is why a wide pan matters more than a heavy one.',
      'Bloom the saffron in a little warm stock for ten minutes before it goes in. Threads dropped in dry never give up their full colour or aroma.'
    ],
    variations: [
      'Paella mixta adds chicken thigh and chorizo, browned at the start before the sofrito.',
      'For paella de verduras, use artichokes, green beans and butter beans with a good vegetable stock.',
      'Add a spoonful of alioli at the table, though purists will tell you not to.'
    ],
    storage: 'Best eaten the day it is made, since the seafood toughens on reheating and the socarrat softens. Leftovers keep 2 days refrigerated and are traditionally eaten cold or at room temperature rather than reheated. Do not freeze.',
    faqs: [
      { q: 'Why should I not stir paella?', a: 'Stirring releases starch and works the grains against each other, giving a creamy risotto texture. Paella is meant to have separate grains and a crisp base, and both depend on the rice sitting still in a flat, even layer.' },
      { q: 'How do I know when the socarrat has formed?', a: 'You hear it before you see it: a faint crackle and a smell of toasted rice, usually after 60-90 seconds on high heat at the end. Test by scraping gently with a spoon at the edge. Pull it the moment it smells like burning rather than toast.' },
      { q: 'Can I make paella without a paella pan?', a: 'Yes, provided the pan is wide and shallow so the rice sits in a thin layer. A large skillet works for four; a deep casserole does not, and neither does a pan so thin that the base scorches in patches.' }
    ],
    related: ['moussaka', 'garlic-butter-salmon', 'lemon-herb-shrimp']
  }
];

export default recipes;
