import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer, loadEnv } from "vite";
const vite = await createServer({
  mode: "production",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, watch: null },
});
try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { pages } = await vite.ssrLoadModule("/src/config/pages.ts");
  const { renderPageHtml } = await vite.ssrLoadModule("/build/siteHtml.ts");
  const { publicSiteOrigin } = await vite.ssrLoadModule("/build/publicSite.ts");
  const { renderLlms, renderHomeMarkdown } = await vite.ssrLoadModule(
    "/build/discovery.ts",
  );
  const origin = publicSiteOrigin(
    loadEnv("production", process.cwd(), "").SITE_URL,
  );
  const html = await readFile("dist/index.html", "utf8");
  const marker = /<!--app-start-->[\s\S]*?<!--app-end-->/;
  if (!marker.test(html)) throw new Error("Missing pre-render outlet");
  for (const [page, config] of Object.entries(pages)) {
    const output = join("dist", config.output);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(
      output,
      renderPageHtml(html, page, origin).replace(
        marker,
        () => `<div id="root" data-prerendered="true">${render(page)}</div>`,
      ),
    );
    console.log(`Pre-rendered ${config.path} to ${output}`);
  }
  await writeFile(
    "dist/robots.txt",
    origin
      ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n",
  );
  if (origin) {
    await writeFile("dist/llms.txt", renderLlms(origin));
    await writeFile("dist/index.md", renderHomeMarkdown(origin));
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
        pages,
      )
        .filter((page) => page.indexable)
        .map(
          (page) =>
            `<url><loc>${new URL(page.path, origin).href.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</loc></url>`,
        )
        .join("")}</urlset>\n`,
    );
  }
} finally {
  await vite.close();
}
