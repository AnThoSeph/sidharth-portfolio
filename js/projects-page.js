(function () {
  "use strict";

  function imgWithFallback(src, alt, className) {
    return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${PROJECT_PLACEHOLDER}'">`;
  }

  function renderProjectsGrid() {
    const grid = document.getElementById("projects-grid");
    if (!grid || typeof PROJECTS_DATA === "undefined") return;

    grid.innerHTML = PROJECTS_DATA.map((p) => {
      const label = CATEGORY_LABELS[p.category] || p.category;
      return `
        <a href="project.html?slug=${p.slug}" class="project-card-link group ${p.gridClass || "md:col-span-4"} project-card" data-category="${p.category}">
          <div class="${p.aspect || "aspect-video"} rounded-xl overflow-hidden bg-[#111] mb-4 border border-white/5">
            ${imgWithFallback(p.thumb, p.title, "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110")}
          </div>
          <h3 class="font-headline text-2xl font-bold">${p.title.toUpperCase()}</h3>
          <p class="font-label text-sm text-white/40 uppercase tracking-widest">${label} / ${p.year}</p>
        </a>
      `;
    }).join("");
  }

  function initFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("#projects-grid [data-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        cards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add("is-active");
  }

  function init() {
    renderProjectsGrid();
    initFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
