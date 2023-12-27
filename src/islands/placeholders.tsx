"use client";

import toast from "react-hot-toast";

import { Button } from "~/islands/primitives/button";

/** used as placeholder when env variables are not specified */
export function ButtonPlaceholder({
  text,
  auth_provider,
  tNextAuthError,
}: {
  text: string;
  auth_provider: string;
  tNextAuthError: string;
}) {
  const notify_clerk = () => toast.error("Please specify Clerk env variables");
  const notify_authjs = () => toast.error(tNextAuthError);
  if (auth_provider === "clerk") {
    return (
      <Button
        variant="secondary"
        onClick={notify_clerk}
        className="whitespace-nowrap px-3 text-sm"
      >
        {text}
      </Button>
    );
  } else {
    return (
      <Button
        variant="secondary"
        onClick={notify_authjs}
        className="whitespace-nowrap px-3 text-sm"
      >
        {text}
      </Button>
    );
  }
}
