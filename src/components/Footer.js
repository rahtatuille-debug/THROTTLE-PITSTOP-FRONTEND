import Link from "next/link";
import Image from "next/image";
import { SHOP_LOCATION, SHOP_HOURS, SHOP_PHONES, phoneHref } from "@/lib/shop";
import { ArrowUpRight } from "@/components/Icons";

const EXPLORE_LINKS = [
  { href: "/shop", label: "Shop all gear" },
  { href: "/services", label: "Services & Repairs" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-throttle-ink text-white grain">
      <div className="h-1.5 stripes" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-throttle-orange/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/logo-mark.png" alt="Throttle Pitstop" width={595} height={408} className="h-24 w-auto" />
            <p className="font-body text-white/60 mt-6 max-w-sm leading-relaxed">
              Motorcycle gear and repairs for Nairobi&apos;s riders. Helmets,
              jackets, boots and parts, all at one stop in Karen.
            </p>
            <Link href="/shop" className="btn-primary mt-8">
              Shop the gear <ArrowUpRight />
            </Link>
          </div>

          <div className="md:col-span-3 font-body text-sm">
            <h4 className="eyebrow mb-6">Visit</h4>
            <address className="not-italic text-white/80 space-y-1">
              {SHOP_LOCATION.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
            <div className="mt-6 space-y-3">
              {SHOP_HOURS.map(({ days, time }) => (
                <p key={days} className="text-white/80">
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-white/45">{days}</span>
                  {time}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 font-body text-sm">
            <h4 className="eyebrow mb-6">Call</h4>
            <ul className="space-y-3">
              {SHOP_PHONES.map((phone) => (
                <li key={phone}>
                  <a href={phoneHref(phone)} className="link-underline text-white/80 hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 font-body text-sm">
            <h4 className="eyebrow mb-6">Explore</h4>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <p
          className="mt-20 select-none font-display text-outline text-white/15 leading-[0.8] tracking-wide whitespace-nowrap text-center"
          style={{ fontSize: "clamp(3rem, 12.5vw, 12.5rem)" }}
          aria-hidden="true"
        >
          THROTTLE PITSTOP
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 font-body text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Throttle Pitstop. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Anwar Center · Karen · Nairobi</p>
        </div>
      </div>
    </footer>
  );
}
