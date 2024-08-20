import { config } from "dotenv";

config({ path: ".env" });

// Unified Schema Exporter for Multiple Databases
// ==============================================
// Please uncomment database schema you want to activate
// corresponding to the chosen provider in the .env file
// Configure this index based on the database provider
// Feel free to add, remove, or edit things as needed
// You may also need to edit drizzle.config.ts
// Verify also: index.ts in schema and table.ts
// ==============================================
//
// export { db } from "./mysql";
// export { db } from "./planetscale";
// export { db } from "./postgres";
// export { db } from "./sqlite"; // not fully tested
// export { db } from "./turso"; // not fully tested
//
export { db } from "./db/neon";
