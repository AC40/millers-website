// Build-output checks for the digital membership application.
// Run after `pnpm build`:  pnpm test   (uses Node's built-in test runner, no extra deps)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const EMBED_SRC = "https://formular.vereinsplaner.com/embed/1d5e50af-9f7e-4c87-a848-c424788a0567";
const FALLBACK_URL = "https://formular.vereinsplaner.com/1d5e50af-9f7e-4c87-a848-c424788a0567";
const PAGE = new URL("../dist/mitgliedsantrag/index.html", import.meta.url);

function readPage() {
	assert.ok(existsSync(PAGE), "dist/mitgliedsantrag/index.html missing – run `pnpm build` first");
	return readFileSync(PAGE, "utf8");
}

function getIframe(html) {
	const iframes = html.match(/<iframe\b[^>]*>/g) ?? [];
	const iframe = iframes.find((tag) => tag.includes(EMBED_SRC));
	assert.ok(iframe, `no <iframe> with src ${EMBED_SRC}`);
	return iframe;
}

function attr(tag, name) {
	const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
	return m ? m[1] : null;
}

test("page is a real page, not a redirect to the PDF", () => {
	const html = readPage();
	assert.doesNotMatch(html, /location\.replace\(/);
	assert.match(html, /<h1[^>]*>[\s\S]*Mitgliedsantrag[\s\S]*<\/h1>/);
});

test("iframe has the exact src and accessible, privacy-friendly attributes", () => {
	const iframe = getIframe(readPage());
	assert.equal(attr(iframe, "src"), EMBED_SRC);
	assert.ok(attr(iframe, "title")?.trim(), "iframe needs a title");
	assert.equal(attr(iframe, "loading"), "lazy");
	assert.ok(attr(iframe, "referrerpolicy"), "iframe needs a referrerpolicy");
	const sandbox = attr(iframe, "sandbox");
	assert.ok(sandbox, "iframe needs a sandbox attribute");
	for (const token of ["allow-scripts", "allow-forms", "allow-same-origin"]) {
		assert.ok(sandbox.split(/\s+/).includes(token), `sandbox must allow ${token} for the form to work`);
	}
});

test("iframe is only loaded on click (inside a <template>)", () => {
	const html = readPage();
	const templates = html.match(/<template\b[\s\S]*?<\/template>/g) ?? [];
	assert.ok(
		templates.some((t) => t.includes(EMBED_SRC)),
		"iframe must sit inside a <template> so nothing loads from vereinsplaner.com before consent",
	);
	const outside = templates.reduce((acc, t) => acc.replace(t, ""), html);
	assert.doesNotMatch(outside, /<iframe\b/, "no live iframe outside the template");
	assert.match(outside, /<button\b[^>]*>[\s\S]*?<\/button>/, "load button missing");
	assert.match(outside, /vereinsplaner\.com/, "consent note must name vereinsplaner.com");
});

test("external fallback link and PDF stay available without JS", () => {
	const html = readPage();
	const templates = html.match(/<template\b[\s\S]*?<\/template>/g) ?? [];
	const outside = templates.reduce((acc, t) => acc.replace(t, ""), html);
	assert.ok(outside.includes(`href="${FALLBACK_URL}"`), "fallback link missing outside the template");
	assert.ok(outside.includes('href="/mitgliedsantrag.pdf"'), "PDF link missing");
});

test("navigation points to the new page", () => {
	const html = readPage();
	assert.match(html, /href="\/mitgliedsantrag"/);
});
