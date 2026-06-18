(function () {
  "use strict";

  const PROJECT_PLACEHOLDER = "assets/projects/_shared/placeholder.svg";

  const CATEGORY_LABELS = {
    product: "Product",
    character: "Character",
    asset: "Asset",
  };

  window.PROJECT_PLACEHOLDER = PROJECT_PLACEHOLDER;
  window.CATEGORY_LABELS = CATEGORY_LABELS;
  window.PROJECTS_DATA = [];
  window.SITE_SETTINGS = { featuredSlugs: [] };

  function normalizeProject(raw) {
    const project = { ...raw };
    if (project.modelGlb === "") project.modelGlb = null;
    if (project.wireframe === "") project.wireframe = null;
    return project;
  }

  async function loadProjects() {
    const orderRes = await fetch("/content/project-order.json");
    if (!orderRes.ok) throw new Error("Could not load project-order.json");
    const order = await orderRes.json();
    const slugs = order.slugs || [];

    const loaded = await Promise.all(
      slugs.map(async (slug) => {
        const res = await fetch(`/content/projects/${slug}.json`);
        if (!res.ok) return null;
        return normalizeProject(await res.json());
      })
    );

    window.PROJECTS_DATA = loaded.filter(Boolean);
    return window.PROJECTS_DATA;
  }

  window.loadProjectBySlug = async function loadProjectBySlug(slug) {
    if (!slug) return null;

    const cached = (window.PROJECTS_DATA || []).find((p) => p.slug === slug);
    if (cached) return cached;

    const res = await fetch(`/content/projects/${slug}.json`);
    if (!res.ok) return null;
    return normalizeProject(await res.json());
  };

  async function loadSiteSettings() {
    try {
      const res = await fetch("/content/site.json");
      if (res.ok) {
        window.SITE_SETTINGS = await res.json();
      }
    } catch (e) {
      /* optional file */
    }
    return window.SITE_SETTINGS;
  }

  window.loadPortfolioData = async function loadPortfolioData() {
    await Promise.all([loadProjects(), loadSiteSettings()]);
    return {
      projects: window.PROJECTS_DATA,
      site: window.SITE_SETTINGS,
    };
  };
})();
