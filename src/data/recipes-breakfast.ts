/**
 * Breakfast & Brunch collection.
 *
 * Every recipe here has its own photograph. A recipe may instead carry
 * `image: null`, which makes the generator produce deterministic SVG cover art
 * in assets/img/; replacing a null with a photo URL drops the artwork on the
 * next build.
 */
import type { RecipeSource } from '../types.js';

const recipes: RecipeSource[] = [
  {
    slug: 'buttermilk-pancakes',
    title: 'Fluffy Buttermilk Pancakes',
    description: 'Tall, tender pancakes with a proper tang, from a batter that takes four minutes to mix.',
    intro: 'Pancakes go flat for one reason: the batter gets beaten smooth. Lumps are not a defect, they are undeveloped gluten, and they are what keeps the crumb tender. Mix until the flour has only just disappeared, then stop and let it rest.',
    category: 'breakfast',
    cuisine: 'American',
    course: 'Breakfast',
    method: 'Griddled',
    diet: ['vegetarian'],
    keywords: ['buttermilk pancakes', 'fluffy pancakes', 'easy pancake recipe', 'weekend breakfast'],
    image: 'https://images.unsplash.com/photo-1710533820700-dd6f6623cc97?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A stack of fluffy buttermilk pancakes with syrup poured over the top',
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 4,
    yieldText: '12 pancakes',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 264,
    datePublished: '2025-08-19',
    dateModified: '2026-08-25',
    nutrition: { calories: 428, protein: 12, carbs: 58, fat: 16, fiber: 2, sugar: 12, sodium: 620 },
    equipment: ['Large mixing bowl', 'Whisk', 'Non-stick pan or flat griddle', 'Ladle or ice cream scoop'],
    ingredients: [
      { group: 'Dry', items: [
        '2 cups (250 g) plain flour',
        '2 tbsp caster sugar',
        '2 tsp baking powder',
        '1 tsp bicarbonate of soda',
        '3/4 tsp fine salt'
      ] },
      { group: 'Wet', items: [
        '2 cups (480 ml) buttermilk',
        '2 large eggs',
        '3 tbsp unsalted butter, melted and cooled',
        '1 tsp vanilla extract'
      ] },
      { group: 'To cook and serve', items: [
        'Butter or neutral oil, for the pan',
        'Maple syrup and extra butter'
      ] }
    ],
    instructions: [
      { title: 'Whisk the dry ingredients', text: 'Combine the flour, sugar, baking powder, bicarbonate of soda and salt in a large bowl and whisk for 20 seconds. This distributes the raising agents, which is what stops you biting into a bitter pocket of bicarb.' },
      { title: 'Combine the wet', text: 'In a jug, whisk the buttermilk, eggs, melted butter and vanilla until uniform. Make sure the butter has cooled or it will scramble the eggs.' },
      { title: 'Mix badly, on purpose', text: 'Pour the wet into the dry and fold with a spatula about ten times, until no dry flour remains. The batter should be thick and visibly lumpy. Stop there.' },
      { title: 'Rest the batter', text: 'Leave it for 10 minutes. The flour hydrates and the raising agents start working, and the batter will thicken and puff slightly. This rest is the difference between flat and tall.' },
      { title: 'Cook on medium-low', text: 'Heat a lightly buttered pan over medium-low. Ladle in about 1/4 cup per pancake and cook 2-3 minutes, until bubbles appear across the surface and the edges look matte and set.' },
      { title: 'Flip once', text: 'Turn and cook 1-2 minutes more until golden. Flipping twice presses the air out. Hold finished pancakes on a rack in a low oven rather than stacking them on a plate, which traps steam and softens them.' }
    ],
    tips: [
      'Lumps are correct. A smooth batter has been overmixed and will cook up flat and chewy.',
      'Medium-low heat, not medium-high. Hot pans brown the outside before the middle has risen.',
      'No buttermilk? Stir 2 tbsp lemon juice into 2 cups of milk and leave it 10 minutes. The acid is what reacts with the bicarbonate of soda.'
    ],
    variations: [
      'Scatter blueberries or chocolate chips onto each pancake after ladling, rather than mixing them into the batter.',
      'Replace a quarter of the flour with fine cornmeal for more texture and a slight crunch.',
      'Add the zest of a lemon and serve with ricotta and honey instead of syrup.'
    ],
    storage: 'Cooked pancakes keep 3 days refrigerated and freeze for 2 months layered between parchment. Reheat straight from frozen in a toaster, which crisps the outside better than a microwave.',
    faqs: [
      { q: 'Why are my pancakes flat?', a: 'Almost always overmixing, or raising agents past their date. Baking powder loses potency after about six months open; test it by dropping a spoonful into hot water, which should fizz vigorously.' },
      { q: 'Can I make the batter the night before?', a: 'Not ideally. The bicarbonate of soda reacts with the buttermilk immediately and will be spent by morning. Mix the dry ingredients the night before instead and combine in the morning.' },
      { q: 'When exactly should I flip?', a: 'When bubbles have risen across the whole surface and started to pop, and the edges look dry rather than glossy. Lifting an edge to peek is fine and tells you more than a timer.' }
    ],
    related: ['french-toast', 'blueberry-muffins', 'overnight-oats']
  },
  {
    slug: 'shakshuka',
    title: 'Classic Shakshuka',
    description: 'Eggs poached in a spiced tomato and pepper sauce, cooked and served in one pan.',
    intro: 'Shakshuka is a lesson in patience at one point only: the peppers and onions need long enough to turn genuinely sweet before the tomatoes go in. Rush that and the sauce stays sharp. Everything after it takes ten minutes.',
    category: 'breakfast',
    cuisine: 'Middle Eastern',
    course: 'Brunch',
    method: 'Skillet',
    diet: ['vegetarian', 'gluten-free', 'high-protein', 'low-carb'],
    keywords: ['shakshuka', 'eggs in tomato sauce', 'brunch recipe', 'one pan eggs'],
    image: 'https://images.unsplash.com/photo-1682622110419-b671026a4536?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Eggs poached in a spiced tomato and pepper sauce in a black skillet',
    prepMinutes: 10,
    cookMinutes: 30,
    servings: 4,
    yieldText: '4 servings, 2 eggs each',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 231,
    datePublished: '2025-09-09',
    dateModified: '2026-08-27',
    nutrition: { calories: 318, protein: 19, carbs: 18, fat: 19, fiber: 5, sugar: 11, sodium: 690 },
    equipment: ['Wide lidded skillet', 'Wooden spoon'],
    ingredients: [
      { group: 'Sauce', items: [
        '3 tbsp olive oil',
        '1 large onion, thinly sliced',
        '2 red bell peppers, sliced',
        '4 garlic cloves, sliced',
        '2 tsp ground cumin',
        '2 tsp sweet paprika',
        '1/2 tsp caraway seeds, crushed',
        '1/4 tsp cayenne, or to taste',
        '2 tbsp tomato paste',
        '1 can (28 oz / 800 g) whole plum tomatoes, crushed by hand',
        '1 tsp sugar',
        '1 tsp salt'
      ] },
      { group: 'To finish', items: [
        '8 large eggs',
        '3.5 oz (100 g) feta, crumbled',
        'Large handful of coriander or parsley',
        'Warm flatbread, to serve'
      ] }
    ],
    instructions: [
      { title: 'Sweat the vegetables', text: 'Heat the olive oil in a wide skillet over medium. Cook the onion and peppers with a pinch of salt for 12-15 minutes, stirring occasionally, until soft, slumped and sweet. This is the step that decides the dish.' },
      { title: 'Bloom the spices', text: 'Add the garlic, cumin, paprika, caraway, cayenne and tomato paste. Cook 2 minutes, stirring constantly, until the paste darkens and the spices smell toasted rather than dusty.' },
      { title: 'Simmer the sauce', text: 'Add the crushed tomatoes, sugar and salt. Simmer uncovered for 10-12 minutes until thick enough that a spoon dragged through leaves a trail that holds for a second.' },
      { title: 'Make wells', text: 'Taste and adjust the salt now, because you cannot stir it once the eggs are in. Use the back of a spoon to make eight shallow wells in the sauce.' },
      { title: 'Add the eggs', text: 'Crack an egg into each well. Season the tops, cover the pan, and cook on low for 6-8 minutes, until the whites are just set and the yolks still wobble.' },
      { title: 'Serve from the pan', text: 'Scatter over the feta and herbs and bring the pan to the table with plenty of flatbread for scooping.' }
    ],
    tips: [
      'Do not hurry the peppers and onions. Fifteen slow minutes is what makes the sauce taste sweet rather than acidic.',
      'Crack each egg into a small cup first, then slide it into its well. It gives you far more control than cracking directly into a hot pan.',
      'Take it off the heat when the whites look barely set; carryover heat firms them up while you carry the pan to the table.'
    ],
    variations: [
      'Add merguez sausage or chorizo with the onions for a meaty version.',
      'Stir a few handfuls of spinach into the sauce before adding the eggs.',
      'Make it green with courgette, leek and herbs in place of the tomatoes and peppers.'
    ],
    storage: 'The sauce keeps 5 days refrigerated and freezes for 3 months, so it is worth doubling. Store it without the eggs and poach fresh ones into a reheated portion in about six minutes.',
    faqs: [
      { q: 'How do I stop the yolks overcooking?', a: 'Keep the heat low once the eggs go in and use a lid, so the tops set by trapped steam rather than by the sauce getting hotter. Check at six minutes; the whites should be opaque and the yolks still move when you shake the pan.' },
      { q: 'Can I make it ahead for a brunch?', a: 'Make the sauce entirely ahead, which genuinely improves it. Reheat it to a simmer and poach the eggs just before serving, which takes about eight minutes.' },
      { q: 'What do I serve with it?', a: 'Bread is not optional; the sauce needs something to carry it. Challah, pita, sourdough or any flatbread all work. A sharp green salad cuts the richness well.' }
    ],
    related: ['spinach-feta-omelette', 'breakfast-hash', 'avocado-toast']
  },
  {
    slug: 'overnight-oats',
    title: 'Vanilla Overnight Oats',
    description: 'A no-cook breakfast that thickens in the fridge overnight, with a base ratio you can build on all week.',
    intro: 'Overnight oats are less a recipe than a ratio, and once you know it you never measure again. Equal parts oats and liquid, a spoon of chia to thicken, and something acidic or sweet to stop it tasting like wet cereal.',
    category: 'breakfast',
    cuisine: 'International',
    course: 'Breakfast',
    method: 'No-Cook',
    diet: ['vegetarian', 'high-fibre', 'high-protein'],
    keywords: ['overnight oats', 'make ahead breakfast', 'healthy breakfast', 'meal prep breakfast'],
    image: 'https://images.unsplash.com/photo-1638777742192-3cccddaea89f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A jar of creamy overnight oats with a wooden spoon',
    prepMinutes: 8,
    cookMinutes: 0,
    servings: 4,
    yieldText: '4 jars',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 198,
    datePublished: '2025-09-23',
    dateModified: '2026-07-31',
    nutrition: { calories: 372, protein: 20, carbs: 46, fat: 12, fiber: 9, sugar: 14, sodium: 120 },
    equipment: ['4 jars or lidded containers', 'Spoon'],
    ingredients: [
      { group: 'Base', items: [
        '2 cups (180 g) rolled oats',
        '2 cups (480 ml) milk of choice',
        '1 cup (250 g) Greek yogurt',
        '3 tbsp chia seeds',
        '2 tbsp maple syrup or honey',
        '2 tsp vanilla extract',
        '1/2 tsp fine salt'
      ] },
      { group: 'Toppings, added in the morning', items: [
        'Fresh berries or sliced banana',
        '2 tbsp nut butter',
        'Toasted nuts or granola',
        'Ground cinnamon'
      ] }
    ],
    instructions: [
      { title: 'Combine the base', text: 'Stir the oats, milk, yogurt, chia seeds, maple syrup, vanilla and salt together in a bowl until completely mixed and no dry oats remain at the bottom.' },
      { title: 'Do not skip the salt', text: 'Taste the mixture. Unsalted overnight oats taste flat no matter how much sweetener you add, and half a teaspoon changes the whole thing.' },
      { title: 'Divide', text: 'Spoon into four jars, leaving a couple of centimetres of headroom. It thickens considerably and will climb.' },
      { title: 'Rest overnight', text: 'Cover and refrigerate at least 6 hours, ideally overnight. The oats soften and the chia forms a gel that sets the whole thing.' },
      { title: 'Loosen in the morning', text: 'It will be thicker than you expect. Stir in a splash of milk until it drops easily off a spoon.' },
      { title: 'Top and eat', text: 'Add fruit, nut butter and something crunchy at the moment of eating, never the night before, or the topping goes soft.' }
    ],
    tips: [
      'Use rolled oats, not instant and not steel-cut. Instant turns to paste and steel-cut never softens properly without heat.',
      'Add crunchy toppings in the morning only. Granola left overnight in oats is just more oats.',
      'The base ratio is 1 part oats to 1 part liquid plus yogurt. Memorise it and you can improvise indefinitely.'
    ],
    variations: [
      'Stir in cocoa powder and a spoon of peanut butter for a chocolate version.',
      'Grate an apple in with a good pinch of cinnamon for something close to apple pie.',
      'Use coconut milk and top with mango and lime zest.'
    ],
    storage: 'Keeps 4 days refrigerated, which is why it suits a Sunday batch. Do not freeze it; the texture separates badly on thawing.',
    faqs: [
      { q: 'Do I have to use chia seeds?', a: 'No, but they are what gives the pudding-like set. Without them, use a quarter less liquid or the result will be loose.' },
      { q: 'Can I eat them warm?', a: 'Yes. Microwave a jar for 60-90 seconds, stirring halfway. It becomes a very good quick porridge, though the texture is softer than cooked oats.' },
      { q: 'How do I get more protein in?', a: 'The Greek yogurt already puts this at 20 g per serving. A scoop of protein powder stirred into the milk before mixing adds another 20 g or so, but add extra liquid because it absorbs a lot.' }
    ],
    related: ['smoothie-bowl', 'yogurt-parfait', 'buttermilk-pancakes']
  },
  {
    slug: 'breakfast-burritos',
    title: 'Freezer Breakfast Burritos',
    description: 'A batch of twelve wrapped burritos for the freezer, reheatable in three minutes on a weekday.',
    intro: 'The whole point is what happens on a Tuesday, not on the Sunday you make them. That means building them to survive freezing, which rules out anything watery and means the eggs must be deliberately undercooked.',
    category: 'breakfast',
    cuisine: 'Mexican-inspired',
    course: 'Breakfast',
    method: 'Skillet',
    diet: ['high-protein'],
    keywords: ['breakfast burritos', 'freezer breakfast', 'make ahead breakfast', 'meal prep burritos'],
    image: 'https://images.unsplash.com/photo-1788538397125-8fef2bf2af0b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A breakfast burrito wrapped in foil and held in one hand',
    prepMinutes: 20,
    cookMinutes: 30,
    servings: 12,
    yieldText: '12 burritos',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 176,
    datePublished: '2025-10-14',
    dateModified: '2026-08-10',
    nutrition: { calories: 468, protein: 24, carbs: 42, fat: 23, fiber: 5, sugar: 3, sodium: 780 },
    equipment: ['Large skillet', 'Sheet pan', 'Foil or parchment', 'Freezer bags'],
    ingredients: [
      { group: 'Potatoes', items: [
        '2 lb (900 g) potatoes, cut into 1 cm cubes',
        '2 tbsp olive oil',
        '1 tsp smoked paprika',
        '1 tsp garlic powder',
        '1 tsp salt'
      ] },
      { group: 'Filling', items: [
        '16 large eggs',
        '1/4 cup (60 ml) milk',
        '2 tbsp butter',
        '1 lb (450 g) breakfast sausage or chorizo',
        '1 can (15 oz / 425 g) black beans, drained and rinsed',
        '2.5 cups (280 g) grated cheddar',
        '1 tsp salt and plenty of black pepper'
      ] },
      { group: 'Assembly', items: [
        '12 large flour tortillas (25 cm)'
      ] }
    ],
    instructions: [
      { title: 'Roast the potatoes', text: 'Heat the oven to 220C / 425F. Toss the potatoes with the oil, paprika, garlic powder and salt, spread on a sheet pan and roast 25-30 minutes until crisp. Let them cool.' },
      { title: 'Cook the sausage', text: 'Brown the sausage in a skillet over medium-high, breaking it up, for 8-10 minutes. Drain off the fat, which would otherwise make the tortillas greasy in the freezer.' },
      { title: 'Underscramble the eggs', text: 'Whisk the eggs with the milk and salt. Melt the butter in a pan over medium-low and cook the eggs slowly, pulling them off while still visibly wet and glossy. They finish cooking during reheating, and fully cooked eggs turn rubbery.' },
      { title: 'Cool everything completely', text: 'Spread all three components on trays and cool to room temperature. Wrapping anything warm creates steam, which turns the tortilla to mush in the freezer.' },
      { title: 'Assemble', text: 'Warm each tortilla briefly so it folds without cracking. Layer cheese, then potatoes, eggs, sausage and beans in the lower third, keeping the filling well away from the edges. Fold the sides in, then roll tightly.' },
      { title: 'Wrap and freeze', text: 'Wrap each burrito seam-side down in foil or parchment, then bag them. Freeze for up to 3 months.' }
    ],
    tips: [
      'Undercook the eggs deliberately. This is the single most important step and the one people skip.',
      'Cool every component fully before wrapping. Trapped steam is what ruins frozen burritos.',
      'Cheese against the tortilla on both sides acts as a moisture barrier as well as glue.'
    ],
    variations: [
      'Make it vegetarian with crumbled seasoned tofu or extra beans in place of the sausage.',
      'Add pickled jalapenos or a spoon of salsa verde, but keep wet ingredients minimal.',
      'Swap potatoes for sweet potatoes, roasted the same way.'
    ],
    storage: 'Three months frozen. To reheat, unwrap, microwave 2 minutes, turn and go another 30-60 seconds. For a crisp exterior, finish in a dry pan for 2 minutes a side or 4 minutes in an air fryer.',
    faqs: [
      { q: 'Why did my burrito go soggy?', a: 'Something was wrapped warm, or a wet ingredient like salsa went in before freezing. Cool everything completely and add sauces after reheating.' },
      { q: 'Can I reheat from the fridge instead?', a: 'Yes, and it is faster: about 90 seconds in the microwave. Refrigerated burritos should be eaten within 4 days.' },
      { q: 'Do they need foil, or is parchment better?', a: 'Parchment is more convenient because it goes in the microwave. If you use foil you must unwrap first. Foil is better for oven reheating and freezer burn.' }
    ],
    related: ['breakfast-hash', 'shakshuka', 'spinach-feta-omelette']
  },
  {
    slug: 'french-toast',
    title: 'Brioche French Toast',
    description: 'Custard-soaked brioche with a caramelised crust and a centre that is set, not soggy.',
    intro: 'French toast fails in the middle. Fresh bread collapses, thin slices go limp, and a rushed soak leaves a wet seam through the centre. Stale brioche cut thick, given a proper soak and cooked gently, fixes all three.',
    category: 'breakfast',
    cuisine: 'French',
    course: 'Brunch',
    method: 'Pan-Fried',
    diet: ['vegetarian'],
    keywords: ['french toast', 'brioche french toast', 'brunch recipe', 'best french toast'],
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Stacked brioche French toast with blueberries, banana and icing sugar',
    prepMinutes: 10,
    cookMinutes: 16,
    servings: 4,
    yieldText: '8 thick slices',
    difficulty: 'Easy',
    rating: 4.8,
    ratingCount: 209,
    datePublished: '2025-11-04',
    dateModified: '2026-08-13',
    nutrition: { calories: 512, protein: 15, carbs: 54, fat: 26, fiber: 2, sugar: 22, sodium: 480 },
    equipment: ['Shallow dish', 'Large non-stick pan', 'Wire rack'],
    ingredients: [
      { group: 'Custard', items: [
        '4 large eggs',
        '1 cup (240 ml) whole milk',
        '1/4 cup (60 ml) double cream',
        '3 tbsp caster sugar',
        '2 tsp vanilla extract',
        '1 tsp ground cinnamon',
        '1/4 tsp ground nutmeg',
        '1/2 tsp fine salt'
      ] },
      { group: 'Bread', items: [
        '8 slices brioche, cut 2.5 cm thick, ideally a day or two old',
        '3 tbsp butter, for the pan'
      ] },
      { group: 'To serve', items: [
        'Maple syrup',
        'Icing sugar',
        'Fresh berries'
      ] }
    ],
    instructions: [
      { title: 'Dry the bread', text: 'If the brioche is fresh, lay the slices on a rack in a 150C / 300F oven for 10 minutes. Dry bread absorbs custard; fresh bread turns to pulp.' },
      { title: 'Whisk the custard', text: 'Beat the eggs first until completely uniform, then whisk in the milk, cream, sugar, vanilla, cinnamon, nutmeg and salt. Streaks of unbeaten egg fry into visible yellow patches.' },
      { title: 'Soak properly', text: 'Dip each slice for 20-30 seconds a side. It should feel heavy but still hold together. Thick brioche needs the full time; thin bread needs half.' },
      { title: 'Cook low and slow', text: 'Melt butter in a pan over medium-low. Cook the slices 3-4 minutes a side, until deep golden. Too hot and the outside burns while the custard inside stays raw.' },
      { title: 'Hold on a rack', text: 'Move finished slices to a wire rack in a low oven rather than stacking them. A plate traps steam and the crust you just built goes soft.' },
      { title: 'Serve', text: 'Dust with icing sugar and serve with syrup and berries.' }
    ],
    tips: [
      'Day-old bread is not a compromise, it is the recipe. Dry bread is the only kind that soaks properly.',
      'Medium-low heat throughout. The custard needs time to set before the sugar in the brioche burns.',
      'Salt in the custard matters as much as it does in the pancakes. Without it the whole thing tastes cloying.'
    ],
    variations: [
      'Add orange zest and a splash of Grand Marnier to the custard.',
      'Make it stuffed: sandwich cream cheese and jam between two thin slices before soaking.',
      'Coat the soaked slices in crushed cornflakes for a crunchy exterior.'
    ],
    storage: 'Best immediately, but cooked slices keep 2 days refrigerated and freeze for a month. Reheat in a toaster or a 180C / 350F oven for 8 minutes; the microwave makes them limp.',
    faqs: [
      { q: 'What bread works best?', a: 'Enriched breads with an open crumb: brioche, challah or a good white sourdough. Thin sandwich bread has neither the structure nor the thickness and always disappoints.' },
      { q: 'Why is the middle still wet?', a: 'Either the pan was too hot, so the outside cooked first, or the slices were cut thicker than the soak allowed for. Drop the heat and give each side an extra minute.' },
      { q: 'Can I prepare it for a crowd?', a: 'Cook it all and hold it on racks in a 120C / 250F oven for up to 30 minutes. Racks are essential, since stacking undoes the crust.' }
    ],
    related: ['buttermilk-pancakes', 'blueberry-muffins', 'banana-bread']
  },
  {
    slug: 'avocado-toast',
    title: 'Chilli Avocado Toast with a Soft Egg',
    description: 'Properly seasoned smashed avocado on charred sourdough, finished with a jammy egg and chilli crisp.',
    intro: 'Avocado toast is mocked because it is usually made badly: underseasoned avocado on soft bread. Acid, salt and heat are what make it worth eating, and a jammy egg turns it from a snack into breakfast.',
    category: 'breakfast',
    cuisine: 'Californian',
    course: 'Breakfast',
    method: 'No-Cook',
    diet: ['vegetarian', 'high-fibre'],
    keywords: ['avocado toast', 'avocado toast with egg', 'healthy breakfast', 'quick breakfast'],
    image: 'https://images.unsplash.com/photo-1631311915775-e8f4250a7d4e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smashed avocado on seeded sourdough toast scattered with coriander',
    prepMinutes: 8,
    cookMinutes: 7,
    servings: 2,
    yieldText: '2 large toasts',
    difficulty: 'Easy',
    rating: 4.6,
    ratingCount: 143,
    datePublished: '2025-11-25',
    dateModified: '2026-07-24',
    nutrition: { calories: 424, protein: 16, carbs: 34, fat: 26, fiber: 10, sugar: 3, sodium: 520 },
    equipment: ['Small saucepan', 'Bowl of iced water', 'Fork'],
    ingredients: [
      { group: 'Eggs', items: [
        '2 large eggs, fridge cold'
      ] },
      { group: 'Avocado', items: [
        '2 ripe avocados',
        'Juice of 1 lime',
        '1/2 tsp flaky sea salt',
        '1/4 tsp black pepper',
        '2 tbsp coriander, chopped'
      ] },
      { group: 'To assemble', items: [
        '2 thick slices sourdough',
        '1 garlic clove, halved',
        'Chilli crisp or red pepper flakes',
        'Extra-virgin olive oil',
        'Toasted sesame seeds'
      ] }
    ],
    instructions: [
      { title: 'Boil the eggs', text: 'Lower the cold eggs into already-boiling water and cook for exactly 6 minutes and 30 seconds for a set white and a jammy yolk.' },
      { title: 'Shock them', text: 'Move them straight into iced water for 2 minutes. This halts the cooking and makes them far easier to peel.' },
      { title: 'Toast and rub', text: 'Toast the sourdough until well charred at the edges, then rub the cut garlic clove over the hot surface. The bread acts as a grater and this takes five seconds.' },
      { title: 'Season the avocado in the bowl', text: 'Scoop the avocados into a bowl and mash roughly with the lime juice, salt and pepper. Season it here, not on the toast, so it is even throughout.' },
      { title: 'Assemble', text: 'Spread the avocado thickly, right to the edges, and scatter over the coriander.' },
      { title: 'Finish', text: 'Halve the peeled eggs and lay them on top. Add chilli crisp, a drizzle of olive oil, sesame seeds and a final pinch of flaky salt.' }
    ],
    tips: [
      'Season the avocado in the bowl. Salt sprinkled on top only seasons the first bite.',
      '6 minutes 30 from boiling, straight into ice, gives a reliably jammy yolk every time.',
      'Char the bread more than feels comfortable. Bitterness from the crust is what balances the fatty avocado.'
    ],
    variations: [
      'Add crumbled feta and a spoon of harissa instead of the chilli crisp.',
      'Swap the egg for smoked salmon or crisp bacon.',
      'Add pickled red onion for sharpness and colour.'
    ],
    storage: 'Assemble and eat immediately; avocado browns within the hour. Soft-boiled eggs can be cooked ahead and kept peeled in the fridge for 2 days, which makes weekday assembly quick.',
    faqs: [
      { q: 'How do I stop avocado going brown?', a: 'Lime or lemon juice slows it considerably, and pressing cling film directly onto the surface helps. But it is a delaying tactic, not a fix, so mash it just before serving.' },
      { q: 'How do I tell if an avocado is ripe?', a: 'It should yield to gentle pressure in your palm rather than your fingertips, which bruise it. Flicking off the small stem nub is the better test: green underneath means ripe, brown means overripe.' },
      { q: 'Can I make this vegan?', a: 'Leave the egg off and add crisp roasted chickpeas or white beans for protein and texture. The rest of the recipe is already vegan.' }
    ],
    related: ['ricotta-toasts', 'shakshuka', 'spinach-feta-omelette']
  },
  {
    slug: 'banana-bread',
    title: 'One-Bowl Banana Bread',
    description: 'A deeply banana-flavoured loaf mixed in a single bowl, with a crackly top and a moist crumb.',
    intro: 'Two things decide banana bread: how ripe the bananas are, and how little you stir. Black, unpleasant-looking bananas make the best loaf, and stopping the moment the flour disappears is what keeps the crumb tender rather than rubbery.',
    category: 'breakfast',
    cuisine: 'American',
    course: 'Breakfast',
    method: 'Baked',
    diet: ['vegetarian'],
    keywords: ['banana bread', 'easy banana bread', 'one bowl baking', 'overripe bananas'],
    image: 'https://images.unsplash.com/photo-1632931057819-4eefffa8e007?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A sliced banana bread loaf topped with banana slices and walnuts',
    prepMinutes: 15,
    cookMinutes: 60,
    servings: 10,
    yieldText: 'One 900 g loaf',
    difficulty: 'Easy',
    rating: 4.9,
    ratingCount: 288,
    datePublished: '2025-12-16',
    dateModified: '2026-08-23',
    nutrition: { calories: 316, protein: 4, carbs: 46, fat: 13, fiber: 2, sugar: 26, sodium: 240 },
    equipment: ['900 g loaf tin', 'Large bowl', 'Fork', 'Baking parchment'],
    ingredients: [
      { group: 'Wet', items: [
        '4 very ripe bananas (about 450 g peeled), heavily speckled or black',
        '115 g unsalted butter, melted',
        '3/4 cup (150 g) light brown sugar',
        '2 large eggs',
        '1/4 cup (60 g) sour cream or Greek yogurt',
        '2 tsp vanilla extract'
      ] },
      { group: 'Dry', items: [
        '1.75 cups (220 g) plain flour',
        '1 tsp bicarbonate of soda',
        '1 tsp ground cinnamon',
        '3/4 tsp fine salt'
      ] },
      { group: 'Optional', items: [
        '3/4 cup chopped walnuts or dark chocolate chunks',
        '1 tbsp demerara sugar, for the top'
      ] }
    ],
    instructions: [
      { title: 'Prepare the tin', text: 'Heat the oven to 175C / 350F. Line a 900 g loaf tin with parchment, leaving an overhang on the long sides to lift the loaf out.' },
      { title: 'Mash the bananas', text: 'Mash them in the mixing bowl with a fork, leaving some texture. Very ripe bananas mash almost to liquid, which is exactly what you want.' },
      { title: 'Add the rest of the wet', text: 'Stir in the melted butter, brown sugar, eggs, sour cream and vanilla until smooth. Using one bowl throughout is deliberate; there is nothing gained by separating.' },
      { title: 'Fold in the dry', text: 'Add the flour, bicarbonate of soda, cinnamon and salt directly on top and fold until the flour has only just disappeared. Overmixing here is what makes banana bread tough.' },
      { title: 'Add the extras', text: 'Fold through the walnuts or chocolate with two or three strokes, then scrape into the tin and sprinkle the demerara over the top for a crackly crust.' },
      { title: 'Bake and cool', text: 'Bake 55-65 minutes, until a skewer in the centre comes out with a few moist crumbs. Tent with foil at 40 minutes if it is browning fast. Cool in the tin 15 minutes, then lift out onto a rack.' }
    ],
    tips: [
      'The bananas cannot be too ripe. If yours are yellow, bake them at 150C / 300F for 15 minutes until the skins blacken, then cool and use.',
      'Fold, do not beat. Lumps in the batter are fine; a smooth batter means a chewy loaf.',
      'Test at 55 minutes. A skewer with moist crumbs means done; a clean skewer usually means slightly overbaked.'
    ],
    variations: [
      'Swirl 3 tbsp of tahini or peanut butter through the batter before baking.',
      'Add a cream cheese ribbon: beat 150 g cream cheese with an egg yolk and 2 tbsp sugar, then layer it through the middle.',
      'Make muffins instead, baking at 190C / 375F for 20-22 minutes.'
    ],
    storage: 'Keeps 4 days wrapped at room temperature and improves on day two as the flavour settles. Freezes for 3 months whole or in slices; toast frozen slices straight from the freezer.',
    faqs: [
      { q: 'Why did my loaf sink in the middle?', a: 'Usually underbaking, or too much raising agent. Bicarbonate of soda needs the acid from the bananas and sour cream to work correctly, so do not increase it.' },
      { q: 'Can I reduce the sugar?', a: 'You can cut it to 100 g without much structural change, though the loaf browns less and keeps slightly less well. Very ripe bananas are already sweet enough to carry it.' },
      { q: 'Can I freeze overripe bananas until I have enough?', a: 'Yes, and it is the best way to always have some. Freeze them peeled, thaw fully, and include the dark liquid they release, which is full of flavour.' }
    ],
    related: ['blueberry-muffins', 'buttermilk-pancakes', 'apple-crisp']
  },
  {
    slug: 'breakfast-hash',
    title: 'Sweet Potato Breakfast Hash',
    description: 'Crisp-edged sweet potato with peppers, chorizo and eggs cooked into the top, all in one pan.',
    intro: 'A hash is only good if the potatoes actually crisp, and that comes down to two things people get wrong: crowding the pan and stirring too often. Give the cubes room and leave them alone, and the rest of the dish assembles itself.',
    category: 'breakfast',
    cuisine: 'American',
    course: 'Brunch',
    method: 'Skillet',
    diet: ['gluten-free', 'dairy-free', 'high-protein'],
    keywords: ['breakfast hash', 'sweet potato hash', 'one pan breakfast', 'brunch skillet'],
    image: 'https://images.unsplash.com/photo-1783685736962-336abefabfae?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A skillet of sweet potato hash with chorizo, peppers and fried eggs',
    prepMinutes: 15,
    cookMinutes: 28,
    servings: 4,
    yieldText: '4 servings',
    difficulty: 'Easy',
    rating: 4.7,
    ratingCount: 157,
    datePublished: '2026-01-13',
    dateModified: '2026-08-07',
    nutrition: { calories: 462, protein: 22, carbs: 38, fat: 25, fiber: 6, sugar: 9, sodium: 720 },
    equipment: ['Large cast-iron or heavy skillet', 'Lid'],
    ingredients: [
      { group: 'Hash', items: [
        '2 large sweet potatoes (about 800 g), cut into 1.5 cm cubes',
        '7 oz (200 g) cooking chorizo, sliced',
        '2 tbsp olive oil',
        '1 red onion, diced',
        '1 red bell pepper, diced',
        '3 garlic cloves, minced',
        '1 tsp smoked paprika',
        '1/2 tsp ground cumin',
        '3/4 tsp salt'
      ] },
      { group: 'To finish', items: [
        '4 large eggs',
        '2 spring onions, sliced',
        'Fresh coriander',
        'Hot sauce, to serve'
      ] }
    ],
    instructions: [
      { title: 'Render the chorizo', text: 'Cook the chorizo in a dry cold skillet over medium heat for 5-6 minutes until the fat runs and the edges crisp. Lift it out, leaving the coloured fat behind; that fat is the seasoning for everything else.' },
      { title: 'Crisp the sweet potato', text: 'Add the olive oil and the sweet potato in a single layer. Leave it undisturbed for 6-7 minutes to form a crust, then turn and cook 6-8 minutes more. Use two pans if it does not fit in one layer.' },
      { title: 'Soften the vegetables', text: 'Add the onion and pepper and cook 5 minutes until softened and lightly charred at the edges.' },
      { title: 'Season', text: 'Stir in the garlic, smoked paprika, cumin and salt and cook 1 minute, then return the chorizo and fold through.' },
      { title: 'Add the eggs', text: 'Make four wells, crack an egg into each, cover the pan and cook on low for 5-6 minutes until the whites set and the yolks stay runny.' },
      { title: 'Serve from the pan', text: 'Scatter with spring onion and coriander and take the skillet to the table with hot sauce alongside.' }
    ],
    tips: [
      'Crowding is the enemy. Sweet potato releases a lot of moisture and a packed pan steams rather than fries.',
      'Start the chorizo in a cold dry pan so the fat renders gradually instead of the outside burning.',
      'Cast iron holds heat better than anything else here, which is exactly what a crust needs.'
    ],
    variations: [
      'Leave out the chorizo and add a tin of black beans for a vegetarian version.',
      'Use regular potatoes, parboiled for 5 minutes first, which crisp even better.',
      'Add crumbled feta and a spoon of chimichurri at the end.'
    ],
    storage: 'The hash without eggs keeps 4 days refrigerated and re-crisps well in a hot dry pan. Cook fresh eggs into a reheated portion rather than reheating cooked ones.',
    faqs: [
      { q: 'Why is my hash mushy instead of crisp?', a: 'Too much in the pan, heat too low, or stirring too often. Cook in two batches if you have to; it is faster than trying to rescue a steamed pan.' },
      { q: 'Can I prep this the night before?', a: 'Cube the sweet potato and keep it covered in the fridge, and chop the vegetables. Do not cook it ahead if you want maximum crispness.' },
      { q: 'Do I have to bake the eggs into it?', a: 'No. Fried or poached eggs laid on top work just as well and give you more control over the yolks, which is easier when cooking for several people.' }
    ],
    related: ['breakfast-burritos', 'shakshuka', 'spinach-feta-omelette']
  },
  {
    slug: 'blueberry-muffins',
    title: 'Bakery-Style Blueberry Muffins',
    description: 'Tall domed muffins with a crunchy sugar top, from a thick batter and a hot oven start.',
    intro: 'The dome is not luck. It comes from a batter thick enough to stand up, tins filled properly full, and a blast of high heat at the start that forces a fast rise before the crumb sets.',
    category: 'breakfast',
    cuisine: 'American',
    course: 'Breakfast',
    method: 'Baked',
    diet: ['vegetarian'],
    keywords: ['blueberry muffins', 'bakery style muffins', 'muffin recipe', 'breakfast baking'],
    image: 'https://images.unsplash.com/photo-1722251172860-39856cdd3bcd?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Blueberry muffins in a muffin tin surrounded by fresh blueberries',
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 12,
    yieldText: '12 large muffins',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 221,
    datePublished: '2026-02-10',
    dateModified: '2026-08-26',
    nutrition: { calories: 328, protein: 5, carbs: 48, fat: 13, fiber: 2, sugar: 26, sodium: 260 },
    equipment: ['12-hole muffin tin', 'Paper cases', 'Two bowls', 'Ice cream scoop'],
    ingredients: [
      { group: 'Dry', items: [
        '2.5 cups (315 g) plain flour',
        '1 cup (200 g) caster sugar',
        '2.5 tsp baking powder',
        '3/4 tsp fine salt'
      ] },
      { group: 'Wet', items: [
        '2 large eggs',
        '1 cup (240 g) Greek yogurt',
        '1/2 cup (115 g) butter, melted',
        '1/4 cup (60 ml) milk',
        '2 tsp vanilla extract',
        'Zest of 1 lemon'
      ] },
      { group: 'Fruit and top', items: [
        '2 cups (300 g) blueberries, fresh or frozen',
        '1 tbsp flour, for tossing the berries',
        '3 tbsp demerara sugar'
      ] }
    ],
    instructions: [
      { title: 'Heat the oven high', text: 'Heat the oven to 220C / 425F and line a muffin tin. The initial blast of heat is what creates the dome, so do not start lower.' },
      { title: 'Combine the dry ingredients', text: 'Whisk the flour, sugar, baking powder and salt together thoroughly.' },
      { title: 'Mix the wet', text: 'In a second bowl whisk the eggs, yogurt, melted butter, milk, vanilla and lemon zest until smooth.' },
      { title: 'Toss the berries', text: 'Toss the blueberries with the tablespoon of flour, which stops them sinking to the bottom. If using frozen, keep them frozen until this moment or they bleed.' },
      { title: 'Fold, barely', text: 'Pour the wet into the dry and fold about twelve times, until just combined. The batter should be very thick and lumpy. Fold the berries through with two more strokes.' },
      { title: 'Fill high and drop the heat', text: 'Fill the cases right to the top, sprinkle with demerara, and bake at 220C for 5 minutes. Without opening the door, reduce to 190C / 375F and bake 16-18 minutes more, until a skewer comes out clean.' }
    ],
    tips: [
      'Fill the cases completely full. Two-thirds full gives flat muffins, however good the batter.',
      'The high-then-low oven trick is what produces bakery domes; a constant moderate heat never will.',
      'Toss berries in flour and keep frozen ones frozen, or you get grey batter and a soggy base.'
    ],
    variations: [
      'Swap blueberries for raspberries or chopped rhubarb with an extra tablespoon of sugar.',
      'Add a streusel top: rub 50 g butter into 75 g flour and 50 g brown sugar.',
      'Use orange zest and cranberries for a winter version.'
    ],
    storage: 'Best on the day, good for 3 days in an airtight tin with a sheet of kitchen paper underneath to absorb moisture. Freeze for 2 months and thaw at room temperature or warm 15 seconds in the microwave.',
    faqs: [
      { q: 'Why are my muffins flat?', a: 'Under-filled cases, an oven that was not hot enough at the start, or overmixed batter. All three are common and the first is the most frequent.' },
      { q: 'Can I use frozen blueberries?', a: 'Yes, and they often work better because they hold their shape. Do not thaw them, toss them in flour while frozen, and expect an extra 2-3 minutes of baking.' },
      { q: 'Why did my berries sink?', a: 'The batter was too thin, or the berries were not floured. A properly thick batter should hold a spoon upright for a moment.' }
    ],
    related: ['banana-bread', 'buttermilk-pancakes', 'berry-crumble']
  },
  {
    slug: 'spinach-feta-omelette',
    title: 'Spinach and Feta Omelette',
    description: 'A soft-set folded omelette with wilted spinach and salty feta, done in six minutes.',
    intro: 'A French-style omelette is the fastest good breakfast there is, and it turns entirely on heat control. Low and slow, constant movement for the first thirty seconds, then stillness. Nothing here needs skill so much as restraint.',
    category: 'breakfast',
    cuisine: 'French',
    course: 'Breakfast',
    method: 'Pan-Fried',
    diet: ['vegetarian', 'gluten-free', 'high-protein', 'low-carb'],
    keywords: ['spinach feta omelette', 'easy omelette', 'high protein breakfast', 'low carb breakfast'],
    image: 'https://images.unsplash.com/photo-1630684789447-2484443c6c1b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Folded omelettes filled with feta and fresh herbs on a dark plate',
    prepMinutes: 5,
    cookMinutes: 6,
    servings: 1,
    yieldText: '1 large omelette',
    difficulty: 'Medium',
    rating: 4.7,
    ratingCount: 134,
    datePublished: '2026-03-17',
    dateModified: '2026-08-04',
    nutrition: { calories: 386, protein: 26, carbs: 6, fat: 29, fiber: 2, sugar: 3, sodium: 780 },
    equipment: ['20 cm non-stick pan', 'Rubber spatula', 'Fork'],
    ingredients: [
      { group: 'Omelette', items: [
        '3 large eggs',
        '1 tbsp milk or water',
        '1/4 tsp fine salt',
        'Black pepper',
        '1 tbsp butter'
      ] },
      { group: 'Filling', items: [
        '2 cups (60 g) baby spinach',
        '1 small garlic clove, thinly sliced',
        '1.75 oz (50 g) feta, crumbled',
        '1 tbsp fresh dill or chives',
        'Squeeze of lemon'
      ] }
    ],
    instructions: [
      { title: 'Wilt the spinach first', text: 'Melt a little of the butter in the pan over medium, add the garlic for 20 seconds, then the spinach. Toss for about 60 seconds until just collapsed, then tip it into a sieve and press out the liquid.' },
      { title: 'Beat the eggs properly', text: 'Whisk the eggs with the milk, salt and pepper for a full 30 seconds, until completely uniform with no streaks of white. This is what gives an even, tender set.' },
      { title: 'Get the heat right', text: 'Wipe the pan, add the remaining butter over medium-low, and wait until it foams but does not colour. Browned butter means the pan is too hot for a soft omelette.' },
      { title: 'Stir, then stop', text: 'Pour in the eggs and stir continuously with a spatula for 20-30 seconds, dragging the set curds inward. Then stop and let it sit for 30-60 seconds until the top is just barely wet.' },
      { title: 'Fill and fold', text: 'Scatter the drained spinach, feta and herbs over one half. Slide the spatula under the other half and fold it over.' },
      { title: 'Slide out', text: 'Tilt the pan and slide the omelette onto a plate, seam-side down. Finish with lemon, extra herbs and black pepper.' }
    ],
    tips: [
      'Drain the spinach hard. Wet filling makes the omelette weep and tear when you fold it.',
      'Medium-low heat throughout. If the butter browns, the pan is too hot and the eggs will go rubbery and freckled.',
      'Take it off while the surface still looks slightly underdone; residual heat finishes it on the plate.'
    ],
    variations: [
      'Swap feta for gruyere, goat cheese or sharp cheddar.',
      'Add sauteed mushrooms or roasted red pepper alongside the spinach.',
      'Make it a frittata for four by using 8 eggs in an ovenproof pan and finishing under the grill.'
    ],
    storage: 'Omelettes do not keep and should be eaten immediately. The wilted spinach and garlic can be prepared 3 days ahead, which cuts the morning work to about four minutes.',
    faqs: [
      { q: 'Why is my omelette brown and rubbery?', a: 'The pan was too hot. A soft omelette wants medium-low the whole way through, and the butter should foam without ever changing colour.' },
      { q: 'Should I add milk to the eggs?', a: 'A tablespoon makes it slightly softer, but it is optional and some cooks argue it dilutes the flavour. Beating the eggs thoroughly matters far more than what you add to them.' },
      { q: 'What size pan should I use?', a: '20 cm for three eggs. Too large and the eggs spread thin and overcook; too small and it becomes too thick to fold neatly.' }
    ],
    related: ['shakshuka', 'avocado-toast', 'breakfast-hash']
  }
  ];

export default recipes;
