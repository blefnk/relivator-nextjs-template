import { runReliverseSetup } from "@/scripts/reliverse/relicon/setup";
import { argv } from "process";

const setupFlag = argv.includes("--setup");
const setupArgv = argv.includes("setup");

// pnpm tsx reliverse.setup.ts
if (setupFlag || setupArgv) {
  await runReliverseSetup();
}
