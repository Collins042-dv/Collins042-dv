export function AdminSectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">{description}</p>
    </div>
  );
}
