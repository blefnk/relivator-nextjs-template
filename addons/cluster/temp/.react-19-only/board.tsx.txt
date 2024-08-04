"use client";

import { useRef } from "react";

// import type { BoardWithColumns } from "~/data/other/boards";
// import type { MakeAction } from "@/server/reliverse/actions/auth";
// import { useActionState, useRef, useState } from "react";
// import { AlertDialog, Button, IconButton, Popover } from "@radix-ui/themes";
// import { ArrowLeft, PaletteIcon, Trash2Icon } from "lucide-react";
// import Link from "next/link";
// import {
//   Column,
//   NewColumn,
// } from "~/components/Application/Experimental/Admin/column";
// import { EditableText } from "~/components/Playground/Boards/EditableText";
// import { useOptimisticBoard } from "~/hooks/react-client/useOptimisticBoard";
// import {
//   deleteBoard,
//   updateBoardColor,
//   updateBoardName,
// } from "@/server/reliverse/actions/auth";
// export function Board(props: {
// board: BoardWithColumns;
// }) {
export function Board() {
  // scroll right when new columns are added
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const columnRef = useCallback(
  //   (node: HTMLElement | null) => {
  //     if (node && scrollContainerRef.current) {
  //       scrollContainerRef.current.scrollLeft =
  //         scrollContainerRef.current.scrollWidth;
  //     }
  //   },
  //   [scrollContainerRef],
  // );
  // const { board, columns, optimisticUpdate } = useOptimisticBoard(props.board);
  // const { board, optimisticUpdate } = useOptimisticBoard(props.board);
  return (
    <div
      className={`
        flex h-full min-h-0 grow flex-col gap-4 overflow-x-scroll px-8 py-4
      `}
      ref={scrollContainerRef}

      // style={{

      //   backgroundColor: board.color,

      // }}
    >
      {/* <BoardToolbar
        color={board.color}
        id={board.id}
        name={board.name}
        optUpdateColor={(color) =>
          optimisticUpdate({
            color,
            intent: "updClr",
          })
        }
      /> */}
      <div
        className={`
        flex h-full min-h-0 grow items-start gap-4 px-8 pb-4
      `}
      >
        {/* TODO: fix admin board */}
        {/* {[...columns.values()].map((col) => (
          <Column
            boardId={board.id}
            columnId={col.id}
            items={col.items}
            key={col.id} // @ts-expect-error TODO: fix
            name={col.name} // @ts-expect-error TODO: fix
            onCardAdd={(itm) =>
              optimisticUpdate({
                columnId: col.id,
                intent: "addItm",
                ...itm,
              })
            } // @ts-expect-error TODO: Fix ts
            onCardDelete={(id) =>
              optimisticUpdate({
                id,
                columnId: col.id,
                intent: "delItm",
              })
            } // @ts-expect-error TODO: Fix ts
            onCardMove={(id, toColumnId, order) =>
              optimisticUpdate({
                id,
                order,
                intent: "moveItm",
                toColumnId,
              })
            }
            onDelete={() =>
              optimisticUpdate({
                id: col.id,
                intent: "delCol",
              })
            }
            ref={columnRef}
          />
        ))} */}
        {/* <NewColumn
          boardId={board.id} // @ts-expect-error TODO: Fix ts
          editInitially={board.columns.length === 0}
          onCreate={(col) =>
            optimisticUpdate({
              intent: "addCol",
              ...col,
            })
          }
        /> */}
      </div>
    </div>
  ); // eslint-disable-next-line @stylistic/max-len
} // function useDebounce<A extends unknown[], R>(//   function_: (...arguments_: A) => R,//   delay = 100,// ) {//   const ref = useRef<ReturnType<typeof setTimeout>>();//   return (...arguments_: A) => {//     clearTimeout(ref.current);//     ref.current = setTimeout(() => function_(...arguments_), delay);//   };// }// function BoardToolbar(props: {//   id: string;//   name: string;//   color: string;//   optUpdateColor: (color: string) => void;// }) {//   const { id, name } = props;//   // @ts-expect-error TODO: Fix ts//   const [, dispatch] = useActionState(//     updateBoardColor as MakeAction<typeof updateBoardColor>,//   );//   const formRef = useRef<HTMLFormElement>(null);//   const [color, setColor] = useState(props.color);//   const updateColor = useDebounce((color: string) => {//     setColor(color);//     formRef.current && formRef.current.requestSubmit();//   });//   return (//     <div className="flex items-center justify-between gap-4">//       <h1 className="flex flex-1 items-center gap-2 text-2xl font-medium">//         <Link href="/">//           <ArrowLeft />//         </Link>//         <EditableText//           buttonClassName="rounded-lg text-left border w-max border-transparent py-1 px-2 text-slate-800"//           buttonLabel={`Edit board "${name}" name`}//           fieldName="name"//           inputClassName="border border-slate-400 w-full rounded-lg py-1 px-2 text-black"//           inputLabel="Edit board name" // @ts-expect-error TODO: Fix ts//           onSubmit={(newName) =>//             // @ts-expect-error TODO: Fix ts//             updateBoardName({//               boardId: id,//               newName,//             })//           }//           value={name}//         >//           <input name="boardId" type="hidden" value={id} />//         </EditableText>//       </h1>//       <div className="flex items-center gap-4">//         <Popover.Root>//           <Popover.Trigger>//             <IconButton variant="ghost">//               <PaletteIcon className="size-6 stroke-slate-900" />//             </IconButton>//           </Popover.Trigger>//           <Popover.Content>//             <form//               action={(fd) => {//                 props.optUpdateColor(fd.get("newColor") as string);//                 // @ts-expect-error TODO: fix//                 dispatch(fd);//               }}//               ref={formRef}//             >//               <input name="boardId" type="hidden" value={id} />//               <input//                 className="h-16"//                 name="newColor"//                 onChange={(event_) => updateColor(event_.target.value)}//                 type="color"//                 value={color}//               />//             </form>//           </Popover.Content>//         </Popover.Root>//         <AlertDialog.Root>//           <AlertDialog.Trigger>//             <IconButton variant="ghost">//               <Trash2Icon className="size-6 stroke-slate-900" />//             </IconButton>//           </AlertDialog.Trigger>//           <AlertDialog.Content maxWidth="450px">//             <AlertDialog.Title>Delete board</AlertDialog.Title>//             <AlertDialog.Description size="2">//               Are you sure? The board and all of it's content will be deleted//               permanently. This action cannot be undone.//             </AlertDialog.Description>//             <div className="mt-4 flex justify-end gap-4">//               <AlertDialog.Cancel>//                 <Button color="gray" variant="soft">//                   Cancel//                 </Button>//               </AlertDialog.Cancel>//               {/* @ts-expect-error TODO: fix */}//               <form action={deleteBoard}>//                 <input name="boardId" type="hidden" value={id} />//                 <AlertDialog.Action>//                   <Button color="red" type="submit" variant="solid">//                     Delete board//                   </Button>//                 </AlertDialog.Action>//               </form>//             </div>//           </AlertDialog.Content>//         </AlertDialog.Root>//       </div>//     </div>//   );// }
