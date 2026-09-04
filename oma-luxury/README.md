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
| Auth (register/login/logout/reset/session) | ✅ Supabase-backed | Requires Supabase env vars and `profiles` table |
| Checkout form | ✅ Live | Creates order object locally |
| Payments | ⚠️ Stubbed | `services/payments.ts` — set `PAYMENTS_ENABLED = true` and add Paystack keys |
| Email notifications | ⚠️ Stubbed | Not wired — add SendGrid/Resend in `services/email.ts` |
| Database | ⚠️ Seed data | `data/products.ts` — replace `services/products.ts` with real API |
| Admin dashboard | ✅ Protected foundation | `/admin/*` is protected by middleware + server role checks |

---

## Authentication & Admin Setup

Authentication now uses **Supabase Auth** behind the existing `services/auth.ts` interface. If auth is not configured, the account screens fail gracefully with a clear message instead of inventing credentials or pretending to succeed.

### Required environment variables

Create **`.env.local`** (it is gitignored) with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123
```

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required for customer sign-up, login, logout, password reset, and session persistence.
- `SUPABASE_SERVICE_ROLE_KEY` is **server-only** and is only used by the admin seed script.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are only read by the seed script. No default admin credentials are hardcoded anywhere.

### Required `profiles` table

Create a `profiles` table in Supabase keyed by the auth user ID so admin/customer roles are enforced server-side:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null check (role in ('CUSTOMER', 'ADMIN')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
```

The admin customer endpoint verifies the caller is an authenticated `ADMIN`, then uses the server-only `SUPABASE_SERVICE_ROLE_KEY` to read all customer profiles without exposing that key to the browser.

### Seed the first admin

Run the server-side seed script only after the env vars above exist:

```bash
cd oma-luxury
npm install
npm run seed:admin
```

The script exits with a clear message if `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, or `ADMIN_PASSWORD` is missing. It creates or reuses the auth user, then upserts an `ADMIN` role in `profiles`.

### Route protection

- `/account/*` protected routes are enforced by **Next.js middleware** using the active Supabase session cookie.
- `/admin/*` is protected by **middleware and a server-side layout check** against the `profiles.role` value.
- Customers who type `/admin` directly are redirected to `/forbidden`.

---

## Connecting Paystack

1. Set `PAYMENTS_ENABLED = true` in `services/payments.ts`
2. Add `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` to `.env.local`
3. Implement `initiatePayment()` using the Paystack Inline or Standard API

---

## Connecting a Real Database

1. Replace `data/products.ts` seed data with DB queries in `services/products.ts`
2. Replace the draft admin catalog persistence in `services/admin/products.ts` with your production products API
3. Replace the local order persistence in `services/orders.ts` / `services/admin/orders.ts` with a shared database-backed order store
4. All components use the service layer — no component-level data fetching to change

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
