"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const maxQuantity = Math.max(product.stock, 0);

  function handleQuantityChange(e) {
    const value = Number(e.target.value);
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
      <button
        disabled
        className="mt-8 w-full md:w-auto bg-throttle-orange text-white font-body font-semibold px-8 py-3.5 opacity-40 cursor-not-allowed"
      >
        Add to cart
      </button>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <label className="font-body text-sm text-throttle-ink" htmlFor="quantity">
          Qty
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={maxQuantity}
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20 border border-throttle-line px-3 py-2 font-body text-sm"
        />

        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto bg-throttle-orange text-white font-body font-semibold px-8 py-3.5 hover:bg-throttle-orange-dark transition-colors"
        >
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>
      <p className="font-body text-xs text-throttle-grey mt-3">
        {product.stock} in stock at Anwar Center, Karen.
      </p>
    </div>
  );
}
