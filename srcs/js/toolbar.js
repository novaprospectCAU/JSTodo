let controlOption = 0;
let clearOption = 0;
let numberOfItems = 0;
let numberOfChecks = 0;

/**
 * 툴바를 업데이트하는 메인 함수
 */
export function updateToolBar() {
  updateCounter();
  updateOption();
  updateClear();
}

/**
 * 카운터를 업데이트하는 함수
 */
function updateCounter() {
  const counter = document.querySelector(".menu__count");

  counter.textContent = `${numberOfChecks} items left`;
}

/**
 * 옵션을 업데이트하는 함수
 */
function updateOption() {
  const optionAll = document.querySelector(".control-all");
  const optionActive = document.querySelector(".control-active");
  const optionCompleted = document.querySelector(".control-completed");

  if (controlOption === 0) {
    optionAll.classList.remove("menu__select--hiding");
    optionActive.classList.add("menu__select--hiding");
    optionCompleted.classList.add("menu__select--hiding");
  } else if (controlOption === 1) {
    optionAll.classList.add("menu__select--hiding");
    optionActive.classList.remove("menu__select--hiding");
    optionCompleted.classList.add("menu__select--hiding");
  } else {
    optionAll.classList.add("menu__select--hiding");
    optionActive.classList.add("menu__select--hiding");
    optionCompleted.classList.remove("menu__select--hiding");
  }
}

/**
 * 클리어 버튼 업데이트하는 함수
 */
function updateClear() {
  const clearButton = document.querySelector(".menu-clear");

  if (itemCount === 0) {
    clearButton.classList.add("menu__select--hiding");
  } else {
    clearButton.classList.remove("menu__select--hiding");
  }
}
