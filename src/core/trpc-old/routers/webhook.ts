import consola from "consola";
import { eq } from "drizzle-orm";
import * as z from "zod";

import { clerkEvent } from "~/core/trpc-old/routers/type";
import { createTRPCRouter, publicProcedure } from "~/core/trpc-old/trpc";
import { users } from "~/db/schema/provider";

export const webhookProcedure = publicProcedure.input(
  z.object({
    data: clerkEvent,
  }),
);

export const webhookRouter = createTRPCRouter({
  userCreated: webhookProcedure.mutation(async (options) => {
    if (options.input.data.type === "user.created") {
      // There's no primary key with drizzle orm,
      // the tenant is not already in the database
      const alreadyExists = await options.ctx.db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.id, options.input.data.data.id));

      if (alreadyExists) {
        return;
      }

      await options.ctx.db
        .insert(users) // @ts-expect-error TODO: Fix
        .values({
          email:
            options?.input?.data?.data?.email_addresses[0]?.email_address || "",
          // eslint-disable-next-line @stylistic/max-len
        }) // tenantId: opts.input.data.data.id,            // firstName: opts.input.data.data.first_name,            // lastName: opts.input.data.data.last_name || "",
        .returning();
    }
  }),
  userSignedIn: webhookProcedure.mutation(async (options) => {
    if (options.input.data.type === "session.created") {
      const currentUser = await options.ctx.db
        .select({
          id: users.id,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, options.input.data.data.user_id));

      if (
        // Then it's the new user it might be null
        !currentUser
      ) {
        return;
      }
    }
  }),
  userUpdated: webhookProcedure.mutation((options) => {
    if (options.input.data.type === "user.updated") {
      consola.info("User updated", options.input.data.data);
    }
  }),
});

export const clerkRouter = createTRPCRouter({
  webhooks: webhookRouter,
});
