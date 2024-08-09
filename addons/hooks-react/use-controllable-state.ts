import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCallbackRef } from "@/hooks-react/use-callback-ref";

type UseControllableStateParams<T> = {
  defaultProp?: T | undefined;
  prop?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFunction<T> = (previousState?: T) => T;

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProperty, setUncontrolledProperty] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProperty;
  const handleChange = useCallbackRef(onChange);

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFunction<T>;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;

        if (value !== prop) {
          handleChange(value as T);
        }
      } else {
        setUncontrolledProperty(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProperty, handleChange],
  );

  return [value, setValue] as const;
}

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const previousValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (previousValueRef.current !== value) {
      handleChange(value as T);
      previousValueRef.current = value;
    }
  }, [value, previousValueRef, handleChange]);

  return uncontrolledState;
}

export { useControllableState };
