/**
 * Long-form cooking guides.
 * These exist to rank for informational queries and to give recipe pages
 * something authoritative to link into. Body content is an array of blocks so
 * the generator can emit real headings, lists and tables rather than one blob.
 */
import type { Guide } from '../types.js';

const guides: Guide[] = [
  {
    slug: 'how-to-meal-prep',
    title: 'How to Meal Prep Without Eating the Same Thing Every Day',
    description:
      'A component-based approach to meal prep: cook building blocks instead of finished meals, and assemble different dishes all week.',
    excerpt:
      'Most meal prep fails by Wednesday because you cooked five identical boxes on Sunday. Component prep fixes that in about the same amount of time.',
    image: 'assets/img/photos/guide-how-to-meal-prep.jpg',
    imageAlt: 'Meal prep containers filled with grains, vegetables and protein',
    readMinutes: 8,
    datePublished: '2025-09-02',
    dateModified: '2026-08-12',
    keywords: ['meal prep', 'meal prep for beginners', 'component meal prep', 'weekly food prep'],
    related: ['quinoa-bowl', 'taco-rice-bowls', 'chickpea-salad'],
    body: [
      { type: 'p', text: 'The standard advice is to cook five portions of one dish on Sunday and eat it until Friday. It works for roughly two days, at which point most people order takeaway and write off meal prep entirely. The problem is not willpower. It is that you cooked five identical meals.' },
      { type: 'p', text: 'Component prep solves this by changing what you cook. Instead of finished dishes, you prepare four or five building blocks that combine in different configurations. The Sunday workload is nearly identical; the Wednesday experience is completely different.' },
      { type: 'h2', text: 'The five components worth prepping' },
      { type: 'p', text: 'Almost every satisfying meal is the same shape: a base, a protein, something roasted, something raw and crunchy, and a sauce. Prep one of each and you have the raw material for a dozen meals.' },
      { type: 'ol', items: [
        'A grain or base. Cook a large batch of rice, quinoa, farro or couscous in stock rather than water. It keeps four days and reheats with a splash of liquid.',
        'A protein. Roast chicken thighs, bake a tray of spiced tofu, or simmer a pot of lentils. Season it moderately so it works in more than one direction.',
        'A roasted vegetable. Whatever is cheap that week, cut evenly, tossed in oil and salt and roasted hard at 220C until the edges char.',
        'Something raw. Shredded cabbage, quick pickled onions or a cucumber and herb mix. This is what stops day-four food tasting tired.',
        'A sauce. Lemon tahini, a mustard vinaigrette or a lime peanut sauce. This is the single highest-leverage item on the list.'
      ] },
      { type: 'h2', text: 'Why the sauce matters more than anything else' },
      { type: 'p', text: 'Identical components taste like completely different meals under different sauces. The same rice, chicken and roasted vegetables become a Mediterranean bowl under lemon tahini, a Southeast Asian bowl under lime peanut sauce, and a sharp European plate under mustard vinaigrette. Make two sauces, not one, and the variety problem largely disappears.' },
      { type: 'callout', title: 'The three-sauce rule', text: 'If you only change one thing about how you meal prep, make three small jars of sauce on Sunday instead of one big batch of dressing. Each keeps at least a week, and they are what turn stored components back into cooking.' },
      { type: 'h2', text: 'What to store separately, and what not to' },
      { type: 'p', text: 'Moisture is what ruins prepped food. Anything wet stored against anything crisp will destroy it within hours. A few rules cover almost every case:' },
      { type: 'ul', items: [
        'Dressings and sauces always travel in their own container, added at the moment of eating.',
        'Avocado, fresh herbs and anything fried are added fresh, never stored assembled.',
        'Cooked grains and roasted vegetables can share a container safely.',
        'Salted raw vegetables like cucumber and tomato should be drained before they go in.',
        'Leafy greens go at the top, never the bottom, so they are not compressed under weight.'
      ] },
      { type: 'h2', text: 'A realistic ninety-minute Sunday' },
      { type: 'p', text: 'Order matters more than speed. Start the oven and the grain first, because they run unattended, then use that time for everything else.' },
      { type: 'ol', items: [
        'Minutes 0-5: oven to 220C, grain on the hob in stock, both now cooking without you.',
        'Minutes 5-20: cut all the vegetables for roasting, spread across two trays, into the oven.',
        'Minutes 20-35: prepare the protein and get it cooking or into the oven alongside.',
        'Minutes 35-50: make two or three sauces while everything else cooks. Shake them in jars.',
        'Minutes 50-70: prepare the raw component and any quick pickles.',
        'Minutes 70-90: cool everything properly, then portion into containers. Do not seal warm food.'
      ] },
      { type: 'h2', text: 'Cooling is a food safety step, not a formality' },
      { type: 'p', text: 'Sealing warm food traps steam, which softens texture and creates the conditions bacteria prefer. Spread hot components on a tray to cool quickly, get them into the fridge within two hours of cooking, and only then put lids on. Food kept between 5C and 60C for long stretches is where problems begin.' },
      { type: 'h2', text: 'Where to start this week' },
      { type: 'p', text: 'Do not prep five components on the first attempt. Cook one grain and make one sauce, then build three different dinners on top of them with whatever else you buy fresh. Once that feels routine, add the roasted tray, then the protein. The habit is worth more than the completeness.' }
    ],
    faqs: [
      { q: 'How long does prepped food actually last?', a: 'Cooked grains, roasted vegetables and cooked legumes keep 4 days refrigerated. Cooked chicken and fish are safest within 3 days. Dressings and quick pickles last a week or more. Freeze anything you will not reach within that window.' },
      { q: 'Do I need special containers?', a: 'No, but glass containers with locking lids are worth the money. They do not stain, they go straight into the oven or microwave, and you can see what is inside, which matters more than it sounds.' },
      { q: 'Is meal prep actually cheaper?', a: 'Substantially, mostly because it eliminates mid-week takeaway and reduces waste. Buying whole vegetables and cooking dried legumes rather than tinned amplifies the effect further.' }
    ]
  },
  {
    slug: 'pantry-essentials',
    title: 'The 20 Pantry Staples That Make Weeknight Cooking Possible',
    description:
      'A working pantry list built around what actually gets used, so you can cook a real dinner without shopping first.',
    excerpt:
      'A good pantry is not a large one. Twenty items, chosen properly, mean you can make dinner on a night you had no plan.',
    image: 'assets/img/photos/guide-pantry-essentials.jpg',
    imageAlt: 'Pantry shelves stocked with jars, oils and dried goods',
    readMinutes: 7,
    datePublished: '2025-09-18',
    dateModified: '2026-07-29',
    keywords: ['pantry staples', 'pantry essentials list', 'stocking a kitchen', 'cupboard basics'],
    related: ['smoky-tomato-pasta', 'lentil-soup', 'miso-noodles'],
    body: [
      { type: 'p', text: 'The difference between cooking on a Tuesday and ordering on a Tuesday is usually not skill or time. It is whether the cupboard can carry a meal on its own. A pantry stocked with the right twenty things means fresh shopping becomes optional rather than mandatory.' },
      { type: 'h2', text: 'The foundation: fat, acid, salt' },
      { type: 'p', text: 'Nearly every flavour problem in home cooking traces back to one of these three being absent or of poor quality. Spend disproportionately here.' },
      { type: 'ul', items: [
        'Extra-virgin olive oil, for dressings and finishing. Buy a decent one and use it uncooked.',
        'A neutral high-heat oil such as rapeseed or sunflower, for searing and roasting.',
        'Flaky sea salt for finishing and fine sea salt for cooking. They are not interchangeable.',
        'Red wine vinegar and rice vinegar, which cover most European and Asian dressings between them.',
        'Lemons, which are technically fresh but should be treated as a permanent staple.'
      ] },
      { type: 'h2', text: 'Tinned and jarred goods that carry a meal' },
      { type: 'p', text: 'These are the items that turn into dinner without anything fresh at all.' },
      { type: 'ul', items: [
        'Whole plum tomatoes, which are better quality than pre-chopped and cost the same.',
        'Tomato paste, ideally in a tube so you can use a spoonful without opening a tin.',
        'Chickpeas and black beans, the fastest protein in the cupboard.',
        'Coconut milk, full fat, for curries and rice.',
        'Anchovies, which dissolve invisibly and make almost any savoury dish taste deeper.'
      ] },
      { type: 'h2', text: 'Dry goods' },
      { type: 'ul', items: [
        'Dried pasta in one long shape and one ridged tube shape.',
        'Rice, ideally both a long-grain jasmine or basmati and a short-grain for risotto and pudding.',
        'Brown or green lentils, which cook from dry in half an hour with no soaking.',
        'Rolled oats, for breakfast and for crumble toppings.',
        'Plain flour, which covers baking, thickening and dredging.'
      ] },
      { type: 'h2', text: 'The five spices worth having' },
      { type: 'p', text: 'A large spice rack is mostly decorative. These five appear across the widest range of cooking:' },
      { type: 'ol', items: [
        'Ground cumin, the backbone of Mexican, Middle Eastern and Indian cooking.',
        'Smoked paprika, which adds depth that tastes like it took hours.',
        'Dried oregano, the most useful dried herb by a distance.',
        'Chilli flakes, for heat you can control by the pinch.',
        'Whole black peppercorns and a grinder. Pre-ground pepper loses its aroma within weeks.'
      ] },
      { type: 'callout', title: 'Buy spices in small quantities', text: 'Ground spices lose most of their aroma within six months. A small jar you finish is worth more than a large one that sits open for two years. Write the date on the lid when you open it.' },
      { type: 'h2', text: 'The freezer counts as pantry' },
      { type: 'p', text: 'Frozen peas, frozen spinach, frozen berries and a bag of frozen prawns are all effectively shelf-stable and all turn into dinner faster than their fresh equivalents. Frozen vegetables are frozen within hours of harvest and are frequently higher in nutrients than fresh produce that has spent a week in transit.' },
      { type: 'h2', text: 'What three cupboard dinners look like' },
      { type: 'p', text: 'With the list above and nothing fresh beyond an onion and some garlic, you can make a smoky tomato pasta, a lentil soup, or coconut rice with chickpeas. None takes more than forty minutes, and none requires a shop.' }
    ],
    faqs: [
      { q: 'How much should I spend building this?', a: 'Assembled all at once it is a meaningful outlay, so build it across three or four normal shops instead. Add two or three items each time and the cost disappears into the weekly budget.' },
      { q: 'Do expensive olive oils matter?', a: 'For finishing and dressings, yes, noticeably. For cooking at high heat, no, because the delicate compounds you paid for are destroyed by the pan. Keep two oils for this reason.' },
      { q: 'How should I store dried goods?', a: 'Airtight containers away from light and heat. The cupboard above the hob is the worst place in most kitchens, and it is where most people keep their spices.' }
    ]
  },
  {
    slug: 'knife-skills-basics',
    title: 'Knife Skills: The Four Cuts That Cover Almost Everything',
    description:
      'Learn the grip, the claw and four fundamental cuts that make prep faster, safer and more consistent.',
    excerpt:
      'Most home cooks are slow at prep because of grip and board setup, not because of the knife. Both are fixable in an afternoon.',
    image: 'assets/img/photos/guide-knife-skills-basics.jpg',
    imageAlt: 'Hands dicing vegetables on a wooden cutting board',
    readMinutes: 9,
    datePublished: '2025-10-06',
    dateModified: '2026-08-06',
    keywords: ['knife skills', 'how to dice an onion', 'basic knife cuts', 'kitchen technique'],
    related: ['lentil-soup', 'stuffed-peppers', 'kale-salad'],
    body: [
      { type: 'p', text: 'Prep time is where most weeknight cooking goes wrong. A recipe that claims fifteen minutes takes forty because dicing an onion takes four minutes instead of forty seconds. The gap is almost never the knife itself.' },
      { type: 'h2', text: 'Hold the knife properly first' },
      { type: 'p', text: 'Most people grip the handle like a hammer. The control grip is different: pinch the blade itself between thumb and the side of your bent index finger, just forward of the handle, and wrap the remaining three fingers around the handle. It feels wrong for about ten minutes and then feels like the only sensible way to hold a knife.' },
      { type: 'p', text: 'This grip moves the pivot point forward, which gives you control over the tip and lets the knife rock rather than chop. Rocking is faster and quieter than lifting the blade clear of the board on every cut.' },
      { type: 'h2', text: 'The claw is a speed technique, not just a safety one' },
      { type: 'p', text: 'Curl the fingertips of your guiding hand under, so the knuckles face the blade and the fingertips are behind them. The flat of the knife rests against your knuckles and rides along them. Your knuckles now set the thickness of every slice, which is why the claw produces even cuts as a side effect of being safe.' },
      { type: 'callout', title: 'Stabilise the board', text: 'A board that slides is the single most common cause of kitchen cuts. Lay a damp cloth or paper towel underneath it. This takes five seconds and eliminates the problem entirely.' },
      { type: 'h2', text: 'Cut one: the dice' },
      { type: 'p', text: 'Demonstrated on an onion, because it is the cut you will make most often. Halve the onion through the root, peel, and lay it flat side down. Make horizontal cuts toward the root without cutting through it, then vertical cuts the same way. Now slice across and the dice falls apart on its own. The root holds everything together until the final moment, which is the entire trick.' },
      { type: 'h2', text: 'Cut two: the julienne' },
      { type: 'p', text: 'Thin matchsticks, used for carrots, peppers and anything going into a stir-fry or a pickle. Square off the vegetable into a rectangle first, discarding the rounded edges, then slice into thin planks, stack the planks, and slice again lengthways. Squaring off feels wasteful and is what makes the cut consistent.' },
      { type: 'h2', text: 'Cut three: the chiffonade' },
      { type: 'p', text: 'For leafy herbs and greens. Stack the leaves, roll them into a tight cigar, and slice across into thin ribbons. Use a sharp knife and a single decisive stroke; sawing bruises basil and turns the cut edges black within minutes.' },
      { type: 'h2', text: 'Cut four: the rough chop' },
      { type: 'p', text: 'Deliberately imprecise, for things going into a stock, a soup that will be blended, or a long braise. Knowing when precision does not matter is as useful as being able to produce it, and it saves several minutes on every pot of soup.' },
      { type: 'h2', text: 'A dull knife is the dangerous one' },
      { type: 'p', text: 'A sharp knife bites where you place it. A dull one slides off the skin of a tomato or an onion and into your hand, and requires more force, which means less control. Use a honing steel before each session to realign the edge, and have the knife properly sharpened two or three times a year.' },
      { type: 'h2', text: 'Practise on cheap vegetables' },
      { type: 'p', text: 'Buy a bag of onions and dice all of them in one sitting. Freeze what you do not need. Twenty minutes of deliberate repetition will do more for your cooking speed than any equipment purchase.' }
    ],
    faqs: [
      { q: 'What knife should I actually buy?', a: 'One 20 cm chef knife covers ninety per cent of kitchen tasks. Add a small paring knife and a serrated bread knife and you are finished. A large block of specialised knives is mostly unused.' },
      { q: 'How often should I sharpen?', a: 'Hone with a steel every time you cook, which realigns rather than removes metal. Properly sharpen two or three times a year for a home kitchen, either yourself with a whetstone or through a service.' },
      { q: 'Wooden or plastic boards?', a: 'Wood is kinder to the blade edge and is naturally antimicrobial. Plastic goes in the dishwasher and is easier to sanitise after raw meat. Most kitchens benefit from one of each, used for different jobs.' }
    ]
  },
  {
    slug: 'how-to-season-food',
    title: 'Why Your Cooking Tastes Flat (And the Four Fixes)',
    description:
      'Salt, acid, fat and heat are the four levers behind almost every flavour problem. Here is how to diagnose which one is missing.',
    excerpt:
      'When a dish tastes like it is missing something, it is almost always one of four things. Learning to identify which changes how you cook.',
    image: 'assets/img/photos/guide-how-to-season-food.jpg',
    imageAlt: 'Salt, lemon and olive oil arranged on a kitchen counter',
    readMinutes: 8,
    datePublished: '2025-10-22',
    dateModified: '2026-08-19',
    keywords: ['how to season food', 'why does my food taste bland', 'salt acid fat heat', 'seasoning technique'],
    related: ['lentil-soup', 'kale-salad', 'smoky-tomato-pasta'],
    body: [
      { type: 'p', text: 'You follow the recipe exactly and it comes out tasting like a rough draft of what it should be. This is the most common experience in home cooking, and it almost always resolves to one of four variables being wrong.' },
      { type: 'h2', text: 'Fix one: salt, and when you add it' },
      { type: 'p', text: 'Undersalting is the most frequent cause by a wide margin, and the timing matters as much as the quantity. Salt added early penetrates and seasons from within; salt added at the end sits on the surface and reads as sharp rather than integrated.' },
      { type: 'p', text: 'Salt in layers: a pinch when the onions go in, again when the liquid is added, and a final adjustment at the end. A soup salted only at the end will always taste less complete than one salted three times along the way, even at identical total quantities.' },
      { type: 'callout', title: 'Taste at every stage', text: 'The habit that separates confident cooks from anxious ones is tasting continuously rather than once at the end. By then your options are limited to correction; earlier, you are still steering.' },
      { type: 'h2', text: 'Fix two: acid' },
      { type: 'p', text: 'If a dish is adequately salted and still tastes heavy or dull, it needs acid. Lentils, beans, soups, stews, rich sauces and anything with a lot of fat all flatten without it. A squeeze of lemon or a splash of vinegar at the end lifts everything and, crucially, does not make the dish taste sour if the quantity is right.' },
      { type: 'p', text: 'This is the most under-used lever in home cooking. If you take one thing from this guide, finish your next pot of soup with lemon juice and taste before and after.' },
      { type: 'h2', text: 'Fix three: fat' },
      { type: 'p', text: 'Fat carries flavour compounds that water cannot, and it coats the tongue so taste lingers rather than vanishing. A dish that tastes thin and short often needs a knob of butter, a swirl of olive oil or a spoon of yogurt at the end.' },
      { type: 'p', text: 'This is why finishing pasta with butter and cheese off the heat transforms it, and why a drizzle of good olive oil over a finished soup is not decoration.' },
      { type: 'h2', text: 'Fix four: browning' },
      { type: 'p', text: 'The Maillard reaction produces hundreds of flavour compounds that simply do not exist in unbrowned food. If your stew tastes flat despite correct seasoning, the likely cause is that the meat was crowded and steamed rather than seared, or that the tomato paste was never caramelised.' },
      { type: 'ul', items: [
        'Dry the surface of anything you want to brown. Wet food steams.',
        'Do not crowd the pan; cook in batches even though it takes longer.',
        'Let food sit undisturbed. Browning requires sustained contact with hot metal.',
        'Cook tomato paste for two full minutes until it darkens before adding liquid.'
      ] },
      { type: 'h2', text: 'A diagnostic order' },
      { type: 'p', text: 'When something tastes wrong, run through them in sequence, tasting after each: add salt first, because it is most often the answer. Then acid. Then fat. If all three are correct and it still tastes flat, the problem happened earlier, at the browning stage, and cannot be fixed at the end.' },
      { type: 'h2', text: 'The one that cannot be corrected late' },
      { type: 'p', text: 'Salt, acid and fat can all be adjusted at the end of cooking. Browning cannot. This is why recipes insist on searing properly and on caramelising the paste, and why skipping those steps produces a dish that is impossible to rescue no matter how much you season it.' }
    ],
    faqs: [
      { q: 'What if I have oversalted?', a: 'Add bulk rather than water: more unsalted vegetables, grains, or a tin of tomatoes. Acid and a little sweetness also mask saltiness. The potato trick is largely a myth and absorbs very little.' },
      { q: 'Which salt should I cook with?', a: 'Fine sea salt or kosher salt for cooking, flaky salt for finishing. Table salt is much denser by volume, so a teaspoon of it is far saltier than a teaspoon of kosher salt. Measure by taste, not by spoon.' },
      { q: 'Does MSG count as a fix?', a: 'Yes, and it is a legitimate one. It supplies glutamate, the compound responsible for savoury depth, which is the same thing anchovies, parmesan, soy sauce and tomato paste contribute. Use it as you would salt.' }
    ]
  },
  {
    slug: 'reduce-food-waste',
    title: 'How to Cut Your Food Waste in Half Without Trying Very Hard',
    description:
      'Practical storage, planning and cooking habits that keep food out of the bin and money in your pocket.',
    excerpt:
      'The average household throws away roughly a third of what it buys. Most of that is preventable with four or five changes.',
    image: 'assets/img/photos/guide-reduce-food-waste.jpg',
    imageAlt: 'Fresh vegetables arranged on a kitchen counter',
    readMinutes: 7,
    datePublished: '2025-11-11',
    dateModified: '2026-07-18',
    keywords: ['reduce food waste', 'food storage tips', 'use up leftovers', 'sustainable cooking'],
    related: ['lentil-soup', 'roasted-wrap', 'farro-salad'],
    body: [
      { type: 'p', text: 'Food waste is mostly a storage and sequencing problem rather than a moral one. People do not intend to throw away half a bag of spinach; they simply put it somewhere it wilts in three days and then discover it on day six.' },
      { type: 'h2', text: 'Store herbs like flowers, not vegetables' },
      { type: 'p', text: 'Soft herbs such as parsley, coriander and mint last two or three weeks if you trim the stems and stand them in a glass of water in the fridge with a loose bag over the top. In their original plastic packet they last four days. This one change alone eliminates a recurring waste item in most kitchens.' },
      { type: 'h2', text: 'Learn which produce hates the fridge' },
      { type: 'ul', items: [
        'Tomatoes lose flavour and turn mealy below about 12C. Keep them on the counter.',
        'Potatoes, onions and garlic want a cool dark cupboard with airflow, not the fridge and not next to each other.',
        'Bananas release ethylene gas that ripens everything nearby, so keep them alone.',
        'Bread goes stale faster in the fridge than on the counter. Freeze it sliced instead.',
        'Basil blackens in the cold and should be treated like a cut flower on the counter.'
      ] },
      { type: 'h2', text: 'Shop for three days, not seven' },
      { type: 'p', text: 'The single largest driver of waste is buying a full week of fresh produce on one trip. Fresh vegetables bought on Saturday for a Thursday meal are already compromised. Two smaller shops, or one shop plus a top-up, wastes dramatically less and costs the same.' },
      { type: 'callout', title: 'Cook from the fridge first', text: 'Before planning a meal, look at what is already in the fridge and build around the item closest to turning. This inverts the usual order and is the highest-impact habit on this list.' },
      { type: 'h2', text: 'The three recipes that absorb anything' },
      { type: 'p', text: 'Keep these in your head as destinations for whatever is left:' },
      { type: 'ol', items: [
        'Soup. Almost any combination of vegetables, softened, simmered in stock and blended, works. Finish with lemon and olive oil.',
        'Frittata. Eggs bind any cooked vegetable, cheese end and stale herb into something you can eat cold the next day.',
        'Fried rice or grain bowls. Day-old grains plus whatever vegetables remain, hard-fried with soy, garlic and an egg.'
      ] },
      { type: 'h2', text: 'Use the freezer as a pause button' },
      { type: 'p', text: 'Most people treat the freezer as long-term storage. It is more useful as a way of stopping the clock on something you will not get to in time.' },
      { type: 'ul', items: [
        'Freeze herbs chopped into ice cube trays with olive oil.',
        'Freeze bread sliced, so you can toast from frozen without thawing.',
        'Freeze citrus zest before you juice the fruit; the zest is the part people waste.',
        'Keep a bag for vegetable trimmings and make stock when it is full.',
        'Freeze leftover wine and stock in cubes for deglazing pans.'
      ] },
      { type: 'h2', text: 'Understand the date labels' },
      { type: 'p', text: 'Best before is a quality indicator, not a safety one, and food is frequently fine well past it. Use by is a safety date and should be respected, particularly for meat, fish and dairy. Conflating the two causes an enormous amount of unnecessary waste.' }
    ],
    faqs: [
      { q: 'Are wilted vegetables still usable?', a: 'Usually yes. Limp carrots, celery and greens are dehydrated rather than spoiled, and often revive in ice water for thirty minutes. Failing that they are perfect for soup or stock. Discard anything slimy or mouldy.' },
      { q: 'How long does home-cooked food keep?', a: 'Three to four days refrigerated for most cooked dishes, cooled quickly and stored covered. Rice is the notable exception and should be cooled fast and eaten within a day, or frozen.' },
      { q: 'Is freezing bad for nutrients?', a: 'No. Freezing preserves most nutrients well, and frozen vegetables frozen at harvest often retain more than fresh produce that has spent a week in transit and storage.' }
    ]
  },
  {
    slug: 'cooking-for-beginners',
    title: 'Cooking for Beginners: The First Ten Recipes to Learn',
    description:
      'A structured path from never having cooked to being able to feed yourself well, ordered by what each recipe teaches.',
    excerpt:
      'Beginners are usually told to start with easy recipes. It is more useful to start with recipes that each teach one transferable technique.',
    image: 'assets/img/photos/guide-cooking-for-beginners.jpg',
    imageAlt: 'A beginner cook preparing vegetables in a home kitchen',
    readMinutes: 9,
    datePublished: '2025-12-03',
    dateModified: '2026-08-21',
    keywords: ['cooking for beginners', 'learn to cook', 'first recipes to learn', 'basic cooking skills'],
    related: ['smoky-tomato-pasta', 'garlic-butter-salmon', 'berry-crumble'],
    body: [
      { type: 'p', text: 'The usual advice for beginners is to start with easy recipes. That is reasonable but incomplete, because ten easy recipes can teach you nothing transferable. A better approach is to pick recipes where each one installs a technique you will use for the rest of your life.' },
      { type: 'h2', text: 'Stage one: heat control and seasoning' },
      { type: 'ol', items: [
        'Scrambled eggs. Teaches low heat, patience and the fact that residual heat keeps cooking food after the pan leaves the hob.',
        'A simple tomato pasta. Teaches building a sauce from aromatics, caramelising tomato paste, and finishing pasta in the sauce rather than the water.',
        'A green salad with a made-from-scratch vinaigrette. Teaches emulsification and the ratio of acid to oil that underpins every dressing.'
      ] },
      { type: 'p', text: 'These three cover more ground than they appear to. Once you understand that a vinaigrette is three parts oil to one part acid plus mustard to hold them together, you never need a dressing recipe again.' },
      { type: 'h2', text: 'Stage two: browning and roasting' },
      { type: 'ol', items: [
        'A tray of roasted vegetables. Teaches high heat, giving food room, and what caramelisation actually tastes like.',
        'Pan-seared chicken thighs or salmon. Teaches drying the surface, leaving protein undisturbed, and judging doneness.',
        'A pan sauce built in the same pan afterwards. Teaches deglazing and the fact that the stuck bits are the flavour.'
      ] },
      { type: 'callout', title: 'The two-minute rule', text: 'When you sear something, set a timer and do not touch it. The overwhelming instinct of new cooks is to move food around the pan, which is exactly what prevents browning.' },
      { type: 'h2', text: 'Stage three: building a pot' },
      { type: 'ol', items: [
        'A lentil or vegetable soup. Teaches soffritto, layering seasoning, and finishing with acid.',
        'A grain bowl with a sauce. Teaches component thinking and how a sauce carries a dish.',
        'A stir-fry. Teaches preparation before cooking, since there is no time to chop once the pan is hot.'
      ] },
      { type: 'h2', text: 'Stage four: one thing that is baked' },
      { type: 'p', text: 'Finish with a crumble. Baking is chemistry rather than improvisation, and a crumble is the gentlest introduction: it teaches rubbing cold butter into flour, why a thickener matters with fruit, and why resting before serving is part of the recipe. It is also very forgiving of imprecision, unlike most baking.' },
      { type: 'h2', text: 'What to buy before you start' },
      { type: 'p', text: 'Equipment anxiety stops more beginners than technique does. You need remarkably little:' },
      { type: 'ul', items: [
        'One 20 cm chef knife and a stable cutting board.',
        'One heavy skillet, ideally cast iron or stainless steel rather than a thin non-stick.',
        'One large pot for pasta and soup.',
        'One sheet pan for roasting.',
        'A set of measuring spoons and, ideally, a digital scale.'
      ] },
      { type: 'h2', text: 'Read the recipe twice before starting' },
      { type: 'p', text: 'Read it once for the shape of it and once for the sequence, then get everything out and prepped before the pan goes on. Almost every beginner disaster comes from discovering a step mid-cook that needed something prepared twenty minutes earlier.' },
      { type: 'h2', text: 'Repeat before you expand' },
      { type: 'p', text: 'Cook each of these four or five times rather than moving on immediately. Confidence comes from repetition, and the fourth attempt is where you stop reading the recipe and start noticing what the food is doing. That shift is the entire skill.' }
    ],
    faqs: [
      { q: 'How long until I can cook without recipes?', a: 'Cooking regularly, most people can improvise simple meals within two or three months. It arrives once you internalise a few ratios and can recognise doneness by sight and smell rather than by timer.' },
      { q: 'What is the most common beginner mistake?', a: 'Heat that is too low for browning and too high for gentle cooking, usually both in the same session. The second most common is not seasoning enough, and the third is moving food around the pan constantly.' },
      { q: 'Should I follow recipes exactly at first?', a: 'Yes, for the first few attempts at any recipe. Once you know what it is supposed to taste like, deviation becomes informed rather than random, and that is when cooking gets genuinely enjoyable.' }
    ]
  }
  ];

export default guides;
