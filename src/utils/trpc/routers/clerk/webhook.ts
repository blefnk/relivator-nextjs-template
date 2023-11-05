/**
 * (this file is not finished and currently not in use anywhere)
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/router/clerk/webhook.ts
 */

import { eq } from "drizzle-orm";
import * as z from "zod";

import { users } from "~/data/db/schema";

import { createTRPCRouter, publicProcedure } from "../../trpc";
import { clerkEvent } from "./type";

export const webhookProcedure = publicProcedure.input(
  z.object({
    data: clerkEvent,
  }),
);

export const webhookRouter = createTRPCRouter({
  userCreated: webhookProcedure.mutation(async (opts) => {
    if (opts.input.data.type === "user.created") {
      // There's no primary key with drizzle orm,
      // the tenant is not already in the database
      const alreadyExists = await opts.ctx.db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, opts.input.data.data.id))
        .get();
      if (alreadyExists) return;
      const userResult = await opts.ctx.db
        .insert(users)
        .values({
          email:
            opts?.input?.data?.data?.email_addresses[0]?.email_address || "",
          tenantId: opts.input.data.data.id,
          firstName: opts.input.data.data.first_name,
          lastName: opts.input.data.data.last_name || "",
        })
        .returning()
        .get();
    }
  }),
  userUpdated: webhookProcedure.mutation(async (opts) => {
    if (opts.input.data.type === "user.updated") {
      // We should do something
    }
  }),
  userSignedIn: webhookProcedure.mutation(async (opts) => {
    if (opts.input.data.type === "session.created") {
      const currentUser = await opts.ctx.db
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(eq(users.id, opts.input.data.data.user_id))
        .get();
      // Then it's the new user it might be null
      if (!currentUser) return;
    }
  }),
});

export const clerkRouter = createTRPCRouter({
  webhooks: webhookRouter,
});
