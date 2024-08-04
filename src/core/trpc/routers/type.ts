import { z } from "zod";

export const clerkEvent = z.discriminatedUnion("type", [
  z.object({
    data: z.object({
      id: z.string(),

      // username: z.string(),
      created_at: z.number(),
      email_addresses: z.array(
        z.object({
          email_address: z.string(),
        }),
      ),
      first_name: z.string().nullable(),
      last_name: z.string().nullable(),
    }),
    type: z.literal("user.created"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      updated_at: z.number(),
    }),
    type: z.literal("user.updated"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
    }),
    type: z.literal("user.deleted"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      name: z.string(),
      created_at: z.number(),
      slug: z.string(),
    }),
    type: z.literal("organization.created"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      created_at: z.number(),
      expire_at: z.number(),
      user_id: z.string(),
    }),
    type: z.literal("session.created"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
    type: z.literal("session.revoked"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
    type: z.literal("session.removed"),
  }),
  z.object({
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
    type: z.literal("session.ended"),
  }),
  z.object({
    data: z.object({
      created_at: z.number(),
      organization: z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
      public_user_data: z.object({
        user_id: z.string(),
      }),
    }),
    type: z.literal("organizationMembership.created"),
  }),
]);
