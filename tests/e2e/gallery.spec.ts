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
    card.getByRole("heading", { name: "barbecued tomatoes", exact: true }),
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
    card.getByRole("heading", { name: "eagle creek trout", exact: true }),
  ).toBeVisible();
  await card.locator("summary").click();
  await expect(card).not.toHaveAttribute("open");
  await context.close();
});

test("full dish notes fit their cards on narrow phones and tablets", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 701]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#gallery");
    await page.evaluate(() => document.fonts.ready);
    for (const card of await page.locator(".photo-card").all()) {
      const toggle = card.locator("summary");
      const closedHeight = (await card.boundingBox())!.height;
      await toggle.click();
      const fits = await card.evaluate((element) => {
        const back = element.querySelector(".photo-card__back")!;
        const bounds = back.getBoundingClientRect();
        const caption = element
          .querySelector(".photo-card__caption")!
          .getBoundingClientRect();
        const content = back.querySelectorAll("h3, .photo-card__note, dt, dd");
        return (
          caption.top >= bounds.bottom - 1 &&
          back.scrollWidth <= back.clientWidth &&
          [...content].every((item) => {
            const rect = item.getBoundingClientRect();
            return (
              rect.left >= bounds.left &&
              rect.right <= bounds.right &&
              rect.bottom <= bounds.bottom
            );
          })
        );
      });
      expect(fits).toBe(true);
      await toggle.click();
      await expect(card).not.toHaveAttribute("open");
      expect((await card.boundingBox())!.height).toBe(closedHeight);
    }
  }
});
