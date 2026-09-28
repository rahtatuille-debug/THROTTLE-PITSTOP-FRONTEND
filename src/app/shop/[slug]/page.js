import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatKES } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { SHOP_PHONES, phoneHref } from "@/lib/shop";
import { ShieldIcon, WalletIcon, WrenchIcon } from "@/components/Icons";

const PERKS = [
  { icon: WalletIcon, text: "M-Pesa or cash on delivery" },
  { icon: ShieldIcon, text: "Try it on in store at Anwar Center" },
  { icon: WrenchIcon, text: "Workshop & repairs on site" },
];

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
    <>
      {/* Slim dark band so the transparent header has something to sit on */}
      <div className="bg-throttle-ink text-white pt-36 pb-8 md:pt-40">
        <nav className="max-w-7xl mx-auto px-6 font-body text-xs uppercase tracking-[0.18em] text-white/50" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-throttle-orange transition-colors">Shop</Link>
          {product.category && (
            <>
              <span className="mx-3 text-throttle-orange">/</span>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-throttle-orange transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-3 text-throttle-orange">/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>
      <div className="h-1 stripes" aria-hidden="true" />

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="relative aspect-square overflow-hidden bg-throttle-cream">
            {primaryImage ? (
              <Image
                src={primaryImage.image}
                alt={primaryImage.alt_text || product.name}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <ProductPlaceholder label={product.category?.name} size="lg" />
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start animate-fade-up [animation-delay:150ms]">
          <p className="eyebrow">{product.category?.name}</p>
          <h1 className="display-md mt-4 text-throttle-ink">{product.name}</h1>

          <div className="mt-6 flex items-center gap-4">
            <p className="font-display text-5xl tracking-wide text-throttle-orange leading-none">{formatKES(product.price)}</p>
            {product.in_stock ? (
              <span className="rounded-full bg-green-50 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                In stock
              </span>
            ) : (
              <span className="rounded-full bg-throttle-cream px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-throttle-grey">
                Sold out
              </span>
            )}
          </div>

          <p className="font-body text-throttle-grey mt-8 leading-relaxed border-t border-throttle-line pt-8">
            {product.description || "No description added yet."}
          </p>

          <AddToCartButton product={product} />

          <ul className="mt-10 space-y-4 border-t border-throttle-line pt-8">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 font-body text-sm text-throttle-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-throttle-cream text-throttle-orange">
                  <Icon className="w-5 h-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <p className="font-body text-sm text-throttle-grey mt-8">
            Questions about sizing or fit? Call{" "}
            <a href={phoneHref(SHOP_PHONES[0])} className="font-semibold text-throttle-ink link-underline">
              {SHOP_PHONES[0]}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
