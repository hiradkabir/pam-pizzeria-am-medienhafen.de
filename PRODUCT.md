# Product — Pizzeria am Medienhafen

## Register

brand

## Product type

Static restaurant website for **Pizzeria am Medienhafen** in Düsseldorf.

The site is a first-impression and conversion surface, not a complex web app. Its purpose is to make a visitor feel the atmosphere, understand the food, find the location, and act quickly.

## Primary users

New and returning visitors deciding where to eat in the Düsseldorf Medienhafen area.

They commonly arrive through:

```txt
Google search
map-style discovery
a friend's recommendation
direct domain visit
nearby mobile browsing
```

They are often on mobile and scan for:

```txt
atmosphere
menu and prices
location
opening hours
phone/order action
```

The decision window is short. The website must answer: “Does this feel good, and can I act now?” within seconds.

## Product purpose

Convert a curious visitor into a guest or caller.

Success means:

```txt
the restaurant feels warm and authentic
the user reaches the menu quickly
prices and food categories are clear
the user can call easily on mobile
the user can find the location without friction
```

## Current product structure

The website is organized as one static page:

```txt
Hero
Static Google rating strip
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

## Current main interactions

```txt
navbar changes state after scroll
mobile hamburger menu provides quick section access
static 4,4-star Google rating strip links to the current Google result without loading an external widget
mobile call button appears after scroll and is hidden at the top
Speisekarte uses tab switching
Speisekarte exposes accessible tab semantics and keyboard navigation
mobile Speisekarte supports swipe between tabs
gallery uses a swipe-and-snap carousel with automatic center-weighted highlighting and one progressive indicator system on mobile and desktop
content reveals through CSS view timelines as it enters the viewport without blur
the contact order button and mobile telephone button use a restrained deep-red gradient, glow and highlight sweep
desktop back-to-top button scrolls to top
Impressum and Datenschutz open as modals
modals move focus inside, trap keyboard focus and return focus to their opener
hero video selects desktop/mobile source by breakpoint
below-the-fold videos lazy-load near the viewport
videos pause outside the viewport and while the browser tab is hidden
only visible videos resume when the page becomes active again
videos try autoplay and fall back to poster/background on error
```

The viewport reveal is decorative CSS behavior. It uses no JavaScript reveal observer and includes no reading-progress bar.

## Brand personality

Warm · Authentic · Neighbourhood · Established

The restaurant should feel like a real local place with history, not like a generic delivery template.

Voice:

```txt
confident but not loud
traditional but not old-fashioned
warm but not playful
Italian through craft, not cliché
```

## Product principles

1. **Atmosphere before information**  
   The first screen should communicate warmth, fire, wood, dough, and evening ambience before the user reads details.

2. **First visit, zero friction**  
   Menu, location, opening hours, and call action must be easy to reach.

3. **Mobile-first decision support**  
   Mobile users should quickly see the hero, reach the menu, use the 2 × 3 category tabs, view compact gallery impressions, and call.

4. **Real restaurant, real media**  
   Use actual photos and videos. Avoid fake stock imagery, generic icons, and visual patterns that feel like a delivery marketplace.

5. **Static and lightweight**  
   The published site should remain static HTML/CSS/JS. Build-time tooling may compile local production CSS, but no framework or Tailwind runtime CDN is shipped.

6. **Whole-project plausibility**  
   HTML, CSS, JS, documentation, and media references must stay consistent with each other.

7. **No dead code**  
   Replaced structures should be removed. Old selectors, inactive HTML, stale comments, and duplicate responsive rules should not remain in production files.

## Anti-references

Avoid:

```txt
Italian flag color schemes
green-white-red decoration
clipart pizza graphics
neon delivery-app CTAs
generic SaaS gradients
excessive animation
JavaScript used only for decorative scroll reveals
template-looking restaurant visuals
unused/dead code
unrequested file renaming
```

## Conversion model

Primary conversion actions:

```txt
call the restaurant
view Speisekarte
find the location
read opening hours
```

Secondary conversion actions:

```txt
view gallery
open legal information
```

## Mobile product behavior

Mobile is the priority context.

Current mobile behavior:

```txt
hamburger menu with black dropdown
centered top wordmark
menu links ordered Speisekarte, Kontakt
phone button hidden at page top and visible after scroll
hero-loop-mob.mp4 used for mobile hero when available
hero overlay reduced so the video remains visible
mobile hero label and Speisekarte hero CTA hidden
Calzone.mp4 uses its landscape aspect ratio on mobile so the complete dish remains visible
Calzone description follows directly below the media with compact spacing
fireplace video removed/hidden on mobile
Speisekarte tabs arranged 2 columns × 3 rows
gallery uses portrait cards with touch swiping, centered snapping and automatic focus scaling
Kontakt content collapses into a single-column flow
```

## Desktop product behavior

Desktop supports a more atmospheric presentation:

```txt
full navigation row
hero-loop.mp4 as hero video background
desktop fireplace video in Speisekarte
larger visual rhythm
wide gallery carousel with centered snapping and automatic focus scaling
native CSS carousel controls where supported
map-led Kontakt layout
desktop-only back-to-top button
```

## Media product behavior

Hero media:

```txt
desktop: assets/videos/hero-loop.mp4
mobile:  assets/videos/hero-loop-mob.mp4
fallback: assets/images/hero-poster.jpg
```

Signature media:

```txt
video: assets/videos/Calzone.mp4
fallback: assets/images/Calzone.jpg
```

Menu atmosphere:

```txt
desktop: assets/videos/Fireplace-dynamic5000px.mp4
fallback: assets/images/Fireplace5000px.jpg
mobile: hidden
```

## Accessibility and privacy

The project should remain usable without tracking or analytics.

Accessibility priorities:

```txt
strong contrast over video/image backgrounds
clear focus states
touch-friendly mobile call action
readable menu prices
modals closable by buttons, backdrop, and Escape
keyboard-operable Speisekarte tabs
modal focus management and focus return
no scroll-trapping map
```

Privacy priorities:

```txt
static site
no analytics scripts
no tracking cookies
OpenStreetMap embed instead of Google Maps
legal information accessible in modals
```

## Technical product boundaries

The project should remain:

```txt
static
single-page
HTML/CSS/JS production output
local build-time Tailwind compilation
GitHub Pages compatible
case-sensitive path safe
easy to update manually
```

Avoid turning it into:

```txt
a framework app
a CMS
a delivery platform clone
a tracking-heavy marketing page
a multi-page site unless explicitly requested
```

## Maintenance expectations

Every future change should follow this order:

```txt
1. Use the newest project files as source of truth.
2. Identify exactly which files are required for the requested change.
3. Change only those files.
4. Preserve filenames.
5. Remove obsolete code if it is replaced.
6. Check consistency between HTML, CSS, JS, and Markdown docs.
7. Return only changed files.
```
