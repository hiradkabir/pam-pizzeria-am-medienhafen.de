---
version: "1.2"
generated: "2026-05-29"
project: "Pizzeria am Medienhafen"
register: brand
source_files:
  - index.html
  - css/base.css
  - css/layout.css
  - css/components.css
  - css/responsive.css
  - js/script.js
  - README.md
  - PRODUCT.md
---

# Design System — Pizzeria am Medienhafen

## Design intent

The site should feel like a warm, established neighbourhood pizzeria in Düsseldorf's Medienhafen: dark, firelit, wood-influenced, authentic, and direct.

The visual system should suggest:

```txt
wood oven
warm restaurant light
handmade food
Mediterranean restraint
local familiarity
```

It should not look like:

```txt
a generic delivery app
a SaaS landing page
an Italian flag template
a neon food startup
```

## Current implementation summary

The design is implemented as a static single-page site.

```txt
index.html              content, section order, media references, modals
css/base.css            brand variables, color fallbacks, browser defaults
css/layout.css          structural helpers and section backgrounds
css/components.css      reusable components, animation, cards, map, video presentation
css/responsive.css      mobile/desktop overrides only
js/script.js            interaction behavior and video fallback
```

`responsive.css` is intentionally lean and should contain breakpoint-specific overrides, not duplicated component code.

## Palette

The color system is defined in `:root` in `css/base.css` and mirrored in the Tailwind CDN config inside `index.html`.

| Token | Hex | Role | Usage |
|---|---:|---|---|
| `--brand-red` | `#DC2626` | Primary action | Order/call CTAs, mobile FAB |
| `--brand-gold` | `#C05E35` | Main accent | Wordmark, dividers, borders, tabs |
| `--brand-gold-light` | `#D9895A` | Warm highlight | Hover states, selected details |
| `--brand-cream` | `#FEF2F2` | Main text | Headings and high-contrast text |
| `--brand-warm` | `#F5E6D0` | Soft warm tone | Tints and secondary warmth |
| `--brand-dark` | `#0D0500` | Deep base | Page background and dark fades |
| `--brand-surface` | `#1A0A00` | Primary surface | Menu and dark section surfaces |
| `--brand-surface-2` | `#2D1200` | Secondary surface | Cards and signature section |
| `--brand-muted` | `#C4A882` | Muted text | Descriptions, labels, supporting copy |

## Typography

Fonts are loaded from Google Fonts in `index.html`.

```txt
Display/headings: Bodoni Moda
Body/navigation:  Jost
Base html size:   19px
```

### Type hierarchy

```txt
Hero title:
.hero-title-size → clamp(3.6rem, 9vw, 8rem)

Mobile hero title:
responsive.css → clamp(3.42rem, 8.55vw, 7.6rem)

Section headings:
Tailwind classes in index.html:
text-4xl md:text-5xl with Bodoni Moda

Labels:
Jost, uppercase, tracked, small size

Body:
Jost, muted warm text, relaxed line-height
```

Use Bodoni Moda for emotional emphasis and section identity.  
Use Jost for functional navigation, labels, prices, and paragraph text.

## Layout principles

```txt
dark page base
large atmospheric hero
section rhythm with generous vertical padding
compact mobile sections
single-page anchor navigation
map-led Kontakt section
no separate mobile HTML
```

Desktop allows more atmosphere and hover detail.  
Mobile prioritizes speed, reduced vertical space, visible CTAs, and readable interaction.

## Section design

### Hero

Purpose: immediate atmosphere and identity.

Current behavior:

```txt
hero-loop.mp4 as video background
hero-poster.jpg as poster/fallback
dark gradient overlay
large Bodoni title
primary CTA to Speisekarte
secondary desktop CTA to Kontakt
```

Mobile:

```txt
wordmark centered at top
mobile nav links appear after scroll
hero video remains visible
hero overlay is reduced so the video is not hidden
hero title is slightly smaller
```

### Highlights bar

Three compact trust signals:

```txt
Holzofen
Frische Zutaten
25+ Jahre
```

Mobile compresses them into a 3-column row and hides secondary subtitles on very small screens.

### Über uns

Two real images and a text block. Use the existing warm dark palette. Avoid new decorative clichés.

### Signature dish

Calzone video on one side and text on the other. On mobile, the video is scaled and contained by responsive rules.

### Speisekarte

Tabs are central to the interaction.

Desktop:

```txt
one horizontal tab row
fireplace video visible behind the menu
soft fire overlay
```

Mobile:

```txt
tabs become 2 columns × 3 rows
fireplace video and poster are hidden
tab content min-height is removed
```

### Galerie

Desktop:

```txt
grid layout
larger lead image
subtle 3D card hover
warm shadows
vignette treatment
```

Mobile:

```txt
compact 2-column grid
all images square
terasse.jpg visible
no horizontal overflow carousel
```

Current gallery images:

```txt
IMG-20200109-WA0034_0.jpg
IMG-20200105-WA0009.jpg
am-ofen.jpg
Calzone.png
IMG-20200109-WA0015.jpg
glazed.jpg
terasse.jpg
slide-1.png
```

### Kontakt

Current layout is map-led.

Desktop:

```txt
OpenStreetMap map on the left
contact details and opening hours on the right
CTA below
```

Mobile:

```txt
single-column layout
full-width contact CTA
Holzpalette.png rotated in background
opening hours remain simple and readable
```

## Components

### Primary CTA

```txt
background: --brand-red
text: --brand-cream / white
shape: sharp, not pill
style: direct and functional
```

Use red sparingly. It is the action color, not a decorative color.

### Ghost CTA

```txt
transparent background
gold border
gold text
dark hover contrast
```

### Mobile floating call button

```txt
fixed circular button
uses --brand-red
hidden at top of page
visible after navbar scroll state
mobile only
```

### Desktop back-to-top button

```txt
desktop only
centered higher in viewport
round warm glass-like treatment
hidden on mobile
```

### Gallery cards

```txt
warm shadow
small perspective
restrained hover lift
image scale on hover
vignette overlay
```

Do not exaggerate 3D movement.

### Opening hours

Opening hours should remain visually simple. The outer Kontakt card carries the visual weight. Inner rows should not feel like separate cards unless explicitly requested.

## Motion rules

Allowed:

```txt
subtle fade-up entrance
scroll reveal
slow gallery hover movement
tab fade transitions
desktop back-to-top movement
```

Avoid:

```txt
fast bouncing
layout-shifting animation
large mobile hover effects
animation that hides content
```

Respect `prefers-reduced-motion`.

## Media rules

Use exact paths and casing.

Images:

```txt
assets/images/pizzeria-am-medienhafen-logo.svg
assets/images/hero-poster.jpg
assets/images/am-ofen.jpg
assets/images/IMG-20200109-WA0015.jpg
assets/images/Calzone.png
assets/images/Fireplace5000px.png
assets/images/IMG-20200109-WA0034_0.jpg
assets/images/IMG-20200105-WA0009.jpg
assets/images/slide-1.png
assets/images/Holzpalette.png
assets/images/glazed.jpg
assets/images/terasse.jpg
```

Videos:

```txt
assets/videos/hero-loop.mp4
assets/videos/Calzone.mp4
assets/videos/Fireplace-dynamic5000px.mp4
```

Mobile-specific media behavior:

```txt
hero-loop.mp4 still used on mobile
Calzone.mp4 scaled in responsive.css
Fireplace-dynamic5000px.mp4 hidden on mobile
```

## Anti-patterns

Do not add:

```txt
Italian flag color schemes
clipart food icons
neon delivery-app styling
generic gradient text
cool-grey shadows
unused CSS blocks
duplicate mobile override blocks
dead JS handlers
separate mobile HTML files
new files without being asked
```

## Editing rules for AI agents

```txt
Use the newest uploaded/current project files as source of truth.
Only change what the user requested.
Do not rename files.
Do not edit README.md, DESIGN.md, or PRODUCT.md unless asked.
Check project-wide plausibility before returning files.
Remove obsolete code if a better implementation replaces it.
Do not leave commented-out backup code in production files.
```
