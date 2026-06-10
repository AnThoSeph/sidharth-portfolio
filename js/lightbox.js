(function () {
  "use strict";

  let images = [];
  let currentIndex = 0;
  let lightboxEl = null;

  function getLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.getElementById("lightbox");
    return lightboxEl;
  }

  function renderSlide() {
    const lb = getLightbox();
    if (!lb || !images.length) return;

    const item = images[currentIndex];
    const img = lb.querySelector(".lightbox-img");
    const caption = lb.querySelector(".lightbox-caption");
    const counter = lb.querySelector(".lightbox-counter");

    if (img) {
      img.src = item.src;
      img.alt = item.alt || "";
      img.onerror = function onErr() {
        this.onerror = null;
        if (typeof PROJECT_PLACEHOLDER !== "undefined") this.src = PROJECT_PLACEHOLDER;
      };
    }
    if (caption) caption.textContent = item.caption || item.alt || "";
    if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;

    const prevBtn = lb.querySelector(".lightbox-prev");
    const nextBtn = lb.querySelector(".lightbox-next");
    if (prevBtn) prevBtn.disabled = images.length <= 1;
    if (nextBtn) nextBtn.disabled = images.length <= 1;
  }

  function open(index) {
    const lb = getLightbox();
    if (!lb || !images.length) return;

    currentIndex = ((index % images.length) + images.length) % images.length;
    renderSlide();

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    const closeBtn = lb.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    const lb = getLightbox();
    if (!lb) return;

    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function step(delta) {
    if (!images.length) return;
    currentIndex = (currentIndex + delta + images.length) % images.length;
    renderSlide();
  }

  function setImages(list) {
    images = list.filter((item) => item && item.src);
  }

  function bindTriggers(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-lightbox-index]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const idx = Number(trigger.dataset.lightboxIndex);
        if (!Number.isNaN(idx)) open(idx);
      });
    });
  }

  function initLightboxControls() {
    const lb = getLightbox();
    if (!lb || lb.dataset.lightboxBound === "true") return;
    lb.dataset.lightboxBound = "true";

    lb.querySelector(".lightbox-close")?.addEventListener("click", close);
    lb.querySelector(".lightbox-backdrop")?.addEventListener("click", close);
    lb.querySelector(".lightbox-prev")?.addEventListener("click", () => step(-1));
    lb.querySelector(".lightbox-next")?.addEventListener("click", () => step(1));

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  window.ProjectLightbox = {
    setImages,
    bindTriggers,
    open,
    close,
    initLightboxControls,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLightboxControls);
  } else {
    initLightboxControls();
  }
})();
