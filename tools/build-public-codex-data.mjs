import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const [, , inputPath, requestedOutputPath] = process.argv;

if (!inputPath) {
  console.error("Usage: node tools/build-public-codex-data.mjs <codex-export.json> [public-output.json]");
  process.exit(1);
}

const outputPath = requestedOutputPath
  ? path.resolve(requestedOutputPath)
  : path.resolve("assets/data/codex-public.json");

const normalize = (value) => String(value ?? "").trim().toLowerCase();
const validDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
const median = (values) => {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[middle];
};
const plural = (value, singular, pluralForm = `${singular}s`) =>
  `${value} ${value === 1 ? singular : pluralForm}`;

const rawText = await readFile(path.resolve(inputPath), "utf8");
const raw = JSON.parse(rawText.replace(/^\uFEFF/, ""));
if (!Array.isArray(raw)) {
  throw new TypeError("Expected the Codex collection export to be a JSON array.");
}

const speciesMatches = raw.filter((specimen) => {
  const genus = normalize(specimen?.genus);
  const species = normalize(specimen?.species);
  return genus === "acanthoscurria" && (species === "geniculata" || species === "acanthoscurria geniculata");
});

const activeMatches = speciesMatches.filter((specimen) => !["sold", "passed"].includes(normalize(specimen?.status)));
const alma = activeMatches.find((specimen) => normalize(specimen?.name) === "alma") ?? activeMatches[0] ?? null;

const metrics = [];

if (alma) {
  const snapshotDate = new Date();
  const acquiredAt = validDate(alma.acquiredAt);
  if (acquiredAt && acquiredAt <= snapshotDate) {
    const daysInCare = Math.max(0, Math.floor((snapshotDate - acquiredAt) / 86_400_000));
    const value = daysInCare >= 730
      ? `${(daysInCare / 365.25).toFixed(1)} years`
      : daysInCare >= 60
        ? `${Math.round(daysInCare / 30.44)} months`
        : plural(daysInCare, "day");
    metrics.push({ label: "Time in care", value, detail: "At snapshot date" });
  }

  const molts = Array.isArray(alma.molts)
    ? alma.molts.map((entry) => validDate(entry?.date)).filter(Boolean).sort((a, b) => a - b)
    : [];
  if (molts.length > 0) {
    metrics.push({ label: "Recorded molts", value: String(molts.length), detail: "Confirmed Codex entries" });
  }
  if (molts.length > 1) {
    const intervals = molts.slice(1).map((date, index) => Math.round((date - molts[index]) / 86_400_000));
    metrics.push({
      label: "Median molt interval",
      value: plural(median(intervals), "day"),
      detail: `Based on ${plural(intervals.length, "interval")}`
    });
  }

  const feedings = Array.isArray(alma.feedings) ? alma.feedings : [];
  const accepted = feedings.filter((entry) => entry?.outcome === "fed");
  const refused = feedings.filter((entry) => entry?.outcome === "refused");
  const confirmed = accepted.length + refused.length;
  if (confirmed > 0) {
    metrics.push({
      label: "Feeding acceptance",
      value: `${Math.round((accepted.length / confirmed) * 100)}%`,
      detail: `${accepted.length} accepted · ${refused.length} refused`
    });
  }

  const preyCounts = new Map();
  accepted.forEach((entry) => {
    const feeder = String(entry?.feeder ?? "").trim();
    if (feeder) preyCounts.set(feeder, (preyCounts.get(feeder) ?? 0) + 1);
  });
  const commonPrey = [...preyCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([feeder]) => feeder);
  if (commonPrey.length > 0) {
    metrics.push({ label: "Accepted prey", value: commonPrey.join(" · "), detail: "Most often recorded" });
  }

  if (Number.isFinite(alma.sizeCm) && alma.sizeCm > 0) {
    metrics.push({ label: "Recorded leg span", value: `${alma.sizeCm} cm`, detail: "Latest Codex measurement" });
  }
  if (Number.isFinite(alma.bodyLengthCm) && alma.bodyLengthCm > 0) {
    metrics.push({ label: "Recorded body length", value: `${alma.bodyLengthCm} cm`, detail: "Latest Codex measurement" });
  }
  if (Number.isFinite(alma.weightGrams) && alma.weightGrams > 0) {
    metrics.push({ label: "Recorded weight", value: `${alma.weightGrams} g`, detail: "Latest Codex measurement" });
  }
}

const publicData = {
  version: 1,
  generatedAt: new Date().toISOString(),
  profiles: {
    "acanthoscurria-geniculata": {
      status: alma && metrics.length > 0 ? "ready" : "awaiting-export",
      residentName: "Alma",
      sampleSize: alma ? 1 : 0,
      metrics
    }
  }
};

await writeFile(outputPath, `${JSON.stringify(publicData, null, 2)}\n`, "utf8");

console.log(`Wrote privacy-safe public data to ${outputPath}`);
console.log("Excluded raw notes, IDs, contacts, enclosure data, image paths, and exact event dates.");
