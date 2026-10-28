const title = "jacob saari, chef";
const description =
  "Jacob Saari is a chef based in Detroit, Michigan. Seafood, open-fire cooking, private chef dinners and pop-ups. Chef de cuisine at Casa Pernoi.";
export const pages = {
  home: {
    path: "/",
    output: "index.html",
    title,
    description,
    socialDescription: description,
    indexable: true,
  },
  brand: {
    path: "/brand/",
    output: "brand/index.html",
    title,
    description:
      "Jacob Saari’s logos, sardine illustrations and opening film. Download original artwork or make a custom colorway.",
    socialDescription:
      "The sardine tin and its companions. Logos and artwork for Jacob Saari, by Rob Dekovich.",
    indexable: true,
  },
  privacy: {
    path: "/privacy/",
    output: "privacy/index.html",
    title,
    description:
      "How saari.kitchen handles appearance preferences and email enquiries.",
    socialDescription: "Privacy at saari.kitchen.",
    indexable: true,
  },
  notFound: {
    path: "/404/",
    output: "404.html",
    title,
    description:
      "This page is not on the menu. Return to Jacob Saari’s kitchen.",
    socialDescription: "The kitchen of Jacob Saari.",
    indexable: false,
  },
} as const;
export type PageName = keyof typeof pages;
export function pageForPath(path: string): PageName {
  const pathname = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (pathname === "/") return "home";
  if (pathname === "/brand") return "brand";
  if (pathname === "/privacy") return "privacy";
  return "notFound";
}
