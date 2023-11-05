import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/data/db";
import { users } from "~/data/db/schema";
import { protectedProcedure, router } from "~/utils/trpc/others/trpc";

export const userRouter = router({
  getUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      /**
       * User should only be able
       * to access their own data
       */
      if (ctx.user?.email !== input.email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));
      return user;
    }),
});
