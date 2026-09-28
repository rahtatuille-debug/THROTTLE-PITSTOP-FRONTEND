import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SHOP_LOCATION, SHOP_HOURS, SHOP_PHONES, phoneHref } from "@/lib/shop";
import { ArrowUpRight, ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata = { title: "Contact | Throttle Pitstop" };

const MAP_QUERY = encodeURIComponent("Anwar Center, Karen, Nairobi");

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's" accent="talk." watermark="CALL">
        Questions about gear, stock, or an order? Give us a call or drop by
        the shop during opening hours.
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Phone numbers, big and tappable */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SHOP_PHONES.map((phone, i) => (
            <Reveal key={phone} delay={i * 120}>
              <a
                href={phoneHref(phone)}
                className="group relative flex items-center justify-between overflow-hidden bg-throttle-ink p-8 md:p-10 text-white isolate"
              >
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-throttle-orange transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100" aria-hidden="true" />
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-mega text-throttle-orange transition-colors group-hover:text-throttle-ink">
                    Line {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display tracking-wide mt-3 leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                    {phone}
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-12 group-hover:border-throttle-ink group-hover:bg-throttle-ink">
                  <PhoneIcon className="w-6 h-6" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="flex flex-col gap-4">
            <div className="flex-1 border border-throttle-line p-8">
              <ClockIcon className="w-7 h-7 text-throttle-orange" />
              <h2 className="font-display text-3xl tracking-wide text-throttle-ink mt-5">Opening hours</h2>
              <ul className="mt-5 divide-y divide-throttle-line font-body text-sm">
                {SHOP_HOURS.map(({ days, time }) => (
                  <li key={days} className="flex justify-between gap-4 py-3">
                    <span className="font-semibold text-throttle-ink">{days}</span>
                    <span className="text-throttle-grey">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 border border-throttle-line p-8">
              <PinIcon className="w-7 h-7 text-throttle-orange" />
              <h2 className="font-display text-3xl tracking-wide text-throttle-ink mt-5">Visit us</h2>
              <address className="mt-4 font-body text-sm text-throttle-ink not-italic">
                {SHOP_LOCATION.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-throttle-orange hover:text-throttle-orange-dark"
              >
                Get directions <ArrowUpRight />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2 relative min-h-[24rem] overflow-hidden bg-throttle-cream">
            <iframe
              title="Map showing Anwar Center, Karen"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="absolute inset-0 h-full w-full grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
