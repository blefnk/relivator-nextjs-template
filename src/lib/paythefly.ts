/**
 * PayTheFly Pro — EIP-712 crypto payment integration
 *
 * Generates typed-data signatures for on-chain payments (BSC / TRON)
 * and builds the hosted payment URL that PayTheFly's front-end consumes.
 *
 * @see https://pro.paythefly.com/docs
 */

import { createHmac, timingSafeEqual } from "node:crypto";

// ─── Chain configuration ────────────────────────────────────────────
export const PAYTHEFLY_CHAINS = {
  BSC: {
    chainId: 56,
    decimals: 18,
    nativeToken: "0x0000000000000000000000000000000000000000" as const,
    symbol: "BSC",
  },
  TRON: {
    chainId: 728126428,
    decimals: 6,
    nativeToken: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb" as const,
    symbol: "TRON",
  },
} as const;

export type PayTheFlyChain = keyof typeof PAYTHEFLY_CHAINS;

// ─── EIP-712 type definitions ───────────────────────────────────────
export const EIP712_DOMAIN = {
  name: "PayTheFlyPro",
  version: "1",
} as const;

export const PAYMENT_REQUEST_TYPES = {
  PaymentRequest: [
    { name: "projectId", type: "string" },
    { name: "token", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "serialNo", type: "string" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

export const WITHDRAWAL_REQUEST_TYPES = {
  WithdrawalRequest: [
    { name: "user", type: "address" },
    { name: "projectId", type: "string" },
    { name: "token", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "serialNo", type: "string" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

// ─── TypeScript interfaces ──────────────────────────────────────────
export interface PayTheFlyConfig {
  /** Project ID from PayTheFly dashboard */
  projectId: string;
  /** EIP-712 signer private key (hex, with or without 0x prefix) */
  signerPrivateKey: string;
  /** HMAC key for verifying webhooks */
  projectKey: string;
  /** Contract address for EIP-712 domain */
  verifyingContract: string;
}

export interface CreatePaymentLinkParams {
  /** Target blockchain */
  chain: PayTheFlyChain;
  /** Human-readable amount, e.g. "0.01" */
  amount: string;
  /** Unique order / serial number */
  serialNo: string;
  /** Token contract address (use chain native token for BNB/TRX) */
  token?: string;
  /** Payment deadline as unix timestamp (default: +30 minutes) */
  deadline?: number;
}

export interface PaymentLinkResult {
  /** Full hosted payment URL */
  url: string;
  /** EIP-712 signature */
  signature: string;
  /** Raw amount in wei / smallest unit */
  rawAmount: string;
  /** Deadline used */
  deadline: number;
}

export interface WebhookPayload {
  data: string;
  sign: string;
  timestamp: number;
}

export interface WebhookData {
  project_id: string;
  chain_symbol: string;
  tx_hash: string;
  wallet: string;
  /** Human-readable value */
  value: string;
  /** Fee deducted */
  fee: string;
  serial_no: string;
  /** 1 = payment, 2 = withdrawal */
  tx_type: 1 | 2;
  /** Whether the transaction is confirmed on-chain */
  confirmed: boolean;
  create_at: string;
}

// ─── Helper: human-readable amount → raw (wei / sun) ────────────────
export function toRawAmount(amount: string, decimals: number): bigint {
  const [whole = "0", frac = ""] = amount.split(".");
  const paddedFrac = frac.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(paddedFrac);
}

// ─── Core class ─────────────────────────────────────────────────────
export class PayTheFly {
  private readonly config: PayTheFlyConfig;

  constructor(config: PayTheFlyConfig) {
    this.config = config;
  }

  // ── Static factory from env ──
  static fromEnv(): PayTheFly {
    const projectId = process.env.PAYTHEFLY_PROJECT_ID;
    const signerPrivateKey = process.env.PAYTHEFLY_SIGNER_PRIVATE_KEY;
    const projectKey = process.env.PAYTHEFLY_PROJECT_KEY;
    const verifyingContract = process.env.PAYTHEFLY_VERIFYING_CONTRACT;

    if (!projectId || !signerPrivateKey || !projectKey || !verifyingContract) {
      throw new Error(
        "Missing PayTheFly environment variables. " +
          "Required: PAYTHEFLY_PROJECT_ID, PAYTHEFLY_SIGNER_PRIVATE_KEY, " +
          "PAYTHEFLY_PROJECT_KEY, PAYTHEFLY_VERIFYING_CONTRACT",
      );
    }

    return new PayTheFly({ projectId, signerPrivateKey, projectKey, verifyingContract });
  }

  // ── Create payment link ──
  async createPaymentLink(params: CreatePaymentLinkParams): Promise<PaymentLinkResult> {
    const chain = PAYTHEFLY_CHAINS[params.chain];
    const token = params.token ?? chain.nativeToken;
    const deadline = params.deadline ?? Math.floor(Date.now() / 1000) + 30 * 60;
    const rawAmount = toRawAmount(params.amount, chain.decimals);

    const signature = await this.signPaymentRequest({
      chainId: chain.chainId,
      projectId: this.config.projectId,
      token,
      amount: rawAmount,
      serialNo: params.serialNo,
      deadline: BigInt(deadline),
    });

    const url = new URL("https://pro.paythefly.com/pay");
    url.searchParams.set("chainId", String(chain.chainId));
    url.searchParams.set("projectId", this.config.projectId);
    url.searchParams.set("amount", params.amount);
    url.searchParams.set("serialNo", params.serialNo);
    url.searchParams.set("deadline", String(deadline));
    url.searchParams.set("signature", signature);
    url.searchParams.set("token", token);

    return {
      url: url.toString(),
      signature,
      rawAmount: rawAmount.toString(),
      deadline,
    };
  }

  // ── EIP-712 signing ──
  private async signPaymentRequest(params: {
    chainId: number;
    projectId: string;
    token: string;
    amount: bigint;
    serialNo: string;
    deadline: bigint;
  }): Promise<string> {
    // Dynamic import to keep ethers.js tree-shakeable & server-only
    const { ethers } = await import("ethers");

    const wallet = new ethers.Wallet(this.config.signerPrivateKey);

    const domain = {
      name: EIP712_DOMAIN.name,
      version: EIP712_DOMAIN.version,
      chainId: params.chainId,
      verifyingContract: this.config.verifyingContract,
    };

    const message = {
      projectId: params.projectId,
      token: params.token,
      amount: params.amount,
      serialNo: params.serialNo,
      deadline: params.deadline,
    };

    const signature = await wallet.signTypedData(
      domain,
      PAYMENT_REQUEST_TYPES,
      message,
    );

    return signature;
  }

  // ── Webhook verification ──
  verifyWebhook(payload: WebhookPayload): WebhookData {
    const expectedSign = createHmac("sha256", this.config.projectKey)
      .update(`${payload.data}.${payload.timestamp}`)
      .digest("hex");

    const signBuffer = Buffer.from(payload.sign, "hex");
    const expectedBuffer = Buffer.from(expectedSign, "hex");

    if (
      signBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signBuffer, expectedBuffer)
    ) {
      throw new Error("Invalid webhook signature");
    }

    // Reject stale webhooks (> 5 minutes old)
    const age = Math.abs(Date.now() / 1000 - payload.timestamp);
    if (age > 300) {
      throw new Error("Webhook timestamp too old");
    }

    return JSON.parse(payload.data) as WebhookData;
  }

  // ── Accessors ──
  get projectId(): string {
    return this.config.projectId;
  }
}
