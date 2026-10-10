#!/usr/bin/env node
import { mkdir, rm, writeFile, copyFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { createManifest } from '../manifest.config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = fileURLToPath(new URL('../dist', import.meta.url));

const argv = process.argv.slice(2);
const watch = argv.includes('--watch');
const modeIdx = argv.indexOf('--mode');
const mode = modeIdx >= 0 ? argv[modeIdx + 1] : watch ? 'development' : 'production';

const CONTENT_SCRIPTS = ['youtube', 'netflix'];

async function main() {
  console.log(`▸ Movie Buff's Rabbit Hole build (${mode}${watch ? ', watch' : ''})`);
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // 1 ─ app (popup, options, service worker)
  await build({
    root,
    mode,
    configFile: fileURLToPath(new URL('../vite.config.ts', import.meta.url)),
    logLevel: 'warn',
    build: { watch: watch ? {} : null },
  });
  console.log('  ✓ popup, options, background');

  // 2 ─ content scripts (IIFE)
  for (const name of CONTENT_SCRIPTS) {
    const entryPath = fileURLToPath(new URL(`../src/content/${name}.ts`, import.meta.url));
    if (existsSync(entryPath)) {
      await build({
        root,
        mode,
        configFile: false,
        publicDir: false,
        logLevel: 'warn',
        build: {
          outDir: `${dist}/content`,
          emptyOutDir: false,
          target: 'es2022',
          minify: mode !== 'development',
          sourcemap: false,
          watch: watch ? {} : null,
          lib: {
            entry: entryPath,
            formats: ['iife'],
            name: `MovieBuff_${name}`,
            fileName: () => `${name}.js`,
          },
        },
      });
    }
  }
  console.log(`  ✓ content scripts (${CONTENT_SCRIPTS.join(', ')})`);

  // 3 ─ copy public icons & assets if exists
  const publicDir = fileURLToPath(new URL('../public', import.meta.url));
  if (existsSync(publicDir)) {
    await cp(publicDir, dist, { recursive: true });
    console.log('  ✓ public assets');
  }

  // 4 ─ manifest
  const manifest = createManifest({ dev: mode === 'development' });
  await writeFile(`${dist}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('  ✓ manifest.json');

  console.log(
    watch
      ? '\nWatching for changes. Reload the extension at chrome://extensions after each rebuild.'
      : `\nDone → ${dist}\nLoad it via chrome://extensions → Developer mode → Load unpacked.`,
  );
}

main().catch((err) => {
  console.error('\n✗ Build failed\n', err);
  process.exit(1);
});
