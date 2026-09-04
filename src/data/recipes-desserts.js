/**
 * Desserts collection.
 * Consumed by src/data/recipes.js, which merges every collection into one array.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.KITCHENLO_DATA = root.KITCHENLO_DATA || {}).desserts = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  return [
    {
      slug: 'lava-mug-cake',
      title: 'Chocolate Lava Mug Cake',
      description: 'A single-serve chocolate cake with a molten centre, mixed and microwaved in under five minutes.',
      intro: 'The mug cake problem is texture: most come out rubbery and dry. The fix is a lower cook time than feels right, plus a square of chocolate pushed into the middle that melts into a genuine molten centre. Pull it while the top still looks slightly wet.',
      category: 'desserts',
      cuisine: 'American',
      course: 'Dessert',
      method: 'Microwave',
      diet: ['vegetarian'],
      keywords: ['mug cake', 'chocolate lava cake', 'microwave dessert', 'single serve dessert'],
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Chocolate lava mug cake with a molten centre spilling out',
      prepMinutes: 3,
      cookMinutes: 2,
      servings: 1,
      yieldText: '1 large mug cake',
      difficulty: 'Easy',
      rating: 4.7,
      ratingCount: 341,
      datePublished: '2025-01-07',
      dateModified: '2026-08-09',
      nutrition: { calories: 486, protein: 9, carbs: 62, fat: 23, fiber: 4, sugar: 38, sodium: 320 },
      equipment: ['Large microwave-safe mug (at least 350 ml)', 'Fork'],
      ingredients: [
        { group: 'Batter', items: [
          '4 tbsp plain flour',
          '3 tbsp caster sugar',
          '2 tbsp unsweetened cocoa powder',
          '1/4 tsp baking powder',
          'Pinch of salt',
          '3 tbsp milk',
          '2 tbsp neutral oil or melted butter',
          '1/2 tsp vanilla extract'
        ] },
        { group: 'Lava centre', items: [
          '1 square (about 15 g) dark chocolate, or 1 tbsp chocolate chips',
          '1 tsp chocolate spread, optional'
        ] },
        { group: 'To serve', items: [
          'Vanilla ice cream or cream',
          'Dusting of icing sugar'
        ] }
      ],
      instructions: [
        { title: 'Mix the dry ingredients', text: 'In a large mug, stir the flour, sugar, cocoa, baking powder and salt with a fork until evenly combined and no cocoa lumps remain.' },
        { title: 'Add the wet', text: 'Pour in the milk, oil and vanilla. Stir hard, scraping the bottom corners of the mug where dry flour always hides, until the batter is smooth.' },
        { title: 'Add the lava', text: 'Push the square of chocolate into the centre of the batter until it is just submerged. Do not stir it in.' },
        { title: 'Microwave short', text: 'Cook on full power for 60-75 seconds in an 800W microwave. Stop while the top still looks slightly wet and tacky in the middle.' },
        { title: 'Rest', text: 'Leave it for 60 seconds. The residual heat finishes the cake while the centre stays molten. This rest is part of the cooking.' },
        { title: 'Serve immediately', text: 'Dust with icing sugar and add ice cream. Eat straight from the mug while it is warm.' }
      ],
      tips: [
        'Undercook it. Every extra ten seconds moves this from molten to rubbery, and there is no way back.',
        'Use a mug at least twice the volume of the batter, or it will climb over the rim.',
        'Microwaves vary a lot. Test at 60 seconds the first time and note what works for yours.'
      ],
      variations: [
        'Push in a spoonful of peanut butter or salted caramel instead of the chocolate square.',
        'Add a tablespoon of espresso powder to the dry mix to deepen the chocolate flavour.',
        'Make it vegan with plant milk and oil; the recipe contains no eggs already.'
      ],
      storage: 'Made to be eaten immediately and does not keep. You can pre-mix the dry ingredients into jars for up to 3 months, then add the wet ingredients when you want one.',
      faqs: [
        { q: 'Why is my mug cake rubbery?', a: 'It cooked too long. Microwave cakes go from underdone to tough in about fifteen seconds, so pull it while the centre still looks underbaked and let it rest.' },
        { q: 'Can I bake it in the oven instead?', a: 'Yes, in an ovenproof ramekin at 190C / 375F for 12-14 minutes. The texture is more like a proper cake and the centre stays molten.' },
        { q: 'Can I double it?', a: 'Do not double it in one mug, as it cooks unevenly and overflows. Make two separate mugs and microwave them one at a time.' }
      ],
      related: ['banana-pops', 'rice-pudding', 'apple-crisp']
    },
    {
      slug: 'berry-tartlets',
      title: 'Lemon Berry Tartlets',
      description: 'Crisp pastry shells filled with lemon mascarpone cream and piled with fresh berries.',
      intro: 'These look like patisserie and take twenty minutes because the shells are shop-bought. The filling is mascarpone loosened with cream and sharpened hard with lemon, which keeps it from tasting like sweetened dairy. Assemble them late.',
      category: 'desserts',
      cuisine: 'French-inspired',
      course: 'Dessert',
      method: 'No-Bake',
      diet: ['vegetarian'],
      keywords: ['berry tartlets', 'lemon tart', 'mascarpone cream', 'easy elegant dessert'],
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Lemon berry tartlets topped with raspberries and blueberries',
      prepMinutes: 20,
      cookMinutes: 0,
      servings: 6,
      yieldText: '6 tartlets',
      difficulty: 'Easy',
      rating: 4.8,
      ratingCount: 174,
      datePublished: '2025-02-14',
      dateModified: '2026-06-25',
      nutrition: { calories: 392, protein: 6, carbs: 34, fat: 26, fiber: 3, sugar: 19, sodium: 180 },
      equipment: ['Electric whisk', 'Piping bag, optional', 'Fine grater'],
      ingredients: [
        { group: 'Shells', items: [
          '6 pre-baked sweet pastry tartlet shells (about 8 cm each)'
        ] },
        { group: 'Lemon mascarpone cream', items: [
          '250 g mascarpone, cold',
          '1/2 cup (120 ml) double cream, cold',
          '1/3 cup (40 g) icing sugar',
          'Zest of 2 lemons',
          '2 tbsp lemon juice',
          '1 tsp vanilla extract'
        ] },
        { group: 'Topping', items: [
          '2 cups mixed berries (raspberries, blueberries, halved strawberries)',
          '2 tbsp apricot jam, warmed and sieved',
          'Fresh mint leaves',
          'Extra lemon zest'
        ] }
      ],
      instructions: [
        { title: 'Chill everything', text: 'Make sure the mascarpone and cream are properly cold, straight from the fridge. Warm mascarpone splits when whipped.' },
        { title: 'Whip the base', text: 'Beat the mascarpone with the icing sugar, lemon zest and vanilla on medium for 30 seconds, just until smooth. Do not overwork it.' },
        { title: 'Add the cream', text: 'Pour in the cold double cream and whip on medium until it holds firm peaks, about 60-90 seconds. Stop the moment it thickens; a few seconds more and it turns grainy.' },
        { title: 'Sharpen with lemon', text: 'Fold in the lemon juice by hand with a spatula. Adding it during whipping can cause the mixture to seize.' },
        { title: 'Fill the shells', text: 'Pipe or spoon the cream into the tartlet shells, mounding it slightly in the centre so the berries sit up.' },
        { title: 'Top and glaze', text: 'Arrange the berries on top, brush lightly with the warmed apricot jam for shine, and finish with mint and extra lemon zest.' }
      ],
      tips: [
        'Everything cold, and stop whipping early. Overwhipped mascarpone goes from silky to curdled in seconds and cannot be rescued.',
        'Fold the lemon juice in at the end by hand, never during the whipping.',
        'The apricot glaze is what makes them look professional and stops the berries drying out.'
      ],
      variations: [
        'Use a passionfruit or lime curd swirled through the cream for a sharper filling.',
        'Make one large 23 cm tart instead of six small ones; the filling quantity is the same.',
        'Swap mascarpone for thick Greek yogurt for a lighter, tangier version.'
      ],
      storage: 'Best assembled within 2 hours of serving. The cream keeps 2 days covered in the fridge, and unfilled shells keep a week in an airtight tin.',
      faqs: [
        { q: 'Can I make my own pastry shells?', a: 'Yes, a sweet shortcrust blind-baked at 180C / 350F for 15 minutes works beautifully. Shop-bought is what makes this a twenty-minute dessert though.' },
        { q: 'How far ahead can I assemble them?', a: 'Two hours at most in the fridge. Beyond that the pastry starts absorbing moisture from the cream and loses its snap.' },
        { q: 'My cream went grainy, can I fix it?', a: 'Not once it has split. Prevention is the only fix: cold ingredients, medium speed, and stopping as soon as firm peaks form.' }
      ],
      related: ['almond-tart', 'panna-cotta', 'lemon-bars']
    },
    {
      slug: 'rice-pudding',
      title: 'Vanilla Rice Pudding',
      description: 'Slow-simmered creamy rice pudding scented with vanilla and cinnamon, comforting and barely sweet.',
      intro: 'Rice pudding rewards patience and nothing else. Low heat, frequent stirring, and pulling it off the stove while it still looks a little loose, because it thickens dramatically as it cools. Real vanilla makes the difference between nursery food and something you would serve to guests.',
      category: 'desserts',
      cuisine: 'European',
      course: 'Dessert',
      method: 'Stovetop',
      diet: ['vegetarian', 'gluten-free'],
      keywords: ['rice pudding', 'creamy rice pudding', 'vanilla rice pudding', 'comfort dessert'],
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'A bowl of creamy vanilla rice pudding dusted with cinnamon',
      prepMinutes: 5,
      cookMinutes: 40,
      servings: 6,
      yieldText: '6 small bowls',
      difficulty: 'Easy',
      rating: 4.6,
      ratingCount: 152,
      datePublished: '2025-03-06',
      dateModified: '2026-07-08',
      nutrition: { calories: 312, protein: 8, carbs: 46, fat: 10, fiber: 1, sugar: 24, sodium: 130 },
      equipment: ['Heavy-based saucepan', 'Wooden spoon'],
      ingredients: [
        { group: 'Pudding', items: [
          '3/4 cup (150 g) short-grain pudding rice or arborio',
          '4 cups (960 ml) whole milk',
          '1 cup (240 ml) single cream',
          '1/3 cup (70 g) caster sugar',
          '1 vanilla pod, split, or 2 tsp vanilla bean paste',
          '1 cinnamon stick',
          'Pinch of salt',
          'Strip of lemon peel, optional'
        ] },
        { group: 'To serve', items: [
          'Ground cinnamon',
          'Berry compote or stewed fruit',
          'Toasted flaked almonds'
        ] }
      ],
      instructions: [
        { title: 'Warm the dairy', text: 'Put the milk, cream, sugar, split vanilla pod, cinnamon stick, salt and lemon peel in a heavy saucepan and heat gently until steaming but not boiling.' },
        { title: 'Add the rice', text: 'Stir in the rice and bring to the barest simmer, with just a few bubbles breaking the surface. High heat will scorch the bottom and split the milk.' },
        { title: 'Simmer and stir', text: 'Cook uncovered for 35-40 minutes, stirring every 3-4 minutes and scraping the base of the pan each time so nothing catches.' },
        { title: 'Judge the texture', text: 'It is ready when the rice is completely tender and the mixture coats a spoon but still moves loosely. It will thicken by half again as it cools.' },
        { title: 'Remove the aromatics', text: 'Fish out the cinnamon stick, lemon peel and vanilla pod, scraping the seeds from the pod back into the pudding.' },
        { title: 'Serve', text: 'Serve warm with cinnamon and compote, or press cling film onto the surface and chill for a thick, cold version.' }
      ],
      tips: [
        'Pull it off the heat looking too loose. Rice pudding sets firm as it cools, and a perfectly thick pan becomes stodgy in a bowl.',
        'Use short-grain rice. Long-grain never releases enough starch and stays separate rather than creamy.',
        'A heavy pan is worth it. Thin pans create hot spots and burnt milk on the base.'
      ],
      variations: [
        'Make it with coconut milk and top with mango for a tropical version.',
        'Stir in a spoonful of dulce de leche or a handful of raisins soaked in rum.',
        'Bake it instead at 150C / 300F for 2 hours for a skin on top and a softer set.'
      ],
      storage: 'Keeps 4 days refrigerated. It stiffens considerably when cold, so beat in a splash of warm milk to loosen it back to the right texture.',
      faqs: [
        { q: 'Why did mine catch on the bottom?', a: 'Heat too high or not enough stirring. Keep it at the gentlest simmer and scrape the base of the pan every few minutes, not just the surface.' },
        { q: 'Can I use skimmed milk?', a: 'You can, but the result is noticeably thin. Whole milk plus a little cream is what gives rice pudding its body.' },
        { q: 'Warm or cold?', a: 'Both are traditional. Warm is comforting and looser; chilled is thicker and firmer, and better under a sharp fruit compote.' }
      ],
      related: ['apple-crisp', 'panna-cotta', 'yogurt-parfait']
    },
    {
      slug: 'berry-crumble',
      title: 'Berry Oat Crumble',
      description: 'Jammy mixed berries under a thick, buttery oat topping that bakes into proper crunchy clusters.',
      intro: 'Two things make a crumble good: fruit that has been thickened so it is jammy rather than watery, and a topping with enough butter to form clusters instead of sand. Rubbed cold butter and a spell in the freezer before baking take care of the second.',
      category: 'desserts',
      cuisine: 'British',
      course: 'Dessert',
      method: 'Baked',
      diet: ['vegetarian'],
      keywords: ['berry crumble', 'oat crumble topping', 'fruit crumble', 'easy baked dessert'],
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Berry oat crumble bubbling in a baking dish',
      prepMinutes: 15,
      cookMinutes: 45,
      servings: 8,
      yieldText: 'One 23 x 23 cm dish',
      difficulty: 'Easy',
      rating: 4.9,
      ratingCount: 287,
      datePublished: '2025-04-11',
      dateModified: '2026-08-16',
      nutrition: { calories: 386, protein: 5, carbs: 56, fat: 17, fiber: 6, sugar: 32, sodium: 140 },
      equipment: ['23 cm baking dish', 'Large mixing bowl', 'Baking sheet'],
      ingredients: [
        { group: 'Fruit', items: [
          '6 cups mixed berries, fresh or frozen',
          '1/3 cup (70 g) caster sugar',
          '3 tbsp cornflour',
          'Juice and zest of 1 lemon',
          '1 tsp vanilla extract',
          'Pinch of salt'
        ] },
        { group: 'Oat crumble topping', items: [
          '1 cup (90 g) rolled oats',
          '3/4 cup (95 g) plain flour',
          '2/3 cup (135 g) light brown sugar',
          '1/2 tsp ground cinnamon',
          '1/2 tsp salt',
          '150 g cold unsalted butter, cubed',
          '1/3 cup chopped pecans or almonds, optional'
        ] }
      ],
      instructions: [
        { title: 'Heat the oven', text: 'Heat the oven to 190C / 375F and set a baking sheet on the shelf below to catch any bubbling-over.' },
        { title: 'Thicken the fruit', text: 'Toss the berries with the sugar, cornflour, lemon juice and zest, vanilla and salt until no dry cornflour remains. Tip into the baking dish and level it.' },
        { title: 'Mix the dry topping', text: 'Combine the oats, flour, brown sugar, cinnamon and salt in a large bowl.' },
        { title: 'Rub in the butter', text: 'Add the cold cubed butter and rub it through with your fingertips until you have a mix of coarse crumbs and clumps the size of hazelnuts. The big clumps become the crunchy clusters, so do not overwork it into sand.' },
        { title: 'Chill, then top', text: 'Freeze the topping for 10 minutes, then scatter it over the fruit in an even, thick layer without pressing it down. Add the nuts if using.' },
        { title: 'Bake until bubbling', text: 'Bake 40-45 minutes, until the topping is deep golden and the fruit is bubbling thickly at the edges. Rest 20 minutes before serving so the juices set.' }
      ],
      tips: [
        'Cold butter and a stint in the freezer are what create clusters. Warm butter melts on contact and gives you a flat, sandy crust.',
        'Cornflour is not optional with berries; without it you get fruit soup under a soggy top.',
        'Let it rest twenty minutes. Straight from the oven the fruit runs everywhere.'
      ],
      variations: [
        'Use apples and blackberries in autumn, or peaches and raspberries in summer.',
        'Add a handful of desiccated coconut or swap half the oats for crushed digestive biscuits.',
        'Make it vegan with a firm plant butter rubbed in exactly the same way.'
      ],
      storage: 'Keeps 3 days covered at room temperature or 5 days refrigerated. Re-crisp in a 180C / 350F oven for 12 minutes; the microwave makes the topping soft.',
      faqs: [
        { q: 'Can I use frozen berries?', a: 'Yes, and there is no need to thaw them. Add an extra tablespoon of cornflour and about 8 minutes to the bake time.' },
        { q: 'Why is my topping sandy instead of clumpy?', a: 'The butter was too warm or was rubbed in too thoroughly. Stop while you can still see pea and hazelnut sized lumps of butter-coated flour.' },
        { q: 'Can I assemble it ahead?', a: 'Yes. Keep the fruit in the dish and the topping in the freezer separately for up to a month, then scatter and bake from frozen, adding 10 minutes.' }
      ],
      related: ['apple-crisp', 'almond-tart', 'rice-pudding']
    },
    {
      slug: 'panna-cotta',
      title: 'Panna Cotta Cups',
      description: 'Silky vanilla cream set with just enough gelatine to wobble, served with a sharp berry syrup.',
      intro: 'Panna cotta lives or dies on the gelatine ratio. Too much and it is rubbery, too little and it never sets. This ratio gives a set that barely holds, so the spoon goes through with no resistance and it melts on the tongue.',
      category: 'desserts',
      cuisine: 'Italian',
      course: 'Dessert',
      method: 'Chilled',
      diet: ['vegetarian', 'gluten-free'],
      keywords: ['panna cotta', 'vanilla panna cotta', 'make ahead dessert', 'italian dessert'],
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Panna cotta cups topped with berry syrup',
      prepMinutes: 20,
      cookMinutes: 8,
      servings: 6,
      yieldText: '6 individual cups',
      difficulty: 'Medium',
      rating: 4.8,
      ratingCount: 165,
      datePublished: '2025-05-02',
      dateModified: '2026-07-30',
      nutrition: { calories: 368, protein: 5, carbs: 28, fat: 27, fiber: 1, sugar: 26, sodium: 60 },
      equipment: ['Saucepan', 'Fine sieve', '6 ramekins or glasses'],
      ingredients: [
        { group: 'Panna cotta', items: [
          '2.5 cups (600 ml) double cream',
          '1 cup (240 ml) whole milk',
          '1/2 cup (100 g) caster sugar',
          '1 vanilla pod, split and scraped, or 2 tsp vanilla bean paste',
          '3 sheets (about 6 g) leaf gelatine, or 2 tsp powdered gelatine',
          'Pinch of salt'
        ] },
        { group: 'Berry syrup', items: [
          '2 cups mixed berries',
          '1/4 cup (50 g) caster sugar',
          '1 tbsp lemon juice',
          '1 tbsp water'
        ] }
      ],
      instructions: [
        { title: 'Bloom the gelatine', text: 'Soak the leaf gelatine in cold water for 5 minutes until floppy, then squeeze out the excess. For powdered gelatine, sprinkle it over 3 tbsp cold water and leave 5 minutes until spongy.' },
        { title: 'Infuse the cream', text: 'Warm the cream, milk, sugar, vanilla and salt in a saucepan over medium-low, stirring until the sugar dissolves. Bring it to steaming, never to a boil.' },
        { title: 'Dissolve the gelatine', text: 'Take the pan off the heat, add the bloomed gelatine and whisk for 30 seconds until fully dissolved. Rub a little between your fingers to check for grains.' },
        { title: 'Strain and pour', text: 'Pass the mixture through a fine sieve into a jug, which catches the vanilla pod and any undissolved gelatine, then pour into six cups.' },
        { title: 'Chill properly', text: 'Cover and refrigerate at least 4 hours, ideally overnight. Rushing this gives you a soft centre.' },
        { title: 'Make the syrup', text: 'Simmer the berries, sugar, lemon juice and water for 5-6 minutes until the fruit collapses and the syrup coats a spoon. Cool completely, then spoon over each set panna cotta.' }
      ],
      tips: [
        'Never boil the cream after the gelatine goes in. Boiling weakens gelatine and the panna cotta will not set.',
        'Strain the mixture. It takes ten seconds and guarantees a flawless texture.',
        'If unmoulding onto plates, use 4 gelatine sheets instead of 3 so it holds its shape.'
      ],
      variations: [
        'Infuse the cream with coffee beans, earl grey, cardamom or a strip of orange peel.',
        'Make it dairy-free with full-fat coconut milk and agar agar, following the agar package ratio.',
        'Layer with lemon curd or a thin chocolate ganache poured over the set cream.'
      ],
      storage: 'Keeps 4 days covered in the fridge and is designed to be made ahead. Do not freeze it; gelatine sets weep badly on thawing.',
      faqs: [
        { q: 'Why did my panna cotta not set?', a: 'Either the mixture was boiled after the gelatine was added, or the gelatine did not fully dissolve. Whisk it into hot but not boiling liquid and always strain.' },
        { q: 'Can I use agar agar instead?', a: 'Yes, for a vegetarian version, but agar must be boiled for 2 minutes to activate and gives a firmer, less wobbly set. Follow the ratio on your package.' },
        { q: 'How do I unmould it cleanly?', a: 'Dip the ramekin in hot water for 5 seconds, run a thin knife around the edge, then invert onto a plate. Use the higher gelatine quantity if you plan to do this.' }
      ],
      related: ['berry-tartlets', 'rice-pudding', 'lemon-bars']
    },
    {
      slug: 'lemon-bars',
      title: 'Mini Lemon Bars',
      description: 'A buttery shortbread base under a sharp, glossy lemon curd filling that sets to a clean slice.',
      intro: 'The classic failure with lemon bars is a layer of pale foam on top and a soggy base underneath. Both are solved by pouring warm filling onto a hot crust and skimming the bubbles off before it goes in the oven.',
      category: 'desserts',
      cuisine: 'American',
      course: 'Dessert',
      method: 'Baked',
      diet: ['vegetarian'],
      keywords: ['lemon bars', 'lemon squares', 'shortbread base', 'citrus dessert'],
      image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mini lemon bars dusted with icing sugar on a cooling rack',
      prepMinutes: 20,
      cookMinutes: 45,
      servings: 16,
      yieldText: '16 small bars',
      difficulty: 'Medium',
      rating: 4.8,
      ratingCount: 208,
      datePublished: '2025-06-10',
      dateModified: '2026-08-04',
      nutrition: { calories: 232, protein: 3, carbs: 30, fat: 11, fiber: 0, sugar: 21, sodium: 90 },
      equipment: ['20 x 20 cm tin', 'Baking parchment', 'Fine sieve'],
      ingredients: [
        { group: 'Shortbread base', items: [
          '1.5 cups (190 g) plain flour',
          '1/2 cup (60 g) icing sugar',
          '1/4 tsp salt',
          '170 g cold unsalted butter, cubed'
        ] },
        { group: 'Lemon filling', items: [
          '4 large eggs',
          '1.5 cups (300 g) caster sugar',
          '1/4 cup (32 g) plain flour',
          'Zest of 3 lemons',
          '2/3 cup (160 ml) fresh lemon juice (about 4 lemons)',
          'Pinch of salt'
        ] },
        { group: 'To finish', items: [
          'Icing sugar, for dusting'
        ] }
      ],
      instructions: [
        { title: 'Line the tin', text: 'Heat the oven to 175C / 350F. Line a 20 cm square tin with parchment, leaving an overhang on two sides to lift the slab out later.' },
        { title: 'Make the base', text: 'Pulse or rub the flour, icing sugar, salt and cold butter until it looks like damp sand and holds together when squeezed. Press firmly and evenly into the tin.' },
        { title: 'Blind bake', text: 'Bake the base for 20-22 minutes until pale gold at the edges. Leave the oven on and keep the crust hot.' },
        { title: 'Mix the filling', text: 'While it bakes, whisk the eggs and sugar, then whisk in the flour, lemon zest, juice and salt until completely smooth. Whisk gently to avoid beating in air.' },
        { title: 'Skim and pour', text: 'Skim any foam off the surface with a spoon, then pour the filling directly onto the hot crust. Hot crust plus warm filling is what seals the two layers together.' },
        { title: 'Bake and chill', text: 'Bake 22-25 minutes until the centre is just set with a faint wobble. Cool completely at room temperature, then chill 2 hours before lifting out, dusting with icing sugar and cutting.' }
      ],
      tips: [
        'Pour the filling onto a hot base. Cold crust plus filling is the main cause of a soggy bottom layer.',
        'Skim the foam. It bakes into an unattractive pale crust on top of an otherwise glossy surface.',
        'Chill fully before cutting, and wipe the knife between slices for clean edges.'
      ],
      variations: [
        'Use half lime or a mix of lemon and passionfruit for the filling.',
        'Add 2 tbsp of finely chopped rosemary or lavender to the shortbread.',
        'Swap a third of the plain flour in the base for ground almonds for a richer crust.'
      ],
      storage: 'Keeps 4 days refrigerated in an airtight container, and the flavour sharpens overnight. Freeze uncut for 2 months; dust with icing sugar only after thawing.',
      faqs: [
        { q: 'Can I use bottled lemon juice?', a: 'It works but tastes noticeably duller and slightly metallic. Fresh juice and, more importantly, fresh zest are what make these bars taste bright.' },
        { q: 'Why is my filling runny?', a: 'It was underbaked or cut before chilling. The centre should barely wobble when you take it out, and it needs a full two hours in the fridge to set.' },
        { q: 'How do I get clean slices?', a: 'Chill thoroughly, lift the whole slab out by the parchment, and cut with a long sharp knife wiped clean between every cut.' }
      ],
      related: ['berry-tartlets', 'almond-tart', 'panna-cotta']
    },
    {
      slug: 'yogurt-parfait',
      title: 'Honey Yogurt Parfait',
      description: 'Layers of thick honeyed yogurt, macerated fruit and crunchy granola, assembled in five minutes.',
      intro: 'A parfait is only as good as its contrast, which means the granola has to stay crunchy and the fruit has to be juicy. Macerating the berries with a little sugar and lemon creates a syrup that runs down between the layers.',
      category: 'desserts',
      cuisine: 'International',
      course: 'Dessert',
      method: 'No-Cook',
      diet: ['vegetarian', 'high-protein'],
      keywords: ['yogurt parfait', 'honey yogurt', 'healthy dessert', 'granola parfait'],
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Honey yogurt parfait layered with berries and granola in a glass',
      prepMinutes: 10,
      cookMinutes: 0,
      servings: 4,
      yieldText: '4 glasses',
      difficulty: 'Easy',
      rating: 4.5,
      ratingCount: 121,
      datePublished: '2025-06-24',
      dateModified: '2026-06-05',
      nutrition: { calories: 328, protein: 18, carbs: 42, fat: 11, fiber: 4, sugar: 30, sodium: 110 },
      equipment: ['4 tall glasses', 'Small bowl'],
      ingredients: [
        { group: 'Honeyed yogurt', items: [
          '3 cups (750 g) thick Greek yogurt',
          '3 tbsp honey',
          '1 tsp vanilla extract',
          'Zest of 1 lemon'
        ] },
        { group: 'Macerated fruit', items: [
          '3 cups mixed berries and chopped stone fruit',
          '2 tbsp caster sugar',
          '1 tbsp lemon juice'
        ] },
        { group: 'Layers', items: [
          '1.5 cups granola',
          '2 tbsp toasted flaked almonds',
          'Extra honey, for drizzling',
          'Fresh mint'
        ] }
      ],
      instructions: [
        { title: 'Macerate the fruit', text: 'Toss the fruit with the sugar and lemon juice and leave for 10 minutes. It will release a light syrup, which is the point.' },
        { title: 'Sweeten the yogurt', text: 'Stir the yogurt with the honey, vanilla and lemon zest until smooth and glossy.' },
        { title: 'First layer', text: 'Spoon a layer of yogurt into the base of each glass, then add granola. Yogurt first protects the glass bottom from going soggy.' },
        { title: 'Add fruit', text: 'Spoon over some macerated fruit with a little of its syrup, letting it run down the sides of the glass.' },
        { title: 'Repeat', text: 'Repeat the layers once more, finishing with yogurt so the top layer is clean and pale.' },
        { title: 'Top and serve', text: 'Crown with the remaining fruit, a scatter of granola and almonds, a drizzle of honey and a mint leaf. Serve within fifteen minutes.' }
      ],
      tips: [
        'Assemble within fifteen minutes of serving. Granola sitting in yogurt turns soft very quickly.',
        'Keep the last granola for the top so there is always something crunchy in the first spoonful.',
        'Use thick strained yogurt; runny yogurt will not hold distinct layers.'
      ],
      variations: [
        'Layer with lemon curd or a spoon of berry compote for a richer dessert.',
        'Use coconut yogurt and maple syrup for a vegan version.',
        'Add crushed amaretti biscuits instead of granola for something closer to a trifle.'
      ],
      storage: 'Meant to be assembled fresh. The honeyed yogurt keeps 4 days and the macerated fruit 2 days, both stored separately.',
      faqs: [
        { q: 'Can I make these the night before?', a: 'You can prepare both components ahead, but layer them in the morning. Overnight assembly gives you soft granola and weeping fruit.' },
        { q: 'Is this a dessert or a breakfast?', a: 'Both, honestly. Cut the honey to one tablespoon and it becomes a high-protein breakfast at the same 18 g of protein per glass.' },
        { q: 'What granola works best?', a: 'A clustery, low-sugar granola with nuts holds its crunch longest. Very fine or sugary granolas dissolve into the yogurt fastest.' }
      ],
      related: ['smoothie-bowl', 'herbed-yogurt-bowl', 'banana-pops']
    },
    {
      slug: 'banana-pops',
      title: 'Chocolate Banana Pops',
      description: 'Frozen banana halves dipped in dark chocolate and rolled in nuts, sprinkles or coconut.',
      intro: 'Three ingredients and a freezer. The trick is freezing the bananas solid before dipping, so the warm chocolate sets into a hard shell on contact rather than sliding off. Add a spoon of coconut oil to the chocolate and it snaps when you bite it.',
      category: 'desserts',
      cuisine: 'American',
      course: 'Dessert',
      method: 'Frozen',
      diet: ['vegetarian', 'gluten-free', 'dairy-free'],
      keywords: ['chocolate banana pops', 'frozen banana', 'easy kids dessert', 'healthy chocolate snack'],
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Chocolate covered banana pops with nuts and sprinkles on a tray',
      prepMinutes: 15,
      cookMinutes: 0,
      servings: 8,
      yieldText: '8 pops',
      difficulty: 'Easy',
      rating: 4.7,
      ratingCount: 194,
      datePublished: '2025-07-01',
      dateModified: '2026-06-15',
      nutrition: { calories: 198, protein: 3, carbs: 26, fat: 10, fiber: 3, sugar: 17, sodium: 15 },
      equipment: ['Baking tray', 'Baking parchment', '8 wooden sticks', 'Heatproof bowl'],
      ingredients: [
        { group: 'Pops', items: [
          '4 ripe but firm bananas, halved crossways',
          '8 wooden lolly sticks',
          '200 g dark chocolate (70 per cent), chopped',
          '1 tbsp coconut oil'
        ] },
        { group: 'Coatings', items: [
          '1/3 cup chopped roasted peanuts or pistachios',
          '1/4 cup desiccated coconut',
          '2 tbsp sprinkles',
          'Flaky sea salt'
        ] }
      ],
      instructions: [
        { title: 'Skewer and freeze', text: 'Peel the bananas, halve them crossways and push a stick into the cut end of each. Lay on a parchment-lined tray and freeze at least 2 hours, until rock solid.' },
        { title: 'Prepare the coatings', text: 'Put each coating in its own shallow bowl and line a second tray with parchment. Once dipping starts there is no time to prepare anything.' },
        { title: 'Melt the chocolate', text: 'Melt the chocolate with the coconut oil in short 20-second bursts in the microwave, stirring between each, or over a pan of barely simmering water. Let it cool for 2 minutes.' },
        { title: 'Dip fast', text: 'Working with one frozen banana at a time, dip and turn to coat, letting the excess drip off. The chocolate will begin setting within seconds against the frozen fruit.' },
        { title: 'Coat immediately', text: 'Roll or sprinkle the coating on straight away, before the shell hardens, then set on the lined tray.' },
        { title: 'Firm up', text: 'Return to the freezer for 15 minutes to set completely. Serve straight from frozen, or let them soften for 3 minutes for a softer bite.' }
      ],
      tips: [
        'Freeze the bananas solid first. Room-temperature bananas make the chocolate slide off and go grey.',
        'The coconut oil is what makes the shell snap; without it the chocolate coating is dull and soft.',
        'Take one banana out of the freezer at a time. Chocolate sets on contact, so you have only a few seconds to add toppings.'
      ],
      variations: [
        'Use white or milk chocolate, or drizzle a second colour over the set shell.',
        'Swap banana for frozen strawberries or grapes threaded onto skewers.',
        'Spread peanut butter along the banana before freezing for a hidden layer.'
      ],
      storage: 'Keeps 1 month in the freezer. Once fully set, wrap each pop individually or layer between parchment in an airtight box so they do not stick together.',
      faqs: [
        { q: 'Why did my chocolate seize?', a: 'Water got into it, usually steam from a double boiler or a wet bowl. Everything must be bone dry, and melt in short bursts rather than continuous heat.' },
        { q: 'What bananas should I use?', a: 'Ripe enough to be sweet but still firm. Overripe bananas go mushy in the freezer and fall off the stick during dipping.' },
        { q: 'Can I make them dairy free?', a: 'They already are if you use dark chocolate; just check the label, as some dark chocolate contains milk solids.' }
      ],
      related: ['lava-mug-cake', 'yogurt-parfait', 'apple-crisp']
    },
    {
      slug: 'apple-crisp',
      title: 'Cinnamon Apple Crisp',
      description: 'Tender spiced apples under a thick oat and brown sugar crisp topping, best served warm with ice cream.',
      intro: 'Use two kinds of apple: one that holds its shape and one that breaks down into sauce. That contrast is what separates a good crisp from a dish of uniformly soft fruit. The topping goes on cold and thick, and bakes into something you can hear.',
      category: 'desserts',
      cuisine: 'American',
      course: 'Dessert',
      method: 'Baked',
      diet: ['vegetarian'],
      keywords: ['apple crisp', 'cinnamon apple crumble', 'autumn dessert', 'oat topping'],
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Warm cinnamon apple crisp served in a dish with ice cream',
      prepMinutes: 20,
      cookMinutes: 50,
      servings: 8,
      yieldText: 'One 23 x 33 cm dish',
      difficulty: 'Easy',
      rating: 4.9,
      ratingCount: 312,
      datePublished: '2025-07-15',
      dateModified: '2026-08-22',
      nutrition: { calories: 412, protein: 4, carbs: 64, fat: 17, fiber: 5, sugar: 42, sodium: 160 },
      equipment: ['23 x 33 cm baking dish', 'Large bowl', 'Apple peeler'],
      ingredients: [
        { group: 'Apple filling', items: [
          '4 firm apples (Granny Smith or Braeburn), peeled and sliced',
          '4 soft apples (Golden Delicious or Gala), peeled and sliced',
          '1/2 cup (100 g) light brown sugar',
          '2 tbsp cornflour',
          '1.5 tsp ground cinnamon',
          '1/4 tsp ground nutmeg',
          'Juice of 1 lemon',
          '1 tsp vanilla extract',
          'Pinch of salt'
        ] },
        { group: 'Crisp topping', items: [
          '1.25 cups (110 g) rolled oats',
          '3/4 cup (95 g) plain flour',
          '3/4 cup (150 g) light brown sugar',
          '1 tsp ground cinnamon',
          '1/2 tsp salt',
          '170 g cold unsalted butter, cubed'
        ] }
      ],
      instructions: [
        { title: 'Heat and prep', text: 'Heat the oven to 190C / 375F and butter a 23 x 33 cm baking dish.' },
        { title: 'Toss the apples', text: 'Combine both kinds of sliced apple with the brown sugar, cornflour, cinnamon, nutmeg, lemon juice, vanilla and salt. Toss until the cornflour has disappeared, then spread into the dish.' },
        { title: 'Make the topping', text: 'Mix the oats, flour, brown sugar, cinnamon and salt, then rub in the cold butter with your fingertips until you have big clumps alongside coarse crumbs.' },
        { title: 'Top thickly', text: 'Scatter the topping over the apples in a thick, even layer. Do not press it down, since the gaps are what let steam escape and the top crisp.' },
        { title: 'Bake', text: 'Bake 45-50 minutes, until the topping is deep golden brown and the apple juices bubble thickly around the edges. Cover loosely with foil if the top colours too fast.' },
        { title: 'Rest and serve', text: 'Rest 15 minutes so the filling thickens, then serve warm with vanilla ice cream or cream.' }
      ],
      tips: [
        'Two apple varieties is the single best upgrade: one holds its shape, the other melts into sauce.',
        'Slice the apples evenly at about 5 mm so they cook at the same rate.',
        'Do not press the topping down. A loose, mounded topping crisps; a compacted one steams.'
      ],
      variations: [
        'Add blackberries, cranberries or a handful of raisins to the apples.',
        'Stir chopped pecans or walnuts into the topping.',
        'Add a tablespoon of bourbon or calvados to the filling for a deeper, warmer flavour.'
      ],
      storage: 'Keeps 3 days covered at room temperature or 5 days refrigerated. Reheat at 180C / 350F for 15 minutes to bring the topping back; it also freezes baked for 3 months.',
      faqs: [
        { q: 'What is the difference between a crisp and a crumble?', a: 'A crisp contains oats in the topping, which is what makes it crisp. A crumble is flour, butter and sugar only, giving a sandier texture.' },
        { q: 'Why is my filling watery?', a: 'Either the cornflour was left out or the crisp was cut before resting. Apples release a lot of liquid, and it needs both a thickener and fifteen minutes to set.' },
        { q: 'Can I prepare it in advance?', a: 'Assemble it fully, cover and refrigerate for up to a day, then bake straight from the fridge adding about 10 minutes. Keeping the topping frozen separately works even better.' }
      ],
      related: ['berry-crumble', 'rice-pudding', 'lava-mug-cake']
    },
    {
      slug: 'almond-tart',
      title: 'Almond Berry Tart',
      description: 'A press-in almond crust filled with vanilla cream and covered in fresh berries, no rolling pin needed.',
      intro: 'The crust is pressed straight into the tin with your fingers, so there is no chilling, rolling or blind-baking with beans. Ground almonds make it short and fragrant, and it holds a soft filling without going soggy for hours.',
      category: 'desserts',
      cuisine: 'French-inspired',
      course: 'Dessert',
      method: 'Baked',
      diet: ['vegetarian'],
      keywords: ['almond tart', 'berry tart', 'press in crust', 'no roll pastry'],
      image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Almond berry tart topped with fresh raspberries and blueberries',
      prepMinutes: 25,
      cookMinutes: 28,
      servings: 10,
      yieldText: 'One 23 cm tart',
      difficulty: 'Medium',
      rating: 4.7,
      ratingCount: 143,
      datePublished: '2025-08-05',
      dateModified: '2026-07-26',
      nutrition: { calories: 386, protein: 7, carbs: 34, fat: 25, fiber: 3, sugar: 20, sodium: 120 },
      equipment: ['23 cm loose-bottomed tart tin', 'Saucepan', 'Whisk'],
      ingredients: [
        { group: 'Almond press-in crust', items: [
          '1 cup (125 g) plain flour',
          '3/4 cup (75 g) ground almonds',
          '1/3 cup (40 g) icing sugar',
          '1/2 tsp salt',
          '115 g unsalted butter, melted',
          '1/2 tsp almond extract'
        ] },
        { group: 'Vanilla cream filling', items: [
          '2 cups (480 ml) whole milk',
          '4 egg yolks',
          '1/2 cup (100 g) caster sugar',
          '1/4 cup (32 g) cornflour',
          '1 vanilla pod or 2 tsp vanilla bean paste',
          '2 tbsp unsalted butter',
          'Pinch of salt'
        ] },
        { group: 'Topping', items: [
          '3 cups mixed fresh berries',
          '2 tbsp apricot jam, warmed',
          'Toasted flaked almonds'
        ] }
      ],
      instructions: [
        { title: 'Make the crust', text: 'Heat the oven to 175C / 350F. Mix the flour, ground almonds, icing sugar and salt, then stir in the melted butter and almond extract until it clumps like wet sand.' },
        { title: 'Press it in', text: 'Tip into the tart tin and press firmly across the base and up the sides with your fingers and the flat bottom of a glass. Aim for an even thickness, especially in the corners.' },
        { title: 'Bake the shell', text: 'Bake 22-25 minutes until golden and firm. Cool completely in the tin; a warm shell will melt the filling.' },
        { title: 'Cook the custard', text: 'Warm the milk with the vanilla. Whisk the yolks, sugar, cornflour and salt, pour the hot milk over slowly while whisking, then return everything to the pan.' },
        { title: 'Thicken it', text: 'Cook over medium heat, whisking constantly, until it thickens and bubbles, about 3-4 minutes. Whisk in the butter, then press cling film onto the surface and chill 2 hours.' },
        { title: 'Assemble', text: 'Whisk the cold custard smooth, spread into the shell, and arrange the berries on top. Brush with warmed apricot jam and scatter with flaked almonds.' }
      ],
      tips: [
        'Press the crust evenly. Thick corners stay raw while thin patches burn.',
        'Whisk the custard constantly and get right into the edges of the pan, or you will find scrambled egg in it.',
        'Cling film pressed directly onto the custard surface is what prevents a skin forming.'
      ],
      variations: [
        'Fold whipped cream through the cooled custard for a lighter, mousse-like filling.',
        'Spread a thin layer of raspberry jam on the base before the custard.',
        'Use a chocolate ganache filling instead of custard for a richer tart.'
      ],
      storage: 'Best eaten the day it is assembled. The baked shell keeps 3 days in an airtight tin and the custard 3 days refrigerated, so assemble at the last minute.',
      faqs: [
        { q: 'Can I make the components ahead?', a: 'Yes, and it is the best way to do it. Bake the shell and make the custard up to two days ahead, then assemble within a few hours of serving.' },
        { q: 'My custard is lumpy, can I fix it?', a: 'Pass it through a fine sieve while still warm. That removes any set egg and usually rescues it completely.' },
        { q: 'Why press instead of roll the crust?', a: 'Ground almonds make a dough too short and crumbly to roll neatly. Pressing gives the same result with none of the difficulty, and it never shrinks in the tin.' }
      ],
      related: ['berry-tartlets', 'lemon-bars', 'berry-crumble']
    }
  ];
});
