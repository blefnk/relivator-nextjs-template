import { revalidatePath, revalidateTag } from "next/cache";

import { protectedAction, protectedBoardAction } from "@/server/reliverse/trpc";
import { and, count, eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import tryToCatch from "try-to-catch";
import { z } from "zod";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";
import {
  boards,
  columns,
  createBoardSchema,
  createColumnSchema,
  createItemSchema,
  items,
} from "~/db/schema";
import { genId } from "~/db/utils";

// Temporary little type to cast a trpc
// action when passing the action to `useActionState`
// @example useActionState(createBoard as MakeAction<typeof createBoard>)
export type MakeAction<T> = T extends (...arguments_: any[]) => any ? T : never;

export const createBoard = protectedAction
  .input(
    createBoardSchema.superRefine(async (test, context) => {
      const { id: userId } = await authjs();

      const board = await db.query.boards.findFirst({
        where: (fields) =>
          and(eq(fields.name, test.name), eq(fields.ownerId, userId)),
      });

      if (board) {
        context.addIssue({
          code: "custom",
          message: `Board ${test.name} already exists`,
          path: ["name"],
        });
      }
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const id = genId("board");

    await db.insert(boards).values({
      ...input,
      id,
      ownerId: ctx.user.id,
    });

    revalidatePath("/");
    revalidateTag("user_boards");

    // @ts-expect-error TODO: fix
    return redirect(`/boards/${id}`);
  });

export const deleteBoard = protectedBoardAction.mutation(async ({ input }) => {
  await Promise.all([
    db.delete(items).where(eq(items.boardId, input.boardId)),
    db.delete(columns).where(eq(columns.boardId, input.boardId)),
    db.delete(boards).where(eq(boards.id, input.boardId)),
  ]);

  revalidateTag("user_boards");
  revalidatePath(`/boards/${input.boardId}`);

  // revalidateTag('board_details')

  // @ts-expect-error TODO: fix
  return redirect("/");
});

export const updateBoardName = protectedBoardAction
  .input(
    z.object({
      newName: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await db
      .update(boards)
      .set({
        name: input.newName,
      })
      .where(eq(boards.id, input.boardId));

    revalidatePath(`/boards/${input.boardId}`);

    // revalidateTag('board_details')
    revalidateTag("user_boards");
  });

export const updateBoardColor = protectedBoardAction
  .input(
    z.object({
      newColor: z.string().regex(/^#[\da-f]{6}$/i),
    }),
  )
  .mutation(async ({ input }) => {
    await db
      .update(boards)
      .set({
        color: input.newColor,
      })
      .where(eq(boards.id, input.boardId));

    revalidatePath(`/boards/${input.boardId}`);

    // revalidateTag('board_details')
    revalidateTag("user_boards");
  });

export const createColumn = protectedBoardAction
  .input(createColumnSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Fetch the current order count and provide a default value if undefined
      const res = await db
        .select({
          order: count(),
        })
        .from(columns)
        .where(eq(columns.boardId, input.boardId));

      const order = res[0]?.order || 0;

      await db.insert(columns).values({
        id: input.id,

        name: input.name,
        boardId: input.boardId,

        // order: sql`SELECT (COUNT(*) + 1) FROM ${columns} WHERE ${columns.boardId} = ${input.boardId}`,
        order: order + 1,
      });

      revalidatePath(`/boards/${input.boardId}`);

      // revalidateTag('board_details')

      return {
        ok: true as const,
      };
    } catch (error) {
      ctx.log.error("Error creating column", error);

      return {
        error: "Internal server error",
        ok: false as const,
      };
    }
  });

export const updateColumnName = protectedBoardAction
  .input(
    z.object({
      columnId: z.string(),
      newName: z.string(),
    }),
  )
  .mutation(
    async ({ input }) => {
      await db
        .update(columns)
        .set({
          name: input.newName,
        })
        .where(eq(columns.id, input.columnId));

      revalidatePath(`/boards/${input.boardId}`);
    },

    // revalidateTag('board_details')
  );

export const deleteColumn = protectedBoardAction
  .input(
    z.object({
      columnId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      await Promise.all([
        db.delete(items).where(eq(items.columnId, input.columnId)),
        db.delete(columns).where(eq(columns.id, input.columnId)),
      ]);

      revalidatePath(`/boards/${input.boardId}`);

      // revalidateTag('board_details')

      return {
        ok: true as const,
      };
    } catch (error) {
      ctx.log.error("Error deleting column", error);

      return {
        error: "Internal server error",
        ok: false as const,
      };
    }
  });

export const createItem = protectedBoardAction
  .input(createItemSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await db.insert(items).values({
        id: input.id,
        boardId: input.boardId,
        columnId: input.columnId,
        order: input.order,
        title: input.title,
      });

      revalidatePath(`/boards/${input.boardId}`);

      // revalidateTag('board_details')

      return {
        ok: true as const,
      };
    } catch (error) {
      ctx.log.error("Error creating item", error);

      return {
        error: "Internal server error",
        ok: false as const,
      };
    }
  });

export const moveItem = protectedBoardAction
  .input(
    z.object({
      id: z.string(),
      columnId: z.string(),
      order: z.number(),
    }),
  )
  .mutation(
    async ({ input }) => {
      await db
        .update(items)
        .set({
          columnId: input.columnId,
          order: input.order,
        })
        .where(eq(items.id, input.id));

      revalidatePath(`/boards/${input.boardId}`);
    },

    // revalidateTag('board_details')
  );

export const deleteItem = protectedBoardAction
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(
    async ({ input }) => {
      await db.delete(items).where(eq(items.id, input.id));

      revalidatePath(`/boards/${input.boardId}`);
    },

    // revalidateTag('board_details')
  );

export async function signInWithCredentials(
  _previousState:
    | {
        error: string;
      }
    | undefined,
  formData: FormData,
) {
  // @ts-expect-error TODO: fix
  const [error] = await tryToCatch(signIn, "credentials", formData);

  if (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      // eslint-disable-next-line sonarjs/no-small-switch
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials.",
          };

        default:
          return {
            error: "Something went wrong.",
          };
      }
    }

    throw error;
  }
}

export async function signInWithGithub() {
  await signIn("github");
}
