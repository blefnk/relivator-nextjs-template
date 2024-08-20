import type { Option } from "@/types/reliverse/store";

import type { Product } from "~/db/schema/provider";

export const sortOptions = [
  {
    label: "Date: Old to new",
    value: "createdAt.asc",
  },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  {
    label: "Price: Low to high",
    value: "price.asc",
  },
  {
    label: "Price: High to low",
    value: "price.desc",
  },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

export const productCategories = [
  {
    image: "/images/skateboard-one.webp",
    subcategories: [
      {
        description: "The board itself.",
        image: "/images/deck-one.webp",
        slug: "decks",
        title: "Decks",
      },
      {
        description: "The wheels that go on the board.",
        image: "/images/wheel-one.webp",
        slug: "wheels",
        title: "Wheels",
      },
      {
        description: "The trucks that go on the board.",
        image: "/images/truck-one.webp",
        slug: "trucks",
        title: "Trucks",
      },
      {
        description: "The bearings that go in the wheels.",
        image: "/images/bearing-one.webp",
        slug: "bearings",
        title: "Bearings",
      },
      {
        description: "The griptape that goes on the board.",
        image: "/images/griptape-one.webp",
        slug: "griptape",
        title: "Griptape",
      },
      {
        description: "The hardware that goes on the board.",
        image: "/images/hardware-one.webp",
        slug: "hardware",
        title: "Hardware",
      },
      {
        description: "The tools that go with the board.",
        image: "/images/tool-one.webp",
        slug: "tools",
        title: "Tools",
      },
    ],
    title: "furniture",
  },
  {
    image: "/images/clothing-one.webp",
    subcategories: [
      {
        description: "Cool and comfy tees for effortless style.",
        slug: "t-shirts",
        title: "T-shirts",
      },
      {
        description: "Cozy up in trendy hoodies.",
        slug: "hoodies",
        title: "Hoodies",
      },
      {
        description: "Relaxed and stylish pants for everyday wear.",
        slug: "pants",
        title: "Pants",
      },
      {
        description: "Stay cool with casual and comfortable shorts.",
        slug: "shorts",
        title: "Shorts",
      },
      {
        description: "Top off the look with stylish and laid-back hats.",
        slug: "hats",
        title: "Hats",
      },
    ],
    title: "clothing",
  },
  {
    image: "/images/shoe-one.webp",
    subcategories: [
      {
        description: "Rad low tops shoes for a stylish low-profile look.",
        slug: "low-tops",
        title: "Low Tops",
      },
      {
        description: "Elevate the style with rad high top shoes.",
        slug: "high-tops",
        title: "High Tops",
      },
      {
        description: "Effortless style with rad slip-on shoes.",
        slug: "slip-ons",
        title: "Slip-ons",
      },
      {
        description: "Performance-driven rad shoes for the pros.",
        slug: "pros",
        title: "Pros",
      },
      {
        description: "Timeless style with rad classic shoes.",
        slug: "classics",
        title: "Classics",
      },
    ],
    title: "tech",
  },
  {
    image: "/images/backpack-one.webp",
    subcategories: [
      {
        description: "Essential tools for maintaining the skateboard, all rad.",
        slug: "skate-tools",
        title: "Skate Tools",
      },
      {
        description: "Upgrade the ride with our rad selection of bushings.",
        slug: "bushings",
        title: "Bushings",
      },
      {
        description:
          "Enhance the skateboard's performance with rad shock and riser pads.",
        slug: "shock-riser-pads",
        title: "Shock & Riser Pads",
      },
      {
        description:
          "Add creativity and style to the tricks with our rad skate rails.",
        slug: "skate-rails",
        title: "Skate Rails",
      },
      {
        description: "Keep the board gliding smoothly with our rad skate wax.",
        slug: "wax",
        title: "Wax",
      },
      {
        description: "Keep the feet comfy and stylish with our rad socks.",
        slug: "socks",
        title: "Socks",
      },
      {
        description: "Carry the gear in style with our rad backpacks.",
        slug: "backpacks",
        title: "Backpacks",
      },
    ],
    title: "accessories",
  },
] satisfies {
  subcategories: {
    description?: string;
    image?: string;
    slug: string;
    title: string;
  }[];
  image: string;
  title: Product["category"];
}[];

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export function getSubcategories(category?: string): Option[] {
  if (!category) {
    return [];
  }

  const categoryObject = productCategories.find((c) => c.title === category);

  return (
    categoryObject?.subcategories.map((s) => ({
      label: s.title,
      value: s.slug,
    })) || []
  );
}
