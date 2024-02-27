"use client";

import { startTransition } from "react";
import { catchError } from "~/utils";
import toast from "react-hot-toast";

import { changeUserPrivilegies } from "~/core/adm/actions";
import { Button } from "~/islands/primitives/button";

type ButtonSetPrivilegiesProps = {
  newRole: "user" | "admin";
  userId: string;
};

export default function ButtonSetPrivilegies({
  newRole,
  userId,
}: ButtonSetPrivilegiesProps) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      async function changePrivileges() {
        try {
          const session = await changeUserPrivilegies({
            role: newRole,
            userId,
          });
          if (session !== undefined) {
            toast(session.result ?? "Something wrong...");
          }
        } catch (err) {
          catchError(err);
        }
      }
      changePrivileges();
    });
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <Button variant="secondary">Switch User Role</Button>
    </form>
  );
}
