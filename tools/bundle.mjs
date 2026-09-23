/**
 * Compiles the TypeScript sources.
 *
 *   1. Bundles src/browser/main.ts into assets/js/kitchenlo.js, the single
 *      script every generated page loads.
 *   2. Bundles tools/build.ts into .build/build.mjs so Node can run the
 *      generator without a TypeScript loader.
 *
 * esbuild strips types but does not check them. `npm run typecheck` runs tsc
 * for that, and `npm run build` does both.
 *
 * Usage: node tools/bundle.mjs [--watch]
 */
import * as esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const shared = {
  bundle: true,
  logLevel: 'warning',
  absWorkingDir: ROOT
};

const browser = {
  ...shared,
  entryPoints: ['src/browser/main.ts'],
  outfile: 'assets/js/kitchenlo.js',
  // IIFE keeps it loadable with a plain <script defer>, no module attribute
  // and no extra request waterfall.
  format: 'iife',
  platform: 'browser',
  target: ['es2020', 'chrome91', 'firefox90', 'safari15'],
  minify: true,
  sourcemap: true,
  legalComments: 'none'
};

/*
 * The admin dashboard, bundled separately from the public site.
 *
 * Keeping it out of kitchenlo.js is the point: visitors never download the
 * editor, and the editor never inherits the public bundle's recipe payload.
 * It is also never referenced by a generated page — only admin/index.html
 * loads it — so it stays out of the critical path entirely.
 */
const admin = {
  ...shared,
  entryPoints: ['src/admin/main.ts'],
  outfile: 'assets/js/admin.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020', 'chrome91', 'firefox90', 'safari15'],
  minify: true,
  sourcemap: true,
  legalComments: 'none'
};

const generator = {
  ...shared,
  entryPoints: ['tools/build.ts'],
  outfile: '.build/build.mjs',
  format: 'esm',
  platform: 'node',
  target: 'node20',
  // Nothing outside src/ and tools/ is imported, so there is nothing to mark
  // external; bundling keeps the generator a single self-contained file.
  packages: 'external'
};

const smokeTest = {
  ...shared,
  entryPoints: ['tools/smoke-test.mjs'],
  outfile: '.build/smoke-test.mjs',
  format: 'esm',
  platform: 'node',
  target: 'node20',
  packages: 'external'
};

/*
 * The content tools. Same treatment as the generator: bundled to plain ESM so
 * they run under a bare `node` with no TypeScript loader, and with `postgres`
 * left external so the driver is resolved from node_modules at runtime.
 */
const nodeTools = ['tools/migrate.ts', 'tools/pull.ts'].map((entry) => ({
  ...shared,
  entryPoints: [entry],
  outfile: `.build/${path.basename(entry, '.ts')}.mjs`,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  packages: 'external'
}));

if (watch) {
  const contexts = await Promise.all(
    [browser, generator, smokeTest, admin, ...nodeTools].map((c) => esbuild.context(c))
  );
  await Promise.all(contexts.map((c) => c.watch()));
  console.log('watching src/ for changes...');
} else {
  const results = await Promise.all(
    [browser, generator, smokeTest, admin, ...nodeTools].map((c) => esbuild.build(c))
  );
  const errors = results.flatMap((r) => r.errors);
  if (errors.length) process.exit(1);
  console.log(
    'bundled assets/js/kitchenlo.js, assets/js/admin.js, .build/build.mjs,\n' +
      '         .build/smoke-test.mjs, .build/migrate.mjs and .build/pull.mjs'
  );
}
