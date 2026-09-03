import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/config/brand";
import { getFeaturedProducts, getNewArrivals } from "@/services/products";

export const metadata: Metadata = {
  title: "Home",
  description: `${brand.description} Discover premium women's wear, bags, perfumes and accessories from ${brand.name}.`,
  openGraph: {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    type: "website",
  },
};

const lookbookImages = [
  "https://images.unsplash.com/photo-1515886931-9936-427c-9c5e-0ed8e16c5b98?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1594938298603-e8d2533be27a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469334031814-a597e41a7b0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548036161-97a2a6add2cc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1588444968338-9b09af3eca78?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
];

const collectionCards = [
  {
    title: "Women's Wear",
    href: "/shop?category=womens-wear",
    image: "https://images.unsplash.com/photo-1515886931-9936-427c-9c5e-0ed8e16c5b98?auto=format&fit=crop&w=1200&q=80",
    copy: "Tailored silhouettes, occasion dressing and elevated daywear.",
  },
  {
    title: "Bags",
    href: "/shop?category=bags",
    image: "https://images.unsplash.com/photo-1548036161-97a2a6add2cc?auto=format&fit=crop&w=1200&q=80",
    copy: "Statement companions crafted to complete every look.",
  },
  {
    title: "Perfumes",
    href: "/shop?category=perfumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1200&q=80",
    copy: "Captivating scents layered with warmth, florals and depth.",
  },
  {
    title: "New Arrivals",
    href: "/shop?collection=Holiday%20Collection",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
    copy: "Fresh edits for the woman refining how she shows up.",
  },
];

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 4);
  const arrivals = (await getNewArrivals()).slice(0, 4);

  return (
    <div className="animate-fadeIn">
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-brand-black text-white">
        <Image
          src="https://images.unsplash.com/photo-1515886931-9936-427c-9c5e-0ed8e16c5b98?auto=format&fit=crop&w=1600&q=80"
          alt={brand.name}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-brand-champagne">{brand.tagline}</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-tight sm:text-6xl lg:text-7xl">ELEVATE YOUR EVERYDAY.</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              {brand.description} Curated in Lagos for the modern woman who values presence, polish and quiet confidence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-full bg-brand-champagne px-7 py-4 text-sm font-medium uppercase tracking-[0.25em] text-brand-black transition hover:bg-white">
                Shop now
              </Link>
              <Link href="/lookbook" className="rounded-full border border-white/20 px-7 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-brand-black">
                Explore lookbook
              </Link>
            </div>
          </div>
          <div className="self-end rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne">Editorial note</p>
            <p className="mt-4 font-heading text-3xl">{brand.heroEditorialNote}</p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Discover elegant dressing, sculpted handbags and immersive fragrances designed to translate seamlessly from meetings to moments worth celebrating.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Collections</p>
              <h2 className="mt-3 font-heading text-4xl text-brand-black">Curated departments for elevated living</h2>
            </div>
            <Link href="/collections" className="text-xs uppercase tracking-[0.2em] text-neutral-500 underline-offset-4 hover:underline">
              View all collections
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {collectionCards.map((card, index) => (
            <Reveal key={card.title} className={index % 2 ? "md:translate-y-10" : ""}>
              <Link href={card.href} className="group relative block min-h-[420px] overflow-hidden rounded-[2rem]">
                <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne">Edit {index + 1}</p>
                  <h3 className="mt-4 font-heading text-4xl">{card.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{card.copy}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">The OMA Edit</p>
              <h2 className="mt-3 font-heading text-4xl text-brand-black">Featured arrivals selected to define the season</h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-neutral-500 underline-offset-4 hover:underline">Shop all</Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-brand-black px-6 py-24 text-white lg:px-10">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-champagne">Brand statement</p>
          <h2 className="mt-8 font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            STYLE ISN'T JUST WHAT YOU WEAR. IT'S HOW YOU PRESENT YOURSELF.
          </h2>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
        <Reveal className="overflow-hidden rounded-[2rem]">
          <div className="relative min-h-[520px]">
            <Image src="https://images.unsplash.com/photo-1548036161-97a2a6add2cc?auto=format&fit=crop&w=1400&q=80" alt="Luxury bags" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Reveal>
        <Reveal className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Editorial bags</p>
          <h2 className="mt-4 font-heading text-4xl">Bags that frame every entrance with intention</h2>
          <p className="mt-6 max-w-xl text-sm leading-8 text-neutral-600">
            From softly structured totes to gleaming clutches, our handbag edit balances utility and sculpted beauty in premium finishes that ground every outfit.
          </p>
          <Link href="/shop?category=bags" className="mt-8 inline-flex w-fit rounded-full border border-brand-black px-6 py-3 text-sm uppercase tracking-[0.22em] text-brand-black transition hover:bg-brand-black hover:text-white">
            Shop bags
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10">
        <Reveal className="order-2 flex flex-col justify-center lg:order-1">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Fragrance house</p>
          <h2 className="mt-4 font-heading text-4xl">Captivating scents for the final luxurious layer</h2>
          <p className="mt-6 max-w-xl text-sm leading-8 text-neutral-600">
            Notes of amber, florals, musk and woods blend into fragrances that linger beautifully and complete your presence without saying too much.
          </p>
          <Link href="/shop?category=perfumes" className="mt-8 inline-flex w-fit rounded-full border border-brand-black px-6 py-3 text-sm uppercase tracking-[0.22em] text-brand-black transition hover:bg-brand-black hover:text-white">
            Discover perfumes
          </Link>
        </Reveal>
        <Reveal className="order-1 overflow-hidden rounded-[2rem] lg:order-2">
          <div className="relative min-h-[520px]">
            <Image src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1400&q=80" alt="Luxury fragrance" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Lookbook</p>
              <h2 className="mt-3 font-heading text-4xl">An editorial glimpse into the world of {brand.name}</h2>
            </div>
            <Link href="/lookbook" className="text-xs uppercase tracking-[0.2em] text-neutral-500 underline-offset-4 hover:underline">View full lookbook</Link>
          </div>
        </Reveal>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
          {lookbookImages.map((image, index) => (
            <Reveal key={`${image}-${index}`} className="mb-5 break-inside-avoid overflow-hidden rounded-[2rem]">
              <div className={`relative ${index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[4/6]" : "aspect-square"}`}>
                <Image src={image} alt={`OMA lookbook frame ${index + 1}`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr] lg:px-10">
        <Reveal className="rounded-[2rem] bg-brand-cream p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About {brand.name}</p>
          <h2 className="mt-4 font-heading text-4xl text-brand-black">Created in Lagos with a refined eye for femininity and presence</h2>
          <p className="mt-6 text-sm leading-8 text-neutral-600">
            Our brand celebrates intentional dressing through timeless silhouettes, rich textures and modern glamour tailored to the rhythms of everyday luxury.
          </p>
          <Link href="/about" className="mt-8 inline-flex rounded-full bg-brand-black px-6 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:bg-brand-gold hover:text-brand-black">
            Read our story
          </Link>
        </Reveal>
        <Reveal className="rounded-[2rem] border border-brand-beige bg-white p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Newsletter</p>
          <h2 className="mt-4 font-heading text-4xl text-brand-black">Stay close to new drops and private style notes</h2>
          <p className="mt-6 text-sm leading-8 text-neutral-600">
            Join our list for collection previews, fragrance launches and early access to signature pieces.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Enter your email" className="w-full rounded-full border border-brand-beige bg-white px-5 py-4 text-sm outline-none" />
            <button className="rounded-full bg-brand-black px-6 py-4 text-sm uppercase tracking-[0.2em] text-white">Subscribe</button>
          </form>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">New arrivals</p>
              <h2 className="mt-3 font-heading text-4xl">Fresh arrivals for an effortlessly elevated edit</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {arrivals.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
