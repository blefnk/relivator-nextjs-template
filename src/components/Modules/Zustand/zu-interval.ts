"use client";

import { useEffect, useRef } from "react";

// @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useSetInterval = (callback: () => void, delay: number | undefined) => {
  const savedCallback = useRef<typeof callback>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => {
      savedCallback.current && savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(handler, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export default useSetInterval;
