"use client";

import { useId } from "react";

export default function useIds(length: number) {
  return Array.from(
    {
      length,
    },
    useId,
  );
}
