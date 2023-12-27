"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { getCount } from "./visitors-cursors";

/** @see https://github.com/aidenybai/million/blob/main/website/components/extra-content.tsx */

const LagRadar = dynamic(() => import("react-lag-radar"), { ssr: false });

export function ExtraContent() {
  return (
    <>
      <Status />
    </>
  );
}

/** @see https://liveblocks.io/docs/get-started/nextjs */

export function Status() {
  const [, forceUpdate] = useState({});
  const count = getCount();
  const userString = count > 1 ? "users are" : "user is";
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     forceUpdate({});
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="ml-1 flex items-center gap-2 text-sm text-primary/70">
      <div className="relative flex h-3 w-3">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-500 opacity-75"></div>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="relative inline-flex h-3 w-3 rounded-full bg-zinc-600"></div>
      </div>
      Currently {count} other {userString} online.
    </div>
  );
}
