import { todoItems } from "../main";

export let controlOption = 0;
export let clearOption = 0;
// export let numberOfItems = 0;
// export let numberOfChecks = 0;

/**
 * 현재 보기 창의 옵션 번호를 새로 지정하는 함수
 */
function changeControlOption(buttonNumber) {
  controlOption = buttonNumber;
}

/**
 * 보기 창 선택 메뉴에서 선택한 것에 따라 제어하는 함수
 */
export function clickOption() {
  const allButton = document.querySelector(".control-all");
  const activeButton = document.querySelector(".control-active");
  const completedButton = document.querySelector(".control-completed");

  allButton.addEventListener("click", () => {
    if (controlOption !== 0) {
      changeControlOption(0);
      updateToolBar();
    }
  });
  activeButton.addEventListener("click", () => {
    if (controlOption !== 1) {
      changeControlOption(1);
      updateToolBar();
    }
  });
  completedButton.addEventListener("click", () => {
    if (controlOption !== 2) {
      changeControlOption(2);
      updateToolBar();
    }
  });
}

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
  const HIDE_CLEAR = "menu-clear--hiding";
  if (todoItems.filter((item) => item.isChecked === false).length !== 0) {
    clearButton.classList.add(HIDE_CLEAR);
  } else {
    clearButton.classList.remove(HIDE_CLEAR);
  }
}
