/** @see https://github.com/raydium-io/raydium-frontend/blob/master/src/hooks/useEvent.tsx */

import { useCallback, useLayoutEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**@see https://juejin.cn/post/7094453522535546893 */
export function useEvent<T>(handler: T): T {
  const handlerRef = useRef<T>();

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // @ts-expect-error ...
  return useCallback((...args) => {
    const fn = handlerRef.current;
    // @ts-expect-error ...
    return fn?.(...args);
  }, []);
}
