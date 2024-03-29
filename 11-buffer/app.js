// 버퍼
// 고정된 사이즈의 메모리 덩어리
// 숫자의 배열이며, 데이터에 있는 메모리/바이트 자체를 가리킨다.

const fs = require("fs");

// 버퍼생성 (유니코드 형태)
const buf = Buffer.from("Hi");
console.log(buf); //유니코드 형태 출력
console.log(buf.length);
// 배열내 문자열은 아스키코드 형태 출력
console.log(buf[0]);
console.log(buf[1]);
console.log(buf.toString());

// 버퍼 생성 (바이트 형태)
const buf2 = Buffer.alloc(2); // 초기화된 버퍼 생성
const buf3 = Buffer.allocUnsafe(2); // 초기화하지 않고 사용 (더 빠르나 데이터가 들어있을 경우를 생각해서 초기화 하는게 좋다.)

buf2[0] = 72;
buf2[1] = 105;
buf2.copy(buf3);

console.log(buf2);
console.log(buf2.toString());
console.log(buf3.toString());

// concat : 버퍼 합치기
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString());
