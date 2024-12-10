import "dotenv/config";
import consola from "consola";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "~/env";
import {
  revalidateItems,
  seedCategories,
  seedSubcategories,
} from "~/server/actions/seed";
import { usersTable } from "~/server/db/schema";

// Initialize the database connection
const db = drizzle(env.DATABASE_URL);

async function main() {
  consola.info("⏳ Running seed...");
  const start = Date.now();

  const user = {
    name: "John",
    age: 30,
    email: "john@example.com",
    currentStoreId: "",
  };
  const { email } = user;

  try {
    // Start transaction
    await db.transaction(async (trx) => {
      // Check if the user already exists
      const existingUser = await trx
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        consola.info(`User with email ${email} already exists!`);
        const confirm = await consola.prompt(
          "Do you want to remove the user?",
          { type: "confirm" },
        );

        if (confirm) {
          await trx.delete(usersTable).where(eq(usersTable.email, email));
          consola.success(`User deleted: ${email}`);

          // Recreate the user after deletion
          await trx.insert(usersTable).values(user);
          consola.success("New user created after deletion!");
        } else {
          consola.info("Skipped user deletion.");
        }
      } else {
        // Insert the new user if not existing
        await trx.insert(usersTable).values(user);
        consola.success("New user created!");
      }

      // Update user's age
      await trx
        .update(usersTable)
        .set({ age: 31 })
        .where(eq(usersTable.email, email));
      consola.success("User info updated!");

      // Seed additional data
      await seedCategories();
      await seedSubcategories();
      await revalidateItems();

      const end = Date.now();
      consola.success(`✅ Seed completed in ${end - start}ms`);
    });
  } catch (error) {
    consola.error("❌ Seed failed:", error);
    process.exit(1);
  }

  process.exit(0);
}

// Run main function and handle any uncaught errors
main().catch((err) => {
  consola.error("❌ Seed's main function failed");
  consola.error(err);
  process.exit(1);
});
