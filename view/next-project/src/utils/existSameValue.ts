/** 配列内で値が重複してないか調べる **/
export default function existsSameValue(array: any[]) {
  var s = new Set(array);
  return s.size != array.length;
}
