import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

// Resolve supplied artwork during static generation. Missing files keep the
// original branding visible rather than requesting broken images.
function asset(filename: string): string | null {
  return existsSync(path.join(process.cwd(), "public", "branding", filename))
    ? `/branding/${filename}`
    : null;
}

export const brandingAssets = {
  primary: asset("dbcreates-primary.svg"),
  monogram: asset("dbcreates-monogram.svg"),
  wordmark: asset("dbcreates-wordmark.svg"),
  faviconPng: asset("dbcreates-favicon.png"),
  faviconIco: asset("favicon.ico"),
};
