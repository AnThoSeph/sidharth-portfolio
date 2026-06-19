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

  function normalizeSrc(src) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    if (src.charAt(0) === "/") return src;
    return "/" + src;
  }

  function registerPreviewStyles() {
    if (!window.CMS || typeof window.CMS.registerPreviewStyle !== "function") return;
    window.CMS.registerPreviewStyle("/admin/preview.css");
  }

  function registerPhotographyPreview() {
    if (!window.CMS || typeof window.CMS.registerPreviewTemplate !== "function") return;

    var h =
      window.h ||
      (window.React && window.React.createElement) ||
      (window.preact && window.preact.h);

    if (!h) return;

    window.CMS.registerPreviewTemplate("photography", function PhotographyPreview(props) {
      var entry = props.entry;
      var data = entry.get("data");
      var title = data.get("title") || entry.get("slug") || "Photo";
      var src = normalizeSrc(data.get("src") || "");
      var caption = data.get("caption") || "";
      var category = data.get("category") || "";
      var year = data.get("year") || "";

      return h(
        "div",
        { className: "sid-photo-preview" },
        h("h1", null, title),
        h("p", { className: "sid-photo-preview__meta" }, [category, year].filter(Boolean).join(" · ")),
        src
          ? h("img", {
              src: src,
              alt: title,
              className: "sid-photo-preview__img",
            })
          : h("p", { className: "sid-photo-preview__empty" }, "Upload a photo image to preview."),
        caption ? h("p", { className: "sid-photo-preview__caption" }, caption) : null
      );
    });
  }

  function initCms() {
    registerPreviewStyles();
    registerPhotographyPreview();
  }

  injectAdminBar();

  var attempts = 0;
  var timer = setInterval(function () {
    if (window.CMS) {
      initCms();
      clearInterval(timer);
      return;
    }
    attempts += 1;
    if (attempts > 40) clearInterval(timer);
  }, 250);
})();
