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

const profileDefinitions = [
  { key: "acanthoscurria-geniculata", residentName: "Alma", names: ["alma"], species: ["acanthoscurria geniculata"] },
  { key: "sabrina-brachypelma-hamorii", residentName: "Sabrina", names: ["sabrina"], species: ["brachypelma hamorii"] },
  { key: "ceratogyrus-darlingi", residentName: "Current resident", species: ["ceratogyrus darlingi"] },
  { key: "chilobrachys-fimbriatus", residentName: "Current resident", species: ["chilobrachys fimbriatus"] },
  { key: "chilobrachys-kaeng-krachan", residentName: "Current resident", species: ["chilobrachys sp kaeng krachan"] },
  { key: "elvira-chilobrachys-natanicharum", residentName: "Elvira", names: ["elvira"], species: ["chilobrachys natanicharum"] },
  { key: "ruby-chromatopelma-cyaneopubescens", residentName: "Ruby", names: ["ruby"], species: ["chromatopelma cyaneopubescens"] },
  { key: "grammostola-pulchripes", residentName: "Current resident", species: ["grammostola pulchripes"] },
  { key: "linothele-fallax", residentName: "Current resident", species: ["linothele fallax"] },
  { key: "sonja-mauremys-reevesii", residentName: "Sonja", names: ["sonja"], species: ["mauremys reevesii"] },
  { key: "bella-monocentropus-balfouri", residentName: "Bella", names: ["bella"], species: ["monocentropus balfouri"] },
  { key: "belinda-monocentropus-balfouri", residentName: "Belinda", names: ["belinda"], species: ["monocentropus balfouri"] },
  { key: "omothymus-violaceopes", residentName: "Current resident", species: ["omothymus violaceopes"] },
  { key: "clara-psalmopoeus-irminia", residentName: "Clara", names: ["clara"], species: ["psalmopoeus irminia"] },
  { key: "psyttala-horrida", residentName: "Current colony", species: ["psyttala horrida"] },
  { key: "pachnoda-marginata", residentName: "Current colony", species: ["pachnoda marginata"] },
  { key: "siuzi-theraphosa-apophysis", residentName: "Siuzi", names: ["siuzi"], species: ["theraphosa apophysis"] }
];

const normalize = (value) => String(value ?? "")
  .normalize("NFKD")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");
const validDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
const plural = (value, singular, pluralForm = `${singular}s`) =>
  `${value} ${value === 1 ? singular : pluralForm}`;
const getScientificName = (specimen) => {
  const genus = normalize(specimen?.genus);
  const species = normalize(specimen?.species);
  if (!genus || species.startsWith(`${genus} `)) return species;
  return `${genus} ${species}`.trim();
};
const isActive = (specimen) => !["sold", "passed", "archived"].includes(normalize(specimen?.status));
const matchesDefinition = (specimen, definition) => {
  const scientificName = getScientificName(specimen);
  const speciesMatches = definition.species.some((candidate) => {
    const normalizedCandidate = normalize(candidate);
    return scientificName === normalizedCandidate || scientificName.startsWith(`${normalizedCandidate} `);
  });
  if (!speciesMatches) return false;
  if (!definition.names) return true;
  return definition.names.map(normalize).includes(normalize(specimen?.name));
};
const roundedTimeInCare = (specimen, snapshotDate) => {
  const acquiredAt = validDate(specimen?.acquiredAt);
  if (!acquiredAt || acquiredAt > snapshotDate) return null;
  const days = Math.max(0, Math.floor((snapshotDate - acquiredAt) / 86_400_000));
  if (days >= 730) return `${(days / 365.25).toFixed(1)} years`;
  if (days >= 60) return `${Math.round(days / 30.44)} months`;
  return plural(days, "day");
};
const finitePositive = (value) => Number.isFinite(value) && value > 0;

const rawText = await readFile(path.resolve(inputPath), "utf8");
const raw = JSON.parse(rawText.replace(/^\uFEFF/, ""));
if (!Array.isArray(raw)) {
  throw new TypeError("Expected the Codex collection export to be a JSON array.");
}

const snapshotDate = new Date();
const profiles = {};

for (const definition of profileDefinitions) {
  const specimens = raw.filter((specimen) => isActive(specimen) && matchesDefinition(specimen, definition));
  const metrics = [];

  if (specimens.length === 1) {
    const timeInCare = roundedTimeInCare(specimens[0], snapshotDate);
    if (timeInCare) metrics.push({ label: "Time in care", value: timeInCare, detail: "Rounded for privacy" });
  } else if (specimens.length > 1) {
    metrics.push({ label: "Tracked residents", value: String(specimens.length), detail: "Active Codex records" });
  }

  const molts = specimens.flatMap((specimen) => Array.isArray(specimen?.molts) ? specimen.molts : []);
  if (molts.length > 0) {
    metrics.push({ label: "Recorded molts", value: String(molts.length), detail: "Confirmed Codex entries" });
  }

  const feedings = specimens.flatMap((specimen) => Array.isArray(specimen?.feedings) ? specimen.feedings : []);
  const accepted = feedings.filter((entry) => normalize(entry?.outcome) === "fed");
  const refused = feedings.filter((entry) => normalize(entry?.outcome) === "refused");
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
    const feeder = String(entry?.feeder ?? "").trim().slice(0, 40);
    if (feeder && !["unknown", "n/a", "none"].includes(normalize(feeder))) {
      preyCounts.set(feeder, (preyCounts.get(feeder) ?? 0) + 1);
    }
  });
  const commonPrey = [...preyCounts.entries()]
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .slice(0, 3)
    .map(([feeder]) => feeder);
  if (commonPrey.length > 0) {
    metrics.push({ label: "Accepted prey", value: commonPrey.join(" · "), detail: "Most often recorded" });
  }

  if (specimens.length === 1) {
    const specimen = specimens[0];
    if (finitePositive(specimen?.sizeCm)) metrics.push({ label: "Recorded leg span", value: `${specimen.sizeCm} cm`, detail: "Latest Codex measurement" });
    if (finitePositive(specimen?.bodyLengthCm)) metrics.push({ label: "Recorded body length", value: `${specimen.bodyLengthCm} cm`, detail: "Latest Codex measurement" });
    if (finitePositive(specimen?.weightGrams)) metrics.push({ label: "Recorded weight", value: `${specimen.weightGrams} g`, detail: "Latest Codex measurement" });
  }

  profiles[definition.key] = {
    status: specimens.length > 0 && metrics.length > 0 ? "ready" : "awaiting-export",
    residentName: definition.residentName,
    sampleSize: specimens.length,
    metrics
  };
}

const publicData = {
  version: 1,
  generatedAt: snapshotDate.toISOString(),
  profiles
};

await writeFile(outputPath, `${JSON.stringify(publicData, null, 2)}\n`, "utf8");

console.log(`Wrote privacy-safe public data for ${profileDefinitions.length} profiles to ${outputPath}`);
console.log("Excluded raw notes, IDs, contacts, enclosure data, image paths, and exact event dates.");
