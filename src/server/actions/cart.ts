"use server";

import { log } from "console";

import { revalidatePath } from "next/cache";
import type { CartItem, CartLineItem } from "~/types";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import type { z } from "zod";

import { db } from "~/data/db";
import type { User } from "~/data/db/schema";
import { carts, products, stores, users, type Cart } from "~/data/db/schema";
import {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
} from "~/data/validations/cart";
import { env } from "~/env.mjs";
import { StoreSwitcher } from "~/islands/navigation/pagination/store-switcher";
import { getCartId } from "~/server/cart";
import { getServerAuthSession } from "~/utils/auth/users";

export async function getCartAction(storeId?: number): Promise<CartLineItem[]> {
  // console.log("⏳ awaiting getCartId for getCartAction...");
  const cartId = await getCartId();

  if (!cartId || Number.isNaN(Number(cartId))) return [];
  // console.log("get `cartId` (1):", cartId);

  const cart = await db.query.carts.findFirst({
    columns: { items: true },
    where: eq(carts.id, Number(cartId)),
  });

  const productIds = cart?.items?.map((item) => item.productId) ?? [];

  if (productIds.length === 0) return [];

  const uniqueProductIds: number[] = [...new Set(productIds)].map(Number);

  const cartLineItems = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: products.category,
      subcategory: products.subcategory,
      price: products.price,
      inventory: products.inventory,
      storeId: products.storeId,
      storeName: stores.name,
      storeStripeAccountId: stores.stripeAccountId,
    })
    .from(products)
    .leftJoin(stores, eq(stores.id, products.storeId))
    .where(
      and(
        inArray(products.id, uniqueProductIds),
        storeId ? eq(products.storeId, storeId) : sql`TRUE`,
      ),
    )
    .groupBy(products.id, stores.stripeAccountId, stores.name)
    .orderBy(desc(stores.stripeAccountId), asc(products.createdAt))
    .execute()
    .then((items) => {
      return items.map((item) => {
        const quantity = cart?.items?.find(
          (cartItem) => cartItem.productId === item.id,
        )?.quantity;

        return {
          ...item,
          quantity: quantity ?? 0,
        };
      });
    });

  return cartLineItems;
}

export async function getUniqueStoreIds(): Promise<number[]> {
  const storeIds: number[] = [];
  const carts = await db.query.carts.findMany();

  for (const cart of carts) {
    for (const item of cart.items) {
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
    console.error("cartId is invalid or missed");
    return [];
  }

  try {
    // console.log("Querying for cartId:", cartId, typeof cartId);

    /* const cart = await db
      .selectDistinct({ storeId: products.storeId })
      .from(carts)
      .leftJoin(
        products,
        // sql`JSON_CONTAINS(carts.items, JSON_OBJECT('productId', products.id))`,
      )
      .groupBy(products.storeId)
      .where(eq(carts.id, Number(cartId))); */

    const cart = await db
      .select({ storeId: products.storeId })
      .from(carts)
      .leftJoin(
        products,
        env.DATABASE_URL.startsWith("mysql://") ?
          sql`JSON_CONTAINS(${carts}.items, JSON_OBJECT('productId', ${products}.id))`
        : sql`${carts}.items::jsonb @> jsonb_build_array(jsonb_build_object('productId', ${products}.id))`,
      )
      .groupBy(products.storeId)
      .where(eq(carts.id, cartId));

    // console.log("Queried cart:", cart);

    const storeIds = cart
      .map((item) => Number(item.storeId))
      .filter((id) => id);

    // console.log("Queried storeIds:", storeIds);

    const uniqueStoreIds = [...new Set(storeIds)] as number[];

    if (!uniqueStoreIds.length) {
      console.error("uniqueStoreIds are empty.");
      return [];
    }

    // console.log("Queried uniqueStoreIds:", uniqueStoreIds);

    return uniqueStoreIds;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "❌ Error fetching or processing cart data:",
        error.message,
      );
    } else {
      console.error("❌ An unexpected error occurred:", error);
    }
    return [];
  }
}

export async function getCartItemsAction(input: { cartId?: number }) {
  if (!input.cartId || Number.isNaN(input.cartId)) return [];

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, input.cartId),
  });

  return cart?.items;
}

export async function addToCartAction(
  rawInput: z.infer<typeof cartItemSchema>,
) {
  // console.log("rawInput:", rawInput);
  const input = cartItemSchema.parse(rawInput);

  // console.log("input:", input);

  const session = await getServerAuthSession();
  if (!session) throw new Error("No session found.");

  const user: User = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id))
    .then((res: User[]) => res[0] ?? null);

  if (user.email == null && user.emailClerk == null)
    throw new Error("User email is null or undefined");

  // Checking if product is in stock
  const product = await db.query.products.findFirst({
    columns: { inventory: true },
    where: eq(products.id, input.productId),
  });

  if (!product) throw new Error("Product not found, please try again later.");

  // TODO: FIX MYSQL !! TEMP COMMENTED OUT
  // if (product.inventory < input.quantity)
  // throw new Error("❌ Product is out of stock, please try again later.");

  const cartId = await getCartId(); // find user's cartId in users table

  if (!cartId) {
    const email =
      env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" ? user.emailClerk : user.email;

    await db
      .insert(carts)
      // create a new row in the carts table and sets relations with user
      .values({ userId: session.id, email: email, items: [input] });

    return revalidatePath("/");
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) {
    await db.delete(carts).where(eq(carts.id, Number(cartId)));

    throw new Error(
      "cartId can't be found, because row with requested id is not found in the `carts` database table",
    );
  }

  // If cart is closed, delete it and create a new one
  if (cart.closed) {
    await db.delete(carts).where(eq(carts.id, Number(cartId)));

    /* const cartDb = await db.query.carts.findFirst({
      where: eq(carts.email, user.email),
    });

    // console.log("cartDb:", cartDb);

    if (!cartDb) {
      const newCart = await db.insert(carts).values({
        userId: session.id,
        email: user.email,
        items: [input],
      });
      // if (newCart) console.log("newCart:", newCart);
    } */
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId,
  );

  if (cartItem) {
    // console.log("cartItem:", cartItem);
    cartItem.quantity += input.quantity;
  } else {
    // console.log("cartItem:", cartItem);
    cart.items?.push(input);
  }

  await db
    .update(carts)
    .set({ items: cart.items })
    .where(eq(carts.id, Number(cartId)));

  // console.log("...cartId:", cartId);

  return revalidatePath("/");
}

export async function updateCartItemAction(
  rawInput: z.infer<typeof cartItemSchema>,
) {
  const input = cartItemSchema.parse(rawInput);

  // console.log("⏳ awaiting getCartId for updateCartItemAction...");
  const cartId = await getCartId();

  // console.log("get `cartId` (4):", cartId);

  if (!cartId) throw new Error("(1) cartId is not found");

  if (Number.isNaN(Number(cartId))) {
    throw new TypeError(
      "❌ cartId is found, but is invalid, possibly value is NaN (not a number) type",
    );
  }

  const cart = await db.query.carts.findFirst({
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

  if (input.quantity === 0) {
    cart.items =
      cart.items?.filter((item) => item.productId !== input.productId) ?? [];
  } else {
    cartItem.quantity = input.quantity;
  }

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function deleteCartAction() {
  // console.log("⏳ awaiting getCartId for deleteCartAction...");
  const cartId = await getCartId();
  // console.log("get `cartId` (5):", cartId);

  if (cartId === undefined) throw new Error("(2) cartId is not found");
  if (typeof cartId !== "number" || Number.isNaN(cartId))
    throw new Error("cartId is found, but it's invalid");

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId)),
  });

  await db.delete(carts).where(eq(carts.id, Number(cartId)));
}

export async function deleteCartItemAction(
  rawInput: z.infer<typeof deleteCartItemSchema>,
) {
  const input = deleteCartItemSchema.parse(rawInput);

  // console.log("⏳ awaiting getCartId for deleteCartItemAction...");
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
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) return;

  cart.items =
    cart.items?.filter((item) => item.productId !== input.productId) ?? [];

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function deleteCartItemsAction(
  rawInput: z.infer<typeof deleteCartItemsSchema>,
) {
  const input = deleteCartItemsSchema.parse(rawInput);

  // console.log("⏳ awaiting getCartId for deleteCartItemsAction...");
  const cartId = await getCartId();
  // console.log("get `cartId` (7):", cartId);

  if (!cartId) {
    throw new Error("(4) cartId is not found");
  }

  if (Number.isNaN(Number(cartId))) {
    throw new TypeError(
      "❌ cartId is found, but is invalid, possibly value is NaN (not a number) type",
    );
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId)),
  });

  if (!cart) return;

  cart.items =
    cart.items?.filter((item) => !input.productIds.includes(item.productId)) ??
    [];

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}
