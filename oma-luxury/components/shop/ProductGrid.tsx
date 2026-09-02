export function ProductGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">{children}</div>;
}
