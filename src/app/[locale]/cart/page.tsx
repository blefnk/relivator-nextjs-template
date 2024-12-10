import type { Metadata } from "next";

import { env } from "~/env.js";
import { getUniqueStoreIds } from "~/server/actions/cart";

import { CartSheet } from "./client";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Cart",
  description: "Checkout with your cart items",
};

export default async function CartPage() {
  const uniqueStoreIds = await getUniqueStoreIds();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CartSheet
        uniqueStoreIds={uniqueStoreIds.filter(
          (id): id is string => id !== null,
        )}
      />
    </div>
  );
}
