# Screenshots — source of truth

Drop **full-resolution** product screenshots here (PNG/JPG, any size — capture at
2x/retina, don't pre-shrink). The website never serves these directly.

## How it works (automatic — nothing to remember)

`scripts/optimize-screenshots.mjs` turns each raw file in this folder into a
display-sized **WebP** in `public/screenshots/`:

- **1280px-wide cap, quality 80, never upscaled** — the right size for the
  ~560px card slots these fill, so the browser fetches ~40–90KB instead of a
  multi-MB PNG. (A 2880px PNG was the cause of the slow workspace-integration
  shot.)
- The generated `public/screenshots/*.webp` are **git-ignored build artifacts** —
  only the raw files in this folder are committed.

The optimizer runs **automatically on every `npm run dev` and `npm run build`**
(via the `predev` / `prebuild` hooks in `package.json`), and therefore on every
deploy — GitHub Pages (`withastro/action` runs `npm run build`) and Vercel
(`vercel.json` pins the build command to `npm run build`). It's incremental:
a `.webp` that's already newer than its source is skipped.

## Adding a screenshot

1. Drop `my-shot-light.png` (and `my-shot-dark.png`) in this folder.
2. Reference `/screenshots/my-shot-light.webp` from a component
   (the `<Screenshot>` component handles the light/dark swap).
3. Commit the **raw** file(s). The `.webp` is generated at build time — don't
   commit it.

To preview locally without a full build: `npm run optimize:images`.

## Tuning

Per-image overrides live in `OVERRIDES` in `scripts/optimize-screenshots.mjs`
(e.g. a larger `width` for a focal hero shot, or higher `quality`).
