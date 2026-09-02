# OMA LUXURY — Premium Women's Fashion E-Commerce

A fully-featured Next.js 14 storefront for OMA LUXURY, a premium Nigerian women's fashion brand selling women's wear, bags, perfumes, and accessories.

---

## Getting Started

```bash
cd oma-luxury
npm install
npm run dev        # Development server on http://localhost:3000
npm run build      # Production build
npm run start      # Start production server
```

---

## Project Structure

```
oma-luxury/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── shop/               # Shop listing + product detail
│   │   └── [slug]/         # /shop/product-slug
│   ├── cart/               # Full cart page
│   ├── checkout/           # Checkout + order confirmation
│   ├── collections/        # Collections overview
│   ├── account/            # Auth + profile + orders + wishlist
│   ├── about/
│   ├── lookbook/
│   └── contact/
├── components/
│   ├── layout/             # Navbar, Footer, CartDrawer
│   ├── shop/               # ProductCard, ProductFilters, QuickViewModal
│   ├── product/            # ImageGallery
│   └── ui/                 # Button, Badge, Input
├── config/
│   ├── brand.ts            # ← REBRAND HERE (name, tagline, contact, socials)
│   └── theme.ts            # ← Design tokens (colors, fonts)
├── data/
│   └── products.ts         # 25 seed products (replace with DB)
├── services/
│   ├── products.ts         # Product queries (swap for real API)
│   ├── auth.ts             # Auth service (swap for Supabase/Firebase)
│   ├── orders.ts           # Order creation/retrieval
│   ├── payments.ts         # Payment abstraction (Paystack-ready)
│   └── admin/              # Admin service interfaces
├── store/
│   ├── CartContext.tsx      # Global cart state (localStorage)
│   ├── WishlistContext.tsx  # Global wishlist state (localStorage)
│   └── AuthContext.tsx      # Auth state
├── types/                  # Shared TypeScript types
└── ADMIN.md                # Admin module architecture plan
```

---

## How to Rebrand

All brand-specific values are centralised in **`config/brand.ts`**:

```ts
export const brand = {
  name: "OMA LUXURY",       // ← change this
  tagline: "...",
  email: "...",
  phone: "...",
  social: { instagram: "...", ... },
};
```

Change `name` once and every page title, footer, and metadata updates automatically.

Theme colours and fonts live in **`config/theme.ts`**.

---

## What's Live vs Stubbed

| Feature | Status | Notes |
|---|---|---|
| Product browsing / filtering | ✅ Live (client-side) | Filters the seed product array |
| Cart | ✅ Live | localStorage-persisted |
| Wishlist | ✅ Live | localStorage-persisted |
| Auth (register/login/logout) | ✅ Functional mock | localStorage only — swap with real provider |
| Checkout form | ✅ Live | Creates order object locally |
| Payments | ⚠️ Stubbed | `services/payments.ts` — set `PAYMENTS_ENABLED = true` and add Paystack keys |
| Email notifications | ⚠️ Stubbed | Not wired — add SendGrid/Resend in `services/email.ts` |
| Database | ⚠️ Seed data | `data/products.ts` — replace `services/products.ts` with real API |
| Admin dashboard | ⚠️ Interfaces only | See `ADMIN.md` and `services/admin/` |

---

## Connecting Paystack

1. Set `PAYMENTS_ENABLED = true` in `services/payments.ts`
2. Add `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` to `.env.local`
3. Implement `initiatePayment()` using the Paystack Inline or Standard API

---

## Connecting a Real Database

1. Replace `data/products.ts` seed data with DB queries in `services/products.ts`
2. All components use the service layer — no component-level data fetching to change

---

## Product Model

```ts
{
  id, name, slug, description,
  price,          // Naira
  salePrice?,     // discounted price if on sale
  category,       // womens-wear | bags | perfumes | accessories
  collection?,
  images,         // string[]
  sizes?,         // clothing sizes
  colors?,
  stock,
  status,         // IN_STOCK | LOW_STOCK | SOLD_OUT | COMING_SOON | PREORDER
  featured,
  newArrival,
  createdAt, updatedAt
}
```

---

## Responsive Breakpoints

- Desktop: 4-column product grid (1280px+)
- Tablet: 3-column (768px–1279px)
- Mobile: 2-column (<768px)
