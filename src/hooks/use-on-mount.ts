import { useEffect } from "react";

export function useOnMount(effect: React.EffectCallback) {
  return useEffect(effect, []);
}
