#!/usr/bin/env node
// Rasterize each animated diagram SVG into a static .webp fallback.
//
// The blog shows the animated SVG (via <picture><source type=svg>); Substack
// and email clients get this .webp (the <img> fallback). Animations are dropped
// in the raster — that's intended; the SVG's static/base state is the snapshot.
//
//   npm run diagrams
//
// Re-run whenever a diagram SVG changes, and commit the .webp alongside it.

import sharp from 'sharp';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(root, 'public/blog/diagrams');
const SCALE = 2; // export at 2x the viewBox width for retina/Substack
const BG = '#ffffff'; // Substack/email render on white; flatten transparency onto it

const svgs = readdirSync(DIR).filter((f) => f.endsWith('.svg'));
if (svgs.length === 0) {
	console.log('No SVGs in', DIR);
	process.exit(0);
}

for (const file of svgs) {
	const svgPath = join(DIR, file);
	const out = svgPath.replace(/\.svg$/, '.webp');
	const svg = readFileSync(svgPath, 'utf8');

	const wm = svg.match(/\bwidth="(\d+(?:\.\d+)?)"/);
	const baseWidth = wm ? Math.round(parseFloat(wm[1])) : 800;
	const targetWidth = baseWidth * SCALE;

	await sharp(Buffer.from(svg), { density: 96 * SCALE })
		.resize({ width: targetWidth })
		.flatten({ background: BG })
		.webp({ quality: 90 })
		.toFile(out);

	console.log(`✓ ${file} → ${file.replace(/\.svg$/, '.webp')} (${targetWidth}px wide)`);
}
