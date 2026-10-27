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
