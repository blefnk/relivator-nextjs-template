import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { tailwindTransform } from "postcss-lit";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  future: { hoverOnlyWhenSupported: true },
  transform: [{ ts: tailwindTransform }],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      animationDuration: {
        medium: "500ms",
        slow: "700ms",
        "really-slow": "1000ms",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        bleverse: {
          community: "#FF0080",
          blefonix: "#0070F3",
          mfpiano: "#50E3C2",
          games: "#F5A623",
          ai: "#7928CA",
        },
        community: {
          50: "#E5E7EB",
          100: "#CBD5E1",
          200: "#9AA5B1",
          300: "#718096",
          400: "#4A5568",
          500: "#2D3748",
          600: "#1A202C",
          700: "#171923",
          800: "#192231",
          900: "#1F2937",
        },
        blefonix: {
          50: "#1a202c",
          100: "#181d28",
          200: "#0f131a",
          300: "#0d1016",
          400: "#0b0d12",
          500: "#090b0f",
          600: "#07080b",
          700: "#040507",
          800: "#020304",
          900: "#000000",
        },
        violetDark: "#4c2889",
        hotPink: "#FF1966",
        light: "#FAFAFA",
        dark: "#111111",
        purple: {
          lightest: "#F7F4FE",
          light: "#EEE5FF",
          hover: "#b99af4",
          primary: "#8147EB",
          dark: "#611AE5",
          darker: "#5326a6",
          darkest: "#280A6C",
        },
        orange: {
          light: "#DC7E52",
          primary: "#EB7847",
          dark: "#CF4E17",
        },
        green: {
          light: "#44b22e",
        },
        "gray-1000": "rgb(17,17,19)",
        "gray-1100": "rgb(10,10,11)",
      },
      invert: {
        15: ".15",
        25: ".25",
        35: ".35",
        45: ".45",
        55: ".55",
        65: ".65",
        75: ".75",
        85: ".85",
        95: ".95",
      },
      gridTemplateColumns: {
        "[200px_1fr]": "200px 1fr",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      fontSize: {
        reponsive2Xl: "clamp(1.7rem, 1rem + 3vw, 4rem)",
        reponsiveXl: "clamp(1rem, 1rem + 1vw, 1.2rem)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient":
          "linear-gradient(120deg, #6836c9, #a770e2 50%, #e6a9fa 100%, #eed4f4 100%, #ff99d7)",
        "primary-gradient-2":
          "linear-gradient(120deg, #6836c9, #e6a9fa 100%, #eed4f4 100%, #ff99d7)",
        "secondary-gradient":
          "linear-gradient(to right, rgb(251, 146, 60), rgb(251, 113, 133))",
        "secondary-gradient-2":
          "linear-gradient(to right, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))",
        "secondary-gradient-3":
          "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
        "secondary-gradient-4":
          "linear-gradient(to bottom, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
        "heading-gradient":
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        "landing-gradient":
          "radial-gradient(circle, rgba(2, 0, 36, 0) 0, hsl(var(--background)) 100%)",
        "landing-gradient-2":
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)",
        "hero-gradient":
          "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
        "hero-glow":
          "conic-gradient(from 230.29deg at 51.63% 52.16%, #6836c9 0deg, #a770e2 67.5deg, #e6a9fa 198.75deg, #6836c9 251.25deg, #eed4f4 301.88deg, #ff99d7 360deg)",
      },
      boxShadow: {
        primary: "rgb(80 63 205 / 50%) 0px 1px 40px",
      },
      keyframes: ({ theme }) => ({
        check: {
          from: {
            "stroke-dasharray": "0px, 100%",
          },
          to: {
            "stroke-dasharray": "100%, 100%",
          },
        },
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        "image-rotate": {
          "0%": { transform: "rotateX(25deg)" },
          "25%": { transform: "rotateX(25deg) scale(0.9)" },
          "60%": { transform: "none" },
          "100%": { transform: "none" },
        },
        "image-glow": {
          "0%": {
            opacity: "0px",
            "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
          },
          "10%": {
            opacity: "1px",
            "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
          },
          "100%": {
            opacity: "0.2px",
          },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
        shine: {
          to: {
            backgroundPosition: "right",
          },
        },
        rerender: {
          "0%": {
            "border-color": theme("colors.bleverse.community"),
          },
          "40%": {
            "border-color": theme("colors.bleverse.community"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.bleverse.community"),
            color: theme("colors.white"),
          },
          "40%": {
            background: theme("colors.bleverse.community"),
            color: theme("colors.white"),
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)",
          },
        },
        fadeToTransparent: {
          "0%": {
            opacity: "1",
          },
          "40%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        fadeIn: {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      }),
      animation: {
        check: "check 150ms cubic-bezier(0.65, 0, 1, 1) forwards",
        "image-glow": "image-glow 4100ms 600ms ease-out forwards",
        "image-rotate": "image-rotate 1400ms ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        carousel: "marquee 60s linear infinite",
        typing: "typing 1s steps(20) alternate",
        shine: "shine 1s ease-in-out infinite",
        blink: "blink 1.4s both infinite",
        fadeIn: "fadeIn .3s ease-in-out",
        fall: "fall 1s linear",
      },
    },
  },
  plugins: [
    typography,
    forms({ strategy: "class" }),
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
} satisfies Config;
