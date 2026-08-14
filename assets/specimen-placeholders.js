(() => {
  const placeholders = {
    spider: ["assets/placeholders/spider.png", "spider"],
    "true-spider": ["assets/placeholders/true-spider.png", "true spider"],
    beetle: ["assets/placeholders/beetle.png", "beetle"],
    centipede: ["assets/placeholders/centipede.png", "centipede"],
    cockroach: ["assets/placeholders/cockroach.png", "cockroach"],
    mantis: ["assets/placeholders/mantis.png", "mantis"],
    millipede: ["assets/placeholders/millipede.png", "millipede"],
    "other-arthropod": ["assets/placeholders/other-arthropod.png", "arthropod"],
    scorpion: ["assets/placeholders/scorpion.png", "scorpion"],
    "stick-insect": ["assets/placeholders/stick-insect.png", "stick insect"],
    "true-bug": ["assets/placeholders/true-bug.png", "true bug"]
  };

  const categoryFallbacks = {
    tarantula: "spider",
    "other-spider": "spider"
  };

  const showPlaceholder = (image, key) => {
    const placeholder = placeholders[key];
    if (!placeholder || image.dataset.placeholderActive === "true") return;

    image.dataset.placeholderActive = "true";
    image.src = placeholder[0];
    image.alt = `Generic ${placeholder[1]} category silhouette. A verified photograph is not available for this record.`;

    const frame = image.closest(".resident-photo");
    if (!frame || frame.querySelector(".resident-placeholder-label")) return;

    const label = document.createElement("span");
    label.className = "resident-placeholder-label";
    label.textContent = "Category placeholder · photograph unavailable";
    frame.append(label);
  };

  document.querySelectorAll(".resident-card .resident-photo img").forEach((image) => {
    const card = image.closest(".resident-card");
    const key = image.dataset.placeholder || categoryFallbacks[card?.dataset.category];
    if (!placeholders[key]) return;

    image.addEventListener("error", () => showPlaceholder(image, key), { once: true });
  });
})();
