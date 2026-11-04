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

test("all profile YouTube placements use text cards and retain the original primary video", () => {
  for (const file of fs.readdirSync(path.join(siteRoot, "species")).filter((file) => file.endsWith(".html"))) {
    const html = read(`species/${file}`);
    assert.doesNotMatch(html, /<iframe[^>]+src="https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\//, file);
    const cards = [...html.matchAll(/<a class="related-profile-card profile-youtube-card"[\s\S]*?<\/a>/g)];
    for (const [card] of cards) {
      assert.doesNotMatch(card, /<img|<iframe/, file);
      assert.match(card, /<strong>[^<]+<\/strong>/, file);
      assert.match(card, /Watch on YouTube/, file);
    }
  }
  for (const [key, profile] of Object.entries(profiles)) {
    if (!profile.video) continue;
    const html = read(`species/${key}.html`);
    assert.ok(html.includes(`data-youtube-video="${profile.video.id}"`), key);
    assert.ok(html.includes(`href="https://www.youtube.com/watch?v=${profile.video.id}"`), key);
  }
  assert.ok(read("species/acanthoscurria-geniculata.html").includes('data-youtube-video="BsemPEq5f2Y"'));
});

class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.following = []; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  after(element) { this.following.push(element); }
  setAttribute(name, value) { this[name] = value; }
}
const descendants = (element) => [element, ...element.children.flatMap(descendants), ...element.following.flatMap(descendants)];

test("saved Instagram posts use text cards with every matching link retained", async () => {
  const catalog = JSON.parse(read("assets/data/social-media.json"));
  const keys = new Set(catalog.items.flatMap((item) => item.profileKeys));
  assert.ok(catalog.items.filter((item) => item.profileKeys.includes("ruby-chromatopelma-cyaneopubescens")).length > 3);
  for (const key of [...keys, "profile-without-posts"]) {
    const expected = catalog.items.filter((item) => item.profileKeys.includes(key));
    const grid = new Element("div");
    const section = new Element("section");
    section.dataset = { instagramProfile: key };
    section.hidden = true;
    section.querySelector = () => grid;
    const requests = [];
    const browserContext = vm.createContext({
      document: {
        body: { dataset: {} },
        head: new Element("head"),
        querySelector: (selector) => selector === "[data-instagram-profile]" ? section : null,
        createElement: (tag) => new Element(tag)
      },
      window: { __introvertebratesAnalyticsLoaderAdded: true },
      fetch: async (url) => { requests.push(url); return { ok: true, json: async () => catalog }; }
    });
    vm.runInContext(read("assets/species.js"), browserContext);
    await new Promise(setImmediate);
    const elements = descendants(grid);
    const links = elements.filter((element) => element.tag === "a").map((element) => element.href);
    assert.deepEqual(links.sort(), expected.map((item) => item.url).sort(), key);
    assert.equal(grid.children.length, expected.length, key);
    assert.equal(elements.filter((element) => ["iframe", "img", "details"].includes(element.tag)).length, 0, key);
    assert.equal(elements.filter((element) => element.tag === "strong").length, expected.length, key);
    assert.equal(section.hidden, expected.length === 0, key);
    assert.deepEqual(requests, ["../assets/data/social-media.json"]);
    if (expected.length) {
      const html = read(`species/${key}.html`);
      assert.ok(html.includes(`data-instagram-profile="${key}"`), key);
      assert.ok(html.includes('id="instagram-posts"'), key);
      assert.doesNotMatch(html, /The original Instagram post loads in the page/, key);
    }
  }
});

test("Norwegian video links use text on profiles and preserve the film-library cards", async () => {
  const feed = JSON.parse(read("assets/data/kryp-youtube.json"));
  for (const placement of ["english-profile", "norwegian-profile", "film-library"]) {
    const main = new Element("main");
    const target = new Element("section");
    target.dataset = placement === "norwegian-profile" ? { krypProfile: "siuzi" } : { limit: "2" };
    const isEnglish = placement === "english-profile";
    const page = vm.createContext({
      document: {
        body: { dataset: isEnglish ? { profile: "siuzi-theraphosa-apophysis" } : {} },
        documentElement: { lang: isEnglish ? "en" : "no" },
        querySelectorAll: () => isEnglish ? [] : [target],
        querySelector: () => main,
        createElement: (tag) => new Element(tag)
      },
      fetch: async () => ({ ok: true, json: async () => feed })
    });
    vm.runInContext(read("assets/kryp-youtube.js"), page);
    await new Promise(setImmediate);
    const elements = descendants(isEnglish ? main : target);
    const links = elements.filter((element) => element.tag === "a").map((element) => element.href);
    assert.ok(links.some((url) => url.includes("youtube.com/watch?v=")), placement);
    const images = elements.filter((element) => element.tag === "img");
    if (placement === "film-library") assert.equal(images.length, 2);
    else assert.equal(images.length, 0, placement);
  }
});
