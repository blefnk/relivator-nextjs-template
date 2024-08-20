import { revalidatePath } from "next/cache";

import type { CartLineItem } from "@/types/reliverse/store";
import type { z } from "zod";

import { getCartId } from "@/server/reliverse/cart";
import { databaseDialect } from "~/../reliverse.config";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";
import { carts, products, stores, users } from "~/db/schema/provider";

import {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
} from "./validations/cart";

const isNumber = (a: unknown): a is number => typeof a === "number";

export async function getCartAction(storeId?: number): Promise<CartLineItem[]> {
  const cartId = await getCartId();

  if (!cartId || Number.isNaN(Number(cartId))) {
    return [];
  }

  const cart = await db.query.carts.findFirst({
    columns: {
      items: true,
    },
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, Number(cartId)),
  });

  const productIds = cart?.items?.map((item) => item.productId) || [];

  if (productIds.length === 0) {
    return [];
  }

  const uniqueProductIds: number[] = [...new Set(productIds)].map(Number);

  // @ts-expect-error TODO: fix id type
  return await db
    .select({
      id: products.id,
      name: products.name,
      category: products.category,
      images: products.images,
      inventory: products.inventory,
      price: products.price,
      storeId: products.storeId,
      storeName: stores.name,
      storeStripeAccountId: stores.stripeAccountId,
      subcategory: products.subcategory,
    })
    .from(products)
    .leftJoin(stores, eq(stores.id, products.storeId))
    .where(
      and(
        // @ts-expect-error TODO: fix id type
        inArray(products.id, uniqueProductIds),
        storeId ? eq(products.storeId, storeId) : sql`TRUE`,
      ),
    )
    .groupBy(products.id, stores.stripeAccountId, stores.name)
    .orderBy(desc(stores.stripeAccountId), asc(products.createdAt))
    .execute()
    .then((items) => {
      return items.map((item) => {
        const quantity =
          // @ts-expect-error TODO: fix id type
          cart?.items?.find((cartItem) => cartItem.productId === item.id) &&
          // @ts-expect-error TODO: fix id type
          cart.items.find((cartItem) => cartItem.productId === item.id)
            .quantity;

        return {
          ...item,
          quantity: quantity || 0,
        };
      });
    });
}

export async function getUniqueStoreIds(): Promise<number[]> {
  const storeIds: number[] = [];
  const carts = await db.query.carts.findMany();

  for (const cart of carts) {
    for (const item of (cart && cart.items) || []) {
      if (!storeIds.includes(item.storeId)) {
        storeIds.push(item.storeId);
      }
    }
  }

  return storeIds;
}

export async function getUniqueStoreIdsDeprecated() {
  const cartId = await getCartId();

  if (!cartId || Number.isNaN(Number(cartId))) {
    return [];
  }

  try {
    const cart = await db
      .select({
        storeId: products.storeId,
      })
      .from(carts)
      .leftJoin(
        products, // @ts-expect-error TODO: fix
        databaseDialect === "mysql"
          ? sql`JSON_CONTAINS(${carts}.items, JSON_OBJECT('productId', ${products}.id))`
          : sql`${carts}.items::jsonb @> jsonb_build_array(jsonb_build_object('productId', ${products}.id))`,
      )
      .groupBy(products.storeId) // @ts-expect-error TODO: fix ts
      .where(eq(carts.id, cartId));

    const storeIds = cart.map((item) => Number(item.storeId)).filter(Boolean);

    const uniqueStoreIds = [...new Set(storeIds)] as number[];

    if (uniqueStoreIds.length === 0) {
      return [];
    }

    return uniqueStoreIds;
  } catch {
    return [];
  }
}

export async function getCartItemsAction(input: {
  cartId?: number;
}) {
  if (!input.cartId || Number.isNaN(input.cartId)) {
    return [];
  }

  const cart = await db.query.carts.findFirst({
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, input.cartId),
  });

  return cart?.items;
}

export async function addToCartAction(
  rawInput: z.infer<typeof cartItemSchema>,
) {
  const input = cartItemSchema.parse(rawInput);

  const session = await authjs();

  if (!session) {
    throw new Error("No session found.");
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id))
    .then((res) => res[0] || null);

  if (user && user.email == null) {
    throw new Error("User email is null or undefined");
  }

  // Checking if product is in stock
  const product = await db.query.products.findFirst({
    columns: {
      inventory: true,
    },
    // @ts-expect-error TODO: fix id type
    where: eq(products.id, input.productId),
  });

  if (!product) {
    throw new Error("Product not found, please try again later.");
  }

  // TODO: FIX MYSQL !! TEMP COMMENTED OUT
  // if (product.inventory < input.quantity)
  // throw new Error("❌ Product is out of stock, please try again later.");
  const cartId = await getCartId();

  // find user's cartId in users table
  if (!cartId) {
    await db
      .insert(carts) // create a new row in the carts table and sets relations with user
      .values({
        // @ts-expect-error TODO: fix
        email: user.email,
        items: [input],
        userId: session.id,
      });

    revalidatePath("/");

    return;
  }

  const cart = await db.query.carts.findFirst({
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) {
    // @ts-expect-error TODO: fix ts
    await db.delete(carts).where(eq(carts.id, Number(cartId)));

    throw new Error(
      "cartId can't be found, because row with requested id is not found in the `carts` database table",
    );
  }

  if (cart.closed) {
    // If cart is closed, delete it and create a new one
    // @ts-expect-error TODO: fix ts
    await db.delete(carts).where(eq(carts.id, Number(cartId)));
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId,
  );

  if (cartItem) {
    cartItem.quantity += input.quantity;
  } else {
    cart.items && cart.items.push(input);
  }

  await db
    .update(carts)
    .set({
      items: cart.items,
    }) // @ts-expect-error TODO: fix ts
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function updateCartItemAction(
  rawInput: z.infer<typeof cartItemSchema>,
) {
  const input = cartItemSchema.parse(rawInput);

  const cartId = await getCartId();

  if (!cartId) {
    throw new Error("(1) cartId is not found");
  }

  if (Number.isNaN(Number(cartId))) {
    throw new TypeError(
      "❌ cartId is found, but is invalid, possibly value is NaN (not a number) type",
    );
  }

  const cart = await db.query.carts.findFirst({
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) {
    throw new Error(
      "cartId can't be found, because row with requested id is not found in the `carts` database table",
    );
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId,
  );

  if (!cartItem) {
    throw new Error("CartItem not found, please try again.");
  }

  if (!input.quantity) {
    cart.items =
      (cart.items &&
        cart.items.filter((item) => item.productId !== input.productId)) ||
      [];
  } else {
    cartItem.quantity = input.quantity;
  }

  await db
    .update(carts)
    .set({
      items: cart.items,
    }) // @ts-expect-error TODO: fix ts
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function deleteCartAction() {
  const cartId = await getCartId();

  if (cartId === undefined) {
    throw new Error("(2) cartId is not found");
  }

  if (!isNumber(cartId) || Number.isNaN(cartId)) {
    throw new TypeError("cartId is found, but it's invalid");
  }

  // const cart = await db.query.carts.findFirst({
  //   where: eq(carts.id, Number(cartId)),
  // });
  // @ts-expect-error TODO: fix ts
  await db.delete(carts).where(eq(carts.id, Number(cartId)));
}

export async function deleteCartItemAction(
  rawInput: z.infer<typeof deleteCartItemSchema>,
) {
  const input = deleteCartItemSchema.parse(rawInput);

  const cartId = await getCartId();

  if (!cartId) {
    throw new Error("(3) cartId is not found");
  }

  if (Number.isNaN(Number(cartId))) {
    throw new TypeError(
      "❌ cartId is found, but is invalid, possibly value is NaN (not a number) type",
    );
  }

  const cart = await db.query.carts.findFirst({
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) {
    return;
  }

  cart.items =
    (cart.items &&
      cart.items.filter((item) => item.productId !== input.productId)) ||
    [];

  await db
    .update(carts)
    .set({
      items: cart.items,
    }) // @ts-expect-error TODO: fix ts
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function deleteCartItemsAction(
  rawInput: z.infer<typeof deleteCartItemsSchema>,
) {
  const input = deleteCartItemsSchema.parse(rawInput);

  const cartId = await getCartId();

  if (!cartId) {
    throw new Error("(4) cartId is not found");
  }

  if (Number.isNaN(Number(cartId))) {
    throw new TypeError(
      "❌ cartId is found, but is invalid, possibly value is NaN (not a number) type",
    );
  }

  const cart = await db.query.carts.findFirst({
    // @ts-expect-error TODO: fix id type
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) {
    return;
  }

  cart.items =
    (cart.items &&
      cart.items.filter(
        (item) => !input.productIds.includes(item.productId),
      )) ||
    [];

  await db
    .update(carts)
    .set({
      items: cart.items,
    }) // @ts-expect-error TODO: fix ts
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}
