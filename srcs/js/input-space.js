import { updateToolBar } from "./toolbar.js";
import { makeNewListItem, todoItems } from "./todo-list.js";

let highestId = 0;

/**
 * 입력받은 문자열이 저장 가능한 형태인지 확인하는 함수
 */
function inputCheck(input) {
  return input.value.trim();
}

/**
 * 입력받은 개체를 배열에 추가하는 함수
 */
function pushItem(id, text) {
  todoItems.push({ id: id, isChecked: false, text: text });
}

/**
 * 새로운 입력값을 받는 함수
 */
export function newInput() {
  const inputSpace = document.querySelector(".todo-input");
  inputSpace.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const string = inputCheck(inputSpace);
      if (string !== "") {
        pushItem(highestId, string);
        makeNewListItem(highestId++, string);
      }
    }
    updateToolBar();
  });
}

function toggleCheckButton() {
  if (todoItems.length === 0) {
    return 0;
  } else if (
    todoItems.filter((items) => items.isChecked === false).length > 0
  ) {
    return "off";
  } else {
    return "on";
  }
}

/**
 * 입력창의 체크 버튼의 누름에 따라 배열 내부를 조정하는 함수
 */
function changeItemsViaCheckButton(status) {
  if (status === 0) {
    return;
  } else if (status === "off") {
    for (let item of todoItems) {
      item.isChecked = false;
    }
  } else {
    for (let item of todoItems) {
      item.isChecked = true;
    }
  }
}

/**
 * 입력창의 체크 버튼의 모습을 결정하는 함수
 */
function updateCheckButton(status) {
  const checkButton = document.querySelector(".check-all");
  const OFF = "check-all--off";
  const ON = "check-all--on";
  const INIT = "check-all--initial";

  if (status === 0) {
    checkButton.classList.remove(OFF);
    checkButton.classList.remove(ON);
    checkButton.classList.add(INIT);
  } else if (status === "off") {
    checkButton.classList.add(OFF);
    checkButton.classList.remove(ON);
    checkButton.classList.remove(INIT);
  } else {
    checkButton.classList.remove(OFF);
    checkButton.classList.add(ON);
    checkButton.classList.remove(INIT);
  }
}

export function checkButton() {
  const checkButton = document.querySelector(".check-all");
  let checkButtonStatus = toggleCheckButton();
  checkButton.addEventListener("click", () => {
    checkButtonStatus = toggleCheckButton();
    if (checkButtonStatus === 0) {
    } else {
      changeItemsViaCheckButton(checkButtonStatus);
      updateCheckButton(checkButtonStatus);
      updateToolBar();
    }
  });
}

newInput();
