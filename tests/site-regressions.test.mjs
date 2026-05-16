import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "..");
const distDir = path.join(projectRoot, "dist");

function buildSite() {
	execFileSync("npm", ["run", "build"], {
		cwd: projectRoot,
		stdio: "pipe",
	});
}

function readDistFile(relativePath) {
	return readFileSync(path.join(distDir, relativePath), "utf8");
}

test.before(() => {
	buildSite();
});

test("root route builds as a real redirect document", () => {
	const html = readDistFile("index.html");

	assert.match(html, /<html/i);
	assert.doesNotMatch(html, /return Astro\.redirect/);
	assert.match(html, /\/zh\//);
});

test("localized pages render localized html lang and footer links", () => {
	const enHome = readDistFile("en/index.html");
	const zhHome = readDistFile("zh/index.html");

	assert.match(enHome, /<html[^>]*lang="en"/i);
	assert.match(zhHome, /<html[^>]*lang="zh-CN"/i);

	assert.match(enHome, /href="\/en\/about\/"/);
	assert.match(enHome, /href="\/en\/blog\/"/);
	assert.match(enHome, /href="\/en\/thinking\/"/);

	assert.match(zhHome, /href="\/zh\/about\/"/);
	assert.match(zhHome, /href="\/zh\/blog\/"/);
	assert.match(zhHome, /href="\/zh\/thinking\/"/);
});

test("starter theme metadata and dead feed links are removed from rendered pages", () => {
	const enHome = readDistFile("en/index.html");

	assert.doesNotMatch(enHome, /Astro Cactus/);
	assert.doesNotMatch(enHome, /Chris Williams/);
	assert.doesNotMatch(enHome, /href="\/about\/"/);
	assert.doesNotMatch(enHome, /href="\/posts\/"/);
	assert.doesNotMatch(enHome, /href="\/notes\/"/);
	assert.doesNotMatch(enHome, /href="\/rss\.xml"/);
	assert.doesNotMatch(enHome, /href="\/notes\/rss\.xml"/);
});

test("build without SITE_URL does not emit sitemap files with a placeholder domain", () => {
	assert.equal(existsSync(path.join(distDir, "sitemap-0.xml")), false);
	assert.equal(existsSync(path.join(distDir, "sitemap-index.xml")), false);
});
