import type { Config } from "tailwindcss";
import { theme } from "./config/theme";

const headingFont = theme.fonts.heading.split(",").map((font) => font.trim().replace(/^'(.*)'$/, "$1"));
const bodyFont = theme.fonts.body.split(",").map((font) => font.trim().replace(/^'(.*)'$/, "$1"));

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: theme.colors.black,
          ivory: theme.colors.ivory,
          cream: theme.colors.cream,
          beige: theme.colors.beige,
          champagne: theme.colors.champagne,
          gold: theme.colors.gold,
        },
        neutral: theme.colors.gray,
      },
      fontFamily: {
        heading: headingFont,
        body: bodyFont,
      },
      boxShadow: {
        soft: "0 18px 50px rgba(10, 10, 10, 0.08)",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        fadeInUp: "fadeInUp 0.6s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
