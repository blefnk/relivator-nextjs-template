/** @see uRC-test-1.tsx @see uRC-test-2.tsx */

import { useCallback, useRef } from "react";

const useRenderCount = (enableLogging = false) => {
  const renderCount = useRef(0);
  renderCount.current++;

  const logRenderCount = useCallback(() => {
    if (enableLogging) {
      console.log(`Render count: ${renderCount.current}`);
    }
  }, [enableLogging, renderCount.current]);

  const resetRenderCount = useCallback(() => {
    renderCount.current = 0;
  }, []);

  // Log render count if logging is enabled
  logRenderCount();

  return { renderCount: renderCount.current, resetRenderCount };
};

export default useRenderCount;
