"use client";

import type { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "~/liveblocks.config";

import { env } from "~/env.mjs";
import { FakeLoadingVariantOne } from "~/islands/fake-loading";

// TODO: W.I.P.

/** @see https://liveblocks.io/docs/get-started/nextjs */

export function Room({ children }: { children: ReactNode }) {
  return (
    <>
      {env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ?
        // @ts-expect-error ...
        <RoomProvider id="my-room" initialPresence={{}}>
          {/* <ClientSideSuspense fallback={<div>Loading…</div>}> */}
          {/* <ClientSideSuspense fallback={<FakeLoadingVariantOne />}> */}
          {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
          <ClientSideSuspense fallback={<></>}>
            {() => children}
          </ClientSideSuspense>
        </RoomProvider>
      : null}
    </>
  );
}
