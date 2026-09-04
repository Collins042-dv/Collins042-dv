import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export default function AdminContentPage() {
  return (
    <AdminPlaceholderPage
      eyebrow="Homepage & content"
      title="Editorial content planning"
      description="Prepare homepage highlights, lookbook updates and campaign content management without redesigning the storefront."
      cards={[
        {
          title: "Homepage merchandising",
          body: "Use this route as the future home for hero modules, featured edits and campaign sequencing while keeping the premium OMA LUXURY presentation intact.",
        },
        {
          title: "Lookbook operations",
          body: "Connect editorial copy, imagery and publication scheduling here when the external CMS or database is ready.",
        },
      ]}
    />
  );
}
