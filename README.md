# devnotes — developer cheat-sheet MVP

A Next.js App Router starter for a searchable developer reference library. Includes 10 sample cheat sheets, fuzzy search, responsive layout, theme toggle, individual SEO-friendly pages, and copy-to-clipboard code blocks.

## Requirements
- Node.js 20.9+ (use the current supported Node.js LTS release)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production check

```bash
npm run lint
npm run build
npm start
```

## Type checking

```bash
npm run typecheck
```

## GitHub and Vercel deployment

The app is a standard Next.js deployment and does not require a separately managed server. Set `SITE_URL` in the Vercel project to your actual canonical production origin, including `https://` and with no path. It is used for canonical links, Open Graph metadata, and the sitemap. No other environment variables are required.

Before pushing, review and commit only the intended files:

```bash
git status --short
git diff --check
git diff
git add <reviewed-files>
git commit -m "Prepare production deployment"
git push origin <your-branch>
```

Do not commit `.env` files or secret values. The repository ignores `.env`, `.env.*`, `.next`, `node_modules`, `.vercel`, and common build output. Set `SITE_URL` in Vercel's project settings instead of committing a production value.

Vercel checklist:

1. Push the reviewed commit to GitHub, then import that repository in Vercel.
2. Keep the detected Next.js framework and repository root settings unless the project is moved into a subdirectory.
3. Add `SITE_URL` under **Settings → Environment Variables** for Production (and Preview if desired), then redeploy after changing it.
4. Confirm the production build succeeds and check `/`, `/cheatsheets/<published-slug>`, `/learning-paths/<published-slug>`, `/tools`, `/sitemap.xml`, and `/robots.txt` on the deployment.
5. Confirm unknown cheat-sheet and learning-path slugs return the site's not-found page.

GitHub/Vercel deployment is not performed by these local checks; the push and project import are manual steps.

## Project structure

```text
src/
  app/
    cheatsheets/[slug]/page.tsx  # individual cheat-sheet routes
    globals.css                 # responsive design system
    layout.tsx                  # root layout and metadata
    page.tsx                    # homepage
  components/
    CopyButton.tsx
    SearchBox.tsx
    SiteHeader.tsx
    ThemeToggle.tsx
  data/
    cheatsheets.ts              # typed content source for the 10 guides
```

## Add or edit content
Update `src/data/cheatsheets.ts`. Each item needs a unique `slug`, title, description, category, color, tags, and snippets. Each snippet has a title, description, language, and code string. New entries automatically appear in the homepage, search index, and static route generation.

## MVP notes
- Search is client-side and indexes titles, descriptions, tags, snippet titles, descriptions, and code.
- Code blocks use Shiki for language-aware syntax highlighting.
- Category filters work on the homepage.
- The GitHub link is a placeholder.
- No user account or database is needed for this initial content-first release.
