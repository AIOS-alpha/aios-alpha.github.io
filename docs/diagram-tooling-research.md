# Animated-diagram tooling — research & recommendation

_AIO-90 · Phase 1. Decision record for how AIOS authors animated technical
diagrams on the website (Editorial Minimal, Astro + Starlight)._

**Brief:** Claude-authored, **code-first** technical diagrams embedded in a static
Astro site. Aesthetic: greyscale chrome, Instrument Serif / Instrument Sans +
JetBrains Mono, restrained motion, dual light/dark, must respect
`prefers-reduced-motion`. Not artistic illustration — system architecture, the
closed-loop flywheel, data-flow, integration topology.

## Decision table

Scores: ●●● strong · ●● adequate · ● weak — against (a) Claude authors fully as
code, no GUI; (b) output format + Astro embedding + bundle/perf; (c) editorial
aesthetic fit; (d) build/maintain effort; (e) a11y + `prefers-reduced-motion`.

| Tool | (a) Code-only | (b) Output / embed / perf | (c) Aesthetic fit | (d) Effort | (e) a11y + reduced-motion | Net |
|------|------|------|------|------|------|------|
| **SVG + CSS / JS** (hand-authored inline) | ●●● pure markup/CSS Claude writes directly | ●●● inline SVG in `.astro`/MDX, **zero runtime JS**, SSR-native, ~0 bundle | ●●● total control of stroke/type/greyscale | ●● manual layout per diagram | ●●● `@media (prefers-reduced-motion)` trivial; SVG `<title>`/`role` | **Primary** |
| **GSAP** (+ inline SVG) | ●●● JS timelines, no GUI | ●● runtime lib (~50KB core, tree-shakeable), client island, SSR-safe if guarded | ●●● precise restrained easing | ●● light per-diagram JS | ●●● `gsap.matchMedia()` built-in | **Co-pick (rich live)** |
| **anime.js** | ●●● code-first JS | ●● smaller (v4 ESM, modular) | ●●● fine for restraint | ●● | ●● manual reduced-motion guard | viable GSAP alt |
| **Framer Motion** | ●● code, but React idiom | ● needs a React island (`@astrojs/react` runtime) — heavy for Starlight | ●● | ● drags React in | ●●● `useReducedMotion` | overkill here |
| **D2** | ●●● text→diagram, fully Claude-authorable; animates via `layers`/`scenarios`/`steps` + `--animate-interval` → **animated SVG** | ●● build-time CLI → static animated SVG, inlined; no runtime | ●● themeable but auto-layout "sketch" look fights bespoke type | ●● Go binary build step | ● animated SVG (SMIL) ignores reduced-motion unless gated | **build-time middle tier** |
| **Mermaid** | ●●● text→diagram, Claude-native | ●● static SVG (render at build) | ● generic look, weak editorial fit | ●● | ● **no real animation** (issue #3029 open) | static only — fails "animated" |
| **Motion Canvas** | ●●● TS code-first | ● vector/**video** export; web embed "undocumented", heavyweight; canvas not DOM/SVG | ●● | ● editor-oriented, heavy | ● canvas pixels — no DOM a11y | niche, skip |
| **Remotion** | ●●● React→video, Claude authors components | ●● **pre-rendered MP4/WebM** via `<video>`, zero client JS, but opaque assets + render pipeline | ●● video ≠ crisp vector text at all DPIs | ● render pipeline + **license gate** | ●● `<video>` honours reduced-motion via autoplay gating; no semantic content | **rich sequences only** |
| **Rive** | ● **requires the Rive GUI editor** to author `.riv` | ●● runtime player (`@rive-app/canvas`, WASM) | ●● | ● GUI dependency breaks the workflow | ● canvas; manual reduced-motion | **disqualified (a)** |
| **Lottie** | ● needs After Effects + Bodymovin to produce JSON | ●● `lottie-web` runtime | ●● | ● tooling chain outside code | ● | **disqualified (a)** |

## Verified facts

- **Remotion's free tier is narrow.** Free only for individuals, for-profit orgs
  with **≤ 3 employees**, non-profits, and evaluation; everyone else needs a paid
  company license. AIOS is a multi-founder commercial OSS company — **likely
  outside the free tier**. Budget a company license before using it. [1][2][3]
- **GSAP is now 100% free, all plugins included** (v3.13, Apr 2025, under Webflow)
  — this removes the only prior blocker. It's a free license, not OSS. Reduced
  motion is first-class via `gsap.matchMedia()`. [4][5][6]
- **D2 genuinely animates; Mermaid does not.** D2 exports **animated SVG** from
  multi-board diagrams (`layers`/`scenarios`/`steps`) via `--animate-interval`.
  Mermaid's animation request (#3029) is still open; it ships static SVG. [7][8][9][10]
- **Rive requires its GUI editor** to author `.riv` state machines; the runtime
  only plays them — fails "Claude authors fully as code". [11][12]
- **Motion Canvas** is TS code-first but a canvas renderer aimed at video export;
  web embedding is officially "still undocumented" and canvas gives no DOM a11y. [13]

## Recommendation — hypothesis CONFIRMED, with one refinement

The hypothesis — _"lightweight inline SVG + CSS/JS for loop/flow diagrams;
Remotion only for richer pre-rendered sequences"_ — **holds**. Adopt a tiered
stack:

1. **Primary — hand-authored inline SVG + CSS, GSAP as an optional motion layer.**
   The only approach that nails all five criteria: Claude writes it directly,
   it's SSR-native with effectively zero bundle (pure CSS) or a small guarded
   client island (GSAP), total greyscale/type control, and reduced-motion is one
   media query. Use plain CSS keyframes for the simple loop/flow diagrams; reach
   for GSAP only when a diagram needs orchestrated timelines or SVG morphs.
   **The flywheel prototype (Phase 2) is pure inline SVG + CSS, no JS at all.**

2. **Build-time middle tier — D2** for stepped/architectural diagrams where
   auto-layout saves real effort. Animates to SVG, renders at build, no runtime
   JS. Caveat: its animated SVG uses SMIL and won't auto-honour reduced motion —
   gate it (serve a static board to reduced-motion users) if used.

3. **Rich pre-rendered sequences only — Remotion**, treated as a deliberate,
   **licensed** escalation, never a default. Opaque `<video>`, no vector
   crispness, render-pipeline overhead, and the company license very likely
   applies to AIOS. Reserve for genuinely cinematic explainers inline SVG can't
   express.

**Drop:** Rive + Lottie (GUI/AE authoring fails code-first), Mermaid for anything
animated (static), Motion Canvas (canvas, undocumented embed, no a11y), Framer
Motion (drags React into Starlight for no aesthetic gain over GSAP).

For the AIOS landing diagrams — flywheel, architecture, integration topology —
**tier 1 (inline SVG + CSS) covers everything we need today.** The shared
primitives live in `src/styles/diagrams.css`; see `docs/diagram-system.md`.

## Sources

1. Remotion — License & Pricing: https://www.remotion.dev/docs/license
2. Remotion Pro — Company Licensing: https://www.remotion.pro/license
3. Remotion — `@remotion/licensing`: https://www.remotion.dev/docs/licensing
4. GSAP — Pricing (100% free): https://gsap.com/pricing/
5. GSAP — 3.13 release (all plugins free): https://gsap.com/blog/3-13/
6. GSAP — Standard "No Charge" License: https://gsap.com/community/standard-license/
7. D2 — Animation (blog): https://d2lang.com/blog/animation/
8. D2 — Composition (layers/scenarios/steps): https://d2lang.com/tour/composition/
9. D2 — CLI manual (`--animate-interval`): https://d2lang.com/tour/man/
10. Mermaid — animated-diagram request (open, static): https://github.com/mermaid-js/mermaid/issues/3029
11. Rive — State Machine guide (editor-authored): https://rive.app/blog/how-state-machines-work-in-rive
12. Rive — Controlling Rive files in code (runtime plays editor `.riv`): https://www.youtube.com/watch?v=IvkNSOFLdNg
13. Motion Canvas — browser bundling (embed undocumented): https://github.com/motion-canvas/motion-canvas/issues/443
