(function () {
  "use strict";

  const SLUG_STORAGE_KEY = "sid-portfolio-project-slug";

  function isLocalDevHost() {
    if (typeof location === "undefined") return false;
    if (location.protocol === "file:") return true;
    const host = location.hostname;
    return host === "localhost" || host === "127.0.0.1";
  }

  function usesProjectRoute() {
    if (typeof location === "undefined") return false;
    const path = location.pathname.replace(/\/+$/, "");
    return path === "/project" || /\/project\.html$/i.test(path);
  }

  function projectCaseStudyUrl(slug) {
    if (!slug) return "projects.html";
    const encoded = encodeURIComponent(slug);
    const query = `?slug=${encoded}`;

    if (isLocalDevHost()) {
      if (usesProjectRoute()) {
        return `/project${query}`;
      }
      return `project.html${query}`;
    }

    return `/project${query}`;
  }

  function getProjectSlugFromLocation(loc) {
    const target = loc || (typeof location !== "undefined" ? location : null);
    if (!target) return null;

    const params = new URLSearchParams(target.search || "");
    const fromQuery = params.get("slug");
    if (fromQuery && fromQuery.trim()) return fromQuery.trim();

    const path = (target.pathname || "").replace(/\/+$/, "");
    const pathMatch = path.match(/\/project(?:\.html)?\/([^/?#]+)/i);
    if (pathMatch && pathMatch[1]) {
      try {
        return decodeURIComponent(pathMatch[1]).trim();
      } catch (e) {
        return pathMatch[1].trim();
      }
    }

    try {
      const stored = sessionStorage.getItem(SLUG_STORAGE_KEY);
      if (stored && stored.trim()) return stored.trim();
    } catch (e) {
      /* private browsing */
    }

    return null;
  }

  function rememberProjectSlug(slug) {
    if (!slug) return;
    try {
      sessionStorage.setItem(SLUG_STORAGE_KEY, slug);
    } catch (e) {
      /* ignore */
    }
  }

  function syncProjectUrl(slug) {
    if (!slug || typeof history === "undefined" || !history.replaceState) return;
    rememberProjectSlug(slug);
    const nextUrl = projectCaseStudyUrl(slug);
    try {
      history.replaceState({}, "", nextUrl);
    } catch (e) {
      /* ignore */
    }
  }

  function bindCaseStudyNavLinks(root) {
    if (!root) return;
    root.querySelectorAll("[data-project-slug]").forEach((link) => {
      const slug = link.getAttribute("data-project-slug");
      if (!slug) return;
      link.href = projectCaseStudyUrl(slug);
      if (link.dataset.projectNavBound) return;
      link.dataset.projectNavBound = "1";
      link.addEventListener("click", () => rememberProjectSlug(slug));
    });
  }

  window.projectCaseStudyUrl = projectCaseStudyUrl;
  window.getProjectSlugFromLocation = getProjectSlugFromLocation;
  window.rememberProjectSlug = rememberProjectSlug;
  window.syncProjectUrl = syncProjectUrl;
  window.bindCaseStudyNavLinks = bindCaseStudyNavLinks;
})();
