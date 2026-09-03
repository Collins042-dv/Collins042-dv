import Link from "next/link";
import { brand } from "@/config/brand";

const footerGroups = {
  shop: [
    { label: "Women's Wear", href: "/shop?category=womens-wear" },
    { label: "Bags", href: "/shop?category=bags" },
    { label: "Perfumes", href: "/shop?category=perfumes" },
    { label: "Accessories", href: "/shop?category=accessories" },
  ],
  collections: [
    { label: "The Classic Edit", href: "/collections" },
    { label: "The Modern Woman", href: "/collections" },
    { label: "Holiday Collection", href: "/collections" },
    { label: "Signature Pieces", href: "/collections" },
  ],
  care: [
    { label: "Contact Us", href: "/contact" },
    { label: "Account", href: "/account" },
    { label: "Wishlist", href: "/account/wishlist" },
    { label: "Orders", href: "/account/orders" },
  ],
  social: [
    { label: "Instagram", href: brand.social.instagram },
    { label: "TikTok", href: brand.social.tiktok },
    { label: "Facebook", href: brand.social.facebook },
    { label: "WhatsApp", href: brand.social.whatsapp },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:px-10">
        <div>
          <p className="font-heading text-4xl">{brand.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">{brand.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-brand-champagne">{brand.tagline}</p>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Newsletter</p>
            <p className="mt-2 text-sm text-white/80">{brand.newsletterDescription}</p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-brand-champagne px-5 py-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-black">
                Join
              </button>
            </form>
          </div>
        </div>

        {Object.entries(footerGroups).map(([key, links]) => (
          <div key={key}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-white/60">{key}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-brand-champagne">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs uppercase tracking-[0.25em] text-white/50 lg:px-10">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
