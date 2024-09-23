"use client";

import type { EffectCallback } from "react";
import { useEffect } from "react";

export default function useOnMount(effect: EffectCallback) {
  useEffect(effect, []);
}
