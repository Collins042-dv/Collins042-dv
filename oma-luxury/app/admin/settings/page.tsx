import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export default function AdminSettingsPage() {
  return (
    <AdminPlaceholderPage
      eyebrow="Settings"
      title="Launch configuration"
      description="Centralize brand operations, admin safeguards and integration readiness ahead of production setup."
      cards={[
        {
          title: "Authentication readiness",
          body: "Configure Supabase URL, anon key, service role key and the server-side admin seed command before opening the dashboard to staff accounts.",
        },
        {
          title: "Operational controls",
          body: "This route is reserved for future payment, email, delivery and content settings once those integrations are connected to real production services.",
        },
      ]}
    />
  );
}
