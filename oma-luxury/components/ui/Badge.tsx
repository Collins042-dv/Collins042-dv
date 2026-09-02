import type { ProductStatus } from "@/data/products";
import { cn, statusCopy } from "@/lib/utils";

const statusStyles: Record<ProductStatus, string> = {
  IN_STOCK: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  LOW_STOCK: "bg-amber-50 text-amber-700 border border-amber-200",
  SOLD_OUT: "bg-neutral-100 text-neutral-600 border border-neutral-200",
  COMING_SOON: "bg-blue-50 text-blue-700 border border-blue-200",
  PREORDER: "bg-violet-50 text-violet-700 border border-violet-200",
};

export function Badge({ status, className }: { status: ProductStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
        statusStyles[status],
        className,
      )}
    >
      {statusCopy[status]}
    </span>
  );
}
