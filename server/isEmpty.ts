export function isEmpty(arr: string[]) {
  for (let item in arr) {
    if (item.trim() == "") {
      return true;
    }
  }
  return false;
}
