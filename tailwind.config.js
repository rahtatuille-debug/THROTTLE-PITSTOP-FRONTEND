/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        throttle: {
          orange: "#F58021",
          "orange-dark": "#D96A10",
          ink: "#14110F",
          cream: "#FFF9F3",
          line: "#ECE3D6",
          grey: "#6B6660",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
