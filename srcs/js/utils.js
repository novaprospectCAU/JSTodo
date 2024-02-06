// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }

import { updateCheckButton } from "./input-space.js";
import { todoItems, updateList } from "./todo-list.js";
import { updateToolBar } from "./toolbar.js";

/**
 * 체크된 모든 아이템을 제거하는 함수
 */
export function deleteAllCheck() {
  todoItems = todoItems.filter((item) => item.isChecked === false);
}

export function updateAll() {
  console.log("1");
  console.log(todoItems);

  updateList();
  console.log("2");
  console.log(todoItems);

  updateCheckButton();
  console.log("3");
  console.log(todoItems);

  updateToolBar();
  console.log("4");
  console.log(todoItems);
}
