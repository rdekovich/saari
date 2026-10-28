import { expect, test } from "@playwright/test";
import { stat } from "node:fs/promises";
test("Cloudflare serves real HTML, redirects and a real 404", async ({
  request,
}) => {
  for (const path of ["/", "/brand/", "/privacy/"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(await response.text()).toContain('data-prerendered="true"');
  }
  const redirect = await request.get("/privacy?from=footer", {
    maxRedirects: 0,
  });
  expect(redirect.status()).toBe(307);
  expect(redirect.headers().location).toBe("/privacy/?from=footer");
  const missing = await request.get("/not-on-the-menu");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("nothing on the menu here.");
  const film = await request.get("/motion/tin-intro.mp4", {
    headers: { Range: "bytes=0-99" },
  });
  expect([200, 206]).toContain(film.status());
  expect(film.headers()["content-type"]).toContain("video/mp4");
  const bytes = await film.body();
  expect(bytes.subarray(4, 8).toString()).toBe("ftyp");
  expect(bytes.length).toBe(
    film.status() === 206
      ? 100
      : (await stat("public/motion/tin-intro.mp4")).size,
  );
});

test("discovery text is crawlable while its HTML page remains canonical", async ({
  request,
}) => {
  for (const [path, type] of [
    ["/llms.txt", "text/plain"],
    ["/index.md", "text/markdown"],
  ]) {
    const response = await request.get(path);
    if (!process.env.SITE_URL) {
      expect(response.status()).toBe(404);
      continue;
    }
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(type);
    expect(response.headers()["x-robots-tag"]).toBe("noindex");
    expect(response.headers().link).toContain(
      '<https://saari.kitchen/>; rel="canonical"',
    );
    expect((await response.text()).toLowerCase()).toContain("jacob saari");
  }
});
