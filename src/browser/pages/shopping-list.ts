/**
 * Shopping list: grouped by supermarket aisle, checkable, copyable.
 */
import { $, escapeHtml } from '../dom.js';
import * as store from '../store.js';
import type { ListItem } from '../store.js';

const wrap = $('#shoppingList');

if (wrap) {
  const empty = $('#listEmpty');
  const count = $('[data-list-count]');
  const form = $<HTMLFormElement>('#addItemForm');

  /**
   * Keyword-to-aisle map. First match wins, so more specific terms come before
   * general ones, and the order here is also the order aisles are displayed.
   */
  const AISLES: [string, string[]][] = [
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
    ['Bakery', ['bread', 'sourdough', 'tortilla', 'flatbread', 'naan', 'pita', 'pastry', 'shell',
      'brioche', 'muffin', 'bagel']],
    ['Pantry', ['flour', 'sugar', 'oil', 'vinegar', 'rice', 'pasta', 'noodle', 'tortellini',
      'lentil', 'bean', 'chickpea', 'quinoa', 'farro', 'oats', 'stock', 'broth', 'tinned', 'can ',
      'tomato paste', 'passata', 'coconut milk', 'honey', 'maple', 'vanilla', 'cocoa', 'chocolate',
      'cornflour', 'cornstarch', 'baking', 'gelatine', 'tahini', 'peanut butter', 'miso',
      'soy sauce', 'tamari', 'pesto', 'salsa', 'olive', 'seeds', 'nuts', 'almond', 'walnut',
      'pecan', 'pistachio', 'cranberr', 'granola', 'raisin', 'jam', 'tofu', 'edamame']],
    ['Spices & Seasoning', ['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'cinnamon', 'nutmeg',
      'chilli', 'chili', 'coriander seed', 'spice', 'bay lea', 'sumac', 'za atar', 'sesame',
      'garlic powder', 'thyme', 'extract', 'yeast']]
  ];

  const ORDER = [...AISLES.map(([name]) => name), 'Other'];

  function aisleFor(text: string): string {
    const lower = text.toLowerCase();
    for (const [aisle, keywords] of AISLES) {
      if (keywords.some((word) => lower.includes(word))) return aisle;
    }
    return 'Other';
  }

  store.onChange((data) => {
    const items = data.list;

    if (!items.length) {
      wrap.innerHTML = '';
      if (empty) empty.hidden = false;
      if (count) count.textContent = '0 items';
      return;
    }

    if (empty) empty.hidden = true;

    const remaining = items.filter((item) => !item.checked).length;
    if (count) {
      count.textContent = `${items.length} ${
        items.length === 1 ? 'item' : 'items'
      }, ${remaining} to buy`;
    }

    const groups = new Map<string, ListItem[]>();
    for (const item of items) {
      const aisle = aisleFor(item.text);
      const bucket = groups.get(aisle);
      if (bucket) bucket.push(item);
      else groups.set(aisle, [item]);
    }

    wrap.innerHTML = ORDER.filter((aisle) => groups.has(aisle))
      .map((aisle) => {
        const rows = groups
          .get(aisle)!
          .map(
            (item) => `<li class="list-item${item.checked ? ' is-checked' : ''}">
            <input type="checkbox" id="${item.id}"${
              item.checked ? ' checked' : ''
            } data-toggle-item="${item.id}" />
            <span>${escapeHtml(item.text)}</span>
            ${item.source ? `<span class="tag tag-muted">${escapeHtml(item.source)}</span>` : ''}
            <button type="button" data-remove-item="${item.id}" aria-label="Remove ${escapeHtml(
              item.text
            )}">&times;</button>
          </li>`
          )
          .join('');
        return `<div class="list-group"><h2>${aisle}</h2><ul class="list-items">${rows}</ul></div>`;
      })
      .join('');
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $<HTMLInputElement>('#newItem')!;
    const value = input.value.trim();
    if (!value) return;
    store.addItems([value]);
    input.value = '';
    input.focus();
  });

  wrap.addEventListener('change', (event) => {
    const toggle = (event.target as Element).closest('[data-toggle-item]');
    if (toggle) store.toggleItem(toggle.getAttribute('data-toggle-item')!);
  });

  wrap.addEventListener('click', (event) => {
    const remove = (event.target as Element).closest('[data-remove-item]');
    if (remove) store.removeItem(remove.getAttribute('data-remove-item')!);
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Element;

    if (target.closest('[data-clear-checked]')) {
      store.clearChecked();
      return;
    }

    if (target.closest('[data-clear-list]')) {
      if (window.confirm('Clear the entire shopping list?')) store.clearList();
      return;
    }

    const copyBtn = target.closest<HTMLElement>('[data-copy-list]');
    if (!copyBtn) return;

    const text = store
      .list()
      .map((item) => `${item.checked ? '[x]' : '[ ]'} ${item.text}`)
      .join('\n');
    if (!text) return;

    const confirmCopy = () => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      window.setTimeout(() => {
        copyBtn.textContent = original;
      }, 1800);
    };

    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text).then(confirmCopy, () => undefined);
      return;
    }

    // Fallback for insecure origins, where the async clipboard API is absent.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      confirmCopy();
    } catch {
      /* nothing further to try */
    }
    area.remove();
  });
}
