"use server";

import type { Order } from "~/db/schema";
import type {
  CartLineItemSchema,
  CheckoutItemSchema,
} from "~/server/validations/cart";
import type { getOrderLineItemsSchema } from "~/server/validations/order";
import type { SearchParams } from "~/types/meta";
import type Stripe from "stripe";

import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

import destr from "destr";
import {
  and,
  asc,
  countDistinct,
  desc,
  eq,
  gte,
  inArray,
  like,
  lte,
  sql,
} from "drizzle-orm";
import { z } from "zod";

import { db } from "~/db";
import {
  addresses,
  carts,
  categories,
  orders,
  payments,
  products,
  subcategories,
} from "~/db/schema";
import { checkoutItemSchema } from "~/server/validations/cart";
import { ordersSearchParamsSchema } from "~/server/validations/params";

export async function getOrderLineItems(
  input: {
    paymentIntent?: null | Stripe.Response<Stripe.PaymentIntent>;
  } & z.infer<typeof getOrderLineItemsSchema>,
): Promise<CartLineItemSchema[]> {
  try {
    const safeParsedItems = z
      .array(checkoutItemSchema)
      .safeParse(destr(input.items ?? "[]"));

    if (!safeParsedItems.success) {
      throw new Error("Could not parse items.");
    }

    const lineItems = await db
      .select({
        id: products.id,
        name: products.name,
        categoryId: products.categoryId,
        images: products.images,
        inventory: products.inventory,
        price: products.price,
        storeId: products.storeId,
        subcategoryId: products.subcategoryId,
      })
      .from(products)
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(
        inArray(
          products.id,
          safeParsedItems.data.map((item) => item.productId),
        ),
      )
      .groupBy(products.id)
      .orderBy(desc(products.createdAt))
      .execute()
      .then((items) => {
        return items.map((item) => {
          const quantity = safeParsedItems.data.find(
            (checkoutItem) => checkoutItem.productId === item.id,
          )?.quantity;

          return {
            ...item,
            quantity: quantity ?? 0,
          };
        });
      });

    // Temporary workaround for payment_intent.succeeded webhook event not firing in production
    // TODO: Remove this once the webhook is working
    if (input.paymentIntent?.status === "succeeded") {
      const cartId = String(cookies().get("cartId")?.value);

      const cart = await db.query.carts.findFirst({
        columns: {
          clientSecret: true,
          closed: true,
          paymentIntentId: true,
        },
        where: eq(carts.id, cartId),
      });

      if (!cart || cart.closed) {
        return lineItems;
      }

      if (!cart.clientSecret || !cart.paymentIntentId) {
        return lineItems;
      }

      const payment = await db.query.payments.findFirst({
        columns: {
          storeId: true,
          stripeAccountId: true,
        },
        where: eq(payments.storeId, input.storeId),
      });

      if (!payment?.stripeAccountId) {
        return lineItems;
      }

      // Create new address in DB
      const stripeAddress = input.paymentIntent.shipping?.address;

      const newAddress = await db
        .insert(addresses)
        .values({
          city: stripeAddress?.city,
          country: stripeAddress?.country,
          line1: stripeAddress?.line1,
          line2: stripeAddress?.line2,
          postalCode: stripeAddress?.postal_code,
          state: stripeAddress?.state,
        })
        .returning({ insertedId: addresses.id });

      if (!newAddress[0]?.insertedId) throw new Error("No address created.");

      // Create new order in db
      await db.insert(orders).values({
        name: input.paymentIntent.shipping?.name ?? "",
        addressId: newAddress[0].insertedId,
        amount: String(Number(input.paymentIntent.amount) / 100),
        email: input.paymentIntent.receipt_email ?? "",
        items: input.items as unknown as CheckoutItemSchema[],
        quantity: safeParsedItems.data.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0,
        ),
        storeId: payment.storeId,
        stripePaymentIntentId: input.paymentIntent.id,
        stripePaymentIntentStatus: input.paymentIntent.status,
      });

      // Update product inventory in db
      for (const item of safeParsedItems.data) {
        const product = await db.query.products.findFirst({
          columns: {
            id: true,
            inventory: true,
          },
          where: eq(products.id, item.productId),
        });

        if (!product) {
          return lineItems;
        }

        const inventory = product.inventory - item.quantity;

        if (inventory < 0) {
          return lineItems;
        }

        await db
          .update(products)
          .set({
            inventory: product.inventory - item.quantity,
          })
          .where(eq(products.id, item.productId));
      }

      await db
        .update(carts)
        .set({
          closed: true,
          items: [],
        })
        .where(eq(carts.paymentIntentId, cart.paymentIntentId));
    }

    return lineItems;
  } catch (error) {
    return [];
  }
}

export async function getStoreOrders(input: {
  searchParams: SearchParams;
  storeId: string;
}) {
  noStore();
  try {
    const { customer, from, page, per_page, sort, status, to } =
      ordersSearchParamsSchema.parse(input.searchParams);

    // Fallback page for invalid page numbers
    const fallbackPage = Number.isNaN(page) || page < 1 ? 1 : page;

    // Number of items per page
    const limit = Number.isNaN(per_page) ? 10 : per_page;

    // Number of items to skip
    const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

    // Column and order to sort by
    const [column, order] = (sort.split(".") as [
      keyof Order | undefined,
      "asc" | "desc" | undefined,
    ]) ?? ["createdAt", "desc"];

    const statuses = status ? status.split(".") : [];

    const fromDay = from ? new Date(from) : undefined;
    const toDay = to ? new Date(to) : undefined;

    // Transaction is used to ensure both queries are executed in a single transaction
    return await db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: orders.id,
          amount: orders.amount,
          createdAt: orders.createdAt,
          customer: orders.email,
          paymentIntentId: orders.stripePaymentIntentId,
          quantity: orders.quantity,
          status: orders.stripePaymentIntentStatus,
          storeId: orders.storeId,
        })
        .from(orders)
        .limit(limit)
        .offset(offset)
        .where(
          and(
            eq(orders.storeId, input.storeId),

            // Filter by email
            customer ? like(orders.email, `%${customer}%`) : undefined,

            // Filter by status
            statuses.length > 0
              ? inArray(orders.stripePaymentIntentStatus, statuses)
              : undefined,

            // Filter by createdAt
            fromDay && toDay
              ? and(
                  gte(orders.createdAt, fromDay),
                  lte(orders.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .orderBy(
          column && column in orders
            ? order === "asc"
              ? asc(orders[column])
              : desc(orders[column])
            : desc(orders.createdAt),
        );

      const count = await tx
        .select({
          count: sql`count(*)`.mapWith(Number),
        })
        .from(orders)
        .where(
          and(
            eq(orders.storeId, input.storeId),

            // Filter by email
            customer ? like(orders.email, `%${customer}%`) : undefined,

            // Filter by status
            statuses.length > 0
              ? inArray(orders.stripePaymentIntentStatus, statuses)
              : undefined,

            // Filter by createdAt
            fromDay && toDay
              ? and(
                  gte(orders.createdAt, fromDay),
                  lte(orders.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(count / limit);

      return {
        data,
        pageCount,
      };
    });
  } catch (error) {
    console.error(error);

    return {
      data: [],
      pageCount: 0,
    };
  }
}

export async function getOrderCount(input: {
  fromDay?: Date;
  storeId: string;
  toDay?: Date;
}) {
  noStore();
  try {
    const { fromDay, storeId, toDay } = input;

    return await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          fromDay && toDay
            ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
            : undefined,
        ),
      )
      .execute()
      .then((res) => res[0]?.count ?? 0);
  } catch (error) {
    return 0;
  }
}

export async function getSaleCount(input: {
  fromDay?: Date;
  storeId: string;
  toDay?: Date;
}) {
  noStore();
  try {
    const { fromDay, storeId, toDay } = input;

    const storeOrders = await db
      .select({
        amount: orders.amount,
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          fromDay && toDay
            ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
            : undefined,
        ),
      );

    const sales = storeOrders.reduce(
      (accumulator, order) => accumulator + Number(order.amount),
      0,
    );

    return sales;
  } catch (error) {
    return 0;
  }
}

export async function getSales(input: {
  fromDay?: Date;
  storeId: string;
  toDay?: Date;
}) {
  noStore();
  try {
    const { fromDay, storeId, toDay } = input;

    return await db
      .select({
        month: sql`EXTRACT(MONTH FROM ${orders.createdAt})`.mapWith(Number),
        totalSales: sql`SUM(${orders.amount})`.mapWith(Number),
        year: sql`EXTRACT(YEAR FROM ${orders.createdAt})`.mapWith(Number),
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          fromDay && toDay
            ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
            : undefined,
        ),
      )
      .groupBy(
        sql`EXTRACT(YEAR FROM ${orders.createdAt})`,
        sql`EXTRACT(MONTH FROM ${orders.createdAt})`,
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${orders.createdAt})`,
        sql`EXTRACT(MONTH FROM ${orders.createdAt})`,
      )
      .execute();
  } catch (error) {
    return [];
  }
}

export async function getCustomers(input: {
  fromDay?: Date;
  limit: number;
  offset: number;
  storeId: string;
  toDay?: Date;
}) {
  noStore();
  try {
    const transaction = await db.transaction(async (tx) => {
      const { fromDay, limit, offset, storeId, toDay } = input;

      const customers = await tx
        .select({
          name: orders.name,
          email: orders.email,
          totalSpent: sql<number>`sum(${orders.amount})`,
        })
        .from(orders)
        .limit(limit)
        .offset(offset)
        .where(
          and(
            eq(orders.storeId, storeId),
            fromDay && toDay
              ? and(
                  gte(orders.createdAt, fromDay),
                  lte(orders.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .groupBy(orders.email, orders.name, orders.createdAt)
        .orderBy(desc(orders.createdAt));

      const customerCount = await tx
        .select({
          count: countDistinct(orders.email),
        })
        .from(orders)
        .where(
          and(
            eq(orders.storeId, storeId),
            fromDay && toDay
              ? and(
                  gte(orders.createdAt, fromDay),
                  lte(orders.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return {
        customerCount,
        customers,
      };
    });

    return transaction;
  } catch (error) {
    return {
      customerCount: 0,
      customers: [],
    };
  }
}
