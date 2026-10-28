// Builds the distributable package:
//   dist/design-system.css      all CSS with the @import chain inlined (+ .min.css)
//   dist/ui.js                  vanilla behaviour layer for non-React projects
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

function inline(file, seen = new Set()) {
  if (seen.has(file)) return "";
  seen.add(file);
  const css = readFileSync(file, "utf8");
  return css.replace(/@import\s+"(\.[^"]+)";\s*/g, (_, rel) => inline(resolve(dirname(file), rel), seen) + "\n");
}

rmSync(resolve(root, "dist"), { recursive: true, force: true });
mkdirSync(resolve(root, "dist"), { recursive: true });

const banner = `/*! ${pkg.name} v${pkg.version} */\n`;
const css = banner + inline(resolve(root, "src/css/index.css"));
const minified = banner + css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{};,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

writeFileSync(resolve(root, "dist/design-system.css"), css);
writeFileSync(resolve(root, "dist/design-system.min.css"), minified);
copyFileSync(resolve(root, "src/vanilla/ui.js"), resolve(root, "dist/ui.js"));

console.log(`dist/design-system.css      ${(css.length / 1024).toFixed(1)} kB`);
console.log(`dist/design-system.min.css  ${(minified.length / 1024).toFixed(1)} kB`);
