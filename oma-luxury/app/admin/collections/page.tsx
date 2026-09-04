import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export default function AdminCollectionsPage() {
  return (
    <AdminPlaceholderPage
      eyebrow="Collections"
      title="Collection planning"
      description="Organize seasonal drops, campaign edits and merchandising stories while keeping the existing OMA LUXURY visual identity intact."
      cards={[
        {
          title: "Collection hierarchy",
          body: "Map signature edits, holiday capsules and campaign groupings before replacing the draft product service with a permanent database-backed collection model.",
        },
        {
          title: "Launch workflow",
          body: "Use this section to coordinate featured sets, launch windows and supporting homepage placements once content APIs are connected.",
        },
      ]}
    />
  );
}
