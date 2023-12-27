/** @see https://github.com/raydium-io/raydium-frontend/blob/master/src/hooks/useIsomorphicLayoutEffect.tsx */

import { useEffect, useLayoutEffect } from "react";

import { inClient } from "~/server/funcs/is-ssr";

export const useIsomorphicLayoutEffect = inClient ? useLayoutEffect : useEffect;
