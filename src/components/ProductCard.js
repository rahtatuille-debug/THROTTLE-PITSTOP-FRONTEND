import Link from "next/link";
import Image from "next/image";

function formatKES(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block border border-throttle-line hover:border-throttle-orange transition-colors"
    >
      <div className="relative aspect-square bg-throttle-cream overflow-hidden">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-throttle-grey font-body text-sm">
            No image yet
          </div>
        )}
        {!product.in_stock && (
          <span className="absolute top-3 left-3 bg-throttle-ink text-white text-xs font-body font-semibold px-2 py-1">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-throttle-grey uppercase tracking-wide">
          {product.category?.name}
        </p>
        <h3 className="font-body font-semibold text-throttle-ink mt-1">{product.name}</h3>
        <p className="font-body text-throttle-orange font-bold mt-1">{formatKES(product.price)}</p>
      </div>
    </Link>
  );
}
