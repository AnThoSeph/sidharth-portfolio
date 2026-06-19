(function () {
  "use strict";

  function injectAdminBar() {
    if (document.getElementById("sid-admin-bar")) return;

    var bar = document.createElement("div");
    bar.id = "sid-admin-bar";
    bar.className = "sid-admin-bar";
    bar.innerHTML =
      '<a class="sid-admin-bar__brand" href="/">SIDHARTH KV</a>' +
      '<span class="sid-admin-bar__meta">Portfolio admin</span>' +
      '<a class="sid-admin-bar__link" href="/" target="_blank" rel="noopener">View site</a>';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add("sid-admin-ready");
  }

  function registerPreviewStyles() {
    if (!window.CMS || typeof window.CMS.registerPreviewStyle !== "function") return;
    window.CMS.registerPreviewStyle("/admin/preview.css");
  }

  injectAdminBar();

  var attempts = 0;
  var timer = setInterval(function () {
    if (window.CMS) {
      registerPreviewStyles();
      clearInterval(timer);
      return;
    }
    attempts += 1;
    if (attempts > 40) clearInterval(timer);
  }, 250);
})();
