import type { Category, Product, Subcategory } from "~/db/schema";

import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";
import { ofetch } from "ofetch";

import { productConfig } from "~/constants/product";
import { db } from "~/db";
import { categories, products, subcategories } from "~/db/schema";
import { generateId } from "~/server/helpers/id";
import { absoluteUrl, slugify } from "~/server/helpers/utils";

export async function revalidateItems() {
  console.log("🔄 Revalidating...");
  await ofetch(absoluteUrl("/api/revalidate"));
}

export async function seedCategories() {
  const data: Omit<Category, "createdAt" | "updatedAt">[] =
    productConfig.categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      slug: slugify(category.name),
    }));

  await db.delete(categories);
  console.log(`📝 Inserting ${data.length} categories`);
  await db.insert(categories).values(data);
}

export async function seedSubcategories() {
  const data: Omit<Subcategory, "createdAt" | "updatedAt">[] = [];

  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .execute();

  for (const category of allCategories) {
    const subcategories = productConfig.categories.find(
      (c) => c.name === category.name,
    )?.subcategories;

    if (subcategories) {
      for (const subcategory of subcategories) {
        data.push({
          id: subcategory.id,
          name: subcategory.name,
          categoryId: category.id,
          description: subcategory.description,
          slug: slugify(subcategory.name),
        });
      }
    }
  }

  await db.delete(subcategories);
  console.log(`📝 Inserting ${data.length} subcategories`);
  await db.insert(subcategories).values(data);
}

export async function seedProducts({
  count,
  storeId,
}: {
  count?: number;
  storeId: string;
}) {
  const data: Omit<Product, "createdAt" | "updatedAt">[] = [];

  const categoryIds = productConfig.categories.map((category) => category.id);

  for (let index = 0; index < (count ?? 10); index++) {
    const categoryId = faker.helpers.shuffle(categoryIds)[0];

    if (!categoryId) {
      throw new Error(`${categoryId} category not found`);
    }

    const allSubcategories = await db
      .select({
        id: subcategories.id,
      })
      .from(subcategories)
      .where(eq(subcategories.categoryId, categoryId))
      .execute();

    data.push({
      id: generateId(),
      name: faker.commerce.productName(),
      categoryId,
      description: faker.commerce.productDescription(),
      images: null,
      inventory: faker.number.int({ max: 100, min: 50 }),
      originalPrice: faker.commerce.price(),
      price: faker.commerce.price(),
      rating: faker.number.int({ max: 5, min: 0 }),

      // status: faker.helpers.shuffle(products.status.enumValues)[0] ?? "active",
      status: "active",
      storeId,
      subcategoryId: faker.helpers.shuffle(allSubcategories)[0]?.id ?? null,
    });
  }

  await db.delete(products).where(eq(products.storeId, storeId));
  console.log(`📝 Inserting ${data.length} products`);
  await db.insert(products).values(data);
}
