import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export default function AdminInventoryPage() {
  return (
    <AdminPlaceholderPage
      eyebrow="Inventory"
      title="Stock visibility"
      description="Review stock levels, preorder states and low-stock alerts without exposing management logic to the client."
      cards={[
        {
          title: "Availability control",
          body: "The product workspace already stores stock counts and statuses. This section is reserved for batch updates and warehouse sync once the inventory backend is connected.",
        },
        {
          title: "Operational readiness",
          body: "Track low stock, sold-out items and preorder launches here to keep fulfillment decisions centralized and admin-only.",
        },
      ]}
    />
  );
}
