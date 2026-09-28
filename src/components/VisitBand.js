import Reveal from "@/components/Reveal";
import { SHOP_HOURS, SHOP_LOCATION, SHOP_PHONES, phoneHref } from "@/lib/shop";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";

// Big orange "come see us" band with hours, phones and location.
export default function VisitBand() {
  return (
    <section className="relative overflow-hidden bg-throttle-orange text-white">
      <span
        className="pointer-events-none absolute -bottom-[0.2em] -left-[0.04em] select-none font-display leading-none text-throttle-ink/[0.07]"
        style={{ fontSize: "clamp(8rem, 24vw, 22rem)" }}
        aria-hidden="true"
      >
        KAREN
      </span>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-6">
          <p className="inline-flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-mega text-throttle-ink before:block before:h-px before:w-8 before:bg-current">
            Pull into the pitstop
          </p>
          <h2 className="display-xl mt-5 text-white">
            Come
            <br />
            <span className="text-throttle-ink">through.</span>
          </h2>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-6 grid grid-cols-1 gap-px bg-throttle-ink/15 sm:grid-cols-3">
          <div className="bg-throttle-orange p-6 sm:pl-0 lg:pl-6">
            <PinIcon className="w-6 h-6 text-throttle-ink" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-ink/70 mt-4">Find us</p>
            {SHOP_LOCATION.map((line) => (
              <p key={line} className="font-body font-semibold mt-1">{line}</p>
            ))}
          </div>
          <div className="bg-throttle-orange p-6">
            <ClockIcon className="w-6 h-6 text-throttle-ink" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-ink/70 mt-4">Hours</p>
            {SHOP_HOURS.map(({ days, time }) => (
              <p key={days} className="font-body text-sm mt-1">
                <span className="font-semibold">{days}</span>
                <br />
                {time}
              </p>
            ))}
          </div>
          <div className="bg-throttle-orange p-6">
            <PhoneIcon className="w-6 h-6 text-throttle-ink" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-throttle-ink/70 mt-4">Call</p>
            {SHOP_PHONES.map((phone) => (
              <a key={phone} href={phoneHref(phone)} className="block font-body font-semibold mt-1 hover:text-throttle-ink transition-colors">
                {phone}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
