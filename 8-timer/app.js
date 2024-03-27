// 태스크 큐에 "대기"하다가 콜스택이 비어 있을 때 콜스택으로 "이동"하여 실행되는 타이머에 관련된 함수들
let num = 1;

const interver = setInterval(() => {
  console.log(num++);
}, 1000);
// 일정한 간격으로 어떠한 작업을 수행하고 싶을 때 사용하는 함수
// setInterval(콜백함수, 밀리초 단위 시간)

setTimeout(() => {
  console.log("timeout!");
  clearInterval(interver);
}, 6000);
// 일정한 시간이 지난 후에 어떠한 작업을 수행하고 싶을 때 사용하는 함수
