import { Resend } from "resend";

import Onboard from "~/core/mail/templates/onboard";
import { env } from "~/env";

enum Templates {
  Onboard = "ONBOARD",
}
const resend = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY);

const TEMPLATES = {
  [Templates.Onboard]: Onboard,
};

export async function sendEmails(
  to: string[],

  // biome-ignore lint/style/useDefaultParameterLast: <explanation>
  props: unknown = {
    //
  },
  template: Templates,
) {
  try {
    await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      // @ts-expect-error TODO: fix
      react: TEMPLATES[template](props),
      // @ts-expect-error TODO: fix
      subject: `Congrats, ${props.firstName}! You received the event ticket!`,
      to,
    });

    return {
      success: true,
    };
  } catch (event_: unknown) {
    return {
      // @ts-expect-error TODO: fix
      error: event_.message,
    };
  }
}
