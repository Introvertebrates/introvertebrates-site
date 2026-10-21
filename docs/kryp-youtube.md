# Published YouTube videos on the website

`sync-kryp-youtube.yml` checks the Kryp & Krabater public channel feed hourly
at minute 23, and can also be run manually. GitHub may delay scheduled runs;
this is not an exact simultaneous launch with YouTube.

The website's home section, film library, Norwegian Siuzi profile and English
species profiles share `assets/data/kryp-youtube.json`. New videos must first
appear in the public feed, with a publication time in the past. The curated
catalog alone never makes a video visible. The old, uncorrected speed video
and the private Linothele fallax video are deliberately absent from the catalog.

The catalog adds descriptions and precise species associations. General
tarantula facts are not automatically attached to every species. Unknown future
public uploads still appear in the film library and homepage; add their exact
profile keys to `tools/kryp-youtube-catalog.json` when appropriate. Profile keys
match the existing `/species/<key>.html` pages. Norwegian profile identifiers
refer to sections of `kryp-artsprofiler.html`.

YouTube RSS contains the most recent 15 uploads. Previously confirmed public
videos older than that window are retained only while YouTube oEmbed remains
accessible. This detects unavailable/private videos, but an older video later
changed to unlisted can remain accessible via oEmbed. Remove such an archived
entry from the generated JSON if it must also disappear from the website.
Recent entries that disappear from the feed are removed automatically. Temporary
server errors, rate limits and connection failures are retried up to four times,
waiting 5, 10 and 20 seconds between attempts. Intermittent 404 responses are
retried for the channel feed only; an oEmbed 404 still removes an unavailable
archived video. If all retries fail but existing public data was verified within
24 hours, the job reports a warning, preserves the file unchanged and tries again
on the next scheduled run. Missing, invalid or older verification means the job
fails and sends the usual failure alert. Successful checks refresh `lastVerifiedAt`
when content changes or the recorded verification is at least 12 hours old,
avoiding a commit and site rebuild on every hourly check.

The website never falls back to showing the schedule or private catalog. An
empty feed or an unexpected channel is still an error that requires review.

The workflow commits changed public data and requests a GitHub Pages rebuild,
following the existing weekly-animal workflow. It has no YouTube login or
permission to publish, schedule or edit a video. No iframe, YouTube player or
autoplay is loaded on the website: cards link to YouTube when clicked.

Checks:

```sh
python -m unittest discover -s tools -p test_kryp_youtube.py
node tools/check-local-references.mjs
node --check assets/kryp-youtube.js
```
