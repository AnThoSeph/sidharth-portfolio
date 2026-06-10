const heroClock = document.getElementById("hero-clock");
const contactClock = document.getElementById("contact-clock");
const customCursor = document.getElementById("custom-cursor");

function updateISTClock() {
  const now = new Date();
  const ist = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  heroClock.textContent = ist;
  contactClock.textContent = ist;
}

updateISTClock();
setInterval(updateISTClock, 1000);

const reveals = document.querySelectorAll(".reveal");
reveals.forEach((section, index) => {
  section.style.transitionDelay = `${index * 70}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1200;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((el) => counterObserver.observe(el));

document.addEventListener("mousemove", (event) => {
  if (customCursor) {
    customCursor.style.opacity = "1";
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
  }

  const xPercent = (event.clientX / window.innerWidth) * 100;
  const yPercent = (event.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--glow-x", `${xPercent}%`);
  document.documentElement.style.setProperty("--glow-y", `${yPercent}%`);
});

document.addEventListener("mouseleave", () => {
  if (customCursor) {
    customCursor.style.opacity = "0";
  }
});

const interactiveTargets = document.querySelectorAll("a, button, .work-card, .snap-card, .tools-grid span");
interactiveTargets.forEach((node) => {
  node.addEventListener("mouseenter", () => customCursor?.classList.add("is-active"));
  node.addEventListener("mouseleave", () => customCursor?.classList.remove("is-active"));
});

window.addEventListener("scroll", () => {
  const depth = Math.min(window.scrollY, 700);
  document.documentElement.style.setProperty("--scroll-depth", `${depth}px`);
}, { passive: true });

const snapScroll = document.getElementById("snap-scroll");
let pointerDown = false;
let startX = 0;
let scrollLeft = 0;

snapScroll.addEventListener("pointerdown", (event) => {
  pointerDown = true;
  startX = event.clientX;
  scrollLeft = snapScroll.scrollLeft;
  snapScroll.setPointerCapture(event.pointerId);
});

snapScroll.addEventListener("pointermove", (event) => {
  if (!pointerDown) {
    return;
  }
  const walk = (event.clientX - startX) * 1.3;
  snapScroll.scrollLeft = scrollLeft - walk;
});

function stopDragging(event) {
  if (!pointerDown) {
    return;
  }
  pointerDown = false;
  if (event?.pointerId) {
    snapScroll.releasePointerCapture(event.pointerId);
  }
}

snapScroll.addEventListener("pointerup", stopDragging);
snapScroll.addEventListener("pointerleave", stopDragging);

const quotes = [...document.querySelectorAll(".quote")];
const dotsWrap = document.getElementById("dots");
const carousel = document.getElementById("carousel");
let currentQuote = 0;
let autoplayId = null;

function renderDots() {
  dotsWrap.innerHTML = "";
  quotes.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
    if (index === currentQuote) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => showQuote(index));
    dotsWrap.appendChild(dot);
  });
}

function showQuote(index) {
  currentQuote = (index + quotes.length) % quotes.length;
  quotes.forEach((quote, i) => quote.classList.toggle("active", i === currentQuote));
  [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === currentQuote));
}

document.getElementById("prev").addEventListener("click", () => showQuote(currentQuote - 1));
document.getElementById("next").addEventListener("click", () => showQuote(currentQuote + 1));

renderDots();
showQuote(0);

function startAutoplay() {
  autoplayId = setInterval(() => showQuote(currentQuote + 1), 4500);
}

function stopAutoplay() {
  clearInterval(autoplayId);
}

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
startAutoplay();

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
