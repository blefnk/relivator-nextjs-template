"use server";

import type { CreateStoreSchema } from "~/server/validations/store";

import {
  unstable_noStore as noStore,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, not } from "drizzle-orm";

import { db } from "~/db";
import { stores } from "~/db/schema";
import { getErrorMessage } from "~/server/helpers/handle-error";
import { slugify } from "~/server/helpers/utils";
import { updateStoreSchema } from "~/server/validations/store";

export async function createStore(
  input: { userId: string } & CreateStoreSchema,
) {
  noStore();
  try {
    const newStore = await db
      .insert(stores)
      .values({
        name: input.name,
        description: input.description,
        slug: slugify(input.name),
        userId: input.userId,
      })
      .returning({
        id: stores.id,
        slug: stores.slug,
      })
      .then((res) => res[0]);

    revalidateTag(`stores-${input.userId}`);

    return {
      data: newStore,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function updateStore(storeId: string, fd: FormData) {
  noStore();
  try {
    const input = updateStoreSchema.parse({
      name: fd.get("name"),
      description: fd.get("description"),
    });

    const storeWithSameName = await db.query.stores.findFirst({
      columns: {
        id: true,
      },
      where: and(eq(stores.name, input.name), not(eq(stores.id, storeId))),
    });

    if (storeWithSameName) {
      throw new Error("Store name already taken");
    }

    await db
      .update(stores)
      .set({
        name: input.name,
        description: input.description,
      })
      .where(eq(stores.id, storeId));

    revalidatePath(`/store/${storeId}`);

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

export async function deleteStore(storeId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const allStores = await db
    .select({
      id: stores.id,
      userId: stores.userId,
    })
    .from(stores)
    .where(and(eq(stores.id, storeId), eq(stores.userId, userId)))
    .orderBy(desc(stores.createdAt));

  // if (allStores.length < 2) {
  //   throw new Error("Can't delete the only store")
  // }

  await db.delete(stores).where(eq(stores.id, storeId));

  revalidateTag(`stores-${userId}`);

  redirect(`/store/${allStores[1]?.id}`);
}
