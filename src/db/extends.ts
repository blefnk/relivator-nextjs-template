import { timestamp } from "drizzle-orm/pg-core";

// TODO: this is a concept to have something like this: ...id("user")
// TODO: but the current implementation didn't work with drizzle's types
// export function id(name: keyof typeof tables & keyof typeof prefixes) {
//   return {
//     [name]: text(name)
//       .primaryKey()
//       .$defaultFn(() => genId(name)),
//   };
// }
export const createdUpdatedAt = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
  })
    .notNull()
    .$onUpdate(() => new Date()),
};
