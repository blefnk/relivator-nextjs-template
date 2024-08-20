import { unstable_cache } from "next/cache";

import { and, asc, eq } from "drizzle-orm";

import type { Item } from "~/db/schema/provider";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";

// These seems to be some issue when caching this function and optimistically
// updating the frontend. Let's just keep it uncached for this moment...
// @see https://github.com/juliusmarminge/trellix-trpc/blob/main/src/app/_data.ts
// export const getBoardWithItems = unstable_cache(
//   async (userId: string, boardId: string) => {
//     const board = await db.query.Board.findFirst({
//       with: {
//         columns: {
//           with: {
//             items: { orderBy: (fields) => asc(fields.order) },
//           },
//         },
//       },
//       where: (fields) =>
//         and(eq(fields.ownerId, userId), eq(fields.id, boardId)),
//     })
//     if (!board) return null
//     return {
//       id: board.id,
//       color: board.color,
//       name: board.name,
//       columns: Object.fromEntries(board.columns.map((col) => [col.id, col])),
//     }
//   },
//   undefined,
//   { tags: ['board_details'] },
// )
export const getBoardWithItems = async (boardId: string) => {
  const user = await authjs();
  const userId = (user && user.id) || "";
  const board = await db.query.boards.findFirst({
    where: (fields) => and(eq(fields.ownerId, userId), eq(fields.id, boardId)),
    with: {
      columns: true,
      items: {
        // @ts-expect-error TODO: fix
        orderBy: (fields: unknown) => asc(fields.order),
      },
    },
  });

  if (!board) {
    return null;
  }

  const itemsById: Record<string, Item> = {};

  // Normalize items by id. This is useful for the
  // quick lookups when we need to update an item
  // @ts-expect-error TODO: fix ts
  for (const itm of board.items) {
    itemsById[itm.id] = itm;
  }

  return {
    id: board.id,
    name: board.name,
    color: board.color,
    columns: board.columns,
    items: itemsById,
  };
};

export type BoardWithColumns = NonNullable<
  Awaited<ReturnType<typeof getBoardWithItems>>
>;

export const getUserBoards = async () => {
  const user = await authjs();
  const userId = (user && user.id) || "";

  return unstable_cache(
    async (userId: string) => {
      return await db.query.boards.findMany({
        columns: {
          id: true,
          name: true,
          color: true,
        },
        where: (fields, ops) => ops.eq(fields.ownerId, userId),
      });
    },
    undefined,
    {
      tags: ["user_boards"],
    },
  )(userId);
};
