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

if (watch) {
  const contexts = await Promise.all([
    esbuild.context(browser),
    esbuild.context(generator),
    esbuild.context(smokeTest)
  ]);
  await Promise.all(contexts.map((c) => c.watch()));
  console.log('watching src/ for changes...');
} else {
  const results = await Promise.all([
    esbuild.build(browser),
    esbuild.build(generator),
    esbuild.build(smokeTest)
  ]);
  const errors = results.flatMap((r) => r.errors);
  if (errors.length) process.exit(1);
  console.log('bundled assets/js/kitchenlo.js, .build/build.mjs and .build/smoke-test.mjs');
}
