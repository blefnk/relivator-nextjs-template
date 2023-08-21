import type { FooterItem, MainNavItem } from "~/utils/types/store-main";

import { productCategories } from "~/data/store/products";
import { slugify } from "~/utils/server/fmt";

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://x.com/bleverse_com",
  github: "https://github.com/blefnk/relivator",
  githubAccount: "https://github.com/blefnk",
  discord: "https://discord.gg/Pb8uKbwpsJ",
  facebook: "https://facebook.com/groups/bleverse"
};

export const siteConfig = {
  name: "Relivator",
  description:
    "🔥 Next.js 13 Store Starter. App Router, TypeScript, shadcn/ui, i18n, T3, Stripe, Clerk, Tailwind, Drizzle, Zod, RSC, SWC, tRPC, NextAuth, Server Actions, Lucide Icons, & More. Download it and enjoy!",
  url: "https://relivator.bleverse.com",
  ogImage: "https://relivator.bleverse.com/og-image.png",
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
