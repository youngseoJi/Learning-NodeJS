// 노드 모듈임을 알리기 위해 require 함수를 사용한다.
const fs = require("fs");

console.log(global);

global.hello = () => {
  global.console.log("hello");
};

global.hello(); // 글로벌은 생략 가능
hello();
