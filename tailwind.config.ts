import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "390px",
      md: "744px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1728px",
    },
    container: {
      center: true,
    },
    fontFamily: {
      body: ['"Mersad"', "Arial", "Inter", "sans-serif"],
    },
    colors: ({ colors }) => ({
      site: "hsl(var(--color-site))",
      text: "hsl(var(--color-text))",
      brand: "hsl(var(--color-brand))",
    }),
  },
  plugins: [],
} satisfies Config;