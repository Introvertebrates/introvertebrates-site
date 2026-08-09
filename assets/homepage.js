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
