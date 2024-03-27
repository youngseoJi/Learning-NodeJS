const { get } = require("http");

let counter = 0;
// 내부함수

function increase() {
  counter++;
}

function getCount() {
  return counter;
}
function decrease() {
  counter--;
}

// module.exports.getCount = getCount;
exports.getCount = getCount;
console.log(module.exports === exports); // true
exports = {};
// 엑스포츠를 사용할 때는 이렇게 특정한 값을 바로 할당하면 위험 (하지만 자바스크립트에 최신 방식 이용하면 문제가 없다.)
console.log(module.exports === exports); // false
module.exports.increase = increase;
