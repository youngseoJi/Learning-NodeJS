// 디버깅

// 디버깅은 실시간으로 원하는 곳, 코드가 특정한 조건일때 멈추고 자세하게 값 또는 로직을 확인할떄 사용한다.

// 프로그래밍을 처음부터 끝까지 실행시키면 생산성이 떨어질수있음, 디버거는 실시간으로 확인하면서 값도 변경할수있다.
// ex)반복문을 1회만 돌리고 싶을때, i의 값에 마우스를 올리고  i의 값을 9로 변경하여  변경하면 된다.

// watch를 이용하여 변수의 값을 확인할수있다.
// 브레이크 포인트 우측클릭 -> 편집-> 원하는 조건에만 브레이크 포인트를 활성화하도록 조건을 설정할수있다.
// ex) i === 4 일때만 브레이크 포인트를 설정하고 싶을때, 브레이크 포인트 우측클릭 -> 편집 -> 조건에 i === 4를 입력하면 된다.

// vscode에서 디버깅을 할때, 왼쪽에 빨간점을 찍어서 디버깅을 할수있다.

// F5:디버깅을 시작하고, F10:다음줄로 넘어가기, F11:함수안으로 들어가기, Shift + F11:함수에서 나오기
// F9:브레이크 포인트 설정, F5:브레이크 포인트로 이동, F5:다음 브레이크 포인트로 이동, F5:디버깅 종료

// 코드를 수정할때마다 자동으로 디버깅을 실행하고 싶을때, launch.json에서 "restart": true로 설정하면 된다.
function sayHello() {
  console.log("Hello");
}

function calculate(x, y) {
  console.log("calculating...");
  const result = x + y;
  console.log("done!", result);
  sayHello();
  return result;
}

calculate(1, 2);

const stop = 4;
console.log(".... looping ....");
for (let i = 0; i < 10; i++) {
  console.log("count", i);
  if (i === stop) {
    break;
  }
}
