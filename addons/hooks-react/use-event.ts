"use client";

import { useCallback, useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks-react/use-isomorphic";

export function useEvent<T extends (...arguments_: any[]) => any>(
  handler: T,
): T {
  const handlerRef = useRef<T>(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...arguments_: Parameters<T>): ReturnType<T> => {
    const function_ = handlerRef.current;

    return function_ && function_(...arguments_);
  }, []) as unknown as T;
}
