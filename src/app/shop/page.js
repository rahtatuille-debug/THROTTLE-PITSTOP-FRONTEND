import ProductCard from "@/components/ProductCard";
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

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl md:text-5xl tracking-wide text-throttle-ink mb-2">
        Shop
      </h1>
      <p className="font-body text-throttle-grey mb-10">
        Everything currently in stock at Anwar Center, Karen.
      </p>

      {loadError ? (
        <div className="border border-throttle-line p-10 text-center font-body text-throttle-grey">
          Couldn&apos;t reach the store right now. Make sure the backend API is
          running and <code className="bg-throttle-cream px-1.5 py-0.5">NEXT_PUBLIC_API_BASE_URL</code> is set correctly.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="md:col-span-1">
            <h2 className="font-body font-semibold text-throttle-ink mb-3">Categories</h2>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <a
                  href="/shop"
                  className={`hover:text-throttle-orange ${!categorySlug ? "text-throttle-orange font-semibold" : "text-throttle-ink"}`}
                >
                  All
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/shop?category=${cat.slug}`}
                    className={`hover:text-throttle-orange ${categorySlug === cat.slug ? "text-throttle-orange font-semibold" : "text-throttle-ink"}`}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="md:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="border border-throttle-line p-10 text-center font-body text-throttle-grey">
                No products found in this category yet.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
