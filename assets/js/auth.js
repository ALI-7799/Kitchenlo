/**
 * Kitchenlo authentication.
 *
 * Exposes a single async provider interface so the storage backend can be
 * swapped without touching any page code:
 *
 *   signUp({name, email, password}) -> user
 *   signIn({email, password})       -> user
 *   signOut()                       -> void
 *   current()                       -> user | null
 *   updateProfile({name})           -> user
 *   deleteAccount()                 -> void
 *   onChange(fn)                    -> unsubscribe
 *
 * LocalAuthProvider stores accounts in localStorage. Passwords are hashed with
 * SHA-256 over a per-account random salt, so the stored value is not the
 * password itself, but this is demo-grade only: anything in localStorage is
 * readable by any script on the origin and there is no server verifying
 * anything. Swap in SupabaseAuthProvider (below) for real accounts.
 */
(function (root) {
  'use strict';

  var USERS_KEY = 'kitchenlo-users';
  var SESSION_KEY = 'kitchenlo-session';

  /* ----------------------------------------------------------- helpers -- */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function randomSalt() {
    var bytes = new Uint8Array(16);
    (root.crypto || root.msCrypto).getRandomValues(bytes);
    return Array.prototype.map
      .call(bytes, function (b) {
        return ('0' + b.toString(16)).slice(-2);
      })
      .join('');
  }

  /**
   * SHA-256 of salt + password. Falls back to a weak synchronous hash only if
   * WebCrypto is unavailable (non-secure origins), which is flagged on the
   * record so it can be upgraded later.
   */
  function hashPassword(password, salt) {
    var subtle = root.crypto && root.crypto.subtle;
    if (!subtle) {
      return Promise.resolve({ hash: weakHash(salt + password), weak: true });
    }
    var data = new TextEncoder().encode(salt + password);
    return subtle.digest('SHA-256', data).then(function (buffer) {
      var hash = Array.prototype.map
        .call(new Uint8Array(buffer), function (b) {
          return ('0' + b.toString(16)).slice(-2);
        })
        .join('');
      return { hash: hash, weak: false };
    });
  }

  function weakHash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return 'weak:' + (h >>> 0).toString(16);
  }

  function normaliseEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function publicUser(record) {
    if (!record) return null;
    return {
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: record.createdAt
    };
  }

  /* -------------------------------------------------- LocalAuthProvider -- */

  function LocalAuthProvider() {
    this.listeners = [];
  }

  LocalAuthProvider.prototype.name = 'local';

  LocalAuthProvider.prototype._users = function () {
    return read(USERS_KEY, {});
  };

  LocalAuthProvider.prototype._emit = function () {
    var user = this.current();
    this.listeners.forEach(function (fn) {
      try {
        fn(user);
      } catch (e) {
        /* a listener throwing must not break the others */
      }
    });
  };

  LocalAuthProvider.prototype.onChange = function (fn) {
    this.listeners.push(fn);
    fn(this.current());
    var self = this;
    return function () {
      self.listeners = self.listeners.filter(function (l) {
        return l !== fn;
      });
    };
  };

  LocalAuthProvider.prototype.current = function () {
    var session = read(SESSION_KEY, null);
    if (!session || !session.email) return null;
    var record = this._users()[session.email];
    return publicUser(record);
  };

  LocalAuthProvider.prototype.signUp = function (details) {
    var self = this;
    var email = normaliseEmail(details.email);
    var name = String(details.name || '').trim();
    var password = String(details.password || '');

    if (!name) return Promise.reject(new Error('Please enter your name.'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }
    if (password.length < 8) {
      return Promise.reject(new Error('Password must be at least 8 characters.'));
    }

    var users = this._users();
    if (users[email]) {
      return Promise.reject(new Error('An account with that email already exists.'));
    }

    var salt = randomSalt();
    return hashPassword(password, salt).then(function (result) {
      users[email] = {
        id: 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
        name: name,
        email: email,
        salt: salt,
        hash: result.hash,
        weak: result.weak,
        createdAt: new Date().toISOString()
      };
      if (!save(USERS_KEY, users)) {
        throw new Error('Could not save your account. Browser storage may be full or blocked.');
      }
      save(SESSION_KEY, { email: email, since: Date.now() });
      self._emit();
      return publicUser(users[email]);
    });
  };

  LocalAuthProvider.prototype.signIn = function (details) {
    var self = this;
    var email = normaliseEmail(details.email);
    var password = String(details.password || '');
    var users = this._users();
    var record = users[email];

    // Same message either way, so the form does not reveal which emails exist.
    var failure = new Error('Email or password is incorrect.');

    if (!record) return Promise.reject(failure);

    return hashPassword(password, record.salt).then(function (result) {
      if (result.hash !== record.hash) throw failure;
      save(SESSION_KEY, { email: email, since: Date.now() });
      self._emit();
      return publicUser(record);
    });
  };

  LocalAuthProvider.prototype.signOut = function () {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
    this._emit();
    return Promise.resolve();
  };

  LocalAuthProvider.prototype.updateProfile = function (updates) {
    var self = this;
    var session = read(SESSION_KEY, null);
    if (!session) return Promise.reject(new Error('You are not signed in.'));

    var users = this._users();
    var record = users[session.email];
    if (!record) return Promise.reject(new Error('Account not found.'));

    if (updates.name !== undefined) {
      var name = String(updates.name).trim();
      if (!name) return Promise.reject(new Error('Name cannot be empty.'));
      record.name = name;
    }

    save(USERS_KEY, users);
    self._emit();
    return Promise.resolve(publicUser(record));
  };

  LocalAuthProvider.prototype.deleteAccount = function () {
    var session = read(SESSION_KEY, null);
    if (!session) return Promise.reject(new Error('You are not signed in.'));

    var users = this._users();
    delete users[session.email];
    save(USERS_KEY, users);

    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}

    this._emit();
    return Promise.resolve();
  };

  /* ----------------------------------------------- SupabaseAuthProvider -- */

  /**
   * Real accounts, for when a backend is wired up. Activated automatically when
   * assets/js/config.js sets window.KITCHENLO_CONFIG.supabase = {url, anonKey}
   * and the Supabase browser SDK has been loaded. Until then the local provider
   * is used, so login and signup work with no setup.
   */
  function SupabaseAuthProvider(client) {
    this.client = client;
    this.listeners = [];
    this.user = null;

    var self = this;
    client.auth.getSession().then(function (res) {
      self.user = res.data.session ? self._map(res.data.session.user) : null;
      self._emit();
    });
    client.auth.onAuthStateChange(function (_event, session) {
      self.user = session ? self._map(session.user) : null;
      self._emit();
    });
  }

  SupabaseAuthProvider.prototype.name = 'supabase';

  SupabaseAuthProvider.prototype._map = function (u) {
    if (!u) return null;
    return {
      id: u.id,
      email: u.email,
      name: (u.user_metadata && u.user_metadata.name) || u.email,
      createdAt: u.created_at
    };
  };

  SupabaseAuthProvider.prototype._emit = function () {
    var user = this.user;
    this.listeners.forEach(function (fn) {
      try {
        fn(user);
      } catch (e) {}
    });
  };

  SupabaseAuthProvider.prototype.onChange = function (fn) {
    this.listeners.push(fn);
    fn(this.user);
    var self = this;
    return function () {
      self.listeners = self.listeners.filter(function (l) {
        return l !== fn;
      });
    };
  };

  SupabaseAuthProvider.prototype.current = function () {
    return this.user;
  };

  SupabaseAuthProvider.prototype.signUp = function (details) {
    var self = this;
    return this.client.auth
      .signUp({
        email: normaliseEmail(details.email),
        password: details.password,
        options: { data: { name: details.name } }
      })
      .then(function (res) {
        if (res.error) throw new Error(res.error.message);
        return self._map(res.data.user);
      });
  };

  SupabaseAuthProvider.prototype.signIn = function (details) {
    var self = this;
    return this.client.auth
      .signInWithPassword({
        email: normaliseEmail(details.email),
        password: details.password
      })
      .then(function (res) {
        if (res.error) throw new Error(res.error.message);
        return self._map(res.data.user);
      });
  };

  SupabaseAuthProvider.prototype.signOut = function () {
    return this.client.auth.signOut();
  };

  SupabaseAuthProvider.prototype.updateProfile = function (updates) {
    var self = this;
    return this.client.auth.updateUser({ data: { name: updates.name } }).then(function (res) {
      if (res.error) throw new Error(res.error.message);
      return self._map(res.data.user);
    });
  };

  SupabaseAuthProvider.prototype.deleteAccount = function () {
    // Deleting a user requires a service-role key, so it must happen server-side.
    return Promise.reject(
      new Error('Account deletion requires a server endpoint. Contact ' + 'hello@kitchenlo.com.')
    );
  };

  /* ------------------------------------------------------------- setup -- */

  function createProvider() {
    var config = root.KITCHENLO_CONFIG || {};
    if (config.supabase && config.supabase.url && config.supabase.anonKey && root.supabase) {
      try {
        var client = root.supabase.createClient(config.supabase.url, config.supabase.anonKey);
        return new SupabaseAuthProvider(client);
      } catch (e) {
        /* fall through to local */
      }
    }
    return new LocalAuthProvider();
  }

  var auth = createProvider();

  root.KitchenloAuth = auth;
  root.KitchenloAuthProviders = {
    LocalAuthProvider: LocalAuthProvider,
    SupabaseAuthProvider: SupabaseAuthProvider
  };
})(window);
