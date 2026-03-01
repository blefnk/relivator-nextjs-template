/**
 * POST /api/webhooks/paythefly
 *
 * Receives and verifies webhook callbacks from PayTheFly when a
 * crypto payment or withdrawal is processed on-chain.
 *
 * Webhook body shape:
 *   { data: "<json string>", sign: "<hmac hex>", timestamp: <unix int> }
 *
 * Security:
 *   - HMAC-SHA256 signature verification
 *   - Timestamp staleness check (5 min window)
 *   - Idempotency via serial_no + tx_hash
 *
 * The response body MUST contain the word "success" for PayTheFly
 * to consider the delivery acknowledged.
 */

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "~/db";
import { cryptoPaymentTable } from "~/db/schema";
import { PayTheFly } from "~/lib/paythefly";

import type { WebhookPayload } from "~/lib/paythefly";

export async function POST(request: Request) {
  try {
    // ── 1. Parse raw body ──
    const body = (await request.json()) as WebhookPayload;

    if (!body.data || !body.sign || !body.timestamp) {
      return NextResponse.json(
        { error: "Malformed webhook payload" },
        { status: 400 },
      );
    }

    // ── 2. Verify HMAC signature ──
    const ptf = PayTheFly.fromEnv();
    let webhookData;
    try {
      webhookData = ptf.verifyWebhook(body);
    } catch (err) {
      console.error("[PayTheFly Webhook] Signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 },
      );
    }

    console.log("[PayTheFly Webhook] Verified payload:", {
      serial_no: webhookData.serial_no,
      tx_type: webhookData.tx_type,
      chain: webhookData.chain_symbol,
      value: webhookData.value,
      confirmed: webhookData.confirmed,
    });

    // ── 3. Idempotency check ──
    const existing = await db.query.cryptoPaymentTable.findFirst({
      where: eq(cryptoPaymentTable.txHash, webhookData.tx_hash),
    });

    if (existing) {
      // Already processed — update confirmation status if needed
      if (webhookData.confirmed && existing.status !== "confirmed") {
        await db
          .update(cryptoPaymentTable)
          .set({
            status: "confirmed",
            confirmedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(cryptoPaymentTable.txHash, webhookData.tx_hash));
      }
      return NextResponse.json({ message: "success (duplicate)" });
    }

    // ── 4. Determine payment type ──
    const txType = webhookData.tx_type === 1 ? "payment" : "withdrawal";

    // ── 5. Store in database ──
    await db.insert(cryptoPaymentTable).values({
      id: crypto.randomUUID(),
      serialNo: webhookData.serial_no,
      projectId: webhookData.project_id,
      chainSymbol: webhookData.chain_symbol,
      txHash: webhookData.tx_hash,
      wallet: webhookData.wallet,
      value: webhookData.value,
      fee: webhookData.fee,
      txType,
      status: webhookData.confirmed ? "confirmed" : "pending",
      confirmedAt: webhookData.confirmed ? new Date() : null,
      rawData: JSON.stringify(webhookData),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // ── 6. Handle business logic based on tx type ──
    if (txType === "payment" && webhookData.confirmed) {
      await handleConfirmedPayment(webhookData.serial_no, webhookData.value);
    }

    // ── 7. Respond with "success" (required by PayTheFly) ──
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("[PayTheFly Webhook] Unhandled error:", error);
    // Still return 200 with "success" to prevent retry storms for parse errors
    // For genuine 5xx errors PayTheFly will retry
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ── Business logic for confirmed payments ───────────────────────────
async function handleConfirmedPayment(serialNo: string, value: string) {
  // TODO: Implement your order fulfillment logic here.
  // Examples:
  //   - Update order status in your orders table
  //   - Send confirmation email
  //   - Unlock digital product access
  //   - Trigger shipping workflow
  //
  // The serialNo maps back to your internal order ID.
  console.log(
    `[PayTheFly] Payment confirmed: serialNo=${serialNo}, value=${value}`,
  );
}
