import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AUTH_CONFIGURATION_MESSAGE } from "@/lib/auth-config";
import { getServerAuthState } from "@/lib/auth-server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authState = await getServerAuthState();

  if (!authState.configured) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em]">Authentication not configured</p>
          <h1 className="mt-3 font-heading text-4xl">Admin access is unavailable</h1>
          <p className="mt-4 text-sm leading-7">{AUTH_CONFIGURATION_MESSAGE}</p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    redirect("/account/login?next=/admin");
  }

  if (authState.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  return <AdminShell user={authState.user}>{children}</AdminShell>;
}
