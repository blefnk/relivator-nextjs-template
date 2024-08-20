// import { z } from "zod";

// import type { DragEvent } from "react";

// import { faker } from "@faker-js/faker";
// import destr from "destr";
// import superjson from "superjson";

const isFunction = (a: unknown): a is (...arguments_: any[]) => any =>
  typeof a === "function";

// const CONTENT_TYPE = "application/remix-card";

// const TransferSchema = z.object({
//   id: z.string(),
//   title: z.string(),
// });

// export const isCardTransfer = (event_: DragEvent) =>
//   event_.dataTransfer.types.includes(CONTENT_TYPE);

// export const createTransfer = (
//   dt: DataTransfer,
//   data: z.infer<typeof TransferSchema>,
// ) => {
//   dt.setData(CONTENT_TYPE, superjson.stringify(data));
// };

// export const parseTransfer = (dt: DataTransfer) =>
//   TransferSchema.parse(destr(dt.getData(CONTENT_TYPE)));

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function invariant<T>(
  condition: null | T | undefined,
  message?: (() => string) | string,
): boolean {
  if (condition) {
    return true;
  }

  const provided = isFunction(message) ? message() : message;
  const prefix = "Invariant failed";
  const value = provided ? `${prefix}: ${provided}` : prefix;

  throw new Error(value);
}

// export function genRandomName() {
//   return faker.animal.snake().replace(/\s/g, "-").toLowerCase();
// }
