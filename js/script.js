$(function () {
  $(document).on("click", ".menu-toggle-btn", function () {
    const menu = $(this).closest(".mobile-header-inner").next(".mobile-menu");
    menu.toggleClass("open");
    $(this).text(menu.hasClass("open") ? "Close" : "MENU");
  });

  //footer
  $(document).on("click", ".menu-toggle-btn-footer", function () {
    const menu = $(this).closest(".mobile-footer").find(".mobile-menu");
    menu.toggleClass("open");
    $(this).text(menu.hasClass("open") ? "Close" : "MENU");
  });
});

async function loadIncludes() {
  const includes = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(includes).map(async (el) => {
      const res = await fetch(el.dataset.include);
      el.outerHTML = await res.text();
    }),
  );
}

loadIncludes().then(() => {
  initProjectsCarousel();
  initTabs();
});

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === target);
      });
    });
  });
}

function initProjectsCarousel() {
  const carouselEl = document.getElementById("projectsCarousel");
  if (!carouselEl) return;

  const items = carouselEl.querySelectorAll(".carousel-item");
  const dotsContainer = document.getElementById("carouselDots");

  const DOT_GRAY = "assets/images/dot_gray.png";
  const DOT_ORANGE = "assets/images/dot_orange.png";

  items.forEach((_, i) => {
    const dot = document.createElement("img");
    dot.src = i === 0 ? DOT_ORANGE : DOT_GRAY;
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      bootstrap.Carousel.getInstance(carouselEl).to(i);
    });
    dotsContainer.appendChild(dot);
  });

  carouselEl.addEventListener("slid.bs.carousel", (e) => {
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.src = i === e.to ? DOT_ORANGE : DOT_GRAY;
    });
  });
}
