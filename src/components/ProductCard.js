import Link from "next/link";
import Image from "next/image";
import { formatKES } from "@/lib/format";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { ArrowUpRight } from "@/components/Icons";

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-throttle-cream">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <ProductPlaceholder label={product.category?.name} />
          </div>
        )}

        {/* Orange wipe from the bottom on hover */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 bg-throttle-orange origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <span className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-throttle-ink opacity-0 translate-y-2 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:bg-throttle-orange group-hover:text-white">
          <ArrowUpRight className="w-5 h-5" />
        </span>

        {!product.in_stock ? (
          <span className="absolute top-4 left-4 bg-white text-throttle-ink text-[10px] font-body font-bold uppercase tracking-[0.18em] px-3 py-1.5">
            Sold out
          </span>
        ) : (
          <span className="absolute top-4 left-4 bg-throttle-ink/80 backdrop-blur text-white text-[10px] font-body font-bold uppercase tracking-[0.18em] px-3 py-1.5">
            {product.category?.name}
          </span>
        )}
      </div>

      <div className="pt-4 flex flex-col gap-2 sm:pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="font-body text-sm sm:text-base font-semibold text-throttle-ink leading-snug transition-colors group-hover:text-throttle-orange">
          {product.name}
        </h3>
        <p className="font-display text-2xl tracking-wide text-throttle-ink whitespace-nowrap leading-none pt-0.5">
          {formatKES(product.price)}
        </p>
      </div>
    </Link>
  );
}
