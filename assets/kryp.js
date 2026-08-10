(() => {
  const videos = [...document.querySelectorAll("[data-ambient-video]")];
  const toggle = document.querySelector("[data-motion-toggle]");

  if (!videos.length || !toggle) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionActive = !reducedMotion.matches;

  const updateMotion = () => {
    videos.forEach((video) => {
      if (motionActive) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    toggle.setAttribute("aria-pressed", String(motionActive));
    toggle.textContent = motionActive ? "Pause motion" : "Play motion";
  };

  toggle.addEventListener("click", () => {
    motionActive = !motionActive;
    updateMotion();
  });

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) {
      motionActive = false;
      updateMotion();
    }
  });

  updateMotion();
})();
