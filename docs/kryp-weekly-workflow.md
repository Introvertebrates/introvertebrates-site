# Kryp & Krabater · Ukas dyr

Each weekly article lives permanently in `_kryp_weekly/`. Jekyll sorts the collection by `date`: the newest entry becomes the featured card on `kryp-og-krabater.html`, while every entry remains available through `kryp-ukearkiv.html` and its own article URL.

## Weekly publishing flow

1. Open `/admin/` and choose **Kryp & Krabater · Ukas dyr**.
2. Create a new entry. Do not edit the previous week into a different animal.
3. Add a Norwegian title, search description, short introduction, and Tina’s observation question.
4. Select an Introvertebrates-owned image. A prepared 3:2 landscape crop works best.
5. Write the short article and point the final button to the most relevant Kryp trail or animal profile.
6. Preview the article, check its animal identification and links, then publish it.

The new article automatically appears at the top of the archive and replaces the previous feature card without deleting the older article.

Use only Erlend’s photographs and video. The animal in the image must support the accompanying text, named collection animals must remain correctly identified, and every factual claim should be appropriate for a young Norwegian audience.

## Local checks

After editing locally, run:

```powershell
node tools/check-local-references.mjs
bundle exec jekyll build
```

The first command checks local links and assets. The Jekyll build confirms that the collection, archive and individual article pages render correctly before publication.
