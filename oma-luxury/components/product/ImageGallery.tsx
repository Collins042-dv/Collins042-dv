"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-cream">
        <Image src={activeImage} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-2xl border transition",
              activeImage === image ? "border-brand-gold" : "border-transparent hover:border-brand-beige",
            )}
          >
            <Image src={image} alt={`${alt} thumbnail ${index + 1}`} fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
