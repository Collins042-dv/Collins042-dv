import { AdminSectionIntro } from "@/components/admin/AdminSectionIntro";
import { OverviewClient } from "./OverviewClient";

export default function AdminPage() {
  return (
    <>
      <AdminSectionIntro
        eyebrow="Overview"
        title="At-a-glance performance"
        description="Review the current storefront catalog, customer base and orders while external database and payment integrations are being finalized."
      />
      <OverviewClient />
    </>
  );
}
