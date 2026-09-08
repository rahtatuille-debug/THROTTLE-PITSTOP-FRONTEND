import { notFound } from "next/navigation";
import { getOrder } from "@/lib/api";

function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

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
    <section className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl tracking-wide text-throttle-ink mb-2">
        Order #{order.id} confirmed
      </h1>
      <p className="font-body text-throttle-grey mb-10">
        Thanks, {order.customer_name} — here's what you ordered.
      </p>

      <ul className="divide-y divide-throttle-line border border-throttle-line">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between px-4 py-3">
            <p className="font-body text-sm text-throttle-ink">
              {item.product_name} <span className="text-throttle-grey">× {item.quantity}</span>
            </p>
            <p className="font-body text-sm text-throttle-ink">{formatKES(item.line_total)}</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between font-body font-semibold text-throttle-ink mt-4 px-1">
        <span>Total</span>
        <span>{formatKES(order.total)}</span>
      </div>

      <div className="mt-10 border-l-2 border-throttle-orange pl-5">
        <p className="font-body text-sm font-semibold text-throttle-ink">
          Payment method: {PAYMENT_LABELS[order.payment_method] || order.payment_method}
        </p>
        <p className="font-body text-sm text-throttle-grey mt-2">
          {NEXT_STEPS[order.payment_method] || "We'll be in touch about payment and delivery."}
        </p>
      </div>
    </section>
  );
}
