import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export default function AdminCategoriesPage() {
  return (
    <AdminPlaceholderPage
      eyebrow="Categories"
      title="Category governance"
      description="Maintain the storefront taxonomy for womenswear, bags, perfumes and accessories through a server-protected admin workspace."
      cards={[
        {
          title: "Navigation alignment",
          body: "Keep category labels aligned with the public shop filters so merchandising changes stay consistent across the storefront and admin tools.",
        },
        {
          title: "Future automation",
          body: "This route is ready for category images, SEO copy and sort rules when the permanent category backend is connected.",
        },
      ]}
    />
  );
}
