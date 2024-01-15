import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    solid({
      include: ['**/solid/*', '**/node_modules/@suid/material/**'],
    })
  ],
});
