(() => {
  const dataElement = document.getElementById("research-data");
  const entryList = document.getElementById("entry-list");
  const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("research-search-input");
  const resultCount = document.getElementById("research-result-count");
  if (!dataElement || !entryList || !sortSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  const validFilters = new Set(filterButtons.map((button) => button.dataset.filter));
  let activeFilter = validFilters.has(urlParams.get("topic")) ? urlParams.get("topic") : "all";
  let searchTerm = (urlParams.get("q") || "").trim().toLocaleLowerCase();
  let activeSort = sortSelect.value;
  let entries = [];
  if (searchInput) searchInput.value = urlParams.get("q") || "";

  const categoryToSlug = (category) => {
    const categories = {
      "Behaviour & cognition": "behaviour",
      "Ecology & conservation": "ecology",
      "Evolution & genetics": "evolution",
      "Taxonomy & discoveries": "taxonomy",
      "Venom & defence": "defence",
      "Silk & biomaterials": "silk",
    };
    return categories[category] || "uncategorised";
  };

  const appendText = (parent, tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  };

  const buildEntry = (entry) => {
    const article = document.createElement("article");
    article.className = "entry";
    article.dataset.category = categoryToSlug(entry.category);
    article.dataset.postedDate = entry.posted_date || "";
    article.dataset.sourceDate = entry.source_date || "";
    article.dataset.searchText = [
      entry.title, entry.description, entry.summary, entry.why_it_matters,
      entry.category, entry.source_name
    ].filter(Boolean).join(" ").toLocaleLowerCase();

    const dates = appendText(article, "div", "entry-dates", "");
    const posted = appendText(dates, "span", "entry-date-item", "");
    appendText(posted, "span", "entry-date-label", "Posted:");
    appendText(posted, "span", "", entry.posted_date || "—");
    const sourced = appendText(dates, "span", "entry-date-item", "");
    appendText(sourced, "span", "entry-date-label", "Source:");
    appendText(sourced, "span", "", entry.source_date || "—");

    const header = appendText(article, "div", "entry-header", "");
    const titleWrap = appendText(header, "div", "entry-title-wrap", "");
    appendText(titleWrap, "h2", "", entry.title || "Untitled research update");
    appendText(header, "span", `badge ${article.dataset.category}`, entry.category || "Research");

    appendText(article, "p", "", entry.summary || "");
    const relevance = appendText(article, "p", "", "");
    appendText(relevance, "strong", "", "Why it matters: ");
    relevance.append(document.createTextNode(entry.why_it_matters || ""));

    const actions = appendText(article, "div", "entry-actions", "");
    if (entry.url && entry.has_body) {
      const summaryLink = appendText(actions, "a", "home-button research-card-button", "Read full summary");
      summaryLink.href = entry.url;
    }
    if (entry.source_url) {
      const sourceLink = appendText(actions, "a", "research-source-link", `Original source · ${entry.source_name || "Read article"}`);
      sourceLink.href = entry.source_url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
    }

    return article;
  };

  const sortableDate = (value) => {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const sortEntries = (items, sortValue) => [...items].sort((a, b) => {
    const sourceA = sortableDate(a.dataset.sourceDate);
    const sourceB = sortableDate(b.dataset.sourceDate);
    const postedA = sortableDate(a.dataset.postedDate);
    const postedB = sortableDate(b.dataset.postedDate);
    if (sortValue === "source-desc") return sourceB - sourceA;
    if (sortValue === "source-asc") return sourceA - sourceB;
    if (sortValue === "posted-desc") return postedB - postedA;
    if (sortValue === "posted-asc") return postedA - postedB;
    return 0;
  });

  const updateFilterButtons = () => {
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const updateAddress = () => {
    const url = new URL(window.location.href);
    if (activeFilter === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", activeFilter);
    if (searchInput && searchInput.value.trim()) url.searchParams.set("q", searchInput.value.trim());
    else url.searchParams.delete("q");
    try {
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch {
      // Local file previews may not permit history updates.
    }
  };

  const renderEntries = () => {
    const words = searchTerm.split(/\s+/).filter(Boolean);
    const filtered = entries.filter((entry) =>
      (activeFilter === "all" || entry.dataset.category === activeFilter) &&
      words.every((word) => entry.dataset.searchText.includes(word))
    );
    const sorted = sortEntries(filtered, activeSort);
    entryList.replaceChildren();

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${entries.length} research articles`;
    }

    if (sorted.length === 0) {
      appendText(entryList, "p", "research-empty", "No matching studies yet. Try another keyword or choose a different topic.");
      return;
    }

    entryList.append(...sorted);
  };

  const loadData = async () => {
    try {
      const jekyllData = JSON.parse(dataElement.textContent);
      if (Array.isArray(jekyllData) && jekyllData.length > 0) return jekyllData;
    } catch {
      // The local static preview sees unprocessed Liquid and uses the checked-in fallback below.
    }

    const fallbackUrl = dataElement.dataset.fallbackUrl;
    if (!fallbackUrl) return [];
    const response = await fetch(fallbackUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Research fallback data is unavailable.");
    const fallbackData = await response.json();
    return Array.isArray(fallbackData) ? fallbackData : [];
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      updateFilterButtons();
      updateAddress();
      renderEntries();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLocaleLowerCase();
      updateAddress();
      renderEntries();
    });
  }

  sortSelect.addEventListener("change", (event) => {
    activeSort = event.target.value;
    renderEntries();
  });

  loadData()
    .then((sourceData) => {
      // Keep the server-rendered archive if the enhanced dataset is unavailable.
      if (sourceData.length === 0 && entryList.children.length > 0) return;
      entries = sourceData.map(buildEntry);
      updateFilterButtons();
      renderEntries();
    })
    .catch(() => {
      // Preserve usable article links when loading or parsing fails.
      if (!entryList.children.length) {
        appendText(entryList, "p", "research-empty", "Research updates could not be loaded in this preview.");
      }
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
