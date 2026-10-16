/**
 * Healthy Food collection.
 * Consumed by src/data/recipes.js, which merges every collection into one array.
 */
import type { RecipeSource } from '../types.js';

const recipes: RecipeSource[] = [
  {
    slug: 'chickpea-salad',
    title: 'Mediterranean Chickpea Salad',
    description: 'Chickpeas, crisp cucumber, olives and feta in a lemon-oregano dressing that gets better as it sits.',
    intro: 'This is the salad that survives a packed lunch. Nothing in it wilts, the dressing soaks into the chickpeas over a few hours, and it tastes better on day two than day one. Make a big bowl on Sunday and eat from it all week.',
    category: 'healthy-food',
    cuisine: 'Mediterranean',
    course: 'Lunch',
    method: 'No-Cook',
    diet: ['vegetarian', 'gluten-free', 'high-fibre'],
    keywords: ['chickpea salad', 'mediterranean salad', 'meal prep lunch', 'high fibre salad'],
    image: 'assets/img/photos/chickpea-salad.jpg',
    imageAlt: 'Mediterranean chickpea salad with cucumber, tomato and feta in a bowl',
    prepMinutes: 15,
    cookMinutes: 0,
    servings: 4,
    yieldText: '4 lunch portions',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 276,
    datePublished: '2025-01-28',
    dateModified: '2026-08-05',
    nutrition: { calories: 384, protein: 14, carbs: 34, fat: 22, fiber: 10, sugar: 6, sodium: 640 },
    equipment: ['Large mixing bowl', 'Jar for the dressing'],
    ingredients: [
      { group: 'Salad', items: [
        '2 cans (15 oz / 425 g each) chickpeas, drained and rinsed',
        '1 large cucumber, seeded and diced',
        '2 cups cherry tomatoes, halved',
        '1/2 red onion, finely diced',
        '1/2 cup kalamata olives, halved',
        '5 oz (140 g) feta, cubed',
        '1/2 cup flat-leaf parsley, chopped',
        '1/4 cup fresh mint, chopped'
      ] },
      { group: 'Lemon oregano dressing', items: [
        '1/3 cup (80 ml) extra-virgin olive oil',
        'Juice of 2 lemons',
        '1 garlic clove, grated',
        '1 teaspoon dried oregano',
        '1 teaspoon honey or maple syrup',
        '1/2 teaspoon salt',
        '1/4 teaspoon black pepper'
      ] }
    ],
    instructions: [
      { title: 'Dry the chickpeas', text: 'Drain, rinse and then roll the chickpeas in a clean tea towel. Dry chickpeas absorb dressing instead of diluting it.' },
      { title: 'Seed the cucumber', text: 'Halve the cucumber lengthways and scrape out the watery seed core with a teaspoon before dicing. This is what stops the salad going soupy by day three.' },
      { title: 'Shake the dressing', text: 'Put the olive oil, lemon juice, garlic, oregano, honey, salt and pepper in a jar and shake hard for 20 seconds until thickened and emulsified.' },
      { title: 'Soak the onion', text: 'Cover the diced red onion with cold water for 5 minutes, then drain. It takes the harsh bite out without losing the crunch.' },
      { title: 'Combine', text: 'Toss the chickpeas, cucumber, tomatoes, drained onion, olives and herbs with three-quarters of the dressing.' },
      { title: 'Finish with feta', text: 'Fold the feta through last so the cubes stay intact. Rest 20 minutes before eating, then add the remaining dressing to taste.' }
    ],
    tips: [
      'Dress it at least twenty minutes ahead. Chickpeas are bland on their own and need time to take on the lemon and garlic.',
      'Save the chickpea liquid (aquafaba) for baking or for whipping into a vegan mousse rather than pouring it away.',
      'If packing lunches, keep the feta and dressing in a separate pot and combine in the morning.'
    ],
    variations: [
      'Add a tin of tuna or shredded chicken for a higher-protein version.',
      'Fold in cooked orzo or couscous to stretch it into a grain salad.',
      'Skip the feta and add extra olives and a spoon of tahini for a vegan bowl.'
    ],
    storage: 'Keeps 4 days in the fridge and genuinely improves after the first day. Add the fresh herbs on the day of eating if you want them bright green.',
    faqs: [
      { q: 'Can I use dried chickpeas?', a: 'Yes, and the texture is better. Soak 1 cup overnight, simmer 45-60 minutes until tender, and cool fully before dressing. One cup dried gives roughly the same as two tins.' },
      { q: 'How do I stop it going watery?', a: 'Seed the cucumber, dry the chickpeas properly, and salt the tomatoes separately for 10 minutes then drain them before adding.' },
      { q: 'Is this filling enough as a main?', a: 'For most people, yes, at 384 calories and 10 g of fibre per portion. If you want it more substantial, add half an avocado or a scoop of grains per bowl.' }
    ],
    related: ['quinoa-bowl', 'kale-salad', 'roasted-wrap']
  },
  {
    slug: 'smoothie-bowl',
    title: 'Green Protein Smoothie Bowl',
    description: 'A thick, spoonable blend of spinach, banana, Greek yogurt and protein, built to keep you full until lunch.',
    intro: 'The difference between a smoothie and a smoothie bowl is water, and most recipes use too much of it. Frozen banana plus thick yogurt and only a splash of milk gives you something you eat with a spoon. The spinach disappears entirely behind the fruit.',
    category: 'healthy-food',
    cuisine: 'International',
    course: 'Breakfast',
    method: 'Blended',
    diet: ['vegetarian', 'gluten-free', 'high-protein'],
    keywords: ['green smoothie bowl', 'protein smoothie bowl', 'healthy breakfast', 'spinach smoothie'],
    image: 'assets/img/photos/smoothie-bowl.jpg',
    imageAlt: 'A green smoothie bowl topped with figs, granola and citrus',
    prepMinutes: 8,
    cookMinutes: 0,
    servings: 2,
    yieldText: '2 bowls',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 189,
    datePublished: '2025-02-11',
    dateModified: '2026-07-12',
    nutrition: { calories: 412, protein: 28, carbs: 52, fat: 11, fiber: 9, sugar: 28, sodium: 140 },
    equipment: ['High-speed blender', 'Tamper or spatula'],
    ingredients: [
      { group: 'Base', items: [
        '2 large bananas, sliced and frozen',
        '2 cups (60 g) baby spinach, packed',
        '1 cup (240 g) thick Greek yogurt',
        '1 scoop (30 g) vanilla protein powder',
        '2 tablespoons almond butter',
        '1/4 cup (60 ml) milk of choice, plus more only if needed',
        '1 teaspoon vanilla extract'
      ] },
      { group: 'Toppings', items: [
        '1/2 cup mixed berries',
        '1 tablespoon chia seeds',
        '2 tablespoons granola',
        'Toasted coconut flakes',
        'Drizzle of honey'
      ] }
    ],
    instructions: [
      { title: 'Load the blender in order', text: 'Put the milk, yogurt, spinach and almond butter in first, then the frozen banana and protein powder on top. Liquid at the bottom lets the blades catch.' },
      { title: 'Blend low, then high', text: 'Start on low to break everything down, then move to high for 45-60 seconds. Use the tamper to push the mixture into the blades rather than adding more liquid.' },
      { title: 'Check the texture', text: 'It should be thick enough to hold the shape of a spoon dragged through it. Add milk only one tablespoon at a time if the blender genuinely stalls.' },
      { title: 'Taste and adjust', text: 'Blend in the vanilla and taste. Add a date or a little honey if your bananas were underripe.' },
      { title: 'Bowl it', text: 'Divide between two chilled bowls and smooth the surface with the back of a spoon.' },
      { title: 'Top generously', text: 'Arrange the berries, chia, granola and coconut in sections, then drizzle with honey. Eat straight away while it is still cold and thick.' }
    ],
    tips: [
      'Freeze the bananas. Fresh banana plus ice makes a watery, icy bowl; frozen banana makes a creamy one.',
      'Chill the bowls in the freezer for ten minutes and the smoothie holds its texture twice as long.',
      'Blend the spinach thoroughly before adding the frozen fruit so you never get green flecks.'
    ],
    variations: [
      'Swap spinach for frozen cauliflower rice for an even thicker bowl with no fruit sugar.',
      'Use frozen mango and pineapple for a tropical version that hides the greens just as well.',
      'Make it vegan with coconut yogurt and a plant protein; add an extra tablespoon of nut butter for creaminess.'
    ],
    storage: 'Meant to be eaten immediately. You can freeze the base in ice-cube trays for up to a month, then re-blend with a splash of milk.',
    faqs: [
      { q: 'Can I make it without protein powder?', a: 'Yes. Add an extra half cup of Greek yogurt plus two tablespoons of hemp seeds and you will land around 22 g of protein.' },
      { q: 'Why is my bowl runny?', a: 'Too much liquid, or fruit that was not frozen. Start with less milk than you think you need; you can always add, but you cannot take it out.' },
      { q: 'Can I prep this the night before?', a: 'Portion the frozen banana, spinach and protein powder into a freezer bag. In the morning you just tip the bag in with the yogurt and milk.' }
    ],
    related: ['herbed-yogurt-bowl', 'yogurt-parfait', 'quinoa-bowl']
  },
  {
    slug: 'quinoa-bowl',
    title: 'Avocado Quinoa Bowl',
    description: 'Fluffy quinoa, roasted vegetables and avocado under a lemon-tahini dressing, built for meal prep.',
    intro: 'A bowl that holds its shape for four days in the fridge. Roasting the vegetables hard gives them enough character to stand up to grains, and the tahini dressing does the heavy lifting on flavour. Add the avocado only when you eat.',
    category: 'healthy-food',
    cuisine: 'Middle Eastern-inspired',
    course: 'Lunch',
    method: 'Roasted',
    diet: ['vegan', 'gluten-free', 'high-fibre'],
    keywords: ['quinoa bowl', 'avocado quinoa', 'tahini dressing', 'vegan meal prep'],
    image: 'assets/img/photos/quinoa-bowl.jpg',
    imageAlt: 'A quinoa bowl topped with golden tofu and avocado salsa',
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 221,
    datePublished: '2025-02-25',
    dateModified: '2026-08-08',
    nutrition: { calories: 528, protein: 16, carbs: 58, fat: 27, fiber: 13, sugar: 8, sodium: 480 },
    equipment: ['Sheet pan', 'Medium saucepan', 'Small whisk'],
    ingredients: [
      { group: 'Quinoa', items: [
        '1.5 cups (255 g) quinoa, rinsed well',
        '3 cups (720 ml) vegetable stock',
        '1/2 teaspoon salt'
      ] },
      { group: 'Roasted vegetables', items: [
        '1 large sweet potato, cut into 2 cm (3/4 inch) cubes',
        '1 red onion, cut into wedges',
        '1 courgette, half-moons',
        '1 can (15 oz / 425 g) chickpeas, drained and dried',
        '3 tablespoons olive oil',
        '1.5 teaspoons ground cumin',
        '1 teaspoon smoked paprika',
        'Salt and pepper'
      ] },
      { group: 'Lemon tahini dressing', items: [
        '1/3 cup (80 g) tahini (sesame seed paste)',
        'Juice of 1.5 lemons',
        '1 garlic clove, grated',
        '1 teaspoon maple syrup',
        '4-6 tablespoons cold water',
        '1/2 teaspoon salt'
      ] },
      { group: 'To serve', items: [
        '2 ripe avocados, sliced',
        'Fresh parsley and pumpkin seeds'
      ] }
    ],
    instructions: [
      { title: 'Rinse the quinoa', text: 'Rinse the quinoa under cold running water for a full minute. The natural saponin coating is bitter and rinsing is the only way to remove it.' },
      { title: 'Roast the vegetables', text: 'Heat the oven to 220C / 425F. Toss the sweet potato, onion, courgette and chickpeas with the oil, cumin, paprika, salt and pepper, spread over a sheet pan in one layer, and roast 25-30 minutes, turning once.' },
      { title: 'Cook the quinoa', text: 'Simmer the quinoa with the stock and salt, covered, for 15 minutes. Take it off the heat and leave it covered another 5 minutes, then fluff with a fork.' },
      { title: 'Make the dressing', text: 'Whisk the tahini, lemon juice, garlic, maple syrup and salt. It will seize into a paste; keep whisking in cold water a tablespoon at a time until it loosens into a pourable cream.' },
      { title: 'Assemble', text: 'Divide the quinoa between bowls, top with the roasted vegetables and chickpeas, and add the avocado.' },
      { title: 'Dress and finish', text: 'Spoon the tahini dressing over generously, then scatter with parsley and pumpkin seeds.' }
    ],
    tips: [
      'Do not panic when the tahini seizes. It always does; cold water and persistent whisking bring it back to a silky sauce.',
      'Give the vegetables room on the pan. Crowded vegetables steam instead of caramelising, and use two pans if needed.',
      'Cook the quinoa in stock rather than water. It is the cheapest upgrade in the whole recipe.'
    ],
    variations: [
      'Swap quinoa for farro, bulgur or brown rice using the same roasting method.',
      'Add crumbled feta or a soft-boiled egg if you are not keeping it vegan.',
      'Use a green tahini by blending the dressing with a big handful of parsley and coriander.'
    ],
    storage: 'The quinoa and roasted vegetables keep 4 days; the dressing keeps a week in a jar and thickens in the fridge, so loosen with water. Slice the avocado fresh each time.',
    faqs: [
      { q: 'Why is my quinoa mushy?', a: 'Usually too much liquid or too much stirring. Use a 1:2 ratio, leave the lid on, and never stir it while it simmers.' },
      { q: 'Can I eat this cold?', a: 'Yes, it is designed for it. Cold roasted vegetables and quinoa with tahini is one of the better packed lunches there is.' },
      { q: 'Is tahini worth buying?', a: 'A good runny tahini lasts months and turns into dressings, sauces and dips in seconds. Look for one where the oil separates naturally on top.' }
    ],
    related: ['chickpea-salad', 'farro-salad', 'roasted-wrap']
  },
  {
    slug: 'lentil-soup',
    title: 'Lentil Herb Soup',
    description: 'A deeply savoury lentil soup with soffritto, herbs and lemon, thick enough to stand a spoon in.',
    intro: 'Lentil soup is only boring when it is underseasoned. This one starts with a proper soffritto cooked slowly, gets tomato paste caramelised into it, and finishes with a hard squeeze of lemon that lifts the whole pot. It costs very little and freezes perfectly.',
    category: 'healthy-food',
    cuisine: 'Mediterranean',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['vegan', 'gluten-free', 'high-fibre', 'high-protein'],
    keywords: ['lentil soup', 'vegan soup', 'red lentil soup', 'healthy comfort food'],
    image: 'assets/img/photos/lentil-soup.jpg',
    imageAlt: 'A bowl of creamy lentil soup finished with fresh coriander',
    prepMinutes: 12,
    cookMinutes: 38,
    servings: 6,
    yieldText: '6 generous bowls',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 318,
    datePublished: '2025-03-10',
    dateModified: '2026-08-18',
    nutrition: { calories: 342, protein: 18, carbs: 48, fat: 9, fiber: 16, sugar: 7, sodium: 720 },
    equipment: ['Large heavy pot or Dutch oven', 'Wooden spoon'],
    ingredients: [
      { group: 'Base', items: [
        '3 tablespoons olive oil',
        '1 large onion, finely diced',
        '2 carrots, finely diced',
        '2 celery sticks, finely diced',
        '4 garlic cloves, minced',
        '2 tablespoons tomato paste',
        '1.5 teaspoons ground cumin',
        '1 teaspoon ground coriander',
        '1/2 teaspoon smoked paprika'
      ] },
      { group: 'Soup', items: [
        '1.5 cups (300 g) brown or green lentils, rinsed',
        '1 can (14 oz / 400 g) chopped tomatoes',
        '7 cups (1.7 L) vegetable stock',
        '2 bay leaves',
        '1 teaspoon salt, plus more to taste'
      ] },
      { group: 'To finish', items: [
        'Juice of 1 large lemon',
        '1/2 cup flat-leaf parsley, chopped',
        '2 tablespoons fresh dill, chopped',
        'Good olive oil, for drizzling'
      ] }
    ],
    instructions: [
      { title: 'Build the soffritto', text: 'Heat the olive oil in a large pot over medium. Cook the onion, carrot and celery with a pinch of salt for 10-12 minutes, stirring occasionally, until genuinely soft and sweet. Do not rush this.' },
      { title: 'Bloom the spices', text: 'Add the garlic, tomato paste, cumin, coriander and paprika. Cook 2 minutes, stirring constantly, until the paste darkens and coats the vegetables.' },
      { title: 'Add lentils and liquid', text: 'Stir in the lentils, chopped tomatoes, stock, bay leaves and salt. Bring to a boil, then reduce to a steady simmer.' },
      { title: 'Simmer', text: 'Cook uncovered for 30-35 minutes, until the lentils are completely tender and the soup has thickened. Stir occasionally so nothing catches on the bottom.' },
      { title: 'Adjust the body', text: 'For a thicker soup, blend a couple of ladlefuls and stir them back in. For a thinner one, add stock. Fish out the bay leaves.' },
      { title: 'Finish with acid and herbs', text: 'Off the heat, stir in the lemon juice and most of the herbs. Taste and add salt until the flavours snap into focus. Serve with a drizzle of olive oil and the remaining herbs.' }
    ],
    tips: [
      'The lemon at the end is not a garnish. Lentils taste flat without acid, and this is the step people skip.',
      'Salt the soup properly at the end, tasting as you go. Lentils absorb a surprising amount.',
      'Brown or green lentils hold their shape; red lentils collapse into a puree, which is a different but equally good soup.'
    ],
    variations: [
      'Add a big handful of spinach or kale in the last five minutes.',
      'Stir in a tin of coconut milk with a teaspoon of curry powder for a creamier, warmer version.',
      'Finish bowls with a spoon of yogurt and a scatter of crisp fried onions.'
    ],
    storage: 'Keeps 5 days refrigerated and freezes for 3 months. It thickens considerably as it sits, so loosen with stock or water when reheating and re-check the salt and lemon.',
    faqs: [
      { q: 'Do I need to soak the lentils?', a: 'No. Unlike dried beans, lentils cook from dry in about 30 minutes. Just rinse them and pick out any small stones.' },
      { q: 'Why are my lentils still hard?', a: 'Usually old lentils, or acid added too early. Keep the tomatoes to the quantity listed and add the lemon only at the very end, since acid slows down softening.' },
      { q: 'Can I make it in a slow cooker?', a: 'Yes, but still do the soffritto and spice-blooming in a pan first, then transfer everything and cook on low for 6 hours. Skipping that step costs you most of the flavour.' }
    ],
    related: ['stuffed-peppers', 'chickpea-salad', 'farro-salad']
  },
  {
    slug: 'roasted-wrap',
    title: 'Roasted Veggie Wrap',
    description: 'Charred vegetables, whipped hummus and crunchy greens rolled into a wrap that does not go soggy.',
    intro: 'Most veggie wraps fail for one reason: wet filling against soft bread. Roasting the vegetables until the moisture is gone and laying down a hummus barrier fixes it. This one survives a few hours in a bag and still eats well.',
    category: 'healthy-food',
    cuisine: 'Mediterranean',
    course: 'Lunch',
    method: 'Roasted',
    diet: ['vegan', 'high-fibre'],
    keywords: ['roasted veggie wrap', 'hummus wrap', 'vegan lunch', 'healthy wrap recipe'],
    image: 'assets/img/photos/roasted-wrap.jpg',
    imageAlt: 'A vegetable wrap cut and plated with lettuce and roasted peppers',
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 4,
    yieldText: '4 wraps',
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 132,
    datePublished: '2025-03-24',
    dateModified: '2026-06-20',
    nutrition: { calories: 446, protein: 14, carbs: 56, fat: 19, fiber: 11, sugar: 9, sodium: 700 },
    equipment: ['Sheet pan', 'Griddle pan or dry skillet'],
    ingredients: [
      { group: 'Roasted vegetables', items: [
        '1 red bell pepper, sliced',
        '1 yellow bell pepper, sliced',
        '1 courgette, sliced into planks',
        '1 red onion, sliced',
        '1 small aubergine, cubed',
        '3 tablespoons olive oil',
        '1 teaspoon dried oregano',
        '1/2 teaspoon salt'
      ] },
      { group: 'Assembly', items: [
        '4 large tortillas or flatbreads',
        '1 cup (250 g) hummus',
        '2 cups baby rocket or spinach',
        '1/2 cup sun-dried tomatoes, chopped',
        '3.5 oz (100 g) feta or vegan feta, optional',
        'Squeeze of lemon'
      ] }
    ],
    instructions: [
      { title: 'Roast hard', text: 'Heat the oven to 220C / 425F. Toss all the vegetables with the oil, oregano and salt, spread across two sheet pans, and roast 22-25 minutes until the edges are properly charred, not merely soft.' },
      { title: 'Cool them down', text: 'Let the vegetables cool to room temperature on the pan. Warm vegetables steam inside a wrap and soften the bread within minutes.' },
      { title: 'Warm the tortillas', text: 'Heat each tortilla for 20 seconds a side in a dry pan. A warm tortilla folds without cracking; a cold one splits along the seam.' },
      { title: 'Lay the barrier', text: 'Spread a quarter of the hummus across the middle third of each tortilla, going right to the edges of that band. The hummus keeps moisture off the bread.' },
      { title: 'Fill and roll', text: 'Layer the greens, roasted vegetables, sun-dried tomatoes and feta on top of the hummus. Fold in the two sides, then roll tightly away from you, keeping pressure on the filling.' },
      { title: 'Seal and cut', text: 'Toast the rolled wrap seam-side down in a dry pan for 90 seconds to seal it, then cut on a sharp diagonal.' }
    ],
    tips: [
      'Cool the vegetables completely. This single step is the difference between a crisp wrap and a limp one.',
      'Hummus goes down first, always. It is a waterproof layer as much as a flavour.',
      'Roll tightly. A loose wrap falls apart at the second bite.'
    ],
    variations: [
      'Add falafel or crispy chickpeas for a more substantial lunch.',
      'Swap hummus for a herby white bean spread or baba ganoush.',
      'Use collard leaves or large lettuce instead of tortillas for a low-carb version.'
    ],
    storage: 'Wrapped tightly in foil, these keep well for a day. Roast a double batch of vegetables and keep them in the fridge for 4 days, assembling fresh each morning.',
    faqs: [
      { q: 'How do I stop the wrap falling apart?', a: 'Warm the tortilla, do not overfill, fold the sides in before rolling, and toast it seam-side down to seal. Wrapping the bottom half in foil also helps while eating.' },
      { q: 'Can I make these the night before?', a: 'Yes, as long as the vegetables were fully cooled and you use the hummus barrier. Wrap in foil rather than cling film so it does not sweat.' },
      { q: 'What other vegetables work?', a: 'Mushrooms, butternut squash, fennel and asparagus all roast well here. Avoid anything very watery like tomato or cucumber unless you add it fresh at the last minute.' }
    ],
    related: ['chickpea-salad', 'quinoa-bowl', 'broccoli-quesadillas']
  },
  {
    slug: 'kale-salad',
    title: 'Citrus Kale Salad',
    description: 'Massaged kale with orange segments, toasted seeds and a sharp lemon dressing that holds up for days.',
    intro: 'Raw kale is tough and slightly bitter until you massage it, at which point it collapses into something tender and almost sweet. Two minutes of work changes the whole salad. Citrus and toasted seeds do the rest.',
    category: 'healthy-food',
    cuisine: 'Californian',
    course: 'Salad',
    method: 'No-Cook',
    diet: ['vegetarian', 'gluten-free'],
    keywords: ['kale salad', 'massaged kale', 'citrus salad', 'healthy side salad'],
    image: 'assets/img/photos/kale-salad.jpg',
    imageAlt: 'Massaged curly kale salad in a creamy dressing with toasted seeds',
    prepMinutes: 18,
    cookMinutes: 5,
    servings: 4,
    yieldText: '4 side portions',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 147,
    datePublished: '2025-04-08',
    dateModified: '2026-07-01',
    nutrition: { calories: 268, protein: 8, carbs: 24, fat: 17, fiber: 6, sugar: 11, sodium: 320 },
    equipment: ['Large bowl', 'Small dry pan', 'Sharp paring knife'],
    ingredients: [
      { group: 'Salad', items: [
        '1 large bunch curly kale (about 8 oz / 225 g), stems removed',
        '2 oranges, segmented',
        '1/2 red onion, very thinly sliced',
        '1/3 cup pumpkin seeds',
        '2 tablespoons sunflower seeds',
        '1/3 cup (30 g) shaved parmesan or pecorino',
        '1/4 cup dried cranberries, optional'
      ] },
      { group: 'Lemon dressing', items: [
        '1/4 cup (60 ml) extra-virgin olive oil',
        'Juice of 1 lemon',
        '1 tablespoon orange juice',
        '1 teaspoon Dijon mustard',
        '1 teaspoon honey',
        '1/2 teaspoon salt',
        'Black pepper'
      ] }
    ],
    instructions: [
      { title: 'Strip and shred', text: 'Pull the kale leaves off the tough centre stems and stack them, then roll and slice into thin ribbons. Thin ribbons massage down far better than big pieces.' },
      { title: 'Toast the seeds', text: 'Toast the pumpkin and sunflower seeds in a dry pan over medium heat for 4-5 minutes, shaking often, until they pop and smell nutty. Tip them out immediately so they stop cooking.' },
      { title: 'Whisk the dressing', text: 'Whisk the olive oil, lemon juice, orange juice, Dijon, honey, salt and pepper until thick and emulsified.' },
      { title: 'Massage the kale', text: 'Put the kale in a large bowl with half the dressing and scrunch it firmly with your hands for 2 minutes. It will darken, shrink by about a third, and turn silky. This is the whole recipe.' },
      { title: 'Segment the oranges', text: 'Cut the top and bottom off each orange, slice the peel away following the curve, then cut between the membranes to free the segments. Squeeze the leftover core into the salad.' },
      { title: 'Assemble', text: 'Fold in the orange segments, red onion, toasted seeds, cheese and cranberries with the remaining dressing. Rest 10 minutes before serving.' }
    ],
    tips: [
      'Massage for a full two minutes. Undermassaged kale stays chewy and bitter, and there is no shortcut.',
      'Toast the seeds even though it is an extra pan. Raw seeds add texture; toasted seeds add flavour.',
      'Lacinato (dinosaur) kale is more tender than curly and needs slightly less massaging.'
    ],
    variations: [
      'Add sliced apple or pear in autumn instead of orange.',
      'Turn it into a main with roasted chickpeas, quinoa or shredded chicken.',
      'Use grapefruit and avocado for a sharper, creamier version.'
    ],
    storage: 'Unusually for a salad, this keeps 3 days dressed and does not wilt; massaged kale actually softens further. Add the seeds just before serving so they stay crunchy.',
    faqs: [
      { q: 'Why massage kale at all?', a: 'The mechanical action plus the acid and oil breaks down the tough cell walls, which removes the bitterness and makes the leaves tender enough to eat raw.' },
      { q: 'Can I prepare it ahead for a dinner?', a: 'Yes, and it is one of the few salads that benefits. Massage and dress it up to a day ahead, then add seeds and cheese as you serve.' },
      { q: 'What if I find kale too bitter?', a: 'Use lacinato kale, massage longer, and increase the honey in the dressing slightly. The sweetness of the orange is doing deliberate work here.' }
    ],
    related: ['chickpea-salad', 'farro-salad', 'herbed-yogurt-bowl']
  },
  {
    slug: 'herbed-yogurt-bowl',
    title: 'Herbed Yogurt Bowl',
    description: 'Cool garlicky yogurt with cucumber, heaps of herbs and toasted seeds, ready in ten minutes.',
    intro: 'A savoury yogurt bowl is one of the fastest lunches possible and one of the most underrated. Thick yogurt seasoned properly with salt, garlic and lemon becomes a base rather than a breakfast, and everything crunchy you scatter on it counts.',
    category: 'healthy-food',
    cuisine: 'Middle Eastern-inspired',
    course: 'Lunch',
    method: 'No-Cook',
    diet: ['vegetarian', 'gluten-free', 'high-protein', 'low-carb'],
    keywords: ['savoury yogurt bowl', 'herbed yogurt', 'high protein lunch', 'quick healthy lunch'],
    image: 'assets/img/photos/herbed-yogurt-bowl.jpg',
    imageAlt: 'Ribboned cucumber in a garlicky herbed yogurt dressing with dill',
    prepMinutes: 10,
    cookMinutes: 4,
    servings: 2,
    yieldText: '2 bowls',
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 88,
    datePublished: '2025-04-22',
    dateModified: '2026-05-25',
    nutrition: { calories: 322, protein: 24, carbs: 16, fat: 19, fiber: 3, sugar: 11, sodium: 460 },
    equipment: ['Mixing bowl', 'Small dry pan'],
    ingredients: [
      { group: 'Herbed yogurt', items: [
        '2 cups (500 g) thick Greek yogurt',
        '1 garlic clove, grated',
        'Juice of 1/2 lemon',
        '3 tablespoons fresh dill, chopped',
        '3 tablespoons fresh mint, chopped',
        '2 tablespoons chives, snipped',
        '3/4 teaspoon salt'
      ] },
      { group: 'Toppings', items: [
        '1 cucumber, diced small',
        '2 tablespoons mixed seeds (pumpkin, sunflower, sesame)',
        '1/2 teaspoon sumac or za atar',
        'Good extra-virgin olive oil',
        'Cracked black pepper',
        '2 warm pita breads, to serve'
      ] }
    ],
    instructions: [
      { title: 'Season the yogurt', text: 'Stir the yogurt with the grated garlic, lemon juice and salt. Taste it now: unsalted yogurt tastes like breakfast, properly salted yogurt tastes like a meal.' },
      { title: 'Fold in the herbs', text: 'Add the dill, mint and chives and fold through, keeping some back for the top. Let it sit 5 minutes so the garlic mellows into the yogurt.' },
      { title: 'Toast the seeds', text: 'Toast the mixed seeds in a dry pan over medium heat for 3-4 minutes until fragrant, then tip onto a plate to cool.' },
      { title: 'Salt the cucumber', text: 'Toss the diced cucumber with a small pinch of salt and let it stand 5 minutes, then drain off the liquid that collects.' },
      { title: 'Build the bowls', text: 'Spread the herbed yogurt across two shallow bowls, making a swoosh with the back of a spoon to hold the toppings.' },
      { title: 'Top and finish', text: 'Scatter over the cucumber, toasted seeds, reserved herbs and sumac. Finish with a generous pour of olive oil and black pepper, and serve with warm pita.' }
    ],
    tips: [
      'Use full-fat Greek or strained yogurt. Low-fat versions are too thin and turn watery under toppings.',
      'Grate the garlic rather than chopping it, so it disperses evenly instead of ambushing one bite.',
      'Be generous with the olive oil at the end. It is a main ingredient here, not a garnish.'
    ],
    variations: [
      'Add roasted chickpeas, leftover roast vegetables or a jammy egg for a bigger meal.',
      'Swap the herbs for coriander and add a spoon of harissa swirled through.',
      'Use labneh for something thicker and tangier, thinned with a little water.'
    ],
    storage: 'The herbed yogurt keeps 3 days in the fridge and doubles as a dip or a sauce for grilled meat and vegetables. Add toppings only at serving.',
    faqs: [
      { q: 'Is this enough for a meal?', a: 'With pita and the seeds, yes, at 24 g of protein per bowl. Add roasted chickpeas or an egg if you want it more substantial.' },
      { q: 'Can I use regular yogurt?', a: 'Strain it first through a coffee filter or muslin for an hour, otherwise it will be too loose to hold the toppings.' },
      { q: 'What is sumac?', a: 'A ground dried berry with a tart, lemony flavour, common in Middle Eastern cooking. If you cannot find it, extra lemon zest gets you close.' }
    ],
    related: ['smoothie-bowl', 'ricotta-toasts', 'kale-salad']
  },
  {
    slug: 'stuffed-peppers',
    title: 'Stuffed Bell Peppers',
    description: 'Sweet roasted peppers packed with herby rice, black beans and melted cheese, a full meal in one dish.',
    intro: 'Pre-roasting the peppers before they are stuffed is the step that makes these good rather than watery. They soften and sweeten first, then get filled with a rice and bean mixture that is already seasoned and ready. The second bake is just about melting cheese.',
    category: 'healthy-food',
    cuisine: 'Mexican-inspired',
    course: 'Dinner',
    method: 'Baked',
    diet: ['vegetarian', 'gluten-free', 'high-fibre'],
    keywords: ['stuffed peppers', 'vegetarian stuffed peppers', 'rice and bean peppers', 'healthy dinner'],
    image: 'assets/img/photos/stuffed-peppers.jpg',
    imageAlt: 'Halved bell peppers stuffed with herby rice and served with a spoon of yogurt',
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 6,
    yieldText: '6 stuffed pepper halves',
    difficulty: 'Medium',
    rating: 4.7,
    ratingCount: 196,
    datePublished: '2025-05-13',
    dateModified: '2026-07-22',
    nutrition: { calories: 398, protein: 16, carbs: 52, fat: 14, fiber: 11, sugar: 9, sodium: 620 },
    equipment: ['Baking dish', 'Large skillet', 'Foil'],
    ingredients: [
      { group: 'Peppers', items: [
        '6 large bell peppers, halved lengthways and seeded',
        '1 tablespoon olive oil',
        'Salt and pepper'
      ] },
      { group: 'Filling', items: [
        '2 tablespoons olive oil',
        '1 onion, diced',
        '3 garlic cloves, minced',
        '1 teaspoon ground cumin',
        '1 teaspoon smoked paprika',
        '1/2 teaspoon dried oregano',
        '2.5 cups cooked rice',
        '1 can (15 oz / 425 g) black beans, drained',
        '1 cup corn kernels',
        '1 cup (240 ml) tomato passata (smooth sieved tomatoes)',
        '1/2 cup coriander, chopped'
      ] },
      { group: 'Topping', items: [
        '1.5 cups (165 g) grated mozzarella or cheddar',
        'Sour cream, lime and extra coriander, to serve'
      ] }
    ],
    instructions: [
      { title: 'Pre-roast the peppers', text: 'Heat the oven to 200C / 400F. Rub the pepper halves with oil, season, and roast cut-side down for 15 minutes until they start to soften and collapse slightly. Drain off any liquid.' },
      { title: 'Start the filling', text: 'Heat the oil in a large skillet and cook the onion for 6 minutes until soft. Add the garlic, cumin, paprika and oregano and cook 1 minute more until fragrant.' },
      { title: 'Build it', text: 'Stir in the rice, black beans, corn and passata. Cook 4-5 minutes until heated through and thickened, then fold in the coriander and season well. Taste it now, because it will not get more seasoned in the oven.' },
      { title: 'Stuff', text: 'Turn the peppers cut-side up in a baking dish and pack the filling in generously, mounding it slightly above the rim.' },
      { title: 'Bake covered', text: 'Cover with foil and bake 20 minutes, so the peppers finish softening without the filling drying out.' },
      { title: 'Cheese and finish', text: 'Uncover, scatter over the cheese, and bake 8-10 minutes more until melted and blistered. Rest 5 minutes, then serve with sour cream and lime.' }
    ],
    tips: [
      'Pre-roasting and draining the peppers is what prevents a pool of liquid in the dish.',
      'Season the filling until it tastes slightly too bold on its own; the sweet pepper mutes it considerably.',
      'Halve the peppers lengthways rather than cutting off the tops. They sit flat, cook evenly and serve more neatly.'
    ],
    variations: [
      'Add cooked ground beef, turkey or chorizo to the filling.',
      'Swap rice for quinoa, farro or cauliflower rice.',
      'Use a Mediterranean filling of orzo, feta, olives and dill instead.'
    ],
    storage: 'Keeps 4 days refrigerated and reheats well, covered, at 180C / 350F for 15 minutes. Assembled but unbaked peppers can be frozen for 2 months.',
    faqs: [
      { q: 'Why are my peppers watery?', a: 'They were not pre-roasted and drained. Peppers hold a lot of water, and it has to come out before the filling goes in.' },
      { q: 'Can I prep these ahead?', a: 'Yes. Roast the peppers and make the filling up to two days ahead, keep them separate, then stuff and bake when you need them.' },
      { q: 'What colour peppers are best?', a: 'Red, orange and yellow are sweeter and better suited here. Green peppers are more bitter and stay firmer.' }
    ],
    related: ['lentil-soup', 'taco-rice-bowls', 'quinoa-bowl']
  },
  {
    slug: 'farro-salad',
    title: 'Warm Farro Salad',
    description: 'Nutty farro tossed with roasted squash, wilted greens and a sharp mustard vinaigrette.',
    intro: 'Farro has a chew that no other grain quite matches, and it holds a dressing without going soft. Dressed while still warm so it drinks up the vinaigrette, then folded with roasted squash and greens, it works as a side or as a whole lunch.',
    category: 'healthy-food',
    cuisine: 'Italian',
    course: 'Lunch',
    method: 'Roasted',
    diet: ['vegetarian', 'high-fibre'],
    keywords: ['farro salad', 'warm grain salad', 'roasted squash salad', 'autumn salad'],
    image: 'assets/img/photos/farro-salad.jpg',
    imageAlt: 'A warm grain salad with roasted squash, greens and crumbled cheese',
    prepMinutes: 15,
    cookMinutes: 35,
    servings: 4,
    yieldText: '4 main portions',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 118,
    datePublished: '2025-06-03',
    dateModified: '2026-07-15',
    nutrition: { calories: 462, protein: 13, carbs: 62, fat: 19, fiber: 10, sugar: 8, sodium: 440 },
    equipment: ['Sheet pan', 'Medium saucepan', 'Large bowl'],
    ingredients: [
      { group: 'Grains and vegetables', items: [
        '1.5 cups (270 g) pearled farro (a nutty wheat grain; pearl barley works too)',
        '4 cups (960 ml) vegetable stock',
        '1 small butternut squash, peeled and cubed',
        '2 tablespoons olive oil',
        '1 teaspoon fresh thyme leaves',
        '4 cups baby kale or chard, roughly chopped',
        '1/2 cup toasted walnuts, chopped',
        '1/2 cup dried cranberries',
        '3.5 oz (100 g) goat cheese or feta'
      ] },
      { group: 'Mustard vinaigrette', items: [
        '1/4 cup (60 ml) extra-virgin olive oil',
        '2 tablespoons red wine vinegar',
        '1 tablespoon Dijon mustard',
        '1 teaspoon maple syrup',
        '1 shallot, very finely minced',
        'Salt and black pepper'
      ] }
    ],
    instructions: [
      { title: 'Roast the squash', text: 'Heat the oven to 220C / 425F. Toss the squash with the olive oil, thyme, salt and pepper and roast 25-30 minutes, turning once, until caramelised at the edges.' },
      { title: 'Cook the farro', text: 'Simmer the farro in the stock for 20-25 minutes until tender but still chewy. Drain off any excess liquid.' },
      { title: 'Make the vinaigrette', text: 'Whisk the olive oil, vinegar, Dijon, maple syrup and shallot with salt and pepper until thick. The mustard is what holds it together.' },
      { title: 'Dress while warm', text: 'Tip the hot drained farro into a large bowl and toss immediately with two-thirds of the vinaigrette. Warm grains absorb dressing; cold grains just get coated.' },
      { title: 'Wilt the greens', text: 'Add the kale to the warm farro and fold through. The residual heat softens the leaves without cooking them dull.' },
      { title: 'Finish', text: 'Fold in the roasted squash, walnuts and cranberries with the remaining vinaigrette, then crumble the cheese over the top. Serve warm or at room temperature.' }
    ],
    tips: [
      'Dress the farro while it is still hot. It is the single biggest flavour difference in the recipe.',
      'Buy pearled farro; whole farro takes over an hour and needs soaking.',
      'Toast the walnuts. Untoasted nuts in a warm salad go slightly soft and taste of very little.'
    ],
    variations: [
      'Swap squash for roasted beetroot, carrots or brussels sprouts by season.',
      'Use barley, freekeh or wheat berries in place of farro.',
      'Add shredded chicken or a tin of white beans to make it more filling.'
    ],
    storage: 'Keeps 4 days refrigerated and travels well. Bring it back to room temperature before eating, as the olive oil stiffens when cold and mutes the flavours.',
    faqs: [
      { q: 'Is farro gluten free?', a: 'No. Farro is an ancient wheat and contains gluten. For a gluten-free version use quinoa, brown rice or millet with the same method.' },
      { q: 'How do I know when farro is done?', a: 'Bite one. It should be tender all the way through but still push back with a distinct chew, like al dente pasta. Mushy farro has gone too far.' },
      { q: 'Can I serve this cold?', a: 'Yes, but let it come up to room temperature for twenty minutes first. Straight from the fridge, the flavours are noticeably flatter.' }
    ],
    related: ['quinoa-bowl', 'kale-salad', 'lentil-soup']
  },
  {
    slug: 'coconut-rice-bowl',
    title: 'Coconut Rice Bowl',
    description: 'Fragrant coconut rice topped with quick-pickled vegetables, edamame and a lime-peanut drizzle.',
    intro: 'Cooking rice in coconut milk instead of water changes it completely, giving a soft, faintly sweet base that needs sharp things around it. Quick pickles and a lime-heavy peanut sauce provide exactly that contrast.',
    category: 'healthy-food',
    cuisine: 'Southeast Asian-inspired',
    course: 'Dinner',
    method: 'Stovetop',
    diet: ['vegan', 'gluten-free', 'dairy-free'],
    keywords: ['coconut rice bowl', 'peanut sauce bowl', 'vegan rice bowl', 'quick pickled vegetables'],
    image: 'assets/img/photos/coconut-rice-bowl.jpg',
    imageAlt: 'A rice bowl with avocado, sugar snap peas, chickpeas and pickled vegetables',
    prepMinutes: 18,
    cookMinutes: 22,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 163,
    datePublished: '2025-06-17',
    dateModified: '2026-08-01',
    nutrition: { calories: 574, protein: 18, carbs: 68, fat: 26, fiber: 8, sugar: 10, sodium: 680 },
    equipment: ['Saucepan with tight lid', 'Small bowls for pickling', 'Whisk'],
    ingredients: [
      { group: 'Coconut rice', items: [
        '1.5 cups (300 g) jasmine rice, rinsed until the water runs clear',
        '1 can (14 oz / 400 ml) full-fat coconut milk',
        '3/4 cup (180 ml) water',
        '1 teaspoon salt',
        '1 teaspoon sugar'
      ] },
      { group: 'Quick pickles', items: [
        '2 carrots, julienned',
        '1 cucumber, thinly sliced',
        '1/2 red onion, thinly sliced',
        '1/2 cup (120 ml) rice vinegar',
        '2 tablespoons sugar',
        '1 teaspoon salt'
      ] },
      { group: 'Lime peanut sauce', items: [
        '1/3 cup (85 g) smooth peanut butter',
        '2 tablespoons soy sauce or tamari',
        'Juice of 2 limes',
        '1 tablespoon maple syrup',
        '1 garlic clove, grated',
        '3-5 tablespoons warm water'
      ] },
      { group: 'To serve', items: [
        '1.5 cups shelled edamame, cooked',
        'Fresh coriander and mint',
        'Crushed roasted peanuts',
        'Sliced red chilli'
      ] }
    ],
    instructions: [
      { title: 'Start the pickles', text: 'Warm the rice vinegar, sugar and salt until dissolved, pour over the carrots, cucumber and onion, and leave for at least 15 minutes while everything else cooks.' },
      { title: 'Rinse the rice', text: 'Rinse the jasmine rice in several changes of cold water until it runs clear. Skipping this gives you sticky, gluey coconut rice.' },
      { title: 'Cook the coconut rice', text: 'Combine the rice, coconut milk, water, salt and sugar in a saucepan. Bring to a gentle boil, stir once, then cover and reduce to the lowest heat for 15 minutes.' },
      { title: 'Rest it', text: 'Take the pan off the heat and leave it covered, untouched, for 10 minutes. Then fluff with a fork. Lifting the lid early ruins the texture.' },
      { title: 'Whisk the peanut sauce', text: 'Whisk the peanut butter, soy sauce, lime juice, maple syrup and garlic, adding warm water a tablespoon at a time until it pours in a thick ribbon.' },
      { title: 'Build the bowls', text: 'Spoon the coconut rice into bowls, add the drained pickles and edamame, drizzle generously with peanut sauce, and top with herbs, peanuts and chilli.' }
    ],
    tips: [
      'Use full-fat coconut milk. Light coconut milk is mostly water and gives you plain rice with a faint smell of coconut.',
      'Stir the rice only once, at the start. Stirring releases starch and turns it claggy.',
      'Make double the pickles. They keep two weeks and improve almost any bowl or sandwich.'
    ],
    variations: [
      'Add crispy tofu, grilled prawns or shredded chicken for more protein.',
      'Swap peanut butter for almond or sunflower seed butter if you need it nut-free.',
      'Use brown jasmine rice, increasing the liquid and cooking time to 35 minutes.'
    ],
    storage: 'Components keep 4 days separately; pickles last 2 weeks. Coconut rice hardens when chilled, so reheat with a splash of water under a lid to steam it back.',
    faqs: [
      { q: 'Why is my coconut rice mushy?', a: 'Usually unrinsed rice or too much liquid. Coconut milk counts as liquid, so keep the total ratio close to the recipe rather than adding the full can plus a normal amount of water.' },
      { q: 'Can I make the peanut sauce ahead?', a: 'Yes, it keeps a week. It thickens considerably in the fridge, so whisk in warm water to loosen before serving.' },
      { q: 'How spicy is this?', a: 'Not at all unless you add the chilli. The sauce is sweet, salty and sour, so heat is entirely up to you.' }
    ],
    related: ['miso-noodles', 'honey-soy-chicken', 'quinoa-bowl']
  },
  {
    slug: 'greek-chicken-bowl',
    title: 'Greek Chicken Rice Bowl',
    description: 'Yogurt-marinated chicken thighs over brown rice with a chopped salad, feta and quick tzatziki.',
    intro: 'The marinade does the work here. Yogurt holds the lemon and oregano against the meat and its acidity tenderises the thighs, so even fifteen minutes makes a visible difference and a few hours makes a great one. Everything else is assembly, and every component keeps separately for lunches later in the week.',
    category: 'healthy-food',
    cuisine: 'Greek',
    course: 'Dinner',
    method: 'Pan-Seared',
    diet: ['gluten-free', 'high-protein'],
    keywords: ['greek chicken bowl', 'yogurt marinated chicken', 'chicken rice bowl', 'tzatziki', 'meal prep bowl'],
    image: null,
    imageAlt: 'A bowl of sliced grilled chicken over rice with cucumber, tomato, feta and a spoon of tzatziki',
    prepMinutes: 20,
    cookMinutes: 15,
    servings: 4,
    yieldText: '4 bowls',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 54,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 572, protein: 43, carbs: 48, fat: 23, fiber: 6, sugar: 7, sodium: 640 },
    equipment: ['Heavy skillet or griddle pan', 'Box grater', 'Saucepan for the rice'],
    ingredients: [
      { group: 'Marinated chicken', items: [
        '700 g boneless, skinless chicken thighs',
        '1/2 cup (120 g) Greek yogurt',
        '3 tablespoons olive oil',
        'Juice and zest of 1 lemon',
        '4 garlic cloves, crushed',
        '2 teaspoons dried oregano',
        '1 teaspoon fine sea salt',
        '1/2 teaspoon black pepper'
      ] },
      { group: 'Bowls', items: [
        '1 1/2 cups (280 g) brown rice, or 4 cups cooked',
        '2 cups cherry tomatoes, halved',
        '1 cucumber, diced',
        '1/2 red onion, thinly sliced',
        '1/2 cup kalamata olives, pitted',
        '100 g feta, crumbled',
        'Handful of dill or flat-leaf parsley, chopped'
      ] },
      { group: 'Quick tzatziki', items: [
        '1 cup (240 g) Greek yogurt',
        '1/2 cucumber, coarsely grated and squeezed dry',
        '1 garlic clove, finely grated',
        '1 tablespoon lemon juice',
        '1 tablespoon olive oil',
        'Salt, to taste'
      ] }
    ],
    instructions: [
      { title: 'Marinate the chicken', text: 'Mix the yogurt, olive oil, lemon juice and zest, garlic, oregano, salt and pepper in a bowl, add the thighs and turn them until coated. Leave 15 minutes on the counter, or up to 8 hours in the fridge.' },
      { title: 'Cook the rice', text: 'Start the brown rice in plenty of salted water, about 25 minutes, so it is ready when the chicken is. Drain it and leave it covered for 5 minutes to steam.' },
      { title: 'Make the tzatziki', text: 'Squeeze the grated cucumber hard in a clean tea towel; this is what keeps the sauce thick. Stir it through the yogurt with the garlic, lemon juice, oil and a good pinch of salt.' },
      { title: 'Sear the chicken', text: 'Heat a dry heavy pan over medium-high. Scrape most of the marinade off the thighs and lay them in with space between. Cook 6 to 7 minutes a side, until charred in patches and cooked to 75C / 165F at the thickest point.' },
      { title: 'Rest and slice', text: 'Move the chicken to a board and rest it 5 minutes before slicing it thickly across the grain. Slicing straight away loses the juices to the board.' },
      { title: 'Build the bowls', text: 'Divide the rice between four bowls, add the tomatoes, cucumber, onion and olives in sections, then the sliced chicken. Add a spoon of tzatziki, scatter the feta and herbs, and finish with olive oil and a squeeze of lemon.' }
    ],
    tips: [
      'Scrape the thick marinade off before the chicken hits the pan. Left on, the yogurt burns before the meat is cooked through.',
      'Thighs are more forgiving than breasts here and stay juicy even if they go a minute long. If you only have breasts, pound them to an even thickness and cut the time to 4 minutes a side.',
      'Salt the tomatoes and cucumber 10 minutes ahead and the juices become a dressing on their own.'
    ],
    variations: [
      'Swap the rice for orzo, quinoa or a bed of shredded romaine for a lower-carb bowl.',
      'Use the same marinade on halloumi or firm tofu for a vegetarian version.',
      'Add a scoop of hummus and warm pitta and serve it as a mezze plate instead.'
    ],
    storage: 'Store the components separately in the fridge for up to 4 days; the chicken and rice reheat well, and the salad and tzatziki stay fresh because they were never heated. Cooked chicken freezes for 2 months.',
    faqs: [
      { q: 'How long should I marinate the chicken?', a: 'Fifteen minutes gives you flavour on the surface, and 4 to 8 hours gives you noticeably more tender meat. Past about 12 hours the yogurt starts to make the texture soft rather than tender.' },
      { q: 'Can I cook it on a barbecue?', a: 'Yes, and it is better for it. Grill over direct medium heat for 5 to 6 minutes a side, with the lid down between turns.' },
      { q: 'Why is my tzatziki watery?', a: 'The cucumber was not squeezed dry. It holds a surprising amount of water, and it leaks into the yogurt within the hour if you skip that step.' }
    ],
    related: ['quinoa-bowl', 'chickpea-salad', 'mediterranean-flatbread']
  },
  {
    slug: 'sweet-potato-buddha-bowl',
    title: 'Roasted Sweet Potato Buddha Bowl',
    description: 'Roasted sweet potato and chickpeas over quinoa with kale and a lemon tahini sauce.',
    intro: 'A bowl like this lives or dies by two details: the chickpeas have to be dry before they go in the oven, and the kale has to be massaged. Dry chickpeas crisp instead of steaming, and massaged kale softens into something you actually want to eat raw. The tahini sauce is thinned with cold water until it pours, which is the step most people stop short of.',
    category: 'healthy-food',
    cuisine: 'Mediterranean',
    course: 'Lunch',
    method: 'Roasted',
    diet: ['vegan', 'gluten-free', 'dairy-free', 'high-fibre'],
    keywords: ['buddha bowl', 'sweet potato bowl', 'roasted chickpeas', 'tahini dressing', 'vegan bowl'],
    image: null,
    imageAlt: 'A bowl of roasted sweet potato, crisp chickpeas, quinoa and kale drizzled with tahini sauce',
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 4,
    yieldText: '4 generous bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 49,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 548, protein: 18, carbs: 68, fat: 23, fiber: 15, sugar: 12, sodium: 480 },
    equipment: ['Large baking sheet', 'Saucepan', 'Jar or small bowl for the sauce'],
    ingredients: [
      { group: 'Tray', items: [
        '2 medium sweet potatoes (about 700 g), cut into 2 cm cubes',
        '1 tin (400 g) chickpeas, drained, rinsed and patted very dry',
        '2 tablespoons olive oil',
        '1 teaspoon smoked paprika',
        '1 teaspoon ground cumin',
        '1/2 teaspoon chilli flakes',
        '3/4 teaspoon fine sea salt'
      ] },
      { group: 'Bowls', items: [
        '1 cup (180 g) quinoa, rinsed',
        '1 bunch kale (about 150 g), stems removed and leaves torn',
        '1 teaspoon olive oil and a pinch of salt, for the kale',
        '1 avocado, sliced',
        '2 tablespoons pumpkin seeds, toasted',
        'Handful of parsley, chopped'
      ] },
      { group: 'Lemon tahini sauce', items: [
        '1/3 cup (80 g) tahini',
        '2 tablespoons lemon juice',
        '1 small garlic clove, finely grated',
        '1 teaspoon maple syrup',
        '1/4 teaspoon fine sea salt',
        '4 to 6 tablespoons cold water'
      ] }
    ],
    instructions: [
      { title: 'Heat the oven high', text: 'Heat the oven to 220C / 425F. A hot oven is what browns the sweet potato instead of drying it out.' },
      { title: 'Dry and season the tray', text: 'Pat the chickpeas thoroughly dry, then toss them and the sweet potato with the oil, paprika, cumin, chilli and salt. Spread them over one large sheet in a single layer with space between; a crowded tray steams.' },
      { title: 'Roast', text: 'Roast for 25 to 30 minutes, turning everything once at the 18-minute mark, until the sweet potato is caramelised at the edges and the chickpeas rattle and crackle.' },
      { title: 'Cook the quinoa', text: 'Simmer the quinoa in 2 cups of salted water, covered, for 15 minutes, then take it off the heat and leave it covered for 5 minutes before forking it through.' },
      { title: 'Massage the kale', text: 'Put the torn kale in a bowl with the teaspoon of oil and a pinch of salt and rub it between your hands for a full minute. It darkens, softens and loses its waxy bite.' },
      { title: 'Make the sauce', text: 'Whisk the tahini with the lemon juice, garlic, maple syrup and salt. It will seize into a thick paste. Keep adding cold water a tablespoon at a time and it loosens into a smooth, pourable cream.' },
      { title: 'Assemble', text: 'Divide the quinoa and kale between bowls, add the roasted sweet potato and chickpeas, then the avocado. Pour over the tahini sauce and finish with pumpkin seeds and parsley.' }
    ],
    tips: [
      'Dry chickpeas are the whole trick to crisp ones. Roll them in a tea towel and let them sit while the oven heats.',
      'Do not panic when the tahini seizes. It always does, and cold water brings it back glossier than it started.',
      'Roast double the tray. The leftovers are the best part of the week and reheat in a hot pan in 3 minutes.'
    ],
    variations: [
      'Swap the sweet potato for butternut squash, cauliflower or beetroot, keeping the roasting time the same.',
      'Add a soft-boiled egg or 200 g of grilled halloumi for more protein if you are not keeping it vegan.',
      'Use brown rice or farro in place of the quinoa, or shredded cabbage for a lower-carb bowl.'
    ],
    storage: 'Keeps 4 days in the fridge with the sauce in its own jar. The chickpeas soften overnight, so crisp them again in a hot dry pan for 2 minutes before serving. Not suitable for freezing once the avocado is added.',
    faqs: [
      { q: 'Why did my chickpeas not crisp up?', a: 'Either they were wet, or the tray was too full. Dry them properly, give the tray space, and if your oven runs cool, give them 5 extra minutes on the top shelf.' },
      { q: 'Can I make the whole thing ahead?', a: 'Yes, and it is designed for it. Roast the tray and cook the quinoa on Sunday, keep the sauce separate, and assemble bowls cold or briefly warmed through the week.' },
      { q: 'The tahini sauce tastes bitter. What now?', a: 'Some tahini is noticeably more bitter than others. A little more maple syrup and lemon juice balances it, and a pinch more salt dulls the bitterness directly.' }
    ],
    related: ['quinoa-bowl', 'kale-salad', 'farro-salad']
  },
  {
    slug: 'tuna-white-bean-salad',
    title: 'Tuna and White Bean Salad',
    description: 'A no-cook store-cupboard lunch of tinned tuna, cannellini beans, red onion and a sharp lemon dressing.',
    intro: 'This is the lunch to know when there is nothing in the house. Two tins, an onion and a lemon make a bowl with thirty grams of protein and enough fibre to hold until dinner. The one technique involved is soaking the sliced onion in the lemon juice for ten minutes, which takes the harshness out of it and lightly pickles it at the same time.',
    category: 'healthy-food',
    cuisine: 'Italian',
    course: 'Lunch',
    method: 'No-Cook',
    diet: ['gluten-free', 'dairy-free', 'high-protein', 'high-fibre'],
    keywords: ['tuna white bean salad', 'tinned tuna recipe', 'high protein lunch', 'no cook lunch', 'store cupboard salad'],
    image: null,
    imageAlt: 'A bowl of tuna, white beans, red onion and parsley dressed with lemon and olive oil',
    prepMinutes: 15,
    cookMinutes: 0,
    servings: 4,
    yieldText: '4 lunch portions',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 38,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 352, protein: 30, carbs: 26, fat: 14, fiber: 9, sugar: 4, sodium: 580 },
    equipment: ['Large bowl', 'Fine grater', 'Sieve'],
    ingredients: [
      { group: 'Salad', items: [
        '2 tins (about 300 g drained) tuna in olive oil, drained and flaked',
        '2 tins (800 g) cannellini or butter beans, drained and rinsed',
        '1/2 red onion, very thinly sliced',
        '1 cup cherry tomatoes, halved',
        '1 celery stick, finely sliced',
        '2 tablespoons capers, rinsed',
        'Large handful of flat-leaf parsley, roughly chopped',
        '2 cups rocket or baby spinach'
      ] },
      { group: 'Lemon dressing', items: [
        'Juice of 1 1/2 lemons and the zest of 1',
        '3 tablespoons extra virgin olive oil',
        '1 teaspoon Dijon mustard',
        '1 small garlic clove, finely grated',
        '1/2 teaspoon fine sea salt',
        '1/2 teaspoon black pepper'
      ] }
    ],
    instructions: [
      { title: 'Tame the onion', text: 'Put the sliced onion in a small bowl with the lemon juice and leave it 10 minutes. It turns pink, softens and loses the raw bite that would otherwise dominate the bowl.' },
      { title: 'Rinse the beans well', text: 'Rinse the beans under cold water until the water runs clear and no foam remains, then drain them properly. The starchy tin liquid tastes metallic and makes the dressing cloudy.' },
      { title: 'Make the dressing', text: 'Whisk the lemon zest, olive oil, Dijon, garlic, salt and pepper into the bowl with the onion and its lemon juice until thick and emulsified.' },
      { title: 'Dress the beans first', text: 'Add the beans to the dressing and turn them gently, then leave them 5 minutes. Beans are bland on their own and need that head start to absorb anything.' },
      { title: 'Fold in the rest', text: 'Add the tuna, tomatoes, celery, capers and parsley and fold once or twice with a spatula, keeping the tuna in flakes rather than breaking it into paste.' },
      { title: 'Serve on greens', text: 'Pile over the rocket or spinach and finish with another pour of olive oil and a grind of pepper. Serve at room temperature rather than fridge-cold, which flattens the flavour.' }
    ],
    tips: [
      'Buy tuna in olive oil rather than brine. The texture is better and the oil can go into the dressing instead of down the sink.',
      'Dress the beans before anything else goes in. It is the difference between a seasoned salad and a seasoned surface.',
      'Ten minutes of lemon on the onion is not optional unless you like raw onion; it is the step that makes this taste considered.'
    ],
    variations: [
      'Swap the tuna for tinned salmon, sardines or two tins of chickpeas for a vegan bowl.',
      'Add a jar of roasted peppers, or a handful of olives and torn mozzarella if dairy is not an issue.',
      'Spoon it over toasted sourdough rubbed with garlic and serve it as bruschetta.'
    ],
    storage: 'Keeps 3 days in the fridge and tastes better on day two once the beans have taken on the dressing. Add the greens and parsley only when serving, and do not freeze.',
    faqs: [
      { q: 'Can I use dried beans?', a: 'Yes. 150 g of dried cannellini soaked overnight and simmered until tender gives a better texture than tinned, and the recipe is otherwise unchanged.' },
      { q: 'Is it filling enough for dinner?', a: 'For most people, yes, and a slice of good bread or a soft-boiled egg makes it comfortably so. The beans supply the fibre that keeps it from feeling like a side salad.' },
      { q: 'How do I reduce the sodium?', a: 'Use no-salt-added beans, rinse the capers twice and halve the added salt. Most of the sodium here comes from the tins rather than the seasoning.' }
    ],
    related: ['chickpea-salad', 'farro-salad', 'lentil-soup']
  },
  {
    slug: 'turkey-lettuce-wraps',
    title: 'Ginger Turkey Lettuce Wraps',
    description: 'Savoury minced turkey with ginger, garlic and water chestnuts, spooned into cold lettuce cups.',
    intro: 'Minced turkey is dry when it is treated like beef and excellent when it is not. The trick is a hot pan, very little stirring at the start so it browns rather than steams, and a sauce added only at the end so it glazes instead of boiling the meat. Cold crisp lettuce against the hot filling is most of the appeal.',
    category: 'healthy-food',
    cuisine: 'Asian-inspired',
    course: 'Dinner',
    method: 'Skillet',
    diet: ['dairy-free', 'high-protein', 'low-carb'],
    keywords: ['turkey lettuce wraps', 'low carb dinner', 'minced turkey recipe', 'high protein dinner', 'san choy bow'],
    image: null,
    imageAlt: 'Lettuce cups filled with savoury minced turkey, spring onions and sesame seeds',
    prepMinutes: 15,
    cookMinutes: 12,
    servings: 4,
    yieldText: '12 lettuce cups, 4 servings',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 41,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 326, protein: 34, carbs: 14, fat: 15, fiber: 3, sugar: 8, sodium: 720 },
    equipment: ['Large skillet or wok', 'Fine grater', 'Wooden spoon'],
    ingredients: [
      { group: 'Filling', items: [
        '600 g turkey mince (thigh mince if you can get it)',
        '1 tablespoon neutral oil',
        '4 garlic cloves, finely chopped',
        '2 tablespoons fresh ginger, finely grated',
        '1 tin (225 g) water chestnuts, drained and chopped, or 1 diced carrot',
        '6 spring onions, whites and greens kept separate',
        '1/2 teaspoon fine sea salt'
      ] },
      { group: 'Sauce', items: [
        '3 tablespoons soy sauce, or tamari for gluten-free',
        '1 tablespoon rice vinegar',
        '1 tablespoon hoisin sauce',
        '2 teaspoons toasted sesame oil',
        '1 teaspoon honey',
        '1/2 teaspoon chilli flakes, or 1 tablespoon chilli garlic sauce'
      ] },
      { group: 'To serve', items: [
        '2 baby gem or 1 iceberg lettuce, leaves separated and chilled',
        '1 tablespoon sesame seeds, toasted',
        'Handful of coriander or Thai basil',
        'Lime wedges'
      ] }
    ],
    instructions: [
      { title: 'Mix the sauce first', text: 'Stir the soy sauce, vinegar, hoisin, sesame oil, honey and chilli together in a small bowl. Once the pan is hot there is no time to measure.' },
      { title: 'Brown the turkey', text: 'Heat the oil in a large pan over medium-high until it shimmers. Add the mince with the salt, spread it flat and leave it undisturbed for 4 minutes. Letting it sit is what gives you browned crust instead of grey crumbs.' },
      { title: 'Break it up', text: 'Break the meat into pieces with a wooden spoon and cook 3 to 4 minutes more, until no pink remains and some of the liquid has cooked off.' },
      { title: 'Add the aromatics', text: 'Push the meat to one side, add the garlic, ginger and spring onion whites to the clear space and stir for 45 seconds, until fragrant but not coloured, then combine everything.' },
      { title: 'Glaze with the sauce', text: 'Add the water chestnuts and pour in the sauce. Cook for 2 minutes over medium-high, stirring, until the liquid has reduced to a glaze that clings to the meat rather than pooling in the pan.' },
      { title: 'Serve into cold leaves', text: 'Stir in the spring onion greens. Spoon the hot filling into the chilled lettuce cups at the table, and finish with sesame seeds, herbs and a squeeze of lime.' }
    ],
    tips: [
      'Keep the lettuce in iced water until the moment you serve, then dry it. The contrast between cold leaf and hot filling is the point of the dish.',
      'Do not stir the mince for the first few minutes. Browning is where the flavour comes from, and turkey gives you very little of it otherwise.',
      'Reduce the sauce until it glazes. A wet filling will collapse the lettuce and run down your wrist.'
    ],
    variations: [
      'Use chicken, pork or plant mince, or crumbled firm tofu pressed dry for a vegan version with tamari in place of the hoisin.',
      'Serve the filling over rice or rice noodles instead of lettuce for a more substantial dinner.',
      'Add a diced red pepper or a cup of shredded cabbage with the water chestnuts for more vegetables.'
    ],
    storage: 'The filling keeps 3 days in the fridge and freezes for 2 months. Reheat it in a hot pan rather than the microwave so the glaze tightens again, and prepare the lettuce fresh each time.',
    faqs: [
      { q: 'Can I make this gluten-free?', a: 'Yes. Use tamari in place of the soy sauce and check the hoisin, as most brands contain wheat; a gluten-free hoisin or an extra teaspoon of honey with a splash more tamari both work.' },
      { q: 'Which lettuce holds up best?', a: 'Baby gem is the sturdiest and easiest to eat. Iceberg gives bigger cups and more crunch but tears, and butter lettuce is the most tender but needs a double leaf.' },
      { q: 'My turkey came out dry. Why?', a: 'Turkey breast mince is very lean and overcooks in about a minute. Buy thigh mince if your shop has it, pull the pan off as soon as the glaze thickens, and do not hold it hot on the stove while you prepare the lettuce.' }
    ],
    related: ['miso-noodles', 'honey-soy-chicken', 'coconut-rice-bowl']
  },
  {
    slug: 'black-bean-soup',
    title: 'Smoky Black Bean Soup',
    description: 'A thick, smoky black bean soup from tins and store-cupboard spices, blended half smooth in 40 minutes.',
    intro: 'Blending only half the pot is the detail that makes this worth making. You get the body of a pureed soup and still have whole beans to chew on, without any cream or stock cubes doing the work. Smoked paprika and a little cumin give it the depth that usually comes from a ham bone and several hours.',
    category: 'healthy-food',
    cuisine: 'Latin-inspired',
    course: 'Dinner',
    method: 'Simmered',
    diet: ['vegan', 'gluten-free', 'dairy-free', 'high-fibre'],
    keywords: ['black bean soup', 'vegan soup', 'high fibre soup', 'store cupboard soup', 'smoky bean soup'],
    image: null,
    imageAlt: 'A bowl of thick black bean soup topped with coriander, lime and sliced red chilli',
    prepMinutes: 10,
    cookMinutes: 30,
    servings: 6,
    yieldText: '6 bowls',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 44,
    datePublished: '2026-10-16',
    dateModified: '2026-10-16',
    nutrition: { calories: 312, protein: 16, carbs: 48, fat: 7, fiber: 16, sugar: 7, sodium: 540 },
    equipment: ['Large heavy pot', 'Stick blender or jug blender', 'Wooden spoon'],
    ingredients: [
      { group: 'Base', items: [
        '2 tablespoons olive oil',
        '1 large onion, diced',
        '2 celery sticks, diced',
        '1 red pepper, diced',
        '5 garlic cloves, chopped',
        '1 tablespoon ground cumin',
        '2 teaspoons smoked paprika',
        '1 teaspoon dried oregano',
        '1/2 teaspoon chipotle flakes or cayenne, to taste'
      ] },
      { group: 'Soup', items: [
        '3 tins (1.2 kg) black beans, drained and rinsed',
        '1 tin (400 g) chopped tomatoes',
        '4 cups (1 litre) vegetable stock',
        '1 bay leaf',
        '1 teaspoon fine sea salt, plus more to taste',
        'Juice of 1 lime, at the end'
      ] },
      { group: 'To serve', items: [
        'Coriander, chopped',
        'Sliced red chilli or pickled jalapenos',
        'Lime wedges',
        'Avocado, diced, or a spoon of coconut yogurt'
      ] }
    ],
    instructions: [
      { title: 'Soften the vegetables', text: 'Heat the oil in a large pot over medium and cook the onion, celery and pepper with a pinch of salt for 8 minutes, until soft and just starting to colour at the edges. This is the base of the flavour, so do not rush it.' },
      { title: 'Toast the spices', text: 'Add the garlic, cumin, paprika, oregano and chipotle and stir for 60 seconds, until the pot smells strongly of spice. Toasting them in oil is what separates a deep soup from a dusty one.' },
      { title: 'Build the pot', text: 'Add the beans, tomatoes, stock, bay leaf and salt. Scrape the bottom of the pot to lift anything stuck, bring it to a boil, then lower to a steady simmer.' },
      { title: 'Simmer', text: 'Simmer uncovered for 20 minutes, stirring now and then, until the liquid has reduced slightly and the beans are completely soft.' },
      { title: 'Blend half', text: 'Remove the bay leaf. Blend about half the pot with a stick blender, or take 3 cups out to a blender and return it. Stop while there are still plenty of whole beans visible.' },
      { title: 'Finish with lime', text: 'Stir in the lime juice and taste for salt; it will need more than you expect. Serve with coriander, chilli, avocado and more lime at the table.' }
    ],
    tips: [
      'Rinse the beans properly. The liquid in the tin makes the soup taste tinny and dulls the smoked paprika.',
      'The lime at the end is not a garnish. Without acid the soup tastes heavy and flat, however well seasoned it is.',
      'If it thickens too much on standing, loosen it with stock or water rather than more tomato, which would make it sharp.'
    ],
    variations: [
      'Add 200 g of chorizo or smoked bacon with the onion if you are not keeping it vegan.',
      'Stir in a cup of sweetcorn or a chopped courgette in the last 5 minutes for more vegetables.',
      'Serve it thicker over rice as a stew, or thinner with tortilla chips crushed on top.'
    ],
    storage: 'Keeps 5 days in the fridge, thickening as it sits, and freezes well for 3 months. Freeze it before adding the lime and the toppings, and reheat gently with a splash of water.',
    faqs: [
      { q: 'Can I use dried black beans?', a: 'Yes. 400 g of dried beans soaked overnight and simmered until tender replaces the three tins, and the bean cooking liquid can stand in for some of the stock. Allow an extra hour.' },
      { q: 'Is it meant to be spicy?', a: 'Only mildly as written. The chipotle is there for smoke rather than heat, so adjust it freely, and put the sliced chilli on the table so everyone can choose.' },
      { q: 'What makes it taste smoky without meat?', a: 'Smoked paprika and chipotle, both toasted in oil before the liquid goes in. A teaspoon of liquid smoke or a roasted red pepper blended in pushes it further if you want more.' }
    ],
    related: ['lentil-soup', 'stuffed-peppers', 'chickpea-salad']
  }
  ];

export default recipes;
