import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  /**
   * Mark the app as mounted in the client
   */
  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
