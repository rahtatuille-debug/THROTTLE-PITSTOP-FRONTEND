"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { BagIcon, PhoneIcon } from "@/components/Icons";
import { SHOP_PHONES, phoneHref } from "@/lib/shop";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Every page opens on a dark banner, so the header starts transparent
  // with light text and turns solid white once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  const solid = scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid
            ? "bg-white/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]"
            : "bg-transparent"
        }`}
      >
        {/* Info bar - collapses away once scrolled */}
        <div
          className={`overflow-hidden bg-throttle-orange text-white transition-all duration-500 ${
            solid ? "max-h-0" : "max-h-10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between font-body text-[11px] font-medium uppercase tracking-[0.18em]">
            <span><span className="sm:hidden">Mon – Sat · 9 – 6</span><span className="hidden sm:inline">Open Mon – Sat · 9 AM – 6 PM</span></span>
            <a href={phoneHref(SHOP_PHONES[0])} className="hidden sm:inline-flex items-center gap-2 hover:text-throttle-ink transition-colors">
              <PhoneIcon className="w-3.5 h-3.5" />
              {SHOP_PHONES[0]}
            </a>
            <span className="sm:hidden">Karen, Nairobi</span>
          </div>
        </div>

        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            solid ? "h-16" : "h-20 md:h-24"
          }`}
        >
          <Link href="/" className="relative z-10 shrink-0" aria-label="Throttle Pitstop, home">
            <Image
              src="/logo-mark.png"
              alt="Throttle Pitstop"
              width={595}
              height={408}
              priority
              className={`w-auto transition-all duration-500 hover:-rotate-3 hover:scale-105 ${
                solid ? "h-10" : "h-12 md:h-16"
              }`}
            />
          </Link>

          <nav
            className={`hidden md:flex items-center gap-10 font-body text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
              solid ? "text-throttle-ink" : "text-white"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="link-underline py-1 hover:text-throttle-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
                solid
                  ? "text-throttle-ink hover:bg-throttle-ink hover:text-white"
                  : "text-white hover:bg-white hover:text-throttle-ink"
              }`}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              <BagIcon className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-throttle-orange px-1 text-[10px] font-bold text-white ring-2 ring-white animate-pop">
                  {itemCount}
                </span>
              )}
            </button>

            <Link href="/shop" className="hidden md:inline-flex btn-primary !px-6 !py-3 !text-xs">
              Shop Gear
            </Link>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className={`md:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 ${
                solid ? "text-throttle-ink" : "text-white"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-30 bg-throttle-ink grain transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] md:hidden ${
          menuOpen ? "[clip-path:circle(150%_at_100%_0)]" : "[clip-path:circle(0%_at_100%_0)]"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="relative z-10 flex h-full flex-col justify-center px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              className={`font-display text-6xl leading-tight tracking-wide transition-all duration-500 ${
                isActive(pathname, link.href) ? "text-throttle-orange" : "text-white hover:text-throttle-orange"
              } ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${200 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-12 space-y-2 font-body text-sm text-white/60">
            {SHOP_PHONES.map((phone) => (
              <a key={phone} href={phoneHref(phone)} tabIndex={menuOpen ? 0 : -1} className="flex items-center gap-3 hover:text-throttle-orange">
                <PhoneIcon className="w-4 h-4 text-throttle-orange" />
                {phone}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
