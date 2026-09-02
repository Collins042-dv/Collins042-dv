"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/AuthContext";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const iconClass = "h-5 w-5";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { items } = useWishlist();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const navShell = useMemo(
    () =>
      cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        scrolled || pathname !== "/"
          ? "border-black/5 bg-brand-ivory/95 backdrop-blur"
          : "border-white/10 bg-transparent text-white",
      ),
    [pathname, scrolled],
  );

  const goToSearch = () => {
    const value = search.trim();
    setSearchOpen(false);
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  };

  return (
    <>
      <header className={navShell}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className="text-xs uppercase tracking-[0.25em] transition hover:text-brand-gold">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="font-heading text-2xl tracking-[0.35em]">
            {brand.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className="text-xs uppercase tracking-[0.25em] transition hover:text-brand-gold">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="rounded-full border border-current/20 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}><circle cx="11" cy="11" r="7" strokeWidth="1.5" /><path d="m20 20-3.5-3.5" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <Link href={user ? "/account" : "/account/login"} aria-label="Account" className="rounded-full border border-current/20 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}><circle cx="12" cy="8" r="4" strokeWidth="1.5" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </Link>
            <Link href="/account/wishlist" aria-label="Wishlist" className="relative rounded-full border border-current/20 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeWidth="1.5" /></svg>
              {items.length ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-brand-black">{items.length}</span> : null}
            </Link>
            <button type="button" aria-label="Cart" onClick={openCart} className="relative rounded-full border border-current/20 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}><path d="M4 6h16l-1.5 8.5H7L5.5 4H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="19" r="1.25" strokeWidth="1.5" /><circle cx="17" cy="19" r="1.25" strokeWidth="1.5" /></svg>
              {itemCount ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-brand-black">{itemCount}</span> : null}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button className={`absolute inset-0 bg-black/60 transition ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} aria-label="Close mobile menu" />
        <div className={`absolute left-0 top-0 h-full w-[86%] max-w-sm bg-brand-black p-6 text-white transition duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-10 flex items-center justify-between">
            <p className="font-heading text-2xl tracking-[0.25em]">{brand.name}</p>
            <button onClick={() => setMobileOpen(false)} className="rounded-full border border-white/20 p-2">✕</button>
          </div>
          <nav className="space-y-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm uppercase tracking-[0.25em] text-white/80 transition hover:text-brand-champagne">
                {link.label}
              </Link>
            ))}
            <Link href={user ? "/account" : "/account/login"} className="block text-sm uppercase tracking-[0.25em] text-white/80">Account</Link>
            <Link href="/account/wishlist" className="block text-sm uppercase tracking-[0.25em] text-white/80">Wishlist</Link>
          </nav>
        </div>
      </div>

      <div className={`fixed inset-0 z-[65] ${searchOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button className={`absolute inset-0 bg-black/55 transition ${searchOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setSearchOpen(false)} aria-label="Close search" />
        <div className={`absolute inset-x-4 top-6 mx-auto max-w-3xl rounded-[2rem] bg-white p-5 shadow-soft transition duration-300 ${searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && goToSearch()}
              placeholder="Search dresses, bags, fragrances..."
              className="w-full rounded-full border border-brand-beige px-5 py-4 text-sm outline-none"
            />
            <button onClick={goToSearch} className="rounded-full bg-brand-black px-5 py-4 text-xs uppercase tracking-[0.2em] text-white">Search</button>
          </div>
        </div>
      </div>
    </>
  );
}
