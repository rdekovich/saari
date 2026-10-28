export const brandAssets = [
  {
    id: "logo",
    label: "the logo",
    src: "/brand/logo-black.svg",
    format: "svg",
    width: 1254,
    height: 1254,
  },
  {
    id: "tin",
    label: "the tin",
    src: "/brand/tin-symbol.svg",
    format: "svg",
    width: 1124,
    height: 1124,
  },
  {
    id: "private-dinner",
    label: "dinner for two",
    src: "/brand/private-dinner.png",
    format: "png",
    width: 1254,
    height: 1254,
  },
  {
    id: "guest-dinner",
    label: "a full table",
    src: "/brand/guest-dinner.png",
    format: "png",
    width: 1536,
    height: 1024,
  },
  {
    id: "open-fire",
    label: "over the fire",
    src: "/brand/open-fire.png",
    format: "png",
    width: 1254,
    height: 1254,
  },
  {
    id: "contact",
    label: "say hello",
    src: "/brand/contact.png",
    format: "png",
    width: 1536,
    height: 1024,
  },
] as const;

export type BrandAsset = (typeof brandAssets)[number];
export type BrandAssetId = BrandAsset["id"];

export const inkColors = [
  { name: "black ink", value: "#171916" },
  { name: "pine", value: "#285344" },
  { name: "cobalt", value: "#2445a4" },
  { name: "wine", value: "#822e46" },
  { name: "paper", value: "#fbfaf6" },
] as const;

export const credit = {
  name: "rob dekovich",
  url: "https://dekovich.com/",
  repository: "https://github.com/rdekovich/saari",
  short: "art & website by",
  full: "art, design, branding & website",
} as const;

export const brandCopy = {
  eyebrow: "jacob saari · brand",
  title: "logos & artwork.",
  description:
    "the tin and its companions. choose an artwork, try a color, and take a copy with you.",
  originals: {
    label: "the originals",
    title: "ink, as drawn.",
    description:
      "original files with transparent backgrounds. copy a file’s link to use it elsewhere, or download it for print and digital work.",
    note: "svg keeps the logo sharp at any size. png works in most apps. custom colors are saved in the downloads and in your shareable page link.",
  },
  film: {
    label: "in motion",
    title: "open the tin.",
    description: "the original seven-second film.",
  },
  colophon: {
    label: "colophon",
    note: "made for jacob saari.",
  },
} as const;
