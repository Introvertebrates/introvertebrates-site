(() => {
  const dataElement = document.getElementById("research-data");
  const entryList = document.getElementById("entry-list");
  const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
  const sortSelect = document.getElementById("sort-select");
  if (!dataElement || !entryList || !sortSelect) return;

  let activeFilter = "all";
  let activeSort = "source-desc";
  let entries = [];

  const categoryToSlug = (category) => {
    if (category === "Behavior") return "behavior";
    if (category === "New species / Taxonomy") return "taxonomy";
    if (category === "General arachnology news") return "general";
    if (category === "Ecology") return "ecology";
    if (category === "Venom") return "venom";
    if (category === "Captive relevance") return "captive";
    return "general";
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
    appendText(header, "span", "badge", entry.category || "Research");

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

  const renderEntries = () => {
    const filtered = entries.filter((entry) => activeFilter === "all" || entry.dataset.category === activeFilter);
    const sorted = sortEntries(filtered, activeSort);
    entryList.replaceChildren();

    if (sorted.length === 0) {
      appendText(entryList, "p", "research-empty", "No research summaries match this filter yet.");
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
      filterButtons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      renderEntries();
    });
  });

  sortSelect.addEventListener("change", (event) => {
    activeSort = event.target.value;
    renderEntries();
  });

  loadData()
    .then((sourceData) => {
      entries = sourceData.map(buildEntry);
      renderEntries();
    })
    .catch(() => {
      entryList.replaceChildren();
      appendText(entryList, "p", "research-empty", "Research updates could not be loaded in this preview.");
    });
})();
