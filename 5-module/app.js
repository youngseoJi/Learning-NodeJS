import { increase, decrease, getCount } from "./counter.js";
// import * as counter from "./counter.js";
// 모든 함수들을 이 카운터라는 이름 아래에 하나의 오브젝트 로 묶어와서 사용하는 방법도 있음
// counter.increase();

increase();
increase();
decrease();
console.log(getCount());
