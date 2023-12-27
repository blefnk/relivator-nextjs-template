"use client";

import { useRef, type PropsWithChildren } from "react";

import type { StoreType } from "./zu-store";
import { initializeStore, Provider } from "./zu-store";

const ZustandProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export default ZustandProvider;
