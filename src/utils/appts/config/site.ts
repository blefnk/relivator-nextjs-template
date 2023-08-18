// import type { FooterItem, MainNavItem } from "~/utils/types/store-main";

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
    "Explore the latest trends in clothing and accessories at Relivator.",
  url: "https://relivator.store",
  ogImage: "https://relivator.store/opengraph-image.png",
  mainNav: [
    {
      title: "Shop",
      items: [
        {
          title: "All Products",
          href: "/products",
          description: "Discover our wide range of products.",
          items: []
        },
        {
          title: "Create Your Look",
          href: "/create-your-look",
          description: "Mix and match to create your perfect outfit.",
          items: []
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Stay updated with the latest fashion tips.",
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
          description: `Explore all ${category.title}.`,
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
  ],
  footerNav: [
    {
      title: "Partners",
      items: [
        {
          title: "StyleSavvy Boutique",
          href: "https://stylesavvyboutique.com",
          external: true
        },
        {
          title: "GlamAccessories",
          href: "https://glamaccessories.com",
          external: true
        },
        {
          title: "UrbanChic",
          href: "https://urbanchicfashion.co",
          external: true
        }
      ]
    },
    {
      title: "Help",
      items: [
        {
          title: "About Us",
          href: "/about",
          external: false
        },
        {
          title: "Contact",
          href: "/contact",
          external: false
        },
        {
          title: "Terms of Service",
          href: "/terms",
          external: false
        },
        {
          title: "Privacy Policy",
          href: "/privacy",
          external: false
        }
      ]
    },
    {
      title: "Connect",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true
        },
        {
          title: "Github",
          href: links.github,
          external: true
        },
        {
          title: "Discord",
          href: links.discord,
          external: true
        }
      ]
    },
    {
      title: "Tunes",
      items: [
        {
          title: "Fashion Grooves",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          external: true
        },
        {
          title: "Chic Vibes",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
          external: true
        },
        {
          title: "Fresh & Stylish",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
          external: true
        },
        {
          title: "Café Couture",
          href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
          external: true
        }
      ]
    }
  ]
};
