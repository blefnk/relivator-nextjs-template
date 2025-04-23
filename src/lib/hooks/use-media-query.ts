"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Start with false during SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Update the state on client-side
    setMatches(window.matchMedia(query).matches);

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
