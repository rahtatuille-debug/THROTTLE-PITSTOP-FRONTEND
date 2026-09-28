import { SHOP_LOCATION, SHOP_HOURS, SHOP_PHONES, phoneHref } from "@/lib/shop";

export const metadata = { title: "Contact | Throttle Pitstop" };

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl tracking-wide text-throttle-ink mb-4">
        Contact Us
      </h1>
      <p className="font-body text-throttle-grey leading-relaxed mb-10 max-w-2xl">
        Questions about gear, stock, or an order? Give us a call or drop by
        the shop during opening hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-throttle-cream border border-throttle-line p-6">
          <h2 className="font-display text-2xl tracking-wide text-throttle-ink mb-3">Call us</h2>
          <ul className="font-body space-y-2">
            {SHOP_PHONES.map((phone) => (
              <li key={phone}>
                <a
                  href={phoneHref(phone)}
                  className="text-throttle-orange font-semibold hover:text-throttle-orange-dark"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-throttle-cream border border-throttle-line p-6">
          <h2 className="font-display text-2xl tracking-wide text-throttle-ink mb-3">Opening hours</h2>
          <ul className="font-body text-sm text-throttle-ink space-y-2">
            {SHOP_HOURS.map(({ days, time }) => (
              <li key={days}>
                <span className="block font-semibold">{days}</span>
                <span className="text-throttle-grey">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-throttle-cream border border-throttle-line p-6">
          <h2 className="font-display text-2xl tracking-wide text-throttle-ink mb-3">Visit us</h2>
          <address className="font-body text-sm text-throttle-ink not-italic">
            {SHOP_LOCATION.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>
      </div>
    </section>
  );
}
