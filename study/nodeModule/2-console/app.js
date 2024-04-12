console.log("logging...");
console.clear();

/* 개발할 때는 콘솔 로그를 사용할 때는 이 레벨별로 잘 구분해서 사용하시는 게 좋습니다

레벨에 따라서 다양한 API가 존재하는 이유:서버에 배포했을 때 정말 중요한 워닝이나 에러 같은 경우는 우리가 로그 파일을 남기거나 로그를 남길 수 있는
서비스를 이용하는 경우가 있는데요 이렇게 로그의 심각성에 따라서 레벨별로 잘 콘솔 로그를 활용하시면
나중에 배포했을 때 서버의 심각성을 빠르게 알아차리기 쉽고 또 에러가 있을 때 그 부분을 수정하기가 좋습니다 

에러인데도 계속 로그만 사용하면 나중에 정말 심각한지 아닌지 이렇게 걸러내는 데도 힘들고
그우리가 개발할 때는 이렇게 로그를 이용하지만 배포할 때는 로그를 출력하지 않도록 레벨별로 정말 출력할 건지 
파일에 저장할 건지를 컨트롤할 수 있기 때문에 개발할 때부터 이렇게 레벨별로 다르게 콘솔 로그를 이용하시는 게 좋습니다
*/

// log level
console.log("log"); // 개발
console.info("info"); // 정보
console.warn("Warning"); // 경보
console.error("Error"); // 에러 (사용자에러, 시스템에러)

// assert
// 참이 아닌 경우에만 로그가 출력된다. 특정한 조건일 때 로그를 출력하고 싶을 때 사용함.
console.assert(2 === 3, "not same!");
console.assert(2 === 2, "same!");

// print object
const student = { name: "jane", age: 22, company: { name: "AC" } };
console.log(student);
console.table(student);
console.dir(student, { colors: false, depth: 1 }); // colors: 색상, depth 객체의 깊이

// measuring time 성능 측정
console.time("for loop"); // 성능 측정 시작

for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd("for loop"); // 성능 측정 종료

// counting 몇번 호출되었는지 확인
function a() {
  console.count("a function");
}

a();
a();

// trace 디버깅할 때 유용하다. 도대체 어디에서 이 함수를 호출했는지 궁금할 때 사용

function f1() {
  f2();
}
function f2() {
  f3();
}

function f3() {
  console.log("f3");
  console.trace();
}
f1();
