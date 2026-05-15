# Routing & Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the new page structure and routing for the bilingual blog.

**Architecture:** Use Astro's dynamic routing (`src/pages/[lang]/...`) to render the pages for both `zh` and `en`. Delete the old `Astro Cactus` specific demo pages and components that we no longer need. Use `getCollection('blog')` and `getCollection('thinking')` filtering by `lang`.

**Tech Stack:** Astro 6, TypeScript.

---

### Task 1: Clean up legacy pages and components

**Files:**
- Delete: `src/pages/index.astro`
- Delete: `src/pages/about.astro`
- Delete: `src/pages/posts/`
- Delete: `src/pages/notes/`
- Delete: `src/pages/tags/`
- Delete: `src/pages/rss.xml.ts`
- Delete: `src/data/post.ts`

- [ ] **Step 1: Remove old page files and directories**

```bash
rm -rf src/pages/index.astro src/pages/about.astro src/pages/posts/ src/pages/notes/ src/pages/tags/ src/pages/rss.xml.ts src/data/post.ts
```

- [ ] **Step 2: Commit**

```bash
git add -A src/pages src/data
git commit -m "refactor: remove legacy astro cactus pages"
```

---

### Task 2: Create root redirect and 404

**Files:**
- Create: `src/pages/index.astro`
- Modify: `src/pages/404.astro`

- [ ] **Step 1: Create a root redirect to `/zh/`**

Create `src/pages/index.astro`:
```astro
---
return Astro.redirect('/zh/');
---
```

- [ ] **Step 2: Update 404.astro**

Modify `src/pages/404.astro` to guide users back to `/zh/`:
```astro
---
import PageLayout from "@/layouts/Base.astro";

const meta = {
	description: "Oops! It looks like this page is lost in space!",
	title: "Oops! You found a missing page!",
};
---

<PageLayout meta={meta}>
	<h1 class="title mb-6">404 | Oops something went wrong</h1>
	<p class="mb-8">Please use the navigation to find your way back</p>
	<a href="/zh/" class="cactus-link">Take me home</a>
</PageLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro src/pages/404.astro
git commit -m "feat: setup root redirect and update 404 page"
```

---

### Task 3: Build the multilingual Homepage and About Page

**Files:**
- Create: `src/pages/[lang]/index.astro`
- Create: `src/pages/[lang]/about.astro`

- [ ] **Step 1: Create `src/pages/[lang]/index.astro`**

```astro
---
import PageLayout from "@/layouts/Base.astro";

export function getStaticPaths() {
	return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

const { lang } = Astro.params;
const isZh = lang === "zh";

const title = isZh ? "首页" : "Home";
const desc = isZh ? "欢迎来到我的个人博客。" : "Welcome to my personal blog.";
---

<PageLayout meta={{ title, description: desc }}>
	<section>
		<h1 class="title mb-6">{title}</h1>
		<p class="mb-4">{desc}</p>
		<ul class="space-y-4">
			<li><a href={`/${lang}/blog/`} class="cactus-link">{isZh ? '博客 (Blog)' : 'Blog'}</a></li>
			<li><a href={`/${lang}/thinking/`} class="cactus-link">{isZh ? '随想 (Thinking)' : 'Thinking'}</a></li>
			<li><a href={`/${lang}/about/`} class="cactus-link">{isZh ? '关于我 (About)' : 'About'}</a></li>
		</ul>
	</section>
</PageLayout>
```

- [ ] **Step 2: Create `src/pages/[lang]/about.astro`**

```astro
---
import PageLayout from "@/layouts/Base.astro";

export function getStaticPaths() {
	return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

const { lang } = Astro.params;
const isZh = lang === "zh";

const title = isZh ? "关于我" : "About Me";
---

<PageLayout meta={{ title }}>
	<section>
		<h1 class="title mb-6">{title}</h1>
		<p class="mb-4">
			{isZh ? "这里是关于页面的内容。Python 专家，Web 开发初学者。" : "This is the about page. Python expert, Web dev beginner."}
		</p>
	</section>
</PageLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/\[lang\]/
git commit -m "feat: add multilingual homepage and about page"
```

---

### Task 4: Build the Blog and Thinking List Pages

**Files:**
- Create: `src/pages/[lang]/blog/index.astro`
- Create: `src/pages/[lang]/thinking/index.astro`

- [ ] **Step 1: Create `src/pages/[lang]/blog/index.astro`**

```astro
---
import { getCollection } from "astro:content";
import PageLayout from "@/layouts/Base.astro";
import FormattedDate from "@/components/FormattedDate.astro";

export function getStaticPaths() {
	return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

const { lang } = Astro.params;
const isZh = lang === "zh";
const title = isZh ? "博客" : "Blog";

const allPosts = await getCollection("blog", (post) => post.data.lang === lang && !post.data.draft);
allPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<PageLayout meta={{ title }}>
	<section>
		<h1 class="title mb-6">{title}</h1>
		<ul class="space-y-4">
			{allPosts.map(post => (
				<li>
					<FormattedDate date={post.data.date} />
					<a href={`/${lang}/blog/${post.id.split('/').pop()}/`} class="cactus-link block ml-4">{post.data.title}</a>
				</li>
			))}
		</ul>
	</section>
</PageLayout>
```

- [ ] **Step 2: Create `src/pages/[lang]/thinking/index.astro`**

```astro
---
import { getCollection } from "astro:content";
import PageLayout from "@/layouts/Base.astro";
import FormattedDate from "@/components/FormattedDate.astro";

export function getStaticPaths() {
	return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

const { lang } = Astro.params;
const isZh = lang === "zh";
const title = isZh ? "随想" : "Thinking";

const allThoughts = await getCollection("thinking", (post) => post.data.lang === lang && !post.data.draft);
allThoughts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<PageLayout meta={{ title }}>
	<section>
		<h1 class="title mb-6">{title}</h1>
		<ul class="space-y-4">
			{allThoughts.map(post => (
				<li>
					<FormattedDate date={post.data.date} />
					<a href={`/${lang}/thinking/${post.id.split('/').pop()}/`} class="cactus-link block ml-4">{post.data.title}</a>
				</li>
			))}
		</ul>
	</section>
</PageLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/\[lang\]/blog/index.astro src/pages/\[lang\]/thinking/index.astro
git commit -m "feat: add multilingual blog and thinking list pages"
```

---

### Task 5: Build the Article Detail Pages

**Files:**
- Create: `src/pages/[lang]/blog/[slug].astro`
- Create: `src/pages/[lang]/thinking/[slug].astro`

- [ ] **Step 1: Create `src/pages/[lang]/blog/[slug].astro`**

```astro
---
import { getCollection, render } from "astro:content";
import PageLayout from "@/layouts/Base.astro";
import FormattedDate from "@/components/FormattedDate.astro";

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	return posts.map((post) => {
		const lang = post.data.lang;
		const slug = post.id.split('/').pop();
		return {
			params: { lang, slug },
			props: { post },
		};
	});
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<PageLayout meta={{ title: post.data.title, description: post.data.description }}>
	<article class="prose prose-cactus mt-8">
		<h1 class="title mb-4">{post.data.title}</h1>
		<p class="text-muted mb-8"><FormattedDate date={post.data.date} /></p>
		<Content />
	</article>
</PageLayout>
```

- [ ] **Step 2: Create `src/pages/[lang]/thinking/[slug].astro`**

```astro
---
import { getCollection, render } from "astro:content";
import PageLayout from "@/layouts/Base.astro";
import FormattedDate from "@/components/FormattedDate.astro";

export async function getStaticPaths() {
	const thoughts = await getCollection("thinking");
	return thoughts.map((post) => {
		const lang = post.data.lang;
		const slug = post.id.split('/').pop();
		return {
			params: { lang, slug },
			props: { post },
		};
	});
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<PageLayout meta={{ title: post.data.title, description: post.data.description }}>
	<article class="prose prose-cactus mt-8">
		<h1 class="title mb-4">{post.data.title}</h1>
		<p class="text-muted mb-8"><FormattedDate date={post.data.date} /></p>
		<Content />
	</article>
</PageLayout>
```

- [ ] **Step 3: Verify Build**

Run `pnpm run build` and ensure it completes successfully without errors about missing collections.

- [ ] **Step 4: Commit**

```bash
git add src/pages/\[lang\]/blog/\[slug\].astro src/pages/\[lang\]/thinking/\[slug\].astro
git commit -m "feat: add multilingual article detail pages"
```
