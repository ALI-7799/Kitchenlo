/**
 * Browser entry point.
 *
 * esbuild bundles this into assets/js/kitchenlo.js, which is the single script
 * every generated page loads. Each page module guards on the elements it needs
 * and does nothing when they are absent, so one bundle can serve every page
 * without any per-page script wiring.
 *
 * Only assets/js/config.js stays outside the bundle, so runtime keys can be
 * changed without a rebuild.
 */
import './app.js';
import './consent.js';
import { trackPageView } from './analytics.js';

import './pages/home.js';
import './pages/recipe-index.js';
import './pages/recipe-page.js';
import './pages/auth-pages.js';
import './pages/account.js';
import './pages/favorites.js';
import './pages/planner.js';
import './pages/shopping-list.js';
import './pages/contact.js';

/*
 * Counted last, after every page module has had its turn. The call sets no
 * cookie, stores nothing and identifies nobody; see src/browser/analytics.ts
 * for what is and is not sent, and why it sits outside the consent gate.
 */
trackPageView();
