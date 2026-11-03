import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => fs.readFileSync(path.join(siteRoot, file), "utf8");
const profileScript = read("assets/current-profile.js");
const marker = '  const root = document.querySelector("[data-current-profile]");';
const capture = (key) => {
  const root = { innerHTML: "", querySelector: () => null };
  const context = vm.createContext({
    document: {
      body: { dataset: { profile: key } },
      querySelector: (selector) => selector === "[data-current-profile]" ? root : null
    }
  });
  vm.runInContext(profileScript.replace(marker, `  globalThis.profiles = profiles;\n${marker}`), context);
  return { html: root.innerHTML, profiles: context.profiles };
};
const { profiles } = capture("sabrina-brachypelma-hamorii");

test("every species profile has numbered sources and working inline reference targets", () => {
  const files = fs.readdirSync(path.join(siteRoot, "species")).filter((file) => file.endsWith(".html"));
  assert.equal(files.length, 23);
  for (const file of files) {
    const html = read(`species/${file}`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${file}: duplicate ids`);
    const sources = [...html.matchAll(/<li id="(source-[^"]+)"[^>]*>\s*<strong>(\d+)\./g)];
    assert.ok(sources.length >= 3, `${file}: missing numbered bibliography`);
    sources.forEach((match, index) => {
      assert.equal(Number(match[2]), index + 1, `${file}: visible source sequence`);
    });
    const sourceNumbers = new Map(sources.map((match) => [match[1], match[2]]));
    const links = [...html.matchAll(/<a href="#(source-[^"]+)"[^>]*>\[(\d+)\]<\/a>/g)];
    assert.ok(links.length >= 5, `${file}: missing inline references`);
    for (const link of links) {
      assert.equal(sourceNumbers.get(link[1]), link[2], `${file}: reference label or target`);
      assert.ok(ids.includes(link[1]), `${file}: missing target ${link[1]}`);
    }
  }
});

test("generated profile pages match their canonical renderer", () => {
  assert.equal(Object.keys(profiles).length, 19);
  for (const key of Object.keys(profiles)) {
    const { html } = capture(key);
    const page = read(`species/${key}.html`);
    const actual = page.match(/<div data-current-profile data-static-profile>\n([\s\S]*?)\n  <\/div>\n  <script/)[1];
    const expected = html.trim().replace(/[ \t]+$/gm, "").split("\n").map((line) => line ? `    ${line}` : "").join("\n");
    assert.equal(actual, expected, `${key}: generated content is stale`);
  }
});

test("all four approved local clips survive canonical rendering and static generation", () => {
  const clips = {
    "sabrina-brachypelma-hamorii": "sabrina",
    "ruby-chromatopelma-cyaneopubescens": "ruby",
    "siuzi-theraphosa-apophysis": "siuzi",
    "pachnoda-marginata": "rosenbille"
  };
  for (const [key, name] of Object.entries(clips)) {
    const { html } = capture(key);
    const page = read(`species/${key}.html`);
    for (const content of [html, page]) {
      assert.ok(content.includes(`/assets/kryp/video/${name}-vertical.mp4`), key);
      assert.ok(content.includes(`/assets/kryp/video/${name}.mp4`), key);
      assert.ok(content.includes(`/assets/kryp/${name}-video-poster.jpg`), key);
      assert.equal((content.match(/id="observation-video"/g) || []).length, 1, key);
    }
    assert.ok(page.includes('href="../assets/species-clips.css"'), key);
  }
});
