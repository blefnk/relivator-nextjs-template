"use client";

import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useURLState(
  query: string,
): [string, (value: string) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const [state, setState] = useState(
    (searchParameters && searchParameters.get(query)) || "",
  );

  const updateState = (value: string) => {
    const current = new URLSearchParams([
      ...((searchParameters && searchParameters.entries()) || []),
    ]);

    if (!value.trim()) {
      current.delete(query);
    } else {
      current.set(query, value);
    }

    setState(value);

    const search = current.toString();

    const newUrl = `${pathname}${search ? `?${search}` : ""}`;

    router.push(newUrl as never);
  };

  return [state, updateState];
}
