import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const colorScheme of ["light", "dark"] as const) {
  test(`intro fades in place in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (...args) {
        const animation = animate.apply(this, args);
        if (this.id === "arrival") animation.pause();
        return animation;
      };
    });
    await page.goto("/");
    const art = page.locator(".arrival__art");
    const before = await art.boundingBox();
    await page.waitForFunction(
      () =>
        (document.getElementById("arrival-video") as HTMLVideoElement)
          .readyState >= 2,
    );
    const duration = await page
      .locator("#arrival-video")
      .evaluate((element) => {
        const video = element as HTMLVideoElement;
        video.currentTime = video.duration;
        video.dispatchEvent(new Event("ended"));
        return video.duration;
      });
    expect(duration).toBeLessThanOrEqual(2.5);
    await expect(page.locator("html")).toHaveAttribute(
      "data-arrival",
      "leaving",
    );
    await page.locator("#arrival").evaluate((shell) => {
      for (const animation of shell.getAnimations()) animation.currentTime = 90;
    });
    expect(await art.boundingBox()).toEqual(before);
    await expect(page.locator(".arrival__backdrop")).toHaveCSS("opacity", "1");
    const opacity = await page
      .locator("#arrival")
      .evaluate((shell) => Number(getComputedStyle(shell).opacity));
    expect(opacity).toBeGreaterThan(0);
    expect(opacity).toBeLessThan(1);
    await page.locator("#arrival").evaluate((shell) => {
      for (const animation of shell.getAnimations()) animation.finish();
    });
    await expect(page.locator("html")).toHaveAttribute(
      "data-arrival",
      "complete",
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("subpages bypass the intro before application code loads", async ({
  page,
}) => {
  const films: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) films.push(request.url());
  });
  await page.route("**/assets/*.js", (route) => route.abort());
  for (const path of ["/brand/", "/privacy/", "/404.html"]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute(
      "data-arrival",
      "complete",
    );
    await expect(page.locator("#arrival")).toHaveCount(0);
    await expect(page.locator("#root")).not.toHaveAttribute("inert");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "open the tin again" }),
    ).toHaveCount(0);
  }
  expect(films).toEqual([]);
});

test("short intro runs on every home refresh and releases the page", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-arrival", "running");
  await expect(page.locator("#root")).toHaveAttribute("inert", "");
  await expect(page.locator("html")).toHaveAttribute(
    "data-arrival",
    "complete",
    { timeout: 10_000 },
  );
  await expect(page.locator("#root")).not.toHaveAttribute("inert");
  await expect(page.locator("#arrival")).toBeHidden();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-arrival", "running");
  await page.getByRole("button", { name: "skip intro" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-arrival",
    "complete",
  );
  expect(errors).toEqual([]);
});

test("reduced motion, theme persistence, navigation and accessible enquiry", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("#arrival")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "fish, fire",
  );
  const theme = page.getByRole("switch", { name: "Dark mode" });
  await theme.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(theme).toHaveAttribute("aria-checked", "true");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#171916",
  );
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "say hello" })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(
    page.getByRole("link", { name: "jacob@saari.kitchen" }),
  ).toHaveAttribute("href", "mailto:jacob@saari.kitchen");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await theme.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(theme).toHaveAttribute("aria-checked", "false");
  await expect(
    page.getByRole("link", { name: "privacy", exact: true }),
  ).toHaveCSS("color", "rgb(100, 101, 93)");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("system appearance updates live, including storage denied browsers", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.goto("/");
  const theme = page.getByRole("switch", { name: "Dark mode" });
  await expect(theme).toHaveAttribute("aria-checked", "true");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(theme).toHaveAttribute("aria-checked", "false");
  await theme.click();
  await expect(theme).toHaveAttribute("aria-checked", "true");
});

test("a broken film cannot trap the visitor", async ({ page }) => {
  await page.route("**/tin-intro.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-arrival",
    "complete",
    { timeout: 10_000 },
  );
  await expect(page.locator("#root")).not.toHaveAttribute("inert");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("all content and email links work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator("#arrival")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "jacob@saari.kitchen" }),
  ).toHaveAttribute("href", "mailto:jacob@saari.kitchen");
  await page.getByRole("link", { name: "privacy", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "privacy, plainly." }),
  ).toBeVisible();
  await context.close();
});
