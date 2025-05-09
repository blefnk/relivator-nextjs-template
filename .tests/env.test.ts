import { expect, test } from "bun:test";

test("all required environment variables are defined based on .env.example", async () => {
  let expectedEnvVars: string[] = [];
  const envExamplePath = ".env.example";

  const envExampleFile = Bun.file(envExamplePath);
  if (!(await envExampleFile.exists())) {
    throw new Error(
      `❌ required file '${envExamplePath}' not found in project root. this test relies on it to determine expected env variables.`,
    );
  }

  try {
    const envExampleContent = await envExampleFile.text();
    expectedEnvVars = envExampleContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const firstEqualSign = line.indexOf("=");
        if (firstEqualSign === -1) return null;
        const key = line.substring(0, firstEqualSign).trim();
        return key || null;
      })
      .filter((varName) => varName !== null) as string[];

    if (expectedEnvVars.length === 0 && envExampleContent.trim().length > 0) {
      console.warn(
        `⚠️ no variables parsed from ${envExamplePath}, but the file is not empty. ensure it contains valid 'KEY=value' lines not starting with '#'.`,
      );
    }
  } catch (error: any) {
    throw new Error(
      `❌ failed to read or parse '${envExamplePath}' (file exists, but there was an issue reading or parsing it). error: ${error.message || String(error)}`,
    );
  }

  const polarVars = ["POLAR_ACCESS_TOKEN", "POLAR_WEBHOOK_SECRET", "POLAR_ENVIRONMENT"];
  
  const missingVars: string[] = [];
  for (const varName of expectedEnvVars) {
    if (polarVars.includes(varName)) {
      continue;
    }
    
    if (!(varName in process.env) || !process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    // this is a bit of a trick to get a nice error message with all missing vars
    // bun:test usually truncates long strings in expect messages,
    // so logging it directly is more reliable for ci/debugging.
    console.error(
      "❌ missing environment variables (expected from .env.example):",
      JSON.stringify(missingVars, null, 2),
    );
  }

  expect(missingVars).toEqual([]);
});

// utility to parse .env.example and return a map of key -> value
async function getEnvExamplePlaceholders() {
  const envExamplePath = ".env.example";
  const envExampleFile = Bun.file(envExamplePath);
  if (!(await envExampleFile.exists())) {
    throw new Error(
      `❌ required file '${envExamplePath}' not found in project root. this test relies on it to determine expected env variables.`,
    );
  }
  const envExampleContent = await envExampleFile.text();
  const lines = envExampleContent.split("\n");
  const placeholders: Record<string, string> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.substring(0, eqIdx).trim();
    let value = trimmed.substring(eqIdx + 1).trim();
    // remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    placeholders[key] = value;
  }
  return placeholders;
}

test("sensitive environment variables should not be placeholders from .env.example", async () => {
  const placeholders = await getEnvExamplePlaceholders();
  // get all keys except those whose value starts with http:// or https://
  const sensitiveEnvKeys = Object.entries(placeholders)
    .filter(
      ([, value]) =>
        !(value.startsWith("http://") || value.startsWith("https://")),
    )
    .map(([key]) => key);
  for (const key of sensitiveEnvKeys) {
    if (process.env[key]) {
      expect(process.env[key]).not.toBe(placeholders[key]);
    }
  }
});
