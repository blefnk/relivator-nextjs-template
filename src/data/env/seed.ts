/**
 * The Drizzle ORM seed function with using PostgresJS driver
 * The script can be run with the next command: `pnpm db:seed`
 *
 * todo: implement the beginners-friendly drizzle seed function
 *
 * @see https://github.com/vercel/examples/blob/main/storage/postgres-drizzle/lib/seed.ts
 * @see https://discord.com/channels/1043890932593987624/1148264841878974615/1148325353463500820
 */

import path from "node:path";

import dotenv from "dotenv";

import { db } from "~/data/db/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const newUsers = [
  {
    name: "Guillermo Rauch",
    email: "rauchg@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg",
  },
  {
    name: "Lee Robinson",
    email: "lee@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg",
  },
  {
    name: "Delba de Oliveira ",
    email: "delba@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1542995651105013764/UHOMfKMW_400x400.jpg",
  },
];

// todo: implement (details on the top)

async function main() {
  console.log("Nothing to seed.");
}

console.log("🚀 Starting seed...");

main()
  .then(() => {
    console.log("✅ Seed complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Seed failed! Error:", err);
    process.exit(1);
  });
