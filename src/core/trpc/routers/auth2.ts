import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, router } from "~/core/trpc/trpc2";
import { db } from "~/data/db";
import { users } from "~/data/db/schema";
import { env } from "~/env.mjs";

export const userRouter = router({
  getUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      // User should only be able to access their own data
      if (ctx.user?.email !== input.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Determine the column to use based on the environment variable
      const emailColumn =
        env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" ?
          users.emailClerk
        : users.email;

      // Execute the query using the determined column
      const [user] = await db
        .select()
        .from(users)
        .where(eq(emailColumn, input.email));

      return user;
    }),
});
