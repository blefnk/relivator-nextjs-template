// `bun addons/seed.ts`

import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { userTable } from "~/db/schema";

const db = drizzle(process.env.DATABASE_URL ?? "");

async function main() {
  const user: typeof userTable.$inferInsert = {
    id: "1",
    name: "Trevor",
    age: 30,
    email: "trevor.fair@bleverse.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(userTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(userTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(userTable)
    .set({ age: 31 })
    .where(eq(userTable.email, user.email));
  console.log("User info updated!");

  await db.delete(userTable).where(eq(userTable.email, user.email));
  console.log("User deleted!");

  console.log("Exiting...");
}

await main();
