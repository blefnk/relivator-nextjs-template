import { useEffect } from "react";

export function useOnMount(effect: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(effect, []);
}
