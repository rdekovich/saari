export const illustrations = {
  "private-dinner": { width: 1254, height: 1254 },
  "guest-dinner": { width: 1536, height: 1024 },
  contact: { width: 1536, height: 1024 },
} as const;

export type IllustrationName = keyof typeof illustrations;

export const chefPortrait = {
  src: "/images/jacob-saari-480.webp",
  srcSet:
    "/images/jacob-saari-480.webp 480w, /images/jacob-saari-960.webp 960w",
  width: 1320,
  height: 1649,
  alt: "Jake Saari in his apron, holding a tray of roasted meat and herbs outdoors.",
} as const;
