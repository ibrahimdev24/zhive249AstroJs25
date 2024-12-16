import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://zhive249.com',
  base: '/',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  integrations: [
    tailwind(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
    sitemap(),
    robotsTxt()
  ],
  output: 'server',
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro:content'],
          },
        },
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      reportCompressedSize: true,
    },
    ssr: {
      noExternal: ['path-to-regexp'],
    },
    optimizeDeps: {
      exclude: ['node:*'],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
