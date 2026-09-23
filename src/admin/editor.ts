/**
 * The recipe editor.
 *
 * Every field on RecipeSource is editable here, including the structured ones
 * — grouped ingredients, titled steps, nutrition and FAQs — because a recipe
 * saved through a form that quietly dropped its FAQs would lose content that
 * is currently in the repository. The form is built from the recipe and read
 * back into the same shape, so a load-then-save with no edits is a no-op.
 *
 * Validation is the server's job; this only collects. Duplicating the rules
 * here would mean two sets to keep in step, and the messages from
 * api/_lib/validate.ts are already written to be shown to a person.
 */
import { api, ApiError, type Faq, type IngredientGroup, type InstructionStep,
  type Recipe } from './api.js';
import { $, esc, escUrl, readAsDataUrl, splitLines, splitList } from './dom.js';

const CATEGORIES = [
  ['quick-dinners', 'Quick Dinners'],
  ['healthy-food', 'Healthy Food'],
  ['breakfast', 'Breakfast & Brunch'],
  ['desserts', 'Desserts'],
  ['comfort-food', 'Comfort Food']
];

const DIETS = [
  'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
  'high-protein', 'high-fibre', 'low-carb'
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

/** An empty recipe, used when creating rather than editing. */
function blank(): Recipe {
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug: '', title: '', description: '', intro: '',
    category: 'quick-dinners', cuisine: '', course: 'Dinner', method: '',
    diet: [], keywords: [], image: null, imageAlt: '',
    prepMinutes: 10, cookMinutes: 20, servings: 4, yieldText: '',
    difficulty: 'Easy', rating: 0, ratingCount: 0,
    datePublished: today, dateModified: today,
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
    equipment: [],
    ingredients: [{ group: '', items: [] }],
    instructions: [{ title: '', text: '' }],
    tips: [], variations: [], storage: '', faqs: [], related: [],
    video: null, published: true
  };
}

export interface EditorHost {
  toast: (message: string, isError?: boolean) => void;
  onDone: () => void;
}

export function renderEditor(
  container: HTMLElement,
  slug: string | null,
  host: EditorHost
): void {
  container.innerHTML = '<p class="empty">Loading…</p>';

  const load = slug ? api.getRecipe(slug).then((r) => r.recipe) : Promise.resolve(blank());

  load
    .then((recipe) => draw(container, recipe, slug, host))
    .catch((error: unknown) => {
      container.innerHTML =
        `<p class="empty">${esc(error instanceof Error ? error.message : 'Could not load')}</p>`;
    });
}

function draw(
  container: HTMLElement,
  recipe: Recipe,
  originalSlug: string | null,
  host: EditorHost
): void {
  container.innerHTML = `
    <div class="editor-head">
      <h1>${originalSlug ? `Editing ${esc(recipe.title)}` : 'New recipe'}</h1>
      <div class="editor-actions">
        ${originalSlug
          ? `<a class="btn btn-sm" href="/recipes/${esc(recipe.slug)}" target="_blank"
                rel="noopener">View</a>
             <button class="btn btn-sm btn-danger" data-act="delete" type="button">Delete</button>`
          : ''}
        <button class="btn btn-sm" data-act="cancel" type="button">Back</button>
        <button class="btn btn-sm btn-primary" data-act="save" type="button">Save</button>
      </div>
    </div>

    <div id="editorErrors" hidden></div>

    <form id="recipeForm" autocomplete="off">
      ${basics(recipe)}
      ${imagery(recipe)}
      ${timings(recipe)}
      ${ingredientsSection(recipe)}
      ${instructionsSection(recipe)}
      ${nutritionSection(recipe)}
      ${extras(recipe)}
      ${videoSection(recipe)}
    </form>
  `;

  wire(container, recipe, originalSlug, host);
}

/* -------------------------------------------------------------- sections -- */

function basics(r: Recipe): string {
  return `
    <section class="section">
      <h2>Basics</h2>
      <div class="field">
        <label for="f-title">Title</label>
        <input id="f-title" name="title" type="text" value="${esc(r.title)}" />
      </div>
      <div class="field">
        <label for="f-slug">Slug</label>
        <input id="f-slug" name="slug" type="text" value="${esc(r.slug)}" />
        <p class="hint">
          The page address: /recipes/<strong>${esc(r.slug || 'your-slug')}</strong>.
          Changing this on a published recipe changes its URL, which costs its
          search ranking — related links are repointed automatically, but any
          external link will break.
        </p>
      </div>
      <div class="field">
        <label for="f-description">Description</label>
        <textarea id="f-description" name="description">${esc(r.description)}</textarea>
        <p class="hint">Used as the meta description and the card text. Aim for 120-160 characters.</p>
      </div>
      <div class="field">
        <label for="f-intro">Intro</label>
        <textarea id="f-intro" name="intro" rows="4">${esc(r.intro)}</textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-category">Category</label>
          <select id="f-category" name="category">
            ${CATEGORIES.map(([value, label]) =>
              `<option value="${esc(value)}"${r.category === value ? ' selected' : ''}>${esc(label)}</option>`
            ).join('')}
          </select>
        </div>
        <div class="field">
          <label for="f-cuisine">Cuisine</label>
          <input id="f-cuisine" name="cuisine" type="text" value="${esc(r.cuisine)}" />
        </div>
        <div class="field">
          <label for="f-course">Course</label>
          <input id="f-course" name="course" type="text" value="${esc(r.course)}" />
        </div>
        <div class="field">
          <label for="f-method">Method</label>
          <input id="f-method" name="method" type="text" value="${esc(r.method)}" />
        </div>
      </div>
      <div class="field">
        <label>Diet tags</label>
        <div class="checks">
          ${DIETS.map((tag) => `
            <label class="check">
              <input type="checkbox" name="diet" value="${esc(tag)}"
                ${r.diet.includes(tag) ? 'checked' : ''} />
              ${esc(tag)}
            </label>`).join('')}
        </div>
      </div>
      <div class="field">
        <label for="f-keywords">Keywords</label>
        <input id="f-keywords" name="keywords" type="text" value="${esc(r.keywords.join(', '))}" />
        <p class="hint">Comma separated. These feed search and the Recipe structured data.</p>
      </div>
      <div class="field">
        <label class="check">
          <input type="checkbox" id="f-published" name="published"
            ${r.published !== false ? 'checked' : ''} />
          Published
        </label>
        <p class="hint">Unpublished recipes stay out of the site, the sitemap and search.</p>
      </div>
    </section>`;
}

function imagery(r: Recipe): string {
  return `
    <section class="section">
      <h2>Image</h2>
      <img class="image-preview" id="imagePreview"
        src="${escUrl(r.image) || '/favicon.svg'}" alt="" />
      <div class="field">
        <label for="f-imageFile">Upload a new image</label>
        <input id="f-imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
        <p class="hint">JPEG, PNG, WebP or AVIF, up to 8 MB. Uploading replaces the URL below.</p>
      </div>
      <div class="field">
        <label for="f-image">Image URL</label>
        <input id="f-image" name="image" type="text" value="${esc(r.image ?? '')}" />
        <p class="hint">Leave empty to use the generated cover art for this recipe.</p>
      </div>
      <div class="field">
        <label for="f-imageAlt">Alt text</label>
        <input id="f-imageAlt" name="imageAlt" type="text" value="${esc(r.imageAlt)}" />
        <p class="hint">Describe the photograph for screen readers and image search.</p>
      </div>
    </section>`;
}

function timings(r: Recipe): string {
  return `
    <section class="section">
      <h2>Timing &amp; yield</h2>
      <div class="field-row">
        <div class="field">
          <label for="f-prep">Prep minutes</label>
          <input id="f-prep" name="prepMinutes" type="number" min="0" value="${r.prepMinutes}" />
        </div>
        <div class="field">
          <label for="f-cook">Cook minutes</label>
          <input id="f-cook" name="cookMinutes" type="number" min="0" value="${r.cookMinutes}" />
        </div>
        <div class="field">
          <label for="f-servings">Servings</label>
          <input id="f-servings" name="servings" type="number" min="1" value="${r.servings}" />
        </div>
        <div class="field">
          <label for="f-difficulty">Difficulty</label>
          <select id="f-difficulty" name="difficulty">
            ${DIFFICULTIES.map((d) =>
              `<option value="${d}"${r.difficulty === d ? ' selected' : ''}>${d}</option>`
            ).join('')}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="f-yield">Yield text</label>
        <input id="f-yield" name="yieldText" type="text" value="${esc(r.yieldText)}" />
      </div>
    </section>`;
}

function ingredientsSection(r: Recipe): string {
  return `
    <section class="section">
      <h2>Ingredients</h2>
      <div id="ingredientGroups">
        ${r.ingredients.map(ingredientGroup).join('')}
      </div>
      <button class="btn btn-sm" type="button" data-act="add-group">Add group</button>
    </section>`;
}

function ingredientGroup(group: IngredientGroup): string {
  return `
    <div class="repeat-item" data-group>
      <div class="repeat-head">
        <input type="text" data-group-name placeholder="Group name (e.g. For the sauce)"
          value="${esc(group.group)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-group">Remove</button>
      </div>
      <textarea data-group-items rows="5"
        placeholder="One ingredient per line">${esc(group.items.join('\n'))}</textarea>
    </div>`;
}

function instructionsSection(r: Recipe): string {
  return `
    <section class="section">
      <h2>Instructions</h2>
      <div id="instructionSteps">
        ${r.instructions.map(step).join('')}
      </div>
      <button class="btn btn-sm" type="button" data-act="add-step">Add step</button>
    </section>`;
}

function step(item: InstructionStep): string {
  return `
    <div class="repeat-item" data-step>
      <div class="repeat-head">
        <span class="repeat-index" data-step-index></span>
        <input type="text" data-step-title placeholder="Step title" value="${esc(item.title)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-step">Remove</button>
      </div>
      <textarea data-step-text rows="3" placeholder="What to do">${esc(item.text)}</textarea>
    </div>`;
}

function nutritionSection(r: Recipe): string {
  const fields: [keyof Recipe['nutrition'], string][] = [
    ['calories', 'Calories'], ['protein', 'Protein (g)'], ['carbs', 'Carbs (g)'],
    ['fat', 'Fat (g)'], ['fiber', 'Fibre (g)'], ['sugar', 'Sugar (g)'],
    ['sodium', 'Sodium (mg)']
  ];
  return `
    <section class="section">
      <h2>Nutrition</h2>
      <p class="hint">Per serving. These appear in the Recipe structured data.</p>
      <div class="field-row">
        ${fields.map(([key, label]) => `
          <div class="field">
            <label for="f-n-${key}">${label}</label>
            <input id="f-n-${key}" data-nutrition="${key}" type="number" min="0"
              value="${r.nutrition[key] ?? 0}" />
          </div>`).join('')}
      </div>
    </section>`;
}

function extras(r: Recipe): string {
  return `
    <section class="section">
      <h2>Extras</h2>
      <div class="field">
        <label for="f-equipment">Equipment</label>
        <textarea id="f-equipment" name="equipment" rows="3"
          placeholder="One per line">${esc(r.equipment.join('\n'))}</textarea>
      </div>
      <div class="field">
        <label for="f-tips">Tips</label>
        <textarea id="f-tips" name="tips" rows="4"
          placeholder="One per line">${esc(r.tips.join('\n'))}</textarea>
      </div>
      <div class="field">
        <label for="f-variations">Variations</label>
        <textarea id="f-variations" name="variations" rows="4"
          placeholder="One per line">${esc(r.variations.join('\n'))}</textarea>
      </div>
      <div class="field">
        <label for="f-storage">Storage</label>
        <textarea id="f-storage" name="storage" rows="3">${esc(r.storage)}</textarea>
      </div>
      <div class="field">
        <label>FAQs</label>
        <div id="faqList">${r.faqs.map(faqItem).join('')}</div>
        <button class="btn btn-sm" type="button" data-act="add-faq">Add FAQ</button>
      </div>
      <div class="field">
        <label for="f-related">Related recipes</label>
        <input id="f-related" name="related" type="text" value="${esc(r.related.join(', '))}" />
        <p class="hint">
          Comma-separated slugs. Every one must exist, or the site will not build —
          publishing checks this first.
        </p>
      </div>
    </section>`;
}

function faqItem(faq: Faq): string {
  return `
    <div class="repeat-item" data-faq>
      <div class="repeat-head">
        <input type="text" data-faq-q placeholder="Question" value="${esc(faq.q)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-faq">Remove</button>
      </div>
      <textarea data-faq-a rows="2" placeholder="Answer">${esc(faq.a)}</textarea>
    </div>`;
}

function videoSection(r: Recipe): string {
  const video = r.video ?? null;
  return `
    <section class="section">
      <h2>Video</h2>
      <p class="hint">
        Leave the URL empty and the recipe page shows its "Video coming soon"
        panel — never an error or an empty frame.
      </p>
      <div class="field">
        <label for="f-videoUrl">Video URL</label>
        <input id="f-videoUrl" name="videoUrl" type="text" value="${esc(video?.url ?? '')}"
          placeholder="https://www.youtube.com/watch?v=… or assets/video/slug.mp4" />
        <p class="hint">A YouTube or Vimeo link is embedded; any other https URL is played directly.</p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-videoTitle">Caption</label>
          <input id="f-videoTitle" name="videoTitle" type="text" value="${esc(video?.title ?? '')}" />
        </div>
        <div class="field">
          <label for="f-videoSeconds">Length (seconds)</label>
          <input id="f-videoSeconds" name="videoSeconds" type="number" min="0"
            value="${video?.seconds ?? ''}" />
          <p class="hint">Optional, used in the VideoObject markup.</p>
        </div>
        <div class="field">
          <label for="f-videoPoster">Poster image URL</label>
          <input id="f-videoPoster" name="videoPoster" type="text"
            value="${esc(video?.poster ?? '')}" />
        </div>
      </div>
    </section>`;
}

/* ----------------------------------------------------------------- wiring -- */

function wire(
  container: HTMLElement,
  recipe: Recipe,
  originalSlug: string | null,
  host: EditorHost
): void {
  const form = $<HTMLFormElement>('#recipeForm', container)!;
  renumberSteps(container);

  container.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-act]');
    if (!button) return;

    switch (button.dataset['act']) {
      case 'add-group':
        $('#ingredientGroups', container)!
          .insertAdjacentHTML('beforeend', ingredientGroup({ group: '', items: [] }));
        break;
      case 'remove-group':
        button.closest('[data-group]')?.remove();
        break;
      case 'add-step':
        $('#instructionSteps', container)!
          .insertAdjacentHTML('beforeend', step({ title: '', text: '' }));
        renumberSteps(container);
        break;
      case 'remove-step':
        button.closest('[data-step]')?.remove();
        renumberSteps(container);
        break;
      case 'add-faq':
        $('#faqList', container)!.insertAdjacentHTML('beforeend', faqItem({ q: '', a: '' }));
        break;
      case 'remove-faq':
        button.closest('[data-faq]')?.remove();
        break;
      case 'cancel':
        host.onDone();
        break;
      case 'save':
        void save(container, form, originalSlug, host);
        break;
      case 'delete':
        void remove(recipe, host);
        break;
    }
  });

  // Derive the slug from the title while creating, but never once a recipe
  // exists: changing a live slug changes its URL, and that must be deliberate.
  if (!originalSlug) {
    const title = $<HTMLInputElement>('#f-title', container)!;
    const slugField = $<HTMLInputElement>('#f-slug', container)!;
    let edited = false;
    slugField.addEventListener('input', () => { edited = true; });
    title.addEventListener('input', () => {
      if (edited) return;
      slugField.value = title.value
        .toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    });
  }

  $<HTMLInputElement>('#f-imageFile', container)?.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) void upload(container, file, host);
  });
}

function renumberSteps(container: HTMLElement): void {
  container.querySelectorAll('[data-step-index]').forEach((el, i) => {
    el.textContent = String(i + 1);
  });
}

async function upload(container: HTMLElement, file: File, host: EditorHost): Promise<void> {
  try {
    host.toast('Uploading image…');
    const dataUrl = await readAsDataUrl(file);
    const { url } = await api.uploadImage(file.name, dataUrl);

    $<HTMLInputElement>('#f-image', container)!.value = url;
    $<HTMLImageElement>('#imagePreview', container)!.src = url;
    host.toast('Image uploaded. Save the recipe to keep it.');
  } catch (error) {
    host.toast(error instanceof Error ? error.message : 'Upload failed', true);
  }
}

/* ------------------------------------------------------------ collection -- */

/** Reads the form back into the same shape the API accepts. */
function collect(container: HTMLElement, form: HTMLFormElement): Partial<Recipe> {
  const value = (name: string): string => {
    const el = form.elements.namedItem(name);
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement ? el.value.trim() : '';
  };
  const number = (name: string): number => Number(value(name)) || 0;

  const ingredients: IngredientGroup[] = Array.from(
    container.querySelectorAll('[data-group]')
  ).map((node) => ({
    group: (node.querySelector('[data-group-name]') as HTMLInputElement).value.trim(),
    items: splitLines((node.querySelector('[data-group-items]') as HTMLTextAreaElement).value)
  })).filter((group) => group.items.length);

  const instructions: InstructionStep[] = Array.from(
    container.querySelectorAll('[data-step]')
  ).map((node) => ({
    title: (node.querySelector('[data-step-title]') as HTMLInputElement).value.trim(),
    text: (node.querySelector('[data-step-text]') as HTMLTextAreaElement).value.trim()
  })).filter((s) => s.text);

  const faqs: Faq[] = Array.from(container.querySelectorAll('[data-faq]'))
    .map((node) => ({
      q: (node.querySelector('[data-faq-q]') as HTMLInputElement).value.trim(),
      a: (node.querySelector('[data-faq-a]') as HTMLTextAreaElement).value.trim()
    }))
    .filter((f) => f.q && f.a);

  const nutrition = {} as Recipe['nutrition'];
  container.querySelectorAll<HTMLInputElement>('[data-nutrition]').forEach((input) => {
    nutrition[input.dataset['nutrition'] as keyof Recipe['nutrition']] =
      Number(input.value) || 0;
  });

  const videoUrl = value('videoUrl');
  const seconds = number('videoSeconds');

  return {
    slug: value('slug'),
    title: value('title'),
    description: value('description'),
    intro: value('intro'),
    category: value('category'),
    cuisine: value('cuisine'),
    course: value('course'),
    method: value('method'),
    diet: Array.from(
      container.querySelectorAll<HTMLInputElement>('input[name="diet"]:checked')
    ).map((input) => input.value),
    keywords: splitList(value('keywords')),
    // Empty means "generate cover art", which the API stores as null.
    image: value('image') || null,
    imageAlt: value('imageAlt'),
    prepMinutes: number('prepMinutes'),
    cookMinutes: number('cookMinutes'),
    servings: number('servings') || 1,
    yieldText: value('yieldText'),
    difficulty: value('difficulty'),
    nutrition,
    equipment: splitLines(value('equipment')),
    ingredients,
    instructions,
    tips: splitLines(value('tips')),
    variations: splitLines(value('variations')),
    storage: value('storage'),
    faqs,
    related: splitList(value('related')),
    video: videoUrl
      ? {
          url: videoUrl,
          ...(value('videoPoster') ? { poster: value('videoPoster') } : {}),
          ...(value('videoTitle') ? { title: value('videoTitle') } : {}),
          ...(seconds > 0 ? { seconds } : {})
        }
      : null,
    published: ($<HTMLInputElement>('#f-published', container))?.checked !== false
  };
}

async function save(
  container: HTMLElement,
  form: HTMLFormElement,
  originalSlug: string | null,
  host: EditorHost
): Promise<void> {
  const errorBox = $('#editorErrors', container)!;
  errorBox.hidden = true;

  const payload = collect(container, form);

  try {
    if (originalSlug) await api.updateRecipe(originalSlug, payload);
    else await api.createRecipe(payload);

    host.toast('Saved. Hit Publish to put it on the live site.');
    host.onDone();
  } catch (error) {
    if (error instanceof ApiError && error.details.length) {
      errorBox.hidden = false;
      errorBox.innerHTML = `
        <div class="errors">
          <strong>${esc(error.message)}</strong>
          <ul>${error.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        </div>`;
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    host.toast(error instanceof Error ? error.message : 'Could not save', true);
  }
}

async function remove(recipe: Recipe, host: EditorHost): Promise<void> {
  const confirmed = window.confirm(
    `Delete "${recipe.title}" permanently?\n\n` +
      'Its page will disappear from the site at the next publish. ' +
      'Any other recipe listing it as related will stop doing so. ' +
      'This cannot be undone.'
  );
  if (!confirmed) return;

  try {
    await api.deleteRecipe(recipe.slug);
    host.toast(`Deleted ${recipe.title}.`);
    host.onDone();
  } catch (error) {
    host.toast(error instanceof Error ? error.message : 'Could not delete', true);
  }
}
