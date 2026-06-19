(function () {
  "use strict";

  function getPhotos() {
    return window.PHOTOGRAPHY_DATA || [];
  }

  function imgWithFallback(src, alt, className) {
    const placeholder = window.PHOTO_PLACEHOLDER || "assets/projects/_shared/placeholder.svg";
    return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${placeholder}'">`;
  }

  function renderGrid() {
    const grid = document.getElementById("photography-grid");
    const PHOTOGRAPHY_DATA = getPhotos();
    if (!grid) return;

    if (!PHOTOGRAPHY_DATA.length) {
      grid.innerHTML = `<p class="font-label text-white/40 col-span-full">No photos yet.</p>`;
      return;
    }

    const PHOTO_CATEGORY_LABELS = window.PHOTO_CATEGORY_LABELS || {};

    grid.innerHTML = PHOTOGRAPHY_DATA.map((photo, index) => {
      const label = PHOTO_CATEGORY_LABELS[photo.category] || photo.category;
      return `
        <article class="photo-card group ${photo.gridClass || "md:col-span-4"}" data-category="${photo.category}" data-photo-index="${index}">
          <button type="button" class="photo-card-trigger w-full text-left" data-lightbox-index="${index}" aria-label="View ${photo.title}">
            <div class="${photo.aspect || "aspect-video"} rounded-xl overflow-hidden bg-[#111] mb-4 border border-white/5 relative">
              ${imgWithFallback(photo.src, photo.title, "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110")}
              <span class="gallery-zoom-hint">View</span>
            </div>
            <h3 class="font-headline text-2xl font-bold">${photo.title.toUpperCase()}</h3>
            <p class="font-label text-sm text-white/40 uppercase tracking-widest">${label} / ${photo.year}</p>
          </button>
        </article>
      `;
    }).join("");
  }

  function initFilters() {
    const buttons = document.querySelectorAll("[data-photo-filter]");
    const cards = document.querySelectorAll("#photography-grid .photo-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.photoFilter;
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        cards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });

    const allBtn = document.querySelector('[data-photo-filter="all"]');
    if (allBtn) allBtn.classList.add("is-active");
  }

  function initLightbox() {
    if (!window.ProjectLightbox) return;
    const PHOTOGRAPHY_DATA = getPhotos();
    if (!PHOTOGRAPHY_DATA.length) return;

    const items = PHOTOGRAPHY_DATA.map((photo) => ({
      src: photo.src,
      alt: photo.title,
      caption: `${photo.caption || photo.title}${photo.location ? ` · ${photo.location}` : ""}`,
    }));

    window.ProjectLightbox.setImages(items);
    window.ProjectLightbox.bindTriggers(document);
  }

  function init() {
    const run = () => {
      renderGrid();
      initFilters();
      initLightbox();
    };

    if (window.loadPhotographyData) {
      window.loadPhotographyData().then(run).catch(() => run());
    } else {
      run();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
