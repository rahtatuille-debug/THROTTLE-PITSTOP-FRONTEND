# Throttle Pitstop — Frontend

Next.js (App Router) + Tailwind storefront for Throttle Pitstop
(Anwar Center, Karen). Covers **Phase 0–2** of the build plan: site
shell, branding, and the product catalog (shop grid + product detail),
reading from the Django backend API.

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
- `/about`, `/services`, `/contact` — Placeholder pages (real content is Phase 7)

## Design notes

- Colors and fonts are defined as Tailwind tokens in `tailwind.config.js`
  (`throttle.orange`, `throttle.ink`, etc.) — change brand colors there,
  not by hunting for hex codes in components.
- The diagonal "speed line" motif (`.diagonal-panel` in `globals.css`)
  is the site's one recurring visual signature — reuse it rather than
  introducing a new decorative shape elsewhere.
- `src/lib/api.js` is the only place that talks to the backend — add
  new endpoints there, not with raw `fetch()` calls scattered in pages.

## What's not built yet

Cart, checkout, and payments are Phase 3–5 — the "Add to cart" button
on product pages is currently a disabled placeholder. See
`throttle-pitstop-build-plan.md`.
