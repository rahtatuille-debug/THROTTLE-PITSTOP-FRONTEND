"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { createOrder } from "@/lib/api";
import { formatKES } from "@/lib/format";
import PageHero from "@/components/PageHero";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { ArrowRight, WalletIcon } from "@/components/Icons";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery", detail: "Pay when your order arrives." },
  { value: "mpesa", label: "M-Pesa", detail: "We'll follow up with payment details." },
];

function Step({ number, title, children }) {
  return (
    <fieldset className="border-t border-throttle-line pt-8">
      <legend className="flex items-center gap-4 pr-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-throttle-ink font-display text-lg text-white">
          {number}
        </span>
        <span className="font-display text-3xl tracking-wide text-throttle-ink">{title}</span>
      </legend>
      <div className="mt-6 space-y-5">{children}</div>
    </fieldset>
  );
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
      <>
        <PageHero eyebrow="Checkout" title="Your bag is" accent="empty." watermark="BAG" />
        <section className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="font-body text-throttle-grey">
            Add some gear before checking out.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Browse the shop <ArrowRight />
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Secure checkout" title="Almost" accent="there." watermark="GO" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {generalError && (
            <div className="border-l-4 border-red-500 bg-red-50 text-red-700 font-body text-sm px-5 py-4 mb-8">
              {generalError}
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            <Step number="1" title="Your details">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="customerName">
                    Full name
                  </label>
                  <input
                    id="customerName"
                    required
                    autoComplete="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="field"
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="customerPhone">
                    Phone number
                  </label>
                  <input
                    id="customerPhone"
                    required
                    type="tel"
                    autoComplete="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0712345678"
                    className={`field ${phoneError ? "!border-red-500" : ""}`}
                    aria-invalid={Boolean(phoneError)}
                  />
                  {phoneError && (
                    <p className="font-body text-xs text-red-600 mt-2">{phoneError}</p>
                  )}
                </div>
              </div>
            </Step>

            <Step number="2" title="Delivery">
              <div>
                <label className="field-label" htmlFor="deliveryAddress">
                  Delivery address
                </label>
                <textarea
                  id="deliveryAddress"
                  required
                  rows={3}
                  autoComplete="street-address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Estate, street, building, and any landmarks"
                  className="field resize-none"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="notes">
                  Notes <span className="text-throttle-grey normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sizing questions, delivery times, gate codes..."
                  className="field resize-none"
                />
              </div>
            </Step>

            <Step number="3" title="Payment">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PAYMENT_OPTIONS.map((option) => {
                  const selected = paymentMethod === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`relative flex cursor-pointer items-start gap-4 border-2 p-5 transition-all duration-300 ${
                        selected
                          ? "border-throttle-orange bg-throttle-orange/5 shadow-[0_10px_30px_-15px_rgba(245,128,33,0.6)]"
                          : "border-throttle-line hover:border-throttle-ink/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={selected}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only peer"
                      />
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-throttle-orange/30 ${
                          selected ? "border-throttle-orange" : "border-throttle-ink/25"
                        }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full bg-throttle-orange transition-transform duration-300 ${selected ? "scale-100" : "scale-0"}`} />
                      </span>
                      <span>
                        <span className="block font-body font-semibold text-throttle-ink">{option.label}</span>
                        <span className="block font-body text-xs text-throttle-grey mt-1">{option.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </Step>
          </form>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 relative overflow-hidden bg-throttle-ink text-white grain">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-throttle-orange/25 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 p-8">
              <p className="eyebrow">Order summary</p>
              <ul className="mt-6 divide-y divide-white/10">
                {items.map((item) => (
                  <li key={item.productId} className="flex items-center gap-4 py-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-throttle-steel">
                      {item.primaryImage ? (
                        <Image src={item.primaryImage} alt={item.name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <ProductPlaceholder label={item.name.split(" ")[0]} size="sm" />
                      )}
                      <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center bg-throttle-orange px-1 font-body text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-sm text-white leading-snug">{item.name}</p>
                      {itemErrors[item.productId] && (
                        <p className="font-body text-xs text-red-400 mt-1">{itemErrors[item.productId]}</p>
                      )}
                    </div>
                    <p className="font-body text-sm font-semibold text-white whitespace-nowrap">
                      {formatKES(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2 border-t border-white/10 pt-6 font-body text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{formatKES(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span>Confirmed by phone</span>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Total</span>
                <span className="font-display text-5xl tracking-wide leading-none">{formatKES(subtotal)}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="btn-primary w-full mt-8"
              >
                {submitting ? "Placing order..." : (
                  <>
                    Place order <ArrowRight />
                  </>
                )}
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 font-body text-xs text-white/45">
                <WalletIcon className="w-4 h-4" /> No card needed. M-Pesa or cash.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
