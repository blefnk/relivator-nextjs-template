import { useId } from "react";

export function useIds(length: number) {
  return Array.from({ length }, useId);
}
