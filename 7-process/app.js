const process = require("process");
// 노드가 동작하고 있는 프로세스에 대한 정보를 갖고오는 process 모듈

console.log(process.version);
console.log(process.arch);
console.log(process.platform);
console.log(process.pid);
console.log(process.execPath);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());

// 콜스택이 비었을 때 ( 코드가 다 실행완료 되어야 ) 콜백함수들이 실행된다.
// 코드가 다 완료된 다음에  이 콜백 함수를 task 큐에다가 넣어달라고 요청하는 것

// 코드가 다 수행이 되고 나서야 setTimeout 콜백 함수가 수행이 된다.
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 테스크큐에 다른 콜백 함수가 있어도 순서를 무시하고
// nextTick 함수가 먼저 실행됨 : 제일 우선순위를 높여서 테스크큐 제일 앞부분에다가 넣어주기 때문

process.nextTick(() => {
  console.log("nextTick");
});

// for (let i = 0; i < 10; i++) {
//   console.log("for loop");
// }
