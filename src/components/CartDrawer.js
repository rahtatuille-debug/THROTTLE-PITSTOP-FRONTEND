"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-throttle-ink/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white border-l border-throttle-line
          transform transition-transform duration-300 flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-throttle-line">
          <h2 className="font-display text-2xl tracking-wide text-throttle-ink">Your Cart</h2>
          <button
            onClick={onClose}
            className="font-body text-sm text-throttle-grey hover:text-throttle-orange"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="font-body text-throttle-grey text-sm">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-throttle-cream border border-throttle-line shrink-0 overflow-hidden">
                    {item.primaryImage ? (
                      <Image src={item.primaryImage} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-throttle-grey text-[10px] font-body">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-throttle-ink text-sm truncate">{item.name}</p>
                    <p className="font-body text-throttle-grey text-xs mt-0.5">{formatKES(item.price)}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-throttle-line">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 font-body text-throttle-ink hover:text-throttle-orange"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 font-body text-throttle-ink hover:text-throttle-orange"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="font-body text-xs text-throttle-grey hover:text-throttle-orange underline"
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

        <div className="border-t border-throttle-line px-6 py-6">
          <div className="flex items-center justify-between font-body font-semibold text-throttle-ink mb-4">
            <span>Subtotal</span>
            <span>{formatKES(subtotal)}</span>
          </div>

          {items.length === 0 ? (
            <>
              <button
                disabled
                className="w-full bg-throttle-orange text-white font-body font-semibold px-6 py-3.5 opacity-40 cursor-not-allowed"
              >
                Checkout
              </button>
              <p className="font-body text-xs text-throttle-grey mt-2">
                Add something to your cart before checking out.
              </p>
            </>
          ) : (
            <Link
              href="/checkout"
              onClick={onClose}
              className="block text-center w-full bg-throttle-orange text-white font-body font-semibold px-6 py-3.5 hover:bg-throttle-orange-dark transition-colors"
            >
              Checkout
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
