import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const origin = process.env.SITE_URL;
assert.equal(
  origin,
  "https://saari.kitchen",
  "Set SITE_URL=https://saari.kitchen and rebuild before deploying.",
);
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const robots = await readFile("dist/robots.txt", "utf8");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!robots.includes("Disallow: /"));
for (const path of ["/", "/brand/", "/privacy/"]) {
  const html = await readFile(join("dist", path, "index.html"), "utf8");
  assert(
    html.includes(`rel="canonical" href="${origin}${path}"`),
    `Missing canonical: ${path}`,
  );
  assert(!html.includes("noindex"), `Production page is noindex: ${path}`);
  assert(
    sitemap.includes(`<loc>${origin}${path}</loc>`),
    `Missing sitemap entry: ${path}`,
  );
  assert(
    html.includes(`${origin}/brand/tin-social-card.png`),
    `Missing absolute share image: ${path}`,
  );
  assert.equal(
    html.includes('id="arrival"'),
    path === "/",
    `Incorrect intro markup: ${path}`,
  );
  const structured = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.equal(structured.length, path === "/" ? 1 : 0);
  if (path === "/") {
    const graph = JSON.parse(structured[0][1])["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    const profile = graph.find((node) => node["@type"] === "ProfilePage");
    assert(person?.name && person.url === `${origin}/`);
    assert.equal(profile?.mainEntity["@id"], person["@id"]);
    assert(html.includes(`type="text/markdown" href="${origin}/index.md"`));
  }
}
assert(
  (await readFile("dist/llms.txt", "utf8")).includes(`${origin}/index.md`),
);
assert(
  (await readFile("dist/index.md", "utf8")).includes(
    `[saari.kitchen](${origin}/)`,
  ),
);
assert((await readFile("dist/404.html", "utf8")).includes("noindex, nofollow"));
for (const name of [
  "logo-black.svg",
  "logo-white.svg",
  "tin-symbol.svg",
  "private-dinner.png",
  "guest-dinner.png",
  "contact.png",
])
  assert((await stat(`dist/brand/${name}`)).size > 0);

async function checkAssets(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) count += await checkAssets(path);
    else {
      assert(
        (await stat(path)).size <= 25 * 1024 * 1024,
        `Asset exceeds Cloudflare's 25 MiB limit: ${path}`,
      );
      count += 1;
    }
  }
  return count;
}
const count = await checkAssets("dist");
assert(count <= 20_000, "The release exceeds the Workers Free asset limit.");
console.log(
  `Release verified for ${origin}: three public pages, a 404 page, and ${count} files.`,
);
