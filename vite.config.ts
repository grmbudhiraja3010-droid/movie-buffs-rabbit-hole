import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const fromRoot = (rel: string): string => fileURLToPath(new URL(rel, import.meta.url));

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2022',
    sourcemap: mode === 'development',
    minify: mode !== 'development',
    modulePreload: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        popup: fromRoot('popup.html'),
        options: fromRoot('options.html'),
        background: fromRoot('src/background/index.ts'),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'background' ? 'background.js' : 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}));
