import Link from "next/link";
import { SHOP_LOCATION, SHOP_HOURS, SHOP_PHONES, phoneHref } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="bg-throttle-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl tracking-wide text-throttle-orange">THROTTLE PITSTOP</h3>
          <p className="font-body text-sm text-white/70 mt-3 max-w-xs">
            Motorcycles and riding gear for Nairobi&apos;s everyday rider —
            helmets, jackets, boots, and repairs, all in one stop.
          </p>
        </div>
        <div className="font-body text-sm text-white/80">
          <h4 className="text-white font-semibold mb-3">Visit us</h4>
          {SHOP_LOCATION.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <div className="mt-3">
            {SHOP_HOURS.map(({ days, time }) => (
              <p key={days}>{days}: {time}</p>
            ))}
          </div>
          <ul className="mt-3 space-y-1">
            {SHOP_PHONES.map((phone) => (
              <li key={phone}>
                <a href={phoneHref(phone)} className="hover:text-throttle-orange">{phone}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-body text-sm">
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/shop" className="hover:text-throttle-orange">Shop</Link></li>
            <li><Link href="/services" className="hover:text-throttle-orange">Services & Repairs</Link></li>
            <li><Link href="/about" className="hover:text-throttle-orange">About</Link></li>
            <li><Link href="/contact" className="hover:text-throttle-orange">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50 font-body">
        © {new Date().getFullYear()} Throttle Pitstop. All rights reserved.
      </div>
    </footer>
  );
}
