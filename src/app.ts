// ?? To reduce the number of config files, we aim to combine everything into a single file.
// ?? Materials about @satisfies: https://youtu.be/49gHWuepxxE, https://youtu.be/G1RtAmI0-vc

import { ContentSection, HeroHeader } from "~/utils/appts/appts";
import { productCategories } from "~/utils/appts/products";
import { networks } from "~/utils/appts/socials";
import { slugify } from "~/utils/server/utils";
import type { FooterItem, MainNavItem } from "~/utils/types";

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
};

export default appts;

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://x.com/bleverse_com",
  github: "https://github.com/blefnk/relivator",
  githubAccount: "https://github.com/blefnk",
  discord: "https://discord.gg/Pb8uKbwpsJ",
  facebook: "https://facebook.com/groups/bleverse"
};

export const contactConfig = {
  email: "blefnk@gmail.com"
};

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
  "A Next.js 13 app with auth and payments, built with Shadcn/ui, PlanetScale, Drizzle ORM, Tailwind, and more";

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
    "🔥 Next.js 13 Starter. App Router, TypeScript, shadcn/ui, i18n, T3, Stripe, Clerk, Tailwind, Drizzle, Zod, RSC, SWC, tRPC, NextAuth, Server Actions, Lucide Icons, & More. Get it now and enjoy!",
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
    author: REPOSITORY_OWNER
  },
  ogImage: `${baseUrl}/og-image.png`,
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/products",
          description: "All the products we have to offer.",
          items: []
        },
        {
          title: "Build a Look",
          href: "/build-a-board",
          description: "Build your own custom clothes.",
          items: []
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: []
        }
      ]
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: []
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: []
        }))
      ]
    }))
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Bleverse",
      items: [
        {
          title: "Community",
          href: "https://bleverse.com",
          external: true
        },
        {
          title: "MF Piano",
          href: "https://mfpiano.org",
          external: true
        },
        {
          title: "Peresfer",
          href: "https://peresfer.com",
          external: true
        },
        {
          title: "Relivator",
          href: "https://relivator.bleverse.com",
          external: true
        }
      ]
    },
    {
      title: "Help",
      items: [
        {
          title: "Contact",
          href: "/contact",
          external: false
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false
        },
        {
          title: "Terms",
          href: "/terms",
          external: false
        },
        {
          title: "About",
          href: "/about",
          external: false
        }
      ]
    },
    {
      title: "Social",
      items: [
        {
          title: "Facebook",
          href: links.facebook,
          external: true
        },
        {
          title: "Discord",
          href: links.discord,
          external: true
        },
        {
          title: "Twitter",
          href: links.twitter,
          external: true
        },
        {
          title: "Github",
          href: links.githubAccount,
          external: true
        }
      ]
    },
    {
      title: "Github",
      items: [
        {
          title: "Nomaders",
          href: "https://github.com/blefnk/nomaders",
          external: true
        },
        {
          title: "Reliverse",
          href: "https://github.com/blefnk/reliverse",
          external: true
        },
        {
          title: "Relivator",
          href: "https://github.com/blefnk/relivator",
          external: true
        },
        {
          title: "Utilities",
          href: "https://github.com/blefnk/utils",
          external: true
        }
      ]
    }
  ] satisfies FooterItem[]
};

// ========================================================

export const heroHeader: HeroHeader = {
  header: `Next.js 13 Store & Dashboard Starter. Build Awesome eCommerce, SaaS
  Apps, and more.`,
  subheader: `App Router, TypeScript, shadcn/ui, i18n, T3, Stripe, Clerk, Tailwind,
  Drizzle, Zod, RSC, SWC, tRPC, NextAuth, Server Actions, Lucide Icons,
  etc.`
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
