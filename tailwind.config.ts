
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        tiktok: {
          pink: "#FE2C55",
          black: "#010101",
          gray: "#121212",
          light: "#F1F1F2",
        },
        coin: {
          gold: "#FFD700",
          light: "#FFF7CC",
        },
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        slideUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        slideUp: "slideUp 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
