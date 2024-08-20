// Unified Schema Exporter for Multiple Databases
// ==============================================
// Supports both MySQL and PostgreSQL, enabling consistent table imports across the app.
// Uses environment variables for schema selection, compatible with PlanetScale, Neon, Vercel,
// and Railway providers. Aims to maintain schema consistency and minimize table mismatches.
// Includes instructions, resources, inspirations at the end of file.
// Check {dialect}.ts files to see the detailed database structures.
// Please uncomment database schema you want to activate
// corresponding to the chosen provider in the .env file
// Configure this index based on the database provider
// Feel free to add, remove, or edit things as needed
// You may also need to edit drizzle.config.ts
// Please also check: table.ts and index.ts files
// export * from "./models/mysql";
// export * from "./types/mysql";
// export * from "./models/sqlite";
// export * from "./types/sqlite";
export * from "./insert/pgsql";

export * from "./pgsql";

export * from "./types/pgsql";
