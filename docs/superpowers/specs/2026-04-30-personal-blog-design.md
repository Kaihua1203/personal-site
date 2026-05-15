# Personal Blog — Design Spec

> Status: Approved
> Date: 2026-04-30
> Last Updated: 2026-05-13
> Update Note: Theme direction updated. `Astro Cactus` is now the selected base theme for the initial implementation, and the development path below should be treated as an evolving plan rather than a one-time fixed checklist.

## Change Log

### 2026-05-13

- Confirmed `Astro Cactus` as the initial base theme
- Reframed the implementation path as an evolving plan
- Clarified that theme fidelity is secondary to bilingual structure and content architecture

### 2026-04-30

- Initial personal blog design spec created
- Core stack, content model, page structure, and feature scope defined

## Overview

A bilingual (Chinese/English) personal blog for recording thoughts, learning notes, and other content. Built as a static site with Astro, deployed on Vercel, with the option to add an Agent backend on a self-hosted server in the future.

## Target User Profile

- Python expert, web development beginner
- Goals: learn web development fundamentals while shipping a working blog
- Writes in both Chinese and English

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro | Static site generator with native Markdown support, built-in i18n, fast output. Best fit for content-focused sites with minimal JS. |
| Styling | Tailwind CSS | Utility-first CSS framework. Comes with most Astro themes; enables rapid customization without writing raw CSS from scratch. |
| Content format | Markdown (.md) | Simple, portable, version-controllable. No MDX needed for now. |
| Deployment | Vercel | Free tier, auto-builds on GitHub push, zero server management. |
| Code hosting | GitHub | Version control + Vercel integration trigger. |
| Future Agent backend | Self-hosted server | Separate service, not part of the static blog build. Details TBD. |

## Theme Baseline

**Selected starting theme:** `Astro Cactus`

Reason for selection:

- Close to the desired minimal personal-blog direction, so it reduces early layout work
- Suitable as a base for content-first pages before introducing heavier custom design
- Appropriate for iterative customization: start from a working theme, then gradually adapt navigation, bilingual structure, article pages, and visual language

Implementation stance:

- `Astro Cactus` is the **starting point**, not a hard visual constraint
- Theme structure and reusable components should be kept where they help delivery speed
- Bilingual routing, category structure, and future custom styling take priority over theme fidelity if conflicts appear

## Architecture

```
┌─────────────────────────────────────────────┐
│                  GitHub Repo                │
│  src/content/zh/blog/*.md                   │
│  src/content/en/blog/*.md                   │
│  src/pages/, src/layouts/, src/components/  │
└──────────────┬──────────────────────────────┘
               │ git push
               ▼
┌──────────────────────┐     ┌──────────────────────┐
│       Vercel         │     │   Self-hosted Server  │
│  Astro build → HTML  │     │   (future Agent API)  │
│  Static hosting      │     │   Independent service │
└──────────────────────┘     └──────────────────────┘
```

The blog and Agent backend are fully decoupled. The static blog has no dependency on the Agent server. When Agent features are designed, they will be integrated via an Astro Island (interactive component) that calls the Agent API over HTTP.

## i18n — Bilingual Support

**Approach:** Route-based i18n with URL prefixes.

- Chinese: `/zh/blog/post-slug`
- English: `/en/blog/post-slug`
- Default language: Chinese (`/zh/`)

Each article is written as two separate Markdown files (one per language) in the corresponding content directory. They share the same slug to enable language switching.

**Language switcher:** A toggle button in the global navigation bar. When on a Chinese article page, clicking it navigates to the English version at the same slug (and vice versa). If the translated version doesn't exist, falls back to the article list for that language.

## Content Structure

```
src/content/
├── zh/
│   ├── blog/
│   │   └── my-first-post.md
│   └── thinking/
│       └── some-thought.md
├── en/
│   ├── blog/
│   │   └── my-first-post.md
│   └── thinking/
│       └── some-thought.md
```

### Frontmatter Schema

```yaml
---
title: "文章标题"
date: 2026-04-30
category: "Blog"          # Top-level category (Blog, Thinking, etc.)
tags: ["Python", "学习"]   # Tags within the category
lang: "zh"                # "zh" or "en"
description: "简短描述"    # Used for article list preview and SEO
draft: false              # Added for V1 to easily hide unfinished work without removing files
---
```

### Content Organization

Two-level hierarchy: **Category → Tags**.

- Categories are the top-level sections (e.g., Blog, Thinking) displayed on the homepage
- Tags are used within a category page to filter/group articles
- A category page shows all articles in that category, with tag-based filtering

## Pages

### Homepage

Displays section entry cards for each category:

- About Me → links to the About page
- Blog → links to the Blog category listing
- Thinking → links to the Thinking category listing
- (Additional categories can be added later)

Clean, minimal layout. Not a feed of recent posts — a navigational hub.

### Category Listing Page (`/zh/blog/`, `/en/blog/`, etc.)

- Lists all articles in the category, sorted by date (newest first)
- Tag filter: clickable tags at the top to filter the article list
- Each article entry shows: title, date, tags, description snippet

### Article Page

- Full article content rendered from Markdown
- **Table of Contents (TOC):** Collapsible/toggleable sidebar or top section, generated from headings
- **Previous/Next navigation:** Links to adjacent articles within the same category
- **Meta info:** Publication date + estimated reading time
- **Code blocks:** Syntax highlighting + copy button (built into Astro via Shiki)
- **Images:** Supported, used occasionally

### About Page

- Personal introduction
- Static content, bilingual (separate zh/en versions)

### 404 Page

- Simple fallback page guiding users back to the homepage (`/zh/`).

## Navigation

- **Top navigation bar:** Site logo/name, category links, language switcher, dark/light mode toggle
- **No footer content** (empty footer or no footer element)

## Features

### Included

| Feature | Implementation |
|---------|---------------|
| Dark/light mode toggle | CSS variables + JS toggle, preference saved to localStorage |
| Language switcher | Navigation button, route-based switching between `/zh/` and `/en/` |
| Collapsible TOC | Generated from Markdown headings, toggleable visibility |
| Prev/Next navigation | Links within same category, ordered by date |
| Code syntax highlighting | Astro's built-in Shiki integration |
| Code copy button | Small button on code blocks |
| Date display | From frontmatter, formatted per locale |
| Reading time estimate | Calculated from word count at build time |
| Category → Tag hierarchy | Category pages with tag filtering |
| Image support | Standard Markdown images, Astro image optimization |

### Excluded (for now)

| Feature | Status |
|---------|--------|
| Comment system | Not needed currently |
| Site search | Not needed currently |
| RSS feed | Not needed currently |
| Analytics/statistics | Not needed currently |
| Agent integration | Deferred — see [Agent Integration Spec](2026-04-30-agent-integration-design.md) |
| Footer content | Intentionally empty |

## Visual Style

Direction: **minimal / retro**. Specific palette, typography, and layout details will be defined in the dedicated visual style spec.

→ See [Visual Style Spec](2026-04-30-visual-style-design.md) for the evolving style direction, now anchored on `Astro Cactus` as the initial visual baseline.

The chosen Astro theme will serve as the implementation baseline. Customization will be applied incrementally after the core functionality is working.

## Development Path

1. **Theme selected** — `Astro Cactus` is confirmed as the initial base theme
2. **Theme intake and fit check** — map current theme structure to required pages, content model, and bilingual routing
3. **Configure i18n** — set up route-based bilingual content directories and language switcher
4. **Build core pages** — homepage (section entries), category listing, article page, about page
5. **Add features** — dark/light toggle, collapsible TOC, code highlighting + copy, prev/next nav, reading time
6. **Visual customization** — adapt `Astro Cactus` to the final palette/typography/layout direction instead of redesigning from zero
7. **Deploy** — connect GitHub repo to Vercel, configure build settings
8. **Future** — Agent backend integration when a compelling idea is identified

## Constraints & Assumptions

- The user will write content in Markdown (not MDX)
- Not every article needs a translated version — the language switcher gracefully handles missing translations
- `Astro Cactus` provides a working starting point; heavy custom component development is not in initial scope
- If `Astro Cactus` conflicts with required bilingual information architecture, content structure wins and the theme should be adjusted accordingly
- Visual style details are blocked on user providing reference templates
- Agent features are fully deferred with no timeline
