"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "~/core/trpc/infer";

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
      onSubmit={(e) => {
        e.preventDefault();
        createTodo.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        // disabled={createTodo.isPending}
      >
        {/* {createTodo.isPending ? "Submitting..." : "Submit"} */}
        Submit
      </button>
    </form>
  );
}
