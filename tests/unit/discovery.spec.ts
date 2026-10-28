import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import {
  homeStructuredData,
  renderHomeMarkdown,
  renderLlms,
  serializeStructuredData,
} from "../../build/discovery";
import { renderPageHtml } from "../../build/siteHtml";
import { biography, introduction, offerings } from "../../src/config/content";
import { business, social } from "../../src/config/site";
import { chefPortrait } from "../../src/config/artwork";

const origin = "https://saari.kitchen";

test("chef identity links the website and profile to one person", () => {
  const { "@graph": graph } = homeStructuredData(origin);
  const person = graph.find((node) => node["@type"] === "Person")!;
  const profile = graph.find((node) => node["@type"] === "ProfilePage")!;
  const website = graph.find((node) => node["@type"] === "WebSite")!;
  expect(profile.mainEntity).toEqual({ "@id": person["@id"] });
  expect(profile.isPartOf).toEqual({ "@id": website["@id"] });
  expect(person.name).toBe(business.fullName);
  expect(person.jobTitle).toBe(business.role);
  expect(person.worksFor?.name).toBe(business.restaurant);
  expect(person.image).toBe(`${origin}${chefPortrait.src}`);
  expect(person.sameAs).toEqual([social.instagram.url, social.linkedin.url]);
  expect(graph.map((node) => node["@type"])).toEqual([
    "WebSite",
    "ProfilePage",
    "Person",
  ]);
});

test("discovery metadata does not leak into previews or unrelated pages", async () => {
  const template = await readFile("index.html", "utf8");
  const home = renderPageHtml(template, "home", origin);
  const repeated = renderPageHtml(home, "home", origin);
  expect(repeated.match(/type="application\/ld\+json"/g)).toHaveLength(1);
  expect(repeated).toContain('rel="alternate" type="text/markdown"');
  for (const page of ["home", "brand", "privacy", "notFound"] as const) {
    const preview = renderPageHtml(home, page);
    expect(preview).toContain('content="noindex, nofollow"');
    expect(preview).not.toContain('type="application/ld+json"');
    expect(preview).not.toContain('rel="describedby"');
    if (page !== "home") {
      const subpage = renderPageHtml(home, page, origin);
      expect(subpage).not.toContain('type="application/ld+json"');
      expect(subpage).not.toContain('type="text/markdown"');
    }
  }
});

test("structured content cannot terminate its script element", () => {
  const content = { name: '</script><script>alert("example")</script>' };
  const serialized = serializeStructuredData(content);
  expect(serialized).not.toContain("<");
  expect(JSON.parse(serialized)).toEqual(content);
});

test("agent text stays faithful to the published copy and profile links", () => {
  const markdown = renderHomeMarkdown(origin);
  for (const paragraph of [
    introduction.description,
    ...biography.paragraphs,
    ...offerings.map((item) => item.description),
  ])
    expect(markdown).toContain(paragraph);
  for (const kitchen of biography.kitchens)
    expect(markdown).toContain(kitchen.name);
  const llms = renderLlms(origin);
  expect(llms).toContain(`# ${business.fullName}`);
  expect(llms).toContain(`${origin}/index.md`);
  for (const profile of Object.values(social)) {
    expect(llms).toContain(profile.url);
    expect(markdown).toContain(profile.url);
  }
});
