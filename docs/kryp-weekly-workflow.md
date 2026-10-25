# Kryp & Krabater · Ukas dyr

Each weekly article lives permanently in `_kryp_weekly/`. Jekyll sorts the collection by `date`: the newest entry becomes the featured card on `kryp-og-krabater.html`, while every entry remains available through `kryp-ukearkiv.html` and its own article URL.

## Automatic Sunday publishing and recovery

The approved articles remain in `_kryp_weekly_queue/` until a publisher actually commits them. GitHub Actions `.github/workflows/publish-kryp-weekly.yml` uses **Europe/Oslo** time so DST changes no longer shift the schedule:

- Target: **Sunday at or shortly after 10:00 Norwegian time**. Cron retries at **10:07, 10:22, 10:37, 10:52**, then each 15 minutes through **13:52**.
- Safety net: Monday checks at **10:17, 10:47, 12:17, 12:47** Norwegian time. If the previous Sunday never published, the recovery post receives **Sunday's date**, preserving the weekly archive.
- Independent attempts reduce the chance of losing an entire publication to GitHub's occasional delayed or dropped scheduled events. GitHub does **not** guarantee minute-precise cron execution.
- Manual emergency publishing remains available using **Actions > Publish Kryp & Krabater weekly animal > Run workflow**. This explicit `workflow_dispatch` path uses `--force` to allow recovery outside the ordinary Sunday window.

### Why the old setup failed

The old schedule ran on Sunday at 07:15, 08:15 and 09:15 UTC, including times **before 10:00 in Oslo**. The publisher always dated the article at `10:00 Europe/Oslo`; a premature Jekyll build could thus skip the future-dated article, and later retries treated the week as already published without rebuilding. On 25 October 2026, no publishing workflow runs had appeared by the time we investigated even though earlier slots had passed, consistent with GitHub Actions' documented best-effort scheduling.

The publisher now **refuses to release before 10:00 Oslo** on Sundays. Ordinary scheduled events outside Sunday or Monday's recovery window cannot accidentally publish an issue dated Tuesday/Wednesday. The ISO-week and seven-day duplication safeguards are unchanged. Unit tests cover DST-era Sunday dates, the early-build gate and Monday backfill.

### Verifying the actual site

The publisher outputs the permalink of the selected article, even on a duplicate-protected retry. The workflow checks whether its public page returns HTTP 200; if the page is missing, it **requests a GitHub Pages rebuild**, retries the check for several minutes and **fails visibly** if it still cannot verify the page. A newly published article always requests a rebuild. This closes the previous hole where an already-committed article could remain invisible indefinitely.

If a scheduled event is **never created**, GitHub has no native failure notification. The repository's Actions page can distinguish a missing cron event from a failed job. If precision is essential, an independent external scheduler or watchdog is still required; GitHub Actions alone cannot guarantee an exact minute.

Queue filenames begin with a three-digit order such as `010-`. Keep at least four checked entries ready so there is time to review the next month of articles. New colouring sheets become public together with the article.

A manual dry-run can still be tested without moving a file:

```powershell
node tools/publish-next-kryp-weekly.mjs --dry-run --date=2026-11-01
```

## Manual publishing flow

1. Open `/admin/` and choose **Kryp & Krabater · Ukas dyr**.
2. Create a new entry. Do not edit the previous week into a different animal.
3. Add a Norwegian title, search description, short introduction, and Tina’s observation question.
4. Select an Introvertebrates-owned image. A prepared 3:2 landscape crop works best.
5. Write the short article and point the final button to the most relevant Kryp trail or animal profile.
6. Preview the article, check its animal identification and links, then publish it.

The new article automatically appears at the top of the archive and replaces the previous feature card without deleting the older article. Manual entries and automatically queued entries use the same permanent archive.

Use only Erlend’s photographs and video. The animal in the image must support the accompanying text, named collection animals must remain correctly identified, and every factual claim should be appropriate for a young Norwegian audience.

Selected weekly entries can also include `colouring_url`, `colouring_image`, `colouring_image_alt`, and `colouring_label`. Add these fields only when the linked sheet is based on Erlend’s photograph and has been reviewed for the animal’s identifying features and anatomy. A weekly article without an approved sheet should publish normally without a colouring block.

## Local checks

After editing locally, run:

```powershell
node tools/check-local-references.mjs
bundle exec jekyll build
```

The first command checks local links and assets. The Jekyll build confirms that the collection, archive and individual article pages render correctly before publication.
