/**
 * Login and signup forms: client-side validation, password strength and
 * submission through the active auth provider.
 */
(function () {
  'use strict';

  var Auth = window.KitchenloAuth;
  var UI = window.KitchenloUI;
  if (!Auth || !UI) return;

  /* -------------------------------------------------- password visibility */

  UI.$$('[data-toggle-password]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.getAttribute('data-toggle-password'));
      if (!input) return;
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Hide' : 'Show';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  /* ------------------------------------------------------------ redirect */

  /** Returns the page to land on after authenticating. */
  function nextUrl() {
    var target = new URLSearchParams(window.location.search).get('next');
    // Only allow same-site relative paths, never an absolute URL.
    if (target && /^[a-z0-9\-/.]+\.html$/i.test(target) && target.indexOf('..') === -1) {
      return target;
    }
    return 'account.html';
  }

  /* --------------------------------------------------------------- login */

  var loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      UI.clearErrors(loginForm);

      var email = document.getElementById('loginEmail').value.trim();
      var password = document.getElementById('loginPassword').value;
      var valid = true;

      if (!UI.isEmail(email)) {
        valid = UI.setFieldError('loginEmail', 'Enter a valid email address.') && valid;
      }
      if (!password) {
        valid = UI.setFieldError('loginPassword', 'Enter your password.') && valid;
      }
      if (!valid) return;

      var button = loginForm.querySelector('button[type="submit"]');
      button.disabled = true;
      UI.setStatus(loginForm, 'Signing you in...');

      Auth.signIn({ email: email, password: password })
        .then(function (user) {
          UI.setStatus(loginForm, 'Welcome back, ' + user.name + '.', 'success');
          window.location.href = nextUrl();
        })
        .catch(function (error) {
          button.disabled = false;
          UI.setStatus(loginForm, error.message, 'error');
        });
    });
  }

  var forgot = document.querySelector('[data-forgot]');
  if (forgot) {
    forgot.addEventListener('click', function (event) {
      event.preventDefault();
      UI.setStatus(
        loginForm,
        'Password reset needs a mail server, which is not connected yet. Accounts are stored in this browser, so clearing site data removes them.',
        'error'
      );
    });
  }

  /* -------------------------------------------------------------- signup */

  var signupForm = document.getElementById('signupForm');

  function scorePassword(value) {
    var score = 0;
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return Math.min(score, 5);
  }

  if (signupForm) {
    var passwordInput = document.getElementById('signupPassword');
    var strength = signupForm.querySelector('[data-strength]');

    if (passwordInput && strength) {
      var bar = strength.querySelector('.strength-bar span');
      var label = strength.querySelector('.strength-label');
      var labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
      var colors = ['#b3261e', '#b3261e', '#d98324', '#d9b324', '#4c9a2a', '#1f7a4d'];

      passwordInput.addEventListener('input', function () {
        var value = passwordInput.value;
        strength.hidden = value.length === 0;
        var score = scorePassword(value);
        bar.style.width = (score / 5) * 100 + '%';
        bar.style.background = colors[score];
        label.textContent = labels[score];
      });
    }

    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      UI.clearErrors(signupForm);

      var name = document.getElementById('signupName').value.trim();
      var email = document.getElementById('signupEmail').value.trim();
      var password = document.getElementById('signupPassword').value;
      var confirm = document.getElementById('signupConfirm').value;
      var terms = document.getElementById('signupTerms').checked;
      var valid = true;

      if (!name) {
        valid = UI.setFieldError('signupName', 'Please enter your name.') && valid;
      }
      if (!UI.isEmail(email)) {
        valid = UI.setFieldError('signupEmail', 'Enter a valid email address.') && valid;
      }
      if (password.length < 8) {
        valid = UI.setFieldError('signupPassword', 'Use at least 8 characters.') && valid;
      }
      if (password !== confirm) {
        valid = UI.setFieldError('signupConfirm', 'Passwords do not match.') && valid;
      }
      if (!terms) {
        valid = UI.setFieldError('signupTerms', 'Please accept the terms to continue.') && valid;
      }
      if (!valid) return;

      var button = signupForm.querySelector('button[type="submit"]');
      button.disabled = true;
      UI.setStatus(signupForm, 'Creating your account...');

      Auth.signUp({ name: name, email: email, password: password })
        .then(function (user) {
          UI.setStatus(signupForm, 'Account created. Taking you in...', 'success');
          window.location.href = nextUrl();
        })
        .catch(function (error) {
          button.disabled = false;
          UI.setStatus(signupForm, error.message, 'error');
        });
    });
  }

  /* ------------------------------------- bounce already-signed-in visitors */

  var existing = Auth.current();
  if (existing && (loginForm || signupForm)) {
    var form = loginForm || signupForm;
    UI.setStatus(form, 'You are already signed in as ' + existing.name + '.', 'success');
  }
})();
