import type { Plugin } from "vite";
import { business, metadata } from "../src/config/site";
import { pageForPath, pages, type PageName } from "../src/config/pages";
import { homeStructuredData, serializeStructuredData } from "./discovery";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}
export function renderPageHtml(
  html: string,
  page: PageName,
  origin: string | null = null,
) {
  const pageMetadata = pages[page];
  const values: Record<string, string> = {
    BUSINESS_NAME: business.fullName,
    SITE_TITLE: pageMetadata.title,
    SITE_DESCRIPTION: pageMetadata.description,
    SOCIAL_DESCRIPTION: pageMetadata.socialDescription,
    SOCIAL_IMAGE: metadata.socialImage,
    SOCIAL_IMAGE_ALT: metadata.socialImageAlt,
    FAVICON: metadata.favicon,
    FAVICON_PNG: metadata.faviconPng,
    APPLE_TOUCH_ICON: metadata.appleTouchIcon,
    THEME_COLOR: metadata.themeColor,
    THEME_COLOR_LIGHT: metadata.themeColorLight,
  };
  let result = html.replace(/%([A-Z_]+)%/g, (token, key: string) =>
    key in values ? escapeHtml(values[key]) : token,
  );
  result = result.replace(
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtml(pageMetadata.title)}</title>`,
  );
  for (const [name, value] of [
    ["description", pageMetadata.description],
    ["og:title", pageMetadata.title],
    ["og:description", pageMetadata.socialDescription],
    ["twitter:title", pageMetadata.title],
    ["twitter:description", pageMetadata.socialDescription],
  ]) {
    result = result.replace(
      new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*(")`),
      (_match, before: string, after: string) =>
        `${before}${escapeHtml(value)}${after}`,
    );
  }
  result = result.replace(
    /<!--discovery-start-->[\s\S]*?<!--discovery-end-->/,
    "",
  );
  let discovery =
    origin && pageMetadata.indexable
      ? `<link rel="canonical" href="${escapeHtml(new URL(pageMetadata.path, origin).href)}" />\n<meta property="og:url" content="${escapeHtml(new URL(pageMetadata.path, origin).href)}" />\n<meta name="robots" content="index, follow" />`
      : '<meta name="robots" content="noindex, nofollow" />';
  if (origin && pageMetadata.indexable) {
    discovery += `\n<link rel="describedby" href="${escapeHtml(new URL("/llms.txt", origin).href)}" />`;
    if (page === "home") {
      discovery += `\n<link rel="alternate" type="text/markdown" href="${escapeHtml(new URL("/index.md", origin).href)}" />`;
      discovery += `\n<script type="application/ld+json">${serializeStructuredData(homeStructuredData(origin))}</script>`;
    }
  }
  result = result.replace(
    "</head>",
    `<!--discovery-start-->${discovery}<!--discovery-end-->\n</head>`,
  );
  if (origin)
    result = result.replace(
      /(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g,
      (_match, before: string, after: string) =>
        `${before}${escapeHtml(new URL(metadata.socialImage, origin).href)}${after}`,
    );
  result = result.replace(
    /<html lang="en"(?: data-page="[^"]*")?>/,
    `<html lang="en" data-page="${page}">`,
  );
  if (page !== "home")
    result = result.replace(
      /<!--arrival-start-->[\s\S]*?<!--arrival-end-->/,
      "",
    );
  return result.replace(
    /<body(?: data-page="[^"]*")?>/,
    `<body data-page="${page}">`,
  );
}
export function siteHtml(origin: string | null = null): Plugin {
  return {
    name: "site-html",
    transformIndexHtml: {
      order: "pre",
      handler: (html, context) =>
        renderPageHtml(
          html,
          context.server
            ? pageForPath(context.originalUrl ?? context.path)
            : "home",
          origin,
        ),
    },
  };
}
