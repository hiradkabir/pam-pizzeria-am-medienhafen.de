# Pizzeria am Medienhafen — cleaned project

## Folder structure

```txt
project/
├── index.html
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

## Required media file locations

The HTML expects these exact files. File names are case-sensitive on GitHub Pages and most web servers.

### Images

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
```

### Videos

```txt
assets/videos/hero-loop.mp4
assets/videos/Calzone.mp4
assets/videos/Fireplace-dynamic5000px.mp4
```

## Video notes

- Desktop videos are enabled.
- Mobile videos are also enabled and cropped with `object-fit: cover` / `object-position` for a cleaner interface.
- If a browser blocks or fails a video, JavaScript applies the video's poster image as fallback.
- MP4 files should ideally use H.264 video codec and AAC audio codec, even when muted.
- Avoid very large MP4 files for GitHub Pages. Compress videos before deployment when possible.

## Color system

The project uses the original palette:

- brand-red: `#DC2626`
- brand-gold: `#C05E35`
- brand-cream: `#FEF2F2`
- brand-dark: `#0D0500`
- brand-surface: `#1A0A00`
- brand-surface-2: `#2D1200`
- brand-muted: `#C4A882`

The Tailwind config is defined in `index.html`, and fallback CSS utility classes are included in `css/base.css` so the key colors remain visible after deployment.

