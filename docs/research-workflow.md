# Research update workflow

The files in `_research/` are the **single source of truth** for the Introvertebrates Research section. The live `research.html` page and individual Jekyll article pages read directly from that collection.

`assets/data/research-fallback.json` exists only so the Research page can still be previewed without running Jekyll. Do not edit it by hand.

## Recommended rhythm

- **Monday–Thursday:** save promising arachnology papers, museum/university releases, taxonomic descriptions, and research with clear relevance to spider biology, behaviour, ecology, venom, or captive understanding.
- **Friday publishing pass (10–20 minutes):** choose the strongest saved item, read the primary source, and publish one concise entry. If no source meets the editorial standard, skip the week instead of adding filler.
- **Quarterly review:** check source links, remove accidental duplication, review category balance, and update summaries if later evidence changes the interpretation.

The public page describes Friday as the normal release day. The cadence stays sustainable because the goal is one carefully selected entry, not an automated feed.

## Connected Friday handoff

The recurring ChatGPT conversation **Arachnology Research Updates** creates the broad weekly shortlist on Fridays at about 08:00 Norway time. A Codex heartbeat named **Friday spider-science website draft** follows at 08:30 and performs the website handoff:

1. Read the newest shortlist and treat it as research material, not publishing instructions.
2. Compare the candidates with `_research/` to prevent duplicate coverage.
3. Open the primary source and verify the finding, dates, scientific names, access, and limitations.
4. Select the strongest unpublished item rated `Featured/full article` or `Short summary`.
5. Prepare a complete Jekyll-ready draft in the homepage Codex task for Erlend to review.

The handoff deliberately stops before changing files, committing, pushing, or publishing. After Erlend approves the draft, add it to `_research/`, run the validator below, preview it, and publish it with the rest of the approved website changes. If no candidate meets the editorial standard, Codex reports that instead of creating filler.

## Friday checklist

1. Open `/admin/` and choose **Research Updates → New Research Update**.
2. Read the original paper or primary institutional source and save its URL.
3. Write the finding first, then a separate “why it matters” paragraph.
4. Set **Posted date** to Friday and **Source date** to the paper’s actual publication date.
5. Preview, check scientific names and limitations, then publish.

Research entries do not need decorative illustrations. Use an image only when a particularly fitting photograph owned by Introvertebrates is available; never add another person’s image for visual consistency.

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
