/* eslint-disable @stylistic/max-len */
// ?| It's the same thing: addons/server = src/server = src/lib
// ?| The following are the author's "thoughts spoken aloud". Not everything may be true and should be verified.
// Did you know you can make imports more convenient in your project? You can use `index.ts` files to re-export items, streamlining the import process. However, ensure server-only code remains in the `server` folder. Code that runs on both server and client sides should be placed in the `utils` folder.
// Relivator 1.2.6 does not follow these guidelines, so we need to correct this in version 1.3.0. Typically, server functions are named like `getDoSomething`.
// Additionally, avoid importing code from the `server` folder into `.tsx` files that use React Hooks (e.g., `useHookName`). The exception is when the component utilizes `useTransition` or similar hooks, which enable performing Server Actions within the client component.
// =======================================================================

export * from "./reliverse/api/uploadthing/core";

export * from "./reliverse/api/uploadthing/react";

export * from "./reliverse/cart";

export * from "./reliverse/currency/currencyValidation";

export * from "./reliverse/errors/helpers/auth";

export * from "./reliverse/errors/helpers/field";

export * from "./reliverse/errors/helpers/server";

export * from "./reliverse/errors/helpers/server/api-error";

export * from "./reliverse/errors/helpers/server/error-response";

export * from "./reliverse/errors/helpers/server/nextjs-error";

export * from "./reliverse/errors/helpers/server/unauthorized-error";

export * from "./reliverse/errors/helpers/server/validation-error";

export * from "./reliverse/errors/message";

export * from "./reliverse/errors/modern";

export * from "./reliverse/errors/plugin";

export * from "./reliverse/errors/test";

export * from "./reliverse/funcs/client";

export * from "./reliverse/funcs/handler";

export * from "./reliverse/funcs/s-to-v";

export * from "./reliverse/mw";

export * from "./reliverse/pattern";

export * from "./reliverse/plan";

export * from "./reliverse/queries/notification";

export * from "./reliverse/queries/product";

export * from "./reliverse/queries/store";

export * from "./reliverse/queries/user";

export * from "./reliverse/query";

export * from "./reliverse/resend";

export * from "./reliverse/string";

export * from "./reliverse/trpc";

export * from "./reliverse/utapi";
