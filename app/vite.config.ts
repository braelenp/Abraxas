import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const processBrowserPath = fileURLToPath(new URL('./node_modules/process/browser.js', import.meta.url));
const cryptoBrowserifyPath = fileURLToPath(new URL('./node_modules/crypto-browserify/index.js', import.meta.url));
const streamBrowserifyPath = fileURLToPath(new URL('./node_modules/stream-browserify/index.js', import.meta.url));
const vmBrowserifyPath = fileURLToPath(new URL('./node_modules/vm-browserify/index.js', import.meta.url));
const utilBrowserPath = fileURLToPath(new URL('./node_modules/util/util.js', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/',
      process: processBrowserPath,
      'process/browser': processBrowserPath,
      'process/browser.js': processBrowserPath,
      crypto: cryptoBrowserifyPath,
      stream: streamBrowserifyPath,
      vm: vmBrowserifyPath,
      util: utilBrowserPath,
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
