"use client";

import { useOptimistic } from "react";

import { invariant } from "@/utils/reliverse/gen";

import type { BoardWithColumns } from "~/data/other/boards";
import type { Column, Item } from "~/db/schema/provider";

type UpdCol = {
  color: string;
  intent: "updClr";
};

type AddCol = {
  id: string;
  intent: "addCol";
  name: string;
};

type DelCol = {
  id: string;
  intent: "delCol";
};

type AddItm = {
  columnId: string;
  id: string;
  intent: "addItm";
  order: number;
  title: string;
};

type DelItm = {
  columnId: string;
  id: string;
  intent: "delItm";
};

type MoveItm = {
  id: string;
  intent: "moveItm";
  order: number;
  toColumnId: string;
};

export const useOptimisticBoard = (board: BoardWithColumns) => {
  const [optimisticBoard, optimisticUpdate] = useOptimistic(
    board,
    (state, action: AddCol | AddItm | DelCol | DelItm | MoveItm | UpdCol) => {
      switch (action.intent) {
        case "updClr":
          state.color = action.color;

          return state;

        case "addCol":
          // We're using `Object.values` to get the length of the columns
          // to determine the order of the new column
          // @ts-expect-error TODO: fix ts
          state.columns.push({
            id: action.id,
            name: action.name,
            boardId: board.id,
            order: Object.values(state.columns).length,
          });

          return state;

        case "delCol":
          // Remove a column
          // We're using `filter` to remove the column by id
          // @ts-expect-error TODO: fix ts
          state.columns = state.columns.filter((col) => col.id !== action.id);

          return state;

        case "addItm":
          board.items[action.id] = {
            id: action.id,
            boardId: board.id,
            columnId: action.columnId,
            content: null,
            order: action.order,
            title: action.title,
          };

          return state;

        case "delItm":
          delete board.items[action.id];

          return state;

        case "moveItm": {
          const item = board.items[action.id];

          invariant(item);
          // @ts-expect-error TODO: fix ts
          item.columnId = action.toColumnId;
          // @ts-expect-error TODO: fix ts
          item.order = action.order;

          return state;
        }
      }
    },
  );

  // Add items to columns
  // We're using a Map to store the columns
  // and then we add the items to the columns
  const columns = new Map<
    string,
    {
      items: Item[];
    } & Column
  >(
    // @ts-expect-error TODO: fix ts
    optimisticBoard.columns.map((col) => [
      col.id,
      {
        ...col,
        items: [],
      },
    ]),
  );

  for (const item of Object.values(board.items)) {
    const column = columns.get(item.columnId);

    column && column.items.push(item);
  }

  return {
    board: optimisticBoard,
    columns,
    optimisticUpdate,
  };
};
