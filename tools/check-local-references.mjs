import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const ignoredDirectories = new Set([".git", ".jekyll-cache", "_site", "work"]);
const sourceExtensions = new Set([".html", ".css", ".md"]);
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

const referencesFor = (source, extension) => {
  const references = [];
  const patterns = extension === ".html"
    ? [/(?:src|href)=["']([^"']+)["']/g]
    : extension === ".css"
      ? [/url\(\s*["']?([^"')]+)["']?\s*\)/g]
      : [/!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*)?\)/g, /^(?:image|link_url):\s*["']?([^"'\s]+)["']?\s*$/gm];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) references.push(match[1]);
  }
  return references;
};

const idsFor = (source) => new Set([...source.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));

for (const sourcePath of walk(siteRoot).filter((file) => path.extname(file).toLowerCase() === ".html")) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const ids = [...source.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicates)) failures.push(`${path.relative(siteRoot, sourcePath)} -> duplicate id: #${id}`);
}

for (const sourcePath of walk(siteRoot)) {
  const extension = path.extname(sourcePath).toLowerCase();
  const source = fs.readFileSync(sourcePath, "utf8");
  for (const rawReference of referencesFor(source, extension)) {
    const reference = rawReference.trim();
    if (
      !reference ||
      reference.includes("{{") ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)
    ) continue;

    const [pathPart, hashPart] = reference.split("#", 2);
    const cleanReference = pathPart.split("?", 1)[0];
    let decodedReference;
    try {
      decodedReference = decodeURIComponent(cleanReference);
    } catch {
      failures.push(`${path.relative(siteRoot, sourcePath)} -> malformed URL: ${reference}`);
      continue;
    }

    const targetPath = decodedReference
      ? decodedReference.startsWith("/")
        ? path.join(siteRoot, decodedReference.slice(1))
        : path.resolve(path.dirname(sourcePath), decodedReference)
      : sourcePath;

    const routeParts = decodedReference.split("/").filter(Boolean);
    const jekyllCollectionSource = decodedReference.endsWith("/") && routeParts.length === 2
      ? path.join(siteRoot, `_${routeParts[0]}`, `${routeParts[1]}.md`)
      : null;

    if (!fs.existsSync(targetPath) && !(jekyllCollectionSource && fs.existsSync(jekyllCollectionSource))) {
      failures.push(`${path.relative(siteRoot, sourcePath)} -> ${reference}`);
      continue;
    }

    if (hashPart && fs.existsSync(targetPath) && path.extname(targetPath).toLowerCase() === ".html") {
      const targetIds = idsFor(fs.readFileSync(targetPath, "utf8"));
      if (!targetIds.has(hashPart)) failures.push(`${path.relative(siteRoot, sourcePath)} -> missing anchor: ${reference}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} missing or invalid local references:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("All local HTML, CSS and Markdown references resolve, and HTML ids are unique.");
}
