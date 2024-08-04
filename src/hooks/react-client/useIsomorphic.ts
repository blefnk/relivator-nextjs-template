"use client";

import { useEffect, useLayoutEffect } from "react";

import { useIsClient } from "@uidotdev/usehooks";

const isMounted = useIsClient();

const useIsomorphicLayoutEffect = isMounted ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect };

export default useIsomorphicLayoutEffect;
