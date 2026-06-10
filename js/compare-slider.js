(function () {
  "use strict";

  function initCompareSlider(el) {
    const range = el.querySelector(".compare-range");
    if (!range) return;

    function setPosition(pct) {
      const clamped = Math.min(100, Math.max(0, pct));
      el.style.setProperty("--compare-pos", `${clamped}%`);
      range.value = String(clamped);
      const handle = el.querySelector(".compare-handle");
      if (handle) handle.style.left = `${clamped}%`;
    }

    range.addEventListener("input", () => setPosition(Number(range.value)));

    let dragging = false;
    function onPointerDown(e) {
      if (e.target === range) return;
      dragging = true;
      el.setPointerCapture(e.pointerId);
      moveFromEvent(e);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      moveFromEvent(e);
    }
    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    function moveFromEvent(e) {
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setPosition(pct);
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    setPosition(50);
  }

  function initCompareSliders(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-compare-slider]").forEach(initCompareSlider);
  }

  window.initCompareSliders = initCompareSliders;
})();
