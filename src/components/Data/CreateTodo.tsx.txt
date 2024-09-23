"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { api } from "~/core/trpc-old/infer";

export function CreateTodo() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event_) => {
        event_.preventDefault();
        createTodo.mutate({
          name,
        });
      }}
    >
      <input
        className="w-full rounded-full px-4 py-2 text-black"
        onChange={(event_) => {
          setName(event_.target.value);
        }}
        placeholder="Title"
        type="text"
        value={name}
      />
      <button
        className={`
          rounded-full bg-white/10 px-10 py-3 font-semibold transition

          hover:bg-white/20
        `}
        type="submit"
      >
        {createTodo.isPending}
        {/* {createTodo.isPending ? "Submitting..." : "Submit"} */}
        Submit
      </button>
    </form>
  );
}
