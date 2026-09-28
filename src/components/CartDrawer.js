"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/format";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { ArrowRight, BagIcon } from "@/components/Icons";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-throttle-ink/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white flex flex-col
          shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.4)]
          transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]
          ${open ? "visible translate-x-0" : "invisible translate-x-full"}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="relative bg-throttle-ink text-white px-7 pt-8 pb-7 grain overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-throttle-orange/30 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="eyebrow">Your bag</p>
              <h2 className="font-display text-5xl tracking-wide mt-2">
                {itemCount} <span className="text-white/40">item{itemCount === 1 ? "" : "s"}</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-throttle-orange hover:bg-throttle-orange transition-colors"
              aria-label="Close cart"
              tabIndex={open ? 0 : -1}
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white transition-transform group-hover:rotate-[135deg]" />
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white transition-transform group-hover:rotate-45" />
              </span>
            </button>
          </div>
        </div>
        <div className="h-1 stripes" aria-hidden="true" />

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-throttle-cream text-throttle-orange">
                <BagIcon className="w-8 h-8" />
              </div>
              <p className="font-display text-3xl tracking-wide mt-6">Your bag is empty</p>
              <p className="font-body text-sm text-throttle-grey mt-2 max-w-[16rem]">
                Helmets, jackets, boots and parts are waiting for you.
              </p>
              <Link href="/shop" onClick={onClose} tabIndex={open ? 0 : -1} className="btn-dark mt-8">
                Start shopping <ArrowRight />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-throttle-line">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-5 py-5 first:pt-0">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-throttle-cream">
                    {item.primaryImage ? (
                      <Image src={item.primaryImage} alt={item.name} fill sizes="96px" className="object-cover" />
                    ) : (
                      <ProductPlaceholder label={item.name.split(" ")[0]} size="sm" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-body font-semibold text-throttle-ink text-sm leading-snug">{item.name}</p>
                      <p className="font-body text-sm font-bold text-throttle-ink whitespace-nowrap">
                        {formatKES(item.price * item.quantity)}
                      </p>
                    </div>
                    <p className="font-body text-throttle-grey text-xs mt-1">{formatKES(item.price)} each</p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-throttle-line">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="h-8 w-8 rounded-full font-body text-throttle-ink hover:bg-throttle-ink hover:text-white transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                          tabIndex={open ? 0 : -1}
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-body text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="h-8 w-8 rounded-full font-body text-throttle-ink hover:bg-throttle-ink hover:text-white transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                          tabIndex={open ? 0 : -1}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-throttle-grey hover:text-throttle-orange transition-colors"
                        tabIndex={open ? 0 : -1}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-throttle-line bg-throttle-cream px-7 py-6">
            <div className="flex items-end justify-between mb-1">
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-grey">Subtotal</span>
              <span className="font-display text-4xl tracking-wide text-throttle-ink">{formatKES(subtotal)}</span>
            </div>
            <p className="font-body text-xs text-throttle-grey mb-5">
              Pay with M-Pesa or cash on delivery.
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="btn-primary w-full"
            >
              Checkout <ArrowRight />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
