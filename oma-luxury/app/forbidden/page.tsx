import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Access denied",
  description: `Access to this ${brand.name} page is restricted.`,
};

export default function ForbiddenPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
      <div className="rounded-[2rem] border border-black/5 bg-white p-10 shadow-soft">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">403</p>
        <h1 className="mt-4 font-heading text-5xl">Access denied</h1>
        <p className="mt-6 text-sm leading-7 text-neutral-600">
          You do not have permission to view this page. Sign in with an administrator account to continue.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/account/login" className="rounded-full bg-brand-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
            Sign in
          </Link>
          <Link href="/" className="rounded-full border border-brand-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-brand-black">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
