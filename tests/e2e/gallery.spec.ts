import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("photograph notes turn over with pointer and keyboard in both themes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#gallery");
  const card = page.locator(".photo-card").first();
  const toggle = card.locator("summary");
  await expect(card.locator("img")).toBeVisible();
  await toggle.click();
  await expect(card).toHaveAttribute("open", "");
  await expect(
    card.getByRole("heading", { name: "[dish name]", exact: true }),
  ).toBeVisible();
  await expect(card.locator(".photo-card__back")).toHaveCSS(
    "animation-name",
    "none",
  );
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(card).not.toHaveAttribute("open");
  await page.keyboard.press("Enter");
  await expect(card).toHaveAttribute("open", "");
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    const result = await new AxeBuilder({ page })
      .include("#gallery")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("gallery photographs and notes remain usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/#gallery`);
  const cards = page.locator(".photo-card");
  await expect(cards).toHaveCount(6);
  const card = cards.nth(1);
  await card.locator("summary").click();
  await expect(
    card.getByRole("heading", { name: "[dish name]", exact: true }),
  ).toBeVisible();
  await card.locator("summary").click();
  await expect(card).not.toHaveAttribute("open");
  await context.close();
});
