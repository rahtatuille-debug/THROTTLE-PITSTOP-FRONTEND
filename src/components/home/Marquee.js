const WORDS = ["Helmets", "Jackets", "Gloves", "Boots", "Spare Parts", "Repairs", "Servicing"];

// Endless orange ticker. The list is rendered twice and the track slides
// by exactly half its width, so the loop is seamless.
export default function Marquee() {
  const track = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden bg-throttle-orange py-5 text-white -rotate-1 scale-[1.02] shadow-[0_20px_50px_-20px_rgba(245,128,33,0.6)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((word, i) => (
          <span key={i} className="flex items-center font-display text-3xl md:text-4xl tracking-wide whitespace-nowrap" aria-hidden={i >= WORDS.length}>
            <span className="px-8">{word}</span>
            <svg className="h-5 w-5 text-throttle-ink" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
