import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
await mkdir("docs/review", { recursive: true });
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    for (const theme of ["light", "dark"]) {
      const page = await browser.newPage({
        viewport: { width, height },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll((images) =>
        Promise.all(
          images.map((img) => {
            img.loading = "eager";
            return img.decode();
          }),
        ),
      );
      await page.screenshot({
        path: `docs/review/${name}-${theme}.png`,
        fullPage: true,
      });
      for (const [route, label] of [
        ["/brand/", "brand"],
        ["/privacy/", "privacy"],
        ["/404/", "404"],
      ]) {
        await page.goto(new URL(route, base).href);
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: `docs/review/${label}-${name}-${theme}.png`,
          fullPage: true,
        });
      }
      if (name === "mobile") {
        await page.getByRole("button", { name: "Menu", exact: true }).click();
        await page
          .getByRole("navigation", { name: "Main navigation" })
          .waitFor();
        await page.screenshot({
          path: `docs/review/menu-${theme}.png`,
          animations: "disabled",
        });
      }
      await page.close();
    }
  }
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto(base);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "docs/review/arrival.png" });
} finally {
  await browser.close();
}
console.log(
  "Captured every page on desktop/mobile in both themes, the mobile menu and arrival film.",
);
