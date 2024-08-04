"use client";

import { useActionState } from "react";

import type { MakeAction } from "@/server/reliverse/actions/auth";

import { createBoard } from "@/server/reliverse/actions/auth";
import { faker } from "@faker-js/faker";
import { PlusIcon } from "lucide-react";

import { SubmitButton } from "~/components/Playground/Boards/SubmitButton";
import { genRandomName } from "~/utils";

export function CreateBoard() {
  const [, dispatch] = useActionState(
    createBoard as MakeAction<typeof createBoard>, // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );

  return (
    <form action={dispatch}>
      <input name="name" type="hidden" value={genRandomName()} />
      <input name="color" type="hidden" value={faker.color.rgb()} />
      <SubmitButton className="w-max p-2">
        <PlusIcon className="size-4" />
      </SubmitButton>
    </form>
  );
}
