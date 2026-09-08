import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function generateMetadata({ params }) {
  try {
    const product = await getProduct(params.slug);
    return { title: `${product.name} | Throttle Pitstop` };
  } catch (err) {
    return { title: "Product | Throttle Pitstop" };
  }
}

export default async function ProductPage({ params }) {
  let product;
  try {
    product = await getProduct(params.slug);
  } catch (err) {
    notFound();
  }

  const primaryImage = product.images?.[0];

  return (
    <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="aspect-square bg-throttle-cream border border-throttle-line relative overflow-hidden">
        {primaryImage ? (
          <Image src={primaryImage.image} alt={primaryImage.alt_text || product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-throttle-grey font-body">
            No image yet
          </div>
        )}
      </div>

      <div>
        <p className="font-body text-xs text-throttle-grey uppercase tracking-wide">
          {product.category?.name}
        </p>
        <h1 className="font-display text-4xl tracking-wide text-throttle-ink mt-1">{product.name}</h1>
        <p className="font-body text-2xl font-bold text-throttle-orange mt-3">{formatKES(product.price)}</p>

        <p className="font-body text-throttle-grey mt-6 leading-relaxed">
          {product.description || "No description added yet."}
        </p>

        <p className="font-body text-sm mt-6">
          {product.in_stock ? (
            <span className="text-green-700 font-semibold">In stock</span>
          ) : (
            <span className="text-throttle-ink/60 font-semibold">Out of stock</span>
          )}
        </p>

        <button
          disabled={!product.in_stock}
          className="mt-8 w-full md:w-auto bg-throttle-orange text-white font-body font-semibold px-8 py-3.5 hover:bg-throttle-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add to cart
        </button>
        <p className="font-body text-xs text-throttle-grey mt-3">
          Cart and checkout are coming in the next build phase — this button is a placeholder for now.
        </p>
      </div>
    </section>
  );
}
