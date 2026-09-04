/**
 * Single recipe page: ingredient scaling, shopping list, meal plan and print.
 */
(function () {
  'use strict';

  var Store = window.KitchenloStore;
  var UI = window.KitchenloUI;
  if (!UI) return;

  /* ------------------------------------------------- ingredient scaling -- */

  var display = document.querySelector('[data-servings-display]');
  var baseEl = document.querySelector('[data-base-servings]');
  var base = baseEl ? parseInt(baseEl.getAttribute('data-base-servings'), 10) : 0;
  var current = base;

  /**
   * Rewrites the leading quantity of an ingredient line by `factor`.
   * Handles decimals ("1.25 lb"), fractions ("1/2 cup") and mixed numbers
   * ("1 1/2 tsp"), and leaves lines with no leading number untouched.
   */
  var QUANTITY = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/;

  var FRACTIONS = [
    [1 / 8, '1/8'], [1 / 4, '1/4'], [1 / 3, '1/3'], [1 / 2, '1/2'],
    [2 / 3, '2/3'], [3 / 4, '3/4']
  ];

  function parseQuantity(text) {
    if (text.indexOf('/') === -1) return parseFloat(text);
    var parts = text.trim().split(/\s+/);
    if (parts.length === 2) {
      var frac = parts[1].split('/');
      return parseFloat(parts[0]) + parseInt(frac[0], 10) / parseInt(frac[1], 10);
    }
    var only = parts[0].split('/');
    return parseInt(only[0], 10) / parseInt(only[1], 10);
  }

  function formatQuantity(value) {
    if (value <= 0) return '0';

    var whole = Math.floor(value);
    var remainder = value - whole;

    // Snap to a common kitchen fraction when we are close to one.
    var best = null;
    FRACTIONS.forEach(function (entry) {
      var diff = Math.abs(remainder - entry[0]);
      if (diff < 0.06 && (!best || diff < best.diff)) best = { diff: diff, label: entry[1] };
    });

    if (remainder < 0.06) return String(whole || 0);
    if (best) return whole ? whole + ' ' + best.label : best.label;

    return (Math.round(value * 100) / 100).toString();
  }

  /* Bracketed metric conversions, e.g. "1/2 cup (120 ml)" or "(14 oz / 400 g)",
     have to scale alongside the leading quantity or the two disagree. Two kinds
     of parenthetical must be left alone: per-item sizes ("6 oz / 170 g each"),
     because the leading count is what scales, and percentages. */
  var MEASURE = /(\d+(?:\.\d+)?)(\s*)(kg|g|ml|L|l|oz|lb)\b/g;
  var SKIP_PAREN = /\beach\b|per cent|%/i;

  function roundMeasure(value) {
    if (value >= 10) return String(Math.round(value));
    return String(Math.round(value * 10) / 10);
  }

  function scaleConversions(text, factor) {
    return text.replace(/\(([^)]*)\)/g, function (whole, inner) {
      if (SKIP_PAREN.test(inner) || !/\d/.test(inner)) return whole;
      return (
        '(' +
        inner.replace(MEASURE, function (m, amount, gap, unit) {
          return roundMeasure(parseFloat(amount) * factor) + gap + unit;
        }) +
        ')'
      );
    });
  }

  function scaleIngredients(servings) {
    var factor = servings / base;

    UI.$$('[data-ingredient]').forEach(function (span) {
      var original = span.getAttribute('data-ingredient');
      var match = original.match(QUANTITY);

      if (!match) {
        span.textContent = scaleConversions(original, factor);
        return;
      }

      var amount = parseQuantity(match[1]);
      if (!isFinite(amount)) {
        span.textContent = scaleConversions(original, factor);
        return;
      }

      var rest = scaleConversions(original.slice(match[1].length), factor);
      span.textContent = formatQuantity(amount * factor) + rest;
    });
  }

  UI.$$('[data-servings-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var step = parseInt(btn.getAttribute('data-servings-step'), 10);
      var next = Math.min(12, Math.max(1, current + step));
      if (next === current) return;
      current = next;
      if (display) display.textContent = current;
      scaleIngredients(current);
    });
  });

  /* -------------------------------------------------------- shopping list */

  var addBtn = document.querySelector('[data-add-ingredients]');
  if (addBtn && Store) {
    addBtn.addEventListener('click', function () {
      var slug = addBtn.getAttribute('data-add-ingredients');
      var title = document.querySelector('h1');
      var items = UI.$$('[data-ingredient]').map(function (el) {
        return el.textContent.trim();
      });

      var added = Store.addItems(items, title ? title.textContent : slug);
      addBtn.textContent =
        added === 0
          ? 'Already on your list'
          : 'Added ' + added + (added === 1 ? ' item' : ' items') + ' to your list';

      setTimeout(function () {
        addBtn.textContent = 'Add all to shopping list';
      }, 2600);
    });
  }

  /* ------------------------------------------------------------ meal plan */

  var planBtn = document.querySelector('[data-add-to-plan]');
  if (planBtn && Store) {
    planBtn.addEventListener('click', function () {
      var slug = planBtn.getAttribute('data-add-to-plan');
      var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      var plan = Store.plan();

      var free = days.find(function (day) {
        return !plan[day];
      });

      if (!free) {
        planBtn.textContent = 'Your week is full';
        setTimeout(function () {
          planBtn.textContent = 'Add to meal plan';
        }, 2600);
        return;
      }

      Store.setPlanDay(free, slug);
      planBtn.textContent = 'Added to ' + free;
      setTimeout(function () {
        planBtn.textContent = 'Add to meal plan';
      }, 2600);
    });
  }

  /* ---------------------------------------------------------------- print */

  var printBtn = document.querySelector('[data-print]');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  /* ------------------------------------------------------- step anchors -- */

  UI.$$('.step').forEach(function (step, i) {
    step.id = 'step-' + (i + 1);
  });
})();
