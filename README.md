# introvertebrates-site

## Updating public Codex data

1. In Introvertebrates Codex, open **Settings → Website → Create public website snapshot**.
2. Save or share the generated `introvertebrates-website-public-*.json` file to this computer.
3. From this repository, run:

   ```powershell
   node tools/build-public-codex-data.mjs "C:\path\to\introvertebrates-website-public.json"
   ```

4. Preview the homepage and profiles before committing or publishing.

The app snapshot and the website importer only accept public aggregate statistics and allow-listed profile metrics. They exclude collection record IDs, private notes, contacts, exact event dates, enclosure IDs, and local image paths.

The current update path is deliberately manual. For a private-app-to-public-website live feed, keep the same privacy boundary and add an authenticated one-way publishing service; see [`docs/codex-live-sync.md`](docs/codex-live-sync.md).

## Updating the Research section

Research articles live in `_research/`, which is the canonical source used by Jekyll. The checked-in JSON file is generated only for static local previews.

After adding or editing research locally:

```powershell
node tools/sync-research.mjs --write
node tools/sync-research.mjs
```

See [`docs/research-workflow.md`](docs/research-workflow.md) for the publishing rhythm and editorial checklist.


## Updating English species profiles

The 19 generated resident profiles use `assets/current-profile.js` as their canonical content source. The reference plans connect individual sections to verified sources; numbers resolve automatically into the numbered bibliography. Keep citations beside the claims they support, and identify keeper interpretations and genus-level comparisons clearly. Local observation clips also belong in this canonical data.

After editing the canonical data or renderer, run:

```sh
node tools/build-static-profile-pages.mjs
node --test tools/profile-references.test.mjs
```

The Alma, Brachypelma auratum, Caribena versicolor and Phormingochilus hatihati pages are maintained as standalone HTML profiles. They use the same inline-reference and source-anchor convention.
