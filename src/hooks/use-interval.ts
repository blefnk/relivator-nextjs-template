"use client";

import { useCallback, useRef, useState } from "react";

export default function useInterval(function_: () => void, interval: number) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>(0);

  const start = useCallback(() => {
    setActive((old) => {
      if (!old && !intervalRef.current) {
        intervalRef.current = globalThis.setInterval(
          function_,
          interval,
        ) as unknown as number;
      }

      return true;
    });
  }, [function_, interval]);

  const stop = useCallback(() => {
    setActive(false);
    globalThis.clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }, []);

  const toggle = useCallback(() => {
    if (active) {
      stop();
    } else {
      start();
    }
  }, [active, start, stop]);

  return {
    active,
    start,
    stop,
    toggle,
  };
}
