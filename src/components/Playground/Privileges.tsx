"use client";

import type { FormEvent } from "react";
import { startTransition } from "react";

import { Button } from "@/browser/reliverse/ui/Button";
import { catchError } from "@/server/reliverse/errors/helpers/auth";
import consola from "consola";

import { changeUserPrivileges } from "~/core/adm/actions";

export default function ButtonSetPrivileges(
  userId: string,
  newRole: "admin" | "user",
) {
  function onSubmit(event_: FormEvent<HTMLFormElement>) {
    event_.preventDefault();
    startTransition(async () => {
      async function changePrivileges() {
        try {
          const session = await changeUserPrivileges({
            role: newRole,
            userId,
          });

          if (session !== undefined) {
            consola.info(session.res);
          }
        } catch (error) {
          catchError(error);
        }
      }

      await changePrivileges();
    });
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <Button variant="secondary">Switch User Role</Button>
    </form>
  );
}
