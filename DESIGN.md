---
version: alpha
name: AIOS Design System
description: Design system for the AIOS open-source AI transformation toolkit. Sibling to vibrana.ai — same foundations, shifted to violet/lime.
colors:
  background: "#050505"
  surface: "#0a0a0a"
  surface-elevated: "#141414"
  muted: "#1a1a1a"
  border: "#ffffff1a"
  border-visible: "#ffffff26"
  foreground: "#fafafa"
  muted-foreground: "#ffffff80"
  primary: "#8b5cf6"
  primary-hover: "#7c3aed"
  primary-foreground: "#000000"
  accent: "#84cc16"
  accent-foreground: "#000000"
  destructive: "#ef4444"
  destructive-foreground: "#fafafa"
  label-color: "#84cc16"
  link-color: "#a78bfa"
  code-bg: "#0a0a0a"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2.5rem + 2.5vw, 5rem)"
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: "-0.03em"
  heading-1:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 2rem + 2.5vw, 4rem)"
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  heading-2:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)"
    fontWeight: "600"
    lineHeight: "1.15"
    letterSpacing: "-0.02em"
  heading-3:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2rem)"
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)"
    fontWeight: "400"
    lineHeight: "1.7"
    letterSpacing: "0"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.15rem)"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  small:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)"
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: "0.1em"
  code:
    fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0"
rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "14px"
  2xl: "20px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
  32: "128px"
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.primary-foreground}"
    borderRadius: "{rounded.md}"
    paddingX: "{spacing.5}"
    paddingY: "10px"
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
    fontWeight: "600"
    letterSpacing: "0.02em"
  button-secondary:
    background: "transparent"
    color: "{colors.foreground}"
    border: "1px solid {colors.border-visible}"
    borderRadius: "{rounded.md}"
    paddingX: "{spacing.5}"
    paddingY: "10px"
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
    fontWeight: "600"
    letterSpacing: "0.02em"
  button-ghost:
    background: "transparent"
    color: "{colors.muted-foreground}"
    borderRadius: "{rounded.md}"
    paddingX: "{spacing.4}"
    paddingY: "8px"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
    fontWeight: "500"
  card:
    background: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.6}"
  card-elevated:
    background: "{colors.surface-elevated}"
    border: "1px solid {colors.border-visible}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.6}"
  code-block:
    background: "{colors.code-bg}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.6}"
    fontFamily: "{typography.code.fontFamily}"
  badge:
    background: "rgba(139, 92, 246, 0.12)"
    color: "{colors.primary}"
    borderRadius: "{rounded.full}"
    paddingX: "{spacing.3}"
    paddingY: "{spacing.1}"
    fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)"
    fontWeight: "600"
    letterSpacing: "0.1em"
  input:
    background: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.md}"
    color: "{colors.foreground}"
    paddingX: "{spacing.4}"
    paddingY: "10px"
    fontSize: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)"
effects:
  glow-violet: "0 0 60px rgba(139, 92, 246, 0.3)"
  glow-lime: "0 0 60px rgba(132, 204, 22, 0.3)"
  glow-emerald: "0 0 60px rgba(16, 185, 129, 0.3)"
  glow-amber: "0 0 60px rgba(251, 191, 36, 0.3)"
gradients:
  primary: "linear-gradient(135deg, #8b5cf6 0%, #84cc16 100%)"
  accent: "linear-gradient(135deg, #84cc16 0%, #10b981 100%)"
  prism: "linear-gradient(135deg, #8b5cf6 0%, #10b981 50%, #84cc16 100%)"
  text-glow: "linear-gradient(135deg, #a78bfa 0%, #84cc16 100%)"
---

## Overview

AIOS is an open-source sibling to Vibrana — built from real-world AI transformation work, released to the community so any team can run it. The design system is deliberately aligned with vibrana.ai: same foundations, same type system, same dark palette and glow language. What shifts is the primary color, which moves from Vibrana's amber to AIOS's violet, and the accent from emerald to lime.

The relationship should be immediately legible to anyone who knows Vibrana. A visitor coming from vibrana.ai should feel "this is part of the same world" in the first three seconds. A developer landing on AIOS cold should feel "this is a serious, polished tool" — not a hackathon side project or an academic repo.

**Personality traits:**
- Structured and precise (spine, tiers, brain-api contract)
- Practitioner-built (real engagement, real team, now open-sourced)
- Developer-first (code is visual content, CLI is first-class)
- Ecosystem-native (clearly related to Vibrana, not a standalone orphan)
- Quietly confident (minimal, no noise — the work speaks through structure)

**Emotional response:** "This came from people who actually ran this at scale. It's part of something larger. I can trust this and build on it."

**Relationship to vibrana.ai:**
- Same: backgrounds, border system, font stack, fluid type scale, glow effect style, spacing grid
- Shifted: primary amber → violet `#8b5cf6`; accent emerald → lime `#84cc16`
- Connecting gradient: Vibrana's prism runs amber→lime→emerald; AIOS's prism runs violet→emerald→lime — they share the middle and tail, creating visual continuity across the ecosystem

---

## Colors

The palette inherits Vibrana's near-zero-black foundation. `#050505` is the canonical background — not pure black, but so dark the difference is imperceptible until surfaces stack against it.

**Primary — Violet `#8b5cf6`:** The brand color that distinguishes AIOS within the Vibrana ecosystem. Violet is already encoded in Vibrana's `--glow-purple` variable, so it reads as a family member, not a stranger. In design culture, violet signals intelligence, systems-thinking, and technical depth — appropriate for an AI operating system. Use on: primary CTA buttons, active nav states, badge text, section accent lines.

**Accent — Lime `#84cc16`:** The live/active color. Lime signals output, generation, building — it's the color of a terminal cursor blinking, of a process running. In Vibrana it appears in the prism gradient tail and `--glow-lime`. Use on: label text above section headings, checkmark icons, code highlighting for key terms, active status dots.

**Prism gradient** (`{gradients.prism}`): violet → emerald → lime. This deliberately shares emerald and lime with Vibrana's amber → lime → emerald prism, creating a visual handshake between the two products. Use for: hero text glow (blurred pseudo-element behind the headline), section dividers, diagram arrows, decorative line accents.

**Text gradient** (`{gradients.text-glow}`): violet → lime. Used only for the wordmark and for pull-quote display text. Never on body copy.

**Border system:** `{colors.border}` is `rgba(255, 255, 255, 0.1)` — white at 10% opacity. `{colors.border-visible}` is 15% opacity. These are identical to Vibrana's borders. Borders in this system are about separation, not decoration — they should be barely perceptible.

**Muted foreground** `rgba(255, 255, 255, 0.5)`: Labels, metadata, captions. Not for long reading — only for orienting text.

**Contrast compliance:** `{colors.primary}` on `{colors.background}` yields approximately 7:1 — WCAG AAA. Lime `{colors.accent}` on `{colors.background}` yields approximately 10:1. Both are safe at all sizes. Muted foreground at 50% white on `#050505` yields approximately 4.6:1 — just passes AA, use only for short labels.

---

## Typography

Directly mirrors the Vibrana font stack.

**Space Grotesk** — all display and heading sizes. A geometric sans-serif with humanist touches and slightly unusual letterforms (especially the lowercase `a` and `s`). The slight quirk in Space Grotesk prevents large headings from feeling generic. Self-host via `@fontsource/space-grotesk`.

**Plus Jakarta Sans** — all body and UI copy. Clean, highly legible at text sizes, with a slightly warmer feel than Inter. The pairing with Space Grotesk works because Jakarta Sans is neutral where Space Grotesk is expressive — one carries personality, the other carries information. Self-host via `@fontsource/plus-jakarta-sans`.

**JetBrains Mono** — all code. Identical to Vibrana's code font. JetBrains Mono has superior legibility at small sizes compared to most alternatives, with distinct forms for ambiguous characters. Self-host via `@fontsource/jetbrains-mono`.

**Type scale:** Fluid clamp values that scale smoothly between viewport widths without breakpoint jumps. The scale uses `0.25vw` for small steps and `2.5vw` for display sizes — the same formula as Vibrana's `--asmt-text-*` variables. Do not override these with fixed `px` values in components — the fluid system is a core shared characteristic.

**Tracking and leading:** Negative letter-spacing tightens at display sizes (`-0.03em` for display, `-0.01em` for heading-3). Line-height loosens for body (`1.7` for body-lg, `1.5` for body) and tightens for headings (`1.1` for display). These ratios match Vibrana's `--asmt-leading-*` and `--asmt-tracking-*` values.

---

## Layout

12-column grid. Max content width: `1200px` with `24px` gutters on mobile, `48px` on tablet, `80px` on desktop. Full-bleed backgrounds extend edge-to-edge.

**Vertical spacing:** Base unit `4px`. Section separation `80px` desktop / `48px` mobile. Card padding `24px`.

**Section cadence** mirrors Vibrana's pattern of alternating stat-heavy sections and narrative sections:
1. Hero — full viewport height, centered content
2. Client/proof strip — slim, full-bleed, low contrast logos
3. Stat cluster — three large numbers side by side (Vibrana's `20 / 100+ / $50–250k` pattern)
4. "This is for you if" — bulleted qualifier list
5. "After 12 weeks" / "After deployment" — outcome list with lime checkmarks
6. How it works — named phases or modes
7. Quick-start code block
8. CTA section — centered, full-bleed with prism glow
9. Footer

---

## Elevation & Depth

Borders, not shadows. This is a Vibrana-wide principle. The border color is already low-contrast; elevation is shown by stepping surface colors up (`#050505` → `#0a0a0a` → `#141414`) and by using more visible border values (`border` vs `border-visible`).

**Glow effects** are the primary form of visual drama. The `--glow-violet` and `--glow-lime` effects (60px blur, 30% opacity) replicate Vibrana's glow system. Use them to: accent CTA buttons from below, light up active diagram nodes, and create ambient depth in the hero.

**Glass nav:** `backdrop-filter: blur(12px)` with `background: rgba(5, 5, 5, 0.85)` on the sticky navigation. Same technique as Vibrana.

**No drop shadows on cards.** If a card needs to stand out, use `{colors.border-visible}` on hover instead of adding a shadow.

---

## Shapes

**Radius philosophy:** Identical to Vibrana — slightly rounded, never soft. This is a professional tool, not a consumer product. The radius scale carries the same values.

- `{rounded.sm}` (4px) — inline code chips, tiny badges
- `{rounded.md}` (6px) — buttons, inputs
- `{rounded.lg}` (10px) — code blocks, terminal windows
- `{rounded.xl}` (14px) — cards, info boxes
- `{rounded.2xl}` (20px) — modal containers, hero glass panels
- `{rounded.full}` — avatar chips, pill labels only

---

## Components

**Primary Button:** Violet background `{colors.primary}`, black text. On hover: `{colors.primary-hover}` (#7c3aed). Add `box-shadow: 0 0 20px rgba(139, 92, 246, 0.4)` on hover — a contained violet glow, not a hard shadow. Matches Vibrana's amber button glow behavior.

**Secondary Button:** Transparent with `{colors.border-visible}` border. On hover: `background: rgba(255,255,255,0.04)`. Same as Vibrana's outlined button.

**Stat display** (large number + label): Space Grotesk `heading-1` for the number, label-size Plus Jakarta Sans in `{colors.label-color}` (lime) for the descriptor. This matches the `20 / JOB FUNCTIONS WITH DEDICATED CURRICULA` pattern on vibrana.ai.

**Label/eyebrow:** Uppercase, `{typography.label}` size, `{colors.label-color}` (lime), letter-spacing `0.1em`. Placed above section headings. Identical treatment to Vibrana's section labels.

**Feature list with checkmarks:** Lime `✓` icon (Lucide `Check`) at 16px, `{colors.accent}` color, aligned with `body` text. Same visual pattern as Vibrana's outcome lists.

**Code Block:** `{colors.code-bg}` background (same as Vibrana's card bg). Header bar with filename in `{typography.label}`, a lime status dot for active, gray for static. Copy button fades in on hover.

**Navigation:** Identical to Vibrana — logo left, nav center, CTA right. Use `AIOS` wordmark (all-caps, Space Grotesk, with a small violet glow on the logo mark). The green glow on Vibrana's logo shifts to violet on AIOS.

---

## Do's and Don'ts

**Do:**
- Match Vibrana's section patterns: stat cluster, qualifier list, outcome list — the structure creates ecosystem coherence
- Use the prism gradient for ambient hero glow (blurred, behind headline text — not applied directly to text)
- Place lime `{colors.label-color}` labels above headings in every major section, exactly as Vibrana does
- Self-host all three fonts (Space Grotesk, Plus Jakarta Sans, JetBrains Mono) — no Google Fonts CDN
- Use the same fluid clamp type scale — never hardcode `px` sizes for text
- Use the glow effects system for interactive states and hero ambient lighting
- Show real CLI commands in code blocks — `aios push --tier team`, not placeholder lorem

**Don't:**
- Don't use amber (`#fbbf24`) or Vibrana's primary color — it's their territory, not AIOS's
- Don't use white or light backgrounds on any element
- Don't add decorative illustrations, abstract shapes, or AI imagery (brains, circuits) — Vibrana doesn't, AIOS doesn't
- Don't use Inter or Geist — Space Grotesk and Plus Jakarta Sans are the ecosystem fonts
- Don't break the clamp type scale with fixed sizes
- Don't add shadows to cards — borders only
- Don't use more than two accent colors per section (violet + lime is the pair; emerald appears only in gradients)
- Don't apply the prism gradient directly to button text — it reads as generic SaaS styling
