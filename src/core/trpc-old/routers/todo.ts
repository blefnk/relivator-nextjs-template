import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc-old/trpc";
import { todos } from "~/db/schema/provider";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    ) // .mutation(async ({ ctx, input }) => {
    .mutation(async ({ ctx }) => {
      // const todos = await getTodos();
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // @ts-expect-error TODO: fix ts
      await ctx.db.insert(todos).values({
        userId: ctx.session.id,
      });
    }), // name: input.name,
  // createdById: ctx.session.id,
  getLatest: publicProcedure.query(({ ctx }) => {
    // const todos = await getTodos();
    return ctx.db.query.todos.findFirst({
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(
    () => "you can now see this secret message!",
  ),

  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),
});
