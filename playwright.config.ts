import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

// use a distinct port on CI to avoid
// conflicts during concurrent tests
const PORT = process.env.CI ? 3002 : 3000;

const config: PlaywrightTestConfig = {
  testDir: "./src/tests/pw",
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
  ],
  webServer: {
    command: `PORT=${PORT} pnpm start`,
    reuseExistingServer: true,
    port: PORT,
  },
};

export default config;
