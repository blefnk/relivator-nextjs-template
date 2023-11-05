/**
 * @module zod-schema-user – mostly used to infer the types to be used for its funcs
 * @see https://github.com/rexfordessilfie/next-auth-account-linking/tree/app-router
 * @see https://github.com/Apestein/nextflix/blob/main/src/lib/server-fetchers.ts
 */

import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "~/data/db";
import { accounts, users } from "~/data/db/schema";

// Zod schemas, primarily being used just for type inference
const insertUserSchema = createInsertSchema(users);
const selectUserSchema = createInsertSchema(users);
const insertAccountSchema = createInsertSchema(accounts);
const selectAccountSchema = createInsertSchema(accounts);

export type IUser = z.infer<typeof selectUserSchema>;
type IUserInsert = z.infer<typeof insertUserSchema>;
export type IAccount = z.infer<typeof selectAccountSchema>;
type IAccountFind = Pick<IAccount, "providerAccountId" | "provider">;
type IAccountInsert = z.infer<typeof insertAccountSchema>;

export const createUser = async (params: IUserInsert) => {
  const result = await db.insert(users).values(params);
  return result[0];
};

// export const updateUser = async (params: IUserInsert) => {
//   const result = await db.insert(users).values(params);
//   return result[0];
// };

export const findUserById = async (id: Required<IUser>["id"]) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result.length ? result[0] : null;
};

export const findUserByEmail = async (id: Required<IUser>["id"]) => {
  const result = await db.select().from(users).where(eq(users.email, id));
  return result.length ? result[0] : null;
};

export const createAccount = async (params: IAccountInsert) => {
  const result = await db.insert(accounts).values(params).returning();

  return result[0];
};

export const findAccount = async (params: IAccountFind) => {
  const result = await db
    .select()
    .from(accounts)
    .where(eq(accounts.providerAccountId, params.providerAccountId))
    .where(eq(accounts.provider, params.provider));

  return result.length ? result[0] : null;
};

export const getUserAccounts = async (userId: Required<IUser>["id"]) => {
  const result = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  return result;
};
