import { todoItems } from "./main.js";

const allButton = document.querySelector(".control-all");
const activeButton = document.querySelector(".control-active");
const completedButton = document.querySelector(".control-completed");

/**
 * 각 보기 메뉴에 따라 체크여부에 따른 리스트 삭제 여부를 결정한다.
 * @param {*} item
 */
export function menuFilter(item) {
  if (!allButton.classList.contains("control-button--unclicked")) {
  } else if (!activeButton.classList.contains("control-button--unclicked")) {
    if (!item.classList.contains("todo-list__item-checked")) {
      item.remove();
    }
  } else if (!completedButton.classList.contains("control-button--unclicked")) {
    if (!item.classList.contains("todo-list__item-checked")) {
      item.remove();
    }
  } else {
    throw new Error("No control type");
  }
}

/**
 * ul태그의 모든 li들을 삭제합니다.
 * @param {*} listItem
 */
export function deleteAllList(listItem) {
  for (let item = listItem.firstChild; item !== null; ) {
    const temp = item.nextSibling;
    item.remove();
    item = temp;
  }
}

/**
 * 남은 작업의 개수를 업데이트합니다.
 */
export function counterUpdate() {
  const counter = document.querySelector(".menu__count");
  counter.innerHTML = `
  ${todoItems.filter((x) => x.isChecked === false).length} items left`;
}
