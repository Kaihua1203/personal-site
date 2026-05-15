# i18n Restructure & Visual Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Astro Cactus template to support route-based bilingual content (`zh/` and `en/`), establish the `blog` and `thinking` categories, and apply the initial visual constraints (typography and color).

**Architecture:** Use Astro's native `i18n` configuration to handle `/zh/` and `/en/` routing. Refactor `src/content/` to use a language-first folder structure. Create two collections: `blog` and `thinking`. Apply the specified reading font stack and color variables in `src/styles/global.css`.

**Tech Stack:** Astro 6, Tailwind CSS (v4), TypeScript, Zod.

---

### Task 1: Create Content Directories and Base Markdown Files

**Files:**
- Create: `src/content/zh/blog/first-blog.md`
- Create: `src/content/zh/thinking/first-thought.md`
- Create: `src/content/en/blog/first-blog.md`
- Create: `src/content/en/thinking/first-thought.md`

- [ ] **Step 1: Create Chinese Blog Post**

```bash
mkdir -p src/content/zh/blog src/content/zh/thinking src/content/en/blog src/content/en/thinking
```

```markdown
---
title: "我的第一篇博客"
date: 2026-05-16
category: "Blog"
tags: ["Test"]
lang: "zh"
description: "这是第一篇博客的测试文章。"
draft: false
---

这是中文博客页面的内容。
```
*(Write this to `src/content/zh/blog/first-blog.md`)*

- [ ] **Step 2: Create Chinese Thinking Post**

```markdown
---
title: "第一个想法"
date: 2026-05-16
category: "Thinking"
tags: ["Idea"]
lang: "zh"
description: "一些思考的记录。"
draft: false
---

这是随想分类下的内容。
```
*(Write this to `src/content/zh/thinking/first-thought.md`)*

- [ ] **Step 3: Create English Blog Post**

```markdown
---
title: "My First Blog Post"
date: 2026-05-16
category: "Blog"
tags: ["Test"]
lang: "en"
description: "This is a test post for the first blog."
draft: false
---

This is the content of the English blog page.
```
*(Write this to `src/content/en/blog/first-blog.md`)*

- [ ] **Step 4: Create English Thinking Post**

```markdown
---
title: "First Thought"
date: 2026-05-16
category: "Thinking"
tags: ["Idea"]
lang: "en"
description: "A record of some thoughts."
draft: false
---

This is content under the thinking category.
```
*(Write this to `src/content/en/thinking/first-thought.md`)*

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: setup initial bilingual content directories and test posts"
```

---

### Task 2: Update Content Collections Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Rewrite content.config.ts**

Update the collections to match the new structure (`blog` and `thinking`) and adjust the schemas to reflect the spec.

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(60),
	date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
	category: z.string(),
	tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
	lang: z.enum(["zh", "en"]),
	description: z.string(),
	draft: z.boolean().default(false),
});

const blog = defineCollection({
	loader: glob({ base: "./src/content", pattern: "*/blog/**/*.{md,mdx}" }),
	schema: baseSchema,
});

const thinking = defineCollection({
	loader: glob({ base: "./src/content", pattern: "*/thinking/**/*.{md,mdx}" }),
	schema: baseSchema,
});

export const collections = { blog, thinking };
```

- [ ] **Step 2: Commit**

```bash
git add src/content.config.ts
git commit -m "refactor: update content collections for blog and thinking categories"
```

---

### Task 3: Configure Astro i18n

**Files:**
- Modify: `astro.config.ts`

- [ ] **Step 1: Add i18n config to Astro**

Update `astro.config.ts` to include the `i18n` property right below the `site` property.

Run a script or manually edit to insert:
```typescript
	i18n: {
		defaultLocale: "zh",
		locales: ["zh", "en"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
```

*(Be careful to insert it into the `defineConfig` object properly)*

- [ ] **Step 2: Verify Build (Failure expected on pages due to collection change)**

```bash
pnpm run build
```
*Note: We expect the build to fail here because the pages are still querying the old `post` and `note` collections. We will fix that in the next tasks.*

- [ ] **Step 3: Commit**

```bash
git add astro.config.ts
git commit -m "chore: enable astro i18n routing"
```

---

### Task 4: Apply Visual Constraints (Typography & Color)

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update Global CSS Variables**

Replace the `:root` and `:root[data-theme='dark']` variables in `src/styles/global.css` to match the design spec.
Also, apply the Chinese reading system font stack to the body.

Add this font configuration to `src/styles/global.css` (or override the tailwind utilities):
```css
@theme {
  --font-sans: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
}

:root {
  --color-bg: #f7f4ee;
  --color-surface: #fffaf2;
  --color-text: #26231f;
  --color-muted: #756f66;
  --color-border: #e3d8c8;
  --color-accent: #8a5a2b;
  --color-accent-soft: #efe1cf;
  
  --theme-bg: var(--color-bg);
  --theme-text: var(--color-text);
  --theme-link: var(--color-accent);
  --theme-accent: var(--color-accent);
  --theme-accent-2: var(--color-accent-soft);
  --theme-quote: var(--color-border);
}

:root[data-theme='dark'] {
  --color-bg: #151311;
  --color-surface: #1e1a17;
  --color-text: #eee7dc;
  --color-muted: #b8ad9f;
  --color-border: #3a332d;
  --color-accent: #d6a15f;
  --color-accent-soft: #3a2a1a;
  
  --theme-bg: var(--color-bg);
  --theme-text: var(--color-text);
  --theme-link: var(--color-accent);
  --theme-accent: var(--color-accent);
  --theme-accent-2: var(--color-accent-soft);
  --theme-quote: var(--color-border);
}

body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "style: apply initial typography and color constraints"
```

---

*(Note: The restructuring of `src/pages/` to fully support `/zh/` and `/en/` and querying the new `blog` and `thinking` collections requires a significant teardown of the Cactus theme's routing. This will be handled in a separate, dedicated "Routing & Pages Implementation Plan" to keep tasks bite-sized.)*
