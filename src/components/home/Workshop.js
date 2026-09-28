import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight, WrenchIcon, ShieldIcon, WalletIcon } from "@/components/Icons";

const PROMISES = [
  {
    icon: WrenchIcon,
    title: "Repairs, not just retail",
    body: "Bring the bike in with your gear list. Our workshop handles servicing and repairs under the same roof.",
  },
  {
    icon: ShieldIcon,
    title: "Gear that's actually in stock",
    body: "No back-order guessing games. What's on the shelf at Anwar Center is what you see on the site.",
  },
  {
    icon: WalletIcon,
    title: "Pay how it suits you",
    body: "M-Pesa, or cash on delivery if you'd rather pay when it lands at your door.",
  },
];

export default function Workshop() {
  return (
    <section className="relative overflow-hidden bg-throttle-ink text-white grain">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-throttle-orange/15 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-36 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <p className="eyebrow">Why Throttle Pitstop</p>
          <h2 className="display-lg mt-5">
            One stop.
            <br />
            <span className="text-outline text-white">Every mile.</span>
          </h2>
          <p className="font-body text-white/60 mt-8 max-w-md leading-relaxed">
            Good gear matters most on Ngong Road in the rain. That&apos;s why
            we stock gear built to protect, with a workshop right next to
            the shop floor.
          </p>
          <Link href="/services" className="btn-primary mt-10">
            Explore the workshop <ArrowRight />
          </Link>
        </Reveal>

        <div className="lg:col-span-7 space-y-4">
          {PROMISES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="group relative flex flex-col gap-4 sm:flex-row sm:gap-8 overflow-hidden border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-all duration-500 hover:border-throttle-orange/60 hover:bg-white/[0.04]">
                <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-throttle-orange transition-transform duration-500 group-hover:scale-y-100" aria-hidden="true" />
                <span className="font-display text-6xl leading-none text-white/10 transition-colors duration-500 group-hover:text-throttle-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <Icon className="w-7 h-7 text-throttle-orange" />
                  <h3 className="font-display text-3xl tracking-wide mt-4">{title}</h3>
                  <p className="font-body text-white/55 mt-3 leading-relaxed">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
