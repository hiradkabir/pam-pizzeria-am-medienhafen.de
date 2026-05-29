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
Google/Maps-style discovery
a friend's recommendation
direct domain visit
nearby mobile browsing
```

They are often on mobile and are scanning for:

```txt
atmosphere
menu and prices
location
opening hours
phone/order action
```

The decision window is short. The website must answer “Does this feel good, and can I act now?” within seconds.

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

The website is organized as a single static page:

```txt
Hero
Highlights bar
Über uns
Signature dish / Calzone
Speisekarte
Galerie
Kontakt & Öffnungszeiten
Legal modals
Desktop back-to-top button
Mobile floating call button
```

## Current main interactions

```txt
navbar changes state after scroll
mobile nav links appear after scroll
mobile call button appears after scroll and is hidden at the top
Speisekarte uses tab switching
mobile Speisekarte supports swipe between tabs
gallery images use depth styling
desktop back-to-top button scrolls to top
Impressum and Datenschutz open as modals
videos try autoplay and fall back to poster/background when blocked
```

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
   The site should remain a static HTML/CSS/JS project. Avoid unnecessary dependencies, tracking scripts, or app-like complexity.

6. **Whole-project plausibility**  
   HTML, CSS, JS, documentation, and media references must stay consistent with each other.

## Anti-references

Avoid:

```txt
Italian flag color schemes
green-white-red decoration
clipart pizza graphics
neon delivery-app CTAs
generic SaaS gradients
excessive animation
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
read about the restaurant
open legal information
```

## Mobile product behavior

Mobile is the priority context.

Current mobile behavior:

```txt
no hamburger menu
centered top wordmark
compact nav links after scroll
phone button hidden at page top and visible after scroll
hero-loop.mp4 visible with reduced gradient overlay
Calzone.mp4 sized for mobile
fireplace video removed/hidden on mobile
Speisekarte tabs arranged 2 columns × 3 rows
gallery arranged as compact 2-column grid
Kontakt content collapses into a single-column flow
```

## Desktop product behavior

Desktop supports a more atmospheric presentation:

```txt
full navigation row
hero video background
desktop fireplace video in Speisekarte
larger visual rhythm
gallery depth effects
map-led Kontakt layout
desktop-only back-to-top button
```

## Accessibility and privacy

The project should remain usable without tracking or analytics.

Accessibility priorities:

```txt
high contrast over video/image backgrounds
visible focus states
large enough mobile touch targets
reduced-motion support
clear text hierarchy
readable menu categories and prices
```

Privacy priorities:

```txt
no analytics cookies
no tracking scripts
OpenStreetMap instead of Google Maps
static deployment
```

## Non-goals

Do not turn this project into:

```txt
a delivery marketplace
a booking system
a React/Vue app
a multi-page CMS
a heavy animation showcase
a generic Italian restaurant template
```

## Maintenance rules for future edits

```txt
Only change what was requested.
Preserve filenames unless explicitly told otherwise.
Check related files before editing.
Remove obsolete code when replacing a structure.
Keep README.md, DESIGN.md, and PRODUCT.md aligned with the actual code.
```
