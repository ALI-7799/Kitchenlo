/**
 * POST /api/admin/upload — store a recipe image and return its public URL.
 *
 * Images cannot be written into the repository at runtime: a serverless
 * filesystem is read-only apart from /tmp, and anything written there is gone
 * when the instance is recycled. So uploads go to Supabase Storage and the
 * recipe stores the resulting URL.
 *
 * That URL then needs no template change at all — rel() in
 * src/templates/layout.ts already passes any absolute https: URL through
 * untouched, which is how the existing photo paths and a Storage URL can sit
 * in the same `image` field.
 *
 * The bytes arrive base64-encoded in a JSON body rather than as multipart
 * form data. Multipart parsing would mean a dependency and a streaming parser
 * for what is a handful of uploads a week, and the size cap below keeps the
 * base64 overhead irrelevant.
 */
import type { VercelRequest, VercelResponse } from '../_lib/vercel.js';
import {
  assertMethod, assertSameOrigin, badRequest, body, cacheNever, HttpError,
  json, withErrors
} from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { slugify } from '../_lib/validate.js';

/**
 * 8 MB of decoded image. Comfortably above a high-quality recipe photograph
 * and below the platform's own request body limit, so an oversized file fails
 * with the message below rather than an opaque platform error.
 */
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * An allowlist, not a blocklist, and matched against the decoded bytes rather
 * than the filename or the declared type. A file called photo.jpg that is
 * actually an SVG would otherwise be served back as an SVG, and SVG is a
 * scriptable document format — a stored-XSS vector on the site's own origin.
 */
const SIGNATURES: { ext: string; mime: string; test: (b: Buffer) => boolean }[] = [
  { ext: 'jpg', mime: 'image/jpeg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'png', mime: 'image/png',
    test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: 'webp', mime: 'image/webp',
    test: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' &&
                 b.subarray(8, 12).toString('ascii') === 'WEBP' },
  { ext: 'avif', mime: 'image/avif',
    test: (b) => b.subarray(4, 8).toString('ascii') === 'ftyp' &&
                 /avif|avis/.test(b.subarray(8, 12).toString('ascii')) }
];

export default withErrors(async (req: VercelRequest, res: VercelResponse) => {
  assertMethod(req, 'POST');
  assertSameOrigin(req);
  await requireAdmin(req);
  cacheNever(res);

  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  const bucket = process.env['SUPABASE_BUCKET'] || 'recipe-images';

  if (!url || !key) {
    throw new HttpError(
      501,
      'Image upload is not configured. Set SUPABASE_URL and ' +
        'SUPABASE_SERVICE_ROLE_KEY in the Vercel project settings.'
    );
  }

  const payload = body<{ filename?: string; data?: string }>(req);
  const raw = String(payload.data ?? '');
  if (!raw) throw badRequest('No image data received');

  // Accepts a data: URL as well as bare base64, since that is what
  // FileReader.readAsDataURL produces in the browser.
  const base64 = raw.includes(',') ? raw.slice(raw.indexOf(',') + 1) : raw;

  let bytes: Buffer;
  try {
    bytes = Buffer.from(base64, 'base64');
  } catch {
    throw badRequest('Image data is not valid base64');
  }

  if (!bytes.length) throw badRequest('The image is empty');
  if (bytes.length > MAX_BYTES) {
    throw badRequest(
      `That image is ${(bytes.length / 1048576).toFixed(1)} MB. The limit is 8 MB — ` +
        'resize it or export at a lower quality.'
    );
  }

  const kind = SIGNATURES.find((s) => s.test(bytes));
  if (!kind) {
    throw badRequest('That file is not a JPEG, PNG, WebP or AVIF image.');
  }

  /*
   * The stored name is derived, never taken from the client.
   *
   * An attacker-chosen name could contain traversal segments or a second
   * extension. Rebuilding it from a slugified stem plus the extension implied
   * by the *content* removes both, and the random suffix stops one upload
   * silently replacing another.
   */
  const stem = slugify(String(payload.filename ?? '').replace(/\.[^.]+$/, '')) || 'recipe-image';
  const unique = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const objectPath = `${stem}-${unique}.${kind.ext}`;

  const endpoint = `${url.replace(/\/+$/, '')}/storage/v1/object/${bucket}/${objectPath}`;

  const upload = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': kind.mime,
      // Long-lived: the filename carries a unique suffix, so a given URL's
      // bytes never change and it is safe to cache indefinitely.
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
    body: new Uint8Array(bytes)
  });

  if (!upload.ok) {
    const detail = await upload.text().catch(() => '');
    console.error('[upload] storage rejected', upload.status, detail);
    throw new HttpError(
      502,
      upload.status === 404
        ? `The storage bucket "${bucket}" does not exist. Create it in Supabase ` +
          '(Storage → New bucket, public) and try again.'
        : `Storage rejected the upload (${upload.status})`
    );
  }

  json(res, 201, {
    url: `${url.replace(/\/+$/, '')}/storage/v1/object/public/${bucket}/${objectPath}`,
    bytes: bytes.length,
    type: kind.mime
  });
});
