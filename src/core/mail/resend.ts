"use server";

import { Resend } from "resend";

import { env } from "~/env.mjs";

import Onboard from "./templates/onboard";

enum Templates {
  Onboard = "ONBOARD",
}

const resend = new Resend(env.RESEND_API_KEY);

const TEMPLATES = {
  [Templates.Onboard]: Onboard,
};

export async function sendEmails(
  emails: string[],
  // biome-ignore lint/style/useDefaultParameterLast: <explanation>
  props: any = {},
  template: Templates,
) {
  try {
    await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: emails,
      subject: `Congrats, ${props.firstName}! You received your event ticket!`,
      react: TEMPLATES[template](props),
    });

    return { success: true };
  } catch (e: any) {
    console.log("Send Email Error", e);
    return { error: e.message };
  }
}
