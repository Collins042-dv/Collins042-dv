import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Lookbook",
  description: `Editorial imagery and styling inspiration from ${brand.name}.`,
  openGraph: { title: `Lookbook | ${brand.name}`, description: brand.description, type: "website" },
};

const images = [
  "https://images.unsplash.com/photo-1515886931-9936-427c-9c5e-0ed8e16c5b98?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1594938298603-e8d2533be27a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469334031814-a597e41a7b0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548036161-97a2a6add2cc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1588444968338-9b09af3eca78?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
];

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Lookbook</p>
        <h1 className="mt-3 font-heading text-5xl">Editorial frames from the world of {brand.name}</h1>
        <p className="mt-5 text-sm leading-8 text-neutral-600">A visual story shaped by elegant dressing, considered accessories and the mood of contemporary luxury.</p>
      </div>
      <div className="columns-1 gap-5 md:columns-2 xl:columns-4">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="mb-5 break-inside-avoid overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <div className={`relative ${index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[4/6]" : "aspect-square"}`}>
              <Image src={image} alt={`Lookbook ${index + 1}`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
