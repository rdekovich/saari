import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { pageForPath } from "../../src/config/pages";
import { publicSiteOrigin } from "../../build/publicSite";
import { renderPageHtml } from "../../build/siteHtml";
import { metadata } from "../../src/config/site";
import sharp from "sharp";

test("public origins reject credentials and paths; previews stay unindexed", () => {
  expect(publicSiteOrigin()).toBeNull();
  expect(publicSiteOrigin("https://saari.kitchen")).toBe(
    "https://saari.kitchen",
  );
  for (const value of [
    "http://saari.kitchen",
    "https://user:pass@saari.kitchen",
    "https://saari.kitchen/path",
    "https://saari.kitchen?test=1",
  ])
    expect(() => publicSiteOrigin(value)).toThrow();
});
test("direct URLs and malformed paths select the right page", () => {
  expect(pageForPath("/")).toBe("home");
  expect(pageForPath("/privacy/?from=footer")).toBe("privacy");
  expect(pageForPath("/does-not-exist")).toBe("notFound");
});
test("both website colorways preserve the exact approved artwork", async () => {
  const path = (s: string) => s.match(/ d="([^"]+)"/)?.[1];
  const source = path(
    await readFile("assets/source/brand/approved-logo.svg", "utf8"),
  );
  expect(source).toBeTruthy();
  for (const color of ["black", "white"])
    expect(path(await readFile(`public/brand/logo-${color}.svg`, "utf8"))).toBe(
      source,
    );
});

test("tin icons preserve the illustration contours without the lettering", async () => {
  const path = (svg: string) => svg.match(/ d="([^"]+)"/)![1];
  const source = path(
    await readFile("assets/source/brand/approved-logo.svg", "utf8"),
  );
  const tin = path(await readFile("public/brand/tin-symbol.svg", "utf8"));
  expect(tin).toBe(
    source
      .match(/M[^M]*/g)!
      .slice(16)
      .join(""),
  );
  expect(path(await readFile(`public${metadata.favicon}`, "utf8"))).toBe(tin);
  for (const [file, size] of [
    [metadata.faviconPng, 96],
    [metadata.appleTouchIcon, 180],
  ] as const) {
    const info = await sharp(`public${file}`).metadata();
    expect([info.width, info.height]).toEqual([size, size]);
  }
});

test("static metadata supplies share artwork and omits the intro on subpages", async () => {
  const template = await readFile("index.html", "utf8");
  const home = renderPageHtml(template, "home", "https://saari.kitchen");
  expect(home).toContain("<title>jacob saari, chef</title>");
  for (const attribute of ['property="og:image"', 'name="twitter:image"'])
    expect(home).toContain(
      `${attribute} content="https://saari.kitchen${metadata.socialImage}"`,
    );
  expect(home).toContain('property="og:image:width" content="1200"');
  expect(home).toContain(
    `rel="icon" type="image/png" sizes="96x96" href="${metadata.faviconPng}"`,
  );
  expect(home).toContain(
    `rel="apple-touch-icon" sizes="180x180" href="${metadata.appleTouchIcon}"`,
  );
  expect(home).toContain('id="arrival-video"');
  for (const page of ["privacy", "notFound"] as const) {
    const html = renderPageHtml(home, page, "https://saari.kitchen");
    expect(html).toContain(`<html lang="en" data-page="${page}">`);
    expect(html).not.toContain('id="arrival"');
    expect(html).not.toContain("tin-intro.mp4");
  }
  const image = await sharp(`public${metadata.socialImage}`).metadata();
  expect([image.width, image.height]).toEqual([1200, 630]);
});
