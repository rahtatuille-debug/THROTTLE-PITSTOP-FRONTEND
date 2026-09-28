import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/api";
import { formatKES } from "@/lib/format";
import { SHOP_PHONES, phoneHref } from "@/lib/shop";
import { ArrowRight, PhoneIcon } from "@/components/Icons";

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  mpesa: "M-Pesa",
};

// Phase 5 (M-Pesa STK push) isn't built yet, so this is honest that
// nothing automated happens for M-Pesa orders at this point - a human
// currently has to follow up.
const NEXT_STEPS = {
  cod: "Pay in cash when your order arrives - no further action needed from you.",
  mpesa: "We'll be in touch about M-Pesa payment shortly. (Automatic payment prompts aren't wired up yet, so this is a manual step for now.)",
};

export async function generateMetadata({ params }) {
  return { title: `Order #${params.id} | Throttle Pitstop` };
}

export default async function OrderConfirmationPage({ params }) {
  let order;
  try {
    order = await getOrder(params.id);
  } catch (err) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-throttle-ink text-white grain">
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-throttle-orange/25 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-40 pb-20 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-throttle-orange shadow-[0_0_60px_rgba(245,128,33,0.6)] animate-pop">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="24"
                strokeDashoffset="24"
                className="animate-draw"
              />
            </svg>
          </div>
          <p className="eyebrow mt-10 animate-fade-up [animation-delay:300ms]">Order #{order.id} confirmed</p>
          <h1 className="display-lg mt-5 animate-fade-up [animation-delay:400ms]">
            You&apos;re all <span className="text-throttle-orange">set.</span>
          </h1>
          <p className="font-body text-white/60 mt-6 animate-fade-up [animation-delay:500ms]">
            Thanks, {order.customer_name}. We&apos;ll call you on {order.customer_phone} to arrange delivery.
          </p>
        </div>
        <div className="relative z-10 h-1.5 stripes" aria-hidden="true" />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="border border-throttle-line">
          <div className="flex items-center justify-between border-b border-throttle-line bg-throttle-cream px-6 py-4">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-grey">Item</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-grey">Total</span>
          </div>
          <ul className="divide-y divide-throttle-line">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 px-6 py-5">
                <p className="font-body text-throttle-ink">
                  {item.product_name} <span className="text-throttle-grey">× {item.quantity}</span>
                </p>
                <p className="font-body font-semibold text-throttle-ink whitespace-nowrap">{formatKES(item.line_total)}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-end justify-between bg-throttle-ink px-6 py-6 text-white">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Order total</span>
            <span className="font-display text-4xl tracking-wide leading-none">{formatKES(order.total)}</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border-l-4 border-throttle-orange bg-throttle-cream p-6">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-grey">Payment</p>
            <p className="font-display text-2xl tracking-wide text-throttle-ink mt-2">
              {PAYMENT_LABELS[order.payment_method] || order.payment_method}
            </p>
            <p className="font-body text-sm text-throttle-grey mt-2">
              {NEXT_STEPS[order.payment_method] || "We'll be in touch about payment and delivery."}
            </p>
          </div>
          <div className="border-l-4 border-throttle-ink bg-throttle-cream p-6">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-grey">Questions?</p>
            <p className="font-display text-2xl tracking-wide text-throttle-ink mt-2">Call the shop</p>
            {SHOP_PHONES.map((phone) => (
              <a key={phone} href={phoneHref(phone)} className="mt-2 flex items-center gap-2 font-body text-sm font-semibold text-throttle-ink hover:text-throttle-orange transition-colors">
                <PhoneIcon className="w-4 h-4 text-throttle-orange" /> {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-dark">
            Keep shopping <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
