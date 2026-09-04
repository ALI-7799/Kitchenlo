/**
 * Shopping list: grouped by supermarket aisle, checkable, copyable.
 */
(function () {
  'use strict';

  var Store = window.KitchenloStore;
  var UI = window.KitchenloUI;
  if (!Store || !UI) return;

  var wrap = document.getElementById('shoppingList');
  var empty = document.getElementById('listEmpty');
  var count = document.querySelector('[data-list-count]');
  var form = document.getElementById('addItemForm');
  if (!wrap) return;

  /**
   * Keyword-to-aisle map. First match wins, so more specific terms are listed
   * before general ones.
   */
  var AISLES = [
    ['Produce', ['lettuce', 'spinach', 'kale', 'tomato', 'cucumber', 'onion', 'garlic', 'ginger',
      'carrot', 'celery', 'pepper', 'courgette', 'zucchini', 'aubergine', 'broccoli', 'avocado',
      'lemon', 'lime', 'orange', 'banana', 'apple', 'berries', 'berry', 'raspberr', 'blueberr',
      'strawberr', 'potato', 'squash', 'mushroom', 'herb', 'parsley', 'coriander', 'basil', 'mint',
      'dill', 'chive', 'rocket', 'salad', 'corn', 'peas', 'snap', 'chard', 'shallot', 'fruit']],
    ['Meat & Fish', ['chicken', 'beef', 'pork', 'salmon', 'shrimp', 'prawn', 'fish', 'bacon',
      'chorizo', 'pancetta', 'prosciutto', 'anchov', 'scallop', 'turkey', 'thigh', 'fillet']],
    ['Dairy & Eggs', ['milk', 'cream', 'butter', 'cheese', 'yogurt', 'yoghurt', 'egg', 'ricotta',
      'feta', 'parmesan', 'mozzarella', 'mascarpone', 'cheddar', 'goat cheese', 'cotija',
      'sour cream', 'labneh']],
    ['Bakery', ['bread', 'sourdough', 'tortilla', 'flatbread', 'naan', 'pita', 'pastry', 'shell']],
    ['Pantry', ['flour', 'sugar', 'oil', 'vinegar', 'rice', 'pasta', 'noodle', 'tortellini',
      'lentil', 'bean', 'chickpea', 'quinoa', 'farro', 'oats', 'stock', 'broth', 'tinned', 'can ',
      'tomato paste', 'passata', 'coconut milk', 'honey', 'maple', 'vanilla', 'cocoa', 'chocolate',
      'cornflour', 'cornstarch', 'baking', 'gelatine', 'tahini', 'peanut butter', 'miso',
      'soy sauce', 'tamari', 'pesto', 'salsa', 'olive', 'seeds', 'nuts', 'almond', 'walnut',
      'pecan', 'pistachio', 'cranberr', 'granola', 'raisin', 'jam', 'tofu', 'edamame']],
    ['Spices & Seasoning', ['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'cinnamon', 'nutmeg',
      'chilli', 'chili', 'coriander seed', 'spice', 'bay lea', 'sumac', 'za atar', 'sesame',
      'garlic powder', 'thyme', 'extract']]
  ];

  function aisleFor(text) {
    var lower = text.toLowerCase();
    for (var i = 0; i < AISLES.length; i++) {
      var keywords = AISLES[i][1];
      for (var j = 0; j < keywords.length; j++) {
        if (lower.indexOf(keywords[j]) !== -1) return AISLES[i][0];
      }
    }
    return 'Other';
  }

  function render(snapshot) {
    var items = snapshot.list;

    if (!items.length) {
      wrap.innerHTML = '';
      if (empty) empty.hidden = false;
      if (count) count.textContent = '0 items';
      return;
    }

    if (empty) empty.hidden = true;

    var remaining = items.filter(function (i) {
      return !i.checked;
    }).length;

    if (count) {
      count.textContent =
        items.length + (items.length === 1 ? ' item' : ' items') + ', ' + remaining + ' to buy';
    }

    var groups = {};
    items.forEach(function (item) {
      var aisle = aisleFor(item.text);
      (groups[aisle] = groups[aisle] || []).push(item);
    });

    var order = AISLES.map(function (a) {
      return a[0];
    }).concat('Other');

    wrap.innerHTML = order
      .filter(function (aisle) {
        return groups[aisle];
      })
      .map(function (aisle) {
        return (
          '<div class="list-group"><h2>' + aisle + '</h2><ul class="list-items">' +
          groups[aisle]
            .map(function (item) {
              return (
                '<li class="list-item' + (item.checked ? ' is-checked' : '') + '">' +
                '<input type="checkbox" id="' + item.id + '"' + (item.checked ? ' checked' : '') +
                ' data-toggle-item="' + item.id + '" />' +
                '<span>' + UI.escapeHtml(item.text) + '</span>' +
                (item.source
                  ? '<span class="tag tag-muted">' + UI.escapeHtml(item.source) + '</span>'
                  : '') +
                '<button type="button" data-remove-item="' + item.id +
                '" aria-label="Remove ' + UI.escapeHtml(item.text) + '">&times;</button></li>'
              );
            })
            .join('') +
          '</ul></div>'
        );
      })
      .join('');
  }

  /* ------------------------------------------------------------- events -- */

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = document.getElementById('newItem');
      var value = input.value.trim();
      if (!value) return;
      Store.addItems([value], '');
      input.value = '';
      input.focus();
    });
  }

  wrap.addEventListener('change', function (event) {
    var toggle = event.target.closest('[data-toggle-item]');
    if (toggle) Store.toggleItem(toggle.getAttribute('data-toggle-item'));
  });

  wrap.addEventListener('click', function (event) {
    var remove = event.target.closest('[data-remove-item]');
    if (remove) Store.removeItem(remove.getAttribute('data-remove-item'));
  });

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-clear-checked]')) {
      Store.clearChecked();
      return;
    }

    if (event.target.closest('[data-clear-list]')) {
      if (window.confirm('Clear the entire shopping list?')) Store.clearList();
      return;
    }

    var copyBtn = event.target.closest('[data-copy-list]');
    if (copyBtn) {
      var text = Store.list()
        .map(function (i) {
          return (i.checked ? '[x] ' : '[ ] ') + i.text;
        })
        .join('\n');

      if (!text) return;

      var done = function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        setTimeout(function () {
          copyBtn.textContent = original;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        // Fallback for insecure origins, where the async clipboard API is absent.
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'absolute';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {}
        document.body.removeChild(area);
      }
    }
  });

  Store.onChange(render);
})();
