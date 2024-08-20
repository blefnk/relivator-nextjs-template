"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useRef } from "react";

import { debugEnabled } from "~/../reliverse.config";
import consola from "consola";

import type { StoreType } from "~/components/Modules/Zustand/zu-store";

import { initializeStore } from "~/components/Modules/Zustand/zu-store";

// # Zustand
// Current implementation of the Zustand is possibly outdated.
// eslint-disable-next-line @stylistic/max-len
// TODO: Remove Zustand in Relivator 1.3.0, move Zustand integration into @reliverse/addons to have manual selection with the `reliverse` command.
// For new implementation @see <https://docs.pmnd.rs/zustand/guides/nextjs>
const ZustandProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>(null);

  if (!storeRef.current) {
    // @ts-expect-error TODO: fix
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

function Provider({
  children,
  value,
}: {
  children: ReactNode;
  value: StoreType;
}) {
  if (debugEnabled) {
    consola.info("ZustandProvider.Provider", String(value));
  }

  return <>{children}</>;
}

export default ZustandProvider;
