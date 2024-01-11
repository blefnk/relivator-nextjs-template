"use server";

import { revalidatePath } from "next/cache";
import { faker } from "@faker-js/faker";

import { db } from "~/data/db";
import { products, type Product } from "~/data/db/schema";
import {
  getSubcategories,
  productCategories,
  productTags,
} from "~/server/config/products";

export async function generateProducts({
  storeId,
  count = 5,
}: {
  storeId: number;
  count?: number;
}) {
  const allProducts: Product[] = [];

  const categories = productCategories.map((category) => category.title);

  const category = faker.helpers.shuffle(categories)[0] ?? "furniture";

  const subcategories = getSubcategories(category).map((s) => s.value);
  const subcategory = faker.helpers.shuffle(subcategories)[0] ?? "decks";

  for (let i = 0; i < count; i++) {
    ("");
    allProducts.push({
      id: faker.number.int({ min: 100000, max: 999999 }),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      // todo: float doesn't work with postgres here:
      rating: faker.number.int({ min: 0, max: 5 }),
      category,
      subcategory,
      images: null,
      createdAt: faker.date.past(),
      inventory: faker.number.int({ min: 0, max: 100 }),
      storeId,
      tags: faker.helpers.shuffle(productTags).slice(0, 3),
    });
  }
  await db.insert(products).values(allProducts);

  revalidatePath(`/dashboard/stores/${storeId}/products`);
}
