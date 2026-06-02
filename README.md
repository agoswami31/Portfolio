# Aishwary Goswami — Portfolio

Single-page portfolio. React (via CDN) + GSAP ScrollTrigger, warm-minimalist
design system. No build step — it's a static site.

## Deploy (Vercel)
- Framework preset: **Other**
- Build command: *(none)*
- Output directory: **/** (root)

Vercel serves `index.html` at the domain root.

## Local preview
The app loads its `.jsx` through in-browser Babel, which needs HTTP (not file://):

    python3 -m http.server 8000
    # open http://localhost:8000

## Files
- `index.html` — entry, design tokens, fonts, CDN scripts
- `portfolio-data.js` — all content (edit copy/links here)
- `portfolio-sections.jsx` — styles + shared components
- `portfolio-app.jsx` — page composition + scroll animations
- `image-slot.js`, `tweaks-panel.jsx` — editor scaffolding (inert when live)
- `uploads/` — headshot + company/project logos
