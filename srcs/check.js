import { createListItem, todoItems } from "./main.js";
import { counterUpdate, deleteAllList } from "./utils.js";
import { checkClearButton } from "./control.js";

const allButton = document.querySelector(".control-all");
const activeButton = document.querySelector(".control-active");
const completedButton = document.querySelector(".control-completed");
const checkAll = document.querySelector(".check-all");

/**
 * checkAll 버튼이 최초 상태인지 확인, 아니라면
 * 모두 체크되었는지, 혹은
 * 모두 체크가 해제되어 있는지도
 * 확인합니다.
 */
export function checkAllToggle() {
  // const todoList = document.querySelector(".todo-list");
  if (todoItems.length !== 0) {
    let isAllChecked = true;
    checkAll.classList.remove("check-all--initial");
    for (let item of todoItems) {
      if (item.isChecked === false) {
        isAllChecked = false;
        break;
      }
    }
    if (isAllChecked) {
      checkAll.classList.remove("check-all--off");
      checkAll.classList.add("check-all--on");
    } else {
      checkAll.classList.remove("check-all--on");
      checkAll.classList.add("check-all--off");
    }
  } else {
    checkAll.classList.remove("check-all--on");
    checkAll.classList.remove("check-all--off");
    checkAll.classList.add("check-all--initial");
  }
}

/**
 * 체크되어 있는 목록에 취소선을 긋습니다.
 * @param {*} listItem
 */
export function makeStrikeThrough(listItem, item) {
  const itemTextE1 = listItem.querySelector(".todo-list__item-text");
  const itemButton = listItem.querySelector(".todo-list__item-check-button");
  if (!item.isChecked) {
    itemButton.textContent = "";
    itemTextE1.classList.remove("todo-list__item-checked");
  } else {
    itemButton.textContent = "✔️";
    itemTextE1.classList.add("todo-list__item-checked");
  }
}

//하나라도 체크가 되어있지 않으면 모든 리스트를 체크하고,
//모두 체크가 되어있다면 모든 리스트를 체크 해제합니다.
checkAll.addEventListener("click", () => {
  const todoList = document.querySelector(".todo-list");

  let isAllItemsChecked = true;
  for (const item of todoItems) {
    if (!item.isChecked) {
      isAllItemsChecked = false;
    }
  }

  if (!isAllItemsChecked) {
    let isChanged = false;
    for (let item of todoItems) {
      if (item.isChecked === false) {
        item.isChecked = true;
        isChanged = true;
      }
    }
    //하나라도 체크가 안 되어있는 경우
    if (isChanged) {
      checkAll.classList.add("check-all--on");
      checkAll.classList.remove("check-all--off");
      if (!allButton.classList.contains("control-button--unclicked")) {
        for (const item of todoList.childNodes) {
          makeStrikeThrough(item, { isChecked: true });
        }
      } else if (
        !activeButton.classList.contains("control-button--unclicked")
      ) {
        deleteAllList();
      } else {
        for (const item of todoItems) {
          const list = createListItem(item.id, item.text);
          makeStrikeThrough(list, { isChecked: true });
          todoList.append(list);
        }
      }
    } else {
      //모두 체크되어 있는 경우
      checkAll.classList.add("check-all--off");
      checkAll.classList.remove("check-all--on");
      for (let item of todoItems) {
        item.isChecked = false;
      }

      if (!allButton.classList.contains("control-button--unclicked")) {
        for (const item of todoList.childNodes) {
          makeStrikeThrough(item, { isChecked: false });
        }
      } else if (
        !activeButton.classList.contains("control-button--unclicked")
      ) {
        for (let item of todoItems) {
          const list = createListItem(item.id, item.text);
          todoList.append(list);
        }
      } else {
        deleteAllList();
      }
    }
    counterUpdate();
    checkClearButton();
  }
});
