import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const profileScriptPath = path.join(siteRoot, "assets", "current-profile.js");
const profileScript = fs.readFileSync(profileScriptPath, "utf8");
const dataCaptureMarker = "  const root = document.querySelector(\"[data-current-profile]\");";

if (!profileScript.includes(dataCaptureMarker)) {
  throw new Error("Could not find the resident profile data capture point.");
}

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const captureProfile = (key) => {
  const root = {
    innerHTML: "",
    querySelector: () => null
  };
  const document = {
    body: { dataset: { profile: key } },
    querySelector: (selector) => selector === "[data-current-profile]" ? root : null
  };
  const context = vm.createContext({ document, console });
  const instrumentedScript = profileScript.replace(
    dataCaptureMarker,
    `  globalThis.__profileContent = { profiles, collectionStories };\n${dataCaptureMarker}`
  );
  vm.runInContext(instrumentedScript, context, { filename: profileScriptPath });
  return { html: root.innerHTML.trim(), ...context.__profileContent };
};

const firstCapture = captureProfile("sabrina-brachypelma-hamorii");
const profileEntries = Object.entries(firstCapture.profiles);

for (const [key, profile] of profileEntries) {
  const { html } = captureProfile(key);
  if (!html) throw new Error(`The renderer produced no HTML for ${key}.`);
  const renderedHtml = html.replace(/[ \t]+$/gm, "");

  const namedResident = !profile.resident.startsWith("Current ");
  const pageName = namedResident ? `${profile.resident} · ${profile.species}` : profile.species;
  const title = `${pageName} | Introvertebrates`;
  const description = profile.intro;
  const canonicalUrl = `https://introvertebrates.com/species/${key}.html`;
  const imageUrl = `https://introvertebrates.com/assets/collection/${profile.image}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description,
    url: canonicalUrl,
    image: imageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Introvertebrates",
      url: "https://introvertebrates.com/"
    },
    about: {
      "@type": "Thing",
      name: profile.species,
      description: profile.naturalHistory[0]
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://introvertebrates.com/" },
        { "@type": "ListItem", position: 2, name: "Current collection", item: "https://introvertebrates.com/collection.html" },
        { "@type": "ListItem", position: 3, name: profile.species, item: canonicalUrl }
      ]
    }
  };

  const output = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#040a12">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageName)} | Introvertebrates">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(profile.alt)}">
  <meta property="og:site_name" content="Introvertebrates">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageName)} | Introvertebrates">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(profile.alt)}">
  <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>
  <link rel="stylesheet" href="../assets/species.css">
</head>
<body data-profile="${key}">
  <a class="skip-link" href="#main-content">Skip to profile</a>
  <div data-current-profile data-static-profile>
${renderedHtml.split("\n").map((line) => line ? `    ${line}` : "").join("\n")}
  </div>
  <script src="../assets/species.js" defer></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(siteRoot, "species", `${key}.html`), output, "utf8");
}

console.log(`Built ${profileEntries.length} static resident profile pages.`);
