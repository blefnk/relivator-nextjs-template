import type { DefaultOptions } from "@tanstack/react-query";

import { QueryClient } from "@tanstack/react-query";

export const defaultQueryOptions = {
  queries: {
    staleTime: 1000 * 60 * 1, // 1 minute
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});
