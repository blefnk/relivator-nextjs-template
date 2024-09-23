"use client";

import { signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      className="px-4"
      size="sm"
      onClick={(event) => {
        event.preventDefault();
        void signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
