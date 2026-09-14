(() => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const previousButton = carousel.querySelector("[data-prev]");
  const nextButton = carousel.querySelector("[data-next]");
  const controls = carousel.querySelector("[data-controls]");
  const dotsContainer = carousel.querySelector("[data-dots]");
  const toggleButton = carousel.querySelector("[data-toggle]");
  const status = carousel.querySelector("[data-status]");

  if (!viewport || slides.length < 2 || !previousButton || !nextButton || !controls || !dotsContainer || !toggleButton || !status) {
    return;
  }

  // Approved homepage photo pool. The two anchors remain every month; the
  // remaining slots are selected deterministically from this list.
  const photoPool = [
    {
      id: "alma",
      name: "Alma",
      species: "Acanthoscurria geniculata",
      src: "assets/collection/alma-acanthoscurria-geniculata.jpg",
      alt: "Macro portrait of Alma, an Acanthoscurria geniculata tarantula",
      href: "species/acanthoscurria-geniculata.html",
      anchor: true
    },
    {
      id: "ruby",
      name: "Ruby",
      species: "Chromatopelma cyaneopubescens",
      src: "assets/collection/ruby-frontal-portrait-2026.jpg",
      alt: "Ruby, a Chromatopelma cyaneopubescens tarantula showing cobalt-blue legs and an orange abdomen",
      href: "species/ruby-chromatopelma-cyaneopubescens.html",
      anchor: true
    },
    {
      id: "clara",
      name: "Clara",
      species: "Psalmopoeus irminia",
      src: "assets/collection/clara-psalmopoeus-irminia.jpg",
      alt: "Clara, a Psalmopoeus irminia tarantula, peering through green leaves",
      href: "species/clara-psalmopoeus-irminia.html"
    },
    {
      id: "siuzi",
      name: "Siuzi",
      species: "Theraphosa apophysis",
      src: "assets/collection/siuzi-theraphosa-apophysis.jpg",
      alt: "Siuzi, a Theraphosa apophysis tarantula",
      href: "species/siuzi-theraphosa-apophysis.html"
    },
    {
      id: "sabrina",
      name: "Sabrina",
      species: "Brachypelma hamorii",
      src: "assets/collection/sabrina-homepage-close.jpg",
      alt: "Close portrait of Sabrina, a Brachypelma hamorii tarantula",
      href: "species/sabrina-brachypelma-hamorii.html"
    },
    {
      id: "bella",
      name: "Bella",
      species: "Monocentropus balfouri",
      src: "assets/collection/bella-monocentropus-balfouri.jpg",
      alt: "Bella, a Monocentropus balfouri tarantula",
      href: "species/bella-monocentropus-balfouri.html"
    },
    {
      id: "elvira",
      name: "Elvira",
      species: "Chilobrachys natanicharum",
      src: "assets/collection/elvira-chilobrachys-natanicharum.jpg",
      alt: "Elvira, a Chilobrachys natanicharum tarantula",
      href: "species/elvira-chilobrachys-natanicharum.html"
    },
    {
      id: "gunnar",
      name: "Gunnar",
      species: "Ceratogyrus darlingi",
      src: "assets/collection/ceratogyrus-darlingi.jpg",
      alt: "Gunnar, a Ceratogyrus darlingi tarantula",
      href: "species/ceratogyrus-darlingi.html"
    },
    {
      id: "runa",
      name: "Runa",
      species: "Grammostola pulchripes",
      src: "assets/collection/grammostola-pulchripes.jpg",
      alt: "Runa, a Grammostola pulchripes tarantula",
      href: "species/grammostola-pulchripes.html"
    },
    {
      id: "orion",
      name: "Orion",
      species: "Omothymus violaceopes",
      src: "assets/collection/omothymus-violaceopes.jpg",
      alt: "Orion, an Omothymus violaceopes tarantula",
      href: "species/omothymus-violaceopes.html"
    },
    {
      id: "kaeng-krachan",
      name: "Kaeng Krachan",
      species: "Chilobrachys sp. Kaeng Krachan",
      src: "assets/collection/chilobrachys-kaeng-krachan.jpg",
      alt: "Chilobrachys sp. Kaeng Krachan at its webbed retreat",
      href: "species/chilobrachys-kaeng-krachan.html"
    },
    {
      id: "linothele-fallax",
      name: "Linothele fallax",
      species: "Linothele fallax",
      src: "assets/collection/linothele-fallax.jpg",
      alt: "Linothele fallax standing on its dense sheet web",
      href: "species/linothele-fallax.html",
      variety: true
    },
    {
      id: "psyttala-horrida",
      name: "Assassin bug",
      species: "Psyttala horrida",
      src: "assets/collection/psyttala-horrida.jpg",
      alt: "Adult Psyttala horrida assassin bug moving across the enclosure floor",
      href: "species/psyttala-horrida.html",
      variety: true
    },
    {
      id: "pachnoda-marginata",
      name: "Sun beetles",
      species: "Pachnoda marginata",
      src: "assets/collection/pachnoda-marginata.jpg",
      alt: "Three Pachnoda marginata sun beetles clustered on a branch",
      href: "species/pachnoda-marginata.html",
      variety: true
    },
    {
      id: "sonja",
      name: "Sonja",
      species: "Mauremys reevesii",
      src: "assets/collection/sonja-mauremys-reevesii.jpg",
      alt: "Sonja, a Reeves’s turtle, lifting her head and forelegs toward the camera",
      href: "species/sonja-mauremys-reevesii.html",
      variety: true
    }
  ];

  const hashSeed = (value) => {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  };

  const seededRandom = (seed) => {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  };

  const seededShuffle = (items, seedKey) => {
    const output = [...items];
    const random = seededRandom(hashSeed(seedKey));
    for (let i = output.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [output[i], output[j]] = [output[j], output[i]];
    }
    return output;
  };

  const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const selectForMonth = (date) => {
    const anchors = photoPool.filter((photo) => photo.anchor);
    const varietyPool = seededShuffle(
      photoPool.filter((photo) => !photo.anchor && photo.variety),
      "introvertebrates-homepage-variety"
    );
    const mainPool = seededShuffle(
      photoPool.filter((photo) => !photo.anchor && !photo.variety),
      "introvertebrates-homepage-main"
    );

    // Use an absolute month number so every visitor gets the same selection for
    // a given month. Advancing one variety slot and three main slots at a time
    // prevents photos from repeating in consecutive months while the pools are
    // large enough.
    const monthNumber = date.getFullYear() * 12 + date.getMonth();
    const variety = varietyPool[monthNumber % varietyPool.length];
    const mainStart = (monthNumber * 3) % mainPool.length;
    const mainSelection = Array.from({ length: 3 }, (_, offset) =>
      mainPool[(mainStart + offset) % mainPool.length]
    );

    return [anchors[0], variety, mainSelection[0], anchors[1], mainSelection[1], mainSelection[2]].filter(Boolean);
  };

  const now = new Date();
  const monthlySelection = selectForMonth(now).slice(0, slides.length);

  if (monthlySelection.length === slides.length) {
    carousel.dataset.monthlySelection = monthKey(now);

    slides.forEach((slide, slideIndex) => {
      const photo = monthlySelection[slideIndex];
      const label = `${photo.name} — ${photo.species}`;
      const image = slide.querySelector("img");
      const captionLink = slide.querySelector(".carousel-caption-link");
      const name = slide.querySelector(".carousel-name");
      const species = slide.querySelector(".carousel-species");
      const profileLink = slide.querySelector(".carousel-profile-link");

      slide.dataset.label = label;
      slide.setAttribute("aria-label", `${slideIndex + 1} of ${slides.length}: ${photo.name}, ${photo.species}`);

      if (image) {
        image.src = photo.src;
        image.alt = photo.alt;
        image.loading = slideIndex === 0 ? "eager" : "lazy";
        if (slideIndex === 0) {
          image.setAttribute("fetchpriority", "high");
          image.removeAttribute("decoding");
        } else {
          image.removeAttribute("fetchpriority");
          image.setAttribute("decoding", "async");
        }
      }

      if (captionLink) {
        captionLink.href = photo.href;
        captionLink.setAttribute("aria-label", `View ${photo.name}’s ${photo.species} profile`);
      }
      if (name) name.textContent = photo.name;
      if (species) species.textContent = photo.species;
      if (profileLink) profileLink.textContent = "View profile →";
    });
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dots = [];
  let index = 0;
  let timer = null;
  let rotationEnabled = !reducedMotion.matches;
  let hoverPaused = false;
  let inView = true;
  let keyboardNavigation = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const canRotate = () => rotationEnabled && !hoverPaused && !document.hidden && inView;

  const updateToggle = () => {
    toggleButton.textContent = rotationEnabled ? "Pause slideshow" : "Play slideshow";
    toggleButton.setAttribute("aria-pressed", String(!rotationEnabled));
  };

  const scheduleNext = () => {
    window.clearTimeout(timer);
    if (canRotate()) {
      timer = window.setTimeout(() => showSlide(index + 1), 7000);
    }
  };

  const announceSlide = () => {
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = `Showing ${index + 1} of ${slides.length}: ${slides[index].dataset.label}`;
    });
  };

  const showSlide = (nextIndex, announce = false) => {
    index = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.toggleAttribute("inert", !active);
    });

    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    const upcomingImage = slides[(index + 1) % slides.length].querySelector("img");
    if (upcomingImage) {
      upcomingImage.loading = "eager";
      upcomingImage.decode?.().catch(() => {});
    }

    if (announce) announceSlide();
    scheduleNext();
  };

  slides.forEach((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show photograph ${slideIndex + 1}: ${slide.dataset.label}`);
    dot.addEventListener("click", () => showSlide(slideIndex, true));
    dotsContainer.append(dot);
    dots.push(dot);
  });

  carousel.classList.add("is-enhanced");
  previousButton.hidden = false;
  nextButton.hidden = false;
  controls.hidden = false;

  previousButton.addEventListener("click", () => showSlide(index - 1, true));
  nextButton.addEventListener("click", () => showSlide(index + 1, true));

  toggleButton.addEventListener("click", () => {
    rotationEnabled = !rotationEnabled;
    updateToggle();
    scheduleNext();
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(index - 1, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(index + 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1, true);
    }
  });

  viewport.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  viewport.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      showSlide(index + (deltaX < 0 ? 1 : -1), true);
    }
  }, { passive: true });

  carousel.addEventListener("mouseenter", () => {
    hoverPaused = true;
    scheduleNext();
  });

  carousel.addEventListener("mouseleave", () => {
    hoverPaused = false;
    scheduleNext();
  });

  document.addEventListener("pointerdown", () => {
    keyboardNavigation = false;
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") keyboardNavigation = true;
  }, true);

  carousel.addEventListener("focusin", () => {
    if (keyboardNavigation && rotationEnabled) {
      rotationEnabled = false;
      updateToggle();
      scheduleNext();
    }
  });

  document.addEventListener("visibilitychange", scheduleNext);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      scheduleNext();
    }, { threshold: 0.35 });
    observer.observe(carousel);
  }

  const handleMotionChange = (event) => {
    if (event.matches) rotationEnabled = false;
    updateToggle();
    scheduleNext();
  };

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", handleMotionChange);
  } else {
    reducedMotion.addListener(handleMotionChange);
  }

  updateToggle();
  showSlide(0);
})();

(() => {
  const carousel = document.querySelector("[data-instagram-slideshow]");
  if (!carousel) return;

  const viewport = carousel.querySelector("[data-instagram-viewport]");
  const slides = [...carousel.querySelectorAll("[data-instagram-slide]")];
  const previousButton = carousel.querySelector("[data-instagram-prev]");
  const nextButton = carousel.querySelector("[data-instagram-next]");
  const dotsContainer = carousel.querySelector("[data-instagram-dots]");
  const toggleButton = carousel.querySelector("[data-instagram-toggle]");
  const status = carousel.querySelector("[data-instagram-status]");
  if (!viewport || slides.length < 2 || !previousButton || !nextButton || !dotsContainer || !toggleButton || !status) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = null;
  let rotationEnabled = !reducedMotion.matches;
  let inView = true;
  let touchStartX = 0;
  let touchStartY = 0;

  const dots = slides.map((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "instagram-slide-dot";
    dot.setAttribute("aria-label", `Show Instagram item ${slideIndex + 1}: ${slide.dataset.label}`);
    dot.addEventListener("click", () => showSlide(slideIndex, true));
    dotsContainer.append(dot);
    return dot;
  });

  const updateToggle = () => {
    toggleButton.textContent = rotationEnabled ? "Pause slideshow" : "Play slideshow";
    toggleButton.setAttribute("aria-pressed", String(!rotationEnabled));
  };

  const scheduleNext = () => {
    window.clearTimeout(timer);
    if (rotationEnabled && inView && !document.hidden) {
      timer = window.setTimeout(() => showSlide(index + 1), 6500);
    }
  };

  function showSlide(nextIndex, announce = false) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.toggleAttribute("inert", !active);
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (announce) status.textContent = `Showing ${index + 1} of ${slides.length}: ${slides[index].dataset.label}`;
    scheduleNext();
  }

  previousButton.addEventListener("click", () => showSlide(index - 1, true));
  nextButton.addEventListener("click", () => showSlide(index + 1, true));
  toggleButton.addEventListener("click", () => {
    rotationEnabled = !rotationEnabled;
    updateToggle();
    scheduleNext();
  });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(index + (event.key === "ArrowRight" ? 1 : -1), true);
    }
  });
  viewport.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  viewport.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) showSlide(index + (deltaX < 0 ? 1 : -1), true);
  }, { passive: true });
  document.addEventListener("visibilitychange", scheduleNext);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      scheduleNext();
    }, { threshold: 0.3 });
    observer.observe(carousel);
  }

  const handleMotionChange = (event) => {
    if (event.matches) rotationEnabled = false;
    updateToggle();
    scheduleNext();
  };
  if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", handleMotionChange);
  else reducedMotion.addListener(handleMotionChange);

  updateToggle();
  showSlide(0);
})();

(() => {
  const section = document.querySelector("[data-codex-stats]");
  if (!section) return;

  const grid = section.querySelector("[data-codex-highlights]");
  const status = section.querySelector("[data-codex-highlights-status]");
  if (!grid || !status) return;

  const renderHighlight = (highlight) => {
    const card = document.createElement(highlight.profileKey ? "a" : "article");
    card.className = "codex-highlight-card";
    if (highlight.profileKey) card.href = `species/${highlight.profileKey}.html`;

    const label = document.createElement("span");
    label.className = "codex-highlight-label";
    label.textContent = highlight.label;

    const value = document.createElement("strong");
    value.className = "codex-highlight-value";
    value.textContent = highlight.value;

    const detail = document.createElement("span");
    detail.className = "codex-highlight-detail";
    detail.textContent = highlight.detail || "Public Codex snapshot";

    card.append(label, value, detail);
    if (highlight.profileKey) {
      const action = document.createElement("span");
      action.className = "codex-highlight-action";
      action.textContent = "Open profile →";
      card.append(action);
    }
    return card;
  };

  fetch("assets/data/codex-public.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Public Codex snapshot unavailable.");
      return response.json();
    })
    .then((data) => {
      const highlights = Array.isArray(data?.collection?.highlights) ? data.collection.highlights.slice(0, 6) : [];
      if (highlights.length === 0) throw new Error("No public collection highlights available.");

      grid.replaceChildren(...highlights.map(renderHighlight));
      const updated = data.generatedAt
        ? new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(data.generatedAt))
        : null;
      status.textContent = updated
        ? `Privacy-reviewed snapshot · updated ${updated}. No private notes, IDs, contacts, or exact event dates are published.`
        : "Privacy-reviewed snapshot. No private notes, IDs, contacts, or exact event dates are published.";
    })
    .catch(() => {
      grid.replaceChildren();
      const fallback = document.createElement("p");
      fallback.className = "codex-highlight-loading";
      fallback.textContent = "The public collection snapshot is temporarily unavailable. Individual profiles still show their last reviewed records.";
      grid.append(fallback);
    });
})();
