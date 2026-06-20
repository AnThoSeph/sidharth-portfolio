(function () {
  "use strict";

  function getProjectsData() {
    return window.PROJECTS_DATA || [];
  }

  function getSlugFromUrl() {
    if (window.getProjectSlugFromLocation) {
      return window.getProjectSlugFromLocation(window.location);
    }
    return new URLSearchParams(window.location.search).get("slug");
  }

  function projectHref(slug) {
    if (window.projectCaseStudyUrl) {
      return window.projectCaseStudyUrl(slug);
    }
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function getProjectFromList(slug) {
    const PROJECTS_DATA = getProjectsData();
    if (!PROJECTS_DATA.length || !slug) return null;
    return PROJECTS_DATA.find((p) => p.slug === slug) || null;
  }

  function img(src, alt, className) {
    return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${window.PROJECT_PLACEHOLDER || "assets/projects/_shared/placeholder.svg"}'">`;
  }

  function getNeighbors(slug) {
    const PROJECTS_DATA = getProjectsData();
    const i = PROJECTS_DATA.findIndex((p) => p.slug === slug);
    const prev = PROJECTS_DATA[(i - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
    const next = PROJECTS_DATA[(i + 1) % PROJECTS_DATA.length];
    return { prev, next };
  }

  function getCompareImages(project) {
    const steps = project.process || [];
    const blockoutStep = steps.find(
      (s) =>
        /blockout|greybox|graybox/i.test(s.step || "") ||
        /blockout|greybox|graybox/i.test(s.caption || "")
    );
    const before =
      project.compareBefore ||
      (blockoutStep && blockoutStep.image) ||
      (steps[1] && steps[1].image) ||
      (steps[0] && steps[0].image) ||
      project.wireframe;
    const after = project.compareAfter || project.beauty;
    const beforeLabel =
      project.compareBeforeLabel ||
      (blockoutStep && blockoutStep.step.replace(/^\d+\s*\/\s*/i, "").trim()) ||
      "Blockout";
    return {
      before,
      after,
      beforeLabel,
      afterLabel: project.compareAfterLabel || "Final",
    };
  }

  function buildLightboxImages(project, compare) {
    const items = [
      { src: compare.after, alt: `${project.title}, ${compare.afterLabel}`, caption: compare.afterLabel },
      { src: compare.before, alt: `${project.title}, ${compare.beforeLabel}`, caption: compare.beforeLabel },
    ];
    (project.gallery || []).forEach((src, i) => {
      items.push({ src, alt: `${project.title} gallery ${i + 1}`, caption: `Gallery frame ${i + 1}` });
    });
    (project.process || []).forEach((step) => {
      items.push({
        src: step.image,
        alt: step.caption,
        caption: `${step.step}, ${step.caption}`,
      });
    });
    return items;
  }

  function render(project) {
    const root = document.getElementById("case-study-root");
    if (!root) return;

    const { prev, next } = getNeighbors(project.slug);
    const compare = getCompareImages(project);
    const lightboxImages = buildLightboxImages(project, compare);
    const galleryOffset = 2;
    const processOffset = galleryOffset + (project.gallery || []).length;

    const processHtml = (project.process || [])
      .map(
        (step, i) => `
        <article class="process-step motion-section">
          <div class="aspect-video rounded-lg overflow-hidden bg-[#111] mb-4 border border-white/5 relative">
            <button type="button" class="lightbox-trigger" data-lightbox-index="${processOffset + i}" aria-label="View ${step.step} full size">
              ${img(step.image, step.caption, "w-full h-full object-cover")}
              <span class="gallery-zoom-hint">View</span>
            </button>
          </div>
          <p class="font-label text-xs uppercase tracking-[0.25em] text-white/50 mb-2">${step.step}</p>
          <p class="font-body text-white/60">${step.caption}</p>
        </article>
      `
      )
      .join("");

    const galleryHtml = (project.gallery || [])
      .map(
        (src, i) => `
        <figure class="gallery-item aspect-[4/3] motion-section">
          <button type="button" class="lightbox-trigger" data-lightbox-index="${galleryOffset + i}" aria-label="Open gallery image ${i + 1}">
            ${img(src, `${project.title} gallery ${i + 1}`, "w-full h-full object-cover")}
            <span class="gallery-zoom-hint">View</span>
          </button>
        </figure>
      `
      )
      .join("");

    const modelSection = project.modelGlb
      ? `
      <section class="py-16 px-12 border-t border-white/5 motion-section is-visible">
        <div class="max-w-[1400px] mx-auto">
          <span class="font-label text-white/50 text-sm uppercase tracking-[0.3em] mb-4 block">Interactive</span>
          <h2 class="font-headline text-3xl font-bold mb-6">Explore in 3D</h2>
          <p class="font-body text-white/50 mb-8 max-w-xl model-viewer-hint">Drag to rotate · scroll to zoom · use controls below · Expand for full screen (Esc to exit)</p>
          <div class="model-viewer-wrap">
            <div class="model-viewer-controls">
              <button type="button" class="model-viewer-tool-btn model-viewer-reset-btn" aria-label="Reset camera view">Reset</button>
              <button type="button" class="model-viewer-tool-btn model-viewer-autorotate-btn" aria-label="Toggle auto-rotate" aria-pressed="false">Auto-rotate</button>
            </div>
            <button type="button" class="model-viewer-tool-btn model-viewer-expand-btn" aria-label="View 3D model full screen" aria-pressed="false">Expand</button>
            <div class="model-viewer-host" data-model-src="${project.modelGlb}" data-model-title="${project.title}"></div>
          </div>
          <p class="model-viewer-status font-label text-xs uppercase tracking-widest text-white/40 mt-4" aria-live="polite">Loading 3D model…</p>
          <p class="model-viewer-error hidden font-label text-sm text-white/50 mt-4 max-w-xl"></p>
        </div>
      </section>
    `
      : "";

    root.innerHTML = `
      <section class="pt-32 pb-12 px-12 border-b border-white/5 motion-section is-visible">
        <div class="max-w-[1400px] mx-auto">
          <a href="projects.html" class="font-label text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-8 inline-block">← All Projects</a>
          <span class="font-label text-white/50 text-sm uppercase tracking-[0.3em] mb-4 block">Case Study</span>
          <h1 class="page-title font-headline text-5xl md:text-7xl font-black uppercase leading-none mb-6" id="page-title">${project.title}</h1>
          <p class="font-body text-xl text-white/60 max-w-3xl">${project.summary}</p>
        </div>
      </section>

      <section class="px-12 pb-16 motion-section">
        <div class="max-w-[1400px] mx-auto">
          <p class="font-label text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Drag the handle to compare · Click expand for full screen</p>
          <div class="compare-slider" data-compare-slider>
            <img class="compare-img compare-img--after" src="${compare.after}" alt="${project.title}, ${compare.afterLabel}" fetchpriority="high" decoding="async">
            <img class="compare-img compare-img--before" src="${compare.before}" alt="${project.title}, ${compare.beforeLabel}" decoding="async">
            <input type="range" class="compare-range" min="0" max="100" value="50" aria-label="Drag to compare before and after renders">
            <div class="compare-handle" aria-hidden="true"></div>
            <span class="compare-label compare-label--before">${compare.beforeLabel}</span>
            <span class="compare-label compare-label--after">${compare.afterLabel}</span>
            <button type="button" class="compare-expand-btn" data-lightbox-index="0" aria-label="View final render full size">Expand</button>
          </div>
        </div>
      </section>

      <section class="py-20 px-12 bg-[#050505] border-y border-white/5 motion-section">
        <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 class="font-label text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Problem</h2>
            <p class="font-body text-lg text-white/70 leading-relaxed">${project.problem}</p>
          </div>
          <div>
            <h2 class="font-label text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Approach</h2>
            <p class="font-body text-lg text-white/70 leading-relaxed">${project.approach}</p>
          </div>
          <div>
            <h2 class="font-label text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Outcome</h2>
            <p class="font-body text-lg text-white/70 leading-relaxed">${project.outcome}</p>
          </div>
        </div>
      </section>

      <section class="py-20 px-12 motion-section">
        <div class="max-w-[1400px] mx-auto">
          <span class="font-label text-white/50 text-sm uppercase tracking-[0.3em] mb-4 block">Pipeline</span>
          <h2 class="font-headline text-4xl font-bold mb-12">Process breakdown</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">${processHtml}</div>
        </div>
      </section>

      <section class="py-20 px-12 border-t border-white/5 motion-section">
        <div class="max-w-[1400px] mx-auto">
          <span class="font-label text-white/50 text-sm uppercase tracking-[0.3em] mb-4 block">Gallery</span>
          <h2 class="font-headline text-4xl font-bold mb-4">Additional frames</h2>
          <p class="font-label text-xs uppercase tracking-[0.2em] text-white/40 mb-12">Click any image to open the lightbox</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${galleryHtml}</div>
        </div>
      </section>

      ${modelSection}

      <section class="py-16 px-12 border-t border-white/5 motion-section">
        <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-8 items-center">
          <a href="${projectHref(prev.slug)}" data-project-slug="${prev.slug}" class="font-headline text-lg uppercase tracking-tight hover:text-white/60 transition-colors">← ${prev.title}</a>
          <a href="projects.html" class="font-label text-xs uppercase tracking-[0.3em] border border-white/20 px-6 py-3 hover:bg-white/5 transition-colors">All projects</a>
          <a href="${projectHref(next.slug)}" data-project-slug="${next.slug}" class="font-headline text-lg uppercase tracking-tight hover:text-white/60 transition-colors text-right">${next.title} →</a>
        </div>
      </section>

      <section class="py-24 px-12 motion-section">
        <div class="max-w-[1400px] mx-auto text-center">
          <h2 class="font-headline text-4xl font-bold mb-6">Start a similar project</h2>
          <a href="contact.html" class="inline-block font-headline text-sm uppercase tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white/5 transition-colors magnetic-button">Get in touch</a>
        </div>
      </section>
    `;

    document.title = `${project.title} | SIDHARTH KV`;

    if (window.rememberProjectSlug) {
      window.rememberProjectSlug(project.slug);
    }
    if (window.syncProjectUrl) {
      window.syncProjectUrl(project.slug);
    }
    if (window.bindCaseStudyNavLinks) {
      window.bindCaseStudyNavLinks(root);
    }

    if (typeof window.initCompareSliders === "function") {
      window.initCompareSliders(root);
    }
    if (window.ProjectLightbox) {
      window.ProjectLightbox.setImages(lightboxImages);
      window.ProjectLightbox.bindTriggers(root);
    }
    initModelViewerHost(root);
    initMotionAfterRender();
  }

  function initModelViewerHost(root) {
    const wrap = root.querySelector(".model-viewer-wrap");
    const host = root.querySelector(".model-viewer-host");
    const expandBtn = root.querySelector(".model-viewer-expand-btn");
    const resetBtn = root.querySelector(".model-viewer-reset-btn");
    const autoRotateBtn = root.querySelector(".model-viewer-autorotate-btn");
    if (!host) return;

    const src = host.dataset.modelSrc;
    const title = host.dataset.modelTitle || "3D model";
    const statusEl = root.querySelector(".model-viewer-status");
    const errorEl = root.querySelector(".model-viewer-error");

    function setStatus(text) {
      if (statusEl) statusEl.textContent = text;
    }

    function showError(message) {
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove("hidden");
      }
      setStatus("");
    }

    function isFullscreenActive() {
      const fsEl = document.fullscreenElement;
      return fsEl === wrap || (host && fsEl === host.querySelector("model-viewer"));
    }

    function syncExpandButton() {
      if (!expandBtn) return;
      const active = isFullscreenActive();
      expandBtn.textContent = active ? "Exit" : "Expand";
      expandBtn.setAttribute("aria-pressed", active ? "true" : "false");
      expandBtn.setAttribute("aria-label", active ? "Exit full screen" : "View 3D model full screen");
    }

    function initViewerControls(modelViewer) {
      let defaultCamera = null;

      function syncAutoRotateButton(active) {
        if (!autoRotateBtn) return;
        autoRotateBtn.setAttribute("aria-pressed", active ? "true" : "false");
        autoRotateBtn.classList.toggle("is-active", active);
        autoRotateBtn.textContent = active ? "Auto-rotate on" : "Auto-rotate";
      }

      function captureDefaultCamera() {
        if (!modelViewer || typeof modelViewer.getCameraOrbit !== "function") return;
        defaultCamera = {
          orbit: modelViewer.getCameraOrbit(),
          target: modelViewer.getCameraTarget(),
          fov: modelViewer.getFieldOfView(),
        };
      }

      function resetCamera() {
        if (!modelViewer || !defaultCamera) return;
        modelViewer.cameraOrbit = defaultCamera.orbit;
        modelViewer.cameraTarget = defaultCamera.target;
        modelViewer.fieldOfView = defaultCamera.fov;
        if (typeof modelViewer.resetTurntableRotation === "function") {
          modelViewer.resetTurntableRotation();
        }
        if (typeof modelViewer.jumpCameraToGoal === "function") {
          modelViewer.jumpCameraToGoal();
        }
      }

      if (resetBtn) {
        resetBtn.addEventListener("click", resetCamera);
      }

      if (autoRotateBtn) {
        autoRotateBtn.addEventListener("click", () => {
          modelViewer.autoRotate = !modelViewer.autoRotate;
          syncAutoRotateButton(modelViewer.autoRotate);
        });
        syncAutoRotateButton(false);
      }

      return { captureDefaultCamera, syncAutoRotateButton };
    }

    function initFullscreenControls(modelViewer) {
      if (!expandBtn || !wrap) return;

      async function enterFullscreen() {
        try {
          if (modelViewer && typeof modelViewer.enterFullscreen === "function") {
            await modelViewer.enterFullscreen();
            return;
          }
          if (wrap.requestFullscreen) {
            await wrap.requestFullscreen();
          }
        } catch (err) {
          console.warn("Fullscreen request failed:", err);
        }
      }

      async function exitFullscreen() {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }

      expandBtn.addEventListener("click", () => {
        if (isFullscreenActive()) {
          exitFullscreen();
        } else {
          enterFullscreen();
        }
      });

      document.addEventListener("fullscreenchange", syncExpandButton);
      syncExpandButton();
    }

    if (location.protocol === "file:") {
      showError(
        "3D preview requires HTTP. Open the site via your host URL or run: npx --yes serve ."
      );
      return;
    }

    function mountViewer() {
      host.innerHTML = "";
      const mv = document.createElement("model-viewer");
      mv.className = "project-model-viewer";
      mv.src = src;
      mv.alt = `${title} 3D model`;
      mv.setAttribute("camera-controls", "");
      mv.setAttribute("touch-action", "pan-y");
      mv.setAttribute("shadow-intensity", "0.9");
      mv.setAttribute("exposure", "1");
      mv.setAttribute("loading", "eager");
      mv.setAttribute("reveal", "auto");
      mv.setAttribute("interaction-prompt", "auto");
      mv.setAttribute(
        "environment-image",
        "https://modelviewer.dev/shared-assets/environments/neutral.hdr"
      );
      mv.setAttribute("auto-rotate-delay", "0");
      mv.setAttribute("rotation-per-second", "22deg");
      mv.style.setProperty("--poster-color", "#0a0a0a");

      const viewerControls = initViewerControls(mv);

      mv.addEventListener("load", () => {
        setStatus("Drag to rotate · Reset or Auto-rotate below");
        if (errorEl) errorEl.classList.add("hidden");
        viewerControls.captureDefaultCamera();
      });

      mv.addEventListener("error", () => {
        showError(
          `Could not load the 3D model (${src}). Check the file is deployed and refresh the page.`
        );
      });

      host.appendChild(mv);
      initFullscreenControls(mv);
    }

    if (window.customElements && window.customElements.get("model-viewer")) {
      mountViewer();
      return;
    }

    setStatus("Loading 3D viewer…");
    customElements
      .whenDefined("model-viewer")
      .then(mountViewer)
      .catch(() => {
        showError("3D viewer failed to load. Check your internet connection and refresh.");
      });
  }

  function initMotionAfterRender() {
    const sections = [...document.querySelectorAll("#case-study-root .motion-section")];
    sections.forEach((section, index) => {
      section.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
      if (section.classList.contains("is-visible")) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(section);
    });
  }

  function renderNotFound(slug) {
    const root = document.getElementById("case-study-root");
    if (!root) return;
    const detail = slug
      ? `<p class="font-body text-white/50 mb-6">No case study for “${slug}”.</p>`
      : `<p class="font-body text-white/50 mb-6">Open a project from the <a href="projects.html" class="text-white underline">Projects</a> page.</p>`;
    root.innerHTML = `
      <section class="min-h-[60vh] flex items-center justify-center px-12 pt-32">
        <div class="text-center">
          <h1 class="font-headline text-4xl font-bold mb-4">Project not found</h1>
          ${detail}
          <a href="projects.html" class="font-label uppercase tracking-widest text-white/60 hover:text-white">← Back to projects</a>
        </div>
      </section>
    `;
  }

  function init() {
    const run = async () => {
      let slug = getSlugFromUrl();

      if (!slug) {
        renderNotFound(null);
        return;
      }

      let project = getProjectFromList(slug);
      if (!project && window.loadProjectBySlug) {
        project = await window.loadProjectBySlug(slug);
      }

      if (project) {
        render(project);
      } else {
        renderNotFound(slug);
      }
    };

    if (window.loadPortfolioData) {
      window.loadPortfolioData().then(run).catch(async () => {
        const slug = getSlugFromUrl();
        if (!slug) {
          renderNotFound(null);
          return;
        }
        const project = window.loadProjectBySlug
          ? await window.loadProjectBySlug(slug)
          : null;
        if (project) render(project);
        else renderNotFound(slug);
      });
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
