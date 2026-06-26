#!/usr/bin/env node
// Cross-post helper: prep a published blog post for Substack distribution.
//
// Substack has no public publishing API, so the reliable path is its built-in
// URL importer. This script does the automatable half: pick the post, compute
// its canonical URL from `site` in astro.config.mjs, copy that URL to the
// clipboard, and print the exact steps. Run AFTER the post is live.
//
//   npm run crosspost            # newest post
//   npm run crosspost <slug>     # a specific post
//   npm run crosspost <slug> -- --open   # also open the URLs in the browser
//
// Optional: set SUBSTACK_IMPORT_URL to your publication's import page
// (e.g. https://yourpub.substack.com/publish/import) to deep-link step 1.

import { readFileSync, readdirSync } from 'node:fs';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(root, 'src/content/blog');

function siteUrl() {
	const cfg = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
	const m = cfg.match(/site:\s*['"]([^'"]+)['"]/);
	return (m ? m[1] : 'https://getaios.dev').replace(/\/$/, '');
}

function frontmatter(file) {
	const src = readFileSync(join(BLOG_DIR, file), 'utf8');
	const block = src.match(/^---\n([\s\S]*?)\n---/);
	const out = {};
	if (block) {
		for (const line of block[1].split('\n')) {
			const m = line.match(/^(\w+):\s*(.*)$/);
			if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
		}
	}
	return out;
}

const args = process.argv.slice(2);
const wanted = args.find((a) => !a.startsWith('--'));
const posts = readdirSync(BLOG_DIR).filter(
	(f) => /\.mdx?$/.test(f) && !f.startsWith('_'),
);

let file;
if (wanted) {
	const slug = wanted.replace(/\.mdx?$/, '');
	file = posts.find((f) => f.replace(/\.mdx?$/, '') === slug);
	if (!file) {
		console.error(
			`No post "${slug}". Available: ${posts
				.map((f) => f.replace(/\.mdx?$/, ''))
				.join(', ')}`,
		);
		process.exit(1);
	}
} else {
	// newest by pubDate (ISO strings sort lexically)
	file = posts
		.map((f) => ({ f, date: frontmatter(f).pubDate || '' }))
		.sort((a, b) => (a.date < b.date ? 1 : -1))[0]?.f;
	if (!file) {
		console.error('No posts found in src/content/blog.');
		process.exit(1);
	}
}

const slug = file.replace(/\.mdx?$/, '');
const fm = frontmatter(file);
const site = siteUrl();
const url = `${site}/blog/${slug}/`;
const importUrl = process.env.SUBSTACK_IMPORT_URL;

let copied = true;
try {
	execSync('pbcopy', { input: url });
} catch {
	/* clipboard is best-effort */
	copied = false;
}

console.log(`
Cross-post → Substack: ${fm.title || slug}

  Canonical URL : ${url}   ${copied ? '(copied to clipboard)' : '(copy manually)'}
  RSS feed      : ${site}/rss.xml

On Substack:
  1. Import the post by URL:
     Settings → Import/Export → "Import posts" → paste the URL above.
     ${importUrl ? `Direct: ${importUrl}` : '(set SUBSTACK_IMPORT_URL to deep-link this step)'}
  2. Substack pulls in the title, prose, and images. Interactive embeds do not
     carry over — expected; the blog stays the canonical, interactive version.
  3. In the post's settings, set "Canonical URL" to the URL above so search
     engines credit the blog, not the Substack copy.
  4. Review and publish.
`);

if (args.includes('--open')) {
	const open = (u) => {
		try {
			execFileSync('open', [u]);
		} catch {
			/* macOS only */
		}
	};
	open(url);
	if (importUrl) open(importUrl);
}
