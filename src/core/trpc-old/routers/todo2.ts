import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure } from "~/core/trpc-old/trpc2";
import { db } from "~/db";
import * as schema from "~/db/schema/provider";

// @ts-expect-error TODO: fix todos
export const todosRouter = router({
  addTodo: publicProcedure
    .input(
      z.object({
        content: z.string(),
        position: z.number(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input: { content, position, userId } }) => {
      await db.insert(schema.todos).values({
        content,
        done: false,
        position,
        userId,
      });

      return true;
    }),
  editTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input: { id, content } }) => {
      return await db
        .update(schema.todos)
        .set({
          content,
        }) // @ts-expect-error TODO: fix id type
        .where(eq(schema.todos.id, id));
    }),
  getTodos: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (ctx.user && ctx.user.user?.email !== input && input !== "guest") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    return await db.query.todos.findMany({
      columns: {
        id: true,
        content: true,
        createdAt: true,
        done: true,
      },
      orderBy: (todos, { asc }) => [asc(todos.position)],
      where: eq(schema.todos.userId, input),
    });
  }),
  removeTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db
        .delete(schema.todos) // @ts-expect-error TODO: fix id type
        .where(eq(schema.todos.id, input.id))
        .returning();
    }),
  reorderTodos: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()),
      }),
    )
    .mutation(async ({ input }) => {
      await Promise.all(
        input.ids.map((id, position) => {
          return db
            .update(schema.todos)
            .set({
              position,
            }) // @ts-expect-error TODO: fix ts
            .where(eq(schema.todos.id, id));
        }),
      );

      return true;
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
        .set({
          done: input.done,
        }) // @ts-expect-error TODO: fix id type
        .where(eq(schema.todos.id, input.id));

      return true;
    }),
});
