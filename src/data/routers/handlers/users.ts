/**
 * @module zod-schema-user – mostly used to infer the types to be used for its funcs
 * @see https://github.com/rexfordessilfie/next-auth-account-linking/tree/app-router
 * @see https://github.com/Apestein/nextflix/blob/main/src/lib/server-fetchers.ts
 */

import type { Adapter } from "@auth/core/adapters";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { createInsertSchema } from "drizzle-zod";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { ERR } from "~/server/utils";
import { db } from "~/data/db/client";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/data/db/schema";

import { stripe } from "../stripe";
import { getOrCreateStripeCustomerIdForUser } from "./stripe";

const insertUserSchema = createInsertSchema(users);
const selectUserSchema = createInsertSchema(users);
const insertAccountSchema = createInsertSchema(accounts);
const selectAccountSchema = createInsertSchema(accounts);

export type IUser = z.infer<typeof selectUserSchema>;
type IUserInsert = z.infer<typeof insertUserSchema>;
export type IAccount = z.infer<typeof selectAccountSchema>;
type IAccountFind = Pick<IAccount, "providerAccountId" | "provider">;
type IAccountInsert = z.infer<typeof insertAccountSchema>;

export const createUserBackup = async (params: IUserInsert) => {
  const result = await db.insert(users).values(params).returning();
  return result[0];
};

export const createUser = async (params: IUserInsert) => {
  const result = await db.insert(users).values(params).returning();
  return result[0];
};

//? export const createAccount = authAction(
//?   z.object({
//?     name: z.string().min(2).max(20),
//?   }),
//?   async (input, { userId }) => {
//?     // @ts-expect-error
//?     const account = await getUserWithAccounts();
//?     if (account.accounts.length === 4) throw new Error(ERR.not_allowed);
//?     // @ts-expect-error
//?     await db.insert(accounts).values({
//?       // eslint-disable-next-line @typescript-eslint/no-base-to-string
//?       id: `${userId}`,
//?       accountId: userId,
//?       name: input.name,
//?       // todo: implement if user has no image then use this one
//?       image: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${input.name}`,
//?     });
//?     revalidatePath("/dashboard/account");
//?     return { message: "Account Created" };
//?   },
//? );

export const findUserById = async (id: Required<IUser>["id"]) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result.length ? result[0] : null;
};

export async function getUser(userId: Required<IUser>["id"]) {
  if (!userId) throw new Error(ERR.unauthenticated);
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) throw new Error(ERR.db);
  return user;
}

export async function getUserWithActiveAccount(userId: Required<IUser>["id"]) {
  if (!userId) throw new Error(ERR.unauthenticated);
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { activeAccountId: true },
    with: {
      activeAccount: true,
    },
  });
  if (!user) throw new Error(ERR.db);
  return user;
}

export async function getUserWithAccounts(userId: Required<IUser>["id"]) {
  if (!userId) throw new Error(ERR.unauthenticated);
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      accounts: true,
    },
  });
  if (!user) throw new Error(ERR.db);
  return user;
}

export const createAccount = async (params: IAccountInsert | any) => {
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

export async function getAccount(accountId: string) {
  const account = await db.query.accounts.findFirst({
    where: eq(accounts.id, accountId),
  });
  if (!account) throw new Error(ERR.db);
  return account;
}

// todo: implement (currently is not finished)
// import { comments } from "~/data/db/schema";
// import type { Comment, CommentType } from "~/types";
// export async function getComments(limit: number) {
//   const user = await getUserWithActiveAccount();
//   const comments = await db.query.comments.findMany({
//     where: eq(comments.accountId, user.activeAccountId),
//     limit: limit + 1,
//   });
//   const hasReadMore = comments.length > limit ? true : false;
//   if (hasReadMore) comments.pop();
//   return { comments: filteredComments, hasReadMore };
// }
