import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";

// Slugs match the backend's slugify(category.name).
const CATEGORIES = [
  { name: "Helmets", slug: "helmets", blurb: "Full-face, modular & open-face lids" },
  { name: "Jackets", slug: "jackets", blurb: "Armoured, abrasion-resistant" },
  { name: "Gloves", slug: "gloves", blurb: "Grip and knuckle protection" },
  { name: "Boots", slug: "boots", blurb: "Ankle support, all weather" },
  { name: "Spare Parts", slug: "spare-parts", blurb: "Chains, sprockets & more" },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
        <div>
          <p className="eyebrow">Shop by category</p>
          <h2 className="display-lg mt-4 text-throttle-ink">
            Kit up <span className="text-throttle-orange">head to toe.</span>
          </h2>
        </div>
        <p className="font-body text-throttle-grey max-w-sm leading-relaxed">
          From the lid on your head to the chain on your bike. Pick a category
          and see what&apos;s on the shelf today.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.slug}
            delay={i * 90}
            className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className={`group relative flex h-full flex-col justify-between overflow-hidden bg-throttle-ink p-8 text-white isolate ${
                i === 0 ? "min-h-[22rem] lg:min-h-[34rem]" : "min-h-[16rem]"
              }`}
            >
              {/* Orange fill that rises on hover */}
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-throttle-orange transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100" aria-hidden="true" />
              <span className="absolute inset-0 -z-20 grid-lines opacity-50" aria-hidden="true" />

              <span
                className={`pointer-events-none absolute -right-4 -bottom-8 select-none font-display leading-none text-outline text-white/10 transition-all duration-500 group-hover:text-white/30 group-hover:-translate-y-2 ${
                  i === 0 ? "text-[14rem] lg:text-[20rem]" : "text-[9rem]"
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between">
                <span className="font-body text-xs font-semibold uppercase tracking-mega text-throttle-orange transition-colors group-hover:text-throttle-ink">
                  {String(i + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-throttle-ink group-hover:bg-throttle-ink">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>

              <div className="relative">
                <h3 className={`font-display tracking-wide leading-none ${i === 0 ? "text-7xl lg:text-8xl" : "text-5xl"}`}>
                  {cat.name}
                </h3>
                <p className="font-body text-sm text-white/60 mt-3 transition-colors group-hover:text-white/90">{cat.blurb}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
