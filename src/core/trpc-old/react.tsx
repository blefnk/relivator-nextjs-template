"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { QueryNormalizerProvider } from "@normy/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { hideTanstackDevtools } from "~/../reliverse.config";
import superjson from "superjson";

import { api } from "~/core/trpc-old/api";
import { env } from "~/env";

// We cannot useState or useRef in a server component, which is why we are
// extracting this part out into its own file with "use client" on the top
export function TRPC(props: {
  children: ReactNode;
  data: Headers;
}) {
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
      links: [
        loggerLink({
          enabled: (options) =>
            env.NODE_ENV === "development" ||
            (options.direction === "down" && options.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers() {
            const heads = new Map(props.data);

            heads.set("x-trpc-source", "react");

            return Object.fromEntries(heads);
          },
          transformer: superjson,
          url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <QueryNormalizerProvider
      normalizerConfig={{
        devLogging: true,
      }}
      queryClient={queryClient}
    >
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration transformer={superjson}>
            {props.children}
          </ReactQueryStreamedHydration>
          {!hideTanstackDevtools && (
            <>
              <ReactQueryDevtools
                buttonPosition="bottom-left"
                initialIsOpen={false}
              />
              {/* {env.NEXT_PUBLIC_CSP_XSS === "true" ? (
                <ReactQueryDevtools
                  buttonPosition="bottom-left"
                  initialIsOpen={false}
                  styleNonce="tanstack"
                />
              ) : (
                <ReactQueryDevtools
                  buttonPosition="bottom-left"
                  initialIsOpen={false}
                />
              )} */}
            </>
          )}
        </QueryClientProvider>
      </api.Provider>
    </QueryNormalizerProvider>
  );
}
