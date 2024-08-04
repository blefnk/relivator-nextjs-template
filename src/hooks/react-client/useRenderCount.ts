"use client";

import { useCallback, useRef } from "react";

const noop = () => {};
const useRenderCount = (enableLogging = false) => {
  const renderCount = useRef(0);

  renderCount.current++;

  const logRenderCount = useCallback(noop, [
    enableLogging,
    renderCount.current,
  ]);

  const resetRenderCount = useCallback(() => {
    renderCount.current = 0;
  }, []);

  // Log render count if logging is enabled
  logRenderCount();

  return {
    renderCount: renderCount.current,
    resetRenderCount,
  };
};

export default useRenderCount;
