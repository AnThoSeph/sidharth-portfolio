(function () {
  "use strict";

  function imgWithFallback(src, alt, className) {
    return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${window.PROJECT_PLACEHOLDER || "assets/projects/_shared/placeholder.svg"}'">`;
  }

  function projectHref(slug) {
    if (window.projectCaseStudyUrl) {
      return window.projectCaseStudyUrl(slug);
    }
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function bindProjectCardLinks() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.querySelectorAll("a.project-card-link[data-slug]").forEach((link) => {
      const slug = link.dataset.slug;
      if (!slug) return;
      link.href = projectHref(slug);
      link.addEventListener("click", () => {
        if (window.rememberProjectSlug) window.rememberProjectSlug(slug);
      });
    });
  }

  function renderProjectsGrid() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const PROJECTS_DATA = window.PROJECTS_DATA || [];
    if (!PROJECTS_DATA.length) {
      grid.innerHTML = `<p class="font-label text-white/40 col-span-full">No projects yet.</p>`;
      return;
    }

    const CATEGORY_LABELS = window.CATEGORY_LABELS || {};

    grid.innerHTML = PROJECTS_DATA.map((p) => {
      const label = CATEGORY_LABELS[p.category] || p.category;
      const href = projectHref(p.slug);
      return `
        <a href="${href}" data-slug="${p.slug}" class="project-card-link group ${p.gridClass || "md:col-span-4"} project-card" data-category="${p.category}">
          <div class="${p.aspect || "aspect-video"} rounded-xl overflow-hidden bg-[#111] mb-4 border border-white/5">
            ${imgWithFallback(p.thumb, p.title, "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110")}
          </div>
          <h3 class="font-headline text-2xl font-bold">${p.title.toUpperCase()}</h3>
          <p class="font-label text-sm text-white/40 uppercase tracking-widest">${label} / ${p.year}</p>
        </a>
      `;
    }).join("");

    bindProjectCardLinks();
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
    const run = () => {
      renderProjectsGrid();
      initFilters();
    };

    if (window.loadPortfolioData) {
      window.loadPortfolioData().then(run).catch(() => renderProjectsGrid());
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
