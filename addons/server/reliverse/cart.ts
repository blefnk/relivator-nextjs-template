import type { CartItem, CartLineItem } from "@/types/reliverse/store";

import destr from "destr";
import { eq, inArray } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";
import { carts, products, stores } from "~/db/schema/provider";

export async function getCartId(): Promise<number | undefined> {
  const session = await authjs();

  // const { userId } = authClerk();
  // const user = authProvider === "clerk" ? id : session.id;

  const user = session?.id;

  if (!user) {
    return undefined;
  }

  try {
    const res = await db
      .select({
        id: carts.id,
      })
      .from(carts)
      .where(eq(carts.userId, user));

    if (res.length === 0) {
      return undefined;
    }

    const [resItem] = res;

    if (!resItem) {
      return undefined;
    }

    const { id } = resItem;

    // @ts-expect-error TODO: fix id type
    return id;
  } catch {
    return undefined;
  }
}

export async function getCartItems(cartId: number) {
  const databaseCartItemsObject = Number.isNaN(Number(cartId))
    ? []
    : await db
        .select({
          id: carts.id,
          items: carts.items,
        })
        .from(carts) // @ts-expect-error TODO: fix id type
        .where(eq(carts.id, Number(cartId)));

  const cartItems =
    databaseCartItemsObject.length > 0
      ? (destr(String(databaseCartItemsObject[0]?.items)) as CartItem[])
      : [];

  const cartItemDetails = cartItems
    ? await getCartItemDetails(cartId ? Number(cartId) : null, cartItems)
    : [];

  const uniqueStoreIds = [
    ...new Set(cartItemDetails && cartItemDetails.map((item) => item.storeId)),
  ] as number[];

  return {
    cartItemDetails,
    cartItems,
    uniqueStoreIds,
  };
}

export async function getCartItemDetails(
  cartId: null | number,
  cartItems: CartItem[],
) {
  if (!cartId) {
    return [];
  }

  const productIds = cartItems.map((item) => Number(item.productId));

  if (productIds.length === 0) {
    return [];
  }

  const vals = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      inventory: products.inventory,
      price: products.price,
      storeId: products.storeId,
      storeName: stores.name,
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id)) // @ts-expect-error TODO: Fix id type
    .where(inArray(products.id, productIds));

  // @ts-expect-error TODO: fix
  return vals as CartLineItem[];
}
