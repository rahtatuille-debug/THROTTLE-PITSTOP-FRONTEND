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

- Colors and fonts are defined as Tailwind tokens in `tailwind.config.js`
  (`throttle.orange`, `throttle.ink`, etc.) — change brand colors there,
  not by hunting for hex codes in components.
- The diagonal "speed line" motif (`.diagonal-panel` in `globals.css`)
  is the site's one recurring visual signature — reuse it rather than
  introducing a new decorative shape elsewhere.
- Shop hours, phone numbers and location live in `src/lib/shop.js` —
  the footer and contact page both read from it.
- `src/lib/api.js` is the only place that talks to the backend — add
  new endpoints there, not with raw `fetch()` calls scattered in pages.

## What's not built yet

Real M-Pesa payment is Phase 4–5 — checkout records the chosen
payment method, but doesn't take payment online yet. See
`throttle-pitstop-build-plan.md`.
