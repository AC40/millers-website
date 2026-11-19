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

function outsideTemplates(html) {
	const templates = html.match(/<template\b[\s\S]*?<\/template>/g) ?? [];
	return templates.reduce((acc, t) => acc.replace(t, ""), html);
}

/** Visible text of an HTML fragment, whitespace-normalised. */
function text(fragment) {
	return fragment
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();
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
	const outside = outsideTemplates(html);
	assert.doesNotMatch(outside, /<iframe\b/, "no live iframe outside the template");
});

test("placeholder is short: one sentence and a 'Formular öffnen' button", () => {
	const outside = outsideTemplates(readPage());
	const buttons = [...outside.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
	const load = buttons.find(([, , inner]) => text(inner) === "Formular öffnen");
	assert.ok(load, "no <button> labelled exactly 'Formular öffnen'");
	assert.match(load[1], /\btype="button"/, "load button must be type=button");
	assert.match(load[1], /\bhidden\b/, "load button must be hidden until JS runs");
	assert.match(load[1], /focus-visible:ring/, "load button needs a visible focus ring");
	assert.ok(
		text(outside).includes("Das Formular wird von Vereinsplaner bereitgestellt."),
		"short intro sentence missing",
	);
});

test("privacy disclosure sits in a <details> and keeps the required content", () => {
	const outside = outsideTemplates(readPage());
	const details = outside.match(/<details\b[\s\S]*?<\/details>/g) ?? [];
	const privacy = details.find((d) => /<summary\b[^>]*>[\s\S]*?Datenschutz[\s\S]*?<\/summary>/.test(d));
	assert.ok(privacy, "no <details> with a <summary> mentioning Datenschutz");
	const body = text(privacy);
	assert.ok(body.includes("formular.vereinsplaner.com"), "details must name formular.vereinsplaner.com");
	assert.ok(body.includes("IP-Adresse"), "details must mention the IP address transfer");
	assert.ok(body.includes("Cookies"), "details must mention cookies");
	assert.ok(privacy.includes('href="/datenschutz"'), "details must link to /datenschutz");
});

test("external fallback link and PDF stay available without JS", () => {
	const html = readPage();
	const outside = outsideTemplates(html);
	const fallback = (outside.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? []).find((a) =>
		a.includes(`href="${FALLBACK_URL}"`),
	);
	assert.ok(fallback, "fallback link missing outside the template");
	assert.equal(text(fallback), "Formular in neuem Tab öffnen", "fallback label must differ from the button");
	assert.ok(outside.includes('href="/mitgliedsantrag.pdf"'), "PDF link missing");
});

test("navigation points to the new page", () => {
	const html = readPage();
	assert.match(html, /href="\/mitgliedsantrag"/);
});
