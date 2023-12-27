import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc/trpc";
import { todos } from "~/data/db/schema";

export const todoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // const todos = await getTodos();

      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(todos).values({
        name: input.name,
        createdById: ctx.session.id,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    // const todos = await getTodos();

    return ctx.db.query.todos.findFirst({
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
