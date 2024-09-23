"use server";

import type {
  createProductSchema,
  CreateProductSchema,
  updateProductRatingSchema,
} from "~/server/validations/deprecated/product";
import type { StoredFile } from "~/types/store";
import type { z } from "zod";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { products } from "~/db/schema";
import { getErrorMessage } from "~/server/helpers/error-message";

export async function filterProducts({ query }: { query: string }) {
  noStore();
  try {
    if (query.length === 0) {
      return {
        data: null,
        error: null,
      };
    }

    const categoriesWithProducts = await db.query.categories.findMany({
      columns: {
        id: true,
        name: true,
      },

      where: (table, { sql }) => sql`position(${query} in ${table.name}) > 0`,

      // This doesn't do anything
      with: {
        products: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      data: categoriesWithProducts,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function addProduct(
  input: {
    images: StoredFile[];
    storeId: string;
  } & Omit<CreateProductSchema, "images">,
) {
  try {
    const productWithSameName = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: eq(products.name, input.name),
    });

    if (productWithSameName) {
      throw new Error("Product name already taken.");
    }

    await db.insert(products).values({
      ...input,
      images: JSON.stringify(input.images) as unknown as StoredFile[],
    });

    revalidatePath(`/dashboard/stores/${input.storeId}/products.`);

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function updateProduct(
  input: { id: string; storeId: string } & z.infer<typeof createProductSchema>,
) {
  try {
    const product = await db.query.products.findFirst({
      where: and(
        eq(products.id, input.id),

        eq(products.storeId, input.storeId),
      ),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    await db
      .update(products)

      .set({
        ...input,
        images: JSON.stringify(input.images) as unknown as StoredFile[],
      })
      .where(eq(products.id, input.id));

    revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`);

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function updateProductRating(
  input: z.infer<typeof updateProductRatingSchema>,
) {
  try {
    const product = await db.query.products.findFirst({
      columns: {
        id: true,
        rating: true,
      },
      where: eq(products.id, input.id),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    await db
      .update(products)
      .set({ rating: input.rating })
      .where(eq(products.id, input.id));

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function deleteProduct(input: { id: string; storeId: string }) {
  try {
    const product = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(products.id, input.id),

        eq(products.storeId, input.storeId),
      ),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    await db.delete(products).where(eq(products.id, input.id));

    revalidatePath(`/dashboard/stores/${input.storeId}/products`);

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
