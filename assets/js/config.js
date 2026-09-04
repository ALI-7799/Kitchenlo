/**
 * Runtime configuration.
 *
 * Leave `supabase` null and accounts are stored in the visitor's own browser
 * (demo mode) — everything works with no setup.
 *
 * To switch on real server-side accounts later:
 *   1. Create a free project at https://supabase.com
 *   2. Add the browser SDK to src/templates/layout.js, above assets/js/auth.js:
 *      <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 *   3. Fill in the two values below and run `node tools/build.js`
 *
 * The anon key is designed to be public, but it must be paired with row level
 * security policies on every table or anyone can read your data.
 */
window.KITCHENLO_CONFIG = {
  supabase: null
  // supabase: {
  //   url: 'https://YOUR-PROJECT.supabase.co',
  //   anonKey: 'YOUR-PUBLIC-ANON-KEY'
  // }
};
