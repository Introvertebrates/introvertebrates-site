---
title: Research Updates
layout: null
permalink: /research/
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Research Updates | Introvertebrates</title>
  <meta name="description" content="Plain-language summaries of spider research, arachnology updates, taxonomy, and new discoveries.">
  <meta name="theme-color" content="#06101d">

  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
      background-color: #04070d;
      background-image:
        linear-gradient(180deg, rgba(4, 7, 13, 0.94), rgba(4, 7, 13, 1)),
        radial-gradient(ellipse 140% 65% at 50% 10%, rgba(31, 162, 255, 0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 50% 95%, rgba(0, 15, 32, 0.8) 0%, transparent 55%);
      color: #c3cfdb;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .page {
      min-height: 100vh;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 72px 24px 48px;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 36px;
      color: #14f1c4;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .back-link:hover {
      color: #f5f7fb;
      text-decoration: underline;
    }

    h1 {
      margin: 0 0 18px;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 600;
      color: #f5f7fb;
      letter-spacing: 0.3px;
    }

    .intro {
      max-width: 700px;
      margin: 0 0 14px;
      font-size: 1rem;
      line-height: 1.8;
      color: #c3cfdb;
    }

    .suggest-link {
      display: inline-block;
      margin: 0 0 18px;
      color: #14f1c4;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .suggest-link:hover {
      color: #f5f7fb;
      text-decoration: underline;
    }

    .disclaimer {
      max-width: 700px;
      margin: 0 0 28px;
      font-size: 0.82rem;
      line-height: 1.7;
      color: #8d9aaa;
    }

    .entry-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .entry {
      border: 1px solid rgba(20, 241, 196, 0.12);
      background: rgba(8, 15, 24, 0.82);
      border-radius: 18px;
      padding: 22px 20px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    }

    .entry-dates {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 14px;
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #8d9aaa;
    }

    .entry-date-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .entry-date-label {
      color: #c3cfdb;
    }

    .entry-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .entry h2 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 600;
      color: #f5f7fb;
      line-height: 1.35;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 0.73rem;
      font-weight: 600;
      letter-spacing: 0.35px;
      text-transform: uppercase;
      white-space: nowrap;
      border: 1px solid rgba(20, 241, 196, 0.22);
      background: linear-gradient(
        135deg,
        rgba(20, 241, 196, 0.12),
        rgba(31, 162, 255, 0.10)
      );
      color: #f5f7fb;
    }

    .entry p {
      margin: 0 0 14px;
      line-height: 1.75;
      color: #c3cfdb;
    }

    .entry p:last-child { margin-bottom: 0; }

    .entry strong {
      color: #f5f7fb;
    }

    .entry a {
      color: #14f1c4;
      text-decoration: none;
    }

    .entry a:hover {
      color: #f5f7fb;
      text-decoration: underline;
    }

    .meta {
      font-size: 0.92rem;
      color: #8d9aaa;
    }

    footer {
      margin-top: 56px;
      font-size: 0.78rem;
      color: #263d4d;
      letter-spacing: 0.4px;
      text-align: center;
    }

    @media (max-width: 560px) {
      .page { padding: 56px 18px 36px; }
      .entry { padding: 18px 16px; }
      .entry h2 { font-size: 1.05rem; }
    }
  </style>
</head>
<body>
  <main class="page">
    <a href="{{ '/' | relative_url }}" class="back-link">← Back to homepage</a>

    <h1>Research Updates</h1>

    <p class="intro">
      Plain-language summaries of spider research, arachnology news, taxonomy changes, and discoveries worth paying attention to.
    </p>

    <a href="mailto:erlend@introvertebrates.com?subject=Research%20paper%20suggestion%20for%20Introvertebrates" class="suggest-link">
      Suggest a paper →
    </a>

    <p class="disclaimer">
      Summaries may be assisted by AI, but all entries are selected, reviewed, and curated for Introvertebrates.
    </p>

    <section class="entry-list">
      {% assign sorted_research = site.research | sort: "posted_date" | reverse %}
      {% for post in sorted_research %}
      <article class="entry">
        <div class="entry-dates">
          <span class="entry-date-item">
            <span class="entry-date-label">Posted:</span>
            <span>{{ post.posted_date }}</span>
          </span>
          <span class="entry-date-item">
            <span class="entry-date-label">Source:</span>
            <span>{{ post.source_date }}</span>
          </span>
        </div>

        <div class="entry-header">
          <h2>{{ post.title }}</h2>
          <span class="badge">{{ post.category }}</span>
        </div>

        <p>{{ post.summary }}</p>

        <p>
          <strong>Why it matters:</strong> {{ post.why_it_matters }}
        </p>

        <p class="meta">
          <strong>Summary:</strong>
          <a href="{{ post.url | relative_url }}">Read full summary</a>
          <br>
          <strong>Source:</strong>
          <a href="{{ post.source_url }}" target="_blank" rel="noopener noreferrer">Read article</a>
        </p>
      </article>
      {% endfor %}
    </section>

    <footer>© 2026 Introvertebrates</footer>
  </main>
</body>
</html>
