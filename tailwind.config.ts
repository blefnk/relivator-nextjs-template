import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";
import { withUt } from "uploadthing/tw";

// ========================================================
//
// Tailwind CSS v3 Configuration File
// Note: Tailwind CSS v4 does not use this configuration.
// v4 only relies on variables in `src/styles/globals.css`.
// See: https://tailwindcss.com/blog/tailwindcss-v4-alpha
//
// ========================================================
//
// Alpha Switcher Commands:
// `pnpm deps:use-tailwind-[3|4]` and `pnpm tw:[v4|v3]`
//
// - We are currently using [Tailwind CSS v3](https://tailwindcss.com).
// - These commands allow you to switch between [stable v3](https://tailwindcss.com/docs/guides/nextjs) and alpha v4.
// - After running these commands, please open `postcss.config.js` and toggle comments there as needed.
// - NOTE: Relivator 1.2.6 is currently not fully compatible with Tailwind CSS v4.
// - Some manual adjustments may be needed.
//
// ========================================================
//
const config = withUt({
  content: ["./{addons,src}/**/*.{ts,tsx}"],
  darkMode: ["class"],
  plugins: [animate],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1850px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", ...fontFamily.mono],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
}) satisfies Config;

export default config;
