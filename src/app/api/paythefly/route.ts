/**
 * POST /api/paythefly
 *
 * Generates a signed PayTheFly payment link for the given order.
 * Called from the checkout UI when the user selects "Pay with Crypto".
 *
 * Request body:
 *   { chain: "BSC" | "TRON", amount: "0.01", serialNo: "ORDER_xxx", token?: "0x..." }
 *
 * Response:
 *   { url, signature, rawAmount, deadline, serialNo }
 */

import { NextResponse } from "next/server";
import { z } from "zod";

import { PayTheFly, PAYTHEFLY_CHAINS } from "~/lib/paythefly";

// ── Request validation schema ───────────────────────────────────────
const createPaymentSchema = z.object({
  chain: z.enum(["BSC", "TRON"]),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Amount must be a valid decimal string"),
  serialNo: z
    .string()
    .min(1, "serialNo is required")
    .max(64, "serialNo too long"),
  token: z.string().optional(),
});

// ── Handler ─────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { chain, amount, serialNo, token } = parsed.data;

    // Validate amount is positive
    if (Number.parseFloat(amount) <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than zero" },
        { status: 400 },
      );
    }

    const ptf = PayTheFly.fromEnv();
    const result = await ptf.createPaymentLink({
      chain,
      amount,
      serialNo,
      token: token ?? PAYTHEFLY_CHAINS[chain].nativeToken,
    });

    return NextResponse.json({
      url: result.url,
      signature: result.signature,
      rawAmount: result.rawAmount,
      deadline: result.deadline,
      serialNo,
    });
  } catch (error) {
    console.error("[PayTheFly] Error creating payment link:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    // Don't leak signer key errors to the client
    const safeMessage = message.includes("environment variable")
      ? "Payment service is not configured"
      : message;

    return NextResponse.json(
      { error: safeMessage },
      { status: 500 },
    );
  }
}
