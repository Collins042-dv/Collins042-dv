# OMA LUXURY Admin Foundation

This storefront now includes a protected `/admin` foundation backed by `services/admin/` so the future back-office can be connected without rewriting storefront logic.

Current admin modules:
- Product management (catalog CRUD, pricing, media, collection assignment, stock updates)
- Order operations (status management, customer communication, export and reporting)
- Customer management (profiles, segmentation, purchase history, outreach notes)
- Collections, categories, inventory, content and settings sections scaffolded for future backend wiring

Security notes:
1. `/admin/*` access is enforced server-side by middleware and a layout role check.
2. The first admin must be created with `npm run seed:admin` using environment variables.
3. No admin credentials are hardcoded in the codebase.

Suggested next steps:
1. Connect product, order and content services to a real database/storage backend.
2. Add audit logging, role-based permissions expansion and media upload workflows.
