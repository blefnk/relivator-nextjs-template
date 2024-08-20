"use client";

import type { Dispatch, SetStateAction } from "react";
import { useRef, useState } from "react";

import { useEvent } from "@/hooks-react/use-event";
import { shrinkToValue } from "@/server/reliverse/s-to-v";

// 🔴 DEPRECATED AND POSSIBLY WILL BE REMOVED IN RELIVATOR 1.3.0 🔴 ||
// ================================================================= ||
// safely change useState to useSignalState
// export state and state and signal in order
// so it extends build-in `setState()`
// - before: `const [foo, setFoo] = useState(0)`
// - after: `const [foo, setFoo, fooSignal] = useSignalState(0)`
// no need to change other code where use `foo` and `setFoo`, cause api is compatible**
// if prefer merged fn version, please use {@link useSignal} instead
// @example
// export default function LoginCard() {
// const [foo, setFoo, fooSignal] = useSignalState(0)
// useEffect(() => {
// const timeoutId = setInterval(() => {
// setFoo((s) => s + 1)
// consola.info('foo: ', fooSignal())
// }, 1000)
// return () => clearInterval(timeoutId)
// }, [])
// return (
// <Card>
// <h1>Login {foo}</h1>
// </Card>
// )
// }
function useSignalState<T>(): [
  state: T | undefined,
  setState: Dispatch<SetStateAction<T | undefined>>,
  signal: () => T | undefined,
] & {
  setState: Dispatch<SetStateAction<T | undefined>>;
};
function useSignalState<T>(
  defaultValue: (() => T) | T,
): [state: T, setState: Dispatch<SetStateAction<T>>, signal: () => T];

// @see https://github.com/vercel/next.js/issues/45054#issuecomment-1807614658
function useSignalState<T>(defaultValue?: (() => T) | T) {
  const [state, _setState] = useState(defaultValue);
  const ref = useRef(state);

  const setState = useEvent(
    (stateDispatch: Dispatch<SetStateAction<T | undefined>>) => {
      const previousValue = ref.current;

      // @ts-expect-error TODO: fix
      const newValue = shrinkToValue(stateDispatch, [previousValue]);

      // @ts-expect-error TODO: fix
      ref.current = newValue;
      // @ts-expect-error TODO: fix
      _setState(newValue);
    },
  );

  const accessor = () => ref.current;

  accessor.setState = setState;

  return [state, setState, accessor];
}

// merged fn version of {@link useSignalState}
function useSignal<T>(): {
  (): T | undefined;
  setState: Dispatch<SetStateAction<T | undefined>>;
};
function useSignal<T>(defaultValue: (() => T) | T): {
  (): T;
  setState: Dispatch<SetStateAction<T>>;
};

function useSignal<T>(defaultValue?: (() => T) | T) {
  const [, setState, superSignal] = useSignalState(defaultValue);

  (superSignal as any).setState = setState;

  return superSignal;
}

export { useSignal, useSignalState }; // @see https://github.com/raydium-io/raydium-frontend/blob/master/src/hooks/useSignalState.tsx
