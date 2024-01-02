/**
 * TODO: See #33 and #90 of the Relivator's Roadmap
 * @see https://github.com/tokenami/tokenami#readme
 */

import { createConfig } from "@tokenami/dev";

export default createConfig({
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  grid: "0.25rem",
  responsive: {
    medium: "@media (min-width: 1024px)",
    "medium-self": "@container (min-width: 400px)",
  },
  theme: {
    alpha: {},
    anim: {},
    border: {},
    color: {
      "slate-100": "#f1f5f9",
      "slate-700": "#334155",
      "sky-500": "#0ea5e9",
    },
    ease: {},
    "font-size": {},
    leading: {},
    "line-style": {},
    radii: {
      rounded: "10px",
      circle: "9999px",
      none: "none",
    },
    size: {},
    shadow: {},
    surface: {},
    tracking: {},
    transition: {},
    weight: {},
    z: {},
  },
});
