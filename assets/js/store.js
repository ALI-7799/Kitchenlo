/**
 * Per-user persisted state: saved recipes, the weekly meal plan, the shopping
 * list and preferences.
 *
 * Data is namespaced by user id so two accounts on the same browser do not see
 * each other's data, and signed-out visitors get a "guest" namespace whose
 * contents are merged into the account on first sign-in.
 */
(function (root) {
  'use strict';

  var PREFIX = 'kitchenlo-data:';
  var GUEST = 'guest';

  var DEFAULTS = {
    favorites: [],
    plan: {},
    list: [],
    prefs: { diet: '', servings: 4, metric: false }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function currentNamespace() {
    var auth = root.KitchenloAuth;
    var user = auth && auth.current();
    return user ? user.id : GUEST;
  }

  function keyFor(ns) {
    return PREFIX + ns;
  }

  function readNamespace(ns) {
    try {
      var raw = localStorage.getItem(keyFor(ns));
      var parsed = raw ? JSON.parse(raw) : {};
      return Object.assign(clone(DEFAULTS), parsed);
    } catch (e) {
      return clone(DEFAULTS);
    }
  }

  function writeNamespace(ns, data) {
    try {
      localStorage.setItem(keyFor(ns), JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  var listeners = [];

  function emit() {
    var snapshot = Store.all();
    listeners.forEach(function (fn) {
      try {
        fn(snapshot);
      } catch (e) {}
    });
  }

  var Store = {
    onChange: function (fn) {
      listeners.push(fn);
      fn(Store.all());
      return function () {
        listeners = listeners.filter(function (l) {
          return l !== fn;
        });
      };
    },

    all: function () {
      return readNamespace(currentNamespace());
    },

    _update: function (mutator) {
      var ns = currentNamespace();
      var data = readNamespace(ns);
      mutator(data);
      writeNamespace(ns, data);
      emit();
      return data;
    },

    /* -------------------------------------------------------- favorites -- */

    favorites: function () {
      return Store.all().favorites;
    },

    isFavorite: function (slug) {
      return Store.all().favorites.indexOf(slug) !== -1;
    },

    toggleFavorite: function (slug) {
      var added = false;
      Store._update(function (data) {
        var i = data.favorites.indexOf(slug);
        if (i === -1) {
          data.favorites.push(slug);
          added = true;
        } else {
          data.favorites.splice(i, 1);
        }
      });
      return added;
    },

    clearFavorites: function () {
      Store._update(function (data) {
        data.favorites = [];
      });
    },

    /* ------------------------------------------------------------- plan -- */

    plan: function () {
      return Store.all().plan;
    },

    setPlanDay: function (day, slug) {
      Store._update(function (data) {
        if (slug) data.plan[day] = slug;
        else delete data.plan[day];
      });
    },

    clearPlan: function () {
      Store._update(function (data) {
        data.plan = {};
      });
    },

    /* --------------------------------------------------------- shopping -- */

    list: function () {
      return Store.all().list;
    },

    /**
     * Adds items, skipping any whose text already appears in the list.
     * @returns {number} how many were actually added
     */
    addItems: function (items, source) {
      var added = 0;
      Store._update(function (data) {
        items.forEach(function (text) {
          var clean = String(text).trim();
          if (!clean) return;
          var exists = data.list.some(function (entry) {
            return entry.text.toLowerCase() === clean.toLowerCase();
          });
          if (exists) return;
          data.list.push({
            id: 'i_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            text: clean,
            source: source || '',
            checked: false
          });
          added++;
        });
      });
      return added;
    },

    toggleItem: function (id) {
      Store._update(function (data) {
        data.list.forEach(function (entry) {
          if (entry.id === id) entry.checked = !entry.checked;
        });
      });
    },

    removeItem: function (id) {
      Store._update(function (data) {
        data.list = data.list.filter(function (entry) {
          return entry.id !== id;
        });
      });
    },

    clearChecked: function () {
      Store._update(function (data) {
        data.list = data.list.filter(function (entry) {
          return !entry.checked;
        });
      });
    },

    clearList: function () {
      Store._update(function (data) {
        data.list = [];
      });
    },

    /* ------------------------------------------------------------ prefs -- */

    prefs: function () {
      return Store.all().prefs;
    },

    setPrefs: function (updates) {
      Store._update(function (data) {
        data.prefs = Object.assign({}, data.prefs, updates);
      });
    },

    /* ------------------------------------------------------- lifecycle -- */

    /** Folds anything saved while signed out into the account namespace. */
    mergeGuestInto: function (userId) {
      var guest = readNamespace(GUEST);
      var hasGuestData =
        guest.favorites.length || Object.keys(guest.plan).length || guest.list.length;
      if (!hasGuestData) return;

      var target = readNamespace(userId);

      guest.favorites.forEach(function (slug) {
        if (target.favorites.indexOf(slug) === -1) target.favorites.push(slug);
      });
      Object.keys(guest.plan).forEach(function (day) {
        if (!target.plan[day]) target.plan[day] = guest.plan[day];
      });
      guest.list.forEach(function (entry) {
        var exists = target.list.some(function (e) {
          return e.text.toLowerCase() === entry.text.toLowerCase();
        });
        if (!exists) target.list.push(entry);
      });

      writeNamespace(userId, target);
      writeNamespace(GUEST, clone(DEFAULTS));
      emit();
    },

    exportData: function () {
      var auth = root.KitchenloAuth;
      return {
        exportedAt: new Date().toISOString(),
        user: auth ? auth.current() : null,
        data: Store.all()
      };
    },

    wipe: function () {
      try {
        localStorage.removeItem(keyFor(currentNamespace()));
      } catch (e) {}
      emit();
    },

    refresh: emit
  };

  // Re-emit when the account changes so every view rebinds to the new namespace.
  if (root.KitchenloAuth) {
    var previous = root.KitchenloAuth.current();
    root.KitchenloAuth.onChange(function (user) {
      if (user && !previous) Store.mergeGuestInto(user.id);
      previous = user;
      emit();
    });
  }

  // Keep tabs in sync.
  root.addEventListener('storage', function (event) {
    if (event.key && event.key.indexOf(PREFIX) === 0) emit();
  });

  root.KitchenloStore = Store;
})(window);
