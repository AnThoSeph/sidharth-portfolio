(function () {
  "use strict";

  const PLACEHOLDER = "assets/projects/_shared/placeholder.svg";

  function cardImage(project) {
    return project.cardImage || project.hero || project.thumb || PLACEHOLDER;
  }

  function subtitle(project) {
    const labels = window.CATEGORY_LABELS || {};
    const cat = labels[project.category] || project.category;
    return `${cat} / ${project.year}`;
  }

  function projectHref(slug) {
    if (window.projectCaseStudyUrl) {
      return window.projectCaseStudyUrl(slug);
    }
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function featuredGridClass(project, layout) {
    if (layout === "sidebar") return "block w-full";
    if (layout === "hero") return project.gridClass || "md:col-span-8";
    return project.gridClass || "md:col-span-4";
  }

  function featuredAspect(project, layout) {
    if (layout === "sidebar") return "aspect-[3/4]";
    if (layout === "hero") return project.aspect || "aspect-[3/4]";
    return project.aspect || "aspect-square";
  }

  function renderFeaturedCard(project, layout) {
    return `
      <a href="${projectHref(project.slug)}" data-slug="${project.slug}" class="${featuredGridClass(project, layout)} group cursor-pointer project-card block">
        <div class="relative ${featuredAspect(project, layout)} rounded-xl overflow-hidden bg-[#111] mb-6 border border-white/5">
          <img class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="${cardImage(project)}" alt="${project.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
        </div>
        <h3 class="font-headline text-2xl font-bold text-white mb-1">${project.title.toUpperCase()}</h3>
        <p class="font-label text-sm text-white/40 uppercase tracking-widest">${subtitle(project)}</p>
      </a>`;
  }

  function bindFeaturedLinks() {
    const grid = document.getElementById("featured-projects-grid");
    if (!grid) return;

    grid.querySelectorAll("a.project-card[data-slug]").forEach((link) => {
      const slug = link.dataset.slug;
      if (!slug) return;
      link.href = projectHref(slug);
    });
  }

  function initFeaturedNavigation() {
    const grid = document.getElementById("featured-projects-grid");
    if (!grid || grid.dataset.navBound) return;
    grid.dataset.navBound = "1";

    grid.addEventListener("click", (event) => {
      const link = event.target.closest("a.project-card[data-slug]");
      if (!link) return;
      const slug = link.dataset.slug;
      if (slug && window.rememberProjectSlug) window.rememberProjectSlug(slug);
    });
  }

  function renderFeaturedProjects() {
    const grid = document.getElementById("featured-projects-grid");
    const countEl = document.getElementById("featured-projects-count");
    if (!grid) return;

    const all = window.PROJECTS_DATA || [];
    const featuredSlugs = (window.SITE_SETTINGS && window.SITE_SETTINGS.featuredSlugs) || [];
    const projects = featuredSlugs
      .map((slug) => all.find((p) => p.slug === slug))
      .filter(Boolean);

    if (countEl) {
      countEl.textContent = `View all ${all.length} project${all.length === 1 ? "" : "s"} →`;
    }

    if (!projects.length) {
      grid.innerHTML = `<p class="font-body text-white/50 col-span-full">No featured projects configured.</p>`;
      return;
    }

    const useHeroLayout = projects[0]?.slug === "bragus" && projects.length >= 2;
    let html = "";

    if (useHeroLayout) {
      const [bragus, ...rest] = projects;
      const sidebar = rest.slice(0, 2);
      const remaining = rest.slice(2);

      html += `
        <div class="projects-hero-row md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          ${renderFeaturedCard(bragus, "hero")}
          ${
            sidebar.length
              ? `<div class="projects-hero-sidebar md:col-span-4 flex flex-col gap-8">${sidebar
                  .map((p) => renderFeaturedCard(p, "sidebar"))
                  .join("")}</div>`
              : ""
          }
        </div>`;
      html += remaining.map((p) => renderFeaturedCard(p, "grid")).join("");
    } else {
      html = projects.map((p) => renderFeaturedCard(p, "grid")).join("");
    }

    grid.innerHTML = html;
    bindFeaturedLinks();
  }

  function init() {
    initFeaturedNavigation();

    const run = () => renderFeaturedProjects();
    if (window.loadPortfolioData) {
      window.loadPortfolioData().then(run);
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
