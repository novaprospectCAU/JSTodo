import { inputCheck } from "./input-space.js";
import { controlOption, updateToolbar } from "./toolbar.js";
import { updateAll } from "./utils.js";

export let todoItems = [];

export function deleteAllChecked() {
  todoItems = todoItems.filter((item) => item.isChecked === false);
}

/**
 * todo 리스트를 업데이트하는 메인 함수
 */
export function updateList() {
  toggleList();
  deleteAllList();
  addAllList();
}

/**
 * 리스트를 토글하는 함수
 */
function toggleList() {
  const todoList = document.querySelector(".todo-list");
  const MENU_HIDE = "menu__select--hiding";

  if (todoItems.length === 0) {
    todoList.classList.add(MENU_HIDE);
  } else {
    todoList.classList.remove(MENU_HIDE);
  }
}

/**
 * 체크된 리스트를 지우는 함수
 */
export function deleteCheckedListItems() {
  deleteAllList();
  addAllList();
}

/**
 * 리스트 전체를 지우는 함수
 */
function deleteAllList() {
  const todoList = document.querySelector(".todo-list");

  while (todoList.lastChild) {
    todoList.lastChild.remove();
  }
}

/**
 * 리스트 전체를 추가하는 함수
 */
function addAllList() {
  const todoList = document.querySelector(".todo-list");

  if (controlOption === 0) {
    for (let item of todoItems) {
      makeListItem(item);
    }
  } else if (controlOption === 1) {
    for (let item of todoItems) {
      if (item.isChecked === false) {
        makeListItem(item);
      }
    }
  } else {
    for (let item of todoItems) {
      if (item.isChecked === true) {
        makeListItem(item, handleDeleteItem);
      }
    }
  }
}

/**
 * 삭제 버튼을 눌렀을 때 작동하는 함수
 */
function handleDeleteItem(itemId, listItem) {
  // 2
  todoItems = todoItems.filter((item) => item.id !== itemId);
  // 3
  listItem.remove();
  updateToolbar();
}

/**
 * 체크 버튼을 눌렀을 때 작동하는 함수
 */
function handleCheckItem(item, listItem) {
  //2
  if (item.isChecked === false) {
    item.isChecked = true;
  } else {
    item.isChecked = false;
  }
  //3
  const ITEM_CHECKED = "todo-list__item-checked";
  const checkButton = listItem.querySelector(".todo-list__item-check-button");
  const itemText = listItem.querySelector(".todo-list__item-text");
  if (item.isChecked === true) {
    itemText.classList.add(ITEM_CHECKED);
    checkButton.textContent = "✔️";
  } else {
    itemText.classList.remove(ITEM_CHECKED);
    checkButton.textContent = "";
  }
}

/**
 * 리스트 하나를 추가하는 함수(이미 있는 개체로 제작)
 */
function makeListItem(item) {
  const todoList = document.querySelector(".todo-list");

  const newListItem = document.createElement("li");
  newListItem.classList.add("todo-list__item");

  //좌측 공간(체크 버튼, 텍스트 필드, input필드)
  const newListItemLeft = document.createElement("div");
  newListItemLeft.classList.add("todo-list__item-left");

  //체크 버튼
  const newListItemCheckButton = document.createElement("button");
  newListItemCheckButton.classList.add("todo-list__item-check-button");

  //텍스트 필드
  const newListItemText = document.createElement("div");
  newListItemText.classList.add("todo-list__item-text");

  //input필드(Default : off)
  const newListItemInput = document.createElement("input");
  newListItemInput.classList.add("todo-list__item-input");
  newListItemInput.classList.add("todo-list--switch");

  //삭제 버튼
  const newListItemDeleteButton = document.createElement("button");
  newListItemDeleteButton.classList.add("todo-list__delete-button");

  newListItemText.textContent = item.text;
  if (item.isChecked === true) {
    newListItemText.classList.add("todo-list__item-checked");
    newListItemCheckButton.textContent = "✔️";
  } else {
    newListItemText.classList.remove("todo-list__item-checked");
    newListItemCheckButton.textContent = "";
  }

  newListItemLeft.append(newListItemCheckButton);
  newListItemLeft.append(newListItemText);
  newListItemLeft.append(newListItemInput);
  newListItem.append(newListItemLeft);
  newListItem.append(newListItemDeleteButton);
  todoList.append(newListItem);

  newListItemDeleteButton.addEventListener("click", () => {
    handleDeleteItem(item.id, newListItem);
    // updateList();
    // updateToolbar();
    updateAll();
  });
  newListItemCheckButton.addEventListener("click", () => {
    handleCheckItem(item, newListItem);
    // updateList();
    // updateToolbar();
    updateAll();
  });
  newListItem.addEventListener("dblclick", () => {
    textToInputValue(newListItemInput, newListItemText);
  });
  newListItemInput.addEventListener("blur", () => {
    if (inputCheck(newListItemInput)) {
      inputValueToText(item, newListItemText, newListItemInput);
      updateAll();
    }
  });
  newListItemInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputCheck(newListItemInput) !== "") {
      inputValueToText(item, newListItemText, newListItemInput);
      updateAll();
    }
  });
}

/**
 * 텍스트 저장값을 인풋 필드 입력값으로 변환하는 함수
 */
function textToInputValue(newListItemInput, newListItemText) {
  newListItemInput.value = newListItemText.textContent;

  newListItemText.classList.add("todo-list--switch");
  newListItemInput.classList.remove("todo-list--switch");
}

/**
 * 인풋 필드 입력값을 텍스트로 변환하는 함수
 */
function inputValueToText(item, newListItemText, newListItemInput) {
  item.text = newListItemInput.value;
  newListItemText.textContent = newListItemInput.value;

  newListItemInput.classList.add("todo-list--switch");
  newListItemText.classList.remove("todo-list--switch");
}
