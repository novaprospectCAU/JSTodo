// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }

import { updateCheckButton } from "./input-space.js";
import { todoItems, updateList } from "./todo-list.js";
import { updateToolbar } from "./toolbar.js";

/**
 * 체크된 모든 아이템을 제거하는 함수
 */
export function deleteAllChecked() {
  todoItems = todoItems.filter((item) => item.isChecked === false);
}

export function updateAll() {
  updateCheckButton();
  updateList();
  updateToolbar();
}
