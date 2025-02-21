
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
          'pink-light': '#FF446A',
          'pink-dark': '#E91E42',
          'bg-light': '#F8F8F8',
          'text-secondary': '#6A6A6A'
        },
        coin: {
          gold: "#FFD700",
          light: "#FFF7CC",
          yellow: "#FFC700",
          'yellow-light': '#FFE589'
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
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        slideUp: "slideUp 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shine: "shine 8s linear infinite"
      },
      backgroundImage: {
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
