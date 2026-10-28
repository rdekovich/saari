import { expect, test } from "@playwright/test";
import {
  readSelection,
  selectionPath,
} from "../../src/features/brand/brandState";

test("shared artwork selections normalize colors and reject unknown inputs", () => {
  expect(
    readSelection("?art=tin&ink=ABC&paper=123456&background=transparent"),
  ).toEqual({
    artwork: "tin",
    ink: "#aabbcc",
    paper: "#123456",
    transparent: true,
  });
  expect(
    readSelection("?art=../../bad&ink=url(evil)&paper=%22%3E&background=other"),
  ).toEqual({
    artwork: "logo",
    ink: "#171916",
    paper: "#fbfaf6",
    transparent: false,
  });
  const selection = readSelection(
    "?art=guest-dinner&ink=285344&paper=ffeedd&background=transparent",
  );
  expect(readSelection(selectionPath(selection).split("?")[1])).toEqual(
    selection,
  );
});
