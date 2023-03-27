// =========================
// Variables
// =========================

// $ - element from DOM

let $sidebarCategoryBtn;
let $sidebarCategoryCloseBtn;
const $dashbordOpenBtnSingle = document.querySelectorAll('.dashbord__mob_btn');
const $sidebarCategory = document.getElementById("sidebar");
// =========================
// Events
// =========================

checkWindowSizeSingle();
window.addEventListener("resize", checkWindowSizeSingle);

// =========================
// Functions
// =========================

function checkWindowSizeSingle() {
  if (window.innerWidth <= 760) {
    
    $sidebarCategoryBtn = document.querySelector('.sidebar__mob_btn');
    $sidebarCategoryCloseBtn = document.querySelector('.sidebar__close_btn');

    $sidebarCategoryBtn.addEventListener("click", openSidebarCategory);
    $sidebarCategoryCloseBtn.addEventListener("click", closeSidebarCategory);
  }

  if (window.innerWidth <= 530) {
    $dashbordOpenBtnSingle.forEach(item => {
      item.addEventListener("click", (e) => openDashbordMobileSingle(e));
    });
  }
}

function openSidebarCategory() {
  $sidebarCategoryCloseBtn.classList.remove("sidebar__close_btn_active");
  $sidebarCategoryBtn.style.opacity = 0;
  $sidebarCategory.style.transform = "translateX(0%)";

  if (window.innerWidth <= 370) {
    document.body.style.overflowY = "hidden";
  }
}

function closeSidebarCategory() {
  $sidebarCategoryCloseBtn.classList.add("sidebar__close_btn_active");
  $sidebarCategoryBtn.style.opacity = 1;
  $sidebarCategory.style.transform = "translateX(-100%)";

  if (window.innerWidth <= 370) {
    document.body.style.overflowY = "scroll";
  }
}

function openDashbordMobileSingle(e) {
  const curDashbord = e.target.closest(".dashbord");
  const curBtn = e.target.closest(".dashbord__mob_btn");

  curBtn.style.display = "none";
  curDashbord.style.height = "auto";
}