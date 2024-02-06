// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }

import { updateCheckButton } from "./input-space.js";
import { todoItems, updateList } from "./todo-list.js";
import { updateToolbar } from "./toolbar.js";

export function updateAll() {
  updateCheckButton();
  updateList();
  updateToolbar();
}
