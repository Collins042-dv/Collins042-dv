import { AdminSectionIntro } from "@/components/admin/AdminSectionIntro";

export function AdminPlaceholderPage({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{ title: string; body: string }>;
}) {
  return (
    <>
      <AdminSectionIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
            <h3 className="font-heading text-3xl">{card.title}</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-600">{card.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
