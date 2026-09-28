import Link from "next/link";
import RevGauge from "@/components/home/RevGauge";
import { ArrowRight } from "@/components/Icons";

const HERO_LINES = [
  { text: "Gear up.", className: "text-white" },
  { text: "Ride out.", className: "text-outline text-white" },
  { text: "Come back.", className: "text-throttle-orange" },
];

const HERO_STATS = [
  { value: "5", label: "Gear categories" },
  { value: "M-Pesa", label: "or cash on delivery" },
  { value: "6 days", label: "a week, Mon – Sat" },
];

// Staggered horizontal light streaks behind the hero copy
const STREAKS = [
  { top: "22%", width: "38%", delay: "0s" },
  { top: "41%", width: "22%", delay: "1.1s" },
  { top: "63%", width: "30%", delay: "0.5s" },
  { top: "78%", width: "18%", delay: "1.8s" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-throttle-ink text-white grain min-h-[100svh] flex items-center">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-throttle-orange/20 blur-[160px]" aria-hidden="true" />
      <div className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-white/5 blur-[120px]" aria-hidden="true" />

      {STREAKS.map((s) => (
        <span
          key={s.top}
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-throttle-orange to-transparent animate-streak"
          style={{ top: s.top, width: s.width, animationDelay: s.delay }}
          aria-hidden="true"
        />
      ))}

      {/* Giant watermark */}
      <span
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display leading-none text-white/[0.025]"
        style={{ fontSize: "clamp(8rem, 30vw, 28rem)" }}
        aria-hidden="true"
      >
        THROTTLE
      </span>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-36 pb-24 md:pt-40 grid grid-cols-1 lg:grid-cols-12 items-center gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade-up">Anwar Center · Karen · Nairobi</p>

          <h1 className="display-xl mt-6">
            {HERO_LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <span
                  className={`block animate-rise-in ${line.className}`}
                  style={{ animationDelay: `${150 + i * 130}ms` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="font-body text-lg text-white/60 mt-8 max-w-lg leading-relaxed animate-fade-up [animation-delay:600ms]">
            Premium riding gear and a workshop that keeps your bike running.
            Everything a Nairobi rider needs, all in one stop.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up [animation-delay:750ms]">
            <Link href="/shop" className="btn-primary">
              Shop the gear <ArrowRight />
            </Link>
            <Link href="/services" className="btn-ghost-light">
              Workshop & repairs
            </Link>
          </div>

          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8 animate-fade-up [animation-delay:900ms]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl md:text-4xl tracking-wide text-white">{stat.value}</dd>
                <dd className="font-body text-xs text-white/45 mt-1 leading-snug">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 animate-fade-up [animation-delay:300ms]">
          <RevGauge className="mx-auto w-full max-w-[26rem] lg:max-w-none" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="font-body text-[10px] uppercase tracking-mega text-white/40">Scroll</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="h-2 w-1 rounded-full bg-throttle-orange animate-scroll-dot" />
        </span>
      </div>
    </section>
  );
}
