import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/hosting",
  outputDir: "test-results/hosting",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:8788",
    reducedMotion: "reduce",
    launchOptions: { args: ["--no-sandbox"] },
  },
  webServer: {
    command:
      "npx wrangler dev --local --ip 127.0.0.1 --port 8788 --log-level error",
    env: { WRANGLER_SEND_METRICS: "false" },
    url: "http://127.0.0.1:8788",
    timeout: 30_000,
    reuseExistingServer: false,
  },
});
