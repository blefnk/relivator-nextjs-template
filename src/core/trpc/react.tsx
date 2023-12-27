"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into its own file with "use client" on the top
import { useState } from "react";
import { QueryNormalizerProvider } from "@normy/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import { api } from "~/core/trpc";
import { env } from "~/env.mjs";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browsers => use relative url
  if (env.VERCEL_URL) return env.VERCEL_URL; // deployed SSR should use vercel url
  return `http://localhost:${env.PORT ?? 3000}`; // dev mode SSR should use localhost
};

export function TRPC(props: { children: React.ReactNode; data: Headers }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const heads = new Map(props.data);
            heads.set("x-trpc-source", "react");
            return Object.fromEntries(heads);
          },
        }),
      ],
    }),
  );

  return (
    <QueryNormalizerProvider
      queryClient={queryClient}
      normalizerConfig={{ devLogging: true }}
    >
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration transformer={superjson}>
            {props.children}
          </ReactQueryStreamedHydration>
          {env.NEXT_PUBLIC_CSP_XSS === "true" ?
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
              styleNonce="tanstack"
            />
          : <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            />
          }
        </QueryClientProvider>
      </api.Provider>
    </QueryNormalizerProvider>
  );
}

/**
 * @see https://github.com/klis87/normy#readme
 * @see https://github.com/t3-oss/create-t3-turbo/blob/main/apps/nextjs/src/app/providers.tsx
 */
