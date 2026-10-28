import sharp from "sharp";
for (const name of ["private-dinner", "guest-dinner", "contact"]) {
  const { data, info } = await sharp(`assets/source/illustrations/${name}.png`)
    .flatten({ background: "#ffffff" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let pixel = 0; pixel < data.length; pixel++)
    rgba[pixel * 4 + 3] = 255 - data[pixel];
  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(`public/brand/${name}.png`);
}
console.log("Built transparent downloads from the three preserved drawings.");
