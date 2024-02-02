let controlOption = 0;
let clearOption = 0;
let numberOfItems = 0;
let numberOfChecks = 0;
// let item = {id: id, isChecked: false, text: text};

export function calculateTotalItems() {
  return todoItems.length;
}

export function calculateNotCheckedItems() {
  return todoItems.filter((item) => item.isChecked === false).length;
}

export function calculateCheckedItems() {
  return todoItems.filter((item) => item.isChecked === true).length;
}
