import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "~/core/trpc/root";

export const api = createTRPCReact<AppRouter>();
