(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function menuShellHtml() {
    return `
    <div class="menu-panel relative flex h-full w-full flex-col menu-dot-grid">
      <div class="absolute inset-0 menu-glossy-gradient pointer-events-none z-0"></div>
      <header class="relative flex items-center justify-between px-8 py-6 z-20 menu-stagger" style="--menu-delay: 30ms;">
        <div class="flex items-center gap-12">
          <div class="flex items-center gap-3">
            <div class="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </div>
            <span class="font-headline font-bold tracking-tight text-xl">SIDHARTH KV</span>
          </div>
          <div class="hidden md:flex flex-col text-xs font-label text-outline uppercase tracking-[0.2em]">
            <span>Location: Kannur, Kerala, India</span>
            <span>Time: <span id="menu-live-clock">--:-- --</span> IST</span>
          </div>
        </div>
        <button type="button" id="menu-close-btn" class="flex items-center justify-center size-12 rounded-full glass-panel text-on-surface hover:bg-white/10 transition-colors" aria-label="Close menu">
          <span class="material-symbols-outlined">close</span>
        </button>
      </header>
      <main class="relative flex-1 grid grid-cols-1 md:grid-cols-4 px-8 pb-12 gap-0 border-t border-outline-variant/10 z-10 overflow-y-auto">
        <section class="border-r border-outline-variant/10 pt-12 flex flex-col justify-between pr-6 min-h-[320px] menu-stagger relative z-20" style="--menu-delay: 100ms;">
          <div>
            <span class="text-xs font-label text-primary tracking-[0.3em] uppercase mb-12 block opacity-70">01 / Navigation</span>
            <nav id="menu-nav" class="flex flex-col gap-6 max-w-[min(100%,14rem)] md:max-w-none">
              <a class="group flex items-center gap-4 menu-nav-link" href="index.html" data-page="index"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">01</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">Index</span></a>
              <a class="group flex items-center gap-4 menu-nav-link" href="about.html" data-page="about"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">02</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">About</span></a>
              <a class="group flex items-center gap-4 menu-nav-link" href="projects.html" data-page="projects"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">03</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">Projects</span></a>
              <a class="group flex items-center gap-4 menu-nav-link" href="photography.html" data-page="photography"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">04</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">Photos</span></a>
              <a class="group flex items-center gap-4 menu-nav-link" href="lab.html" data-page="lab"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">05</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">Lab</span></a>
              <a class="group flex items-center gap-4 menu-nav-link" href="contact.html" data-page="contact"><span class="text-xs font-label text-outline group-hover:text-primary transition-colors italic">06</span><span class="text-4xl md:text-6xl font-headline font-bold text-on-surface group-hover:text-white transition-all uppercase leading-none">Contact</span></a>
            </nav>
          </div>
          <div class="mt-auto pt-12">
            <p class="text-sm font-body text-outline max-w-[200px]">3D artist — Kannur, Kerala. Character, product, and asset designing.</p>
          </div>
        </section>
        <section class="border-r border-outline-variant/10 pt-12 px-4 md:px-8 flex flex-col min-h-[320px] menu-stagger" style="--menu-delay: 160ms;">
          <span id="menu-preview-label" class="text-xs font-label text-primary tracking-[0.3em] uppercase mb-12 block opacity-70">02 / Preview</span>
          <div id="menu-preview" class="flex-1 flex flex-col gap-6 menu-preview-body"></div>
        </section>
        <section class="border-r border-outline-variant/10 pt-12 px-4 md:px-8 flex flex-col min-h-[320px] menu-stagger" style="--menu-delay: 220ms;">
          <span class="text-xs font-label text-primary tracking-[0.3em] uppercase mb-12 block opacity-70">03 / Connect</span>
          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-label text-outline uppercase tracking-widest">Inquiry</span>
              <a class="text-xl font-headline font-medium hover:text-white transition-colors underline decoration-outline-variant/30 underline-offset-8" href="mailto:sidhu500sidhu@gmail.com">sidhu500sidhu@gmail.com</a>
            </div>
            <div class="flex flex-col gap-4 mt-8">
              <a class="group flex items-center justify-between py-3 border-b border-outline-variant/10 menu-social-link" href="https://www.instagram.com/_sid_oo_/" target="_blank" rel="noopener noreferrer"><span class="font-headline text-lg uppercase tracking-tight group-hover:translate-x-2 transition-transform">Instagram</span><span class="material-symbols-outlined text-outline">call_made</span></a>
              <a class="group flex items-center justify-between py-3 border-b border-outline-variant/10 menu-social-link" href="https://www.linkedin.com/in/sidharth-kv-954696318/" target="_blank" rel="noopener noreferrer"><span class="font-headline text-lg uppercase tracking-tight group-hover:translate-x-2 transition-transform">LinkedIn</span><span class="material-symbols-outlined text-outline">call_made</span></a>
            </div>
          </div>
        </section>
        <section class="pt-12 px-4 md:px-8 flex flex-col justify-between min-h-[320px] menu-stagger" style="--menu-delay: 280ms;">
          <div>
            <span class="text-xs font-label text-primary tracking-[0.3em] uppercase mb-12 block opacity-70">04 / Meta</span>
            <div class="space-y-12">
              <div class="flex flex-col gap-3">
                <span class="text-[10px] font-label text-outline uppercase tracking-[0.4em]">Current Status</span>
                <div class="flex items-center gap-2">
                  <span class="size-2 rounded-full bg-white menu-status-dot"></span>
                  <span class="text-sm font-label uppercase">Accepting New Commissions</span>
                </div>
                <span class="text-xs font-label text-outline uppercase tracking-widest">Available Worldwide</span>
              </div>
              <div class="flex flex-col gap-3">
                <span class="text-[10px] font-label text-outline uppercase tracking-[0.4em]">Technical Specs</span>
                <div class="flex flex-col">
                  <span class="text-xs font-label text-outline">Softwares</span><span class="text-sm font-body">Blender / Maya / ZBrush / Substance</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-auto pt-8">
            <div class="p-6 rounded border border-white/5 glass-panel">
              <span class="text-[10px] font-label text-primary uppercase tracking-[0.2em] mb-3 block opacity-70">Work with me</span>
              <p class="text-xs font-label text-outline leading-relaxed mb-5">Character, product, and asset projects — open for commissions.</p>
              <a class="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest border border-white/20 px-4 py-3 hover:bg-white/5 transition-colors" href="contact.html" data-menu-close>
                Start a project <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer class="relative h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full z-10 menu-stagger" style="--menu-delay: 340ms;"></footer>
    </div>`;
  }

  function ctaAttrs(p) {
    return p.closeOnClick ? ' data-menu-close' : "";
  }

  function renderFeatured(p) {
    const secondary = p.secondaryHref
      ? `<a class="inline-flex items-center gap-2 mt-3 text-outline font-label text-sm uppercase tracking-widest border-b border-white/10 hover:border-white transition-colors pb-1" href="${escapeHtml(p.secondaryHref)}"${p.secondaryDownload ? " download" : ""}${ctaAttrs(p)}>${escapeHtml(p.secondaryCta)} <span class="material-symbols-outlined scale-75">download</span></a>`
      : "";

    return `
      <div class="aspect-[3/4] w-full rounded bg-surface-container-high relative group cursor-pointer border border-white/5 menu-feature-card">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <img alt="${escapeHtml(p.alt || p.title)}" class="w-full h-full object-cover transition-transform duration-700" src="${escapeHtml(p.image)}" loading="lazy">
        <div class="absolute bottom-4 left-4 z-20">
          <span class="text-[10px] font-label uppercase bg-white/10 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">${escapeHtml(p.badge)}</span>
        </div>
      </div>
      <div>
        <h3 class="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">${escapeHtml(p.title)}</h3>
        <p class="text-sm font-label text-outline mt-1 italic">${escapeHtml(p.subtitle)}</p>
        <a class="inline-flex items-center gap-2 mt-4 text-primary font-label text-sm uppercase tracking-widest border-b border-white/20 hover:border-white transition-colors pb-1" href="${escapeHtml(p.href)}"${ctaAttrs(p)}>
          ${escapeHtml(p.cta)} <span class="material-symbols-outlined scale-75">arrow_forward</span>
        </a>
        ${secondary}
      </div>`;
  }

  function renderGrid(p) {
    const items = (p.items || [])
      .map(
        (item) => `
        <a href="${escapeHtml(item.href)}" class="menu-preview-grid-item group relative overflow-hidden rounded border border-white/5 aspect-square"${ctaAttrs(p)}>
          <img alt="${escapeHtml(item.title)}" class="w-full h-full object-cover transition-transform duration-500" src="${escapeHtml(item.image)}" loading="lazy">
          <span class="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-[10px] font-label uppercase tracking-wider text-white">${escapeHtml(item.title)}</span>
        </a>`
      )
      .join("");

    return `
      <div class="menu-preview-grid">${items}</div>
      <a class="inline-flex items-center gap-2 mt-2 text-primary font-label text-sm uppercase tracking-widest border-b border-white/20 hover:border-white transition-colors pb-1" href="${escapeHtml(p.href)}"${ctaAttrs(p)}>
        ${escapeHtml(p.cta)} <span class="material-symbols-outlined scale-75">arrow_forward</span>
      </a>`;
  }

  function renderContact(p) {
    return `
      <p class="font-body text-lg text-outline leading-relaxed">${escapeHtml(p.text)}</p>
      <div class="flex flex-col gap-2">
        <span class="text-xs font-label text-outline uppercase tracking-widest">Email</span>
        <a class="text-xl font-headline font-medium hover:text-white transition-colors underline decoration-outline-variant/30 underline-offset-8" href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>
      </div>
      <div class="flex items-center gap-2 pt-2">
        <span class="size-2 rounded-full bg-white menu-status-dot"></span>
        <span class="text-sm font-label uppercase text-on-surface">Accepting New Commissions</span>
      </div>
      <a class="inline-flex items-center gap-2 mt-4 text-primary font-label text-sm uppercase tracking-widest border-b border-white/20 hover:border-white transition-colors pb-1 w-fit" href="${escapeHtml(p.href)}"${ctaAttrs(p)}>
        ${escapeHtml(p.cta)} <span class="material-symbols-outlined scale-75">arrow_forward</span>
      </a>`;
  }

  function renderPreviewContent(p) {
    if (p.type === "grid") return renderGrid(p);
    if (p.type === "contact") return renderContact(p);
    return renderFeatured(p);
  }

  let activePage = "index";
  let hoverPage = null;
  let fadeTimer = null;

  function setPreviewNavHighlight(pageKey) {
    document.querySelectorAll(".menu-nav-link").forEach((link) => {
      link.classList.toggle("is-preview-active", link.dataset.page === pageKey);
    });
  }

  function showPreview(pageKey, instant) {
    const p = MENU_PREVIEWS[pageKey];
    const label = document.getElementById("menu-preview-label");
    const body = document.getElementById("menu-preview");
    if (!p || !label || !body) return;

    label.textContent = p.label;
    setPreviewNavHighlight(pageKey);

    if (instant) {
      body.innerHTML = renderPreviewContent(p);
      body.classList.remove("is-fading");
      document.dispatchEvent(new CustomEvent("menu:preview-updated"));
      return;
    }

    body.classList.add("is-fading");
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      body.innerHTML = renderPreviewContent(p);
      requestAnimationFrame(() => {
        body.classList.remove("is-fading");
      });
      document.dispatchEvent(new CustomEvent("menu:preview-updated"));
    }, 140);
  }

  function renderMenuShell() {
    const overlay = document.getElementById("menu-overlay");
    if (!overlay) return;
    overlay.innerHTML = menuShellHtml();
  }

  function initMenuPreview() {
    activePage = document.body.dataset.page || "index";
    if (!MENU_PREVIEWS[activePage]) activePage = "index";

    showPreview(activePage, true);

    const nav = document.getElementById("menu-nav");
    if (!nav) return;

    nav.querySelectorAll(".menu-nav-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        hoverPage = link.dataset.page;
        if (hoverPage) showPreview(hoverPage);
      });
      link.addEventListener("focus", () => {
        hoverPage = link.dataset.page;
        if (hoverPage) showPreview(hoverPage);
      });
    });

    nav.addEventListener("mouseleave", () => {
      hoverPage = null;
      showPreview(activePage);
    });

    nav.addEventListener("focusout", (event) => {
      if (!nav.contains(event.relatedTarget)) {
        hoverPage = null;
        showPreview(activePage);
      }
    });
  }

  function init() {
    renderMenuShell();
    initMenuPreview();
    document.dispatchEvent(new CustomEvent("menu:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
