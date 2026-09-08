"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";

function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Loose Kenyan phone check - starts with 0 or +254, 7-13 digits total.
// Not trying to be a full validator, just enough to catch obvious typos.
function isLikelyKenyanPhone(value) {
  return /^(\+254|0)\d{7,12}$/.test(value.replace(/\s/g, ""));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [itemErrors, setItemErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");
    setItemErrors({});

    if (!isLikelyKenyanPhone(customerPhone)) {
      setPhoneError("Enter a valid phone number, e.g. 0712345678 or +254712345678.");
      return;
    }
    setPhoneError("");

    setSubmitting(true);
    try {
      const order = await createOrder({
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
        notes,
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
      });
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      // If the API identified which line item(s) are the problem (e.g.
      // stock changed since it was added to the cart), surface that
      // next to the offending item; otherwise show a general banner.
      const body = err.body;
      if (body && typeof body === "object" && !Array.isArray(body) && body.items) {
        const errors = {};
        body.items.forEach((itemError, index) => {
          if (itemError && items[index]) {
            errors[items[index].productId] =
              typeof itemError === "string" ? itemError : JSON.stringify(itemError);
          }
        });
        setItemErrors(errors);
        if (Object.keys(errors).length === 0) {
          setGeneralError("Some items in your cart are no longer available. Please review your cart and try again.");
        }
      } else {
        setGeneralError(
          "We couldn't place your order. Please check your details and try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-4xl tracking-wide text-throttle-ink mb-4">Checkout</h1>
        <p className="font-body text-throttle-grey">
          Your cart is empty — add some gear before checking out.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h1 className="font-display text-4xl tracking-wide text-throttle-ink mb-8">Checkout</h1>

        {generalError && (
          <div className="border border-red-300 bg-red-50 text-red-700 font-body text-sm px-4 py-3 mb-6">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-sm font-semibold text-throttle-ink mb-1" htmlFor="customerName">
              Full name
            </label>
            <input
              id="customerName"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-throttle-line px-3 py-2.5 font-body text-sm"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-throttle-ink mb-1" htmlFor="customerPhone">
              Phone number
            </label>
            <input
              id="customerPhone"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="0712345678"
              className="w-full border border-throttle-line px-3 py-2.5 font-body text-sm"
            />
            {phoneError && (
              <p className="font-body text-xs text-red-600 mt-1">{phoneError}</p>
            )}
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-throttle-ink mb-1" htmlFor="deliveryAddress">
              Delivery address
            </label>
            <textarea
              id="deliveryAddress"
              required
              rows={3}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-throttle-line px-3 py-2.5 font-body text-sm"
            />
          </div>

          <div>
            <span className="block font-body text-sm font-semibold text-throttle-ink mb-2">
              Payment method
            </span>
            <div className="space-y-2 font-body text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                M-Pesa
              </label>
            </div>
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-throttle-ink mb-1" htmlFor="notes">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-throttle-line px-3 py-2.5 font-body text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-throttle-orange text-white font-body font-semibold px-8 py-3.5 hover:bg-throttle-orange-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "Placing order..." : "Place order"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-body font-semibold text-throttle-ink mb-4">Order summary</h2>
        <ul className="divide-y divide-throttle-line border border-throttle-line">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-body text-sm text-throttle-ink">
                  {item.name} <span className="text-throttle-grey">× {item.quantity}</span>
                </p>
                {itemErrors[item.productId] && (
                  <p className="font-body text-xs text-red-600 mt-1">{itemErrors[item.productId]}</p>
                )}
              </div>
              <p className="font-body text-sm text-throttle-ink">
                {formatKES(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between font-body font-semibold text-throttle-ink mt-4 px-1">
          <span>Subtotal</span>
          <span>{formatKES(subtotal)}</span>
        </div>
      </div>
    </section>
  );
}
