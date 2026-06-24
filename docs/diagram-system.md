# AIOS diagram system

_How AIOS authors animated technical diagrams for the website. Code-first,
token-driven, dual-mode, Editorial Minimal. Source of the tooling decision:
`docs/diagram-tooling-research.md` (AIO-90 Phase 1)._

**Stack:** hand-authored **inline SVG + CSS** — no runtime JS, no video, no GUI.
Diagrams are `.astro` components that compose the shared primitives in
`src/styles/diagrams.css`. They render server-side, weigh ~nothing, scale at any
DPI, and switch light/dark automatically through the `@aios-alpha/design` tokens.

## Palette — colour is rationed

The chrome is **greyscale**. Colour appears only as the three **prism stops**, and
only to mark the three roles in a loop / the travelling insight:

| Token | Role in diagrams |
|-------|------------------|
| `--aios-violet` | the **individual** (IC / workspace); the travelling insight token |
| `--aios-emerald` | the **collective** (Team Brain) |
| `--aios-accent` (lime) | what's **surfaced / shared** (dashboard, outputs) |
| `--aios-border-strong` | edges / ring (the default hairline) |
| `--aios-border` | faint / secondary edges, frames |
| `--aios-fg` / `-secondary` / `-muted` | node titles / meta / kickers |

Never introduce a hex value — everything resolves from `--aios-*`, so both modes
and any future token change are free. Use `color-mix(in srgb, var(--aios-…) …%, …)`
for tints and glows.

## Primitives (`src/styles/diagrams.css`)

| Class | What it is |
|-------|-----------|
| `.dgm` | diagram root — sets fonts + the `--dgm-*` edge/accent vars |
| `.dgm-frame` / `__bar` / `__dot` / `__title` | window / terminal chrome (titlebar + 3 dots) |
| `.dgm-node` / `__kicker` / `__title` / `__meta` | a labelled node card |
| `.dgm-accent--ic` / `--brain` / `--share` | apply one rationed prism dot to a node |
| `.dgm-svg` | the absolute SVG layer that draws edges behind HTML nodes |
| `.dgm-edge` (`--faint`, `--dashed`) | a hairline connector / ring path |
| `.dgm-token` + `.dgm-token--orbit` | an "insight" travelling a path via `offset-path` |
| `.dgm-pulse` | soft breathing for a loop core / halo |
| `.dgm-flow` | dashed drift along an edge — a direction-of-travel hint |

### The hybrid layout pattern

Nodes are **HTML overlays** (crisp editorial text) positioned by percentage on top
of an **SVG layer** that draws only the ring/edges + the moving token. Because the
container has a fixed `aspect-ratio` matching the SVG `viewBox` and the SVG uses
`preserveAspectRatio="xMidYMid meet"`, an HTML node at `left: 50%; top: 14.4%`
lands exactly on the viewBox point `(500, 81)` of a `1000 × 562` box. This gives
selectable, accessible text **and** smooth vector motion that scales together.

### Motion via `offset-path` (the key trick)

The travelling token is an **SVG element** animated with CSS
`offset-path: path('…')`. On an SVG child, `offset-path` runs in **user units**,
so it scales with the viewBox — unlike a CSS-pixel `offset-path`, which would not
be responsive. Motion is therefore pure CSS (`@keyframes` → `offset-distance: 100%`),
which means `prefers-reduced-motion` can switch it off declaratively.

## Motion rules

- **Subtle and slow.** Loop durations ~11–12s; nothing flashes or bounces.
- **One moment of colour in motion** — the prism token. Everything else is still
  greyscale chrome.
- **Always provide a static fallback.** Every animation sits inside
  `@media (prefers-reduced-motion: reduce)` and resolves to a meaningful frozen
  state (the token parks on an arc; pulses hold at mid-opacity). The diagram must
  read correctly with zero motion.
- **No layout-shifting animation** — animate `offset-distance`, `opacity`,
  `transform`, `stroke-dashoffset` only.

## Accessibility

- Node text is real DOM text (readable, selectable, translatable).
- The SVG layer is decorative: `aria-hidden="true"`.
- Each diagram `<figure>` carries an `aria-labelledby` pointing at an `.sr-only`
  sentence that states the flow in prose (see `Flywheel.astro`).

## Authoring a new diagram

1. New `.astro` in `src/components/landing/diagrams/`; `import '…/styles/diagrams.css'`.
2. Wrap in `<figure class="… dgm" aria-labelledby="…">` + an `.sr-only` summary.
3. Draw edges/ring/token in one `.dgm-svg` (`viewBox` = your aspect box).
4. Place `.dgm-node` cards as `%`-positioned HTML overlays on the viewBox points.
5. Ration colour to `.dgm-accent--*`; keep all chrome greyscale.
6. Put per-diagram layout in the component's scoped `<style>`; reuse primitives.
7. Add a `prefers-reduced-motion` block — verify the static frame reads.

---

## Phase 3 — production plan (remaining assets)

The flywheel (Phase 2) proves tier-1 covers our needs. Remaining placeholders,
mapped to the system. **Order:** screenshots are blocked on real product UI; build
the diagrams first.

| Placeholder (component) | Asset | Approach | Notes |
|---|---|---|---|
| `Hero.astro` — "Team Brain dashboard" | **real screenshot** (4/5) | — | **Blocked:** needs real product UI. Flag, keep `Placeholder`. |
| `Transition.astro` — "Product walkthrough" | **real screenshot/video** (16/9) | — | **Blocked:** real data. Flag, keep `Placeholder`. |
| `HowItWorks.astro` | Flywheel | ✅ done (inline SVG+CSS) | shipped this PR |
| `Integration.astro` ×3 (Workspace / Team Brain / Skill→repo→everyone) | topology diagrams | inline SVG+CSS, shared primitives | hub-and-spoke nodes; reuse `.dgm-node` + `.dgm-edge` + `.dgm-flow` |
| `FeatureGrid.astro` (per-card thumb) | feature thumbnails | small static inline-SVG glyphs on `.dgm-frame` | greyscale, one accent each; motion optional |
| `Vision.astro` (vision-card thumb) | vision thumbnails | same as feature thumbs | keep restrained |
| `Problem.astro` (per-item thumb) | problem thumbnails | small static SVG | greyscale |
| **New** — Transition architecture | **8 organ systems** + Agent workstations | inline SVG+CSS "collective brain" diagram | Knowledge repository · Ingestion · Context management · Action layer · Identity & membership · Policy engine · Audit log · Feedback loop — nodes around a central brain; Agent workstations feeding in. Source: Chetan's deck (AIO-107). |

**Coordinate with AIO-104** (Section/FeatureCard extraction): the `Integration` and
`FeatureGrid` diagrams drop into card-media boxes whose structure that ticket may
refactor — land their layout first, then wire diagrams into the final markup.
