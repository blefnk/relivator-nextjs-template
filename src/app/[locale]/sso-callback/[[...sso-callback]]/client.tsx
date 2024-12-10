"use client";

import type { HandleOAuthCallbackParams } from "@clerk/types";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

import { Icons } from "~/components/icons";

export default function SSOCallback({
  searchParams,
}: {
  searchParams: HandleOAuthCallbackParams;
}) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <Icons.spinner
        className="h-12 w-h-12 animate-caret-blink"
        aria-hidden="true"
      />
    </div>
  );
}
