import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: `Learn the story and values behind ${brand.name}.`,
  openGraph: { title: `About | ${brand.name}`, description: brand.description, type: "website" },
};

const values = [
  { title: "Refined Confidence", copy: "We design for women who want their wardrobe to quietly communicate intention and strength." },
  { title: "Modern Femininity", copy: "Softness, polish and versatility guide every category from ready-to-wear to fragrance." },
  { title: "Considered Luxury", copy: `The ${brand.name} edit is shaped around timeless appeal rather than fleeting trends.` },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About us</p>
          <h1 className="mt-3 font-heading text-5xl">The story of {brand.name}</h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-neutral-600">
            Born in Lagos, {brand.name} is an ode to women who appreciate understated impact. We curate premium fashion, statement bags and captivating fragrances that support how a woman enters every room.
          </p>
          <div className="mt-10 space-y-5">
            {values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
                <h2 className="font-heading text-3xl">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image src="https://images.unsplash.com/photo-1469334031814-a597e41a7b0b?auto=format&fit=crop&w=1400&q=80" alt={`${brand.name} fashion`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem]">
            <Image src="https://images.unsplash.com/photo-1548036161-97a2a6add2cc?auto=format&fit=crop&w=1400&q=80" alt={`${brand.name} accessories`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </div>
  );
}
