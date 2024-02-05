import { controlOption } from "./toolbar.js";

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
export function deleteCheckedList() {
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

function handleDeleteItem(itemId, listItem) {
  // 2
  todoItems = todoItems.filter((item) => item.id !== itemId);
  // 3
  listItem.remove();
}

function handleCheckItem(item, listItem) {
  //2
  item.isChecked = !item.isChecked;
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
  });
  newListCheckButton.addEventListener("click", () => {
    handleCheckItem(item, newList);
  });
}

/**
 * 이벤트를 통해 리스트를 추가하는 함수
 */
export function makeNewListItem(id, text) {
  const todoList = document.querySelector(".todo-list");

  const newListItem = document.createElement("li");
  newListItem.classList.add("todo-list__item");

  const newListItemLeft = document.createElement("div");
  newListItemLeft.classList.add("todo-list__item-left");

  const newListItemCheckButton = document.createElement("button");
  newListItemCheckButton.classList.add("todo-list__item-check-button");

  const newListItemText = document.createElement("div");
  newListItemText.classList.add("todo-list__item-text");

  const newListItemDeleteButton = document.createElement("button");
  newListItemDeleteButton.classList.add("todo-list__delete-button");

  newListItemText.textContent = text;
  newListItemCheckButton.textContent = "";
  newListItemLeft.append(newListItemCheckButton);
  newListItemLeft.append(newListItemText);
  newListItem.append(newListItemLeft);
  newListItem.append(newListItemDeleteButton);
  todoList.prepend(newListItem);

  newListItemDeleteButton.addEventListener("click", () => {
    handleDeleteItem(item.id, newListItem);
  });
  newListItemCheckButton.addEventListener("click", () => {
    handleCheckItem(
      todoItems.filter((item) => item.id === id),
      newListItem
    );
  });
}

// const itemButton = listItem.querySelector(".todo-list__item-check-button");
// itemButton.addEventListener("click", () => {
//   const item = todoItems.find((item) => item.id === itemId);
//   if (!item) {
//     throw new Error(`No item with ID: ${itemId}`);
//   }
//   //수정사항 : 체크가 된 목록은 취소선이 그어지도록 변경했습니다.
//   if (item.isChecked) {
//     itemButton.textContent = "";
//     itemTextE1.classList.remove("todo-list__item-checked");
//   } else {
//     itemButton.textContent = "✔️";
//     itemTextE1.classList.add("todo-list__item-checked");
//   }
//   item.isChecked = !item.isChecked;
