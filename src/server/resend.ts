import { Resend } from "resend";

import { env } from "~/data/env";

export const resend = new Resend(env.RESEND_API_KEY);
