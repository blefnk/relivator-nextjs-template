import type { FooterItem } from "~/types/nav";

import { productConfig } from "~/constants/product";
import { slugify } from "~/server/helpers/utils";

export type SiteConfig = typeof siteConfig;

const links = {
  calDotCom: "https://cal.com/sadmann7",
  discord: "https://discord.com/users/sadmann7",
  github: "https://github.com/sadmann7/relivator",
  githubAccount: "https://github.com/sadmann7",
  x: "https://twitter.com/sadmann17",
};

export const siteConfig = {
  name: "Relivator",
  description:
    "An open source e-commerce relivator build with everything new in Next.js.",
  footerNav: [
    {
      items: [
        {
          external: true,
          href: "https://onestopshop.jackblatch.com",
          title: "OneStopShop",
        },
        {
          external: true,
          href: "https://acme-corp.jumr.dev",
          title: "Acme Corp",
        },
        {
          external: true,
          href: "https://craft.mxkaske.dev",
          title: "craft.mxkaske.dev",
        },
        {
          external: true,
          href: "https://tx.shadcn.com/",
          title: "Taxonomy",
        },
        {
          external: true,
          href: "https://ui.shadcn.com",
          title: "shadcn/ui",
        },
      ],
      title: "Credits",
    },
    {
      items: [
        {
          external: false,
          href: "/about",
          title: "About",
        },
        {
          external: false,
          href: "/contact",
          title: "Contact",
        },
        {
          external: false,
          href: "/terms",
          title: "Terms",
        },
        {
          external: false,
          href: "/privacy",
          title: "Privacy",
        },
      ],
      title: "Help",
    },
    {
      items: [
        {
          external: true,
          href: links.x,
          title: "X",
        },
        {
          external: true,
          href: links.githubAccount,
          title: "GitHub",
        },
        {
          external: true,
          href: links.discord,
          title: "Discord",
        },
        {
          external: true,
          href: links.calDotCom,
          title: "cal.com",
        },
      ],
      title: "Social",
    },
    {
      items: [
        {
          external: true,
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          title: "beats to study to",
        },
        {
          external: true,
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
          title: "beats to chill to",
        },
        {
          external: true,
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
          title: "a fresh start",
        },
        {
          external: true,
          href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
          title: "coffee to go",
        },
      ],
      title: "Lofi",
    },
  ] satisfies FooterItem[],
  links,
  mainNav: [
    {
      items: [
        {
          description: "All the products we have to offer.",
          href: "/products",
          items: [],
          title: "Products",
        },
        {
          description: "Build your own custom skateboard.",
          href: "/build-a-board",
          items: [],
          title: "Build a Board",
        },
        {
          description: "Read our latest blog posts.",
          href: "/blog",
          items: [],
          title: "Blog",
        },
      ],
      title: "Lobby",
    },
    ...productConfig.categories.map((category) => ({
      items: [
        {
          description: `All ${category.name}.`,
          href: `/categories/${slugify(category.name)}`,
          items: [],
          title: "All",
        },
        ...category.subcategories.map((subcategory) => ({
          description: subcategory.description,
          href: `/categories/${slugify(category.name)}/${slugify(subcategory.name)}`,
          items: [],
          title: subcategory.name,
        })),
      ],
      title: category.name,
    })),
  ] satisfies any[],
  ogImage: "https://relivator.com/og.png",
  url: "https://relivator.com",
};
