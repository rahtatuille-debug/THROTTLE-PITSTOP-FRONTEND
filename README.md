# Throttle Pitstop — Frontend

Next.js (App Router) + Tailwind storefront for Throttle Pitstop
(Anwar Center, Karen). Covers **Phase 0–3** of the build plan: site
shell, branding, the product catalog (shop grid + product detail), and
cart + guest checkout, reading from the Django backend API.

## Stack
- Next.js 14 (App Router, JavaScript)
- Tailwind CSS
- Fonts: Bebas Neue (display) + Inter (body), via next/font/google

## Quick start

```bash
npm install
cp .env.local.example .env.local
# edit .env.local if your backend isn't on localhost:8000

npm run dev
```

Visit `http://localhost:3000`. Make sure the backend is running first
(see `throttle-pitstop-backend/README.md`) and has been seeded:

```bash
python manage.py seed_catalog
```

...or the shop page will show an empty state.

## What's here

- `/` — Home, with hero, category strip, featured products
- `/shop` — Full catalog grid with category filter sidebar
- `/shop/[slug]` — Product detail page
- `/checkout` — Guest checkout (name, phone, delivery address, payment method)
- `/order-confirmation/[id]` — Order summary after checkout
- `/contact` — Phone numbers, opening hours, location
- `/about`, `/services` — Placeholder pages (real content is Phase 7)

## Design notes

- **Palette:** white, black and orange only. Colours and fonts are Tailwind
  tokens in `tailwind.config.js` (`throttle.orange`, `throttle.ink`, etc.).
  Change brand colours there, not by hunting for hex codes in components.
- **Type:** Bebas Neue for headlines (`.display-xl/lg/md`), Inter for body.
  Both are loaded by `next/font` in `app/layout.js`; don't redefine
  `--font-display`/`--font-body` in CSS or the fonts silently fall back.
- **Shared styles** live in `app/globals.css`: buttons (`.btn-primary`,
  `.btn-dark`, `.btn-ghost-light`, `.btn-ghost-dark`), `.eyebrow` labels,
  `.field` inputs, `.text-outline` type, and textures (`.grain`,
  `.grid-lines`, `.stripes`).
- **Every page opens on a dark banner** (`components/PageHero.js`) because
  the header is transparent at the top of the page and turns white on scroll.
- **Motion:** scroll-in animations use `components/Reveal.js`; the home hero's
  rev counter is `components/home/RevGauge.js`. All motion is switched off
  for visitors with "reduce motion" enabled.
- **Logo:** `public/logo-mark.png` is the transparent version used on the
  site. Favicons are `app/icon.png` and `app/apple-icon.png`.
- Shop hours, phone numbers and location live in `src/lib/shop.js`, and
  every page reads them from there.
- `src/lib/api.js` is the only place that talks to the backend. Add
  new endpoints there, not with raw `fetch()` calls scattered in pages.

## What's not built yet

Real M-Pesa payment is Phase 4–5 — checkout records the chosen
payment method, but doesn't take payment online yet. See
`throttle-pitstop-build-plan.md`.
