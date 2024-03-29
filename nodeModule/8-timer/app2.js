console.time("timeout 0");
console.log("code1");
setTimeout(() => {
  console.timeEnd("timeout 0");
  console.log("setTimeout 0");
}, 0);
// setTimeout은 0초라는 것은 setImmediate와 비슷하지만 실제로 콜백함수가 수행되기 위해서는
//  콜스택이 텅텅 비을 때까지 기다려야 함으로 사실 이것보다 더 많은 시간이 걸릴 수 있다
console.log("code2");
setImmediate(() => {
  // console.timeEnd("timeout 0");
  console.log("setImmediate");
});
// 콜백함수를 즉시 실행하고 싶을 때 사용하는 함수; setTimeout보다 먼저 실행됨

console.log("code3");

process.nextTick(() => {
  console.log("nextTick");
});

/*
 현재 코드가 다 완료된 다음에 태스크큐에 들어온 이 콜백 함수를 순차적으로 수행

code1
code2
code3
nextTick
setImmediate
setTimeout 0  */
// nextTick이 가장 먼저 실행되고, setImmediate setTimeout은 거의 동시에 실행되나 setImmediate가 먼저 실행됨
