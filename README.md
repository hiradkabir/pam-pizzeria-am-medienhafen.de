# Pizzeria am Medienhafen — Website Project

Static website for **Pizzeria am Medienhafen**.  
The project is designed for deployment on GitHub Pages or any standard static web host.

## Current project structure

Keep this structure exactly as it is:

```txt
project/
├── index.html
├── README.md
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

## Important file rule

Do **not** rename existing files unless the HTML/CSS references are changed at the same time.

File names are case-sensitive on GitHub Pages and most web servers.  
For example, these are different files:

```txt
glazed.jpg
glazed.JPG
Calzone.mp4
calzone.mp4
```

The current project expects the exact paths listed below.

## Required image files

Place these files in:

```txt
assets/images/
```

Required images:

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

Required videos:

```txt
assets/videos/hero-loop.mp4        # desktop hero video
assets/videos/hero-loop-mob.mp4    # mobile hero video
assets/videos/Calzone.mp4
assets/videos/Fireplace-dynamic5000px.mp4
```

## CSS file responsibilities

```txt
css/base.css
```

Global theme variables, brand colors, fallback utility classes, browser defaults.

```txt
css/layout.css
```

Section-level layout, structural helpers, background sections, gallery/contact background setup.

```txt
css/components.css
```

Reusable components, animations, navbar state, gallery effects, contact card effects, menu/fireplace styling, top button.

```txt
css/responsive.css
```

Desktop and mobile overrides, mobile media sizing, mobile menu tab layout, mobile gallery behavior, mobile contact background adjustments.

## JavaScript behavior

```txt
js/script.js
```

Controls:

- navbar scroll state
- reveal animations
- Speisekarte tab switching
- mobile swipe between Speisekarte tabs
- smooth anchor scrolling
- Impressum/Datenschutz modals
- video autoplay/fallback handling
- desktop-only back-to-top button animation

The mobile hamburger menu has intentionally been removed.

## Current responsive behavior

### Desktop

- Full navigation is shown.
- Desktop videos are enabled.
- Speisekarte uses tab buttons in one horizontal row.
- Back-to-top button appears only on desktop after scrolling.

### Mobile

- No hamburger menu.
- Hero video is scaled and centered for mobile.
- Calzone video is scaled and centered for mobile.
- Galerie uses a compact mobile layout to reduce vertical space.
- Speisekarte tabs use a centered **2 columns × 3 rows** layout.
- `Holzpalette.png` is used in the Kontakt section and rotated on mobile for better visual fit.

## Brand color system

The project uses the following palette:

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

The Tailwind config is defined inside `index.html`.  
Fallback CSS utility classes are included in `css/base.css` so key colors still work if Tailwind CDN classes are cached or generated late.

## Video notes

- The hero video uses `hero-loop.mp4` on desktop and `hero-loop-mob.mp4` on mobile via `<source media="...">` rules.

For reliable browser playback:

- Use `.mp4`.
- Prefer H.264 video codec.
- Prefer AAC audio codec, even if the video is muted.
- Keep videos compressed for GitHub Pages.
- Use exact file names and casing.
- Keep `muted`, `autoplay`, `loop`, and `playsinline` on background videos.

If a video fails or is blocked by the browser, `script.js` applies the poster image as fallback.

## Local testing

Open the project locally by launching `index.html`.

Recommended option:

```txt
VS Code → install Live Server extension → right-click index.html → Open with Live Server
```

A local server is better than opening the file directly because browser media behavior can differ when using `file://`.

## GitHub Pages deployment

Typical workflow:

```txt
1. Push project files to GitHub.
2. Go to repository Settings.
3. Open Pages.
4. Select the main branch and root folder.
5. Save.
6. Wait until GitHub Pages publishes the site.
```

After updating files, use a hard refresh:

```txt
Ctrl + F5
```

or test in a private/incognito browser window.

## Cache-busting

The HTML uses version numbers like:

```html
<link rel="stylesheet" href="css/responsive.css?v=41">
<script defer src="js/script.js?v=39"></script>
```

When CSS or JS changes, increase the version number so browsers load the newest file.

Example:

```html
css/responsive.css?v=42
```

## Common troubleshooting

### An image does not appear

Check:

```txt
1. Is the file inside assets/images/?
2. Does the file name match exactly?
3. Does the casing match exactly?
4. Is the path in index.html or CSS correct?
```

### A video does not play

Check:

```txt
1. Is the file inside assets/videos/?
2. Is the filename exactly correct?
3. Is the MP4 encoded as H.264?
4. Is the file size too large?
5. Did the browser cache an old version?
```

### Styles look wrong after upload

Check:

```txt
1. Hard refresh with Ctrl + F5.
2. Verify CSS files are uploaded.
3. Increase cache-busting query versions in index.html.
4. Confirm css/base.css still contains the brand fallback utilities.
```

## Current production domain

```txt
pam-pizzeria-am-medienhafen.de
```
