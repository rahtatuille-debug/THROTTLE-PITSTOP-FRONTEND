import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VisitBand from "@/components/VisitBand";
import { SHOP_PHONES, phoneHref } from "@/lib/shop";
import { PhoneIcon, WrenchIcon } from "@/components/Icons";

export const metadata = { title: "Services & Repairs | Throttle Pitstop" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services & repairs" title="The" accent="workshop." watermark="SERVICE">
        Servicing and repairs next to the shop floor at Anwar Center, Karen.
      </PageHero>

      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Placeholder - the full services list and pricing land in Phase 7 of the build plan. */}
        <Reveal className="relative overflow-hidden border border-throttle-line p-10 md:p-16">
          <div className="absolute right-0 top-0 h-full w-2 stripes" aria-hidden="true" />
          <WrenchIcon className="w-10 h-10 text-throttle-orange" />
          <h2 className="display-md mt-6 text-throttle-ink">
            Full service menu <span className="text-throttle-orange">coming soon.</span>
          </h2>
          <p className="font-body text-lg text-throttle-grey mt-6 max-w-2xl leading-relaxed">
            We&apos;re putting together the full list of services and prices.
            In the meantime, call the workshop and tell us what your bike needs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {SHOP_PHONES.map((phone, i) => (
              <a key={phone} href={phoneHref(phone)} className={i === 0 ? "btn-primary" : "btn-ghost-dark"}>
                <PhoneIcon className="w-4 h-4" /> {phone}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <VisitBand />
    </>
  );
}
