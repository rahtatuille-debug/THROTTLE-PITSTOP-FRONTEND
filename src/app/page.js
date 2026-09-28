import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import VisitBand from "@/components/VisitBand";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategoryGrid from "@/components/home/CategoryGrid";
import Workshop from "@/components/home/Workshop";
import { ArrowRight } from "@/components/Icons";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  let featuredProducts = [];
  try {
    const data = await getProducts({ page_size: 4 });
    featuredProducts = (data.results || []).slice(0, 4);
  } catch (err) {
    // Backend may not be running yet during early frontend dev - fail quietly
    featuredProducts = [];
  }

  return (
    <>
      <Hero />

      <div className="relative z-10 -mt-6">
        <Marquee />
      </div>

      <CategoryGrid />

      {/* Featured products */}
      <section className="bg-throttle-cream">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="eyebrow">New arrivals</p>
              <h2 className="display-lg mt-4 text-throttle-ink">Fresh on the shelf.</h2>
            </div>
            <Link href="/shop" className="btn-ghost-dark self-start md:self-auto">
              View all gear <ArrowRight />
            </Link>
          </Reveal>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {featuredProducts.map((product, i) => (
                <Reveal key={product.id} delay={i * 100}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-throttle-ink/20 bg-white p-14 text-center font-body text-throttle-grey">
              No products loaded yet. Start the backend and run{" "}
              <code className="bg-throttle-cream px-1.5 py-0.5">python manage.py seed_catalog</code> to see gear here.
            </div>
          )}
        </div>
      </section>

      <Workshop />
      <VisitBand />
    </>
  );
}
