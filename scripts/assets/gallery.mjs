import { mkdir, readdir } from "node:fs/promises";
import sharp from "sharp";

const source = "assets/source/photography/gallery";
const output = "public/images/gallery";
await mkdir(output, { recursive: true });
for (const file of (await readdir(source)).filter((name) =>
  name.endsWith(".jpg"),
)) {
  for (const width of [480, 960, 1440]) {
    await sharp(`${source}/${file}`)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(`${output}/${file.slice(0, -4)}-${width}.webp`);
  }
}
console.log("Built responsive gallery photographs; sources unchanged.");
