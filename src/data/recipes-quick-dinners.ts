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
        '1 tbsp olive oil',
        '3/4 tsp fine sea salt',
        '1/2 tsp freshly ground black pepper'
      ] },
      { group: 'For the garlic butter', items: [
        '3 tbsp unsalted butter',
        '4 garlic cloves, thinly sliced',
        '1 lemon (zest of the whole, juice of half)',
        '3 tbsp flat-leaf parsley, chopped',
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
        '2 tbsp olive oil',
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
    related: ['smoky-tomato-pasta', 'mediterranean-flatbread', 'chickpea-salad']
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
        '2 tsp chilli powder',
        '1 tsp ground cumin',
        '1 tsp smoked paprika',
        '1/2 tsp garlic powder',
        '3/4 tsp salt',
        '1 tbsp neutral oil'
      ] },
      { group: 'Bowls', items: [
        '3 cups cooked long-grain rice, preferably day-old',
        '1 can (15 oz / 425 g) black beans, drained and rinsed',
        '1 cup corn kernels, fresh or frozen',
        '1 large avocado, sliced',
        '1 cup salsa or pico de gallo',
        '1/2 cup (55 g) grated cheddar or cotija',
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
        '2 tbsp neutral oil',
        '2 cups sugar snap peas, trimmed',
        '2 medium carrots, cut into matchsticks',
        '4 spring onions, sliced on the diagonal'
      ] },
      { group: 'Miso sauce', items: [
        '3 tbsp white miso paste',
        '2 tbsp soy sauce or tamari',
        '1 tbsp honey or maple syrup',
        '1 tbsp rice vinegar',
        '2 tsp toasted sesame oil',
        '1 tbsp fresh ginger, grated',
        '1/3 cup (80 ml) warm water'
      ] },
      { group: 'To serve', items: [
        '2 tsp toasted sesame seeds',
        'Chilli oil or sriracha, optional'
      ] }
    ],
    instructions: [
      { title: 'Soak the noodles', text: 'Cover the rice noodles with just-boiled water and soak until pliable but still firm, 5-7 minutes. Drain and rinse under cold water so they stop cooking and do not clump.' },
      { title: 'Whisk the sauce', text: 'Whisk the miso, soy sauce, honey, rice vinegar, sesame oil, ginger and warm water in a small bowl until completely smooth with no lumps of paste.' },
      { title: 'Crisp the tofu', text: 'Heat 1 tbsp of the oil in a wok over medium-high. Add the tofu in one layer and cook 6-8 minutes, turning every couple of minutes, until three or four sides are golden. Move it to a plate.' },
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
        '1 tsp dried oregano',
        'Zest of 1 lemon',
        '2 tbsp olive oil, plus more for drizzling'
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
      { title: 'Mix the ricotta', text: 'Stir the ricotta with the grated garlic, oregano, lemon zest, 1 tbsp of the olive oil and a good pinch of salt until smooth and spreadable.' },
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
        '1 tbsp neutral oil',
        '3 cups broccoli florets',
        '1 red bell pepper, sliced',
        '3 garlic cloves, minced',
        '1 tbsp fresh ginger, grated'
      ] },
      { group: 'Honey soy glaze', items: [
        '1/3 cup (80 ml) soy sauce',
        '1/4 cup (85 g) honey',
        '2 tbsp rice vinegar',
        '1 tsp toasted sesame oil',
        '1 tbsp cornflour mixed with 2 tbsp cold water'
      ] },
      { group: 'To serve', items: [
        'Steamed rice',
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
        '2 tbsp olive oil',
        '1/2 tsp salt'
      ] },
      { group: 'Garlic spinach', items: [
        '2 tbsp olive oil',
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
        '3 tbsp olive oil',
        '1 small onion, finely diced',
        '4 garlic cloves, sliced',
        '2 tbsp tomato paste',
        '2 tsp smoked paprika',
        '1/2 tsp chilli flakes',
        '1 can (28 oz / 800 g) whole plum tomatoes, crushed by hand',
        '1 tsp sugar',
        'Salt and black pepper'
      ] },
      { group: 'To finish', items: [
        '1 lb (450 g) rigatoni or penne',
        '2 tbsp unsalted butter',
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
    related: ['pesto-tortellini', 'mediterranean-flatbread', 'stuffed-peppers']
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
        '1/2 tsp salt',
        '1/4 tsp black pepper',
        '2 tbsp olive oil'
      ] },
      { group: 'Pan sauce', items: [
        '4 garlic cloves, minced',
        '1/2 cup (120 ml) dry white wine or chicken stock',
        'Juice and zest of 1 large lemon',
        '3 tbsp cold unsalted butter, cubed',
        '1/4 cup flat-leaf parsley, chopped',
        '2 tbsp fresh dill or chives',
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
        '2 tbsp olive oil',
        '1 tsp ground cumin',
        '1/2 tsp chilli powder',
        '1/2 tsp salt',
        '2 spring onions, sliced',
        '2 cups (220 g) grated sharp cheddar'
      ] },
      { group: 'To assemble', items: [
        '4 large flour tortillas',
        '1 tbsp butter or oil, for the pan',
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
        '7 oz (200 g) guanciale, cut into 1/4 inch batons',
        '4 large egg yolks plus 1 whole egg',
        '1 cup (90 g) pecorino romano, finely grated, plus more to serve'
      ] },
      { group: 'To finish', items: [
        '1.5 tsp coarsely cracked black pepper',
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
        '3-4 tbsp green curry paste, to taste',
        '1.5 lb (680 g) chicken thighs, sliced into strips',
        '5 oz (150 g) Thai aubergines, quartered, or 1 regular aubergine, cubed',
        '3 makrut lime leaves, torn',
        '1 cup (150 g) green beans, cut into 2 inch lengths'
      ] },
      { group: 'To season', items: [
        '2 tbsp fish sauce, plus more to taste',
        '1 tbsp palm sugar or soft brown sugar',
        'Juice of 1/2 lime',
        'Large handful of Thai basil leaves',
        '1 red chilli, sliced on the diagonal'
      ] },
      { group: 'To serve', items: [
        'Jasmine rice',
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
  }
  ];

export default recipes;
