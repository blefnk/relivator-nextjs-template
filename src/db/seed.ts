import {
  revalidateItems,
  seedCategories,
  seedSubcategories,
} from "~/server/actions/seed";

async function runSeed() {
  console.log("⏳ Running seed...");

  const start = Date.now();

  await seedCategories();

  await seedSubcategories();

  // Add more seed functions here

  await revalidateItems();

  const end = Date.now();

  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
}

runSeed().catch((error) => {
  console.error("❌ Seed failed");
  console.error(error);
  process.exit(1);
});
