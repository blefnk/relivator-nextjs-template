import type { Ref } from "react";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import type { MakeAction } from "@/server/reliverse/actions/auth";

import {
  createItem,
  deleteItem,
  moveItem,
} from "@/server/reliverse/actions/auth";
import { Button, TextArea } from "@radix-ui/themes";
import consola from "consola";
import { Trash2Icon } from "lucide-react";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

import {
  createTransfer,
  invariant,
  isCardTransfer,
  parseTransfer,
} from "~/utils";

type AcceptDrop = "bottom" | "none" | "top";

export const Card = ({
  id,
  boardId,
  columnId,
  content,
  order,
  ref,
  title,
  ...props
}: {
  boardId: string;
  columnId: string;
  content?: string;
  id: string;
  order: number;
  ref: Ref<HTMLLIElement>;
  title: string;
} & {
  props: {
    nextOrder: number;
    previousOrder: number;
    onDelete: () => void;
    onMove: (id: string, columnId: string, order: number) => void;
  };
  onMove: (id: string, columnId: string, order: number) => void;
}) => {
  const [acceptDrop, setAcceptDrop] = useState<AcceptDrop>("none");

  return (
    <li
      className={twMerge(
        `
          -mb-[2px] cursor-grab border-b-2 border-t-2 border-b-transparent
          border-t-transparent px-2 py-1

          active:cursor-grabbing

          last:mb-0
        `,
        acceptDrop === "top" && "border-b-transparent border-t-red-500",
        acceptDrop === "bottom" && "border-b-red-500 border-t-transparent",
      )}
      onDragLeave={() => {
        setAcceptDrop("none");
      }}
      onDragOver={(event) => {
        if (isCardTransfer(event)) {
          event.preventDefault();
          event.stopPropagation();
          const rect = event.currentTarget.getBoundingClientRect();
          const midpoint = (rect.top + rect.bottom) / 2;

          setAcceptDrop(event.clientY <= midpoint ? "top" : "bottom");
        }
      }}
      onDrop={async (event) => {
        event.stopPropagation();

        const transfer = parseTransfer(event.dataTransfer);
        const droppedOrder =
          acceptDrop === "top"
            ? // @ts-expect-error TODO: fix
              props.previousOrder
            : // @ts-expect-error TODO: fix
              props.nextOrder;

        const moveOrder = (droppedOrder + order) / 2;

        startTransition(() => {
          props.onMove(transfer.id, columnId, moveOrder);
        });
        await moveItem({
          id: transfer.id,
          boardId,
          columnId,
          order: moveOrder,
        });

        setAcceptDrop("none");
      }}
      ref={ref}
    >
      <div
        className={`
          relative w-full rounded-lg border-slate-300 bg-white px-2 py-1 text-sm
          shadow shadow-slate-300
        `}
        draggable
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = "move";
          createTransfer(event.dataTransfer, {
            id,
            title,
          });
        }}
      >
        <h3>{title}</h3>
        <div className="mt-2">{content || <>&nbsp;</>}</div>
        <form
          action={async (fd) => {
            // @ts-expect-error TODO: fix
            props.onDelete();
            // @ts-expect-error TODO: fix
            await deleteItem(fd);
          }}
        >
          <input name="id" type="hidden" value={id} />
          <input name="boardId" type="hidden" value={boardId} />
          <button
            aria-label="Delete card"
            className={`
              absolute right-2 top-2 rounded border border-transparent p-1

              hover:border-red-500 hover:text-red-500
            `}
            type="submit"
          >
            <Trash2Icon className="size-4" />
          </button>
        </form>
      </div>
    </li>
  );
};

type NewCardProps = {
  boardId: string;
  columnId: string;
  nextOrder: number;
  onComplete: () => void;
  onCreate: (item: {
    id: string;
    order: number;
    title: string;
  }) => void;
};

function genId(prefix: string) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

  return [prefix, nanoid()].join("_");
}

export function NewCard({
  boardId,
  columnId,
  nextOrder,
  onComplete,
  onCreate,
}: NewCardProps) {
  // @ts-expect-error TODO: fix ts
  const [state, dispatch] = useActionState(
    createItem as MakeAction<typeof createItem>,
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state?.error) {
      consola.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={(fd) => {
        invariant(textAreaRef.current);
        // @ts-expect-error TODO: fix
        textAreaRef.current.value = "";
        // @ts-expect-error TODO: fix
        onCreate(Object.fromEntries(fd.entries()));
        // @ts-expect-error TODO: fix ts
        dispatch(fd);
      }}
      className="flex flex-col gap-2 px-2 pb-2 pt-1"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onComplete();
        }
      }}
    >
      <input name="id" type="hidden" value={genId("itm")} />
      <input name="boardId" type="hidden" value={boardId} />
      <input name="columnId" type="hidden" value={columnId} />
      <input name="order" type="hidden" value={nextOrder} />
      <TextArea
        className={`
          h-14 w-full resize-none rounded-lg px-2 py-1 text-sm shadow
          outline-none

          placeholder:text-sm placeholder:text-slate-500
        `}
        name="title"
        onChange={(event) => {
          const element = event.currentTarget;

          element.style.height = `${element.scrollHeight}px`;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            invariant(buttonRef.current, "expected button ref");
            // @ts-expect-error TODO: fix
            buttonRef.current.click();
          }

          if (event.key === "Escape") {
            onComplete();
          }
        }}
        placeholder="Enter a title for this card"
        ref={textAreaRef}
        required
      />
      <div className="flex justify-between">
        <Button ref={buttonRef}>Save Card</Button>
        <Button color="gray" onClick={onComplete}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
