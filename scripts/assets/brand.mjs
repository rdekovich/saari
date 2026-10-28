import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const master = await readFile("assets/source/brand/approved-logo.svg", "utf8");
const path = master.match(/ d="([^"]+)"/)[1];
const svg = (fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254"><title>Jacob Saari</title><path fill="${fill}" fill-rule="evenodd" d="${path}"/></svg>`;
await writeFile("public/brand/logo-black.svg", svg("#000000"));
await writeFile("public/brand/logo-white.svg", svg("#ffffff"));
const contours = path.match(/M[^M]*/g);
if (contours?.length !== 78 || !contours[16].startsWith("M 870 361.518"))
  throw new Error("Approved logo changed; review the tin-only extraction.");
const tinPath = contours.slice(16).join("");
const tinSvg = (fill, viewBox = "30 218 1124 1124") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><title>Sardine tin</title><path fill="${fill}" fill-rule="evenodd" d="${tinPath}"/></svg>`;
await writeFile("public/brand/tin-symbol.svg", tinSvg("#171916"));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 218 1124 1124"><style>:root{color:#171916}@media(prefers-color-scheme:dark){:root{color:#fbfaf6}}</style><path fill="currentColor" fill-rule="evenodd" d="${tinPath}"/></svg>`;
await writeFile("public/brand/tin-favicon.svg", icon);
for (const [size, name] of [
  [32, "tin-32"],
  [96, "tin-96"],
  [180, "tin-180"],
]) {
  await sharp(
    Buffer.from(
      tinSvg("#171916", size === 180 ? "-45 143 1274 1274" : undefined),
    ),
  )
    .resize(size, size)
    .flatten({ background: "#fbfaf6" })
    .png()
    .toFile(`public/brand/${name}.png`);
}
const logo = await sharp(Buffer.from(tinSvg("#171916", "30 305 1124 950")))
  .resize(660, 558)
  .png()
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#fbfaf6" },
})
  .composite([{ input: logo, left: 270, top: 36 }])
  .png()
  .toFile("public/brand/tin-social-card.png");
console.log(
  "Built website logos, browser icons and social card from the approved paths.",
);
