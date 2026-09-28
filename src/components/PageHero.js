/**
 * Black banner used at the top of every inner page, so each page opens
 * with the same bold, dark statement as the home hero.
 */
export default function PageHero({ eyebrow, title, accent, children, watermark }) {
  return (
    <section className="relative overflow-hidden bg-throttle-ink text-white grain">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-throttle-orange/25 blur-[120px]"
        aria-hidden="true"
      />
      {watermark && (
        <span
          className="pointer-events-none absolute -bottom-6 right-0 select-none font-display text-[22vw] leading-none text-white/[0.04] md:text-[14rem]"
          aria-hidden="true"
        >
          {watermark}
        </span>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-16 md:pt-44 md:pb-20">
        {eyebrow && <p className="eyebrow animate-fade-up">{eyebrow}</p>}
        <h1 className="display-lg mt-5 overflow-hidden">
          <span className="block animate-rise-in">
            {title} {accent && <span className="text-throttle-orange">{accent}</span>}
          </span>
        </h1>
        {children && (
          <div className="mt-6 max-w-xl font-body text-white/60 animate-fade-up [animation-delay:200ms]">
            {children}
          </div>
        )}
      </div>
      <div className="relative z-10 h-1.5 stripes opacity-80" aria-hidden="true" />
    </section>
  );
}
