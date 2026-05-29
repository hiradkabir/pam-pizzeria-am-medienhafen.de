# Pizzeria am Medienhafen — Website Project

Static website for **Pizzeria am Medienhafen**.  
Designed for GitHub Pages or any standard static web host.

This documentation reflects the current code structure. The `assets/` folder can be large and does not need to be sent with every edit, but every referenced media file must stay in the expected path with exact casing.

## Current project structure

Keep this structure exactly as it is:

```txt
project/
├── index.html
├── README.md
├── DESIGN.md
├── PRODUCT.md
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    ├── videos/
    └── fonts/
```

## Core editing rules

### Exact-scope rule

Only change what was explicitly requested. Do not redesign, rename, refactor, restyle, reorder, or optimize unrelated parts.

### Whole-project consistency rule

Always check the full project context before changing a file. Every edit must remain plausible across:

```txt
index.html
css/base.css
css/layout.css
css/components.css
css/responsive.css
js/script.js
README.md
DESIGN.md
PRODUCT.md
```

If one file references a class, ID, media path, modal, button, script behavior, or CSS variable, check whether the related files still support it.

### No unwanted filename changes

Do **not** rename existing files unless the user explicitly asks for it and all references are changed at the same time.

File names are case-sensitive on GitHub Pages and most web servers. These are different files:

```txt
glazed.jpg
glazed.JPG
Calzone.mp4
calzone.mp4
```

### Dead-code rule

Avoid dead code. If a new implementation replaces an old code structure, remove the obsolete structure instead of leaving unused selectors, duplicate logic, inactive classes, old media references, or stale comments behind.

Do not keep “backup code” inside production files. Use version control for history.

## Required image files

Place these files in:

```txt
assets/images/
```

The current code expects:

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

## Required video files

Place these files in:

```txt
assets/videos/
```

The current code expects:

```txt
assets/videos/hero-loop.mp4
assets/videos/hero-loop-mob.mp4
assets/videos/Calzone.mp4
assets/videos/Fireplace-dynamic5000px.mp4
```

Current behavior:

```txt
hero-loop.mp4                  desktop hero video
hero-loop-mob.mp4              mobile hero video (better fit for portrait phones)
Calzone.mp4                    signature dish video
Fireplace-dynamic5000px.mp4    desktop menu background video; hidden on mobile
```

## CSS file responsibilities

### `css/base.css`

Global foundation:

```txt
theme variables
brand colors
fallback utility classes
browser defaults
body/html defaults
scrollbar styling
```

### `css/layout.css`

Structural and section-level layout:

```txt
hero title size base
aspect-ratio helpers
signature media min-height
menu background
gallery background
contact background and Holzpalette layer
off-screen rendering hints
menu tab content sizing
```

### `css/components.css`

Reusable visual components and interaction states:

```txt
hero overlay
fade/reveal animations
navbar scrolled state
gold divider
menu cards and tabs
gallery 3D styling
Kontakt map-led layout
OpenStreetMap styling
opening hours formatting
fireplace desktop styling
mobile floating call button base
desktop back-to-top button
video fallback presentation
CTA styling
modal styling
```

### `css/responsive.css`

Responsive overrides only:

```txt
mobile navbar centering
mobile nav links after scroll
mobile call button visibility at top
mobile hero title size
mobile hero video sizing
mobile Calzone sizing
mobile fireplace hiding
mobile Speisekarte 2 × 3 tabs
mobile gallery compact 2-column grid
mobile Kontakt/Holzpalette rotation
mobile modal sizing
small-phone corrections
landscape corrections
reduced-motion overrides
```

`responsive.css` should remain lean. Shared reusable component styling belongs in `components.css`; only breakpoint-specific overrides belong in `responsive.css`.

## JavaScript behavior

`js/script.js` controls:

```txt
navbar scroll state
desktop-only back-to-top button reveal and scroll animation
scroll reveal animation
Speisekarte tab switching
mobile swipe between Speisekarte tabs
smooth anchor scrolling
Impressum and Datenschutz modals
hero video: per-device source (desktop/mobile), eager load, swapped at the 768px breakpoint
below-the-fold videos: loaded and played only as they near the viewport
video autoplay, with poster fallback only if playback fails
```

The mobile hamburger menu has intentionally been removed.

## Current responsive behavior

### Desktop

```txt
full desktop navigation
desktop hero video enabled
desktop fireplace video visible in Speisekarte section
Speisekarte tabs in one horizontal row
Galerie uses 3D hover depth
Kontakt uses map-led two-column layout
desktop-only back-to-top button appears after scrolling
```

### Mobile

```txt
no hamburger menu
wordmark centered at top
mobile nav links appear after scroll
floating phone button hidden at top and visible after scroll
hero-loop-mob.mp4 plays as the hero video, with reduced overlay
hero title is 5% smaller than the base title scale
Calzone.mp4 is scaled for mobile
Fireplace-dynamic5000px.mp4 and its poster are hidden
Speisekarte tabs use centered 2 columns × 3 rows
Galerie uses compact 2-column grid
terasse.jpg remains visible in Galerie
Holzpalette.png is rotated in Kontakt
Kontakt CTA is full width
modals become full-screen panels
```

## Brand color system

The project uses this palette:

```txt
brand-red:        #DC2626
brand-gold:       #C05E35
brand-gold-light: #D9895A
brand-cream:      #FEF2F2
brand-warm:       #F5E6D0
brand-dark:       #0D0500
brand-surface:    #1A0A00
brand-surface-2:  #2D1200
brand-muted:      #C4A882
```

The Tailwind config is defined in `index.html`.  
Fallback CSS utility classes are included in `css/base.css` so the main brand colors remain available even if Tailwind CDN generation is delayed or cached.

## Video notes

For reliable browser playback:

```txt
use .mp4
prefer H.264 video codec
prefer AAC audio codec, even if muted
keep videos compressed for GitHub Pages
keep exact filenames and casing
keep muted, loop, playsinline on background videos (the script manages autoplay)
```

Loading behavior:

```txt
hero loads eagerly and uses a per-device source: hero-loop.mp4 on desktop, hero-loop-mob.mp4 on mobile, swapped at the 768px breakpoint
below-the-fold videos load and play only as they approach the viewport
their posters are deferred (data-poster) so large poster images are not fetched off-screen
the hero shows no poster while loading; the poster is only a fallback if playback fails
```

## Map embed

The Kontakt section uses an OpenStreetMap iframe. It does not need an API key. The map is dark-filtered in CSS and uses `pointer-events: none` so it does not trap page scrolling.

Current marker:

```txt
Wupperstraße 14, 40221 Düsseldorf
51.2146420, 6.7579140
```

To move the map, update the `bbox` and `marker` values in the iframe `src` in `index.html`.

## Local testing

Use a local server instead of opening the file directly:

```txt
VS Code → Live Server → right-click index.html → Open with Live Server
```

A local server is more reliable for video behavior than `file://`.

## GitHub Pages deployment

Typical workflow:

```txt
1. Push project files to GitHub.
2. Open repository Settings.
3. Open Pages.
4. Select the main branch and root folder.
5. Save.
6. Wait until GitHub Pages publishes the site.
```

## Cache-busting

The current HTML loads:

```html
<link rel="stylesheet" href="css/base.css?v=13">
<link rel="stylesheet" href="css/layout.css?v=26">
<link rel="stylesheet" href="css/components.css?v=41">
<link rel="stylesheet" href="css/responsive.css?v=47">
<script defer src="js/script.js?v=41"></script>
```

Only update cache versions when the corresponding CSS or JS file is changed and the user allows or requests it.

## Common troubleshooting

### Image does not appear

Check:

```txt
1. Is the file inside assets/images/?
2. Does the filename match exactly?
3. Does the casing match exactly?
4. Is the path in index.html or CSS correct?
```

### Video does not play

Check:

```txt
1. Is the file inside assets/videos/?
2. Does the filename match exactly?
3. Is the MP4 encoded as H.264?
4. Is the file too large?
5. Is the browser caching an old version?
6. Is autoplay blocked despite muted/playsinline?
```

### Mobile hero video does not appear

Check:

```txt
1. Confirm assets/videos/hero-loop-mob.mp4 exists (the mobile hero source).
2. Confirm #heroVideo carries data-src and data-src-mobile in index.html.
3. Confirm responsive.css keeps #heroVideo visible on mobile.
4. Confirm the hero overlay opacity is not hiding the video.
5. Hard refresh, or increment the js/script.js cache version, if the script changed.
```

### Styles look wrong after upload

Check:

```txt
1. Hard refresh with Ctrl + F5.
2. Verify all CSS files are uploaded.
3. Verify cache-busting query versions.
4. Confirm css/base.css still contains brand fallback utilities.
5. Check for duplicate selectors between components.css and responsive.css.
```

## Current production domain

```txt
pam-pizzeria-am-medienhafen.de
```
