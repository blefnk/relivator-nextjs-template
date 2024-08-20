/* eslint-disable complexity */
// Stripe Webhooks API Handler
// ===========================
// This file contains the API logic for handling incoming webhooks from Stripe. Webhooks are
// used by Stripe to send asynchronous notifications about events that happen in a Stripe
// account. This API endpoint is crucial for capturing and processing these events,
// ensuring that our application stays in sync with the state of transactions,
// subscriptions, and other Stripe-related activities.
// You will also find links to inspirations and other additional learning resources there.
import { headers } from "next/headers";

// Please scroll down to the bottom of this file to read a detailed description of this file.
import type { CheckoutItem } from "@/types/reliverse/store";
import type Stripe from "stripe";

import { checkoutItemSchema } from "@/actions/reliverse/validations/cart";
import consola from "consola";
import destr from "destr";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { authjs } from "~/auth/authjs";
import { stripe } from "~/core/stripe/connect";
import { db } from "~/db";
import { carts, orders, payments, products, users } from "~/db/schema/provider";
import { env } from "~/env";

// POST /api/webhooks/stripe
// This endpoint listens to Stripe webhook events and processes them accordingly.
// It's responsible for handling various event types sent by Stripe, such as payment
// success, payment failure, customer creation, etc.
export async function POST(request: Request) {
  //
  // Construct and validate the event sent by Stripe.
  // This process is crucial to ensure the integrity and authenticity of the event.
  // The event is created by parsing the request body, the Stripe signature header,
  // and using the Stripe webhook signing secret from the environment variables.
  //
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") || "";
  const secret = env.STRIPE_WEBHOOK_SIGNING_SECRET || "";

  if (!secret) {
    return new Response("❌ Stripe webhook signing secret not found", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    return new Response(
      `❌ [Stripe Error]: ${error instanceof Error ? error.message : "🔴 Unknown error"}`,
      {
        status: 400,
      },
    );
  }

  // By using consola.info in this place, we ensure to see triggered events only
  // if (debugEnabled) consola.info(` ✓ Received ${event.type}`);
  // Switch case to handle different types of Stripe webhook events
  switch (event.type) {
    //
    // [1] checkout.session.completed
    // ==============================
    // This case is triggered when a customer successfully completes the payment flow,
    // and the funds have been collected. It involves retrieving subscription details
    // from Stripe, updating the user's plan information in the database, and handling
    // any errors that may occur during the process.
    //
    case "checkout.session.completed": {
      const checkoutSessionCompleted = event.data.object;

      // If there is a userId, and no cartId in the metadata, then this is a new subscription
      if (
        checkoutSessionCompleted?.metadata?.userId &&
        !checkoutSessionCompleted && // @ts-expect-error TODO: fix
        checkoutSessionCompleted.metadata?.cartId
      ) {
        // Retrieve the subscription details from Stripe using the session's subscription ID
        const subscription = await stripe.subscriptions.retrieve(
          // @ts-expect-error TODO: fix
          String(checkoutSessionCompleted.subscription),
        );

        // Update the user stripe based on the auth provider
        // Update the user stripe into in our database.
        // Since this is the initial subscription, we need
        // to update the subscription id and customer id.
        const user = await authjs();

        // TODO: fix stripe
        // clerkClient.users.updateUserMetadata(
        //   checkoutSessionCompleted && // @ts-expect-error TODO: fix
        //     checkoutSessionCompleted.metadata && // @ts-expect-error TODO: fix
        //     checkoutSessionCompleted.metadata.userId,
        //   {
        //     privateMetadata: {
        //       stripeCurrentPeriodEnd: String(
        //         subscription.current_period_end * 1000,
        //       ),
        //       stripeCustomerId: subscription.customer,
        //       stripePriceId:
        //         subscription.items.data[0] &&
        //         subscription.items.data[0].price.id,
        //       stripeSubscriptionId: subscription.id,
        //     },
        //   },
        // );
        // Update the user stripe into in our database as well.
        const userIsUpdated = await db
          .update(users)
          .set({
            stripeCurrentPeriodEnd: String(
              subscription.current_period_end * 1000,
            ),
            stripeCustomerId: String(subscription.customer),
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeSubscriptionId: subscription.id,
          })
          .where(eq(users.id, user.id));

        // TODO: fix stripe
        // .where(
        //   eq(
        //     users.id,
        //     (checkoutSessionCompleted && // @ts-expect-error TODO: fix
        //       checkoutSessionCompleted.metadata && // @ts-expect-error TODO: fix
        //       checkoutSessionCompleted.metadata.userId) ||
        //       "",
        //   ),
        // );
        if (!userIsUpdated) {
          consola.warn("❌ User not updated");
        } else {
          consola.success("✅ User updated");
        }
      }

      break;

      // => checkout.session.completed (1)
    }

    //
    // [2] invoice.payment_succeeded
    // =============================
    // This case handles successful payment events for invoices.
    // It retrieves subscription details, updates user information
    // in the database, and logs relevant data.
    //
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object;

      // If there is a userId, and no cartId in the
      // metadata, then this is a new subscription
      if (
        invoicePaymentSucceeded?.metadata?.userId &&
        !invoicePaymentSucceeded && // @ts-expect-error TODO: fix
        invoicePaymentSucceeded.metadata?.cartId
      ) {
        // Retrieve the subscription details from Stripe using the subscription ID
        const subscription = await stripe.subscriptions.retrieve(
          // @ts-expect-error TODO: fix
          invoicePaymentSucceeded.subscription as string,
        );

        // Update the user stripe based on the auth provider
        // Update the price id and set the new period end
        const user = await authjs();

        // TODO: fix stripe
        // clerkClient.users.updateUserMetadata(
        //   invoicePaymentSucceeded && // @ts-expect-error TODO: fix
        //     invoicePaymentSucceeded.metadata && // @ts-expect-error TODO: fix
        //     invoicePaymentSucceeded.metadata.userId,
        //   {
        //     privateMetadata: {
        //       stripeCurrentPeriodEnd: String(
        //         subscription.current_period_end * 1000,
        //       ),
        //       stripePriceId:
        //         subscription.items.data[0] &&
        //         subscription.items.data[0].price.id,
        //     },
        //   },
        // );
        // Update the user stripe into in our database as well.
        const userIsUpdated = await db
          .update(users)
          .set({
            stripeCurrentPeriodEnd: String(
              subscription.current_period_end * 1000,
            ),
            stripePriceId: subscription.items.data[0]?.price.id,
          })
          .where(eq(users.id, user.id));

        // TODO: fix stripe
        // .where(
        //   eq(
        //     users.id,
        //     (invoicePaymentSucceeded && // @ts-expect-error TODO: fix
        //       invoicePaymentSucceeded.metadata && // @ts-expect-error TODO: fix
        //       invoicePaymentSucceeded.metadata.userId) ||
        //       "",
        //   ),
        // );
        if (!userIsUpdated) {
          consola.warn("❌ User not updated");
        } else {
          consola.success("✅ User updated");
        }
      }

      break;

      // => invoice.payment_succeeded (2)
    }

    //
    // [3] payment_intent.payment_failed
    // =================================
    // Triggered when a payment attempt on a PaymentIntent has failed.
    // Useful for logging failed payments, sending notifications to customers,
    // or triggering additional workflows for payment recovery.
    //
    case "payment_intent.payment_failed":
      break;

    // => payment_intent.payment_failed (3)
    //
    // [4] payment_intent.processing
    // =============================
    // Occurs when a PaymentIntent is processing, indicating that payment
    // is underway but not yet completed. Useful for monitoring the state
    // of payment processing especially for asynchronous payment methods.
    //
    case "payment_intent.processing":
      break;

    // => payment_intent.processing (4)
    //
    // [5] payment_intent.succeeded
    // ============================
    // This event is triggered when a payment intent succeeds, indicating a successful
    // payment process. The following actions are performed:
    // - Logging payment intent details.
    // - Validating the presence of an associated Stripe account.
    // - Retrieving store information related to the payment.
    // - Creating a new address and a new order in the database based on the payment intent.
    // - Updating the cart status as closed and clearing its items.
    // The function also handles any exceptions that occur during these processes.
    //
    case "payment_intent.succeeded": {
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;

      const paymentIntentId =
        paymentIntentSucceeded && paymentIntentSucceeded.id;

      const orderAmount =
        paymentIntentSucceeded && paymentIntentSucceeded.amount;

      const checkoutItems =
        paymentIntentSucceeded &&
        paymentIntentSucceeded.metadata &&
        (paymentIntentSucceeded.metadata.items as unknown as CheckoutItem[]);

      // if (debugEnabled) {
      //   consola.info({ paymentIntentId, orderAmount, checkoutItems });
      // }
      // If there are items in metadata, then create order
      if (checkoutItems) {
        try {
          if (!event.account) {
            throw new Error("❌ No account found");
          }

          // Parsing items from metadata
          // Didn't parse before because can pass the unparsed data
          // directly to the order table items json column in the db
          const safeParsedItems = z
            .array(checkoutItemSchema)
            .safeParse(destr(paymentIntentSucceeded?.metadata?.items || "[]"));

          if (!safeParsedItems.success) {
            throw new Error("❌ Could not parse items");
          }

          const payment = await db.query.payments.findFirst({
            columns: {
              storeId: true,
            },
            where: eq(payments.stripeAccountId, event.account),
          });

          // @ts-expect-error TODO: fix
          if (!payment && payment.storeId) {
            return new Response("❌ Store not found", {
              status: 404,
            });
          }

          // Create new address in DB
          // const stripeAddress = paymentIntentSucceeded?.shipping?.address;
          // const newAddress = await db.insert(addresses).values({
          // line1: stripeAddress?.line1,
          // line2: stripeAddress?.line2,
          // city: stripeAddress?.city,
          // state: stripeAddress?.state,
          // country: stripeAddress?.country,
          // postalCode: stripeAddress?.postal_code,
          // });
          // if (!newAddress.insertId) throw new Error("❌ No address created");
          // Create new order in db
          // @ts-expect-error TODO: fix ts
          await db.insert(orders).values({
            name: paymentIntentSucceeded?.shipping?.name,
            amount: String(Number(orderAmount) / 100),
            email:
              paymentIntentSucceeded && paymentIntentSucceeded.receipt_email,
            items: checkoutItems || [],
            quantity: safeParsedItems.data.reduce(
              (accumulator, item) => accumulator + item.quantity,
              0,
            ),
            // @ts-expect-error TODO: fix
            storeId: payment.storeId,
            stripePaymentIntentId: paymentIntentId,
            stripePaymentIntentStatus:
              paymentIntentSucceeded && paymentIntentSucceeded.status, // addressId: Number(newAddress.insertId),
          });

          // Update product inventory in db
          for (const item of safeParsedItems.data) {
            const product = await db.query.products.findFirst({
              columns: {
                id: true,
                inventory: true,
              },
              // @ts-expect-error TODO: fix id type
              where: eq(products.id, item.productId),
            });

            if (!product) {
              throw new Error("❌ Product not found");
            }

            let inventory: number = product.inventory - item.quantity;

            if (inventory < 0) {
              // TODO: FIX MYSQL !! TEMPORARY SOLUTION
              inventory = 1;
            }

            // throw new Error("❌ Product out of stock");
            await db
              .update(products)
              .set({
                inventory: product.inventory - item.quantity,
              }) // @ts-expect-error TODO: fix id type
              .where(eq(products.id, item.productId));
          }

          // Close cart and clear items
          await db
            .update(carts)
            .set({
              closed: true,
              items: [],
            })
            .where(eq(carts.paymentIntentId, paymentIntentId));
        } catch {}
      }

      break;

      // => payment_intent.succeeded (5)
    }

    //
    // [6] application_fee.created
    // ===========================
    //
    case "application_fee.created":
      break;

    // => application_fee.created (6)
    //
    // [7] charge.succeeded
    // ====================
    // Occurs when a charge is successfully created and the payment
    // is confirmed. Useful for confirmation of payment, triggering
    // post-payment processes like order fulfillment or invoice generation.
    //
    case "charge.succeeded":
      // const chargeSucceeded = event.data.object as Stripe.Charge;
      // if (debugEnabled) {
      //   consola.info(` ✓ ChargeId ${chargeSucceeded.id} succeeded!`);
      // }
      break;

    // => charge.succeeded (7)
    //
    // [8] customer.created
    // ====================
    // Triggered when a new customer is successfully created in Stripe.
    // Useful for tracking new customer creation and updating related
    // records in the database.
    //
    case "customer.created":
      // if (debugEnabled) {
      //   consola.info(" ✓ New customer successfully created!");
      // }
      break;

    // => customer.created (8)
    //
    // [9] customer.subscription.updated
    // =================================
    // Triggered when a subscription for a customer is updated This
    // can involve changes in plan, status updates, or billing cycles.
    // Essential for maintaining current subscription states in the system.
    //
    case "customer.subscription.updated":
      // const subscriptionUpdated = event.data.object as Stripe.Subscription;
      break;

    // => customer.subscription.updated (9)
    //
    // [*] Currently not used events
    // =============================
    //
    case "account.application.authorized":
    case "customer.subscription.created":
    case "customer.updated":
    case "invoice.upcoming":
    case "invoice.created":
    case "account.updated":
    case "invoice.paid":
    case "person.created":
    case "invoice.updated":
    case "invoice.finalized":
    case "capability.updated":
    case "payment_intent.created":
    case "payment_method.attached":
    case "account.external_account.deleted":
    case "account.external_account.updated":
    case "account.external_account.created":
      break;

    //
    // [else] Unknown event types
    // ==========================
    // Show console warn when dealing
    // with an unexpected event type.
    //
    default:
      break;
  }

  //
  // Respond to the webhook event. And
  // close the current webhook request.
  //

  return new Response(undefined, {
    status: 200,
  });
}
