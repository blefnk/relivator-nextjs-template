import { revalidatePath } from "next/cache";

import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm";
import { z } from "zod";

import type { Product } from "~/db/schema/provider";

import { db } from "~/db";
import { products } from "~/db/schema/provider";

import {
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "./validations/product-old";

export async function filterProductsAction(query: string) {
  if (query.length === 0) {
    return null;
  }

  const filteredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      category: products.category,
    })
    .from(products)
    .where(like(products.name, `%${query}%`))
    .orderBy(desc(products.createdAt))
    .limit(10);

  return Object.values(products.category.enumValues).map((category) => ({
    category,
    products: filteredProducts.filter(
      (product) => product.category === category,
    ),
  }));
}

export async function getProductsAction(
  rawInput: z.infer<typeof getProductsSchema>,
) {
  try {
    const input = getProductsSchema.parse(rawInput);

    const [column, order] = (input.sort &&
      (input.sort.split(".") as [
        keyof Product | undefined,
        "asc" | "desc" | undefined,
      ])) || ["createdAt", "desc"];

    const [minPrice, maxPrice] = input.price_range?.split("-") || [];

    const categories =
      (input.categories &&
        (input.categories.split(".") as Product["category"][])) ||
      [];

    const subcategories = input.subcategories?.split(".") || [];

    const storeIds = input.store_ids?.split(".").map(Number) || [];

    const { count, items } = await db.transaction(async (tx) => {
      const items = await tx
        .select()
        .from(products)
        .limit(input.limit)
        .offset(input.offset)
        .where(
          and(
            categories.length > 0 // @ts-expect-error TODO: Fix ts
              ? inArray(products.category, categories)
              : undefined,
            subcategories.length > 0
              ? inArray(products.subcategory, subcategories)
              : undefined, // @ts-expect-error TODO: Fix ts
            minPrice ? gte(products.price, minPrice) : undefined, // @ts-expect-error TODO: Fix ts
            maxPrice ? lte(products.price, maxPrice) : undefined,
            storeIds.length > 0
              ? inArray(products.storeId, storeIds)
              : undefined,
          ),
        )
        .groupBy(products.id)
        .orderBy(
          column && column in products
            ? order === "asc"
              ? asc(products[column])
              : desc(products[column])
            : desc(products.createdAt),
        );

      const count = await tx
        .select({
          count: sql`count(*)`,
        })
        .from(products)
        .where(
          and(
            categories.length > 0 // @ts-expect-error TODO: Fix ts
              ? inArray(products.category, categories)
              : undefined,
            subcategories.length > 0
              ? inArray(products.subcategory, subcategories)
              : undefined, // @ts-expect-error TODO: Fix ts
            minPrice ? gte(products.price, minPrice) : undefined, // @ts-expect-error TODO: Fix ts
            maxPrice ? lte(products.price, maxPrice) : undefined,
            storeIds.length > 0
              ? inArray(products.storeId, storeIds)
              : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count || 0);

      return {
        count,
        items,
      };
    });

    return {
      count,
      items,
    };
  } catch (error) {
    if (error instanceof Error) {
      // Throw an Error object with the original error message
      throw new TypeError(error.message);
    } else if (error instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(
        error.issues.map((issue) => issue.message).join("\n"),
      );
    }

    // Throw a generic Error for unknown cases
    else {
      throw new TypeError("Unknown error.");
    }
  }
}

export async function checkProductAction(input: {
  id?: number;
  name: string;
}) {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id // @ts-expect-error TODO: fix id type
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  });

  if (productWithSameName) {
    return {
      message: "Product name already taken.",
      status: "error",
    };
  }
}

const extendedProductSchema = productSchema.extend({
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .nullable(),
  storeId: z.number(),
});

export async function addProductAction(
  rawInput: z.infer<typeof extendedProductSchema>,
) {
  const input = extendedProductSchema.parse(rawInput);

  const productWithSameName = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: eq(products.name, input.name),
  });

  if (productWithSameName) {
    return {
      message: "Product name already taken.",
      status: "error",
    };
  }

  // @ts-expect-error TODO: Fix ts
  await db.insert(products).values({
    ...input,
    images: input.images,
    storeId: input.storeId,
  });

  revalidatePath(`/dashboard/stores/${input.storeId}/products.`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const extendedProductSchemaWithId = extendedProductSchema.extend({
  id: z.number(),
});

export async function updateProductAction(
  input: z.infer<typeof extendedProductSchemaWithId>,
) {
  const product = await db.query.products.findFirst({
    where: and(
      // @ts-expect-error TODO: fix id type
      eq(products.id, input.id),
      eq(products.storeId, input.storeId),
    ),
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  // @ts-expect-error TODO: fix id type
  await db.update(products).set(input).where(eq(products.id, input.id));

  revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`);
}

export async function deleteProductAction(
  rawInput: z.infer<typeof getProductSchema>,
) {
  const input = getProductSchema.parse(rawInput);

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(
      // @ts-expect-error TODO: fix id type
      eq(products.id, input.id),
      eq(products.storeId, input.storeId),
    ),
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  // @ts-expect-error TODO: fix id type
  await db.delete(products).where(eq(products.id, input.id));

  revalidatePath(`/dashboard/stores/${input.storeId}/products`);
}

export async function getNextProductIdAction(
  rawInput: z.infer<typeof getProductSchema>,
) {
  try {
    const input = getProductSchema.parse(rawInput);

    const product = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      orderBy: asc(products.id),
      where: and(
        eq(products.storeId, input.storeId), // @ts-expect-error TODO: Fix ts
        gt(products.id, input.id),
      ),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product.id;
  } catch (error) {
    if (error instanceof Error) {
      // Throw an Error object with the original error message
      throw new TypeError(error.message);
    } else if (error instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(
        error.issues.map((issue) => issue.message).join("\n"),
      );
    }

    // Throw a generic Error for unknown cases
    else {
      throw new TypeError("Unknown error.");
    }
  }
}

export async function getPreviousProductIdAction(
  rawInput: z.infer<typeof getProductSchema>,
) {
  try {
    const input = getProductSchema.parse(rawInput);

    const product = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      orderBy: desc(products.id),
      where: and(
        eq(products.storeId, input.storeId), // @ts-expect-error TODO: Fix ts
        lt(products.id, input.id),
      ),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product.id;
  } catch (error) {
    if (error instanceof Error) {
      // Throw an Error object with the original error message
      throw new TypeError(error.message);
    } else if (error instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(
        error.issues.map((issue) => issue.message).join("\n"),
      );
    }

    // Throw a generic Error for unknown cases
    else {
      throw new TypeError("Unknown error.");
    }
  }
}
