// =========================
// Variables
// =========================

// $ - element from DOM

const $searchInput = document.querySelector('.search_input input');
const $searchBtn = document.querySelector('.search_input button');
const $searchInputWrap = document.querySelector('.search_input');

//  PATH - path to executable search script on the server
const PATH = $searchInputWrap.dataset.pathScript;

// =========================
// Events
// =========================

$searchInput.addEventListener("focus", ()=> {
  $searchInput.classList.add("active");
  $searchInputWrap.classList.add("search_input__focus");
});

$searchInput.addEventListener("blur", ()=> {
  $searchInput.classList.remove("active");
  $searchInputWrap.classList.remove("search_input__focus");
});

document.body.addEventListener("keydown" , (e)=> {
  if( e.key == "Enter" && $searchInput.classList.contains("active")) {
      search();
  }
});

$searchBtn.addEventListener("click", search);

// =========================
// Functions
// =========================

function search() {
  if ($searchInput.value.trim().length <= 0) {
    errorValidationSearch();
    return;
  }

  fetch(PATH + "?search=" + $searchInput.value);

  if ($searchInputWrap.dataset.redirectPath !== "false") {
    document.location.href = $searchInputWrap.dataset.redirectPath + "?search=" + $searchInput.value;
  }
}

function errorValidationSearch(timeShow = 3000) {
  $searchInputWrap.classList.remove("search_input__focus");
  $searchInputWrap.classList.add("search_input__error");
  $searchInput.value = "";

  setTimeout( ()=> {
    $searchInputWrap.classList.remove("search_input__error");
  }, timeShow);
}
