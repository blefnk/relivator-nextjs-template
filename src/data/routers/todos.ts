import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/data/db/client";
import * as schema from "~/data/db/schema";
import { publicProcedure, router } from "~/data/env/trpc";

export const todosRouter = router({
  getTodos: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (ctx.user?.email !== input && input !== "guest") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    const todos = await db.query.todos.findMany({
      columns: {
        id: true,
        content: true,
        done: true,
        createdAt: true,
      },
      where: eq(schema.todos.userId, input),
      orderBy: (todos, { asc }) => [asc(todos.position)],
    });
    return todos;
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        content: z.string(),
        userId: z.string(),
        position: z.number(),
      }),
    )
    .mutation(async ({ input: { content, userId, position } }) => {
      await db
        .insert(schema.todos)
        .values({ content, done: false, userId, position });
      return true;
    }),
  editTodo: publicProcedure
    .input(z.object({ id: z.number(), content: z.string() }))
    .mutation(async ({ input: { id, content } }) => {
      return await db
        .update(schema.todos)
        .set({ content })
        .where(eq(schema.todos.id, id));
    }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .update(schema.todos)
        .set({ done: input.done })
        .where(eq(schema.todos.id, input.id));
      return true;
    }),
  removeTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const todo = await db
        .delete(schema.todos)
        .where(eq(schema.todos.id, input.id))
        .returning();
      return todo;
    }),
  reorderTodos: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      await Promise.all(
        input.ids.map((id, position) => {
          return db
            .update(schema.todos)
            .set({ position })
            .where(eq(schema.todos.id, id));
        }),
      );
      return true;
    }),
});
