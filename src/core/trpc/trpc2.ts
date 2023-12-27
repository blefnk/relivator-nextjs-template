import { initTRPC, TRPCError } from "@trpc/server";

import type { Context } from "~/core/trpc/context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next, input }) => {
  console.log({ input });

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next();
});

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
