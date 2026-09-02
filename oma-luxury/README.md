# OMA LUXURY

A premium Vite + React e-commerce storefront for OMA LUXURY, built with React Router and a centralized brand configuration.

## Run locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Rebrand the site

Update all brand-facing content in:

- `src/config/brand.js`

This file controls the store name, monogram, tagline, description, contact details, social links, and currency symbol/code.

## Change the theme

Edit the CSS custom properties in:

- `src/styles/globals.css`

The design tokens at the top of the file control colors, fonts, spacing, transitions, and layout sizing.

## Update products

Edit the catalog data in:

- `src/data/products.js`

This file contains the sample products, pricing, categories, image URLs, featured flags, and new-arrival flags.

## Project structure

```text
src/
  components/
  config/
  context/
  data/
  pages/
  styles/
```

## Notes

- Cart and wishlist data are stored in localStorage.
- Routing is handled with React Router.
- The checkout, contact, newsletter, and account flows are front-end only UI.
