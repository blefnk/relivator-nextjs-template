import { revalidatePath } from "next/cache";

import type { getStoreSchema } from "@/actions/reliverse/validations/store";

import {
  getStoresSchema,
  storeSchema,
} from "@/actions/reliverse/validations/store";
import { slugify } from "@/utils/reliverse/string";
import { and, asc, desc, eq, gt, isNull, lt, not, sql } from "drizzle-orm";
import { z } from "zod";

import type { Store } from "~/db/schema/provider";

import { db } from "~/db";
import { products, stores } from "~/db/schema/provider";

const isString = (a: unknown): a is string => typeof a === "string";
const isNumber = (a: unknown): a is number => typeof a === "number";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getStoresAction(rawInput: z.infer<typeof getStoresSchema>) {
  try {
    const input = getStoresSchema.parse(rawInput);

    const limit = input.limit || 10;
    const offset = input.offset || 0;

    const [column, order] =
      (input.sort &&
        (input.sort.split(".") as [
          keyof Store | undefined,
          "asc" | "desc" | undefined,
        ])) ||
      [];

    const statuses = input.statuses?.split(".") || [];

    const { count, items } = await db.transaction(async (tx) => {
      const items = await tx
        .select({
          id: stores.id,
          name: stores.name,
          description: stores.description,
          productCount: sql`count(*)`,
          stripeAccountId: stores.stripeAccountId,
        })
        .from(stores)
        .limit(limit)
        .offset(offset)
        .leftJoin(products, eq(stores.id, products.storeId))
        .where(
          and(
            input.userId ? eq(stores.userId, input.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive")
              ? not(isNull(stores.stripeAccountId))
              : undefined,
            statuses.includes("inactive") && !statuses.includes("active")
              ? isNull(stores.stripeAccountId)
              : undefined,
          ),
        )
        .groupBy(stores.id)
        .orderBy(
          input.sort === "stripeAccountId.asc"
            ? asc(stores.stripeAccountId)
            : input.sort === "stripeAccountId.desc"
              ? desc(stores.stripeAccountId)
              : input.sort === "productCount.asc"
                ? asc(sql`count(*)`)
                : input.sort === "productCount.desc"
                  ? desc(sql`count(*)`)
                  : column && column in stores
                    ? order === "asc"
                      ? asc(stores[column])
                      : desc(stores[column])
                    : desc(stores.createdAt),
        );

      const count = await tx
        .select({
          count: sql`count(*)`,
        })
        .from(stores)
        .where(
          and(
            input.userId ? eq(stores.userId, input.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive")
              ? not(isNull(stores.stripeAccountId))
              : undefined,
            statuses.includes("inactive") && !statuses.includes("active")
              ? isNull(stores.stripeAccountId)
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

const extendedStoreSchema = storeSchema.extend({
  userId: z.string(),
});

export async function addStoreAction(
  rawInput: z.infer<typeof extendedStoreSchema>,
) {
  const input = extendedStoreSchema.parse(rawInput);

  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, input.name),
  });

  if (storeWithSameName) {
    return {
      message: "Store name already taken.",
      status: "error",
    };
  }

  await db.insert(stores).values({
    name: input.name,
    description: input.description,
    slug: slugify(input.name),
    userId: input.userId,
  });

  revalidatePath("/dashboard/stores");
}

export async function getNextStoreIdAction(
  input: z.infer<typeof getStoreSchema>,
) {
  if (!isNumber(input.id) || !isString(input.userId)) {
    throw new TypeError("Invalid input.");
  }

  const nextStore = await db.query.stores.findFirst({
    columns: {
      id: true,
    },
    orderBy: asc(stores.id),
    // @ts-expect-error TODO: fix id type
    where: and(eq(stores.userId, input.userId), gt(stores.id, input.id)),
  });

  if (!nextStore) {
    const firstStore = await db.query.stores.findFirst({
      columns: {
        id: true,
      },
      orderBy: asc(stores.id),
      where: eq(stores.userId, input.userId),
    });

    if (!firstStore) {
      throw new Error("Store not found.");
    }

    return firstStore.id;
  }

  return nextStore.id;
}

export async function getPreviousStoreIdAction(
  input: z.infer<typeof getStoreSchema>,
) {
  if (!isNumber(input.id) || !isString(input.userId)) {
    throw new TypeError("Invalid input.");
  }

  const previousStore = await db.query.stores.findFirst({
    columns: {
      id: true,
    },
    orderBy: desc(stores.id),
    // @ts-expect-error TODO: Fix id type
    where: and(eq(stores.userId, input.userId), lt(stores.id, input.id)),
  });

  if (!previousStore) {
    const lastStore = await db.query.stores.findFirst({
      columns: {
        id: true,
      },
      orderBy: desc(stores.id),
      where: eq(stores.userId, input.userId),
    });

    if (!lastStore) {
      throw new Error("Store not found.");
    }

    return lastStore.id;
  }

  return previousStore.id;
}
