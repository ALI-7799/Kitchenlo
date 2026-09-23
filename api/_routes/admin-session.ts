/**
 * GET    /api/admin/session   who am I (used by the dashboard on load)
 * DELETE /api/admin/session   sign out
 *
 * Sign-out deletes the session row, so the cookie is dead the instant this
 * returns rather than merely expired in the browser. Clearing the cookie as
 * well is belt and braces for the same act.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, cacheNever, json, withErrors
} from '../_lib/http.js';
import { clearSessionCookie, destroySession, requireAdmin } from '../_lib/auth.js';

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  const method = assertMethod(req, 'GET', 'DELETE');
  cacheNever(res);

  if (method === 'DELETE') {
    assertSameOrigin(req);
    await destroySession(req);
    clearSessionCookie(res);
    json(res, 200, { signedOut: true });
    return;
  }

  const user = await requireAdmin(req);
  json(res, 200, { user });
});
