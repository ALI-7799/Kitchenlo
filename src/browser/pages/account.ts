/**
 * Account page: profile editing, activity stats, preferences and data export.
 */
import { auth } from '../auth.js';
import { $, clearErrors, setStatus } from '../dom.js';
import * as store from '../store.js';
import type { DietTag } from '../../types.js';

const profileForm = $<HTMLFormElement>('#profileForm');
const prefsForm = $<HTMLFormElement>('#prefsForm');
const greeting = $('[data-greeting]');

if (profileForm || prefsForm) {
  auth.onChange((user) => {
    if (!user) return;

    if (greeting) greeting.textContent = `Hello, ${user.name}`;

    const nameField = $<HTMLInputElement>('#profileName');
    const emailField = $<HTMLInputElement>('#profileEmail');
    if (nameField) nameField.value = user.name;
    if (emailField) emailField.value = user.email;

    const member = $('[data-stat-member]');
    if (member && user.createdAt) {
      member.textContent = new Date(user.createdAt).toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric'
      });
    }
  });

  profileForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors(profileForm);

    const name = $<HTMLInputElement>('#profileName')!.value.trim();
    if (!name) {
      setStatus(profileForm, 'Name cannot be empty.', 'error');
      return;
    }

    auth
      .updateProfile({ name })
      .then(() => setStatus(profileForm, 'Profile updated.', 'success'))
      .catch((error: Error) => setStatus(profileForm, error.message, 'error'));
  });

  store.onChange((data) => {
    const set = (selector: string, text: string) => {
      const el = $(selector);
      if (el) el.textContent = text;
    };
    set('[data-stat-favorites]', String(data.favorites.length));
    set('[data-stat-planned]', String(Object.keys(data.plan).length));
    set('[data-stat-list]', String(data.list.length));

    const diet = $<HTMLSelectElement>('#prefDiet');
    const servings = $<HTMLInputElement>('#prefServings');
    const metric = $<HTMLInputElement>('#prefMetric');
    if (diet) diet.value = data.prefs.diet;
    if (servings) servings.value = String(data.prefs.servings);
    if (metric) metric.checked = data.prefs.metric;
  });

  prefsForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    store.setPrefs({
      diet: $<HTMLSelectElement>('#prefDiet')!.value as DietTag | '',
      servings: Number($<HTMLInputElement>('#prefServings')!.value) || 4,
      metric: $<HTMLInputElement>('#prefMetric')!.checked
    });
    setStatus(prefsForm, 'Preferences saved.', 'success');
  });
}

/* ------------------------------------------------------------------ data -- */

const dataStatus = $('[data-data-status]');

function setDataStatus(message: string, kind: 'error' | 'success'): void {
  if (!dataStatus) return;
  dataStatus.textContent = message;
  dataStatus.className = `form-status is-${kind}`;
}

document.addEventListener('click', (event) => {
  const target = event.target as Element;

  if (target.closest('[data-export]')) {
    const blob = new Blob([JSON.stringify(store.exportData(), null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kitchenlo-data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setDataStatus('Your data has been downloaded.', 'success');
    return;
  }

  if (target.closest('[data-delete-account]')) {
    const confirmed = window.confirm(
      'Delete your account and everything saved in this browser? This cannot be undone.'
    );
    if (!confirmed) return;

    store.wipe();
    auth
      .deleteAccount()
      .then(() => {
        window.location.href = 'index.html';
      })
      .catch((error: Error) => setDataStatus(error.message, 'error'));
  }
});
