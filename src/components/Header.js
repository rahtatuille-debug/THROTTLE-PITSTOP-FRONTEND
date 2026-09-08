"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-throttle-orange">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Throttle Pitstop" width={48} height={48} priority />
          <span className="sr-only">Throttle Pitstop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-throttle-ink">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-throttle-orange transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative font-body text-sm font-semibold text-throttle-ink hover:text-throttle-orange transition-colors"
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-throttle-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center bg-throttle-orange text-white font-body font-semibold text-sm px-5 py-2.5 hover:bg-throttle-orange-dark transition-colors"
          >
            Shop Gear
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
