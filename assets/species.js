(() => {
  const panel = document.querySelector("[data-codex-profile]");
  if (!panel) return;

  const profileKey = panel.dataset.codexProfile;
  const statusElement = panel.querySelector("[data-codex-status]");
  const metricsElement = panel.querySelector("[data-codex-metrics]");
  if (!profileKey || !statusElement || !metricsElement) return;

  const renderMetric = (metric) => {
    const item = document.createElement("div");
    item.className = "codex-metric";

    const label = document.createElement("span");
    label.className = "codex-metric-label";
    label.textContent = metric.label;

    const value = document.createElement("strong");
    value.className = "codex-metric-value";
    value.textContent = metric.value;

    item.append(label, value);

    if (metric.detail) {
      const detail = document.createElement("span");
      detail.className = "codex-metric-detail";
      detail.textContent = metric.detail;
      item.append(detail);
    }

    return item;
  };

  fetch("../assets/data/codex-public.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Public Codex data is unavailable.");
      return response.json();
    })
    .then((data) => {
      const profile = data?.profiles?.[profileKey];
      if (!profile || profile.status !== "ready" || !Array.isArray(profile.metrics) || profile.metrics.length === 0) {
        return;
      }

      metricsElement.replaceChildren(...profile.metrics.map(renderMetric));
      metricsElement.hidden = false;

      const sampleText = `${profile.sampleSize} Codex record${profile.sampleSize === 1 ? "" : "s"}`;
      const updated = data.generatedAt
        ? new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(data.generatedAt))
        : null;

      statusElement.textContent = updated
        ? `Privacy-reviewed snapshot · ${sampleText} · updated ${updated}.`
        : `Privacy-reviewed snapshot · ${sampleText}.`;
    })
    .catch(() => {
      // Keep the honest, useful fallback already present in the HTML.
    });
})();

(() => {
  const section = document.querySelector("[data-instagram-profile]");
  if (!section) return;

  const profileKey = section.dataset.instagramProfile;
  const grid = section.querySelector("[data-instagram-items]");
  if (!profileKey || !grid) return;

  const typeLabels = {
    photo: "Instagram photo",
    carousel: "Instagram carousel",
    reel: "Instagram reel"
  };

  const createCard = (item) => {
    const card = document.createElement("a");
    card.className = "related-profile-card profile-instagram-card";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const copy = document.createElement("span");
    copy.className = "related-profile-copy";

    const label = document.createElement("span");
    label.className = "profile-video-label";
    label.textContent = typeLabels[item.type] || "Instagram post";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const summary = document.createElement("span");
    summary.className = "profile-instagram-summary";
    summary.textContent = item.summary;

    const action = document.createElement("span");
    action.className = "profile-instagram-action";
    action.textContent = item.type === "reel" ? "Open reel on Instagram ↗" : "Open post on Instagram ↗";

    copy.append(label, title, summary, action);
    card.append(copy);
    return card;
  };

  fetch("../assets/data/social-media.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Instagram media list is unavailable.");
      return response.json();
    })
    .then((data) => {
      const items = Array.isArray(data?.items)
        ? data.items.filter((item) => Array.isArray(item.profileKeys) && item.profileKeys.includes(profileKey))
        : [];
      if (items.length === 0) return;

      grid.replaceChildren(...items.map(createCard));
      section.hidden = false;
    })
    .catch(() => {
      // The section remains hidden when the curated media list is unavailable.
    });
})();

(() => {
  if (window.__introvertebratesAnalyticsLoaderAdded) return;
  window.__introvertebratesAnalyticsLoaderAdded = true;
  const script = document.createElement("script");
  script.src = "/assets/analytics.js";
  script.defer = true;
  document.head.appendChild(script);
})();

// Shared video links use only the list confirmed from the public channel feed.
(() => {
  if (!document.body.dataset.profile) return;
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = '/assets/kryp-youtube.css';
  document.head.append(style);
  const script = document.createElement('script');
  script.src = '/assets/kryp-youtube.js?v=20261104text'; script.defer = true;
  document.head.append(script);
})();

