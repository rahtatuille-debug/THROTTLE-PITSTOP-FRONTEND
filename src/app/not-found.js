import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-throttle-ink text-white grain">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-outline text-white/10"
        style={{ fontSize: "clamp(12rem, 45vw, 40rem)" }}
        aria-hidden="true"
      >
        404
      </span>
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 text-center">
        <p className="eyebrow">Wrong turn</p>
        <h1 className="display-lg mt-5">
          This road&apos;s <span className="text-throttle-orange">closed.</span>
        </h1>
        <p className="font-body text-white/60 mt-6">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to home <ArrowRight />
          </Link>
          <Link href="/shop" className="btn-ghost-light">
            Shop the gear
          </Link>
        </div>
      </div>
    </section>
  );
}
