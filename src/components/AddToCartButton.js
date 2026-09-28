"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { BagIcon, CheckIcon } from "@/components/Icons";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const maxQuantity = Math.max(product.stock, 0);

  function setClamped(value) {
    if (Number.isNaN(value)) return;
    setQuantity(Math.min(Math.max(value, 1), maxQuantity || 1));
  }

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  if (!product.in_stock) {
    return (
      <div className="mt-10">
        <button disabled className="btn-dark w-full">
          Sold out
        </button>
        <p className="font-body text-xs text-throttle-grey mt-3">
          Call the shop and we&apos;ll let you know when it&apos;s back.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between border border-throttle-ink/15 sm:w-40">
          <button
            type="button"
            onClick={() => setClamped(quantity - 1)}
            className="h-14 w-12 font-body text-lg text-throttle-ink hover:text-throttle-orange transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <label htmlFor="quantity" className="sr-only">Quantity</label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setClamped(Number(e.target.value))}
            className="w-12 bg-transparent text-center font-body font-semibold text-throttle-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setClamped(quantity + 1)}
            className="h-14 w-12 font-body text-lg text-throttle-ink hover:text-throttle-orange transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex-1 ${added ? "btn-dark" : "btn-primary"}`}
        >
          {added ? (
            <>
              <CheckIcon className="w-5 h-5 animate-pop" /> Added to bag
            </>
          ) : (
            <>
              <BagIcon className="w-5 h-5" /> Add to bag
            </>
          )}
        </button>
      </div>
      <p className="font-body text-xs text-throttle-grey mt-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        {product.stock} in stock at Anwar Center, Karen
      </p>
    </div>
  );
}
