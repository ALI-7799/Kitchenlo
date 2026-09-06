/**
 * Login and signup: validation, password strength and submission through the
 * active auth provider.
 */
import { auth } from '../auth.js';
import { $, $$, clearErrors, isEmail, setFieldError, setStatus } from '../dom.js';

/* --------------------------------------------------- password visibility -- */

$$('[data-toggle-password]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(
      btn.getAttribute('data-toggle-password')!
    ) as HTMLInputElement | null;
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Hide' : 'Show';
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

/**
 * Where to land after authenticating. Only same-site relative paths are
 * accepted, so `?next=` cannot be used to bounce a visitor off-site.
 */
function nextUrl(): string {
  const target = new URLSearchParams(window.location.search).get('next');
  if (target && /^[a-z0-9\-/.]+\.html$/i.test(target) && !target.includes('..')) return target;
  return 'account.html';
}

const value = (id: string): string =>
  (document.getElementById(id) as HTMLInputElement | null)?.value ?? '';

/* ----------------------------------------------------------------- login -- */

const loginForm = $<HTMLFormElement>('#loginForm');

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors(loginForm);

  const email = value('loginEmail').trim();
  const password = value('loginPassword');

  // map before every, so every field is marked rather than just the first.
  const checks = [
    setFieldError('loginEmail', isEmail(email) ? '' : 'Enter a valid email address.'),
    setFieldError('loginPassword', password ? '' : 'Enter your password.')
  ];
  if (!checks.every(Boolean)) return;

  const button = loginForm.querySelector('button[type="submit"]') as HTMLButtonElement;
  button.disabled = true;
  setStatus(loginForm, 'Signing you in...');

  auth
    .signIn({ email, password })
    .then((user) => {
      setStatus(loginForm, `Welcome back, ${user.name}.`, 'success');
      window.location.href = nextUrl();
    })
    .catch((error: Error) => {
      button.disabled = false;
      setStatus(loginForm, error.message, 'error');
    });
});

$('[data-forgot]')?.addEventListener('click', (event) => {
  event.preventDefault();
  if (!loginForm) return;
  setStatus(
    loginForm,
    'Password reset needs a mail server, which is not connected yet. Accounts live in this browser, so clearing site data removes them.',
    'error'
  );
});

/* ---------------------------------------------------------------- signup -- */

const signupForm = $<HTMLFormElement>('#signupForm');

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 5);
}

if (signupForm) {
  const passwordInput = $<HTMLInputElement>('#signupPassword');
  const strength = $('[data-strength]', signupForm);

  if (passwordInput && strength) {
    const bar = strength.querySelector('.strength-bar span') as HTMLElement;
    const label = strength.querySelector('.strength-label') as HTMLElement;
    const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
    const colours = ['#a32a1e', '#a32a1e', '#c2691f', '#c09a2e', '#4c8a3a', '#2f6b45'];

    passwordInput.addEventListener('input', () => {
      strength.hidden = passwordInput.value.length === 0;
      const score = scorePassword(passwordInput.value);
      bar.style.width = `${(score / 5) * 100}%`;
      bar.style.background = colours[score]!;
      label.textContent = labels[score]!;
    });
  }

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors(signupForm);

    const name = value('signupName').trim();
    const email = value('signupEmail').trim();
    const password = value('signupPassword');
    const confirm = value('signupConfirm');
    const terms = (document.getElementById('signupTerms') as HTMLInputElement).checked;

    const checks = [
      setFieldError('signupName', name ? '' : 'Please enter your name.'),
      setFieldError('signupEmail', isEmail(email) ? '' : 'Enter a valid email address.'),
      setFieldError('signupPassword', password.length >= 8 ? '' : 'Use at least 8 characters.'),
      setFieldError('signupConfirm', password === confirm ? '' : 'Passwords do not match.'),
      setFieldError('signupTerms', terms ? '' : 'Please accept the terms to continue.')
    ];
    if (!checks.every(Boolean)) return;

    const button = signupForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    button.disabled = true;
    setStatus(signupForm, 'Creating your account...');

    auth
      .signUp({ name, email, password })
      .then(() => {
        setStatus(signupForm, 'Account created. Taking you in...', 'success');
        window.location.href = nextUrl();
      })
      .catch((error: Error) => {
        button.disabled = false;
        setStatus(signupForm, error.message, 'error');
      });
  });
}

/* Tell an already-signed-in visitor rather than letting them re-register. */
const existing = auth.current();
const activeForm = loginForm ?? signupForm;
if (existing && activeForm) {
  setStatus(activeForm, `You are already signed in as ${existing.name}.`, 'success');
}
