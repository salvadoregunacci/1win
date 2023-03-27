// =========================
// Variables
// =========================

// $ - element from DOM

const $btnOpenInfo = document.querySelector('.info__open_btn');
const $btnHideInfo = document.querySelector('.info__hide_btn');
const $infoSection = document.querySelector('.info');
const $infoSectionHidden = document.querySelector('.info__hidden');
const $faqItems = document.querySelectorAll('.faq_section__item');
const $navigationMoreBtn = document.querySelector('.navigation .navigation__more_title');
const $navigationMoreContent = document.querySelector('.navigation .navigation__more_content');
const $burgerBtn = document.querySelector('.burger_btn');
const $menu = document.querySelector('.navigation .navigation__wrap');
const $dropmenuTitles = document.querySelectorAll('.dropmenu__title');
const $dropmenuContents = document.querySelectorAll('.dropmenu__content');
const $dashbordOpenBtn = document.querySelectorAll('.dashbord__mob_btn');
const $selectLang = document.querySelector('.select_lang');

// modals
const $modalsWrap = document.getElementById('modals');
const $startPopup = document.querySelector('.start_popup');
const $startPopupCloseBtn = document.querySelector('.start_popup__close_btn');
const $copyPromocodeBtn = document.querySelector('.start_popup__promocode_copy');
const $promocode = document.querySelector('.start_popup__promocode');

// responsive nav
const $fixedNavItems = document.querySelectorAll('.navigation li');
const $fixedNavHiddenContainer = document.querySelector('.navigation .navigation__more_content');
const $hiddenContainerTitle = document.querySelector('.navigation .navigation__more_title');
const $hiddenContainerContent = document.querySelector('.navigation .navigation__more_content');
const $fixedNavContent = document.querySelector('.navigation__general');
const $fixedNavLi = $fixedNavContent.querySelectorAll("li");

const observer = new IntersectionObserver(observer_cb, {
  threshold: 1,
  root: document.querySelector('.navigation ul')
});

// =========================
// Events
// =========================

window.addEventListener("load", showStartPopup);
$startPopupCloseBtn?.addEventListener("click", closeStartPopup);
$copyPromocodeBtn?.addEventListener("click", copyPromocode);

$fixedNavItems?.forEach(item => {
  observer.observe(item);
});

$hiddenContainerTitle?.addEventListener("click", showHiddenContentFixedNav);

if (document.querySelector(".info section")) {
  $btnOpenInfo?.addEventListener("click", openInfoSection);
  $btnHideInfo?.addEventListener("click", hideInfoSection);

  $faqItems.forEach(item => {
    item?.addEventListener("click", (e) => openFaqBlock(e));
  });
}

$burgerBtn?.addEventListener("click", openMenu);
$selectLang?.addEventListener("click", visibleSelectLang);

checkWindowSize();

window.addEventListener("resize", () => {
  checkWindowSize();
  checkEmptyHiddenContainer();
});

window.addEventListener("load", () => {
  checkWindowSize();
  checkEmptyHiddenContainer();
  removeOldCookies();
});


// =========================
// Functions
// =========================

function removeOldCookies() {
  const cookie = JSON.parse(localStorage.getItem("startPopup"));

  if (cookie) {
    // -----------
    if (!$startPopup?.hasAttribute("once")) {
      if (cookie.once?.includes(location.href)) {
        cookie.once.splice(cookie.once.indexOf(location.href), 1);
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      }
    }
    // -----------

    if (!$startPopup?.hasAttribute("repeat")) {
      let index = cookie.repeat?.findIndex(item => item.href === location.href);

      if (~index) {
        cookie.repeat?.splice(index, 1);
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      }
    }

    if (!cookie.once && !cookie.repeat?.length || !cookie.once?.length && !cookie.repeat || !cookie.once?.length && !cookie.repeat?.length) {
      localStorage.removeItem("startPopup");
    }
  }
}


function observer_cb(entries, observer) {
  checkEmptyHiddenContainer();

  entries.forEach(item => {
    if (!item.isIntersecting) {
      let copyItem = item.target.cloneNode(true);
      if (!item.target.classList.contains("dropmenu__item")) {
        item.target.style.opacity = "0";
      }

      const links = $fixedNavHiddenContainer.querySelectorAll("a");


      if ( !(item.target.classList.contains("dropmenu__item") || item.target.classList.contains("dropmenu")) ) {
        links.forEach(link => {
          if (link.textContent === item.target.querySelector("a").textContent) {
            link.remove();
            return;
          }
        });
      }

      $fixedNavHiddenContainer.append(copyItem);
    } else {
      item.target.style.opacity = "1";
      $fixedNavHiddenContainer?.lastElementChild?.remove();
    }
  });
}

function checkEmptyHiddenContainer() {
  if ($hiddenContainerContent?.children.length <= 0) {
    $hiddenContainerTitle?.setAttribute("hidden", "");
    $hiddenContainerContent?.removeAttribute("active");
    $hiddenContainerTitle.style.opacity = "";
  } else {
    $hiddenContainerTitle?.removeAttribute("hidden");
    $hiddenContainerTitle.style.opacity = "1";
  }
}

function showHiddenContentFixedNav() {
  $hiddenContainerContent.toggleAttribute("active");
}

function copyPromocode() {
  navigator.clipboard.writeText($promocode.querySelector(".promocode").textContent);
  $promocode.setAttribute("active", "");

  setTimeout(() => {
    $promocode.removeAttribute("active");
  }, 600);
}

function showStartPopup() {
  // settings start popup
  const cookie = JSON.parse(localStorage.getItem("startPopup"));

  if ($startPopup?.hasAttribute("hide")) return;

  // once ---------
  if ($startPopup?.hasAttribute("once")) {
    if (cookie && cookie.once) {
      if (cookie.once.includes(location.href)) {
        return;
      } else {
        cookie.once.push(location.href);
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      }
    } else {
      if (cookie) {
        if (cookie.once) {
          cookie.once.push({ href: location.href, count: 1 });
        } else {
          cookie.once = [{ href: location.href, count: 1 }];
        }

        localStorage.setItem("startPopup", JSON.stringify(cookie));
      } else {
        localStorage.setItem("startPopup", JSON.stringify({ once: [location.href] }));
      }
    }
  }
  // repeat ---------
  if ($startPopup?.hasAttribute("repeat")) {
    if (cookie && cookie.repeat) {
      if (cookie.repeat.find(item => item.href === location.href && item.count < +$startPopup.getAttribute("repeat"))) {
        cookie.repeat.forEach(item => {
          item.count = item.href === location.href ? +item.count + 1 : item.count;
        });
        localStorage.setItem("startPopup", JSON.stringify(cookie));
        return;
      } else {
        cookie.repeat.forEach(item => {
          item.count = item.href === location.href ? 1 : item.count;
        });

        if (!(cookie.repeat.find(item => item.href === location.href)) && cookie.repeat.length > 0) {
          cookie.repeat.push({ href: location.href, count: 1 });
        }

        if (cookie.repeat.length === 0) {
          cookie.repeat = [{ href: location.href, count: 1 }];
          localStorage.setItem("startPopup", JSON.stringify(cookie));
        } else {
          localStorage.setItem("startPopup", JSON.stringify(cookie));
        }
      }
    } else {
      if (cookie) {
        cookie.repeat = [{ href: location.href, count: 1 }];
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      } else {
        localStorage.setItem("startPopup", JSON.stringify({ repeat: [{ href: location.href, count: 1 }] }));
      }
    }
  }

  // =================

  const showDelay = +$startPopup?.dataset.showDelay || 1500;

  if (!$startPopup || !$modalsWrap || !$startPopup) return;

  if ($startPopup.hasAttribute("data-type-show") === "once") {
    localStorage.setItem("on")
  }

  setTimeout(() => {
    document.body.style.overflow = "hidden";
    $modalsWrap.setAttribute("active", "");
    $startPopup.setAttribute("active", "");
  }, showDelay);
}

function closeStartPopup() {
  document.body.style.overflow = "scroll";
  $modalsWrap.removeAttribute("active");
  $startPopup.removeAttribute("active");
}

function checkWindowSize() {
  if (window.innerWidth > 1200) {
    document.querySelectorAll('.dropmenu').forEach(dropmenu => {
      dropmenu.addEventListener("mouseenter", (e) => {
        let targ = e.target;
        let content = targ.querySelector(".dropmenu__content");
        content.style.top = targ.getBoundingClientRect().bottom + "px";
        content.style.left = targ.getBoundingClientRect().right + "px";
      });
    });
  }

  if (window.innerWidth <= 1200) {
    $dropmenuTitles.forEach(item => {
      item.addEventListener("click", (e) => visibleDropmenuMobile(e));
    });

    $dropmenuContents.forEach(item => {
      item.classList.add("dropmenu__list");
      item.classList.remove("dropmenu__content");
    });

    $fixedNavLi.forEach(li => {
      li.style.opacity = "1";
    });
  }

  if (window.innerWidth <= 390) {
    $dashbordOpenBtn.forEach(item => {
      item.addEventListener("click", (e) => openDashbordMobile(e));
    });
  }
}

function openInfoSection() {
  $infoSection.classList.add("info__active");
  $infoSectionHidden.classList.remove("sr-only");
}

function hideInfoSection() {
  $infoSection.classList.remove("info__active");
  $infoSectionHidden.classList.add("sr-only");
}

function openFaqBlock(e) {
  const $curItem = e.target.closest(".faq_section__item");

  if ($curItem.classList.contains("active")) {
    $curItem.classList.remove("active");
    return;
  }
  $faqItems.forEach(item => item.classList.remove("active"));
  $curItem.classList.add("active");
}

function openMenu() {
  if ($burgerBtn.classList.contains("burger_active")) {
    $burgerBtn.classList.remove("burger_active");
    $menu.classList.remove("navigation__wrap_active");

    if (window.innerWidth <= 910) {
      document.body.removeAttribute("stop-scroll");
    }
    return;
  }

  $burgerBtn.classList.add("burger_active");
  $menu.classList.add("navigation__wrap_active");

  if (window.innerWidth <= 910) {
    document.body.setAttribute("stop-scroll", "");
  }
}

function visibleDropmenuMobile(e) {
  const curDropmenu = e.target.closest(".dropmenu");
  curDropmenu.classList.toggle("dropmenu__active");
}

function openDashbordMobile(e) {
  const curDashbord = e.target.closest(".dashbord");
  const curBtn = e.target.closest(".dashbord__mob_btn");

  curBtn.style.display = "none";
  curDashbord.style.height = "auto";
}

function visibleSelectLang() {
  $selectLang.classList.toggle("select_lang__active");
}