import { Resend } from "resend";

import { env } from "~/data/env/env.mjs";

let client: Resend | null = null;

export function emailClient() {
  if (!client) {
    client = new Resend(env.RESEND_API_KEY);
  }

  return client;
}
