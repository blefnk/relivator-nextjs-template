"use client";

import type { SSOCallbackPageProps } from "~/types/auth";

import { useEffect } from "react";

import { useClerk } from "@clerk/nextjs";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";

export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      className="flex items-center justify-center"
      aria-describedby="loading-description"
      aria-label="Loading"
      role="status"
    >
      <SpinnerSVG className="size-16 animate-spin" aria-hidden="true" />
      {/* import { FakeLoadingVariantOne } from "~/components/FakeLoading"; */}
      {/* <FakeLoadingVariantOne /> */}
    </div>
  );
}
