---
version: "1.8"
generated: "2026-07-16"
project: "Pizzeria am Medienhafen"
register: brand
source_files:
  - index.html
  - tailwind.config.js
  - css/tailwind-input.css
  - css/tailwind.css
  - css/base.css
  - css/layout.css
  - css/components.css
  - css/responsive.css
  - css/gallery-carousel.css
  - js/script.js
  - README.md
  - DESIGN.md
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
index.html                 content, SEO/Restaurant metadata, section order, media references, modals
tailwind.config.js         build-time utility theme and content scanning
css/tailwind.css           generated, locally hosted Tailwind utilities
css/base.css               brand variables, color fallbacks, browser defaults
css/layout.css             structural helpers and section backgrounds
css/components.css         reusable components, CSS view reveals, cards, map and video presentation
css/responsive.css         breakpoint-specific mobile/desktop overrides only
css/gallery-carousel.css   scroll-snap gallery styling and distance-weighted focus presentation
js/script.js               required interaction behavior and video fallback
```

`responsive.css` should stay lean and contain breakpoint-specific overrides only. Shared component styling belongs in `components.css`. Carousel behavior is isolated in `gallery-carousel.css` so it does not conflict with general gallery-image styling.

## Palette

The color system is defined in `:root` in `css/base.css` and mirrored in `tailwind.config.js`. Tailwind is compiled locally; no runtime CDN is used.

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
navbar, borderless menu toggle and dropdown share the same brand-dark background
menu links ordered Speisekarte, Kontakt
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

### Signature dish

Calzone video on one side and text on the other.

```txt
video: assets/videos/Calzone.mp4
poster/fallback: assets/images/Calzone.jpg
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

Gallery images should feel tactile and real while remaining easy to browse.

The gallery is one horizontal scroll-snap carousel on mobile and desktop:

```txt
horizontal swipe / trackpad scrolling
mandatory scroll snapping
one centered card per stop
part of the next card remains visible
native CSS scroll buttons and markers where supported
lightweight center-distance focus calculation
no carousel library
```

The focused card is automatically brought forward at full scale, brightness and contrast. Cards become progressively smaller, darker and less prominent as their distance from the center increases.

Desktop:

```txt
wide 16:10 cards
larger centered viewport
hover image zoom and warm border emphasis
mouse, trackpad and horizontal scrolling
```

Mobile:

```txt
portrait-oriented 4:5 cards
touch swiping with momentum
mandatory centered snapping
compact spacing without a separate mobile grid
```

Browsers without support for the new `::scroll-button()` and `::scroll-marker` pseudo-elements still retain a functional swipe-and-snap carousel.
The JavaScript dot row is a fallback only and is hidden when native scroll markers are supported.

### Kontakt

Kontakt is map-led rather than card-led.

```txt
OpenStreetMap embed
address and opening hours nearby
phone/order CTA
mobile single-column flow
```

`Holzpalette.jpg` is used as a warm background layer in the Kontakt section and is adjusted in `responsive.css` for mobile.

## Components

### Primary CTA

```txt
default buttons: background --brand-red
contact “Jetzt Bestellen”: animated deep-red corporate gradient
contact CTA glow: soft, restrained and behind the button only
contact CTA highlight: slow light sweep
text: --brand-cream / white
shape: rectangular, no rounded pill style
tone: direct, warm and not neon
```

The animated corporate treatment is restricted to the contact “Jetzt Bestellen” button and the mobile telephone button. Other buttons remain static.

### Mobile floating call button

```txt
fixed circular phone button
animated deep-red corporate gradient
soft matching glow behind the button
slow moving highlight sweep
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
ARIA tab/tabpanel semantics
Arrow Left/Right, Home and End keyboard navigation
desktop row
mobile 2 × 3 grid
```

### Opening hours

The outer Kontakt block provides the visual surface. Inner rows should stay simple and readable.

## Motion

Motion should be warm and restrained.

Allowed:

```txt
initial fade-up entrance
CSS view-timeline reveal as content enters the viewport
CSS view-timeline divider drawing
tab fade
subtle carousel image zoom
desktop back-to-top animation
```

The general `.reveal` behavior is implemented in CSS with `animation-timeline: view()`. It does not use a JavaScript scroll observer and does not create a reading-progress bar. The reveal uses only opacity and a short vertical translation—never blur. Large menu, gallery, map, and contact containers are excluded so long mobile sections remain fully sharp and readable. Unsupported browsers use the visible-content fallback.

Avoid:

```txt
bouncy UI
large rotating elements
aggressive hover effects
motion that blocks reading
scroll listeners used only for decorative entrance animation
```

Honor `prefers-reduced-motion` wherever motion is decorative.

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
menu links ordered Speisekarte, Kontakt
call button after scroll
hero video visible
touch-driven gallery carousel with centered snapping
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
duplicate carousel implementations
dead selectors
unused media references
```

All design edits must stay consistent with `README.md` and `PRODUCT.md`.
