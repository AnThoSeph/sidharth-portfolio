(function () {
  "use strict";

  const PLACEHOLDER = "assets/projects/_shared/placeholder.svg";

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

  function bindFeaturedLinks() {
    const grid = document.getElementById("featured-projects-grid");
    if (!grid) return;

    grid.querySelectorAll("a.project-card[data-slug]").forEach((link) => {
      const slug = link.dataset.slug;
      if (!slug) return;
      link.href = projectHref(slug);
      link.addEventListener("click", () => {
        if (window.rememberProjectSlug) window.rememberProjectSlug(slug);
      });
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

    grid.innerHTML = projects
      .map(
        (p) => `
      <a href="${projectHref(p.slug)}" data-slug="${p.slug}" class="${p.gridClass || "md:col-span-4"} group cursor-pointer project-card block">
        <div class="relative ${p.aspect || "aspect-video"} rounded-xl overflow-hidden bg-[#111] mb-6 border border-white/5">
          <img class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="${p.thumb}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
        </div>
        <h3 class="font-headline text-2xl font-bold text-white mb-1">${p.title.toUpperCase()}</h3>
        <p class="font-label text-sm text-white/40 uppercase tracking-widest">${subtitle(p)}</p>
      </a>`
      )
      .join("");

    bindFeaturedLinks();
  }

  function init() {
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
