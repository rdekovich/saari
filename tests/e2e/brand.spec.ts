import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import AxeBuilder from "@axe-core/playwright";

test("shared colors survive refresh and produce faithful SVG and PNG downloads", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/brand/?art=tin&ink=285344&paper=ffeedd");
  await expect(
    page.getByRole("button", { name: "the tin", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Custom ink color")).toHaveValue("#285344");
  await expect(page.locator("#arrival")).toHaveCount(0);
  const [svgDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "download svg" }).click(),
  ]);
  const svg = await readFile((await svgDownload.path())!, "utf8");
  const original = await readFile("public/brand/tin-symbol.svg", "utf8");
  expect(svg.match(/ d="([^"]+)"/)?.[1]).toBe(
    original.match(/ d="([^"]+)"/)?.[1],
  );
  expect(svg).toContain('fill="#285344"');
  expect(svg).toContain(
    '<rect x="30" y="218" width="1124" height="1124" fill="#ffeedd"',
  );
  await page.getByRole("checkbox", { name: "transparent background" }).check();
  await page.reload();
  await expect(
    page.getByRole("checkbox", { name: "transparent background" }),
  ).toBeChecked();
  await page.getByRole("button", { name: "say hello", exact: true }).click();
  await expect(page.getByRole("button", { name: "download svg" })).toHaveCount(
    0,
  );
  const [pngDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "download png" }).click(),
  ]);
  const png = sharp((await pngDownload.path())!);
  const metadata = await png.metadata();
  expect([metadata.width, metadata.height, metadata.hasAlpha]).toEqual([
    1536,
    1024,
    true,
  ]);
  const { data } = await png.raw().toBuffer({ resolveWithObject: true });
  expect(data[3]).toBe(0);
  let foundInk = false;
  for (let offset = 0; offset < data.length; offset += 4) {
    if (data[offset + 3] > 250) {
      expect([...data.subarray(offset, offset + 3)]).toEqual([40, 83, 68]);
      foundInk = true;
      break;
    }
  }
  expect(foundInk).toBe(true);
  await page.getByRole("button", { name: "Reset artwork and colors" }).click();
  await expect(page.getByLabel("Custom ink color")).toHaveValue("#171916");
  expect(errors).toEqual([]);
});

test("brand navigation, film and controls work in both appearances", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "brand" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "logos & artwork.",
  );
  if (await menu.isVisible()) await menu.click();
  await expect(
    page.getByRole("link", { name: "brand", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  if (await menu.isVisible()) await menu.click();
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "play film" }).click();
  await expect(
    page.getByRole("button", { name: "pause film" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "pause film" }).click();
  await expect(page.getByRole("button", { name: "play film" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("original artwork stays downloadable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/brand/");
  for (const link of await page.locator(".brand-file-list a").all()) {
    const href = await link.getAttribute("href");
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/image\/(svg\+xml|png)/);
  }
  await expect(
    page.getByRole("link", { name: "download film" }),
  ).toHaveAttribute("href", "/motion/tin-reveal.mp4");
  await context.close();
});
