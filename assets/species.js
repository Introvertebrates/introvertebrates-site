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

  const getEmbedUrl = (url) => {
    const match = String(url).match(/instagram\.com\/(?:[^/]+\/)?(p|reel)\/([^/?#]+)/i);
    return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/captioned/` : null;
  };

  const createCard = (item) => {
    const card = document.createElement("article");
    card.className = "profile-instagram-card";

    const embedUrl = getEmbedUrl(item.url);
    if (embedUrl) {
      const frameWrap = document.createElement("div");
      frameWrap.className = "profile-instagram-embed";

      const frame = document.createElement("iframe");
      frame.src = embedUrl;
      frame.title = `${typeLabels[item.type] || "Instagram post"}: ${item.title}`;
      frame.loading = "lazy";
      frame.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frameWrap.append(frame);
      card.append(frameWrap);
    } else {
      const media = document.createElement("span");
      media.className = "profile-instagram-media";

      const image = document.createElement("img");
      image.src = `../${String(item.image).replace(/^\.\//, "")}`;
      image.alt = item.alt || `${item.title} — collection photograph used as an Instagram preview`;
      image.width = 1600;
      image.height = 898;
      image.loading = "lazy";
      image.decoding = "async";
      media.append(image);
      card.append(media);
    }

    const copy = document.createElement("span");
    copy.className = "profile-instagram-copy";

    const label = document.createElement("span");
    label.className = "profile-instagram-label";
    label.textContent = typeLabels[item.type] || "Instagram post";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const summary = document.createElement("span");
    summary.className = "profile-instagram-summary";
    summary.textContent = item.summary;

    const action = document.createElement("span");
    action.className = "profile-instagram-action";
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.type === "reel" ? "Open reel on Instagram ↗" : "Open post on Instagram ↗";
    action.append(link);

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
        ? data.items.filter((item) => Array.isArray(item.profileKeys) && item.profileKeys.includes(profileKey)).slice(0, 3)
        : [];
      if (items.length === 0) return;

      grid.replaceChildren(...items.map(createCard));
      section.hidden = false;
    })
    .catch(() => {
      // The section remains hidden when the curated media list is unavailable.
    });
})();
