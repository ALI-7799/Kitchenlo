/**
 * Quick Dinners collection.
 * Consumed by src/data/recipes.js, which merges every collection into one array.
 */
import type { RecipeSource } from '../types.js';

const recipes: RecipeSource[] = [
  {
    slug: 'garlic-butter-salmon',
    title: 'Garlic Butter Salmon',
    description: 'A quick salmon dinner with bright lemon and a silky butter pan sauce, ready in under 20 minutes.',
    intro: 'This is the salmon we cook when the day got away from us. The fillets sear in a hot pan while a nutty garlic butter comes together alongside, and a squeeze of lemon at the end keeps the richness in check. Nothing about it is fussy, but it plates like something you would order out.',
    category: 'quick-dinners',
    cuisine: 'American',
    course: 'Dinner',
    method: 'Pan-Seared',
    diet: ['gluten-free', 'high-protein', 'low-carb'],
    keywords: ['garlic butter salmon', 'pan seared salmon', 'quick salmon dinner', '20 minute dinner'],
    image: 'assets/img/photos/garlic-butter-salmon.jpg',
    imageAlt: 'Seared salmon fillets with lemon slices and fresh parsley',
    prepMinutes: 5,
    cookMinutes: 12,
    servings: 4,
    yieldText: '4 fillets',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 214,
    datePublished: '2025-01-14',
    dateModified: '2026-08-02',
    nutrition: { calories: 412, protein: 34, carbs: 3, fat: 29, fiber: 0, sugar: 1, sodium: 380 },
    equipment: ['Large heavy skillet', 'Fish spatula', 'Microplane or fine grater'],
    ingredients: [
      { group: 'For the salmon', items: [
        '4 salmon fillets (about 6 oz / 170 g each), skin on',
        '1 tablespoon olive oil',
        '3/4 teaspoon fine sea salt',
        '1/2 teaspoon freshly ground black pepper'
      ] },
      { group: 'For the garlic butter', items: [
        '3 tablespoons unsalted butter',
        '4 garlic cloves, thinly sliced',
        '1 lemon (zest of the whole, juice of half)',
        '3 tablespoons flat-leaf parsley, chopped',
        'Pinch of chilli flakes (optional)'
      ] }
    ],
    instructions: [
      { title: 'Dry and season', text: 'Pat the salmon completely dry with paper towel, then season both sides with the salt and pepper. A dry surface is the whole trick to crisp skin.' },
      { title: 'Sear skin-side down', text: 'Heat the olive oil in a large skillet over medium-high until it shimmers. Lay the fillets in skin-side down, press each one flat for five seconds, and leave them alone for 5-6 minutes until the skin releases easily.' },
      { title: 'Flip and finish', text: 'Turn the fillets and cook 2-3 minutes more, until the centre reaches 125F / 52C for medium. Move them to a warm plate.' },
      { title: 'Build the pan sauce', text: 'Lower the heat to medium. Add the butter and sliced garlic to the same pan and swirl for 60-90 seconds, until the garlic is pale gold and the butter smells nutty. Do not let the garlic brown or it turns bitter.' },
      { title: 'Finish with lemon', text: 'Pull the pan off the heat and stir in the lemon zest, lemon juice, parsley and chilli flakes. The sauce will loosen and turn glossy.' },
      { title: 'Serve', text: 'Spoon the garlic butter over the fillets and serve straight away, with greens or rice to catch the sauce.' }
    ],
    tips: [
      'Take the salmon out of the fridge 15 minutes ahead so it cooks evenly from edge to centre.',
      'If your fillets are skinless, sear the presentation side first and shave a minute off each side.',
      'An instant-read thermometer removes the guesswork: 125F / 52C for medium, 130F / 54C for medium-well.'
    ],
    variations: [
      'Swap the parsley for dill and add a spoon of capers for a piccata feel.',
      'Add a splash of dry white wine to the pan before the lemon and let it reduce by half.',
      'Use the same garlic butter on trout, cod or thick halibut steaks.'
    ],
    storage: 'Refrigerate leftovers in an airtight container for up to 2 days. Reheat gently in a covered pan over low heat, or flake cold into a salad rather than microwaving, which dries the fish out.',
    faqs: [
      { q: 'How do I know when salmon is done?', a: 'The flesh turns from translucent to opaque and flakes when pressed with a fork. For accuracy, pull it at 125F / 52C in the thickest part for a moist medium centre; it climbs a few degrees while it rests.' },
      { q: 'Can I use frozen salmon?', a: 'Yes. Thaw it overnight in the fridge, then pat it very dry. Frozen fillets release more water, so give them an extra minute in the pan and avoid crowding.' },
      { q: 'Why did the skin stick to my pan?', a: 'Almost always the pan was not hot enough, or the fish was moved too early. Wait for the oil to shimmer, then leave the fillets undisturbed until the skin releases on its own.' }
    ],
    related: ['lemon-herb-shrimp', 'smoky-tomato-pasta', 'kale-salad']
  },
  {
    slug: 'pesto-tortellini',
    title: 'Pesto Chicken Tortellini',
    description: 'Cheesy tortellini, tender chicken and basil pesto tossed into a cozy weeknight bowl in 20 minutes.',
    intro: 'A bowl built almost entirely from things that keep: refrigerated tortellini, a jar of good pesto, and whatever cooked chicken is left from earlier in the week. Blistered cherry tomatoes and a splash of starchy pasta water pull it together into something that tastes deliberate.',
    category: 'quick-dinners',
    cuisine: 'Italian',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['high-protein'],
    keywords: ['pesto tortellini', 'chicken tortellini', 'quick pasta dinner', 'weeknight pasta'],
    image: 'assets/img/photos/pesto-tortellini.jpg',
    imageAlt: 'Tortellini in a vivid basil pesto sauce topped with fresh basil leaves',
    prepMinutes: 5,
    cookMinutes: 15,
    servings: 4,
    yieldText: '4 generous bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 186,
    datePublished: '2025-01-21',
    dateModified: '2026-07-19',
    nutrition: { calories: 598, protein: 35, carbs: 52, fat: 28, fiber: 4, sugar: 5, sodium: 820 },
    equipment: ['Large pot', 'Large skillet', 'Colander'],
    ingredients: [
      { group: 'Main', items: [
        '20 oz (570 g) refrigerated cheese tortellini',
        '2 cups (280 g) cooked chicken, shredded or cubed',
        '1/2 cup (120 g) basil pesto',
        '2 cups cherry tomatoes, halved',
        '2 tablespoons olive oil',
        '2 garlic cloves, minced'
      ] },
      { group: 'To finish', items: [
        '1/2 cup (45 g) grated parmesan, plus more to serve',
        'Handful of fresh basil leaves, torn',
        'Salt and black pepper to taste',
        'Reserved pasta water'
      ] }
    ],
    instructions: [
      { title: 'Boil the tortellini', text: 'Bring a large pot of well-salted water to a boil and cook the tortellini according to the package, usually 3-5 minutes. Scoop out a mug of pasta water before draining.' },
      { title: 'Blister the tomatoes', text: 'While the pasta cooks, heat the olive oil in a large skillet over medium-high. Add the cherry tomatoes cut-side down and leave them for 3-4 minutes until they char and slump.' },
      { title: 'Warm the chicken', text: 'Stir in the garlic and cook 30 seconds until fragrant, then add the chicken and toss for 2 minutes just to heat through.' },
      { title: 'Bring it together', text: 'Lower the heat, add the drained tortellini and the pesto, and fold gently. Splash in pasta water a little at a time until the sauce coats every piece and looks glossy rather than pasty.' },
      { title: 'Finish and serve', text: 'Off the heat, stir through the parmesan and torn basil. Taste, season, and serve immediately with extra cheese.' }
    ],
    tips: [
      'Add the pesto off direct heat. Boiling it dulls the basil and turns the colour army green.',
      'The pasta water is not optional; the starch is what makes jarred pesto cling like a real sauce.',
      'A rotisserie chicken makes this a genuine 20-minute meal with no extra pans.'
    ],
    variations: [
      'Stir in a handful of baby spinach with the tortellini and let it wilt from the residual heat.',
      'Swap the chicken for white beans or torn mozzarella to keep it vegetarian.',
      'Add a spoon of ricotta at the end for a creamier, richer bowl.'
    ],
    storage: 'Keeps in the fridge for 3 days. Reheat in a pan with a splash of water or stock to bring the sauce back; the microwave tends to make the pesto oily.',
    faqs: [
      { q: 'Can I use frozen tortellini?', a: 'Yes, cook it straight from frozen and add 2-3 minutes to the boiling time. Do not thaw it first or the pasta goes gummy.' },
      { q: 'Is homemade pesto worth it?', a: 'If you have basil to use up, yes, and it takes five minutes in a food processor. But a good jarred pesto finished with fresh basil and real parmesan gets you most of the way there.' },
      { q: 'How do I keep the sauce from drying out?', a: 'Reserve more pasta water than you think you need and add it gradually. Tortellini keeps absorbing liquid as it sits, so the sauce should look slightly loose in the pan.' }
    ],
    related: ['smoky-tomato-pasta', 'mediterranean-flatbread', 'chickpea-salad', 'spaghetti-carbonara']
  },
  {
    slug: 'taco-rice-bowls',
    title: 'Crispy Taco Rice Bowls',
    description: 'Spiced chicken, black beans and crisped rice layered into a loaded taco bowl with avocado and lime.',
    intro: 'All the pleasure of taco night without the assembly line. The rice gets pressed into a hot pan until the bottom crisps, which gives the bowl a crunchy base that holds up under salsa. Everything else is a matter of stacking.',
    category: 'quick-dinners',
    cuisine: 'Mexican-inspired',
    course: 'Dinner',
    method: 'Skillet',
    diet: ['gluten-free', 'high-protein'],
    keywords: ['taco rice bowl', 'burrito bowl', 'crispy rice', 'easy chicken dinner'],
    image: 'assets/img/photos/taco-rice-bowls.jpg',
    imageAlt: 'A taco rice bowl with black beans, chicken, guacamole and pico de gallo',
    prepMinutes: 10,
    cookMinutes: 18,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 302,
    datePublished: '2025-02-04',
    dateModified: '2026-08-11',
    nutrition: { calories: 615, protein: 38, carbs: 62, fat: 24, fiber: 12, sugar: 4, sodium: 690 },
    equipment: ['Large non-stick or cast-iron skillet', 'Mixing bowl'],
    ingredients: [
      { group: 'Spiced chicken', items: [
        '1.25 lb (570 g) boneless chicken thighs, cut into bite-size pieces',
        '2 teaspoons chilli powder',
        '1 teaspoon ground cumin',
        '1 teaspoon smoked paprika',
        '1/2 teaspoon garlic powder',
        '3/4 teaspoon salt',
        '1 tablespoon neutral oil'
      ] },
      { group: 'Bowls', items: [
        '3 cups cooked long-grain rice, preferably day-old',
        '1 can (15 oz / 425 g) black beans, drained and rinsed',
        '1 cup corn kernels, fresh or frozen',
        '1 large avocado, sliced',
        '1 cup salsa or pico de gallo',
        '1/2 cup (55 g) grated cheddar or cotija (crumbly salty Mexican cheese)',
        '2 limes, cut into wedges',
        'Fresh coriander, to serve'
      ] }
    ],
    instructions: [
      { title: 'Season the chicken', text: 'Toss the chicken with the chilli powder, cumin, smoked paprika, garlic powder and salt until every piece is coated.' },
      { title: 'Sear it hard', text: 'Heat the oil in a large skillet over medium-high. Add the chicken in a single layer and let it sit undisturbed for 4 minutes to brown, then stir and cook 3-4 minutes more until cooked through. Move it to a plate.' },
      { title: 'Crisp the rice', text: 'In the same pan, add the rice and press it into an even layer. Leave it for 4-5 minutes without stirring, until the underside is golden and crunchy.' },
      { title: 'Warm the beans and corn', text: 'Fold the black beans and corn through the rice and cook 2 minutes more, just to heat them and pick up the pan spices.' },
      { title: 'Build the bowls', text: 'Divide the crispy rice mixture between four bowls. Top with the chicken, avocado, salsa and cheese.' },
      { title: 'Finish', text: 'Scatter over coriander and serve with lime wedges to squeeze at the table.' }
    ],
    tips: [
      'Day-old refrigerated rice crisps far better than fresh; the drier grains fry instead of steaming.',
      'Resist stirring the rice while it crisps. The crust only forms if the grains stay in contact with the pan.',
      'Cast iron gives the best crust, but any heavy skillet works if you get it properly hot first.'
    ],
    variations: [
      'Use seasoned ground beef, chorizo or crumbled tofu in place of the chicken.',
      'Add pickled red onions and a drizzle of chipotle mayo for a sharper, smokier bowl.',
      'Swap the rice for cauliflower rice to cut the carbs, though it will not crisp the same way.'
    ],
    storage: 'Store the components separately for up to 4 days and assemble fresh. The rice re-crisps well in a hot dry pan; add the avocado only at serving.',
    faqs: [
      { q: 'Can I meal prep this?', a: 'It is one of the best recipes here for it. Cook the chicken and rice ahead, keep them in separate containers, and assemble bowls in three minutes on a weeknight.' },
      { q: 'What if I only have chicken breast?', a: 'It works, but cut the pieces slightly larger and reduce the second cooking stage to 2 minutes. Breast dries out fast at this heat.' },
      { q: 'How do I make it vegetarian?', a: 'Double the black beans and add a can of drained pinto beans, keeping the same spice mix. Press and cube extra-firm tofu if you want more protein.' }
    ],
    related: ['broccoli-quesadillas', 'quinoa-bowl', 'stuffed-peppers']
  },
  {
    slug: 'miso-noodles',
    title: 'Miso Noodle Stir-Fry',
    description: 'A fast noodle skillet with crisp snap peas, golden tofu and a glossy miso sauce that clings to every strand.',
    intro: 'Miso does a lot of work in a short time. Whisked with soy, sesame and a little honey it becomes a sauce that tastes slow-cooked but comes together while the noodles soak. Get the tofu properly golden first and the rest is a two-minute toss.',
    category: 'quick-dinners',
    cuisine: 'Asian-inspired',
    course: 'Dinner',
    method: 'Stir-Fry',
    diet: ['vegetarian', 'dairy-free'],
    keywords: ['miso noodles', 'tofu stir fry', 'vegetarian noodle recipe', 'quick stir fry'],
    image: 'assets/img/photos/miso-noodles.jpg',
    imageAlt: 'Stir-fried noodles with golden tofu, beansprouts and vegetables, lifted with chopsticks',
    prepMinutes: 12,
    cookMinutes: 13,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 141,
    datePublished: '2025-02-18',
    dateModified: '2026-06-28',
    nutrition: { calories: 486, protein: 21, carbs: 64, fat: 17, fiber: 6, sugar: 9, sodium: 940 },
    equipment: ['Wok or large skillet', 'Small whisk', 'Kitchen paper for pressing tofu'],
    ingredients: [
      { group: 'Noodles and vegetables', items: [
        '10 oz (280 g) flat rice noodles',
        '14 oz (400 g) extra-firm tofu, pressed and cubed',
        '2 tablespoons neutral oil',
        '2 cups sugar snap peas, trimmed',
        '2 medium carrots, cut into matchsticks',
        '4 spring onions, sliced on the diagonal'
      ] },
      { group: 'Miso sauce', items: [
        '3 tablespoons white miso paste (fermented soybean paste, from the chiller aisle)',
        '2 tablespoons soy sauce or tamari',
        '1 tablespoon honey or maple syrup',
        '1 tablespoon rice vinegar',
        '2 teaspoons toasted sesame oil',
        '1 tablespoon fresh ginger, grated',
        '1/3 cup (80 ml) warm water'
      ] },
      { group: 'To serve', items: [
        '2 teaspoons toasted sesame seeds',
        'Chilli oil or sriracha, optional'
      ] }
    ],
    instructions: [
      { title: 'Soak the noodles', text: 'Cover the rice noodles with just-boiled water and soak until pliable but still firm, 5-7 minutes. Drain and rinse under cold water so they stop cooking and do not clump.' },
      { title: 'Whisk the sauce', text: 'Whisk the miso, soy sauce, honey, rice vinegar, sesame oil, ginger and warm water in a small bowl until completely smooth with no lumps of paste.' },
      { title: 'Crisp the tofu', text: 'Heat 1 tablespoon of the oil in a wok over medium-high. Add the tofu in one layer and cook 6-8 minutes, turning every couple of minutes, until three or four sides are golden. Move it to a plate.' },
      { title: 'Stir-fry the vegetables', text: 'Add the remaining oil, then the carrots and snap peas. Toss constantly for 2-3 minutes; they should stay bright and squeaky, not soft.' },
      { title: 'Combine', text: 'Return the tofu, add the drained noodles and pour the sauce over. Toss for 1-2 minutes until everything is coated and the sauce has thickened slightly around the noodles.' },
      { title: 'Serve', text: 'Fold through most of the spring onions, then top with the rest, sesame seeds and chilli oil if you want heat.' }
    ],
    tips: [
      'Never boil miso. Add the sauce at the end and keep it to a brief simmer, or the flavour flattens and loses its savoury depth.',
      'Press the tofu for at least 15 minutes. Wet tofu steams and will not take on colour.',
      'Have everything cut and the sauce mixed before the wok goes on. A stir-fry gives you no time to chop mid-cook.'
    ],
    variations: [
      'Use udon or soba instead of rice noodles; cook them fully, then rinse.',
      'Add sliced shiitake mushrooms with the carrots for a deeper, meatier flavour.',
      'Swap tofu for prawns or thin strips of chicken, cooking them through in step three.'
    ],
    storage: 'Best eaten immediately, but leftovers keep 2 days. Rice noodles firm up when chilled, so reheat in a pan with a splash of water rather than the microwave.',
    faqs: [
      { q: 'What kind of miso should I use?', a: 'White (shiro) miso is mild and slightly sweet, which suits this sauce. Red miso works but is much saltier, so start with two tablespoons and taste.' },
      { q: 'Why did my noodles turn to mush?', a: 'They were most likely fully cooked during soaking. Rice noodles should come out of the water still firm because they finish cooking in the sauce.' },
      { q: 'Is this gluten free?', a: 'It can be. Use tamari instead of soy sauce and check that your miso is certified gluten free, as some varieties are made with barley.' }
    ],
    related: ['coconut-rice-bowl', 'honey-soy-chicken', 'quinoa-bowl']
  },
  {
    slug: 'mediterranean-flatbread',
    title: 'Mediterranean Flatbread',
    description: 'Warm flatbread layered with herbed ricotta, olives, blistered tomatoes and feta, on the table in 20 minutes.',
    intro: 'A flatbread is the fastest route to something that feels like an occasion. Spread a herbed ricotta base, pile on briny olives and tomatoes, and let a hot oven do the rest. It works as dinner with a salad, or cut small as something to hand round.',
    category: 'quick-dinners',
    cuisine: 'Mediterranean',
    course: 'Dinner',
    method: 'Baked',
    diet: ['vegetarian'],
    keywords: ['mediterranean flatbread', 'easy flatbread pizza', 'feta flatbread', 'vegetarian dinner'],
    image: 'assets/img/photos/mediterranean-flatbread.jpg',
    imageAlt: 'A flatbread topped with rocket, blistered tomatoes and cheese',
    prepMinutes: 8,
    cookMinutes: 12,
    servings: 4,
    yieldText: '2 large flatbreads',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 168,
    datePublished: '2025-03-03',
    dateModified: '2026-07-05',
    nutrition: { calories: 452, protein: 17, carbs: 44, fat: 23, fiber: 4, sugar: 5, sodium: 880 },
    equipment: ['Baking sheet', 'Small mixing bowl'],
    ingredients: [
      { group: 'Base', items: [
        '2 large flatbreads or naan',
        '1 cup (250 g) whole-milk ricotta',
        '1 garlic clove, grated',
        '1 teaspoon dried oregano',
        'Zest of 1 lemon',
        '2 tablespoons olive oil, plus more for drizzling'
      ] },
      { group: 'Toppings', items: [
        '1.5 cups cherry tomatoes, halved',
        '1/2 cup pitted kalamata olives, torn',
        '1/2 red onion, thinly sliced',
        '3.5 oz (100 g) feta, crumbled',
        'Fresh basil or mint leaves',
        'Chilli flakes and cracked black pepper'
      ] }
    ],
    instructions: [
      { title: 'Heat the oven', text: 'Heat the oven to 220C / 425F and slide a baking sheet in to warm. A preheated tray is what keeps the base crisp rather than soft.' },
      { title: 'Mix the ricotta', text: 'Stir the ricotta with the grated garlic, oregano, lemon zest, 1 tablespoon of the olive oil and a good pinch of salt until smooth and spreadable.' },
      { title: 'Assemble', text: 'Spread the herbed ricotta over the flatbreads, leaving a 1 cm border. Scatter over the tomatoes, olives and red onion, then drizzle with the remaining oil.' },
      { title: 'Bake', text: 'Bake on the hot tray for 10-12 minutes, until the edges are deep golden and the tomatoes have burst and started to caramelise.' },
      { title: 'Finish off the heat', text: 'Crumble the feta over the hot flatbread so it softens without drying out, then add the herbs, chilli flakes and pepper.' },
      { title: 'Slice and serve', text: 'Rest for 2 minutes, then cut into wedges and serve warm.' }
    ],
    tips: [
      'Add the feta after baking. Baked feta goes chalky, while residual heat leaves it creamy.',
      'Drain the ricotta in a sieve for ten minutes if it looks watery, or the base will steam.',
      'A pizza stone or upturned heavy baking sheet gets you closest to a proper crisp bottom.'
    ],
    variations: [
      'Add thin ribbons of courgette and a handful of pine nuts before baking.',
      'Swap ricotta for hummus and skip the oven for a no-cook lunch version.',
      'Lay over prosciutto and rocket after baking for a salty, peppery finish.'
    ],
    storage: 'Flatbread is best fresh. Leftover slices keep a day in the fridge and revive well in a hot oven for 5 minutes; avoid the microwave, which softens the base.',
    faqs: [
      { q: 'What flatbread works best?', a: 'Naan gives a chewier, more substantial base; thin Turkish pide or lavash gives a cracker-crisp result. Both work, so pick the texture you prefer.' },
      { q: 'Can I make it ahead?', a: 'Mix the ricotta base up to two days ahead and keep it chilled. Assemble and bake just before serving, as a topped raw flatbread goes soggy within the hour.' },
      { q: 'How do I stop it going soggy?', a: 'Preheat the tray, do not over-spread the ricotta, and halve the tomatoes rather than slicing them thin so they release less water.' }
    ],
    related: ['ricotta-toasts', 'chickpea-salad', 'roasted-wrap']
  },
  {
    slug: 'honey-soy-chicken',
    title: 'Honey Soy Chicken Skillet',
    description: 'Tender chicken and crisp vegetables glazed in a sweet-savoury honey soy sauce that reduces to a lacquer.',
    intro: 'Four pantry ingredients make the glaze, and the pan does the rest. The sauce reduces around the chicken until it turns sticky and dark, catching on the broccoli and peppers. Serve it over rice and there is nothing left in the pan worth washing off.',
    category: 'quick-dinners',
    cuisine: 'Asian-inspired',
    course: 'Dinner',
    method: 'Skillet',
    diet: ['dairy-free', 'high-protein'],
    keywords: ['honey soy chicken', 'chicken skillet', 'sticky chicken', 'easy chicken stir fry'],
    image: 'assets/img/photos/honey-soy-chicken.jpg',
    imageAlt: 'Glazed honey soy chicken with sesame seeds, spring onion and broccoli',
    prepMinutes: 10,
    cookMinutes: 16,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 259,
    datePublished: '2025-03-17',
    dateModified: '2026-08-20',
    nutrition: { calories: 468, protein: 39, carbs: 34, fat: 18, fiber: 4, sugar: 22, sodium: 1020 },
    equipment: ['Large skillet or wok', 'Small bowl'],
    ingredients: [
      { group: 'Chicken and vegetables', items: [
        '1.5 lb (680 g) boneless chicken thighs, sliced',
        '1 tablespoon neutral oil',
        '3 cups broccoli florets',
        '1 red bell pepper, sliced',
        '3 garlic cloves, minced',
        '1 tablespoon fresh ginger, grated'
      ] },
      { group: 'Honey soy glaze', items: [
        '1/3 cup (80 ml) soy sauce',
        '1/4 cup (85 g) honey',
        '2 tablespoons rice vinegar',
        '1 teaspoon toasted sesame oil',
        '1 tablespoon cornflour mixed with 2 tablespoons cold water'
      ] },
      { group: 'To serve', items: [
        'Steamed rice, from about 1.5 cups (280 g) uncooked',
        'Sesame seeds and sliced spring onion'
      ] }
    ],
    instructions: [
      { title: 'Mix the glaze', text: 'Stir the soy sauce, honey, rice vinegar and sesame oil together in a small bowl. Keep the cornflour slurry separate for now.' },
      { title: 'Brown the chicken', text: 'Heat the oil in a large skillet over medium-high. Add the chicken in a single layer and cook 5-6 minutes, turning once, until deeply golden. Move it to a plate.' },
      { title: 'Cook the vegetables', text: 'Add the broccoli and pepper to the pan with a splash of water. Cover and steam 3 minutes, then uncover and toss until the broccoli is bright green and just tender.' },
      { title: 'Bloom the aromatics', text: 'Push the vegetables aside, add the garlic and ginger to the bare pan and cook 30 seconds until fragrant.' },
      { title: 'Glaze', text: 'Return the chicken, pour in the sauce and bring to a simmer. Stir in the cornflour slurry and cook 1-2 minutes until the glaze thickens and coats everything in a shiny layer.' },
      { title: 'Serve', text: 'Spoon over steamed rice and finish with sesame seeds and spring onion.' }
    ],
    tips: [
      'Add the cornflour slurry only once the sauce is simmering, or it will not thicken properly.',
      'Thighs stay juicy under a hot glaze in a way breast meat does not; if you use breast, cut the browning time to 4 minutes.',
      'Use low-sodium soy sauce. Full-strength soy plus reduction can push this past salty.'
    ],
    variations: [
      'Add a tablespoon of gochujang or sriracha to the glaze for a sweet-hot version.',
      'Swap in green beans, snap peas or bok choy depending on what is in the drawer.',
      'Make it with firm tofu or salmon fillets, glazing them in the last two minutes.'
    ],
    storage: 'Keeps 3 days refrigerated and reheats well, as the glaze loosens with a splash of water. It also freezes for up to 2 months without the rice.',
    faqs: [
      { q: 'Why is my glaze thin?', a: 'Either the slurry went in before the sauce was simmering, or it needed another minute. Keep it bubbling and stir constantly; it thickens quite suddenly.' },
      { q: 'Can I make this ahead for lunches?', a: 'Yes. Cook it fully, cool quickly, and portion over rice. The flavour actually deepens by the next day.' },
      { q: 'What can I use instead of honey?', a: 'Maple syrup works one-for-one and keeps it vegan-friendly. Brown sugar also works, using three tablespoons dissolved into the soy sauce.' }
    ],
    related: ['miso-noodles', 'taco-rice-bowls', 'coconut-rice-bowl']
  },
  {
    slug: 'ricotta-toasts',
    title: 'Spinach Ricotta Toasts',
    description: 'Thick toasted sourdough topped with whipped lemon ricotta and garlicky wilted spinach.',
    intro: 'Somewhere between a snack and a light dinner. The ricotta gets whipped with lemon until it is almost mousse-like, the spinach wilts in garlic oil in about ninety seconds, and good bread carries the whole thing. Add a fried egg and it becomes a proper meal.',
    category: 'quick-dinners',
    cuisine: 'Italian-inspired',
    course: 'Light Dinner',
    method: 'Stovetop',
    diet: ['vegetarian'],
    keywords: ['ricotta toast', 'spinach toast', 'quick vegetarian dinner', 'whipped ricotta'],
    image: 'assets/img/photos/ricotta-toasts.jpg',
    imageAlt: 'Toasted sourdough spread with whipped ricotta and greens',
    prepMinutes: 6,
    cookMinutes: 9,
    servings: 4,
    yieldText: '4 large toasts',
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 97,
    datePublished: '2025-04-02',
    dateModified: '2026-05-30',
    nutrition: { calories: 338, protein: 15, carbs: 32, fat: 17, fiber: 3, sugar: 3, sodium: 540 },
    equipment: ['Skillet', 'Food processor or whisk', 'Toaster or griddle pan'],
    ingredients: [
      { group: 'Whipped ricotta', items: [
        '1.5 cups (375 g) whole-milk ricotta',
        'Zest and juice of 1 lemon',
        '2 tablespoons olive oil',
        '1/2 teaspoon salt'
      ] },
      { group: 'Garlic spinach', items: [
        '2 tablespoons olive oil',
        '3 garlic cloves, thinly sliced',
        '10 oz (280 g) baby spinach',
        'Pinch of chilli flakes',
        'Squeeze of lemon'
      ] },
      { group: 'To assemble', items: [
        '4 thick slices sourdough',
        '1 garlic clove, halved, for rubbing',
        'Flaky salt and black pepper',
        'Toasted pine nuts, optional'
      ] }
    ],
    instructions: [
      { title: 'Whip the ricotta', text: 'Blitz the ricotta with the lemon zest, half the juice, olive oil and salt for 30 seconds until light and completely smooth. A whisk and some patience also works.' },
      { title: 'Toast the bread', text: 'Toast or griddle the sourdough until well coloured, then rub the cut garlic clove over one side while it is still hot.' },
      { title: 'Wilt the spinach', text: 'Heat the oil in a skillet over medium, add the sliced garlic and chilli flakes and cook 45 seconds. Add the spinach in handfuls, tossing until just collapsed, about 90 seconds total.' },
      { title: 'Drain it', text: 'Tip the spinach into a sieve and press gently. Wet spinach will slide straight off the ricotta.' },
      { title: 'Assemble', text: 'Spread the whipped ricotta thickly over each toast, pile the spinach on top, and finish with the remaining lemon juice.' },
      { title: 'Season and serve', text: 'Add flaky salt, plenty of black pepper, a drizzle of olive oil and the pine nuts if using. Eat immediately.' }
    ],
    tips: [
      'Squeeze the spinach properly. This one step is the difference between a crisp toast and a soggy one.',
      'Whipping ricotta transforms the texture; even supermarket ricotta becomes silky after 30 seconds in a processor.',
      'Cut the bread thick, at least 2 cm, so it can hold the weight of the topping.'
    ],
    variations: [
      'Top with a jammy soft-boiled egg to turn it into a full dinner.',
      'Add roasted cherry tomatoes or a spoon of hot honey for contrast.',
      'Swap spinach for wilted kale or chard, giving them an extra two minutes in the pan.'
    ],
    storage: 'The whipped ricotta keeps 4 days in the fridge and is worth making in a double batch. Assemble the toasts only at the moment of serving.',
    faqs: [
      { q: 'Can I use a different cheese?', a: 'Whipped feta gives a saltier, tangier result, and cottage cheese blended smooth is a higher-protein swap. Both suit the garlicky spinach.' },
      { q: 'How do I make this more filling?', a: 'Add a fried or poached egg, some white beans folded through the spinach, or slices of prosciutto draped over the top.' },
      { q: 'Does the bread matter?', a: 'Quite a lot. Sourdough or another open, chewy loaf holds up under a wet topping; soft sandwich bread collapses.' }
    ],
    related: ['mediterranean-flatbread', 'herbed-yogurt-bowl', 'kale-salad']
  },
  {
    slug: 'smoky-tomato-pasta',
    title: 'Smoky Tomato Pasta',
    description: 'A pantry pasta built on slow-blistered tomatoes, smoked paprika and a silky, emulsified finish.',
    intro: 'The trick is patience in one place only: letting the tomatoes properly collapse and catch before anything else goes in. Smoked paprika gives it a depth that tastes like it simmered for an hour, and a knob of butter at the end makes the sauce cling.',
    category: 'quick-dinners',
    cuisine: 'Italian-inspired',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['vegetarian'],
    keywords: ['smoky tomato pasta', 'pantry pasta', 'easy tomato pasta', 'smoked paprika pasta'],
    image: 'assets/img/photos/smoky-tomato-pasta.jpg',
    imageAlt: 'Fusilli in a smoky tomato sauce with cherry tomatoes and basil',
    prepMinutes: 8,
    cookMinutes: 22,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 203,
    datePublished: '2025-04-16',
    dateModified: '2026-07-28',
    nutrition: { calories: 524, protein: 16, carbs: 78, fat: 17, fiber: 6, sugar: 9, sodium: 610 },
    equipment: ['Large pot', 'Wide sauté pan'],
    ingredients: [
      { group: 'Sauce', items: [
        '3 tablespoons olive oil',
        '1 small onion, finely diced',
        '4 garlic cloves, sliced',
        '2 tablespoons tomato paste',
        '2 teaspoons smoked paprika',
        '1/2 teaspoon chilli flakes',
        '1 can (28 oz / 800 g) whole plum tomatoes, crushed by hand',
        '1 teaspoon sugar',
        'Salt and black pepper'
      ] },
      { group: 'To finish', items: [
        '1 lb (450 g) rigatoni or penne',
        '2 tablespoons unsalted butter',
        '1/2 cup (45 g) grated parmesan',
        'Fresh basil leaves',
        'Reserved pasta water'
      ] }
    ],
    instructions: [
      { title: 'Soften the aromatics', text: 'Heat the olive oil in a wide pan over medium. Cook the onion with a pinch of salt for 6-7 minutes until soft and translucent, then add the garlic for 1 minute more.' },
      { title: 'Caramelise the paste', text: 'Stir in the tomato paste, smoked paprika and chilli flakes and cook for 2 full minutes, until the paste darkens to a brick red and smells sweet rather than raw. This is where the depth comes from.' },
      { title: 'Add the tomatoes', text: 'Tip in the crushed tomatoes and the sugar, season, and simmer uncovered for 12-15 minutes, stirring now and then, until the sauce thickens and the oil separates at the edges.' },
      { title: 'Cook the pasta', text: 'Meanwhile boil the pasta in well-salted water until 2 minutes short of the package time. Reserve a large mug of pasta water before draining.' },
      { title: 'Marry them', text: 'Add the drained pasta to the sauce with a splash of pasta water and toss over medium heat for 2 minutes so the pasta finishes cooking in the sauce.' },
      { title: 'Emulsify and serve', text: 'Off the heat, beat in the butter and parmesan with more pasta water until the sauce turns glossy and coats each tube. Top with basil.' }
    ],
    tips: [
      'Cooking the tomato paste until it darkens is the single highest-impact step; two minutes of attention pays for itself.',
      'Buy whole plum tomatoes and crush them yourself. Pre-crushed tins are usually made from lower-grade fruit.',
      'Finishing the pasta in the sauce, not the water, is what makes restaurant pasta taste different from home pasta.'
    ],
    variations: [
      'Add a scoop of ricotta or a splash of cream for a rosy, richer sauce.',
      'Fry chorizo or pancetta at the start and build the sauce in the rendered fat.',
      'Stir a tin of drained cannellini beans through at the end for protein.'
    ],
    storage: 'The sauce keeps 5 days refrigerated and freezes for 3 months, so it is worth doubling. Store sauce and pasta separately if you can.',
    faqs: [
      { q: 'Can I use fresh tomatoes?', a: 'In peak summer, yes; use about 2 lb of ripe tomatoes, roughly chopped, and simmer 10 minutes longer to drive off the extra water. Out of season, tinned will taste better.' },
      { q: 'Why is my sauce watery?', a: 'It has not reduced enough. Keep it at an active simmer uncovered until you can drag a spoon through and the trail holds for a second.' },
      { q: 'What pasta shape is best?', a: 'Ridged tubes like rigatoni catch this sauce best. Long shapes work but need a slightly looser sauce and more vigorous tossing.' }
    ],
    related: ['pesto-tortellini', 'mediterranean-flatbread', 'stuffed-peppers', 'spaghetti-carbonara']
  },
  {
    slug: 'lemon-herb-shrimp',
    title: 'Lemon Herb Shrimp',
    description: 'Juicy shrimp in a bright lemon and white wine pan sauce that comes together in under ten minutes.',
    intro: 'Shrimp cook so fast that the sauce has to be ready to meet them. Here the wine reduces first, the shrimp go in for barely three minutes, and cold butter whisked in at the end pulls it into something glossy. It is a dinner-party dish that happens to take ten minutes.',
    category: 'quick-dinners',
    cuisine: 'Mediterranean',
    course: 'Dinner',
    method: 'Pan-Seared',
    diet: ['gluten-free', 'high-protein', 'low-carb'],
    keywords: ['lemon garlic shrimp', 'shrimp scampi', 'quick shrimp recipe', '10 minute dinner'],
    image: 'assets/img/photos/lemon-herb-shrimp.jpg',
    imageAlt: 'Lemon herb shrimp in a pan sauce with cherry tomatoes and bread',
    prepMinutes: 8,
    cookMinutes: 9,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 241,
    datePublished: '2025-05-06',
    dateModified: '2026-08-14',
    nutrition: { calories: 296, protein: 31, carbs: 5, fat: 16, fiber: 1, sugar: 1, sodium: 720 },
    equipment: ['Large skillet', 'Tongs'],
    ingredients: [
      { group: 'Shrimp', items: [
        '1.5 lb (680 g) large shrimp, peeled and deveined',
        '1/2 teaspoon salt',
        '1/4 teaspoon black pepper',
        '2 tablespoons olive oil'
      ] },
      { group: 'Pan sauce', items: [
        '4 garlic cloves, minced',
        '1/2 cup (120 ml) dry white wine or chicken stock',
        'Juice and zest of 1 large lemon',
        '3 tablespoons cold unsalted butter, cubed',
        '1/4 cup flat-leaf parsley, chopped',
        '2 tablespoons fresh dill or chives',
        'Pinch of chilli flakes'
      ] }
    ],
    instructions: [
      { title: 'Prep the shrimp', text: 'Pat the shrimp very dry and season with the salt and pepper. Dry shrimp sear; wet shrimp steam and turn rubbery.' },
      { title: 'Sear fast', text: 'Heat the olive oil in a large skillet over medium-high until shimmering. Add the shrimp in one layer and cook 90 seconds per side, until just pink and opaque. Move them to a plate immediately.' },
      { title: 'Start the sauce', text: 'Lower the heat to medium, add the garlic to the same pan and cook 30 seconds until fragrant but not coloured.' },
      { title: 'Deglaze', text: 'Pour in the wine and scrape up everything stuck to the bottom. Simmer 2-3 minutes until reduced by half.' },
      { title: 'Mount the butter', text: 'Take the pan off the heat and whisk in the cold butter one cube at a time, along with the lemon juice and zest, until the sauce is creamy and emulsified.' },
      { title: 'Return and finish', text: 'Slide the shrimp and any resting juices back into the pan, add the herbs and chilli flakes, and toss for 30 seconds to warm through. Serve with bread or over pasta.' }
    ],
    tips: [
      'Shrimp are done the moment they curl into a loose C. A tight O means overcooked.',
      'Cold butter, added off the heat, is what emulsifies the sauce. Melted butter will split it.',
      'Cook in two batches if your pan is crowded. Crowded shrimp release water and boil.'
    ],
    variations: [
      'Add halved cherry tomatoes with the garlic for a lighter, fresher sauce.',
      'Toss with linguine and a splash of pasta water to make it scampi.',
      'Swap the shrimp for scallops, searing them 2 minutes per side.'
    ],
    storage: 'Best the day it is made. Leftovers keep 1 day and are better eaten cold over salad than reheated, since shrimp toughen on a second cooking.',
    faqs: [
      { q: 'Can I use frozen shrimp?', a: 'Yes, and most shrimp sold fresh was previously frozen anyway. Thaw in cold water for 15 minutes, drain thoroughly and pat completely dry.' },
      { q: 'What if I do not cook with wine?', a: 'Chicken or vegetable stock with an extra squeeze of lemon works well. You lose a little acidity, so taste and adjust the lemon at the end.' },
      { q: 'Why did my sauce split?', a: 'The pan was too hot when the butter went in. Take it fully off the heat, let it cool for thirty seconds, then whisk the cubes in gradually.' }
    ],
    related: ['garlic-butter-salmon', 'smoky-tomato-pasta', 'kale-salad']
  },
  {
    slug: 'broccoli-quesadillas',
    title: 'Cheesy Broccoli Quesadillas',
    description: 'Crisp golden tortillas filled with charred broccoli, melted cheddar and a little smoky heat.',
    intro: 'Charring the broccoli first is what separates this from a sad vegetable quesadilla. The florets get browned and nutty, tossed with cumin and chilli, then sealed into a tortilla with enough cheese to hold everything together. Kids eat them; so does everyone else.',
    category: 'quick-dinners',
    cuisine: 'Mexican-inspired',
    course: 'Dinner',
    method: 'Skillet',
    diet: ['vegetarian'],
    keywords: ['broccoli quesadilla', 'cheesy quesadilla', 'vegetarian quesadilla', 'easy family dinner'],
    image: 'assets/img/photos/broccoli-quesadillas.jpg',
    imageAlt: 'Crisp quesadilla wedges served with salsa, guacamole and sour cream',
    prepMinutes: 10,
    cookMinutes: 16,
    servings: 4,
    yieldText: '4 quesadillas',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 154,
    datePublished: '2025-05-20',
    dateModified: '2026-06-11',
    nutrition: { calories: 486, protein: 21, carbs: 42, fat: 27, fiber: 6, sugar: 4, sodium: 790 },
    equipment: ['Large skillet', 'Box grater'],
    ingredients: [
      { group: 'Filling', items: [
        '4 cups broccoli florets, cut small',
        '2 tablespoons olive oil',
        '1 teaspoon ground cumin',
        '1/2 teaspoon chilli powder',
        '1/2 teaspoon salt',
        '2 spring onions, sliced',
        '2 cups (220 g) grated sharp cheddar'
      ] },
      { group: 'To assemble', items: [
        '4 large flour tortillas',
        '1 tablespoon butter or oil, for the pan',
        'Sour cream, salsa and lime, to serve'
      ] }
    ],
    instructions: [
      { title: 'Char the broccoli', text: 'Heat the olive oil in a large skillet over medium-high. Add the broccoli and leave it undisturbed for 3 minutes to catch and brown, then toss and cook 3-4 minutes more until tender-crisp with dark edges.' },
      { title: 'Season it', text: 'Stir in the cumin, chilli powder and salt and cook 30 seconds. Tip into a bowl, add the spring onions, and roughly chop any large pieces.' },
      { title: 'Fill the tortillas', text: 'Scatter cheese over half of each tortilla, add a quarter of the broccoli, then top with a little more cheese and fold over. The cheese on both sides is the glue.' },
      { title: 'Cook until golden', text: 'Wipe the pan, melt a little butter over medium heat, and cook each quesadilla 2-3 minutes per side, pressing gently with a spatula, until deeply golden and the cheese has melted through.' },
      { title: 'Rest before cutting', text: 'Let each one sit for a minute on a board. Cutting immediately makes the filling run out.' },
      { title: 'Serve', text: 'Cut into wedges and serve with sour cream, salsa and a squeeze of lime.' }
    ],
    tips: [
      'Cut the broccoli small, no bigger than a thumbnail, so the quesadilla folds flat and cooks evenly.',
      'Grate your own cheese. Pre-shredded cheese is coated in starch and melts into a grainy layer instead of a smooth one.',
      'Medium heat only. Too hot and the tortilla burns before the cheese melts.'
    ],
    variations: [
      'Add black beans or shredded chicken for a heartier filling.',
      'Swap cheddar for a mix of monterey jack and pepper jack if you want more heat.',
      'Use corn tortillas and make smaller folded tacos for a gluten-free version.'
    ],
    storage: 'Best fresh, but cooked quesadillas keep 2 days and re-crisp beautifully in a dry pan or air fryer. Do not microwave them or the tortilla goes leathery.',
    faqs: [
      { q: 'Can I use frozen broccoli?', a: 'Yes, but thaw it and squeeze out as much water as you can first. It will not char as well, so expect a softer filling.' },
      { q: 'How do I keep them from falling apart?', a: 'Cheese on both sides of the filling, do not overfill, and let them rest a minute before cutting. Pressing with a spatula while cooking also helps them seal.' },
      { q: 'Can I make a batch for a crowd?', a: 'Cook them all and hold them on a rack in a 150C / 300F oven. A rack keeps the bottoms crisp, whereas a plate traps steam.' }
    ],
    related: ['taco-rice-bowls', 'stuffed-peppers', 'roasted-wrap']
  },
  {
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti Carbonara',
    description: 'Guanciale, egg yolk and pecorino emulsified with pasta water into a glossy sauce, with no cream anywhere near it.',
    intro: 'Carbonara is four ingredients and one technique, and the technique is temperature control. The sauce is an emulsion of egg yolk, cheese and rendered pork fat, loosened with starchy pasta water; take it above roughly 160F and the yolk scrambles. So the pan comes off the heat before the eggs go in, and the residual warmth of the pasta does the rest. Cream is not in the dish and never was: it is a shortcut that papers over a broken emulsion.',
    category: 'quick-dinners',
    cuisine: 'Italian',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['high-protein'],
    keywords: ['carbonara recipe', 'spaghetti carbonara', 'authentic carbonara no cream', 'quick italian pasta'],
    image: 'assets/img/photos/spaghetti-carbonara.jpg',
    imageAlt: 'Spaghetti carbonara with crisp guanciale cubes and grated pecorino',
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Medium',
    rating: 4.9,
    ratingCount: 341,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 612, protein: 27, carbs: 66, fat: 26, fiber: 3, sugar: 3, sodium: 780 },
    equipment: ['Large pot', 'Large skillet', 'Mixing bowl', 'Microplane or fine grater'],
    ingredients: [
      { group: 'The four ingredients', items: [
        '1 lb (450 g) spaghetti or rigatoni',
        '7 oz (200 g) guanciale (cured pork cheek), cut into 1/4 inch (5 mm) batons',
        '4 large egg yolks plus 1 whole egg',
        '1 cup (90 g) pecorino romano, finely grated, plus more to serve'
      ] },
      { group: 'To finish', items: [
        '1.5 teaspoons coarsely cracked black pepper',
        'Salt, for the pasta water',
        'Reserved pasta water'
      ] }
    ],
    instructions: [
      { title: 'Boil the pasta', text: 'Bring a large pot of well-salted water to a boil and cook the spaghetti to one minute short of the package time. Salt the water less than usual, because the guanciale and pecorino both bring a lot.' },
      { title: 'Render the guanciale', text: 'Put the guanciale in a cold, dry skillet and set it over medium-low heat. Starting cold renders the fat slowly instead of burning the outside. Cook 8-10 minutes until the fat is translucent and the edges are crisp, then take the pan off the heat.' },
      { title: 'Make the egg and cheese paste', text: 'In a bowl, whisk the yolks, whole egg, pecorino and black pepper into a thick paste. It should look like wet sand rather than a liquid; the cheese is doing structural work here.' },
      { title: 'Temper the eggs', text: 'Whisk two or three tablespoons of hot pasta water into the egg mixture, a little at a time. This warms it gently so it does not seize when it meets the pasta.' },
      { title: 'Combine off the heat', text: 'Drain the pasta, reserving a large mug of water, and tip it into the skillet with the rendered fat. Toss to coat, wait 30 seconds for the pan to cool slightly, then pour in the egg mixture and toss hard and continuously.' },
      { title: 'Loosen and serve', text: 'Add pasta water a splash at a time, tossing all the while, until the sauce turns glossy and coats every strand. Serve immediately with more pecorino and pepper; carbonara waits for nobody.' }
    ],
    tips: [
      'Take the pan off the heat before the eggs go in. Almost every scrambled carbonara comes from adding them to a pan still on the burner.',
      'Grate the pecorino as finely as you can. Coarse shreds refuse to melt into the emulsion and leave stringy clumps.',
      'Keep more pasta water than you think you need. The sauce tightens as it cools on the plate, so it should look slightly loose in the pan.'
    ],
    variations: [
      'Pancetta is the usual substitute for guanciale, and streaky bacon works at a push, though both are leaner and less sweet.',
      'Cacio e pepe is the same dish without the pork or egg: just pecorino, pepper and pasta water.',
      'For a vegetarian version, render cubes of smoked firm tofu or use browned butter in place of the pork fat.'
    ],
    storage: 'Carbonara must be eaten immediately; the emulsion breaks as it cools and cannot be brought back. Leftovers keep a day in the fridge and are best refried into a frittata-style cake rather than reheated as pasta.',
    faqs: [
      { q: 'Should carbonara contain cream?', a: 'No. The sauce is an emulsion of egg yolk, cheese, pork fat and pasta water, and it is creamy without any cream in it. Cream is added to make the dish forgiving, but it mutes the pecorino and gives a heavier, flatter result.' },
      { q: 'My eggs scrambled. What went wrong?', a: 'The pan was too hot. Egg yolk sets from about 150F, so the skillet must be off the heat and given half a minute to cool before the egg goes in. Tempering with a little hot pasta water first also helps considerably.' },
      { q: 'What is the difference between guanciale and pancetta?', a: 'Guanciale is cured pork cheek, pancetta is cured belly. Guanciale has a higher proportion of fat, renders to a softer texture and tastes sweeter and more intense, which is why it is traditional here. Pancetta is a perfectly good stand-in.' }
    ],
    related: ['smoky-tomato-pasta', 'creamy-tomato-rigatoni', 'pesto-tortellini']
  },
  {
    slug: 'thai-green-curry',
    title: 'Thai Green Curry',
    description: 'Green curry paste fried in cracked coconut cream, with chicken, Thai aubergine and basil, balanced with fish sauce and lime.',
    intro: 'The step that separates a fragrant green curry from a flat one takes four minutes and is usually skipped. Coconut cream is heated until it splits and the oil rises, and the paste is fried in that oil until it darkens and smells of makrut lime and galangal. Only then does the rest of the coconut milk go in. Skip it and you are boiling paste in liquid, which tastes raw and one-dimensional no matter how much fish sauce you add afterwards.',
    category: 'quick-dinners',
    cuisine: 'Thai',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['gluten-free', 'dairy-free'],
    keywords: ['thai green curry', 'green curry recipe', 'coconut curry chicken', 'quick thai dinner'],
    image: 'assets/img/photos/thai-green-curry.jpg',
    imageAlt: 'A bowl of Thai green curry with chicken, Thai aubergines and chillies',
    prepMinutes: 15,
    cookMinutes: 20,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 228,
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    nutrition: { calories: 486, protein: 32, carbs: 14, fat: 34, fiber: 4, sugar: 7, sodium: 1040 },
    equipment: ['Wok or wide skillet', 'Rice pan', 'Wooden spoon'],
    ingredients: [
      { group: 'For the curry', items: [
        '2 cans (14 oz / 400 ml each) full-fat coconut milk, not shaken',
        '3-4 tablespoons green curry paste, to taste',
        '1.5 lb (680 g) chicken thighs, sliced into strips',
        '5 oz (150 g) Thai aubergines (small, green, golf-ball sized), quartered, or 1 regular aubergine, cubed',
        '3 makrut lime leaves (also sold as kaffir lime leaves), torn',
        '1 cup (150 g) green beans, cut into 2 inch (5 cm) lengths'
      ] },
      { group: 'To season', items: [
        '2 tablespoons fish sauce, plus more to taste',
        '1 tablespoon palm sugar (sold in blocks or tubs) or soft brown sugar',
        'Juice of 1/2 lime',
        'Large handful of Thai basil leaves',
        '1 red chilli, sliced on the diagonal'
      ] },
      { group: 'To serve', items: [
        'Jasmine rice, from about 1.5 cups (280 g) uncooked',
        'Lime wedges'
      ] }
    ],
    instructions: [
      { title: 'Crack the coconut cream', text: 'Open the cans without shaking and spoon the thick cream from the top into a wok. Heat over medium-high for 3-4 minutes until it bubbles, thickens and the clear oil visibly separates out. This is the step that makes the curry.' },
      { title: 'Fry the paste', text: 'Stir the curry paste into that hot oil and fry 2-3 minutes, pressing it against the pan, until it darkens a shade and smells intensely aromatic. It should sizzle rather than simmer.' },
      { title: 'Seal the chicken', text: 'Add the chicken strips and turn them through the paste for 3-4 minutes until coated and no longer pink outside.' },
      { title: 'Add the rest of the coconut milk', text: 'Pour in the remaining coconut milk with the lime leaves and aubergine. Bring to a gentle simmer and cook 8-10 minutes, until the aubergine is tender and the chicken is cooked through. Do not let it boil hard or the coconut milk will separate.' },
      { title: 'Add the beans and season', text: 'Stir in the green beans and cook 3 minutes more. Season with the fish sauce, sugar and lime juice, then taste and adjust. A green curry should land salty, sweet, sour and hot all at once, with no single note dominating.' },
      { title: 'Finish with basil', text: 'Take the pan off the heat, stir through the Thai basil and sliced chilli, and let the residual heat wilt them. Serve straight away with jasmine rice.' }
    ],
    tips: [
      'Do not shake the coconut milk cans. You need the thick cream from the top separately, and shaking makes the cracking step impossible.',
      'Taste and adjust at the end, always. Curry pastes vary enormously in salt and heat between brands, so the fish sauce and sugar quantities here are a starting point rather than a rule.',
      'Add the basil off the heat. Boiled Thai basil turns black and loses the aniseed note it is there for.'
    ],
    variations: [
      'Use prawns, firm white fish or sliced beef; add prawns in only the last 3 minutes.',
      'For a vegan version, use tofu and vegetables, swap the fish sauce for light soy or a vegan fish sauce, and check the paste for shrimp paste.',
      'Bamboo shoots, sugar snap peas, courgette and red pepper all work in place of the aubergine.'
    ],
    storage: 'Keeps 3 days in the fridge and the flavour deepens overnight. Reheat gently without boiling. It freezes for 2 months, though the coconut milk can look grainy on thawing; whisk it as it warms and it will come back together.',
    faqs: [
      { q: 'Why is my green curry not green?', a: 'Long cooking dulls the colour, and many commercial pastes are duller than homemade to begin with. Adding the Thai basil off the heat at the very end restores some brightness, and avoiding a hard boil keeps the paste from browning.' },
      { q: 'How do I make it less spicy?', a: 'Use less paste and make up the volume with more coconut cream, which tempers heat without thinning the flavour. A little extra palm sugar also rounds the edge. Serve the sliced fresh chilli on the side rather than stirred in.' },
      { q: 'Can I use light coconut milk?', a: 'Not for this method. Light coconut milk has too little fat to crack and release oil, so you cannot fry the paste properly, and the finished sauce stays thin. Use full-fat and serve smaller portions if that is the concern.' }
    ],
    related: ['chicken-tikka-masala', 'miso-noodles', 'coconut-rice-bowl']
  },
  {
    slug: 'chicken-fajitas',
    title: 'Sheet Pan Chicken Fajitas',
    description: 'Spiced chicken strips, peppers and onions roasted on one tray and piled into warm tortillas.',
    intro: 'Fajitas made in a pan mean cooking in batches to avoid crowding. A very hot oven and a single large tray get around that: everything roasts at once, the edges char the way they would on a griddle, and the only pan to wash is the one the tortillas warmed in. The lime goes on after roasting, never before.',
    category: 'quick-dinners',
    cuisine: 'Mexican-inspired',
    course: 'Dinner',
    method: 'Roasted',
    diet: ['gluten-free', 'dairy-free', 'high-protein'],
    keywords: ['chicken fajitas', 'sheet pan dinner', 'one pan chicken', 'weeknight mexican', 'tray bake dinner'],
    image: 'assets/img/photos/chicken-fajitas.jpg',
    imageAlt: 'A chicken fajita wrapped in a tortilla with peppers, served with salsa and lime',
    prepMinutes: 15,
    cookMinutes: 20,
    servings: 4,
    yieldText: '4 servings, about 12 tortillas',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 61,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 486, protein: 38, carbs: 42, fat: 17, fiber: 7, sugar: 8, sodium: 620 },
    equipment: ['Large rimmed baking sheet', 'Mixing bowl', 'Dry skillet for the tortillas'],
    ingredients: [
      { group: 'Tray', items: [
        '700 g chicken breast or thighs, sliced into 1 cm strips',
        '3 peppers (a mix of red, yellow and green), sliced',
        '1 large red onion, sliced into thick half-moons',
        '3 tablespoons olive oil',
        '4 garlic cloves, crushed'
      ] },
      { group: 'Fajita spice', items: [
        '2 teaspoons chilli powder',
        '2 teaspoons ground cumin',
        '1 1/2 teaspoons smoked paprika',
        '1 teaspoon dried oregano',
        '1/2 teaspoon garlic powder',
        '1 teaspoon fine sea salt',
        '1/2 teaspoon black pepper'
      ] },
      { group: 'To serve', items: [
        '12 small corn or flour tortillas, warmed',
        'Juice of 1 lime, plus wedges',
        'Handful of coriander, chopped',
        'Avocado or guacamole',
        'Soured cream or a thick yogurt, optional'
      ] }
    ],
    instructions: [
      { title: 'Heat the oven as high as it goes', text: 'Heat the oven to 230C / 450F and put the empty baking sheet in while it comes up to temperature. Food landing on a hot tray starts browning immediately instead of sweating.' },
      { title: 'Season everything together', text: 'Toss the chicken, peppers and onion in a bowl with the oil, garlic and all the spices until evenly coated. Doing it in the bowl rather than on the tray means no bare patches.' },
      { title: 'Spread in one layer', text: 'Tip the lot onto the hot tray and spread it out so nothing overlaps. Use two trays if it looks tight; crowding is the only thing that will stop this from charring.' },
      { title: 'Roast hard', text: 'Roast for 18 to 20 minutes without stirring for the first 12, until the chicken is cooked through to 74C / 165F and the pepper edges are blackened in places.' },
      { title: 'Warm the tortillas', text: 'While the tray finishes, warm the tortillas for 20 seconds a side in a dry pan over medium-high heat and stack them in a clean tea towel to stay soft.' },
      { title: 'Finish with lime', text: 'Squeeze the lime over the hot tray and scrape everything together with the juices. Scatter the coriander and serve straight from the tray with the tortillas and toppings.' }
    ],
    tips: [
      'Preheat the tray. It is the single change that makes an oven fajita taste like a griddled one.',
      'Slice the chicken and vegetables to a similar thickness so they finish at the same time.',
      'Add the lime only after roasting. Acid in the marinade turns the surface of the chicken pale and stops it browning.'
    ],
    variations: [
      'Use steak strips, prawns or firm tofu. Prawns need only 8 minutes, so add them halfway through.',
      'Spoon the tray over rice with black beans for a burrito bowl instead of tortillas.',
      'Add sliced courgette or mushrooms to the tray, and a tin of drained black beans in the last 5 minutes.'
    ],
    storage: 'Keeps 3 days in the fridge. Reheat in a hot dry pan for 3 minutes rather than the microwave, which makes the peppers limp. The cooked filling freezes for 2 months and is good in quesadillas straight from frozen.',
    faqs: [
      { q: 'Breast or thigh?', a: 'Thighs are more forgiving at this heat and stay juicy; breast is leaner and cooks a couple of minutes faster, so check it at 15 minutes.' },
      { q: 'Can I marinate the chicken ahead?', a: 'Yes, up to 12 hours with the oil and spices, which deepens the flavour. Keep the lime out until after roasting and keep the vegetables separate so they do not go soft.' },
      { q: 'Why is there liquid in the bottom of my tray?', a: 'The oven was not hot enough or the tray was overloaded, so everything steamed. Pour the liquid off, turn the grill on for 3 minutes, and the edges will still char.' }
    ],
    related: ['taco-rice-bowls', 'broccoli-quesadillas', 'honey-soy-chicken']
  },
  {
    slug: 'sausage-gnocchi',
    title: 'One-Pan Sausage and Gnocchi',
    description: 'Crisped gnocchi with sausage, spinach and a light tomato cream sauce, all in one skillet in 25 minutes.',
    intro: 'Shop-bought gnocchi does not need boiling. Fried straight from the packet in the sausage fat it crisps on the outside and stays pillowy inside, which is a better result than any pot of water gives you. Everything then cooks in the same pan, so the sausage fond ends up in the sauce rather than down the drain.',
    category: 'quick-dinners',
    cuisine: 'Italian',
    course: 'Dinner',
    method: 'Skillet',
    diet: ['high-protein'],
    keywords: ['sausage gnocchi', 'one pan gnocchi', 'crispy gnocchi', 'quick pasta dinner', '25 minute dinner'],
    image: 'assets/img/photos/sausage-gnocchi.jpg',
    imageAlt: 'Gnocchi with a sausage ragu and grated parmesan in a shallow white bowl',
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 58,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 648, protein: 29, carbs: 58, fat: 34, fiber: 5, sugar: 9, sodium: 980 },
    equipment: ['Large heavy skillet with a lid', 'Wooden spoon'],
    ingredients: [
      { group: 'Pan', items: [
        '400 g Italian sausages, skins removed and meat broken into chunks',
        '1 tablespoon olive oil',
        '500 g shelf-stable or fresh potato gnocchi, straight from the packet',
        '1 small onion, finely diced',
        '3 garlic cloves, thinly sliced',
        '1/2 teaspoon fennel seeds, lightly crushed',
        '1/2 teaspoon chilli flakes'
      ] },
      { group: 'Sauce', items: [
        '2 tablespoons tomato puree',
        '1/2 cup (120 ml) chicken or vegetable stock',
        '1/2 cup (120 ml) double cream',
        '150 g baby spinach',
        '1/2 cup (40 g) parmesan, finely grated, plus more to serve',
        'Salt and black pepper, to taste',
        'Squeeze of lemon, to finish'
      ] }
    ],
    instructions: [
      { title: 'Brown the sausage', text: 'Heat the oil in a large skillet over medium-high and add the sausage meat in chunks. Leave it 3 minutes before turning, then cook 4 minutes more until browned. Lift it out with a slotted spoon and leave the fat behind.' },
      { title: 'Crisp the gnocchi', text: 'Add the gnocchi to the hot fat in a single layer and leave it undisturbed for 3 minutes, until the undersides are golden, then toss and give it 2 minutes more. Add a little oil if the pan looks dry.' },
      { title: 'Cook the aromatics', text: 'Push the gnocchi to the edge, add the onion to the middle with a pinch of salt and cook 3 minutes, then the garlic, fennel seeds and chilli for 45 seconds, until fragrant.' },
      { title: 'Build the sauce', text: 'Stir in the tomato puree and cook it for 1 minute, until it darkens, then pour in the stock and scrape the base of the pan clean. All the browning from the sausage lifts into the sauce here.' },
      { title: 'Add cream and spinach', text: 'Return the sausage, add the cream and bring it to a gentle simmer. Add the spinach in handfuls, covering the pan for 30 seconds between each, until just wilted.' },
      { title: 'Finish off the heat', text: 'Take the pan off the heat, stir in the parmesan, and season with pepper, a little salt and a squeeze of lemon. Serve immediately, while the gnocchi is still crisp at the edges.' }
    ],
    tips: [
      'Do not boil the gnocchi first. Dry from the packet is what lets it crisp, and boiled gnocchi will only turn to paste in the pan.',
      'Leave the gnocchi alone for the first three minutes. Stirring early is why most attempts come out pale and gluey.',
      'Add the parmesan off the heat. On a simmer it splits and turns the sauce grainy.'
    ],
    variations: [
      'Use chicken sausage, or swap in 300 g of mushrooms and a tin of butter beans for a vegetarian pan.',
      'Leave the cream out and finish with a splash of pasta water and more parmesan for a lighter sauce.',
      'Add a handful of halved cherry tomatoes with the onion, or stir through pesto at the end instead of the tomato puree.'
    ],
    storage: 'Best eaten straight away, as the gnocchi softens on standing. Leftovers keep 2 days in the fridge and reheat best in a hot pan with a splash of stock. Not suitable for freezing; the cream and the gnocchi both suffer.',
    faqs: [
      { q: 'Which gnocchi works best?', a: 'The vacuum-packed shelf-stable kind is ideal, as it is dry and firm. Fresh chilled gnocchi works too; frozen gnocchi needs a few extra minutes and more space in the pan.' },
      { q: 'Can I make it without cream?', a: 'Yes. Use 100 ml more stock and an extra handful of parmesan, or a couple of spoons of mascarpone or cream cheese, which will not split as readily.' },
      { q: 'My sauce is too thick. What do I do?', a: 'Loosen it with stock a tablespoon at a time off the heat. Gnocchi keeps absorbing liquid as it sits, so expect to do this if it waits on the stove.' }
    ],
    related: ['creamy-tomato-rigatoni', 'pesto-tortellini', 'smoky-tomato-pasta']
  },
  {
    slug: 'egg-fried-rice',
    title: '15-Minute Egg Fried Rice',
    description: 'Day-old rice fried hard with egg, spring onion and peas, seasoned with soy and sesame.',
    intro: 'Fried rice is a technique rather than a recipe, and the technique is dryness and heat. Cold rice from yesterday has lost enough moisture for the grains to separate and fry; fresh rice steams into a clump no matter how hot the pan. Beyond that, keep the pan loud, cook the egg separately, and have everything within reach before you start.',
    category: 'quick-dinners',
    cuisine: 'Chinese-inspired',
    course: 'Dinner',
    method: 'Stir-Fry',
    diet: ['vegetarian', 'dairy-free'],
    keywords: ['egg fried rice', 'leftover rice recipe', 'quick stir fry', '15 minute dinner', 'vegetarian fried rice'],
    image: 'assets/img/photos/egg-fried-rice.jpg',
    imageAlt: 'Egg fried rice with peas, carrot and sweetcorn on a white plate',
    prepMinutes: 7,
    cookMinutes: 8,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 67,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 418, protein: 14, carbs: 58, fat: 14, fiber: 4, sugar: 4, sodium: 680 },
    equipment: ['Wok or large heavy skillet', 'Spatula', 'Small bowl for the eggs'],
    ingredients: [
      { group: 'Rice and eggs', items: [
        '4 cups (about 600 g) cooked long-grain rice, cold from the fridge',
        '4 large eggs, beaten with a pinch of salt',
        '3 tablespoons neutral oil, such as groundnut or rapeseed'
      ] },
      { group: 'Add-ins', items: [
        '6 spring onions, sliced, whites and greens separated',
        '3 garlic cloves, finely chopped',
        '1 tablespoon fresh ginger, finely grated',
        '1 cup frozen peas',
        '1 carrot, finely diced, optional'
      ] },
      { group: 'Seasoning', items: [
        '2 1/2 tablespoons light soy sauce, or tamari',
        '1 teaspoon dark soy sauce, for colour, optional',
        '2 teaspoons toasted sesame oil',
        '1/2 teaspoon white pepper',
        '1 teaspoon rice vinegar'
      ] }
    ],
    instructions: [
      { title: 'Break up the rice', text: 'Rub the cold rice between your fingers in a bowl until every clump has separated into loose grains. Clumps will not fry, and this is easier to do now than in a hot wok.' },
      { title: 'Cook the egg first', text: 'Heat 1 tablespoon of the oil in the wok over medium-high, pour in the beaten eggs and let them set for 20 seconds, then scramble into large soft curds. Tip them back into the bowl while still slightly wet.' },
      { title: 'Start the aromatics', text: 'Add the remaining 2 tablespoons of oil and turn the heat to high. Fry the spring onion whites, garlic, ginger and carrot for 60 seconds, until the kitchen smells of them but nothing has browned.' },
      { title: 'Fry the rice hard', text: 'Add the rice and press it into the pan, leaving it 45 seconds between turns for 3 to 4 minutes. You want to hear it crackling; that sound is the water leaving and the grains toasting.' },
      { title: 'Season at the edge', text: 'Add the peas, then pour the soy sauces, sesame oil, white pepper and vinegar around the hot sides of the pan rather than over the rice, so they sizzle and caramelise on the way in. Toss to coat.' },
      { title: 'Return the egg and serve', text: 'Fold the egg back in with the spring onion greens, break it into pieces with the spatula and serve at once, with chilli oil at the table.' }
    ],
    tips: [
      'Cold rice, ideally a day old. If you only have fresh, spread it on a tray and chill it uncovered for 30 minutes, which gets you close.',
      'Cook the egg separately and add it at the end. Pouring raw egg over the rice coats every grain and gives you a soft, sticky result instead of ribbons.',
      'Season down the side of the pan. Soy poured straight onto rice soaks in and steams; on the hot metal it caramelises first.'
    ],
    variations: [
      'Add leftover roast chicken, prawns or cubed firm tofu with the peas.',
      'Use a mix of whatever vegetables need using: sweetcorn, diced pepper, shredded cabbage or chopped green beans.',
      'Finish with a fried egg on each bowl and a spoon of chilli crisp for a fuller meal.'
    ],
    storage: 'Cool quickly, refrigerate within an hour and eat within 1 day. Reheat until piping hot in a hot pan. Cooked rice should never be left at room temperature for long or reheated more than once.',
    faqs: [
      { q: 'Why does my fried rice turn out mushy?', a: 'The rice was too fresh or the pan too cool, so the grains steamed instead of frying. Use cold rice, get the pan properly hot, and cook in two batches if your pan is small.' },
      { q: 'Is leftover rice safe to use?', a: 'Yes, provided it was cooled quickly after cooking, kept in the fridge and used within a day, and then reheated until piping hot all the way through.' },
      { q: 'What rice is best?', a: 'Long-grain white rice such as jasmine. Short-grain and risotto rice are too starchy and stick together, and brown rice works but gives a chewier, nuttier result.' }
    ],
    related: ['miso-noodles', 'ginger-chicken-stir-fry', 'honey-soy-chicken']
  },
  {
    slug: 'ginger-chicken-stir-fry',
    title: 'Ginger Chicken Stir-Fry',
    description: 'Velveted chicken and crisp vegetables in a ginger garlic sauce, cooked in twelve minutes.',
    intro: 'Takeaway chicken is tender because of velveting: a few minutes in cornflour and soy before it ever meets the pan, which holds the moisture in and gives the sauce something to cling to. It costs two minutes and is the difference between this and a dry stir-fry. Mix the sauce before you light the hob, because after that nothing waits.',
    category: 'quick-dinners',
    cuisine: 'Chinese-inspired',
    course: 'Dinner',
    method: 'Stir-Fry',
    diet: ['dairy-free', 'high-protein'],
    keywords: ['chicken stir fry', 'ginger chicken', 'velveted chicken', 'quick asian dinner', 'wok dinner'],
    image: 'assets/img/photos/ginger-chicken-stir-fry.jpg',
    imageAlt: 'Chicken stir-fry with peppers and spring onion served over rice in a bowl',
    prepMinutes: 15,
    cookMinutes: 12,
    servings: 4,
    yieldText: '4 servings, with rice',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 53,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 398, protein: 39, carbs: 22, fat: 16, fiber: 4, sugar: 9, sodium: 860 },
    equipment: ['Wok or large heavy skillet', 'Two mixing bowls', 'Fine grater'],
    ingredients: [
      { group: 'Velveted chicken', items: [
        '600 g chicken breast or thighs, sliced thinly across the grain',
        '1 tablespoon cornflour',
        '1 tablespoon light soy sauce',
        '1 tablespoon Shaoxing wine or dry sherry, optional',
        '1 teaspoon toasted sesame oil',
        '2 tablespoons neutral oil, for frying'
      ] },
      { group: 'Vegetables', items: [
        '1 head broccoli, cut into small florets',
        '1 red pepper, sliced',
        '200 g mangetout or green beans',
        '4 spring onions, cut into 3 cm lengths',
        '3 tablespoons fresh ginger, finely julienned or grated',
        '4 garlic cloves, thinly sliced'
      ] },
      { group: 'Sauce', items: [
        '3 tablespoons light soy sauce, or tamari',
        '1 tablespoon oyster sauce, or hoisin for a vegetarian pantry',
        '1 tablespoon rice vinegar',
        '2 teaspoons honey',
        '1 teaspoon cornflour',
        '1/2 cup (120 ml) chicken stock or water',
        '1/2 teaspoon chilli flakes, optional'
      ] }
    ],
    instructions: [
      { title: 'Velvet the chicken', text: 'Toss the sliced chicken with the cornflour, soy sauce, Shaoxing wine and sesame oil until every piece is coated in a thin slick. Leave it 10 minutes while you prepare everything else.' },
      { title: 'Mix the sauce and prep', text: 'Whisk all the sauce ingredients together in a bowl, making sure the cornflour dissolves. Cut all the vegetables and set them by the hob. A stir-fry gives you no time to chop once it starts.' },
      { title: 'Sear the chicken', text: 'Heat the oil in the wok over high until it just smokes. Add the chicken in one layer, leave it 90 seconds without touching it, then stir-fry 2 minutes until it is golden outside and barely cooked through. Lift it out onto a plate.' },
      { title: 'Cook the hard vegetables', text: 'Add the broccoli and beans to the same pan with 3 tablespoons of water and cover for 2 minutes, so they steam briefly, then uncover and stir-fry 1 minute until bright green and still squeaky.' },
      { title: 'Add the aromatics', text: 'Add the pepper, ginger, garlic and spring onion whites and stir-fry 60 seconds. Keep everything moving; ginger and garlic burn in seconds at this heat and turn the whole pan bitter.' },
      { title: 'Combine and glaze', text: 'Return the chicken, pour in the sauce and toss for 1 to 2 minutes, until it thickens and coats everything in a glossy layer. Add the spring onion greens and serve immediately with rice.' }
    ],
    tips: [
      'Slice the chicken thinly across the grain. Thick pieces need longer than the vegetables can survive.',
      'Get the pan hotter than feels sensible and cook in two batches if it is small. A crowded wok boils the chicken in its own juices.',
      'Everything chopped and within reach before the oil goes in. Twelve minutes of cooking does not pause for prep.'
    ],
    variations: [
      'Swap the chicken for prawns, beef strips or pressed firm tofu, and use hoisin in place of the oyster sauce to keep it vegetarian.',
      'Use whatever vegetables are in the fridge: cabbage, carrot, mushrooms, baby corn or bok choy all work in the same order, hardest first.',
      'Add a tablespoon of chilli garlic sauce or a drizzle of chilli oil at the end for heat.'
    ],
    storage: 'Keeps 3 days in the fridge, though the vegetables soften. Reheat in a hot pan for 2 to 3 minutes rather than the microwave. Freezing is not recommended, as the sauce separates and the vegetables collapse.',
    faqs: [
      { q: 'What does velveting actually do?', a: 'The cornflour and soy form a thin coating that seals the surface, so the chicken holds its juices through high heat and comes out silky rather than stringy. It is the main reason restaurant stir-fries are more tender.' },
      { q: 'Can I use a normal frying pan?', a: 'Yes, as long as it is heavy and wide. Use the largest you have, get it very hot, and cook in two batches; a thin pan loses its heat the moment the chicken lands.' },
      { q: 'My sauce never thickened. Why?', a: 'Either the cornflour settled at the bottom of the bowl, or the pan was not hot enough to bring the sauce to a boil. Whisk it again before pouring, and let it bubble for a full minute.' }
    ],
    related: ['honey-soy-chicken', 'egg-fried-rice', 'thai-green-curry']
  }
  ];

export default recipes;
