/**
 * Shown where a product has no photo yet. Looks intentional rather than
 * broken: the category name in giant outlined type over a dark panel.
 */
export default function ProductPlaceholder({ label, size = "md" }) {
  const text = (label || "Gear").toUpperCase();
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-throttle-steel via-throttle-coal to-throttle-ink">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-throttle-orange/30 blur-3xl"
        aria-hidden="true"
      />
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-outline text-white/25 leading-none text-center px-4
          ${size === "lg" ? "text-[5rem] md:text-[8rem]" : size === "sm" ? "text-lg" : "text-5xl md:text-6xl"}`}
        aria-hidden="true"
      >
        {text}
      </span>
      {size !== "sm" && (
        <span className="absolute bottom-4 left-4 hidden sm:block font-body text-[10px] uppercase tracking-mega text-white/40">
          Photo coming soon
        </span>
      )}
    </div>
  );
}
