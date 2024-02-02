import { todoItems } from "../main";

let controlOption = 0;
let clearOption = 0;
let numberOfItems = 0;
let numberOfChecks = 0;
// let item = {id: id, isChecked: false, text: text};

/**
 * todo 리스트를 업데이트하는 메인 함수
 */
export function updateList() {}

/**
 * 리스트를 토글하는 함수
 */
function toggleList() {
  const todoList = document.querySelector(".todo-list");

  if (numberOfItems === 0) {
    todoList.classList.add("menu__select--hiding");
  } else {
    todoList.classList.remove("menu__select--hiding");
  }
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
      makeList(item.id);
    }
  } else if (controlOption === 1) {
    for (let item of todoItems) {
      if (item.isChecked === false) {
        makeList(item.id);
      }
    }
  } else {
    for (let item of todoItems) {
      if (item.isChecked === true) {
        makeList(item.id);
      }
    }
  }
}

/**
 * 리스트 하나를 추가하는 함수(이미 있는 개체로 제작)
 */
function makeList(id) {
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

  newListLeft.append(newListCheckButton);
  newListLeft.append(newListText);
  newList.append(newListLeft);
  newList.append(newListDeleteButton);
  todoList.append(newList);
}

/**
 * 이벤트를 통해 리스트를 추가하는 함수
 */
function makeNewList() {}
