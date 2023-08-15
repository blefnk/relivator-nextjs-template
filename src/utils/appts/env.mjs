import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // @ts-ignore
    NEXT_SECRET_URL_PSCALE: z.string().url()
  },

  client: {
    // @ts-ignore
    NEXT_PUBLIC_URL_AUTHJS: z.string().min(1)
  },

  runtimeEnv: {
    NEXT_SECRET_URL_PSCALE: process.env.NEXT_SECRET_URL_PSCALE,
    NEXT_PUBLIC_URL_AUTHJS: process.env.NEXT_PUBLIC_URL_AUTHJS
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION
});

/* // ?? ===== [ VALIDABOT ] ==============================

import { object, string, url, minLength } from "valibot";

const msg = "error -> Please check your env.";

export const createEnv = object({
  server: object({
    NEXT_SECRET_URL_PSCALE: string([minLength(1, msg), url(msg)]),
  }),

  client: object({
    NEXT_PUBLIC_URL_AUTHJS: string([minLength(1, msg), url(msg)]),
  }),

  runtimeEnv: object({}),
});

// ?? ================================================== */
