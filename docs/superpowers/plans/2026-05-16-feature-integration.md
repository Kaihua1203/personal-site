# Feature Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the remaining required features from the design spec: dynamic multilingual navigation, language switcher, TOC, code highlighting/copy, and Prev/Next navigation.

**Architecture:** We will modify the `Header.astro` component to render dynamic links and a language switcher based on the current URL. We will refactor the existing `BlogPost.astro` layout to support our new `blog` and `thinking` collections and apply it to our article detail pages, which will bring back the TOC and Masthead. Finally, we'll calculate prev/next posts and pass them to the layout.

**Tech Stack:** Astro 6, TypeScript.

---

### Task 1: Update Header Navigation and Language Switcher

**Files:**
- Modify: `src/components/layout/Header.astro`

- [ ] **Step 1: Replace static menu links with dynamic multilingual links**

In `src/components/layout/Header.astro`, remove the import of `menuLinks` from `@/site.config`. 
Determine the current language from `Astro.url.pathname` (starts with `/en/` ? 'en' : 'zh').
Create a dynamic `navLinks` array based on the language.
Add a Language Switcher link next to the ThemeToggle.

```astro
---
import Search from "@/components/Search.astro";
import ThemeToggle from "@/components/ThemeToggle.astro";
import { siteConfig } from "../../site.config";

const url = new URL(Astro.request.url);
const isEn = url.pathname.startsWith('/en');
const currentLang = isEn ? 'en' : 'zh';
const targetLang = isEn ? 'zh' : 'en';

// Replace current lang prefix with target lang prefix
const switcherPath = url.pathname.replace(`/${currentLang}`, `/${targetLang}`);

const navLinks = isEn ? [
	{ path: "/en/", title: "Home" },
	{ path: "/en/blog/", title: "Blog" },
	{ path: "/en/thinking/", title: "Thinking" },
	{ path: "/en/about/", title: "About" },
] : [
	{ path: "/zh/", title: "首页" },
	{ path: "/zh/blog/", title: "博客" },
	{ path: "/zh/thinking/", title: "随想" },
	{ path: "/zh/about/", title: "关于我" },
];
---
```

Update the HTML navigation loop to use `navLinks`:
```astro
		<nav
			aria-label="Main menu"
			class="bg-global-bg absolute -inset-x-4 top-12 hidden flex-col divide-y px-2 py-4 group-[.menu-open]:z-50 group-[.menu-open]:flex sm:static sm:z-auto sm:-ms-4 sm:mt-1 sm:flex sm:flex-row sm:divide-x sm:divide-y-0 sm:bg-transparent sm:p-0"
			id="navigation-menu"
		>
			{
				navLinks.map((link) => (
					<a
						aria-current={Astro.url.pathname === link.path ? "page" : false}
						class="text-accent px-2 py-4 font-semibold sm:px-4 sm:py-0 sm:underline-offset-2 sm:hover:underline"
						href={link.path}
					>
						{link.title}
					</a>
				))
			}
		</nav>
```

Add the language switcher right before `<Search />`:
```astro
	<a href={switcherPath} class="text-accent mx-2 font-semibold hover:underline">
		{isEn ? "中文" : "EN"}
	</a>
	<Search />
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.astro
git commit -m "feat: add dynamic multilingual navigation and language switcher"
```

---

### Task 2: Refactor BlogPost Layout for New Collections

**Files:**
- Modify: `src/layouts/BlogPost.astro`

- [ ] **Step 1: Update Props and Date Handling**

In `src/layouts/BlogPost.astro`, the layout currently expects a `CollectionEntry<"post">` and extracts `updatedDate` and `publishDate`. Our new collections are `blog` and `thinking`, and they only have a `date` field.

Update the frontmatter section:
```astro
---
import { type CollectionEntry, render } from "astro:content";

import Masthead from "@/components/blog/Masthead.astro";
import TOC from "@/components/blog/TOC.astro";

import BaseLayout from "./Base.astro";

interface Props {
	post: CollectionEntry<"blog"> | CollectionEntry<"thinking">;
	prev?: CollectionEntry<"blog"> | CollectionEntry<"thinking"> | null;
	next?: CollectionEntry<"blog"> | CollectionEntry<"thinking"> | null;
}

const { post, prev, next } = Astro.props;
const { title, description, date } = post.data;
const articleDate = date.toISOString();
const { headings, remarkPluginFrontmatter } = await render(post);
const readingTime: string = remarkPluginFrontmatter.readingTime;
const isEn = post.data.lang === "en";
---
```
*(Also remove the `WebMentions` import and its component `<WebMentions />` from the HTML below to simplify).*

- [ ] **Step 2: Add Prev/Next Links**

Below the `<slot />` inside the article, add the Prev/Next navigation:
```astro
			<div
				class="prose prose-sm prose-headings:font-semibold prose-headings:text-accent-2 prose-headings:before:absolute prose-headings:before:-ms-4 prose-headings:before:text-muted prose-headings:hover:before:text-accent sm:prose-headings:before:content-['#'] sm:prose-th:before:content-none"
			>
				<slot />
				
				<div class="mt-8 flex justify-between border-t border-border pt-4">
					{prev ? (
						<a href={`/${prev.data.lang}/${post.collection}/${prev.id.split('/').pop()}/`} class="cactus-link">
							&larr; {isEn ? "Previous" : "上一篇"}
						</a>
					) : <span></span>}
					{next ? (
						<a href={`/${next.data.lang}/${post.collection}/${next.id.split('/').pop()}/`} class="cactus-link">
							{isEn ? "Next" : "下一篇"} &rarr;
						</a>
					) : <span></span>}
				</div>
			</div>
```

- [ ] **Step 3: Update Masthead**

Modify `src/components/blog/Masthead.astro` to handle the new `date` property.
Change `interface Props` to accept the new collections:
```astro
---
import type { CollectionEntry } from "astro:content";
import FormattedDate from "@/components/FormattedDate.astro";

interface Props {
	content: CollectionEntry<"blog"> | CollectionEntry<"thinking">;
	readingTime: string;
}

const {
	content: { data },
	readingTime,
} = Astro.props;

const isEn = data.lang === "en";
---

{
	data.draft ? (
		<span class="text-base text-red-500">({isEn ? 'Draft' : '草稿'})</span>
	) : null
}
<h1 class="title">
	{data.title}
</h1>
<div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
	<p class="font-semibold">
		<FormattedDate date={data.date} />
	</p>
	<span class="text-muted">·</span>
	<span class="text-muted">{readingTime}</span>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BlogPost.astro src/components/blog/Masthead.astro
git commit -m "refactor: update BlogPost layout and Masthead for new collections"
```

---

### Task 3: Apply BlogPost Layout to Article Pages

**Files:**
- Modify: `src/pages/[lang]/blog/[slug].astro`
- Modify: `src/pages/[lang]/thinking/[slug].astro`

- [ ] **Step 1: Calculate Prev/Next and Render with BlogPost in Blog Pages**

Update `src/pages/[lang]/blog/[slug].astro`:
```astro
---
import { getCollection, render } from "astro:content";
import BlogPost from "@/layouts/BlogPost.astro";

export async function getStaticPaths() {
	const posts = await getCollection("blog", (post) => !post.data.draft);
	
	// Sort by date descending
	posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	return posts.map((post, index) => {
		const lang = post.data.lang;
		const slug = post.id.split('/').pop();
		
		// Determine previous and next posts (filtering by language)
		const sameLangPosts = posts.filter(p => p.data.lang === lang);
		const langIndex = sameLangPosts.findIndex(p => p.id === post.id);
		
		const next = langIndex > 0 ? sameLangPosts[langIndex - 1] : null; // Newer post
		const prev = langIndex < sameLangPosts.length - 1 ? sameLangPosts[langIndex + 1] : null; // Older post

		return {
			params: { lang, slug },
			props: { post, prev, next },
		};
	});
}

const { post, prev, next } = Astro.props;
const { Content } = await render(post);
---

<BlogPost post={post} prev={prev} next={next}>
	<Content />
</BlogPost>
```

- [ ] **Step 2: Calculate Prev/Next and Render with BlogPost in Thinking Pages**

Update `src/pages/[lang]/thinking/[slug].astro`:
```astro
---
import { getCollection, render } from "astro:content";
import BlogPost from "@/layouts/BlogPost.astro";

export async function getStaticPaths() {
	const posts = await getCollection("thinking", (post) => !post.data.draft);
	
	// Sort by date descending
	posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	return posts.map((post, index) => {
		const lang = post.data.lang;
		const slug = post.id.split('/').pop();
		
		// Determine previous and next posts (filtering by language)
		const sameLangPosts = posts.filter(p => p.data.lang === lang);
		const langIndex = sameLangPosts.findIndex(p => p.id === post.id);
		
		const next = langIndex > 0 ? sameLangPosts[langIndex - 1] : null; // Newer post
		const prev = langIndex < sameLangPosts.length - 1 ? sameLangPosts[langIndex + 1] : null; // Older post

		return {
			params: { lang, slug },
			props: { post, prev, next },
		};
	});
}

const { post, prev, next } = Astro.props;
const { Content } = await render(post);
---

<BlogPost post={post} prev={prev} next={next}>
	<Content />
</BlogPost>
```

- [ ] **Step 3: Verify Build**

Run `pnpm run build` to ensure the new dynamic props and references to `<BlogPost>` compile successfully.

- [ ] **Step 4: Commit**

```bash
git add src/pages/\[lang\]/blog/\[slug\].astro src/pages/\[lang\]/thinking/\[slug\].astro
git commit -m "feat: integrate BlogPost layout with TOC, reading time, and pagination"
```
