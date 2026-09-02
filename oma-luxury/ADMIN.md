# OMA LUXURY Admin Foundation

This storefront includes interface-first admin foundations in `services/admin/` so the future back-office can be connected without rewriting storefront logic.

Planned admin modules:
- Product management (catalog CRUD, pricing, media, collection assignment, stock updates)
- Order operations (status management, customer communication, export and reporting)
- Customer management (profiles, segmentation, purchase history, outreach notes)

Suggested next steps:
1. Add authenticated admin routes under `app/admin/`.
2. Connect these interfaces to a real API or database.
3. Add audit logging, role-based permissions and media upload workflows.
