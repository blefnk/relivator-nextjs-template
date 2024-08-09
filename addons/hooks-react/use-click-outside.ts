import type { RefObject } from "react";
import { useEffect } from "react";

type UseClickOutsideProps = {
  handler: (event: MouseEvent | TouchEvent) => void;
  ref: RefObject<HTMLElement>;
};

export function useClickOutside({ ref, handler }: UseClickOutsideProps) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref?.current;

      if (!element || element.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
