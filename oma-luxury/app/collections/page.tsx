import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Collections",
  description: `Explore signature collections from ${brand.name}.`,
  openGraph: { title: `Collections | ${brand.name}`, description: brand.description, type: "website" },
};

const cards = [
  { title: "The Classic Edit", image: "https://images.unsplash.com/photo-1594938298603-e8d2533be27a?auto=format&fit=crop&w=1200&q=80", copy: "Timeless silhouettes elevated with soft structure and understated glamour." },
  { title: "The Modern Woman", image: "https://images.unsplash.com/photo-1469334031814-a597e41a7b0b?auto=format&fit=crop&w=1200&q=80", copy: "Sharp tailoring and confident pieces for women who move with intention." },
  { title: "Holiday Collection", image: "https://images.unsplash.com/photo-1547949003-9792a18a2841?auto=format&fit=crop&w=1200&q=80", copy: "Light textures, luminous details and destination-ready accents." },
  { title: "Signature Pieces", image: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1200&q=80", copy: "Statement investments crafted to anchor a luxury wardrobe." },
];

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Collections</p>
        <h1 className="mt-3 font-heading text-5xl">Signature wardrobes for distinct moments</h1>
        <p className="mt-5 text-sm leading-8 text-neutral-600">Each collection interprets the {brand.name} woman through a unique lens of confidence, softness and refined presence.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.title} href="/shop" className="group relative min-h-[420px] overflow-hidden rounded-[2rem]">
            <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <h2 className="font-heading text-4xl">{card.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/80">{card.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
