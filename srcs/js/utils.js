// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }

import { todoItems } from "./todo-list.js";

/**
 * 체크된 모든 아이템을 제거하는 함수
 */
export function deleteAllCheck() {
  todoItems = todoItems.filter((item) => item.isChecked === false);
}
