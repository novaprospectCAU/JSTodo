import { checkAllToggle, makeStrikeThrough } from "./check.js";
import { todoItems, createListItem } from "./main.js";
import { counterUpdate, deleteAllList } from "./utils.js";

const allButton = document.querySelector(".control-all");
const activeButton = document.querySelector(".control-active");
const completedButton = document.querySelector(".control-completed");

let controlOption = 0;
/**
 * toolbar의 상태를 업데이트하거나 가시 여부를 설정합니다.
 */
export function toolbarUpdate() {
  const toolbar = document.querySelector(".todo-list__menu");
  if (todoItems.length === 0) {
    toolbar.classList.add("todo-list__menu--hiding");
  } else {
    toolbar.classList.remove("todo-list__menu--hiding");
    counterUpdate();
    checkClearButton();
  }
}

//모든 리스트를 보여줍니다.
//체크된 경우 : 취소선 대입, 표시
//해제된 경우 : 취소선 삭제, 표시
//입력시 그대로 표시
allButton.addEventListener("click", () => {
  counterUpdate();
  //중복 누름을 방지합니다.
  if (!allButton.classList.contains("control-button--unclicked")) {
    return;
  }

  allButton.classList.remove("control-button--unclicked");
  activeButton.classList.add("control-button--unclicked");
  completedButton.classList.add("control-button--unclicked");

  const ulList = document.querySelector(".todo-list");
  deleteAllList();

  for (let newItem of todoItems) {
    const listItem = createListItem(newItem.id, newItem.text);
    if (newItem.isChecked) {
      makeStrikeThrough(listItem, newItem);
    }
    ulList.append(listItem);
  }
  toolbarUpdate();
});

//해제된 리스트를 보여줍니다.
//체크된 경우 : 취소선 대입, 표시X
//해제된 경우 : Exception
//입력시 그대로 표시
activeButton.addEventListener("click", () => {
  counterUpdate();
  //중복 누름을 방지합니다.
  if (!activeButton.classList.contains("control-button--unclicked")) {
    return;
  }

  allButton.classList.add("control-button--unclicked");
  activeButton.classList.remove("control-button--unclicked");
  completedButton.classList.add("control-button--unclicked");

  const ulList = document.querySelector(".todo-list");
  deleteAllList();
  for (let newItem of todoItems) {
    if (!newItem.isChecked) {
      const listItem = createListItem(newItem.id, newItem.text);
      ulList.append(listItem);
    }
  }
  toolbarUpdate();
});

//모든 리스트를 보여줍니다.
//체크된 경우 : Exception
//해제된 경우 : 취소선 삭제, 표시X
//입력시 표시X
completedButton.addEventListener("click", () => {
  counterUpdate();
  //중복 누름을 방지합니다.
  if (!completedButton.classList.contains("control-button--unclicked")) {
    return;
  }

  allButton.classList.add("control-button--unclicked");
  activeButton.classList.add("control-button--unclicked");
  completedButton.classList.remove("control-button--unclicked");

  const ulList = document.querySelector(".todo-list");
  deleteAllList();
  for (let newItem of todoItems) {
    if (newItem.isChecked) {
      const listItem = createListItem(newItem.id, newItem.text);
      if (newItem.isChecked) {
        makeStrikeThrough(listItem, newItem);
      }
      ulList.append(listItem);
    }
  }
  toolbarUpdate();
});

/**
 * 체크된 모든 리스트를 삭제하는 버튼을 표시할 지 여부를 결정합니다.
 */
export function checkClearButton() {
  const clearButton = document.querySelector(".menu-clear");
  let shouldShow = false;
  for (let item of todoItems) {
    if (item.isChecked === true) {
      shouldShow = true;
      break;
    }
  }
  if (shouldShow) {
    clearButton.classList.remove("menu-clear--hiding");
  } else {
    clearButton.classList.add("menu-clear--hiding");
  }
  checkAllToggle();
}
