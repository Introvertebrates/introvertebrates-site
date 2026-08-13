# Codex live-sync design

## Goal

Keep public collection totals and approved profile metrics up to date from Introvertebrates Codex without exposing the app database or making private collection records readable from the website.

## Recommended data flow

```text
Private Codex data on the device
        |
        v
Existing public-snapshot sanitizer
        |
        v
Authenticated one-way upload endpoint
        |
        v
Validated public JSON feed
        |
        +--> introvertebrates.com (live fetch)
        |
        +--> assets/data/codex-public.json (last-reviewed fallback)
```

The website should never connect to AsyncStorage, a device backup, or the full Codex export. Only the already-sanitized public snapshot crosses the boundary.

## Public allow-list

The endpoint should accept and serve only the fields already produced by `buildPublicWebsiteSnapshot` and accepted by `tools/build-public-codex-data.mjs`:

- snapshot version and generated timestamp;
- aggregate collection totals;
- approved collection highlights;
- allow-listed profile keys and public metrics;
- sample sizes needed to explain the figures.

It must reject record IDs, notes, contacts, exact event dates, enclosure IDs, local photo paths, and any unknown top-level field. Photographs should use a separate, deliberate publishing workflow.

## Authentication and hosting

A small Cloudflare Worker with KV or R2 is a natural fit because the public site already uses Cloudflare, but another authenticated serverless endpoint is fine. The upload route should require the owner to sign in or use a short-lived token. Do not place a permanent GitHub token or other high-value secret inside a distributable app binary.

Suggested routes:

- `POST /codex/publish` — authenticated; validate and replace the public snapshot atomically;
- `GET /codex/public.json` — public, read-only, CORS restricted to the production site and local preview origins;
- `GET /codex/status` — optional timestamp/version check for the app.

## App experience

Add a **Publish public website stats** action beside the existing snapshot export. It should show exactly which aggregate fields will be sent, require confirmation, upload the sanitized snapshot, and report the timestamp returned by the endpoint. A setting can later allow publishing automatically after a local data change, but a visible manual button is the safer first release.

## Website behaviour

When the endpoint exists, the homepage and species profiles should request the public feed with `cache: "no-store"`, validate its version, and fall back to the checked-in `assets/data/codex-public.json` if the network request fails. The page should always display the snapshot month or date so visitors can tell how current the figures are.

## Deployment decision still required

Before implementation, choose the endpoint host and login method and create the server-side storage/credentials. Those are external infrastructure decisions; they should not be guessed or embedded in this repository.
