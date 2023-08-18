import type { Option } from "~/utils/types/store-main";

import { type Product } from "~/data/db/schema";

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc"
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc"
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc"
  }
];

export const productCategories = [
  {
    title: "apparel",
    image: "/images/clothing-one.webp",
    subcategories: [
      {
        title: "T-shirts",
        description: "Cool and comfy tees for effortless style.",
        slug: "t-shirts"
      },
      {
        title: "Hoodies",
        description: "Cozy up in trendy hoodies.",
        slug: "hoodies"
      },
      {
        title: "Pants",
        description: "Relaxed and stylish pants for everyday wear.",
        slug: "pants"
      },
      {
        title: "Shorts",
        description: "Stay cool with casual and comfortable shorts.",
        slug: "shorts"
      },
      {
        title: "Hats",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "hats"
      },
      {
        title: "Socks",
        description: "Keep your feet comfy and stylish with our rad socks.",
        slug: "socks"
      }
    ]
  },
  {
    title: "shoes",
    image: "/images/shoe-one.webp",
    subcategories: [
      {
        title: "Low Tops",
        description: "Rad low tops shoes for a stylish low-profile look.",
        slug: "low-tops"
      },
      {
        title: "High Tops",
        description: "Elevate your style with rad high top shoes.",
        slug: "high-tops"
      },
      {
        title: "Slip-ons",
        description: "Effortless style with rad slip-on shoes.",
        slug: "slip-ons"
      },
      {
        title: "Performance",
        description: "Performance-driven rad shoes for the pros.",
        slug: "performance-shoes"
      },
      {
        title: "Classics",
        description: "Timeless style with rad classic shoes.",
        slug: "classic-shoes"
      }
    ]
  },
  {
    title: "accessories",
    image: "/images/accessories-one.webp",
    subcategories: [
      {
        title: "Belts",
        description: "Complete your look with stylish belts.",
        slug: "belts"
      },
      {
        title: "Jewelry",
        description: "Elevate your style with trendy jewelry.",
        slug: "jewelry"
      },
      {
        title: "Bags",
        description: "Carry your essentials in style with our bags.",
        slug: "bags"
      },
      {
        title: "Hats",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "hats"
      },
      {
        title: "Sunglasses",
        description: "Protect your eyes in style with rad sunglasses.",
        slug: "sunglasses"
      },
      {
        title: "Scarves",
        description: "Stay warm and stylish with our rad scarves.",
        slug: "scarves"
      }
    ]
  }
] satisfies {
  title: Product["category"];
  image: string;
  subcategories: {
    title: string;
    description?: string;
    image?: string;
    slug: string;
  }[];
}[];

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive"
];

export function getSubcategories(category?: string): Option[] {
  if (!category) return [];

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug
      })) ?? [];

  return subcategories;
}
