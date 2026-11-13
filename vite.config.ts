import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Prerender every page to static HTML so the site can be hosted for free
    // on GitHub Pages, Netlify, Vercel or Cloudflare Pages.
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Only render HTML pages; leave static files (CV, images) untouched.
        filter: ({ path }) => !/\.[a-z0-9]+$/i.test(path),
      },
    }),
    viteReact(),
  ],
})
