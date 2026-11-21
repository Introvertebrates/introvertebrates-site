// Prevent editorial wording that incorrectly treats a genus as a pet name
// or labels ordinary animal photos as "archived". Keep genuine archive/status
// terminology and scientific genus references; those carry useful meaning.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectories = ["species", "_research", "_kryp_weekly", "_kryp_weekly_queue", "_layouts"];
const specialFiles = [
  "assets/current-profile.js",
  "assets/homepage.js",
  "assets/data/research-fallback.json",
  "assets/data/kryp-youtube.json",
];
const testedExtensions = new Set([".html", ".md", ".json", ".js"]);

const rules = [
  {
    label: "Photo should be identified by what it shows, not by archive status",
    pattern: /\b(?:archived?|archival)\s+(?:collection\s+)?(?:photos?|photographs?|pictures?|images?|portraits?|views?)\b/gi,
  },
  {
    label: "Avoid calling ordinary animal photos 'archive photos'",
    pattern: /\b(?:archive|archived)\s+(?:photos?|photographs?|pictures?|images?|portraits?|views?)\b/gi,
  },
  {
    label: "Avoid 'photograph from the archive' as a caption description",
    pattern: /\b(?:photos?|photographs?|pictures?|images?|portraits?)\s+(?:from|in|of)\s+(?:the\s+)?archive\b/gi,
  },
  {
    label: "Avoid Norwegian photo archive labels in animal captions",
    pattern: /\b(?:arkivfoto(?:grafi)?|arkivfotos|arkivbilder?|arkivert(?:e)?\s+(?:foto(?:grafi)?|bilde(?:r)?))\b/gi,
  },
  {
    label: "Linothele is a genus, not this animal's given name",
    pattern: /\b(?:Meet|Watch|Explore|See|Se|Møt|Fargelegg|Skriv ut|For)\s+Linothele\b(?!\s+fallax)/gi,
  },
  {
    label: "Do not use genus Linothele as a personal name",
    pattern: /\bLinothele(?:'s|’s|\s+·)\b/gi,
  },
  {
    label: "Use Linothele fallax rather than Linothele alone as a heading",
    pattern: /<h[1-6][^>]*>\s*(?:<i>)?Linothele(?:<\/i>)?\s*<\/h[1-6]>/gi,
  },
];

// Pure checks so the rules can also be exercised by a quick regression self-test.
const inspect = (content) => rules.flatMap(({ label, pattern }) => {
  pattern.lastIndex = 0;
  return [...content.matchAll(pattern)].map(match => ({ label, match: match[0], index: match.index }));
});
if (process.argv.includes("--self-test")) {
  const failExamples = [
    "archived photograph", "archival ventral view", "archived collection photos",
    "From the photo archive", "arkivfoto", "Fargelegg Linothele",
    "Meet Linothele", "Linothele’s web", "<h3>Linothele</h3>",
  ];
  const allowedExamples = [
    "Linothele fallax", "Meet Linothele fallax", "genus Linothele",
    "World Spider Catalog — genus Linothele", "Collection archive",
    "Previously kept – deceased", "Former collection", "an earlier photograph",
    "Linothele revision", "assets/learn/archive/photo-portrait.jpg",
  ];
  for (const example of failExamples) {
    if (!inspect(example).length) throw new Error("Missed unwanted wording: " + example);
  }
  for (const example of allowedExamples) {
    if (inspect(example).length) throw new Error("Incorrectly rejected valid text: " + example);
  }
  console.log("Editorial wording self-test passed.");
  process.exit(0);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const entryPath = path.join(dir, entry.name);
  if (entry.isDirectory()) return walk(entryPath);
  return testedExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
});
const inputs = [
  ...fs.readdirSync(root).filter(name => name.endsWith(".html")).map(name => path.join(root, name)),
  ...contentDirectories.flatMap(dir => walk(path.join(root, dir))),
  ...specialFiles.map(name => path.join(root, name)),
];
const failures = [];
for (const file of inputs) {
  const content = fs.readFileSync(file, "utf8");
  for (const finding of inspect(content)) {
    const line = content.slice(0, finding.index).split("\n").length;
    failures.push(`${path.relative(root, file)}:${line}: ${finding.label} (${finding.match})`);
  }
}
if (failures.length) {
  console.error(`Found ${failures.length} editorial wording issue(s):\n${failures.map(f => "- " + f).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Editorial wording check passed across ${inputs.length} public-content files.`);
}
