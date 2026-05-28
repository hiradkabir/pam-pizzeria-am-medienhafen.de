---
version: "1.0"
generated: "2026-05-29"
project: "Pizzeria am Medienhafen"
register: brand

colors:
  - name: Ember
    hex: "#DC2626"
    role: primary
    usage: Primary CTA buttons, mobile FAB — the single activating red
  - name: Crust
    hex: "#C05E35"
    role: accent
    usage: Ghost button borders, scrollbar thumb, gold dividers, nav wordmark
  - name: Amber
    hex: "#D9895A"
    role: accent
    usage: Ghost button hover, price figures, secondary warm highlights
  - name: Dough
    hex: "#FEF2F2"
    role: surface
    usage: High-contrast body text and headings on dark backgrounds
  - name: Linen
    hex: "#F5E6D0"
    role: surface
    usage: Secondary text, warm tints, muted labels on dark surfaces
  - name: Smoke
    hex: "#0D0500"
    role: text
    usage: Deepest dark — page background, maximum-contrast base
  - name: Char
    hex: "#1A0A00"
    role: surface
    usage: Primary dark surface — hero overlays, scrolled nav background
  - name: Soot
    hex: "#2D1200"
    role: surface
    usage: Secondary dark surface — card fills, contact section panels
  - name: Ash
    hex: "#C4A882"
    role: muted
    usage: Menu descriptions, allergen codes, subdued secondary text

typography:
  scale:
    - name: display-hero
      size: "clamp(3.6rem, 9vw, 8rem)"
      weight: 700
      family: "Bodoni Moda"
      style: italic
      lineHeight: 1.0
    - name: display-section
      size: "clamp(2.4rem, 5vw, 4rem)"
      weight: 600
      family: "Bodoni Moda"
      style: italic
      lineHeight: 1.1
    - name: label-caps
      size: "0.6875rem"
      weight: 500
      family: "Jost"
      letterSpacing: "0.15em"
      textTransform: uppercase
    - name: body
      size: "1rem"
      weight: 400
      family: "Jost"
      lineHeight: 1.6
    - name: body-small
      size: "0.875rem"
      weight: 400
      family: "Jost"
      lineHeight: 1.5
  body:
    family: "Jost"
    baseSize: "19px"
    weights: [300, 400, 500, 600]
    lineLength: "72ch"
    lineHeight: 1.6

rounded:
  none: "0"
  sm: "0.55rem"
  full: "999px"
  circle: "50%"

spacing:
  sectionY: "4rem"
  sectionYDesktop: "6rem"
  navHeight: "4rem"
  galleryGap: "0.55rem"

components:
  - name: primary-cta
    element: button
    background: "#DC2626"
    color: "#FEF2F2"
    borderRadius: "0"
    padding: "0.625rem 1.25rem"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.1em"
    textTransform: uppercase
  - name: ghost-button
    element: button
    background: transparent
    color: "#D9895A"
    border: "1px solid #C05E35"
    borderRadius: "0"
    padding: "0.625rem 1.25rem"
    fontSize: "0.6875rem"
    letterSpacing: "0.1em"
    textTransform: uppercase
  - name: menu-tab
    element: button
    background: transparent
    color: "#C4A882"
    borderBottom: "2px solid transparent"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.12em"
    textTransform: uppercase
  - name: gallery-card
    element: figure
    overflow: hidden
    aspectRatio: "1 / 1"
    perspective: "1400px"
    hoverTransform: "translateY(-8px) rotateX(1.6deg) rotateY(-1.6deg) scale(1.014)"
    transition: "0.7s cubic-bezier(.16,1,.3,1)"
  - name: contact-card
    element: div
    background: "#2D1200"
    borderRadius: "0"
    hoverTransform: "translateY(-5px) rotateX(1deg) rotateY(-0.8deg) scale(1.006)"
    transition: "0.6s cubic-bezier(.16,1,.3,1)"
  - name: mobile-fab
    element: button
    background: "#DC2626"
    borderRadius: "50%"
    size: "60px"
    boxShadow: "0 4px 24px rgba(220,38,38,0.45)"
  - name: back-to-top
    element: button
    borderRadius: "999px"
    backdropFilter: "blur(8px)"
    border: "1px solid rgba(192,94,53,0.3)"
  - name: opening-hours-row
    element: div
    borderRadius: "0.55rem"
    padding: "0.5rem 1rem"
    background: "rgba(45,18,0,0.6)"
---

# Design System — Pizzeria am Medienhafen

## Overview

**The Corner Table.** A regular's seat — candlelight on worn wood, the same faces returning. The site doesn't perform its warmth; it exists in it. Every decision serves the feeling of arriving somewhere already familiar, already good.

The visual system is cinematic in depth, quietly alive in interaction, and material in language. Atmosphere before information; presence before persuasion. Nothing is decorated; everything is felt. A place that has been here since 1998 has nothing to prove, and the interface knows it.

Dark ground dominates. Fire, char, and amber surface as accent. Text is pale and warm, never clinical. Motion is slow and deliberate — ease-out-expo, no bounce, no spring.

## Colors

The palette is drenched dark with a single activating accent. Smoke (#0D0500) is the ground; Char and Soot layer above it; Ember (#DC2626) is the one moment of heat. Crust and Amber form a secondary warm arc used for navigation, borders, and secondary emphasis.

Light colors (Dough, Linen, Ash) appear as text or surface overlays on dark grounds only — never as page backgrounds. Ash is the muted workhorse: menu descriptions, allergen markers, supporting copy.

**Palette relationships:**
- Ember sits alone. It is never paired with Crust or Amber in the same element.
- Crust borders pair with Amber text on hover — never the reverse.
- Dough (#FEF2F2) is for maximum-contrast text; Linen (#F5E6D0) is for secondary or warm-tinted text.
- Smoke, Char, Soot form a surface stack: Smoke as ground, Char as primary lifted surface, Soot as secondary card fill.
- Ash never appears on light backgrounds.

**What this palette is not:** No green. No Italian-flag red-white-green combinations. No neon. No cool greys anywhere.

## Typography

Two voices with clearly separated roles.

**Bodoni Moda** carries atmosphere. Italic, weighted, large. It appears only in display headings — hero titles, section names — and only on dark surfaces. It should always feel like it belongs to the room, not to a page.

**Jost** handles information. In label-caps role (uppercase, tracked, 500 weight) for all navigation, CTAs, tabs, and labels. In body role (400, 19px base) for prose, menu descriptions, and supporting copy. Never use Jost italic decoratively.

The roles do not swap. Do not use Bodoni Moda for body text. Do not use Jost for display headings.

Base font size is 19px on `html`. Body line length caps at 72ch. Hero title scales fluidly between 3.6rem and 8rem via clamp — it is always the largest element on the page.

## Elevation

**Cinematic.** Depth is theatrical, not structural. The hero lives behind a dark overlay gradient that fades from transparent to near-opaque (#0D0500 at 98%). Gallery cards lift into perspective on hover. The contact section vignettes inward from a dark radial gradient with a warm wood background receding behind it.

**Shadow vocabulary:** Warm-tinted, multi-layer, always dark. Never cool-grey box-shadows. Ember CTA uses a red ambient glow. Back-to-top uses a gold rim glow with radial gradient. Gallery cards cast layered warm-dark shadows on hover.

**Backdrop blur** is purposeful: scrolled nav (`blur(12px)` on `rgba(13,5,0,0.96)`) and back-to-top button. Not elsewhere.

**Glow over stroke.** Depth is achieved through light bleeding (radial gradients, glow shadows) rather than visible borders. The exception: ghost buttons with Crust borders.

## Components

**Quietly alive.** Hover states deepen rather than pop. Nothing springs or bounces. Every transition uses `cubic-bezier(.16, 1, .3, 1)` (ease-out-expo) — fast initial movement, slow settle. Durations: 0.6–0.9s for spatial motion (3D cards), 0.25–0.35s for color/opacity changes.

**Scroll-reveal:** `.reveal` elements translate 36px down at opacity 0, transition to natural position over 0.75s. Stagger delays: 0.15s, 0.35s, 0.55s, 0.75s.

**3D hover (gallery cards, contact cards):** `perspective: 1400px` on parent. Hover applies `rotateX` + `rotateY` (1–1.6deg) + `scale` (1.006–1.014) + `translateY(-5px to -8px)`. Inner image scales to `scale(1.076) translateZ(14px)`. Never exceeds these values.

**Primary CTA (Ember):** Sharp corners (radius 0), all-caps Jost label-caps, red background. The button does not grow or scale on hover — it deepens in color only.

**Ghost button:** Crust border (1px), Amber text on hover, transparent background throughout. Used for secondary actions.

**Menu tabs:** Underline indicator on active, not background fill. Ash text inactive, Amber text active. Transition the border-bottom color, not background.

**Mobile FAB:** 60px circle, Ember background, multi-layer red shadow. Appears only below 768px. Fixed position.

**`prefers-reduced-motion`:** All transforms are disabled; opacity transitions remain at their shortest functional duration.

## Do's and Don'ts

**Do:**
- Use Bodoni Moda italic for all display headings, always on dark surfaces
- Use `cubic-bezier(.16, 1, .3, 1)` for every transition with spatial movement
- Apply warm-tinted multi-layer shadows — no cool-grey box-shadows anywhere
- Use Ember sparingly — one moment of heat per section at most
- Apply perspective-based 3D hover to gallery and contact cards
- Layer dark overlay gradients over video and image backgrounds
- Uppercase tracked Jost for every label, CTA, and tab
- Respect `prefers-reduced-motion` by stripping transforms entirely

**Don't:**
- Apply `border-radius` to primary CTAs, tabs, or menu items — sharp edges only
- Use red-white-green combinations or Italian-flag clichés
- Use gradient text (`background-clip: text`) anywhere
- Apply glassmorphism decoratively — blur only on nav and back-to-top
- Animate layout properties (width, height, padding, margin)
- Add hover states that animate faster than 200ms for spatial transforms
- Use Bodoni Moda for body text or labels
- Use cool-grey or neutral-tinted shadows
- Pair Ember with Crust or Amber in the same component
