"use client";

import { Button } from "@/browser/reliverse/ui/Button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <Button
      className="px-4"
      onClick={(event) => {
        event.preventDefault();
        void signOut();
      }}
      size="sm"
    >
      Sign Out
    </Button>
  );
}
