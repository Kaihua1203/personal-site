# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Astro routes, including localized pages under `[lang]`
- `src/components/`: shared UI components
- `src/layouts/`: page layouts such as `Base.astro` and `BlogPost.astro`
- `src/content/`: bilingual content in `en/` and `zh/`, split into `blog/` and `thinking/`
- `src/styles/`: global and component styles
- `src/utils/` and `src/plugins/`: shared helpers and custom remark plugins
- `public/`: static assets
- `tests/`: regression tests

Examples:

- New post: `src/content/en/blog/my-post.md`
- Navigation update: `src/components/layout/Header.astro`
- Site config: `src/site.config.ts`

## Build, Test, and Development Commands
- `pnpm dev`: start the local dev server
- `pnpm build`: build the site into `dist/`
- `pnpm preview`: preview the built site
- `pnpm check`: run Astro and Biome checks
- `pnpm lint`: run Biome with auto-fixes
- `pnpm format`: run Prettier
- `pnpm test`: run the Node test suite

Recommended flow:

```bash
pnpm check
pnpm test
pnpm build
```

## Coding Style & Naming Conventions
- Use tabs for indentation and keep Biome formatting intact.
- Use ES modules, semicolons, and the `@/` import alias for `src/*`.
- Name Astro components in PascalCase, such as `ThemeToggle.astro`.
- Keep content under the matching language folder, for example `src/content/zh/thinking/`.
- Follow Astro route naming for dynamic files like `[lang]` and `[slug]`.

## Testing Guidelines
- Tests use Node’s built-in runner via `node:test`.
- Add tests in `tests/` with the `*.test.mjs` pattern.
- Prefer regression tests for routing, localization, metadata, and build output.
- For changes affecting rendered pages, run `pnpm build && pnpm test`.

## Commit & Pull Request Guidelines
- Use conventional commits with short, imperative subjects:
  - Prefer the format: `<type>: <short imperative summary>`.
  - Examples: `feat: revise chapter 2 framing`, `docs: annotate content review findings`, `fix: handle empty lits directory`.
- When Codex completes any meaningful `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, or similar change, it should create a dedicated commit for that unit of work after scope-appropriate verification when applicable. Push when the work is ready for delivery, review, or handoff; do not leave completed Codex work uncommitted without a clear reason.
- Never include unrelated local changes in a Codex commit. Stage and commit only the files that belong to the current Codex task.

## Notes
- Do not edit `dist/` by hand.
- Do not commit secrets or local environment values.
- Respect existing uncommitted user changes and avoid reverting unrelated work.
