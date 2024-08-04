import tryToCatch from "try-to-catch";

// @file src/utils/execa/test.ts
// @usage pnpm tsx src/utils/execa/test.ts (it runs `pnpm check:execa` while uses check.ts)
// ⛔ Unfinished. Does not work yet.
import { InputError } from "@/server/reliverse/errors/modern";
import execute from "@/server/reliverse/execa/execute";

const [cause] = await tryToCatch(execute, "check:execa");

if (cause) {
  throw new InputError("⛔ Failed to execute the command: pnpm check:execa", {
    cause,
  });
}

execute("check:execa");
