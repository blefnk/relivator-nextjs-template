import { initTRPC, TRPCError } from "@trpc/server";

import type { Context } from "~/core/trpc-old/context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next();
});

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);
