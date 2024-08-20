import type { FooterItem } from "@/types/reliverse/nav";
import type { MainMenuItem } from "@/types/reliverse/with";

import { slugify } from "@/utils/reliverse/string";

import metadata from "~/constants/metadata";
import { productCategories } from "~/constants/products";

// Define available icon names as a union type
type IconName =
  | "billing"
  | "discord"
  | "dollarSign"
  | "laptop"
  | "settings"
  | "store"
  | "terminal"
  | "user"
  | "view";

const socialLinks = {
  discord: "https://discord.gg/Pb8uKbwpsJ",
  facebook: "https://facebook.com/groups/bleverse",
  github: "https://github.com/blefnk/relivator-nextjs-template",
  githubAccount: "https://github.com/blefnk",
  twitter: "https://x.com/blefnk",
};

// Did you know that you can edit some settings of this file headlessly?
// Just run pnpm reli:setup and configure the advanced settings. Perfect!
export const siteConfig = {
  name: metadata.name,
  appNameDesc: metadata.appNameDesc,
  appPublisher: metadata.appPublisher,
  appVersion: metadata.appVersion,
  author: {
    email: metadata.author.email,
    fullName: metadata.author.fullName,
    handle: metadata.author.handle,
    handleAt: metadata.author.handleAt,
    url: metadata.author.url,
  },
  footerNav: [
    {
      items: [
        {
          external: false,
          href: "/contact",
          title: "Contact",
        },
        {
          external: false,
          href: "/privacy",
          title: "Privacy",
        },
        {
          external: false,
          href: "/terms",
          title: "Terms",
        },
        {
          external: false,
          href: "/about",
          title: "About",
        },
      ],
      title: "Help",
    },
    {
      items: [
        {
          external: true,
          href: socialLinks.githubAccount,
          title: "Github",
        },
        {
          external: true,
          href: socialLinks.discord,
          title: "Discord",
        },
        {
          external: true,
          href: socialLinks.twitter,
          title: "Twitter",
        },
        {
          external: true,
          href: socialLinks.facebook,
          title: "Facebook",
        },
      ],
      title: "Social",
    },
    {
      items: [
        {
          external: true,
          href: "https://github.com/orgs/reliverse/repositories",
          title: "@reliverse",
        },
        {
          external: true,
          href: socialLinks.githubAccount,
          title: "@blefnk",
        },
        {
          external: true,
          href: socialLinks.github,
          title: "Relivator",
        },
        {
          external: true,
          href: "https://github.com/blefnk/reliverse-website-builder",
          title: "Reliverse",
        },
      ],
      title: "Github",
    },
    {
      items: [
        {
          external: true,
          href: "https://github.com/sponsors/blefnk",
          title: "GitHub Sponsors",
        },
        {
          external: true,
          href: "https://buymeacoffee.com/blefnk",
          title: "Buy Me a Coffee",
        },
        {
          external: true,
          href: "https://patreon.com/blefnk",
          title: "Patreon",
        },
        {
          external: true,
          href: "https://paypal.me/blefony",
          title: "PayPal",
        },
      ],
      title: "Support",
    },
  ] satisfies FooterItem[],
  images: [
    {
      alt: "Shows the cover image of Relivator Next.js template",
      url: "/og.png",
    },
  ],
  keywords: ["next js shadcn ecommerce template"] as string[],
  links: socialLinks,
  mainNav: [
    {
      href: "/",
      items: [
        {
          description: "All the products we have to offer",
          href: "/products",
          items: [],
          title: "Products",
        },
        {
          description: "Build your own custom clothes",
          href: "/custom/clothing",
          items: [],
          title: "Build a Look",
        },
        {
          description: "Read our latest blog posts",
          href: "/blog",
          items: [],
          title: "Blog",
        },
      ],
      title: "Catalogue",
    },
    ...productCategories.map((category) => ({
      href: `/categories/${slugify(category.title)}`,
      items: [
        {
          description: `All ${category.title}.`,
          href: `/categories/${slugify(category.title)}`,
          items: [],
          title: "All",
        },
        ...category.subcategories.map((subcategory) => ({
          description: subcategory.description,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          items: [],
          title: subcategory.title,
        })),
      ],
      title: category.title,
    })),
  ] satisfies MainMenuItem[],
  socialLinks: {
    discord: "https://discord.gg/Pb8uKbwpsJ",
    facebook: "https://facebook.com/groups/bleverse",
    github: "https://github.com/blefnk/relivator-nextjs-template",
    githubAccount: "https://github.com/blefnk",
    twitter: "https://x.com/blefnk",
  },
  themeToggleEnabled: true,
} as const;

export const oauthProvidersClerk = [
  {
    name: "Google",
    icon: "view",
    strategy: "oauth_google",
  },
  {
    name: "Discord",
    icon: "discord",
    strategy: "oauth_discord",
  },
] satisfies {
  strategy:
    | "oauth_discord"
    | "oauth_facebook"
    | "oauth_github"
    | "oauth_google"
    | "oauth_microsoft";
  icon: IconName;
  name: string;
}[];
