/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: {
        "2xl": "500px",
      },
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "stage-out": {
          "0%": { opacity: 1, transform: "translate3d(-50%,-50%,0)" },
          "100%": { opacity: 0, transform: "translate3d(-50%,-45%,0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out forwards",
        "fade-out": "fade-out 150ms ease-out forwards",
        "stage-out": "stage-out 150ms ease-out",
      },
    },
  },
  plugins: [],
};
