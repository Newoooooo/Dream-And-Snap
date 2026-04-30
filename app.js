const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const tabs = document.querySelectorAll(".tab");
const filterItems = document.querySelectorAll("[data-filter-item]");
const emptyState = document.querySelector("[data-filter-empty]");

const closeMenu = () => {
  if (!siteNav || !menuToggle) {
    return;
  }
  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const applyFilter = (filter) => {
  if (!filterItems.length) {
    return;
  }

  let visibleCount = 0;
  filterItems.forEach((item) => {
    const matches = filter === "all" || item.dataset.category === filter;
    if (matches) {
      item.hidden = false;
      item.classList.remove("filter-fade");
      void item.offsetWidth;
      item.classList.add("filter-fade");
      visibleCount += 1;
    } else {
      item.hidden = true;
      item.classList.remove("filter-fade");
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
};

if (tabs.length && filterItems.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((btn) => btn.classList.remove("is-active"));
      tab.classList.add("is-active");
      applyFilter(tab.dataset.filter);
    });
  });

  const activeTab = document.querySelector(".tab.is-active") || tabs[0];
  if (activeTab) {
    activeTab.classList.add("is-active");
    applyFilter(activeTab.dataset.filter);
  }
}

window.addEventListener("click", (event) => {
  if (!siteNav || !menuToggle) {
    return;
  }
  if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});
