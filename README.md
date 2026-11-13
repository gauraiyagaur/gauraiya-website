# Gauraiya Gaur — Portfolio

Personal portfolio for Gauraiya Gaur, data scientist and multi-agent AI developer.
Built with [TanStack Start](https://tanstack.com/start), React and Tailwind CSS v4,
prerendered to static HTML.

## Updating content

**All text, numbers, projects and skills live in [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Edit that file and the site updates — no component changes needed.
Search for `TODO` to find placeholders still waiting for real content.

- Portrait: replace `public/portrait.jpg`
- CV: replace `public/Gauraiya_Gaur_CV.pdf` (keep the same name, or update `cvUrl`)

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in dist/client
```

## Deploying (free)

**Netlify:** "Add new site → Import from GitHub", pick this repo. Settings are
read from `netlify.toml` (build `npm run build`, publish `dist/client`).
Every push to `main` redeploys.

Vercel and Cloudflare Pages work the same way: build command `npm run build`,
output directory `dist/client`.

## Structure

```
src/
  data/portfolio.ts      ← all site content (typed)
  routes/__root.tsx      ← page shell, SEO / OpenGraph metadata
  routes/index.tsx       ← home page, section order
  components/            ← Header, Hero, KpiStrip, LearningJourney,
                           ProjectsSection, SkillsDirectory, CurrentProjects, Footer
  styles.css             ← design tokens (colours, fonts, buttons)
```
