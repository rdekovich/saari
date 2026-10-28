import type { BrandAsset } from "../../config/brand";
import type { BrandSelection } from "./brandState";

async function svgBlob(
  asset: BrandAsset,
  selection: BrandSelection,
): Promise<Blob> {
  const response = await fetch(asset.src);
  if (!response.ok) throw new Error("Artwork could not be loaded.");
  const document = new DOMParser().parseFromString(
    await response.text(),
    "image/svg+xml",
  );
  const svg = document.documentElement;
  const bounds = svg.getAttribute("viewBox")!.split(" ").map(Number);
  svg.setAttribute("width", String(asset.width));
  svg.setAttribute("height", String(asset.height));
  for (const path of svg.querySelectorAll("path"))
    path.setAttribute("fill", selection.ink);
  if (!selection.transparent) {
    const background = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    for (const [i, key] of ["x", "y", "width", "height"].entries())
      background.setAttribute(key, String(bounds[i]));
    background.setAttribute("fill", selection.paper);
    svg.insertBefore(background, svg.querySelector("path"));
  }
  return new Blob([new XMLSerializer().serializeToString(svg)], {
    type: "image/svg+xml",
  });
}

export async function exportArtwork(
  asset: BrandAsset,
  selection: BrandSelection,
  format: "svg" | "png",
): Promise<Blob> {
  if (format === "svg") {
    if (asset.format !== "svg")
      throw new Error("This drawing is available as a PNG.");
    return svgBlob(asset, selection);
  }
  const image = new Image();
  const objectUrl =
    asset.format === "svg"
      ? URL.createObjectURL(
          await svgBlob(asset, { ...selection, transparent: true }),
        )
      : null;
  image.src = objectUrl ?? asset.src;
  try {
    await image.decode();
    const scale =
      asset.format === "svg" ? 2400 / Math.max(asset.width, asset.height) : 1;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(asset.width * scale);
    canvas.height = Math.round(asset.height * scale);
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("Image export is unavailable in this browser.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "source-in";
    context.fillStyle = selection.ink;
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (!selection.transparent) {
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = selection.paper;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Image export failed.")),
        "image/png",
      ),
    );
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

export function saveArtwork(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
