(function () {
  "use strict";

  const STORAGE_KEY = "sid-theme";

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}
    return "dark";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}

    const btn = document.getElementById("theme-toggle");
    const icon = btn && btn.querySelector(".theme-toggle-icon");
    if (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    if (icon) {
      icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    const btn = document.getElementById("theme-toggle");
    if (btn && btn.dataset.themeBound !== "true") {
      btn.dataset.themeBound = "true";
      btn.addEventListener("click", toggleTheme);
    }
  }

  window.initTheme = initTheme;
  window.applySiteTheme = applyTheme;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
