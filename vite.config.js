import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

// Use import.meta.url to resolve the current directory
const currentDir = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(currentDir, 'index.html'), // Resolve the path dynamically
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[ext]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'global': {} // Avoids issues when global object is referenced
  },
});
