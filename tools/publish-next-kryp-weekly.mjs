import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const queueDirectory = path.join(siteRoot, "_kryp_weekly_queue");
const publishedDirectory = path.join(siteRoot, "_kryp_weekly");
const dryRun = process.argv.includes("--dry-run");
const dateArgument = process.argv.find((argument) => argument.startsWith("--date="));

const osloDate = () => {
  if (dateArgument) return dateArgument.slice("--date=".length);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const isoWeek = (dateText) => {
  const [year, month, day] = dateText.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
};

const norwegianDateLabel = (dateText) => {
  const months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
  const [year, month, day] = dateText.split("-").map(Number);
  return `Uke ${isoWeek(dateText)} · ${day}. ${months[month - 1]} ${year}`;
};

const osloOffset = (dateText) => {
  const instant = new Date(`${dateText}T10:00:00Z`);
  const zoneName = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Oslo",
    timeZoneName: "longOffset"
  }).formatToParts(instant).find(({ type }) => type === "timeZoneName")?.value ?? "GMT+01:00";
  return zoneName.replace("GMT", "").replace(":", "");
};

const frontMatterValue = (source, key) => {
  const match = source.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"));
  return match?.[1] ?? null;
};

if (!fs.existsSync(queueDirectory)) {
  console.log("No Kryp & Krabater queue directory exists; nothing to publish.");
  process.exit(0);
}

const queue = fs.readdirSync(queueDirectory)
  .filter((name) => name.toLowerCase().endsWith(".md"))
  .sort((left, right) => left.localeCompare(right, "nb"));

if (!queue.length) {
  console.log("The Kryp & Krabater queue is empty; nothing to publish.");
  process.exit(0);
}

const queueName = queue[0];
const sourcePath = path.join(queueDirectory, queueName);
const source = fs.readFileSync(sourcePath, "utf8");
if (!source.startsWith("---")) throw new Error(`${queueName} is missing YAML front matter.`);

const title = frontMatterValue(source, "title");
const image = frontMatterValue(source, "image");
const link = frontMatterValue(source, "link_url");
if (!title || !image || !link) throw new Error(`${queueName} needs title, image and link_url fields.`);

for (const publishedName of fs.readdirSync(publishedDirectory).filter((name) => name.endsWith(".md"))) {
  const published = fs.readFileSync(path.join(publishedDirectory, publishedName), "utf8");
  if (frontMatterValue(published, "title") === title) throw new Error(`An article titled “${title}” is already published.`);
}

for (const [label, reference] of [["image", image], ["link_url", link]]) {
  if (!reference.startsWith("/")) continue;
  const target = path.join(siteRoot, reference.slice(1).split(/[?#]/, 1)[0]);
  if (!fs.existsSync(target)) throw new Error(`${queueName} has a missing local ${label}: ${reference}`);
}

const dateText = osloDate();
const offset = osloOffset(dateText);
const datedFrontMatter = source.replace(
  /^---\r?\n/,
  `---\ndate: ${dateText} 10:00:00 ${offset}\ndate_label: "${norwegianDateLabel(dateText)}"\n`
);
const slug = queueName.replace(/^\d+-/, "").replace(/\.md$/i, "");
const destinationName = `${dateText}-${slug}.md`;
const destinationPath = path.join(publishedDirectory, destinationName);

if (fs.existsSync(destinationPath)) throw new Error(`${destinationName} already exists.`);

if (dryRun) {
  console.log(`Dry run: ${queueName} would publish as ${destinationName}.`);
  process.exit(0);
}

fs.writeFileSync(destinationPath, datedFrontMatter, "utf8");
fs.unlinkSync(sourcePath);
console.log(`Published ${queueName} as ${destinationName}.`);
