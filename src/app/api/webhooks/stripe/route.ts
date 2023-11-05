/**
 * Stripe Webhooks API Handler
 * ===========================
 *
 * This file contains the API logic for handling incoming webhooks from Stripe. Webhooks are
 * used by Stripe to send asynchronous notifications about events that happen in a Stripe
 * account. This API endpoint is crucial for capturing and processing these events,
 * ensuring that our application stays in sync with the state of transactions,
 * subscriptions, and other Stripe-related activities.
 *
 * Please scroll down to the bottom of this file to read a detailed description of this file.
 * You will also find links to inspirations and other additional learning resources there.
 */

import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs";
import { env } from "~/env.mjs";
import { type CheckoutItem } from "~/types";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { z } from "zod";

import { db } from "~/data/db";
import {
  addresses,
  carts,
  orders,
  payments,
  products,
  users,
} from "~/data/db/schema";
import { checkoutItemSchema } from "~/data/validations/cart";
import { stripe } from "~/utils/stripe/connect";

/**
 * POST /api/webhooks/stripe
 * This endpoint listens to Stripe webhook events and processes them accordingly.
 * It's responsible for handling various event types sent by Stripe, such as payment
 * success, payment failure, customer creation, etc.
 */
export async function POST(req: Request) {
  /**
   * Construct and validate the event sent by Stripe.
   * This process is crucial to ensure the integrity and authenticity of the event.
   * The event is created by parsing the request body, the Stripe signature header,
   * and using the Stripe webhook signing secret from the environment variables.
   */
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  const secret = env.STRIPE_WEBHOOK_SIGNING_SECRET as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    return new Response(
      `❌ [Stripe Error]: ${err instanceof Error ? err.message : "Unknown"}`,
      { status: 400 },
    );
  }

  // By using console.log in this place, we ensure to see triggered events only
  const debug = process.env.NODE_ENV === "development"; // const debug = false;
  if (debug) console.log(` ✓ Received ${event.type}`);

  // Switch case to handle different types of Stripe webhook events
  switch (event.type) {
    /**
     * [1] checkout.session.completed
     * ==============================
     *
     * This case is triggered when a customer successfully completes the payment flow,
     * and the funds have been collected. It involves retrieving subscription details
     * from Stripe, updating the user's plan information in the database, and handling
     * any errors that may occur during the process.
     */
    case "checkout.session.completed": {
      const checkoutSessionCompleted = event.data.object;

      // If there is a userId, and no cartId in the metadata, then this is a new subscription
      if (
        checkoutSessionCompleted?.metadata?.userId &&
        !checkoutSessionCompleted?.metadata?.cartId
      ) {
        // Retrieve the subscription details from Stripe using the session's subscription ID
        const subscription = await stripe.subscriptions.retrieve(
          checkoutSessionCompleted.subscription as string,
        );

        // Update the user stripe based on the auth provider
        if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
          // Update the user stripe into in our database.
          // Since this is the initial subscription, we need
          // to update the subscription id and customer id.
          const update_clerk = await clerkClient.users.updateUserMetadata(
            checkoutSessionCompleted?.metadata?.userId,
            {
              privateMetadata: {
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0]?.price.id,
                stripeCurrentPeriodEnd: new Date(
                  subscription.current_period_end * 1000,
                ),
              },
            },
          );

          // Update the user stripe into in our database as well.
          const update_db = await db
            .update(users)
            .set({
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: subscription.items.data[0]?.price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            })
            .where(
              eq(users.id, checkoutSessionCompleted?.metadata?.userId ?? ""),
            );

          if (debug && update_clerk && update_db)
            console.log("✅ [stripe/clerk] User successfully updated.");
        } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
          // Update the user stripe into in our database.
          // Since this is the initial subscription, we need
          // to update the subscription id and customer id.
          const update = await db
            .update(users)
            .set({
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: subscription.items.data[0]?.price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            })
            .where(
              eq(users.id, checkoutSessionCompleted?.metadata?.userId ?? ""),
            );

          if (debug && update)
            console.log("✅ [stripe/authjs] User successfully updated.");
        }
      }

      break; //=> checkout.session.completed (1)
    }

    /**
     * [2] invoice.payment_succeeded
     * =============================
     *
     * This case handles successful payment events for invoices.
     * It retrieves subscription details, updates user information
     * in the database, and logs relevant data.
     */
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object;

      // If there is a userId, and no cartId in the
      // metadata, then this is a new subscription
      if (
        invoicePaymentSucceeded?.metadata?.userId &&
        !invoicePaymentSucceeded?.metadata?.cartId
      ) {
        // Retrieve the subscription details from Stripe using the subscription ID
        const subscription = await stripe.subscriptions.retrieve(
          invoicePaymentSucceeded.subscription as string,
        );

        // Update the user stripe based on the auth provider
        if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
          // Update the price id and set the new period end
          const update_clerk = await clerkClient.users.updateUserMetadata(
            invoicePaymentSucceeded?.metadata?.userId,
            {
              privateMetadata: {
                stripePriceId: subscription.items.data[0]?.price.id,
                stripeCurrentPeriodEnd: new Date(
                  subscription.current_period_end * 1000,
                ),
              },
            },
          );

          // Update the user stripe into in our database as well.
          const update_db = await db
            .update(users)
            .set({
              stripePriceId: subscription.items.data[0]?.price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            })
            .where(
              eq(users.id, invoicePaymentSucceeded?.metadata?.userId ?? ""),
            );

          if (debug && update_clerk && update_db)
            console.log("✅ [stripe/clerk] User successfully updated.");
        } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
          // Update the price id and set the new period end
          const update = await db
            .update(users)
            .set({
              stripePriceId: subscription.items.data[0]?.price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            })
            .where(
              eq(users.id, invoicePaymentSucceeded?.metadata?.userId ?? ""),
            );

          if (debug && update)
            console.log("✅ [stripe/authjs] User successfully updated.");
        }
      }
      break; //=> invoice.payment_succeeded (2)
    }

    /**
     * [3] payment_intent.payment_failed
     * =================================
     *
     * Triggered when a payment attempt on a PaymentIntent has failed.
     * Useful for logging failed payments, sending notifications to customers,
     * or triggering additional workflows for payment recovery.
     */
    case "payment_intent.payment_failed": {
      const paymentIntentPaymentFailed = event.data
        .object as Stripe.PaymentIntent;
      if (debug) {
        console.log(
          `❌ Payment failed: ${paymentIntentPaymentFailed.last_payment_error?.message}`,
        );
      }
      break; //=> payment_intent.payment_failed (3)
    }

    /**
     * [4] payment_intent.processing
     * =============================
     *
     * Occurs when a PaymentIntent is processing, indicating that payment
     * is underway but not yet completed. Useful for monitoring the state
     * of payment processing especially for asynchronous payment methods.
     */
    case "payment_intent.processing": {
      const paymentIntentProcessing = event.data.object as Stripe.PaymentIntent;
      if (debug) {
        console.log(`⌛ Payment processing: ${paymentIntentProcessing.id}`);
      }
      break; //=> payment_intent.processing (4)
    }

    /**
     * [5] payment_intent.succeeded
     * ============================
     *
     * This event is triggered when a payment intent succeeds, indicating a successful
     * payment process. The following actions are performed:
     * - Logging payment intent details.
     * - Validating the presence of an associated Stripe account.
     * - Retrieving store information related to the payment.
     * - Creating a new address and a new order in the database based on the payment intent.
     * - Updating the cart status as closed and clearing its items.
     * The function also handles any exceptions that occur during these processes.
     */
    case "payment_intent.succeeded": {
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;

      const paymentIntentId = paymentIntentSucceeded?.id;
      const orderAmount = paymentIntentSucceeded?.amount;
      const checkoutItems = paymentIntentSucceeded?.metadata
        ?.items as unknown as CheckoutItem[];

      // if (debug) {
      //   console.log({ paymentIntentId, orderAmount, checkoutItems });
      // }

      // If there are items in metadata, then create order
      if (checkoutItems) {
        try {
          if (!event.account) throw new Error("❌ No account found.");

          // Parsing items from metadata
          // Didn't parse before because can pass the unparsed data
          // directly to the order table items json column in the db
          const safeParsedItems = z
            .array(checkoutItemSchema)
            .safeParse(
              JSON.parse(paymentIntentSucceeded?.metadata?.items ?? "[]"),
            );
          if (!safeParsedItems.success) {
            throw new Error("❌ Could not parse items.");
          }

          const payment = await db.query.payments.findFirst({
            columns: { storeId: true },
            where: eq(payments.stripeAccountId, event.account),
          });
          if (!payment?.storeId) {
            return new Response("❌ Store not found.", { status: 404 });
          }

          // Create new address in DB
          const stripeAddress = paymentIntentSucceeded?.shipping?.address;
          const newAddress = await db.insert(addresses).values({
            line1: stripeAddress?.line1,
            line2: stripeAddress?.line2,
            city: stripeAddress?.city,
            state: stripeAddress?.state,
            country: stripeAddress?.country,
            postalCode: stripeAddress?.postal_code,
          });
          if (!newAddress.insertId) throw new Error("❌ No address created.");

          // Create new order in db
          await db.insert(orders).values({
            storeId: payment.storeId,
            items: checkoutItems ?? [],
            quantity: safeParsedItems.data.reduce(
              (acc, item) => acc + item.quantity,
              0,
            ),
            amount: String(Number(orderAmount) / 100),
            stripePaymentIntentId: paymentIntentId,
            stripePaymentIntentStatus: paymentIntentSucceeded?.status,
            name: paymentIntentSucceeded?.shipping?.name,
            email: paymentIntentSucceeded?.receipt_email,
            addressId: Number(newAddress.insertId),
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
              throw new Error("❌ Product not found.");
            }

            const inventory = product.inventory - item.quantity;
            if (inventory < 0) {
              throw new Error("❌ Product out of stock.");
            }

            await db
              .update(products)
              .set({
                inventory: product.inventory - item.quantity,
              })
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
        } catch (err) {
          console.log("❌ Error creating order.", err);
        }
      }

      break; //=> payment_intent.succeeded (5)
    }

    /**
     * [6] application_fee.created
     * ===========================
     */
    case "application_fee.created": {
      const applicationFeeCreated = event.data.object;
      console.log(`Application fee id: ${applicationFeeCreated.id}`);
      break; //=> application_fee.created (6)
    }

    /**
     * [7] charge.succeeded
     * ====================
     *
     * Occurs when a charge is successfully created and the payment
     * is confirmed. Useful for confirmation of payment, triggering
     * post-payment processes like order fulfillment or invoice generation.
     */
    case "charge.succeeded": {
      // const chargeSucceeded = event.data.object as Stripe.Charge;
      // if (debug) {
      //   console.log(`✅ ChargeId ${chargeSucceeded.id} succeeded!`);
      // }
      break; //=> charge.succeeded (7)
    }

    /**
     * [8] customer.created
     * ====================
     *
     * Triggered when a new customer is successfully created in Stripe.
     * Useful for tracking new customer creation and updating related
     * records in your database.
     */
    case "customer.created": {
      // if (debug) {
      //   console.log("✅ New customer successfully created!");
      // }
      break; //=> customer.created (8)
    }

    /**
     * [9] customer.subscription.updated
     * =================================
     *
     * Triggered when a subscription for a customer is updated. This
     * can involve changes in plan, status updates, or billing cycles.
     * Essential for maintaining current subscription states in your system.
     */
    case "customer.subscription.updated": {
      // const subscriptionUpdated = event.data.object as Stripe.Subscription;
      break; //=> customer.subscription.updated (9)
    }

    /**
     * [*] Currently not used events
     * =============================
     */
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

    /**
     * [else] Unknown event types
     * ==========================
     *
     * Show console warn when dealing
     * with an unexpected event type.
     */
    default: {
      console.warn(`❌ Unknown event: ${event.type}`);
      break;
    }
  }

  /**
   * Respond to the webhook event. And
   * close the current webhook request.
   */
  return new Response(null, { status: 200 });
}

/**
 * Stripe Webhooks API Handler (details)
 * =====================================
 *
 * Description:
 * ------------
 * This file contains the API logic for handling incoming webhooks from Stripe. Webhooks are
 * used by Stripe to send asynchronous notifications about events that happen in a Stripe
 * account. This API endpoint is crucial for capturing and processing these events, ensuring
 * that our application stays in sync with the state of transactions, subscriptions, and other
 * Stripe-related activities.
 *
 * Key Features:
 * -------------
 * 1. Verification of Stripe Signature: Ensures the authenticity of the incoming webhooks to
 *    prevent spoofed events.
 * 2. Event Parsing: Converts the webhook payload into Stripe event objects for easy handling.
 * 3. Event Handling: Uses a switch-case or conditional logic to process different types of
 *    Stripe events (e.g., payment success, subscription updates).
 * 4. Error Handling: Robust error handling to deal with invalid events or issues in processing.
 *
 * Security Note:
 * --------------
 * The endpoint strictly validates the signature sent by Stripe using a secret. Ensure that
 * this secret is securely stored and not exposed in the client-side code.
 *
 * Usage:
 * ------
 * The webhook endpoint should be configured in the Stripe dashboard to receive events. It's
 * important to regularly update and test this endpoint to handle new types of events as Stripe
 * updates its API.
 *
 * Additional Notes:
 * -----------------
 * - The file is structured for ease of maintenance and scalability. The events
 *   can be added or modified with minimal changes to the existing codebase.
 * - Consider logging important events for audit trails and diagnostics.
 *
 * Learning Resources:
 * -------------------
 * @see https://github.com/blefnk/relivator/blob/main/.env.example
 * @see https://github.com/stripe/stripe-node#readme
 * @see https://github.com/blefnk/relivator#readme
 * @see https://stripe.com/docs/api/events
 * @see https://stripe.com/docs/webhooks
 * @see https://stripe.com/docs/js
 *
 * Inspiration Resources:
 * ----------------------
 * @see https://github.com/joselozano2003/talk-pdf/blob/main/src/app/api/stripe/route.ts
 * @see https://github.com/alissonsleal/brapi/blob/main/services/stripe/webhookhandlers.ts
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/router/stripe
 * @see https://github.com/sadmann7/skateshop/blob/main/src/app/api/webhooks/stripe/route.ts
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/app/api/callback/stripe/route.ts
 */
