import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "~/core/trpc-old/trpc2";
import { db } from "~/db";
import { users } from "~/db/schema/provider";

// @ts-expect-error TODO: fix trpc users
export const userRouter = router({
  getUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // User should only be able to access their own data
      if (ctx.user && ctx.user.user?.email !== input.email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      // Execute the query using the determined column
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      return user;
    }),
});
