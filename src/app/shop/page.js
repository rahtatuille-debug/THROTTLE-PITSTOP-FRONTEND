import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProducts, getCategories } from "@/lib/api";

export const metadata = {
  title: "Shop | Throttle Pitstop",
};

export default async function ShopPage({ searchParams }) {
  const categorySlug = searchParams?.category;

  let products = [];
  let categories = [];
  let loadError = false;

  try {
    const [productData, categoryData] = await Promise.all([
      getProducts(categorySlug ? { category__slug: categorySlug } : {}),
      getCategories(),
    ]);
    products = productData.results || [];
    categories = categoryData.results || categoryData || [];
  } catch (err) {
    loadError = true;
  }

  const activeCategory = categories.find((cat) => cat.slug === categorySlug);
  const filters = [{ slug: null, name: "All gear" }, ...categories];

  return (
    <>
      <PageHero eyebrow="The shop" title="Gear" accent="up." watermark="SHOP">
        Everything currently in stock at Anwar Center, Karen. Pay with M-Pesa
        or cash on delivery.
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {loadError ? (
          <div className="border border-dashed border-throttle-ink/20 p-14 text-center font-body text-throttle-grey">
            Couldn&apos;t reach the store right now. Make sure the backend API is
            running and <code className="bg-throttle-cream px-1.5 py-0.5">NEXT_PUBLIC_API_BASE_URL</code> is set correctly.
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col gap-6 border-b border-throttle-line pb-8 lg:flex-row lg:items-center lg:justify-between">
              <nav className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0" aria-label="Filter by category">
                {filters.map((cat) => {
                  const active = cat.slug ? categorySlug === cat.slug : !categorySlug;
                  return (
                    <Link
                      key={cat.slug || "all"}
                      href={cat.slug ? `/shop?category=${cat.slug}` : "/shop"}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap rounded-full border px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                        active
                          ? "border-throttle-ink bg-throttle-ink text-white"
                          : "border-throttle-line text-throttle-ink hover:border-throttle-orange hover:text-throttle-orange"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </nav>
              <p className="font-body text-sm text-throttle-grey whitespace-nowrap">
                <span className="font-display text-2xl tracking-wide text-throttle-ink mr-2 align-middle">
                  {products.length}
                </span>
                {products.length === 1 ? "product" : "products"}
                {activeCategory ? ` in ${activeCategory.name}` : ""}
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product, i) => (
                  <Reveal key={product.id} delay={(i % 4) * 80}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="font-display text-5xl tracking-wide text-throttle-ink">Nothing here yet.</p>
                <p className="font-body text-throttle-grey mt-3">
                  New stock for this category is on the way.
                </p>
                <Link href="/shop" className="btn-dark mt-8">
                  See all gear
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
