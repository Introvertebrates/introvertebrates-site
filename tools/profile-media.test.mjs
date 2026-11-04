import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => fs.readFileSync(path.join(siteRoot, file), "utf8");
const script = read("assets/current-profile.js");
const marker = '  const root = document.querySelector("[data-current-profile]");';
const context = vm.createContext({ document: { body: { dataset: {} }, querySelector: () => null } });
vm.runInContext(script.replace(marker, `  globalThis.media = { profiles, channelPosts };\n${marker}`), context);
const { profiles, channelPosts } = context.media;

test("verified channel uploads appear once on exactly their associated profiles", () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const video of channelPosts) {
    assert.match(video.id, /^[A-Za-z0-9_-]{11}$/);
    assert.match(video.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(video.published <= video.verifiedPublicOn && video.verifiedPublicOn <= today, video.id);
    assert.ok(video.profiles.length > 0, video.id);
    for (const key of video.profiles) assert.ok(profiles[key], `${video.id}: unknown profile ${key}`);
    for (const key of Object.keys(profiles)) {
      const html = read(`species/${key}.html`);
      const matches = [...html.matchAll(new RegExp(`data-youtube-video="${video.id}"`, "g"))];
      const expected = video.profiles.includes(key) && profiles[key].video?.id !== video.id ? 1 : 0;
      assert.equal(matches.length, expected, `${video.id} on ${key}`);
      if (expected) {
        const url = `https://www.youtube.com/${video.kind === "short" ? "shorts/" : "watch?v="}${video.id}`;
        assert.ok(html.includes(`href="${url}"`), `${key}: missing direct YouTube URL`);
      }
    }
  }
});

test("the public Norwegian Linothele Short keeps its species association after syncing", () => {
  const catalog = JSON.parse(read("tools/kryp-youtube-catalog.json"));
  const feed = JSON.parse(read("assets/data/kryp-youtube.json"));
  const video = feed.items.find((item) => item.id === "uKEScHbjv8k");
  assert.ok(video);
  assert.deepEqual(video.profiles, ["linothele-fallax"]);
  assert.deepEqual(video.profiles, catalog[video.id].profiles);
  assert.equal(video.kind, "short");
});

class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.following = []; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  after(element) { this.following.push(element); }
}
const descendants = (element) => [element, ...element.children.flatMap(descendants), ...element.following.flatMap(descendants)];

test("Instagram links beyond the three embedded cards remain accessible", async () => {
  const catalog = JSON.parse(read("assets/data/social-media.json"));
  const key = "ruby-chromatopelma-cyaneopubescens";
  const expected = catalog.items.filter((item) => item.profileKeys.includes(key));
  assert.ok(expected.length > 3, "fixture must cover the overflow case");
  const grid = new Element("div");
  const section = new Element("section");
  section.dataset = { instagramProfile: key };
  section.querySelector = () => grid;
  const browserContext = vm.createContext({
    document: {
      body: { dataset: {} },
      head: new Element("head"),
      querySelector: (selector) => selector === "[data-instagram-profile]" ? section : null,
      createElement: (tag) => new Element(tag)
    },
    window: { __introvertebratesAnalyticsLoaderAdded: true },
    fetch: async () => ({ ok: true, json: async () => catalog })
  });
  vm.runInContext(read("assets/species.js"), browserContext);
  await new Promise(setImmediate);
  const elements = descendants(grid);
  const links = elements.filter((element) => element.tag === "a").map((element) => element.href);
  assert.deepEqual(links.sort(), expected.map((item) => item.url).sort());
  assert.equal(elements.filter((element) => element.tag === "iframe").length, 3);
  assert.equal(grid.following[0].tag, "details");
  assert.equal(section.hidden, false);
});
