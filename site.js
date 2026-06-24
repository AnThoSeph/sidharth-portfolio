(function () {
  "use strict";

  function runAnimatedTitle(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    [...text].forEach((ch, index) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.setProperty("--char-index", String(index));
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.classList.add("is-loaded");
      return;
    }

    requestAnimationFrame(() => {
      el.classList.add("is-loaded");
    });

    if (el.id === "hero-title" || el.id === "page-title") {
      const sweepDelay = text.length * 62 + 600;
      setTimeout(() => {
        el.classList.add("is-swept");
      }, sweepDelay);
    }
  }

  function initMouseTracking() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    const selector = "a, button, .menu-nav-link, .menu-feature-card, .menu-preview-grid-item, .project-card, .photo-card, .info-card";
    document.querySelectorAll(selector).forEach((node) => {
      if (node.dataset.cursorBound) return;
      node.dataset.cursorBound = "1";
      node.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
      node.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
    });

    if (!document.body.dataset.cursorLeaveBound) {
      document.body.dataset.cursorLeaveBound = "1";
      document.addEventListener(
        "mouseleave",
        () => {
          cursor.style.opacity = "0";
        },
        { passive: true }
      );
      document.addEventListener(
        "mousemove",
        (e) => {
          cursor.style.opacity = "1";
          cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          document.documentElement.style.setProperty(
            "--mouse-x",
            `${(e.clientX / window.innerWidth) * 100}%`
          );
          document.documentElement.style.setProperty(
            "--mouse-y",
            `${(e.clientY / window.innerHeight) * 100}%`
          );
        },
        { passive: true }
      );
    }
  }

  function initMotionSections() {
    const sections = [...document.querySelectorAll(".motion-section")];
    sections.forEach((section, index) => {
      section.style.transitionDelay = `${Math.min(index * 70, 240)}ms`;
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((section) => {
      if (!section.classList.contains("is-visible")) {
        revealObserver.observe(section);
      }
    });
  }

  function updateScrollEffects() {
    const scrollY = window.scrollY || 0;
    const heroShift = Math.min(scrollY * 0.06, 36);
    document.documentElement.style.setProperty("--hero-shift", `${heroShift}px`);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;
    document.documentElement.style.setProperty(
      "--scroll-progress",
      String(Math.min(Math.max(progress, 0), 1))
    );
  }

  function initScrollEffects() {
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    updateScrollEffects();
  }

  function initMagneticButtons() {
    document.querySelectorAll(".magnetic-button").forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0px, 0px)";
      });
    });
  }

  function updateClock() {
    const now = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    const timeString = now.toLocaleTimeString("en-IN", options);
    const clockElement = document.getElementById("live-clock");
    const menuClockElement = document.getElementById("menu-live-clock");
    const menuClockFooter = document.getElementById("menu-live-clock-footer");
    if (clockElement) clockElement.textContent = timeString;
    if (menuClockElement) menuClockElement.textContent = timeString;
    if (menuClockFooter) menuClockFooter.textContent = timeString;
  }

  function initClock() {
    setInterval(updateClock, 1000);
    updateClock();
  }

  function initMenu() {
    const menuOverlay = document.getElementById("menu-overlay");
    const menuOpenBtn = document.getElementById("menu-open-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    if (!menuOverlay || !menuOpenBtn || !menuCloseBtn) return;

    function openMenu() {
      menuOverlay.classList.add("is-open");
      menuOverlay.setAttribute("aria-hidden", "false");
      menuOpenBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      menuCloseBtn.focus({ preventScroll: true });
    }

    function closeMenu() {
      menuOverlay.classList.remove("is-open");
      menuOverlay.setAttribute("aria-hidden", "true");
      menuOpenBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      menuOpenBtn.focus({ preventScroll: true });
    }

    menuOpenBtn.addEventListener("click", openMenu);
    menuCloseBtn.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", (event) => {
      if (event.target === menuOverlay) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuOverlay.classList.contains("is-open")) {
        closeMenu();
      }
    });

    bindMenuCloseLinks(closeMenu);
  }

  function bindMenuCloseLinks(closeMenu) {
    const menuOverlay = document.getElementById("menu-overlay");
    if (!menuOverlay || typeof closeMenu !== "function") return;
    menuOverlay.querySelectorAll("[data-menu-close]").forEach((link) => {
      if (link.dataset.menuCloseBound) return;
      link.dataset.menuCloseBound = "1";
      link.addEventListener("click", closeMenu);
    });
  }

  function setActiveMenuLink() {
    const page = document.body.dataset.page;
    if (!page) return;

    document.querySelectorAll(".menu-nav-link").forEach((link) => {
      if (link.dataset.page === page) {
        link.classList.add("is-active");
      }
    });
  }

  function init() {
    runAnimatedTitle("#hero-title");
    runAnimatedTitle("#page-title");
    setActiveMenuLink();
    initMotionSections();
    initMagneticButtons();
    initMenu();
    initMouseTracking();
    updateClock();
  }

  initScrollEffects();
  initClock();

  document.addEventListener("menu:preview-updated", () => {
    initMouseTracking();
    const menuOverlay = document.getElementById("menu-overlay");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    if (menuOverlay && menuCloseBtn) {
      bindMenuCloseLinks(() => {
        menuOverlay.classList.remove("is-open");
        menuOverlay.setAttribute("aria-hidden", "true");
        const openBtn = document.getElementById("menu-open-btn");
        if (openBtn) {
          openBtn.setAttribute("aria-expanded", "false");
          openBtn.focus({ preventScroll: true });
        }
        document.body.classList.remove("menu-open");
      });
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.runAnimatedTitle = runAnimatedTitle;
})();
