import { faker } from "@faker-js/faker";
import consola from "consola";
import { eq } from "drizzle-orm";
import { ofetch } from "ofetch";

import { productConfig } from "~/config/product";
import { db } from "~/server/db";
import {
  categories,
  products,
  subcategories as subcategoriesTable,
  type Category,
  type Product,
  type Subcategory,
} from "~/server/db/schema";
import { generateId } from "~/server/id";
import { absoluteUrl, slugify } from "~/server/utils";

// Utility function to handle errors with user prompt
async function handleSeedingError(error: unknown, taskName: string) {
  consola.error(`❌ Failed to ${taskName}:`, error);
  const confirmSkip = await consola.prompt(
    `Failed to ${taskName}. Do you want to skip and continue?`,
    { type: "confirm" },
  );
  if (!confirmSkip) {
    throw error;
  }
}

// Revalidate items, with error handling and prompt to skip if a connection issue occurs
export async function revalidateItems() {
  consola.info("🔄 Revalidating items...");
  try {
    await ofetch(absoluteUrl("/api/revalidate"));
    consola.success("✅ Revalidation complete.");
  } catch (error) {
    await handleSeedingError(error, "revalidate items");
  }
}

// Seed categories with error handling
export async function seedCategories() {
  consola.info("🌱 Seeding categories...");
  try {
    const data: Omit<Category, "createdAt" | "updatedAt">[] =
      productConfig.categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: slugify(category.name),
        description: category.description,
        image: category.image,
      }));

    await db.delete(categories).where(eq(categories.id, "1"));
    consola.info(`📝 Inserting ${data.length} categories`);
    await db.insert(categories).values(data);
    consola.success("✅ Categories seeded successfully.");
  } catch (error) {
    await handleSeedingError(error, "seed categories");
  }
}

// Seed subcategories with error handling
export async function seedSubcategories() {
  consola.info("🌱 Seeding subcategories...");
  try {
    const data: Omit<Subcategory, "createdAt" | "updatedAt">[] = [];
    const allCategories = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories);

    allCategories.forEach((category) => {
      const subcategoriesConfig = productConfig.categories.find(
        (c) => c.name === category.name,
      )?.subcategories;

      if (subcategoriesConfig) {
        subcategoriesConfig.forEach((subcategory) => {
          data.push({
            id: subcategory.id,
            name: subcategory.name,
            slug: slugify(subcategory.name),
            categoryId: category.id,
            description: subcategory.description,
          });
        });
      }
    });

    await db.delete(subcategoriesTable).where(eq(subcategoriesTable.id, "1"));
    consola.info(`📝 Inserting ${data.length} subcategories`);
    await db.insert(subcategoriesTable).values(data);
    consola.success("✅ Subcategories seeded successfully.");
  } catch (error) {
    await handleSeedingError(error, "seed subcategories");
  }
}

// Seed products with error handling
export async function seedProducts({
  storeId,
  count = 10,
}: { storeId: string; count?: number }) {
  consola.info("🌱 Seeding products...");
  try {
    const data: Omit<Product, "createdAt" | "updatedAt">[] = [];
    const categoryIds = productConfig.categories.map((category) => category.id);

    // Fetch subcategories for each category and store in a map
    const allSubcategoriesMap: Record<string, { id: string }[]> = {};
    for (const categoryId of categoryIds) {
      const categorySubcategories = await db
        .select({ id: subcategoriesTable.id })
        .from(subcategoriesTable)
        .where(eq(subcategoriesTable.categoryId, categoryId));
      allSubcategoriesMap[categoryId] = categorySubcategories;
    }

    for (let i = 0; i < count; i++) {
      const categoryId = faker.helpers.arrayElement(categoryIds);

      if (!categoryId) {
        throw new Error(`${categoryId} category not found`);
      }
      const subcategoryId =
        faker.helpers.arrayElement(allSubcategoriesMap[categoryId] ?? [])?.id ??
        null;

      data.push({
        id: generateId(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        originalPrice: faker.commerce.price(),
        status:
          faker.helpers.arrayElement(products.status.enumValues) ?? "active",
        images: null,
        categoryId,
        subcategoryId,
        storeId,
        inventory: faker.number.int({ min: 50, max: 100 }),
        rating: faker.number.int({ min: 0, max: 5 }),
      });
    }

    await db.delete(products).where(eq(products.storeId, storeId));
    consola.info(`📝 Inserting ${data.length} products`);
    await db.insert(products).values(data);
    consola.success("✅ Products seeded successfully.");
  } catch (error) {
    await handleSeedingError(error, "seed products");
  }
}
