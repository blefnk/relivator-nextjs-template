import { revalidatePath } from "next/cache";

import { faker } from "@faker-js/faker";

import type { Product } from "~/db/schema/provider";

import {
  getSubcategories,
  productCategories,
  productTags,
} from "~/constants/products";
import { db } from "~/db";
import { products } from "~/db/schema/provider";

export async function generateProducts({
  count = 5,
  storeId,
}: {
  count?: number;
  storeId: string;
}) {
  const allProducts: Product[] = [];

  const categories = productCategories.map((category) => category.title);

  const category = faker.helpers.shuffle(categories)[0] || "furniture";

  const subcategories = getSubcategories(category).map((s) => s.value);
  const subcategory = faker.helpers.shuffle(subcategories)[0] || "decks";

  for (let index = 0; index < count; index++) {
    allProducts.push({
      // @ts-expect-error TODO: fix id type
      id: faker.number.int({
        max: 999999,
        min: 100000,
      }),
      name: faker.commerce.productName(),
      category,
      createdAt: faker.date.past(),
      description: faker.commerce.productDescription(),
      images: null,
      inventory: faker.number.int({
        max: 100,
        min: 0,
      }),
      // @ts-expect-error TODO: fix id type
      price: faker.commerce.price(),

      // todo: float doesn't work with postgres here:
      rating: faker.number.int({
        max: 5,
        min: 0,
      }),
      // @ts-expect-error TODO: fix id type
      storeId,
      subcategory,
      tags: faker.helpers.shuffle(productTags).slice(0, 3),
    });
  }

  await db.insert(products).values(allProducts);

  revalidatePath(`/dashboard/stores/${storeId}/products`);
}
