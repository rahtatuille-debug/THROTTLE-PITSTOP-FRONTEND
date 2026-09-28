/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Three-colour brand: white, black, orange (from the logo).
        // Everything else is a tint of black for text/lines.
        throttle: {
          orange: "#F58021",
          "orange-dark": "#D9650A",
          "orange-light": "#FFB074",
          ink: "#0A0A0A",
          coal: "#141414",
          steel: "#1F1F1F",
          cream: "#F6F5F3",
          line: "#E8E6E3",
          grey: "#6B6B6B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        mega: "0.3em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(110%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        streak: {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateX(320%)", opacity: "0" },
        },
        // Tachometer needle: blip the throttle into the redline, then settle to idle
        rev: {
          "0%": { transform: "rotate(-120deg)" },
          "40%": { transform: "rotate(104deg)" },
          "55%": { transform: "rotate(60deg)" },
          "70%": { transform: "rotate(92deg)" },
          "100%": { transform: "rotate(-62deg)" },
        },
        idle: {
          "0%, 100%": { transform: "rotate(-62deg)" },
          "50%": { transform: "rotate(-55deg)" },
        },
        shine: {
          from: { transform: "translateX(-100%) skewX(-20deg)" },
          to: { transform: "translateX(250%) skewX(-20deg)" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        draw: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "rise-in": "rise-in 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        streak: "streak 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        rev: "rev 2.4s cubic-bezier(0.3, 0.7, 0.3, 1) both, idle 2.5s ease-in-out 2.4s infinite",
        shine: "shine 1s ease",
        "scroll-dot": "scroll-dot 1.6s ease-in-out infinite",
        pop: "pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        draw: "draw 0.8s ease-out 0.4s forwards",
      },
    },
  },
  plugins: [],
};
