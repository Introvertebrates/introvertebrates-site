import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const ignoredDirectories = new Set([".git", ".jekyll-cache", "_site", "work"]);
const sourceExtensions = new Set([".html", ".css"]);
const failures = [];

const walk = (directory) => {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) files.push(fullPath);
  }
  return files;
};

const referencePatterns = {
  ".html": /(?:src|href)=["']([^"']+)["']/g,
  ".css": /url\(\s*["']?([^"')]+)["']?\s*\)/g
};

for (const sourcePath of walk(siteRoot)) {
  const extension = path.extname(sourcePath).toLowerCase();
  const source = fs.readFileSync(sourcePath, "utf8");
  for (const match of source.matchAll(referencePatterns[extension])) {
    const reference = match[1].trim();
    if (
      !reference ||
      reference.startsWith("#") ||
      reference.includes("{{") ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)
    ) continue;

    const cleanReference = reference.split(/[?#]/, 1)[0];
    let decodedReference;
    try {
      decodedReference = decodeURIComponent(cleanReference);
    } catch {
      failures.push(`${path.relative(siteRoot, sourcePath)} -> malformed URL: ${reference}`);
      continue;
    }

    const targetPath = decodedReference.startsWith("/")
      ? path.join(siteRoot, decodedReference.slice(1))
      : path.resolve(path.dirname(sourcePath), decodedReference);

    const routeParts = decodedReference.split("/").filter(Boolean);
    const jekyllCollectionSource = decodedReference.endsWith("/") && routeParts.length === 2
      ? path.join(siteRoot, `_${routeParts[0]}`, `${routeParts[1]}.md`)
      : null;

    if (!fs.existsSync(targetPath) && !(jekyllCollectionSource && fs.existsSync(jekyllCollectionSource))) {
      failures.push(`${path.relative(siteRoot, sourcePath)} -> ${reference}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} missing or invalid local references:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("All local HTML and CSS references resolve.");
}
