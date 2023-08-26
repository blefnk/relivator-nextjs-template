import { Resend } from "resend";

import { env } from "~/data/env";

let client: Resend | null = null;

export function emailClient() {
  if (!client) {
    client = new Resend(env.RESEND_API_KEY);
  }

  return client;
}
