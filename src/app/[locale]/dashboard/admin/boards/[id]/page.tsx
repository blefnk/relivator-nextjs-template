import Link from "next/link";

import { Board } from "~/components/Application/Experimental/Admin/board";
import { getBoardWithItems } from "~/data/other/boards";

export default async function BoardPage(props: {
  params: {
    id: string;
  };
}) {
  const board = await getBoardWithItems(props.params.id);

  if (!board) {
    return (
      <div
        className={`
          flex h-full max-w-sm grow flex-col items-center justify-center
          place-self-center
        `}
      >
        <h1 className="text-lg font-bold">Board not found</h1>
        <p>
          This board either does not exist, or you are not authorized to access
          it.{" "}
          <Link className="underline" href="/">
            Go back home
          </Link>
        </p>
      </div>
    );
  }

  // return <Board board={board} />;
  return <Board />;
}
