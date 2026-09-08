import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const CATEGORY_STRIP = ["Helmets", "Jackets", "Gloves", "Boots", "Spare Parts"];

const VALUE_PROPS = [
  {
    title: "Gear that's actually in stock",
    body: "No back-order guessing games. What's on the shelf at Anwar Center is what's on the site.",
  },
  {
    title: "Repairs, not just retail",
    body: "Bring the bike in alongside the gear — our workshop handles both.",
  },
  {
    title: "Pay how it suits you",
    body: "M-Pesa on the spot, or cash on delivery if you'd rather pay when it lands.",
  },
];

export default async function HomePage() {
  let featuredProducts = [];
  try {
    const data = await getProducts({ page_size: 4 });
    featuredProducts = data.results || [];
  } catch (err) {
    // Backend may not be running yet during early frontend dev - fail quietly
    featuredProducts = [];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-16 md:py-24">
          <div>
            <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-wide text-throttle-ink">
              Gear up for<br />
              <span className="throttle-twist-underline text-throttle-orange">the ride.</span>
            </h1>
            <p className="font-body text-throttle-grey text-lg mt-6 max-w-md">
              Helmets, jackets, boots, and everything in between — plus a
              workshop that keeps the bike running. Anwar Center, Karen.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/shop"
                className="bg-throttle-orange text-white font-body font-semibold px-7 py-3.5 hover:bg-throttle-orange-dark transition-colors"
              >
                Shop Gear
              </Link>
              <Link
                href="/services"
                className="border-2 border-throttle-ink text-throttle-ink font-body font-semibold px-7 py-3.5 hover:border-throttle-orange hover:text-throttle-orange transition-colors"
              >
                Book a Service
              </Link>
            </div>
          </div>

          <div className="diagonal-panel bg-throttle-ink h-64 md:h-96 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Throttle Pitstop logo"
              width={280}
              height={280}
              className="w-40 md:w-56 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="bg-throttle-cream border-y border-throttle-line">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap gap-x-8 gap-y-3 justify-center md:justify-between font-body text-sm font-semibold text-throttle-ink uppercase tracking-wide">
          {CATEGORY_STRIP.map((cat) => (
            <span key={cat}>{cat}</span>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl tracking-wide text-throttle-ink">
            Fresh on the shelf
          </h2>
          <Link href="/shop" className="font-body text-sm font-semibold text-throttle-orange hover:text-throttle-orange-dark">
            View all gear
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-throttle-line p-10 text-center font-body text-throttle-grey">
            No products loaded yet — start the backend and run{" "}
            <code className="bg-throttle-cream px-1.5 py-0.5">python manage.py seed_catalog</code> to see gear here.
          </div>
        )}
      </section>

      {/* Value props */}
      <section className="bg-throttle-ink">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="border-l-2 border-throttle-orange pl-5">
              <h3 className="font-body font-semibold text-white text-lg">{prop.title}</h3>
              <p className="font-body text-white/60 text-sm mt-2">{prop.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
