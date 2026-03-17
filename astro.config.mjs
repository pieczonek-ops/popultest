import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  vite: {
    plugins: [tailwind()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': '.',
      },
    },
  },
});
