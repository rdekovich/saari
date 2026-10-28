export const business = {
  fullName: "Jacob Saari",
  name: "jacob saari",
  domain: "saari.kitchen",
  email: "jacob@saari.kitchen",
  location: "detroit, mi",
  role: "chef de cuisine",
  restaurant: "Casa Pernoi",
} as const;

export const social = {
  instagram: {
    handle: "@jacobrsaari",
    url: "https://www.instagram.com/jacobrsaari/",
  },
  linkedin: {
    name: "Jacob Saari",
    url: "https://www.linkedin.com/in/jacob-saari-a685b22aa",
  },
} as const;

export const metadata = {
  socialImage: "/brand/tin-social-card.png",
  socialImageAlt:
    "Three sardines in an open tin, drawn in black ink on warm paper.",
  favicon: "/brand/tin-favicon.svg",
  faviconPng: "/brand/tin-96.png",
  appleTouchIcon: "/brand/tin-180.png",
  themeColor: "#171916",
  themeColorLight: "#fbfaf6",
} as const;

export const sectionLabels = {
  about: "the chef",
  gallery: "the food",
  table: "at your table",
  contact: "say hello",
} as const;

export const navigation = [
  { href: "/#about", label: sectionLabels.about },
  { href: "/#gallery", label: sectionLabels.gallery },
  { href: "/#table", label: sectionLabels.table },
  { href: "/#contact", label: sectionLabels.contact },
  { href: "/brand/", label: "brand" },
] as const;
