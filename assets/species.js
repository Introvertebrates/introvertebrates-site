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
        ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(data.generatedAt))
        : null;

      statusElement.textContent = updated
        ? `Privacy-reviewed snapshot · ${sampleText} · updated ${updated}.`
        : `Privacy-reviewed snapshot · ${sampleText}.`;
    })
    .catch(() => {
      // Keep the honest, useful fallback already present in the HTML.
    });
})();
