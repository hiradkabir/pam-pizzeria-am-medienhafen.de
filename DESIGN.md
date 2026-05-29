---
version: "1.4"
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

## Implementation summary

The design is implemented as a static single-page site.

```txt
index.html              content, section order, media references, modals
css/base.css            brand variables, color fallbacks, browser defaults
css/layout.css          structural helpers and section backgrounds
css/components.css      reusable components, animation, cards, map, video presentation
css/responsive.css      mobile/desktop overrides only
js/script.js            interaction behavior and video fallback
```

`responsive.css` should stay lean and should contain breakpoint-specific overrides only. Shared component styling belongs in `components.css`.

## Palette

The color system is defined in `:root` in `css/base.css` and mirrored in the Tailwind CDN config inside `index.html`.

| Token | Hex | Role | Usage |
|---|---:|---|---|
| `--brand-red` | `#DC2626` | Primary action | Order/call CTAs, mobile FAB |
| `--brand-gold` | `#C05E35` | Main accent | Wordmark, dividers, borders, tabs |
| `--brand-gold-light` | `#D9895A` | Warm highlight | Hover states and selected details |
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

### Current type hierarchy

```txt
Hero title:
layout.css → .hero-title-size → clamp(3.6rem, 9vw, 8rem)

Mobile hero title:
responsive.css → .hero-title-size → clamp(1.8rem, 10.2vw, 7.6rem)

Section headings:
index.html Tailwind classes → text-4xl md:text-5xl with Bodoni Moda

Labels:
Jost, uppercase, tracked, small size

Body:
Jost, muted warm text, relaxed line-height
```

Use Bodoni Moda for emotional emphasis and section identity.  
Use Jost for functional navigation, labels, prices, buttons, and paragraph text.

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
Mobile prioritizes speed, visible CTAs, reduced vertical space, and readable interaction.

## Section design

### Hero

Purpose: immediate atmosphere and identity.

Current behavior:

```txt
desktop hero video: hero-loop.mp4
mobile hero video: hero-loop-mob.mp4
hero poster/fallback: hero-poster.jpg
dark gradient overlay
large Bodoni title
primary CTA to Speisekarte on desktop
secondary desktop CTA to Kontakt
```

The video element uses `data-src` and `data-src-mobile`; JavaScript selects one source depending on the current breakpoint.

Mobile:

```txt
wordmark centered at top
hamburger menu opens a black dropdown
menu links ordered Speisekarte, Kontakt, Über uns
hero video remains visible
hero overlay is reduced so the video is not hidden
hero title, small label, and Speisekarte hero CTA are hidden
```

### Highlights bar

Three compact trust signals:

```txt
Holzofen
Frische Zutaten
25+ Jahre
```

Mobile compresses the section so it does not dominate the screen.

### Über uns

Two real images and a text block. Use the existing warm dark palette. Avoid new decorative clichés.

### Signature dish

Calzone video on one side and text on the other.

```txt
video: assets/videos/Calzone.mp4
poster/fallback: assets/images/Calzone.png
```

On mobile, responsive rules control the video size and crop.

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

Gallery images should feel tactile and real.

Desktop:

```txt
3D depth treatment
subtle rotation
hover lift
image vignette
```

Mobile:

```txt
compact 2-column grid
no horizontal carousel
dense use of space
```

### Kontakt

Kontakt is map-led rather than card-led.

```txt
OpenStreetMap embed
address and opening hours nearby
phone/order CTA
mobile single-column flow
```

`Holzpalette.png` is used as a warm background layer in the Kontakt section and is adjusted in `responsive.css` for mobile.

## Components

### Primary CTA

```txt
background: --brand-red
text: --brand-cream / white
shape: rectangular, no rounded pill style
tone: direct, not neon
```

### Mobile floating call button

```txt
fixed circular phone button
brand red
hidden at the page top
shown after scroll
large enough for touch
```

### Desktop back-to-top button

```txt
desktop only
brand-toned circular control
appears after scrolling
uses custom frame-by-frame scroll animation
```

### Menu tabs

```txt
uppercase Jost
muted default
brand-gold active state
desktop row
mobile 2 × 3 grid
```

### Opening hours

The outer Kontakt block provides the visual surface. Inner rows should stay simple and readable.

## Motion

Motion should be warm and restrained.

Allowed:

```txt
fade-up entrance
reveal on scroll
tab fade
subtle gallery depth
desktop back-to-top animation
```

Avoid:

```txt
bouncy UI
large rotating elements
aggressive hover effects
motion that blocks reading
```

Honor `prefers-reduced-motion` where motion is decorative.

## Media direction

Use real restaurant photos/videos only.

Current media assumptions:

```txt
hero video: oven/fire/food atmosphere
Calzone video: signature dish
fireplace video: desktop menu ambience
gallery: actual restaurant and food images
Holzpalette: background texture for Kontakt
```

Assets are large and may not be included in every edit request, but the documented paths must remain stable.

## Mobile design constraints

Mobile is a primary use case.

Mobile rules:

```txt
hamburger menu with black dropdown
centered wordmark
menu links ordered Speisekarte, Kontakt, Über uns
call button after scroll
hero video visible
compact gallery
Speisekarte tabs in 2 × 3 layout
fireplace background hidden
Kontakt readable in one column
```

## Design guardrails

Do not introduce:

```txt
Italian-flag palette
clipart pizza graphics
neon delivery-app styling
generic SaaS gradients
unrequested redesigns
duplicate responsive blocks
dead selectors
unused media references
```

All design edits must stay consistent with `README.md` and `PRODUCT.md`.
