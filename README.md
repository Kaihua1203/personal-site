# personal-site

This is my personal website, built with [Astro](https://astro.build) and tailored for bilingual writing.

The site currently includes:

- A homepage in `/en/` and `/zh/`
- Blog entries under `src/content/{en,zh}/blog/`
- Thinking entries under `src/content/{en,zh}/thinking/`
- A shared article layout with reading time, TOC, and previous/next navigation
- Search powered by Pagefind
- Light/dark theme switching

## Tech Stack

- Astro 6
- Tailwind CSS 4
- Pagefind
- Biome

## Local Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run check` | Run Astro type checks and Biome checks |
| `npm run lint` | Run Biome with auto-fix enabled |
| `npm run format` | Format the repository with Prettier |
| `npm run postbuild` | Generate the Pagefind search index after build |

## Content

Content is organized with Astro content collections:

- `src/content/en/blog/`
- `src/content/zh/blog/`
- `src/content/en/thinking/`
- `src/content/zh/thinking/`

Shared content schema and collection definitions live in `src/content.config.ts`.

## Configuration

The main site settings are in `src/site.config.ts`, including:

- Site title
- Author
- Default language and locale
- Navigation links
- Date formatting options

## Deployment

This project is configured as a static site. Build output is written to `dist/`.

If you deploy to a static host, run:

```bash
npm run build
```

then publish the generated `dist/` directory.

## License

MIT
