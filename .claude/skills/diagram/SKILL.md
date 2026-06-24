---
name: diagram
description: Author a clean, on-brand concept diagram for the AIOS website (Astro inline SVG + CSS, token-driven, dual-mode, animated). Use when asked to "make/fix a diagram", "draw a concept diagram", "illustrate how X works", or when a diagram looks messy/misaligned/overflowing. Encodes the single-SVG pattern that keeps labels from drifting, overflowing, or colliding.
---

# AIOS concept diagrams

You are authoring (or fixing) a technical concept diagram for the AIOS website.
Output is an Astro component of **hand-authored inline SVG + CSS** — no runtime
JS, no canvas, no diagram library. It renders server-side, scales at any DPI, and
switches light/dark for free through the `@aios-alpha/design` tokens.

Canonical reference to read first and mirror:
`src/components/landing/diagrams/InfoFlow.astro`. Shared primitives + tokens:
`src/styles/diagrams.css`. Deep notes: `docs/diagram-system.md`.

## Default to single-SVG (it's what prevents the mess)

There are two valid patterns in the repo. **Unless you have a specific reason,
author in single-SVG** — it is the one that does not drift.

- **Single-SVG (default).** Boxes are `<rect>`, labels are `<text>`, connectors are
  `<path>`/`<line>`, moving dots are `<circle>` — all in one `viewBox`. One
  coordinate space, so alignment is **deterministic**: a label centred on a box
  edge stays centred no matter what the text says. Reference: `InfoFlow.astro`.
- **HTML-overlay hybrid (exception).** Node cards are real HTML (`.dgm-node`)
  positioned by `%` over an SVG that draws only edges/token. Buys selectable,
  translatable editorial text; good for **dense hub-and-spoke** layouts. Reference:
  `CollectiveBrain.astro`. **Do not introduce this for a new diagram unless that
  editorial-text payoff is the point** — it keeps text and edges in two coordinate
  systems synced by hand, so it drifts (clipped labels, overflowing titles, labels
  on arrows) the moment text length, font metrics, or a coordinate changes.

If you are an agent and unsure, or the labels sit in tight corridors: **single-SVG.**
The early InfoFlow mess came from running the hybrid in a layout that didn't suit
it — not from the hybrid being categorically wrong. Never migrate an existing,
working diagram between patterns without being asked.

## Geometry as data — define once, derive the rest

Put node geometry in the component frontmatter as a small data structure, then
compute every label position and edge endpoint from it. Hand-typed magic numbers
for each label are the thing to avoid.

```astro
---
const VB = { w: 1040, h: 620 };
const N = {
  workspace: { x: 48, y: 188, w: 208, h: 112, accent: 'ic',
    title: ['Your workspace'], meta: ['0-context … 5-personal', '· tiered'] },
  // …
};
const cx = (n) => n.x + n.w / 2;   const cy     = (n) => n.y + n.h / 2;
const right = (n) => n.x + n.w;    const bottom = (n) => n.y + n.h;
---
<text x={cx(N.workspace)} y={cy(N.workspace)} text-anchor="middle">…</text>
<line x1={right(N.workspace)} y1={cy(N.workspace)} x2={N.guards.x} y2={cy(N.workspace)} marker-end="url(#arrow)" />
```

A connector that goes `box edge → box edge` and a label centred via
`text-anchor="middle"` on `cx(node)` can never drift off the box.

## Colour is rationed (chrome stays greyscale)

Never write a hex value — resolve everything from `--aios-*` so both modes are
free. Use `color-mix(in srgb, var(--aios-…) N%, …)` for tints/glows.

| Token | Role in a diagram |
|-------|-------------------|
| `--aios-violet` | the individual / your workspace · the travelling token |
| `--aios-emerald` | the collective / Team Brain |
| `--aios-accent` (lime) | what is surfaced / shared |
| `--aios-cyan` | policy-governed actions |
| `--aios-border-strong` | edges, arrows, governance boundaries (default hairline) |
| `--aios-border` | faint frames / zone outlines |
| `--aios-fg` / `-secondary` / `-muted` | titles / meta / labels |

Chrome (frames, edges, the boundary wall, guards) stays greyscale — authority
comes from structure, not hue. Give a node at most **one** accent dot; when a
group repeats a role, move the colour to a legend instead of every card.

## Text fits the box — SVG `<text>` does not wrap

There is no auto-wrap. You must split long strings into multiple `<text>` lines
yourself and size the box to hold them. Rough fit check before you commit a line:
**mono ≈ 0.6 × font-size per char; serif ≈ 0.5 ×.** A 200px-wide box with ~16px of
padding holds ~30 mono chars at 11px. If a title is wider than its box, either
widen the box in the data or break it across two lines (see `brain-api` /
`contract` in InfoFlow).

- Titles: `--aios-font-display` (Instrument Serif), ~21px, centred.
- Meta / labels / kickers: `--aios-font-mono` (JetBrains Mono), 10–13px.
- Centre with `text-anchor="middle"` on `cx(node)`; keep edge labels in the open
  corridors between boxes, not over them.

## Motion (keep it, but make it safe)

Animate **only** `offset-distance`, `opacity`, `transform`, `stroke-dashoffset` —
never anything that reflows. A travelling token is a `<circle>` with
`offset-path: path('M…')`; on an SVG child the path runs in user units so it
scales with the viewBox. Keep loops slow (~11s), one moment of colour in motion.

Always add a `@media (prefers-reduced-motion: reduce)` block that freezes every
animation on a **meaningful** frame (token parked past the boundary, blocked token
at the wall, pulses held mid-opacity). The diagram must read with zero motion.

## Accessibility

- Wrap in `<figure class="… dgm" aria-labelledby="…">` with an `.sr-only`
  sentence that states the flow in prose.
- The SVG is decorative chrome: `aria-hidden="true"` (the prose caption carries
  the meaning, since SVG `<text>` is not a clean reading order).

## Procedure

1. Read `InfoFlow.astro` and copy its skeleton (defs/marker, gradient, frames,
   nodes loop, motion, reduced-motion block, `.sr-only`).
2. Write the story in one sentence first → that becomes the `.sr-only` caption and
   decides the columns/lanes.
3. Lay out node geometry as data on the grid. Keep the main flow on one `MID_Y`.
4. Derive connectors and labels from the geometry. Ration colour to accents.
5. Split any text that exceeds its box; verify the fit heuristic.
6. Add motion + the reduced-motion freeze.
7. **Verify visually**: run `npm run dev`, screenshot the diagram element in BOTH
   modes, and check the punch-list below. Do not declare done from code alone.

## Punch-list (the failures to scan the screenshot for)

- [ ] No text clipped by the viewBox edge or a frame line.
- [ ] No title or meta overflowing its box.
- [ ] No label overlapping another label, a box, or an arrowhead.
- [ ] Boxes aligned on the grid; the main flow shares one baseline.
- [ ] Accent dots clear of the title; colour rationed (chrome greyscale).
- [ ] Light mode and dark mode both read correctly.
- [ ] Reduced-motion frame is meaningful (test by forcing the media query).
