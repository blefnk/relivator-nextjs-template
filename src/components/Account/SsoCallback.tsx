"use client";

import { useEffect } from "react";

import type { SSOCallbackPageProps } from "@/types/reliverse/auth";

import { useClerk } from "@clerk/nextjs";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";

export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      aria-describedby="loading-description"
      aria-label="Loading"
      className="flex items-center justify-center"
      role="status"
    >
      <SpinnerSVG aria-hidden="true" className="size-16 animate-spin" />
      {/* import { FakeLoadingVariantOne } from "~/components/FakeLoading"; */}
      {/* <FakeLoadingVariantOne /> */}
    </div>
  );
}
