import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || '',
          CLARITY_PROJECT_ID: process.env.CLARITY_PROJECT_ID || '',
          PLAUSIBLE_DOMAIN: process.env.PLAUSIBLE_DOMAIN || '',
        },
      },
    }),
  ],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide': ['lucide-react'],
        },
      },
    },
  },
});
