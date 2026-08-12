# Research update workflow

The files in `_research/` are the **single source of truth** for the Introvertebrates Research section. The live `research.html` page and individual Jekyll article pages read directly from that collection.

`assets/data/research-fallback.json` exists only so the Research page can still be previewed without running Jekyll. Do not edit it by hand.

## Recommended rhythm

- **Weekly scan (10–20 minutes):** look for strong new arachnology papers, museum/university releases, taxonomic descriptions, and research with clear relevance to spider biology, behaviour, ecology, venom, or captive understanding.
- **Monthly publishing pass:** add the strongest 1–3 items rather than filling the section with every spider headline. Prefer primary papers and institutional sources; use secondary reporting when it genuinely helps explain the work.
- **Quarterly review:** check source links, remove accidental duplication, review category balance, and update summaries if later evidence changes the interpretation.

The cadence is intentionally sustainable. A smaller journal that is reliably updated and carefully curated is more useful than a fast feed full of weak stories.

## Add or edit an entry

The easiest route is the website editor at `/admin/`, which writes directly to `_research/` on the `main` branch. Each entry should include:

- title
- description
- category
- posted date (stored as `YYYY-MM-DD`)
- source date (stored as `YYYY-MM-DD`)
- summary
- why it matters
- original source URL
- source name
- optional longer body

Use one of the existing categories: `Behavior`, `New species / Taxonomy`, `General arachnology news`, `Ecology`, `Venom`, or `Captive relevance`.

## Local validation

After editing `_research/` locally, rebuild the static preview data:

```powershell
node tools/sync-research.mjs --write
```

Before publishing, check that it is in sync:

```powershell
node tools/sync-research.mjs
```

The validator also catches missing required fields, invalid categories, duplicate slugs, bad source URLs, and dates that cannot be sorted.

## Editorial standard

1. Read the primary paper when it is available. If coverage is based on a press release or news report, say what the source is rather than presenting it as direct reading of the paper.
2. Keep the summary descriptive. Separate what the researchers found from what Introvertebrates thinks is interesting about it.
3. Avoid inflating cognition, danger, size, rarity, or novelty for clicks.
4. Link the original source and preserve scientific names exactly.
5. If a result is preliminary, preprint-only, contested, or based on a narrow sample, make that limitation visible.
6. AI can assist with drafting and checking, but each published item should be selected and reviewed by Erlend before it goes live.
