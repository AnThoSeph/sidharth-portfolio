(function () {
  "use strict";

  function cardImage(project) {
    const placeholder = window.PROJECT_PLACEHOLDER || "assets/projects/_shared/placeholder.svg";
    return project.cardImage || project.hero || project.thumb || placeholder;
  }

  /** Bragus stays wide; all other cards share one rhythm on the projects page. */
  function projectsGridClass(project, layout) {
    if (layout === "sidebar") return "block w-full";
    if (layout === "hero") return project.gridClass || "md:col-span-8";
    if (project.slug === "bragus") return project.gridClass || "md:col-span-8";
    return "md:col-span-4";
  }

  function projectsAspect(project, layout) {
    if (layout === "sidebar") return "aspect-[3/4]";
    if (layout === "hero") return project.aspect || "aspect-[3/4]";
    if (project.slug === "bragus") return project.aspect || "aspect-[3/4]";
    return "aspect-square";
  }

  function renderProjectCard(project, layout) {
    const label = (window.CATEGORY_LABELS || {})[project.category] || project.category;
    const href = projectHref(project.slug);
    return `
        <a href="${href}" data-slug="${project.slug}" class="project-card-link group ${projectsGridClass(project, layout)} project-card" data-category="${project.category}">
          <div class="${projectsAspect(project, layout)} rounded-xl overflow-hidden bg-[#111] mb-4 border border-white/5">
            ${imgWithFallback(cardImage(project), project.title, "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110")}
          </div>
          <h3 class="font-headline text-2xl font-bold">${project.title.toUpperCase()}</h3>
          <p class="font-label text-sm text-white/40 uppercase tracking-widest">${label} / ${project.year}</p>
        </a>`;
  }

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
    });
  }

  function initProjectCardNavigation() {
    const grid = document.getElementById("projects-grid");
    if (!grid || grid.dataset.navBound) return;
    grid.dataset.navBound = "1";

    grid.addEventListener("click", (event) => {
      const link = event.target.closest("a.project-card-link[data-slug]");
      if (!link) return;
      const slug = link.dataset.slug;
      if (slug && window.rememberProjectSlug) window.rememberProjectSlug(slug);
    });
  }

  function renderProjectsGrid(activeFilter) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const PROJECTS_DATA = window.PROJECTS_DATA || [];
    if (!PROJECTS_DATA.length) {
      grid.innerHTML = `<p class="font-label text-white/40 col-span-full">No projects yet.</p>`;
      return;
    }

    const filter = activeFilter || "all";
    const visible =
      filter === "all" ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === filter);

    if (!visible.length) {
      grid.innerHTML = `<p class="font-label text-white/40 col-span-full">No projects in this category.</p>`;
      return;
    }

    let html = "";

    if (filter === "all") {
      const bragus = visible.find((p) => p.slug === "bragus");
      const rest = visible.filter((p) => p.slug !== "bragus");
      const sidebar = rest.slice(0, 2);
      const remaining = rest.slice(2);

      if (bragus) {
        html += `
        <div class="projects-hero-row md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          ${renderProjectCard(bragus, "hero")}
          ${
            sidebar.length
              ? `<div class="projects-hero-sidebar md:col-span-4 flex flex-col gap-8">${sidebar
                  .map((p) => renderProjectCard(p, "sidebar"))
                  .join("")}</div>`
              : ""
          }
        </div>`;
      }

      html += remaining.map((p) => renderProjectCard(p, "grid")).join("");
    } else {
      html = visible.map((p) => renderProjectCard(p, "grid")).join("");
    }

    grid.innerHTML = html;
    bindProjectCardLinks();
  }

  function initFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    if (!buttons.length || document.body.dataset.projectFiltersBound) return;
    document.body.dataset.projectFiltersBound = "1";

    let activeFilter = "all";

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter || "all";
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        renderProjectsGrid(activeFilter);
      });
    });

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add("is-active");
  }

  function init() {
    initProjectCardNavigation();
    initFilters();

    const run = () => renderProjectsGrid("all");

    if (window.loadPortfolioData) {
      window.loadPortfolioData().then(run).catch(run);
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
