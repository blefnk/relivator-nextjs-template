"use server";

import type { CartItem, CartLineItem } from "~/types";
import { eq, inArray } from "drizzle-orm";

import { db } from "~/data/db";
import { carts, products, stores, users } from "~/data/db/schema";
import { getServerAuthSession } from "~/utils/auth/users";

export async function getUserCartItems() {
  const session = await getServerAuthSession();
  if (!session) return [];

  const user = await db.query.users.findFirst({
    columns: { cartId: true },
    where: eq(users.id, session.id),
  });
  if (!user?.cartId) return [];

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, user.cartId),
  });
  return cart?.items;
}

export async function getCartId(): Promise<number | undefined> {
  const session = await getServerAuthSession();
  const user = session?.id;
  if (!user) return undefined;

  try {
    const result = await db
      .select({ id: carts.id })
      .from(carts)
      .where(eq(carts.userId, user));

    if (result.length === 0) {
      return undefined;
    }

    const [{ id }] = result;
    return id;
  } catch (error) {
    console.error("❌ Error in getUserCart:", error);
    return undefined;
  }
}

export async function getCart(cartId: number) {
  const dbCartItemsObj =
    Number.isNaN(Number(cartId)) ?
      []
    : await db
        .select({
          id: carts.id,
          items: carts.items,
        })
        .from(carts)
        .where(eq(carts.id, Number(cartId)));

  const cartItems =
    dbCartItemsObj.length ?
      (JSON.parse(dbCartItemsObj[0].items as string) as CartItem[])
    : [];

  const cartItemDetails =
    cartItems ?
      await getCartItemDetails(cartId ? Number(cartId) : null, cartItems)
    : [];

  const uniqueStoreIds = [
    ...new Set(cartItemDetails?.map((item) => item.storeId)),
  ] as number[];

  return {
    cartItems,
    uniqueStoreIds,
    cartItemDetails,
  };
}

export async function getCartItemDetails(
  cartId: number | null,
  cartItems: CartItem[],
) {
  if (!cartId) return [];

  const productIds = cartItems.map((item) => Number(item.productId));
  if (!productIds.length) return [];

  const vals = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      inventory: products.inventory,
      storeId: products.storeId,
      images: products.images,
      storeName: stores.name,
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(inArray(products.id, productIds));

  return vals as CartLineItem[];
}
