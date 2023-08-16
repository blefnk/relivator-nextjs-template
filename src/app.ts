// ?? To reduce the number of config files, we aim to combine everything into a single file.
// ?? Materials about @satisfies: https://youtu.be/49gHWuepxxE, https://youtu.be/G1RtAmI0-vc

import { networks } from "~/utils/appts/socials";
import { ContentSection, HeroHeader } from "~/utils/appts/types";

// ========================================================

export const appts = {
  name: "Relivator",
  social: networks({
    youtube: "@bleverse_com",
    discord: "Pb8uKbwpsJ",
    facebook: "groups/bleverse",
    twitter: "bleverse_com",
    github: "blefnk"
  })
  // providers: {
  //   database: "Drizzle", // Prisma | ...
  // },
  // } satisfies Config;
};

export default appts;

// ========================================================

export const REPOSITORY_OWNER = "blefnk";
export const REPOSITORY_NAME = "relivator";
export const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;
export const baseUrl = "https://relivator.bleverse.com";

// ========================================================

export const BASE_URL =
  process.env["NODE_ENV"] === "production" ? baseUrl : "http://localhost:3000";
export const BRAND_NAME = "Relivator";
export const BRAND_DESCRIPTION =
  "A Next.js 13 app with auth and payments, built with PlanetScale, Drizzle ORM, Lucia and Tailwind";

export const OWNER_ROLE = "owner";
export const ADMIN_ROLE = "admin";
export const MEMBER_ROLE = "member";

export const TRIAL_LENGTH_IN_DAYS = 7;
export const ROLES = [OWNER_ROLE, ADMIN_ROLE, MEMBER_ROLE] as const;

// ========================================================

export const settings = {
  themeToggleEnabled: true
};

export const siteConfig = {
  name: "Relivator",
  author: "Bleverse",
  description:
    "Easy to setup, customizable, quick, and responsive Next.js website starter.",
  keywords: [
    "open source",
    "react",
    "next.js",
    "nextjs",
    "bleverse",
    "relivator",
    "starter",
    "template",
    "landing page",
    "tools",
    "utils",
    "next.js 13",
    "app router",
    "parallel routes",
    "server components",
    "server actions",
    "t3 stack",
    "tailwind css",
    "drizzle orm",
    "prisma",
    "shadcn/ui",
    "shadcn ui",
    "radix ui",
    "lemon squeezy",
    "stripe",
    "planetscale",
    "blefonix"
  ],
  url: {
    base: baseUrl,
    author: "https://github.com/blefnk"
  },
  ogImage: `${baseUrl}/og-image.png`
};

export const contactConfig = {
  email: "blefnk@gmail.com"
};

// ========================================================

export const heroHeader: HeroHeader = {
  header: `Next.js Apps Made Easy`,
  subheader: `Easy to setup. Customizable. Quick. Responsive.`
};

export const featureCards: ContentSection = {
  header: `Powered by`,
  subheader: `What Makes Relivator Possible`,
  content: [
    {
      text: `Next.js`,
      subtext: `The React Framework`
    },
    {
      text: `shadcn/ui`,
      subtext: `Beautifully Designed Components`
    },
    {
      text: `Vercel`,
      subtext: `Develop. Preview. Ship.`
    }
  ]
};

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why You Need to Download Relivator`,
  content: [
    {
      text: `SEO Optimized`,
      subtext: `Improved website visibility on search engines`
    },
    {
      text: `Highly Performant`,
      subtext: `Fast loading times and smooth performance`
    },
    {
      text: `Easy Customization`,
      subtext: `Change your content and layout with little effort`
    }
  ]
};
