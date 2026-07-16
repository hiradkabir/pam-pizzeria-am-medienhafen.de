# Pizzeria am Medienhafen — Website Project

Static website for **Pizzeria am Medienhafen**.  
Designed for GitHub Pages or any standard static web host. Tailwind is compiled locally at build time; the published website has no Tailwind runtime dependency.

This documentation reflects the current code structure. The `assets/` folder can be large and does not need to be sent with every edit, but every referenced media file must stay in the expected path with exact casing.

## Current project structure

Keep this structure exactly as it is:

```txt
project/
├── index.html
├── README.md
├── DESIGN.md
├── PRODUCT.md
├── package.json
├── package-lock.json
├── tailwind.config.js
├── robots.txt
├── sitemap.xml
├── css/
│   ├── tailwind-input.css
│   ├── tailwind.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   └── gallery-carousel.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    ├── videos/
    └── fonts/
```

## Core editing rules

### Exact-scope rule

Only change what was explicitly requested. Do not redesign, rename, refactor, restyle, reorder, optimize, or update unrelated files.

### Whole-project consistency rule

Before editing, check the full project context. Every edit must remain plausible across:

```txt
index.html
tailwind.config.js
css/tailwind-input.css
css/tailwind.css
css/base.css
css/layout.css
css/components.css
css/responsive.css
js/script.js
README.md
DESIGN.md
PRODUCT.md
```

If one file references a class, ID, media path, modal, button, script behavior, CSS variable, or breakpoint, confirm that the related files still support it.

### No unwanted filename changes

Do **not** rename existing files unless the user explicitly requests it and all references are changed at the same time.

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

## Current HTML/CSS/JS versions

`index.html` currently loads:

```html
<link rel="stylesheet" href="css/tailwind.css?v=2">
<link rel="stylesheet" href="css/base.css?v=14">
<link rel="stylesheet" href="css/layout.css?v=28">
<link rel="stylesheet" href="css/components.css?v=45">
<link rel="stylesheet" href="css/responsive.css?v=59">
<link rel="stylesheet" href="css/gallery-carousel.css?v=6">
<script defer src="js/script.js?v=48"></script>
```

Increase only the version number of a file that was actually changed.

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
assets/images/Calzone.jpg
assets/images/Fireplace5000px.jpg
assets/images/IMG-20200109-WA0034_0.jpg
assets/images/IMG-20200105-WA0009.jpg
assets/images/Holzpalette.jpg
assets/images/glazed.jpg
assets/images/terasse.jpg
assets/images/AHDB8748.JPG
assets/images/EQFY1298.JPG
assets/images/QHUS6537.JPG
assets/images/WNIW6153.JPG
assets/images/ETHG4100.JPG
assets/images/6d9729dd-19ae-4371-9581-3d22fd0fbaf7.jpg
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
hero-loop-mob.mp4              mobile hero video
Calzone.mp4                    signature dish video
Fireplace-dynamic5000px.mp4    desktop menu background video; hidden on mobile
```

## CSS file responsibilities

### `css/base.css`

Global foundation:

```txt
theme variables
brand colors
brand utility fallbacks
browser defaults
body/html defaults
scrollbar styling
```

### `css/layout.css`

Structural and section-level layout:

```txt
base hero title size
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
initial fade-up animation
CSS view-timeline reveal animation
CSS view-timeline divider drawing
navbar scrolled state
gold divider
accessible menu tab states
general gallery image presentation
Kontakt map-led layout
OpenStreetMap styling
opening hours formatting
fireplace desktop styling
mobile floating call button with deep-red gradient/glow/highlight
contact “Jetzt Bestellen” deep-red gradient/glow/highlight
desktop back-to-top button
video fallback presentation
CTA styling
modal styling
```

The `.reveal` implementation uses `animation-timeline: view()` inside `@supports`. It uses opacity and a short translate only; blur is not applied. Large structural menu, gallery, map, and contact containers stay permanently sharp to prevent half-finished mobile animations. The default state keeps content visible in browsers without support. No reading-progress bar is implemented.

### `css/responsive.css`

Responsive overrides only:

```txt
mobile navbar centering
mobile hamburger menu with black dropdown
mobile call button visibility at top
visually hidden mobile hero heading for semantic continuity
mobile hero video sizing
mobile Calzone video fills its complete media column without inset scaling
mobile fireplace hiding
mobile Speisekarte 2 × 3 tabs
mobile Kontakt/Holzpalette rotation
mobile modal sizing
small-phone corrections
landscape corrections
reduced-motion overrides
```

### `css/gallery-carousel.css`

Dedicated mobile and desktop gallery behavior:

```txt
horizontal flex track
mandatory scroll snapping
centered cards
mobile 4:5 cards
desktop 16:10 cards
touch and trackpad scrolling
native ::scroll-button controls where supported
native ::scroll-marker indicators where supported
JavaScript indicator fallback only where native markers are unavailable
continuous center-distance focus weighting
focused card at full size, brightness and contrast
neighboring cards progressively smaller and darker
normal scroll-snap behavior remains available without the focus script
```

`responsive.css` should stay lean. Shared reusable component styling belongs in `components.css`; only breakpoint-specific overrides belong in `responsive.css`. Carousel-specific behavior belongs only in `gallery-carousel.css`.

## JavaScript behavior

`js/script.js` controls:

```txt
navbar scroll state
mobile hamburger menu open/close behavior
desktop-only back-to-top button reveal and scroll animation
Speisekarte tab switching
keyboard navigation for tabs with Arrow keys, Home and End
mobile swipe between Speisekarte tabs
smooth anchor scrolling
Impressum and Datenschutz modals with focus management and focus trapping
hero video source selection using data-src and data-src-mobile
below-the-fold lazy video loading
video autoplay handling and poster fallback on error
automatic pause outside the viewport and while the browser tab is hidden
resume only for videos that are visible again
continuous gallery focus weighting based on distance from the carousel center
```

Content reveal is no longer controlled by JavaScript. It is implemented in `css/components.css` with CSS view timelines. JavaScript uses `IntersectionObserver` only for video preloading and visibility-based playback.

The mobile hamburger menu is enabled on mobile and opens a black dropdown with Speisekarte and Kontakt in that order. Navbar, toggle, and dropdown share one continuous brand-dark background; the toggle has no persistent frame.

## Current page structure

```txt
Hero
Highlights bar
Signature dish / Calzone
Speisekarte
Galerie
Kontakt & Öffnungszeiten
Footer
Impressum modal
Datenschutz modal
Desktop back-to-top button
Mobile floating call button
```

## Current responsive behavior

### Desktop

```txt
full desktop navigation
desktop hero video enabled
desktop fireplace video visible in Speisekarte
Speisekarte tabs in one horizontal row
larger visual rhythm
wide gallery carousel with centered snapping
native CSS carousel arrows and dots where supported
map-led Kontakt layout
desktop-only back-to-top button
```

### Mobile

```txt
hamburger menu with black dropdown
centered top wordmark
menu links ordered Speisekarte, Kontakt
phone button hidden at page top and visible after scroll
hero-loop-mob.mp4 selected by JavaScript when available
reduced hero gradient so video remains visible
mobile hero label and Speisekarte hero CTA hidden
Calzone.mp4 fills the complete mobile media column
fireplace video/poster hidden in Speisekarte
Speisekarte tabs arranged 2 columns × 3 rows
gallery uses portrait cards, touch swiping and centered snapping
Kontakt collapses into a single-column flow
Holzpalette.jpg rotated/scaled for mobile background fit
```

## CSS feature compatibility

The project uses progressive enhancement for newer CSS scrolling features.

```txt
animation-timeline: view()          viewport entrance animation
::scroll-button()                   generated carousel arrows
::scroll-marker / scroll-marker-group
                                    generated carousel indicators
```

Fallback behavior:

```txt
content stays visible when view timelines are unsupported
gallery remains horizontally scrollable and snap-enabled
arrows and dots may be absent in browsers without the new pseudo-elements
the lightweight focus script enhances scale and highlighting but is not required for scrolling
no JavaScript reveal fallback is required
```

`prefers-reduced-motion` disables decorative entrance movement.

## Brand color system

The project uses these CSS variables in `css/base.css` and the same values in `tailwind.config.js`:

```txt
--brand-red:        #DC2626
--brand-gold:       #C05E35
--brand-gold-light: #D9895A
--brand-cream:      #FEF2F2
--brand-warm:       #F5E6D0
--brand-dark:       #0D0500
--brand-surface:    #1A0A00
--brand-surface-2:  #2D1200
--brand-muted:      #C4A882
```

## Video notes

For reliable browser playback:

```txt
Use .mp4
Prefer H.264 video codec
Prefer AAC audio codec, even if muted
Keep videos compressed for GitHub Pages
Use exact filenames and casing
Keep muted, loop, playsinline, and data-autoplay-video behavior aligned with script.js
```

The hero video is chosen by JavaScript:

```txt
desktop: data-src="assets/videos/hero-loop.mp4"
mobile:  data-src-mobile="assets/videos/hero-loop-mob.mp4"
```

If playback fails, `script.js` applies the configured poster/background fallback.

## Map embed

The Kontakt section embeds an OpenStreetMap iframe, styled in CSS to match the dark theme and set to avoid trapping scroll. To adjust map position, edit the iframe `src` in `index.html`.

## SEO and structured data

`index.html` contains canonical, description, robots, Open Graph and Twitter metadata plus Schema.org `Restaurant` JSON-LD. `robots.txt` points search engines to `sitemap.xml`. Keep the address, telephone number, opening hours and production URL aligned across HTML, JSON-LD and the sitemap.

## Local CSS build

Install dependencies once and rebuild the generated Tailwind file after changing utility classes or `tailwind.config.js`:

```txt
npm install
npm run build
```

Commit `css/tailwind.css`; never commit `node_modules/`. The production page must not load `cdn.tailwindcss.com`.

## Local testing

Recommended:

```txt
VS Code → Live Server → right-click index.html → Open with Live Server
```

A local server is safer than opening the file via `file://`, especially for video behavior.

## GitHub Pages deployment

Typical workflow:

```txt
1. Run `npm run build` after Tailwind-related changes.
2. Push project files to GitHub.
3. Go to repository Settings.
4. Open Pages.
5. Select the main branch and root folder.
6. Save.
7. Wait until GitHub Pages publishes the site.
```

After updating files, hard refresh:

```txt
Ctrl + F5
```

or test in a private/incognito browser window.

## Common troubleshooting

### An image does not appear

Check:

```txt
1. Is the file inside assets/images/?
2. Does the filename match exactly?
3. Does the casing match exactly?
4. Is the path in index.html or CSS correct?
5. Was the file actually uploaded to GitHub?
```

### A video does not play

Check:

```txt
1. Is the file inside assets/videos/?
2. Is the filename exactly correct?
3. Is the MP4 encoded as H.264?
4. Is the file too large?
5. Did the browser cache an old version?
6. Does script.js select the expected desktop/mobile source?
```

### Styles look wrong after upload

Check:

```txt
1. Hard refresh with Ctrl + F5.
2. Verify CSS files are uploaded.
3. Increase only the changed file's cache-busting query version.
4. Confirm css/base.css still contains the brand fallback utilities.
5. Confirm responsive overrides are not duplicated elsewhere.
```

## Current production domain

```txt
pam-pizzeria-am-medienhafen.de
```
