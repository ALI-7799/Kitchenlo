/**
 * Curated collection pages.
 *
 * These target long-tail informational queries ("high protein vegetarian
 * dinners", "30 minute meals") that the category pages do not cover. Each one
 * is filtered from the existing recipe data but carries its own written
 * introduction and FAQs, because a filtered list with no original copy is thin
 * content and will not rank.
 *
 * Only build a collection when at least six recipes qualify. Anything smaller
 * is better served by the filters on recipes.html.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KITCHENLO_COLLECTIONS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  return [
    {
      slug: 'vegetarian-recipes',
      title: 'Vegetarian Recipes',
      heading: 'Vegetarian recipes that are not an afterthought',
      description:
        'Vegetarian dinners, lunches and desserts built around flavour rather than substitution, with full nutrition and timings for every dish.',
      filter: { diet: ['vegetarian'] },
      keywords: ['vegetarian recipes', 'vegetarian dinner ideas', 'easy vegetarian meals', 'meat free recipes'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'A vegetarian bowl of chickpeas, cucumber and feta',
      intro: [
        'Vegetarian cooking goes wrong when it is conceived as a subtraction. Take the meat out of a dish designed around meat and you are left with a gap where the savoury depth used to be, which is why so many vegetarian recipes taste thin.',
        'Everything in this collection is built the other way round. The depth comes from ingredients that supply it directly: caramelised tomato paste, browned mushrooms, miso, parmesan, toasted nuts and properly charred vegetables. None of these are stand-ins for anything. They are the point of the dish.',
        'The other habit worth borrowing is finishing with acid and fat. A vegetarian bowl that tastes flat is almost never short of ingredients; it is short of a squeeze of lemon and a pour of good olive oil at the end. That single step does more than any additional component.'
      ],
      faqs: [
        {
          q: 'How do I make vegetarian meals filling enough?',
          a: 'Aim for a protein source and a fat source in every meal, not just vegetables and grains. Legumes, eggs, dairy, tofu and nuts all work. A bowl with chickpeas and tahini keeps you full for hours; the same bowl without them will not.'
        },
        {
          q: 'What gives vegetarian food a savoury, meaty depth?',
          a: 'Glutamate-rich ingredients. Tomato paste cooked until it darkens, dried or browned mushrooms, parmesan, miso, soy sauce and nutritional yeast all supply it. Browning matters too, since the Maillard reaction produces flavour compounds that no amount of seasoning replaces.'
        },
        {
          q: 'Which of these are vegan or easily made vegan?',
          a: 'The quinoa bowl, lentil soup, roasted veggie wrap and coconut rice bowl are already vegan. Most of the others convert by swapping the dairy: plant yogurt, a firm plant butter or nutritional yeast in place of parmesan.'
        }
      ]
    },
    {
      slug: 'gluten-free-recipes',
      title: 'Gluten-Free Recipes',
      heading: 'Gluten-free recipes that were never about the flour',
      description:
        'Naturally gluten-free dinners, bowls and desserts. No specialist flour blends, no gums, no substitutions that need explaining.',
      filter: { diet: ['gluten-free'] },
      keywords: ['gluten free recipes', 'gluten free dinner', 'celiac friendly meals', 'naturally gluten free'],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Seared salmon with lemon, a naturally gluten-free dinner',
      intro: [
        'The most reliable gluten-free cooking is not gluten-free baking. It is the very large body of food that never contained wheat to begin with: seared fish, rice bowls, grain salads built on quinoa, soups thickened by their own lentils, custards set with gelatine.',
        'Every recipe here is naturally gluten-free rather than adapted. Nothing depends on a flour blend behaving like wheat, which is the step where most gluten-free cooking becomes difficult and expensive.',
        'Two cautions worth repeating. Soy sauce contains wheat, so use tamari and check the label. Oats are gluten-free as a grain but are routinely processed alongside wheat, so buy certified gluten-free oats if you are cooking for coeliac disease rather than a preference. Miso and stock cubes are the other two products that catch people out.'
      ],
      faqs: [
        {
          q: 'Are oats gluten-free?',
          a: 'Oats contain no gluten themselves, but they are commonly grown, milled and packed alongside wheat, so cross-contamination is routine. For coeliac disease, buy oats explicitly certified gluten-free. For a non-medical preference, standard oats are usually fine.'
        },
        {
          q: 'Which everyday ingredients hide gluten?',
          a: 'Soy sauce, most stock cubes and powders, some miso pastes, malt vinegar, many spice blends, and anything described as "modified starch" without a source. Tamari replaces soy sauce directly and behaves identically.'
        },
        {
          q: 'How do I thicken a sauce without flour?',
          a: 'Cornflour slurry is the direct swap and is what the honey soy chicken here uses. Reduction works even better where you have time, and blending a portion of a soup and stirring it back in thickens it with no additive at all.'
        }
      ]
    },
    {
      slug: 'high-protein-recipes',
      title: 'High-Protein Recipes',
      heading: 'High-protein meals with the numbers to back it up',
      description:
        'Meals delivering 20 g of protein or more per serving, with the full breakdown shown on every recipe rather than implied.',
      filter: { diet: ['high-protein'] },
      keywords: ['high protein recipes', 'high protein meals', 'protein dinner ideas', 'meals with 30g protein'],
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'A protein-rich taco rice bowl with chicken, beans and avocado',
      intro: [
        'Most recipes described as high protein never say how much protein they contain. Every recipe in this collection publishes the figure per serving, alongside calories, carbohydrate, fat and fibre, so you can judge it rather than take the label on trust.',
        'The practical range here runs from roughly 20 g to 39 g of protein per portion. For context, most guidance puts a useful per-meal target around 25 to 30 g for an adult, spread across the day rather than concentrated in the evening, which is where most people fall short.',
        'Worth noting: protein satiety comes from the total, not the source. The chickpea and yogurt dishes in this list hold their own against the chicken ones. Combining a legume with a grain or dairy in the same meal covers the full amino acid profile without any planning beyond putting them in the same bowl.'
      ],
      faqs: [
        {
          q: 'How much protein should a meal contain?',
          a: 'Commonly cited guidance lands around 25 to 30 g per meal for an adult, distributed across the day. Total daily intake matters more than any single meal, and needs vary considerably with body weight, age and activity, so treat this as a rough anchor rather than a rule.'
        },
        {
          q: 'Can vegetarian meals be genuinely high in protein?',
          a: 'Yes. Greek yogurt, lentils, chickpeas, tofu, edamame and cheese are all substantial sources. The herbed yogurt bowl in this collection reaches 24 g per serving with no meat at all.'
        },
        {
          q: 'Do I need protein powder?',
          a: 'No. It is a convenience, not a requirement, and whole foods bring fibre and micronutrients alongside the protein. The smoothie bowl here uses it because blending is the one context where it genuinely helps, and it notes how to hit a similar figure without it.'
        }
      ]
    },
    {
      slug: 'high-fibre-recipes',
      title: 'High-Fibre Recipes',
      heading: 'High-fibre meals built on legumes and whole grains',
      description:
        'Meals delivering 10 g of fibre or more per serving from beans, lentils, whole grains and vegetables, with the numbers published.',
      filter: { diet: ['high-fibre'] },
      keywords: ['high fibre recipes', 'high fiber meals', 'gut health recipes', 'fibre rich dinner'],
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'A bowl of lentil soup, high in fibre',
      intro: [
        'Fibre is the nutrient most people under-eat without noticing. UK guidance suggests around 30 g a day for adults and average intake sits closer to 20 g, a gap that is easier to close with meals than with supplements.',
        'The recipes here deliver between 10 g and 16 g per serving, which means one of them covers a third to a half of the day on its own. The work is done by legumes, whole grains and vegetables eaten with their skins rather than by anything unusual.',
        'One piece of practical advice. If your current intake is low, increase it gradually over a couple of weeks and drink more water alongside, because a sudden jump is what causes the bloating people blame on the beans themselves. Rinsing tinned legumes well also helps considerably.'
      ],
      faqs: [
        {
          q: 'How much fibre do I actually need?',
          a: 'UK guidance is about 30 g a day for adults, and US guidance sits in a similar range depending on age and sex. Most people get closer to 20 g, so a single meal at 15 g moves the needle meaningfully.'
        },
        {
          q: 'Why do legumes make me bloated?',
          a: 'Usually because intake increased faster than the gut adapted. Build up over two or three weeks, rinse tinned pulses thoroughly, and drink enough water. For most people the effect settles as the gut microbiome adjusts.'
        },
        {
          q: 'Are tinned beans as good as dried?',
          a: 'Nutritionally they are close, and the convenience is what makes them a habit rather than an occasional project. Rinse them well to remove excess sodium and the starchy liquid that causes most of the digestive complaints.'
        }
      ]
    },
    {
      slug: '30-minute-meals',
      title: '30-Minute Meals',
      heading: 'Dinner on the table in thirty minutes, timed honestly',
      description:
        'Weeknight meals from a cold start to a plated dinner in 30 minutes or less, including the chopping. Timed properly, not optimistically.',
      filter: { maxTime: 30 },
      keywords: ['30 minute meals', 'quick dinner recipes', 'fast weeknight dinner', 'easy dinner ideas'],
      image: 'https://images.unsplash.com/photo-1563379091331-03b75bec4a25?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Lemon herb shrimp, a ten-minute dinner',
      intro: [
        'Published cooking times are routinely optimistic, because they measure the cooking and quietly omit the twelve minutes of chopping that precede it. Everything here is timed from a cold start with nothing prepared, which is why some of these numbers look larger than equivalent recipes elsewhere. They are simply honest.',
        'Three habits do most of the work in a fast kitchen. Put the pan or the oven on before you start cutting, so the equipment heats while you prep. Read the whole recipe first, so you never discover mid-cook that something needed doing twenty minutes ago. And prepare everything before the pan goes on for anything stir-fried, because once it is hot there is no time to chop.',
        'The other thing that separates a fast dinner from a slow one is the shape of the recipe rather than the ingredient count. One pan, one heat source, and components that finish at the same time will always beat a recipe with fewer ingredients spread across three pots.'
      ],
      faqs: [
        {
          q: 'Does the 30 minutes include preparation?',
          a: 'Yes. Every timing on this site is measured from a cold start with nothing chopped, and the prep and cook figures are listed separately on each recipe so you can see the split.'
        },
        {
          q: 'What is the single best way to cook faster?',
          a: 'Heat the pan or oven before you touch a knife. Most of the perceived waiting in a weeknight recipe is equipment coming up to temperature, and that can happen while you work rather than after.'
        },
        {
          q: 'Can I prepare parts of these in advance?',
          a: 'Most of them, yes. Chopping vegetables, cooking a grain and mixing a sauce all keep for several days, and each recipe has a storage note saying exactly what holds and for how long.'
        }
      ]
    },
    {
      slug: 'meal-prep-recipes',
      title: 'Meal Prep Recipes',
      heading: 'Recipes that still taste good on day four',
      description:
        'Dishes chosen specifically because they keep: components that store separately, textures that survive the fridge, flavours that deepen overnight.',
      slugs: [
        'chickpea-salad',
        'quinoa-bowl',
        'lentil-soup',
        'taco-rice-bowls',
        'farro-salad',
        'stuffed-peppers',
        'kale-salad',
        'coconut-rice-bowl',
        'honey-soy-chicken',
        'roasted-wrap'
      ],
      keywords: ['meal prep recipes', 'make ahead meals', 'batch cooking', 'lunch prep ideas'],
      image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Meal prep containers filled with grains, vegetables and protein',
      intro: [
        'Not every good recipe is a good meal prep recipe. Anything that depends on a crisp texture, a fresh herb garnish or a sauce emulsified at the last second will disappoint by Wednesday, however well it cooks on Sunday.',
        'These ten were selected because they hold. Some, like the chickpea salad and the lentil soup, genuinely improve after a day as the dressing soaks in and the seasoning settles. Others are built from components that store separately and assemble in three minutes, which is the more reliable strategy in general.',
        'Two rules cover most storage failures. Keep anything wet away from anything crisp until the moment of eating, and cool food properly on a tray before sealing it, since trapped steam ruins texture and creates the conditions bacteria prefer. Cooked grains, roasted vegetables and pulses keep about four days refrigerated; cooked chicken and fish are safest within three.',
        'For the full method behind this approach, including a realistic ninety-minute Sunday and what to prep versus what to assemble, see the guide on component meal prep.'
      ],
      faqs: [
        {
          q: 'How long does prepped food keep?',
          a: 'Cooked grains, roasted vegetables and legumes keep 4 days refrigerated. Cooked chicken and fish are safest within 3. Dressings and quick pickles last a week or more. Freeze anything you will not reach in that window.'
        },
        {
          q: 'How do I stop meal prep getting boring?',
          a: 'Prep components rather than finished meals, and make two or three different sauces. The same grain, protein and roasted vegetables taste like completely different meals under a tahini dressing versus a peanut sauce.'
        },
        {
          q: 'What should never be prepped in advance?',
          a: 'Avocado, fresh herbs, anything fried and anything crisp that will sit against something wet. Add those at the point of eating. Salted raw vegetables like cucumber and tomato should be drained before they go into a container.'
        }
      ]
    }
  ];
});
