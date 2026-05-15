# First Version Visual Constraints — Personal Blog

> Status: Draft
> Date: 2026-05-14
> Scope: First implementation pass only

## Purpose

This document defines the executable visual constraints for the first version of the personal blog. It does not replace the broader visual style design. Its job is to keep the initial Astro Cactus implementation visually coherent while avoiding premature custom design work.

## Baseline

Use `Astro Cactus` as the first-version visual baseline.

Implementation rules:

- Keep the theme's core page rhythm, spacing density, dark/light mode behavior, and minimal blog structure unless they conflict with bilingual content.
- Do not redesign the full visual system before the site is running.
- Prefer small, reversible overrides in global CSS or Tailwind theme tokens.
- Bilingual information architecture takes priority over theme fidelity.

## Typography

Astro Cactus defaults the body to Tailwind's `font-mono` class. That is acceptable for the theme's original technical-minimal feel, but it is not the right default for Chinese long-form reading.

First-version typography rules:

- Remove or override the body-level `font-mono` default for article and page text.
- **Zero-overhead system fonts only**: Do NOT self-host or load any web fonts (like `LXGW WenKai Screen`) in the first version. Full Chinese web fonts are massive (4MB-10MB) and require complex subsetting workflows to avoid severe performance penalties (FOUT/FCP issues). We will skip this complexity for V1.
- Use a robust, native system font stack that prioritizes readability without any network requests.
- Use this Chinese-first reading stack for all body copy:

```css
font-family:
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "Noto Sans SC",
  system-ui,
  -apple-system,
  sans-serif;
```

- Apply language-specific typography with `lang` selectors (e.g., `:lang(zh)` and `:lang(en)`) if Astro Cactus makes it easy, otherwise relying on the system font stack fallback is acceptable for V1.
- Keep monospace fonts only for code, inline code, keyboard labels, and deliberately technical UI fragments.
- Headings should use the same reading stack as body text in the first version, with weight and spacing used for hierarchy instead of a separate display font.
- Body text must prioritize comfortable Chinese reading: adequate line height, clear paragraph spacing, and no overly narrow text measure.

Recommended initial reading values:

- Body text: `16px` minimum on desktop and mobile.
- Article line height: around `1.75` for Chinese-heavy posts.
- Article max width: keep close to the theme default unless Chinese paragraphs feel cramped after implementation.

## Color

The first version should remain restrained, readable, and content-first.

Recommended direction:

- Use a neutral light background rather than pure white.
- Use a near-black foreground rather than absolute black.
- Keep accent color low-frequency and functional: links, active navigation, focus states, and small highlights.
- Avoid introducing a broad brand palette before real content exists.

Suggested initial tokens:

```css
:root {
  --color-bg: #f7f4ee;
  --color-surface: #fffaf2;
  --color-text: #26231f;
  --color-muted: #756f66;
  --color-border: #e3d8c8;
  --color-accent: #8a5a2b;
  --color-accent-soft: #efe1cf;
}

:root.dark {
  --color-bg: #151311;
  --color-surface: #1e1a17;
  --color-text: #eee7dc;
  --color-muted: #b8ad9f;
  --color-border: #3a332d;
  --color-accent: #d6a15f;
  --color-accent-soft: #3a2a1a;
}
```

These values are intentionally warm-neutral rather than high-contrast black/white. They are target tokens, not a requirement to create a parallel color system. During implementation, map them onto Astro Cactus's existing CSS variables or Tailwind theme tokens wherever possible. Only introduce new variables when the existing theme tokens cannot express the needed distinction.

Dark-mode selector rule:

- The example uses `:root.dark` only as notation. Use Astro Cactus's actual dark-mode selector during implementation, whether that is `html.dark`, `:root.dark`, `[data-theme="dark"]`, or another theme-defined mechanism.

## Layout

First-version layout rules:

- Preserve Astro Cactus's simple, text-forward layout.
- Keep navigation compact and readable in both Chinese and English.
- Avoid adding heavy hero sections, decorative backgrounds, cards everywhere, or animation-driven layouts in the first pass.
- Homepage may use simple section entries, but should not become a busy feed or portfolio landing page.
- Article pages should optimize reading first: title, metadata, content, TOC, and previous/next navigation should feel calm and predictable.

## Dark And Light Mode

Use the theme's existing dark/light mode mechanism where possible.

Implementation rules:

- Do not replace the mode system unless the theme implementation blocks the required color tokens.
- Both modes must pass a practical readability check on Chinese paragraphs, English paragraphs, code blocks, links, and navigation.
- Key text contrast should meet WCAG AA for normal text: at least 4.5:1 for body text and functional navigation/link text.
- Code block themes may remain the Astro Cactus defaults in the first version if they remain legible.

## Explicit Non-Goals

Do not include these in the first visual pass:

- Full custom brand identity.
- Custom illustration system.
- Multiple accent palettes.
- Complex motion language.
- Separate display font for headings.
- Pixel-perfect visual mockups before the theme is installed.

## Acceptance Criteria

The first visual implementation is acceptable when:

- The site still clearly feels based on Astro Cactus.
- Chinese body text does not render primarily in monospace.
- Chinese article prose uses the self-hosted `LXGW WenKai Screen` font when the font file loads.
- English article prose does not use `LXGW WenKai Screen` as its primary font.
- The checked-in font file exists under `public/fonts/`, the CSS `@font-face` path matches it exactly, and font attribution/license handling is present.
- Light and dark modes are both readable.
- Key body, navigation, and link colors meet at least WCAG AA contrast for normal text.
- Accent color is used consistently and sparingly.
- Visual changes are small enough to remain easy to revert after real content review.
