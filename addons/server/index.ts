// ?| It's the same thing:
// ?| addons/server = src/server = src/lib
//
/* eslint-disable @stylistic/max-len */
//
// ?| The following are the author's "thoughts spoken aloud". Not everything may be true and should be verified.
// Did you know you can make imports more convenient in your project? You can use `index.ts` files to re-export items, streamlining the import process. However, ensure server-only code remains in the `server` folder. Code that runs on both server and client sides should be placed in the `utils` folder.
// Relivator 1.2.6 does not follow these guidelines, so we need to correct this in version 1.3.0. Typically, server functions are named like `getDoSomething`.
// Additionally, avoid importing code from the `server` folder into `.tsx` files that use React Hooks (e.g., `useHookName`). The exception is when the component utilizes `useTransition` or similar hooks, which enable performing Server Actions within the client component.
//
// =======================================================================

// Re-export from: actions

export * from "./reliverse/actions/cart";

export * from "./reliverse/actions/generate";

export * from "./reliverse/actions/notification";

export * from "./reliverse/actions/order";

export * from "./reliverse/actions/post";

export * from "./reliverse/actions/product";

export * from "./reliverse/actions/signin";

export * from "./reliverse/actions/store";

// Re-export from: api/uploadthing

export * from "./reliverse/api/uploadthing/core";

export * from "./reliverse/api/uploadthing/react";

// Re-export from: etc

export * from "./reliverse/cart";

export * from "./reliverse/currency/currencyValidation";

export * from "./reliverse/currency/errorMessage";

export * from "./reliverse/funcs/client";

export * from "./reliverse/funcs/handler";

export * from "./reliverse/funcs/s-to-v";

export * from "./reliverse/mw";

export * from "./reliverse/pattern";

// Re-export from: etc/v2/currency

export * from "./reliverse/plan";

export * from "./reliverse/queries/notification";

// Re-export from: funcs

export * from "./reliverse/queries/product";

export * from "./reliverse/queries/store";

export * from "./reliverse/queries/user";

// Re-export from: queries

export * from "./reliverse/query";

export * from "./reliverse/resend/index";

export * from "./reliverse/string";

export * from "./reliverse/trpc";

// Re-export from: resend

export * from "./reliverse/utapi";

// Re-export from: validations

export * from "./reliverse/validations/auth";

export * from "./reliverse/validations/cart";

export * from "./reliverse/validations/notification";

export * from "./reliverse/validations/og";

export * from "./reliverse/validations/order";

export * from "./reliverse/validations/parameters";

export * from "./reliverse/validations/product";

export * from "./reliverse/validations/store";

export * from "./reliverse/validations/user";
