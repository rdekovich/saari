import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("mobile menu closes predictably and leaves section headings below the header", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile disclosure behavior");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "the chef" })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  const header = await page.locator(".site-header").boundingBox();
  const heading = await page.locator("#about-heading").boundingBox();
  expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  await expect(page.locator(".site-name__location")).toBeInViewport();
  await menu.click();
  await page.mouse.click(8, 700);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(await page.locator("body").textContent()).not.toMatch(/[↗↘↙↖↑↓←→↺↻]/u);
});

test("mobile navigation also works without JavaScript", async ({
  browser,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile native disclosure fallback");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/brand/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "the chef" })
    .click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(
    page.getByRole("heading", { name: "hi, i’m jacob." }),
  ).toBeInViewport();
  await context.close();
});
