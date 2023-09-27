import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "~/data/db/client";

export const trpc = createTRPCReact<AppRouter>();
