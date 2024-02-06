import { controlOption, updateToolbar } from "./toolbar.js";
import { updateAll } from "./utils.js";

export let todoItems = [];

// let clearOption = 0;
// let numberOfItems = 0;
// let numberOfChecks = 0;
// let currentOption = 0;
// let item = {id: id, isChecked: false, text: text};

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
      makeList(item);
    }
  } else if (controlOption === 1) {
    for (let item of todoItems) {
      if (item.isChecked === false) {
        makeList(item);
      }
    }
  } else {
    for (let item of todoItems) {
      if (item.isChecked === true) {
        makeList(item, handleDeleteItem);
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
function makeList(item) {
  const todoList = document.querySelector(".todo-list");

  const newList = document.createElement("li");
  newList.classList.add("todo-list__item");

  const newListLeft = document.createElement("div");
  newListLeft.classList.add("todo-list__item-left");

  const newListCheckButton = document.createElement("button");
  newListCheckButton.classList.add("todo-list__item-check-button");

  const newListText = document.createElement("div");
  newListText.classList.add("todo-list__item-text");

  const newListDeleteButton = document.createElement("button");
  newListDeleteButton.classList.add("todo-list__delete-button");

  newListText.textContent = item.text;
  if (item.isChecked === true) {
    newListText.classList.add("todo-list__item-checked");
    newListCheckButton.textContent = "✔️";
  } else {
    newListText.classList.remove("todo-list__item-checked");
    newListCheckButton.textContent = "";
  }

  newListLeft.append(newListCheckButton);
  newListLeft.append(newListText);
  newList.append(newListLeft);
  newList.append(newListDeleteButton);
  todoList.append(newList);

  // newListDeleteButton.addEventListener("click", () => {
  //   newList.remove();

  // });
  newListDeleteButton.addEventListener("click", () => {
    handleDeleteItem(item.id, newList);
    // updateList();
    // updateToolBar();
    updateAll();
  });
  newListCheckButton.addEventListener("click", () => {
    handleCheckItem(item, newList);
    // updateList();
    // updateToolBar();
    updateAll();
  });
}
