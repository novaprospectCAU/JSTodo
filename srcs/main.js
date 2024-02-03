export let todoItems = [];

import { menuFilter, counterUpdate } from "./utils.js";
import { checkAllToggle } from "./check.js";
import { toolbarUpdate, checkClearButton } from "./control.js";

const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const allButton = document.querySelector(".control-all");
const activeButton = document.querySelector(".control-active");
const completedButton = document.querySelector(".control-completed");
const clearButton = document.querySelector(".menu-clear");

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const itemText = todoInput.value;

    //수정사항 : 입력값이 없으면 추가하지 않습니다.
    //수정사항 : 입력값의 앞뒤 공백은 입력으로 생각하지 않습니다.
    if (itemText.trim() !== "") {
      todoInput.value = "";
      const itemId = makeId();
      todoItems.unshift({ id: itemId, isChecked: false, text: itemText });
      //수정사항 : Completed일 때는 입력해도 표시되지 않습니다.
      if (completedButton.classList.contains("control-button--unclicked")) {
        const listItem = createListItem(itemId, itemText);
        todoList.prepend(listItem);
      }
      toolbarUpdate();
    }
  }
});

export function createListItem(itemId, itemText) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-list__item");

  //수정사항 : 버튼을 원본과 같은 스타일로 변경하였습니다.
  listItem.innerHTML = `
    <div class="todo-list__item-left">
      <button class="todo-list__item-check-button" type="button"></button>
      <div class="todo-list__item-text"></div>
    </div>
    <button class="todo-list__delete-button">X</button>`;

  const itemTextE1 = listItem.querySelector(".todo-list__item-text");
  itemTextE1.textContent = itemText;

  const itemButton = listItem.querySelector(".todo-list__item-check-button");
  itemButton.addEventListener("click", () => {
    const item = todoItems.find((item) => item.id === itemId);
    if (!item) {
      throw new Error(`No item with ID: ${itemId}`);
    }
    //수정사항 : 체크가 된 목록은 취소선이 그어지도록 변경했습니다.
    if (item.isChecked) {
      itemButton.textContent = "";
      itemTextE1.classList.remove("todo-list__item-checked");
    } else {
      itemButton.textContent = "✔️";
      itemTextE1.classList.add("todo-list__item-checked");
    }
    item.isChecked = !item.isChecked;
    menuFilter(listItem);
    checkAllToggle();
    checkClearButton();
    counterUpdate();
  });

  //텍스트 박스로 변경
  // window.addEventListener("dblclick", e => {
  //   if (itemTextE1.contains(e.target)) {
  //     const inputString = itemTextE1.textContent;
  //     itemTextE1.outerHTML = `
  //       <input class="todo-list__item-text" type="text" value="${inputString}/>`;
  //   }
  // });

  const todoListDelete = listItem.querySelector(".todo-list__delete-button");
  // ul -> listItem(nth-child(3)) -> deleteButton
  todoListDelete.addEventListener("click", () => {
    listItem.remove();
    todoItems = todoItems.filter((item) => item.id !== itemId);
    toolbarUpdate();
  });
  return listItem;
}

let lastUsedId = 0;
function makeId() {
  lastUsedId++;
  return lastUsedId;
}

//clear버튼이 눌리면 체크된 모든 리스트를 제거합니다.
clearButton.addEventListener("click", () => {
  const todoList = document.querySelector("ul");
  for (let item = todoList.firstChild; item !== null; ) {
    const itemTextStyle = item.querySelector(".todo-list__item-checked");
    if (itemTextStyle !== null) {
      const temp = item.nextSibling;
      item.remove();
      item = temp;
    } else {
      item = item.nextSibling;
    }
    checkClearButton();
  }
  todoItems = todoItems.filter((item) => item.isChecked === false);
  toolbarUpdate();
  checkAllToggle();
});
