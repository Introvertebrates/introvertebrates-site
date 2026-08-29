# Kryp & Krabater · Ukas dyr

Each weekly article lives permanently in `_kryp_weekly/`. Jekyll sorts the collection by `date`: the newest entry becomes the featured card on `kryp-og-krabater.html`, while every entry remains available through `kryp-ukearkiv.html` and its own article URL.

## Automatic Friday publishing

The site keeps pre-approved articles in `_kryp_weekly_queue/`. At 07:15 UTC every Friday (08:15 in Norwegian winter time and 09:15 in summer time), `.github/workflows/publish-kryp-weekly.yml` runs `tools/publish-next-kryp-weekly.mjs`.

The script takes the alphabetically first queued file, adds the current Oslo date and week label, moves it into `_kryp_weekly/`, checks its local image and destination link, and commits the change. The workflow then requests a GitHub Pages rebuild explicitly, because a commit created with the workflow token does not trigger that rebuild on its own. If the queue is empty, the workflow exits without publishing filler.

Queue filenames begin with a three-digit order such as `001-`. Keep at least four verified entries ready so there is time to review the next month of articles. Every queued article must use an Introvertebrates-owned image and contain claims that are appropriate for a young Norwegian audience.

Run a dry test without moving a file:

```powershell
node tools/publish-next-kryp-weekly.mjs --dry-run --date=2026-09-04
```

The workflow can also be started manually from the repository's **Actions** tab.

## Manual publishing flow

1. Open `/admin/` and choose **Kryp & Krabater · Ukas dyr**.
2. Create a new entry. Do not edit the previous week into a different animal.
3. Add a Norwegian title, search description, short introduction, and Tina’s observation question.
4. Select an Introvertebrates-owned image. A prepared 3:2 landscape crop works best.
5. Write the short article and point the final button to the most relevant Kryp trail or animal profile.
6. Preview the article, check its animal identification and links, then publish it.

The new article automatically appears at the top of the archive and replaces the previous feature card without deleting the older article. Manual entries and automatically queued entries use the same permanent archive.

Use only Erlend’s photographs and video. The animal in the image must support the accompanying text, named collection animals must remain correctly identified, and every factual claim should be appropriate for a young Norwegian audience.

## Local checks

After editing locally, run:

```powershell
node tools/check-local-references.mjs
bundle exec jekyll build
```

The first command checks local links and assets. The Jekyll build confirms that the collection, archive and individual article pages render correctly before publication.
