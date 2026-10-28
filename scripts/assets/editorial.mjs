import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public/illustrations", { recursive: true });
await mkdir("public/images", { recursive: true });

for (const name of ["private-dinner", "guest-dinner", "contact", "open-fire"]) {
  for (const width of [480, 960]) {
    await sharp(`assets/source/illustrations/${name}.png`)
      .resize({ width, withoutEnlargement: true })
      .webp({ lossless: true })
      .toFile(`public/illustrations/${name}-${width}.webp`);
  }
}

for (const width of [480, 960]) {
  await sharp("assets/source/photography/jacob-saari.jpg")
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/images/jacob-saari-${width}.webp`);
}

console.log(
  "Built responsive editorial artwork and portrait; sources unchanged.",
);
