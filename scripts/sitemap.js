// =========================
// Variables
// =========================

// $ - element from DOM

const $sitemapLists = document.querySelectorAll('.sitemap__mob_btn');

// =========================
// Events
// =========================

$sitemapLists?.forEach(list => {
  list.addEventListener("click", (e) => openAllList(e));
});

// =========================
// Functions
// =========================

function openAllList(e) {
  const $currentList = e.target.closest("ul");

  $currentList.setAttribute("active", true);
}