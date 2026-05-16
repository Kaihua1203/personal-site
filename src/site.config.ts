import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export type SiteLanguage = "en" | "zh";

function normalizeSiteUrl(value: string | undefined) {
	if (!value) return undefined;
	return new URL(value).href;
}

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);

export const siteConfig: SiteConfig = {
	...(siteUrl ? { url: siteUrl } : {}),
	title: "Personal Site",
	author: "Site Owner",
	description: "A bilingual personal website in Chinese and English.",
	lang: "zh-CN",
	ogLocale: "zh_CN",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
};

export function getSiteLanguage(pathname: string): SiteLanguage {
	return pathname.startsWith("/en") ? "en" : "zh";
}

export function getHtmlLang(lang: SiteLanguage) {
	return lang === "en" ? "en" : "zh-CN";
}

export function getMenuLinks(lang: SiteLanguage): { path: string; title: string }[] {
	if (lang === "en") {
		return [
			{ path: "/en/", title: "Home" },
			{ path: "/en/blog/", title: "Blog" },
			{ path: "/en/thinking/", title: "Thinking" },
			{ path: "/en/about/", title: "About" },
		];
	}

	return [
		{ path: "/zh/", title: "首页" },
		{ path: "/zh/blog/", title: "博客" },
		{ path: "/zh/thinking/", title: "随想" },
		{ path: "/zh/about/", title: "关于我" },
	];
}

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
