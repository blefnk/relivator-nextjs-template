import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useURLState(query: string): [string, (value: string) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState(searchParams.get(query) ?? "");

  const updateState = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

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
