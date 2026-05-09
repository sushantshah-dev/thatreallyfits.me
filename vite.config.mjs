import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  root: 'frontend',
  base: '/static/react/',
  build: {
    outDir: '../app/static/react',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'frontend/index.html'),
        app: path.resolve(__dirname, 'frontend/app.html'),
        auth: path.resolve(__dirname, 'frontend/auth.html'),
      },
    },
  },
});