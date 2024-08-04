import Link from "next/link";

import { Skeleton } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";

import { getUserBoards } from "~/data/other/boards";
import { genRandomName } from "~/utils";

// import { CreateBoard } from "~/components/Playground/Boards/CreateBoard";
export async function BoardList() {
  const boards = await getUserBoards();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-200">The boards</span>
        {/* <CreateBoard /> */}
      </div>
      {boards.length === 0 && (
        <span className="text-sm text-slate-500">No boards yet</span>
      )}
      {boards.length > 0 && (
        <ul className="flex flex-col gap-2">
          {boards.map((board) => (
            <li key={board.id}>
              <Link
                className="flex items-center gap-4 text-slate-200"
                href={`/boards/${board.id}`}
              >
                <span
                  className="size-4 rounded-full"
                  style={{
                    backgroundColor: board.color,
                  }}
                />
                <span>{board.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Loading component with its display name
const BoardListLoading = () => (
  <div className="flex flex-col gap-2">
    {/* TODO: Make the Skeleton brighter than default on dark background */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold">
        <Skeleton>The boards</Skeleton>
      </span>
      <Skeleton>
        <button className="p-2 text-sm" type="button">
          <PlusIcon className="size-4" />
        </button>
      </Skeleton>
    </div>
    <ul className="flex flex-col gap-2">
      <li>
        <Link className="flex items-center gap-4 text-slate-200" href="/">
          <span className="size-4 animate-pulse rounded-full bg-slate-400" />
          <span>
            <Skeleton className="bg-slate-300 text-slate-300">
              {genRandomName()}
            </Skeleton>
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

// Set the display name to avoid ESLint warning
BoardListLoading.displayName = "BoardListLoading";

BoardList.Loading = BoardListLoading;

export default BoardList;
