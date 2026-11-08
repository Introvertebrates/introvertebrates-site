// Validate the first article in the publishing queue without modifying it.
// This intentionally does not block a release for unrelated site-wide broken links.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const queueDir = path.join(root, "_kryp_weekly_queue");
if (!fs.existsSync(queueDir)) throw new Error("Missing _kryp_weekly_queue");
const queue = fs.readdirSync(queueDir).filter(n => n.endsWith(".md")).sort();
if (!queue.length) {
  console.log("Kryp & Krabater queue empty: no new animal to preflight.");
  process.exit(0);
}
const filename = queue[0];
const article = fs.readFileSync(path.join(queueDir, filename), "utf8");
const front = article.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!front) throw new Error(filename + ": missing YAML front matter");
const fields = new Map();
for (const line of front[1].split(/\r?\n/)) {
  const m = line.match(/^([a-z_]+):\s*(.*)$/);
  if (!m) continue;
  let value = m[2].trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  fields.set(m[1], value);
}
for (const key of ["title", "description", "intro", "question", "image", "link_url"]) {
  if (!fields.get(key)) throw new Error(filename + ": missing required " + key);
}
if ([fields.get("colouring_url"), fields.get("colouring_image"), fields.get("colouring_image_alt")].some(Boolean)) {
  for (const key of ["colouring_url", "colouring_image", "colouring_image_alt"]) {
    if (!fields.get(key)) throw new Error(filename + ": incomplete colouring sheet (" + key + ")");
  }
}
const references = ["image", "link_url", "colouring_image", "colouring_url", "video_url", "video_mobile_url", "video_poster"]
  .filter(key => fields.get(key)).map(key => [key, fields.get(key)]);
// Also check any directly embedded diagrams or other local pictures.
for (const match of article.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["']/gi)) {
  references.push(["embedded image", match[1]]);
}
for (const match of article.matchAll(/!\[[^\]]*]\(([^)\s]+)\)/g)) {
  references.push(["Markdown image", match[1]]);
}
for (const [label, reference] of references) {
  if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(reference)) continue;
  const pathname = reference.split(/[?#]/, 1)[0];
  if (!pathname) continue;
  const file = path.resolve(root, pathname.replace(/^\//, ""));
  if (file !== root && !file.startsWith(root + path.sep)) {
    throw new Error(filename + ": " + label + " escapes the site root");
  }
  if (!fs.existsSync(file)) throw new Error(filename + ": missing " + label + ": " + reference);
}
console.log("Preflight OK: " + filename + " (" + references.length + " references checked).");
