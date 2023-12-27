/** @see https://github.com/vercel/next.js/issues/45054#issuecomment-1807614658 */

import { useEffect, useState } from "react";
import { effect, Signal } from "@preact/signals-core";

export function useSignalState<T>(signal: Signal<T>) {
  const [state, setState] = useState<T>(signal.value);

  useEffect(() => {
    return effect(() => setState(signal.value));
  }, [signal]);

  return state;
}
