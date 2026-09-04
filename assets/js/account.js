/**
 * Account page: profile editing, activity stats, preferences and data export.
 */
(function () {
  'use strict';

  var Auth = window.KitchenloAuth;
  var Store = window.KitchenloStore;
  var UI = window.KitchenloUI;
  if (!Auth || !Store || !UI) return;

  var greeting = document.querySelector('[data-greeting]');
  var profileForm = document.getElementById('profileForm');
  var prefsForm = document.getElementById('prefsForm');
  var dataStatus = document.querySelector('[data-data-status]');

  /* ------------------------------------------------------------- profile */

  Auth.onChange(function (user) {
    if (!user) return;

    if (greeting) greeting.textContent = 'Hello, ' + user.name;

    var nameField = document.getElementById('profileName');
    var emailField = document.getElementById('profileEmail');
    if (nameField) nameField.value = user.name;
    if (emailField) emailField.value = user.email;

    var member = document.querySelector('[data-stat-member]');
    if (member && user.createdAt) {
      member.textContent = new Date(user.createdAt).toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric'
      });
    }
  });

  if (profileForm) {
    profileForm.addEventListener('submit', function (event) {
      event.preventDefault();
      UI.clearErrors(profileForm);

      var name = document.getElementById('profileName').value.trim();
      if (!name) {
        UI.setFieldError('profileName', 'Name cannot be empty.');
        return;
      }

      Auth.updateProfile({ name: name })
        .then(function () {
          UI.setStatus(profileForm, 'Profile updated.', 'success');
        })
        .catch(function (error) {
          UI.setStatus(profileForm, error.message, 'error');
        });
    });
  }

  /* --------------------------------------------------------------- stats */

  Store.onChange(function (snapshot) {
    var favorites = document.querySelector('[data-stat-favorites]');
    var planned = document.querySelector('[data-stat-planned]');
    var list = document.querySelector('[data-stat-list]');

    if (favorites) favorites.textContent = snapshot.favorites.length;
    if (planned) planned.textContent = Object.keys(snapshot.plan).length;
    if (list) list.textContent = snapshot.list.length;

    if (prefsForm) {
      var diet = document.getElementById('prefDiet');
      var servings = document.getElementById('prefServings');
      var metric = document.getElementById('prefMetric');
      if (diet) diet.value = snapshot.prefs.diet || '';
      if (servings) servings.value = snapshot.prefs.servings || 4;
      if (metric) metric.checked = !!snapshot.prefs.metric;
    }
  });

  /* --------------------------------------------------------- preferences */

  if (prefsForm) {
    prefsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      Store.setPrefs({
        diet: document.getElementById('prefDiet').value,
        servings: parseInt(document.getElementById('prefServings').value, 10) || 4,
        metric: document.getElementById('prefMetric').checked
      });
      UI.setStatus(prefsForm, 'Preferences saved.', 'success');
    });
  }

  /* ---------------------------------------------------------------- data */

  function setDataStatus(message, type) {
    if (!dataStatus) return;
    dataStatus.textContent = message;
    dataStatus.className = 'form-status' + (type ? ' is-' + type : '');
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-export]')) {
      var payload = JSON.stringify(Store.exportData(), null, 2);
      var blob = new Blob([payload], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'kitchenlo-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDataStatus('Your data has been downloaded.', 'success');
      return;
    }

    if (event.target.closest('[data-delete-account]')) {
      var confirmed = window.confirm(
        'Delete your account and everything saved in this browser? This cannot be undone.'
      );
      if (!confirmed) return;

      Store.wipe();
      Auth.deleteAccount()
        .then(function () {
          window.location.href = 'index.html';
        })
        .catch(function (error) {
          setDataStatus(error.message, 'error');
        });
    }
  });
})();
