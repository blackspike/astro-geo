import { defineConfig } from 'astro/config';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  experimental: {
    serverIslands: true,
  },

  output: 'server',
  adapter: netlify(),
});