#!/usr/bin/env node
// Optimize raw product screenshots into right-sized WebP for the website.
//
// Raw full-resolution captures live in `screenshots-src/` (committed as the
// source of truth). This emits a display-sized `.webp` for each into
// `public/screenshots/` — the format and resolution the site actually needs,
// so the browser downloads ~50-90KB instead of a multi-MB PNG and decodes a
// small bitmap instead of a 2880px one. (A 2880px PNG card was the cause of the
// slow-loading workspace integration shot.)
//
//   npm run optimize:images
//
// Add a screenshot: drop the full-res PNG/JPG in `screenshots-src/`, run the
// command, reference `/screenshots/<name>.webp` in a component, and commit the
// raw + the generated .webp together. Re-run whenever a source changes.
//
// Tune per-image output via OVERRIDES (width is a hard cap — images are never
// upscaled). The default targets ~2x retina for the ~560px card slots the
// screenshots fill on the landing page.

import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'screenshots-src');
const OUT = join(root, 'public/screenshots');

const DEFAULT = { width: 1280, quality: 80 };
// Per-image tuning, keyed by base filename (no extension). Examples:
//   'team-brain-home-light': { width: 1440 },   // a focal hero shot
//   'integrations-light':    { quality: 82 },
const OVERRIDES = {};

const IN_EXT = /\.(png|jpe?g|webp)$/i;

if (!existsSync(SRC)) {
	console.error(`No source dir: ${SRC}\nCreate it and drop raw screenshots in, then re-run.`);
	process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => IN_EXT.test(f));
if (files.length === 0) {
	console.log('No source images in', SRC);
	process.exit(0);
}

let totalIn = 0;
let totalOut = 0;
for (const file of files) {
	const name = parse(file).name;
	const cfg = { ...DEFAULT, ...(OVERRIDES[name] || {}) };
	const inPath = join(SRC, file);
	const outPath = join(OUT, `${name}.webp`);

	const meta = await sharp(inPath).metadata();
	const info = await sharp(inPath)
		.resize({ width: Math.min(cfg.width, meta.width), withoutEnlargement: true })
		.webp({ quality: cfg.quality, effort: 6 })
		.toFile(outPath);

	const inSize = statSync(inPath).size;
	totalIn += inSize;
	totalOut += info.size;
	const pct = Math.round((1 - info.size / inSize) * 100);
	console.log(
		`${name.padEnd(28)} ${meta.width}px → ${info.width}px   ${(inSize / 1024) | 0}KB → ${(info.size / 1024) | 0}KB  (-${pct}%)`,
	);
}
console.log(
	`\nTotal  ${(totalIn / 1024) | 0}KB → ${(totalOut / 1024) | 0}KB  (-${Math.round((1 - totalOut / totalIn) * 100)}%)`,
);
