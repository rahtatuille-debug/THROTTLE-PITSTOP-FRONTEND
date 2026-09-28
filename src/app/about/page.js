import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VisitBand from "@/components/VisitBand";
import { ArrowRight } from "@/components/Icons";

export const metadata = { title: "About | Throttle Pitstop" };

const PILLARS = [
  { title: "The shop", body: "Helmets, jackets, gloves, boots and spare parts, on the shelf and ready to try on." },
  { title: "The workshop", body: "Servicing and repairs under the same roof, so gear and bike get sorted in one trip." },
  { title: "The riders", body: "Built for Nairobi's everyday riders, from daily commuters to weekend tourers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Built for" accent="riders." watermark="ABOUT">
        Throttle Pitstop is a motorcycle and riding gear shop based at Anwar
        Center, Karen.
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Our story</p>
          <h2 className="display-md mt-4 text-throttle-ink">
            More than a shop. <span className="text-throttle-orange">A pitstop.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 font-body text-lg text-throttle-grey leading-relaxed space-y-6">
          {/* Placeholder copy - the full shop story and photos land in Phase 7 of the build plan. */}
          <p>
            Every rider needs a place to pull in: for the right helmet, a
            jacket that actually protects, or a quick fix before the next ride.
            That&apos;s what we built in Karen.
          </p>
          <p>
            Come in, try the gear on, and talk to people who know bikes. The full
            story, with photos of the shop and the team, is coming soon.
          </p>
          <Link href="/shop" className="btn-dark !mt-10">
            Shop the gear <ArrowRight />
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-throttle-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 120}
              className="group relative border-b border-throttle-line p-10 md:border-b-0 md:border-r md:last:border-r-0 md:p-14"
            >
              <span className="font-display text-8xl leading-none text-outline text-throttle-ink/20 transition-colors duration-500 group-hover:text-throttle-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-4xl tracking-wide text-throttle-ink mt-6">{pillar.title}</h3>
              <p className="font-body text-throttle-grey mt-3 leading-relaxed">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <VisitBand />
    </>
  );
}
