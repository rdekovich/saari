import { brandAssets, type BrandAssetId } from "../../config/brand";

export type BrandSelection = {
  artwork: BrandAssetId;
  ink: string;
  paper: string;
  transparent: boolean;
};

export const defaultSelection: BrandSelection = {
  artwork: "logo",
  ink: "#171916",
  paper: "#fbfaf6",
  transparent: false,
};

export function normalizeColor(value: string | null): string | null {
  if (!value) return null;
  const hex = value.replace(/^#/, "");
  if (/^[\da-f]{6}$/i.test(hex)) return `#${hex.toLowerCase()}`;
  if (/^[\da-f]{3}$/i.test(hex))
    return `#${[...hex]
      .map((c) => c + c)
      .join("")
      .toLowerCase()}`;
  return null;
}

export function readSelection(search: string): BrandSelection {
  const query = new URLSearchParams(search);
  const artwork = brandAssets.find((item) => item.id === query.get("art"));
  return {
    artwork: artwork?.id ?? defaultSelection.artwork,
    ink: normalizeColor(query.get("ink")) ?? defaultSelection.ink,
    paper: normalizeColor(query.get("paper")) ?? defaultSelection.paper,
    transparent: query.get("background") === "transparent",
  };
}

export function selectionPath(selection: BrandSelection): string {
  const query = new URLSearchParams({
    art: selection.artwork,
    ink: selection.ink.slice(1),
    paper: selection.paper.slice(1),
  });
  if (selection.transparent) query.set("background", "transparent");
  return `/brand/?${query}`;
}
