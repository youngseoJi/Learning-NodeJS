// 동기와 비동기, 프로미스

const fs = require("fs");
// fs : 파일 시스템 모듈
// 파일에서 사용자가 파일을 읽고 쓰는 등의 모든 기본작업을 할 수 있게 해주는 모듈

//! 모든 api는 3가지 형태로 제공이된다.

// rename(...,callback(error,data))
// 비동기 : callback 함수를 제공한다. 콜백함수를 통해 에러가 발생하면 처리를 해줄 수 있다. 기다리지 않고 다음 코드를 실행시킨다.

// try {renameSync(...)} catch(error) {}

// 동기 : callback 함수를 따로 제공하지 않고 끝날때까지 기다린 후 다음 코드를 실행시킨다. 그렇기에 사용을 잘 안한다.
// callback 함수가 없어서 try catch로 에러가 발생하면 처리를 해줘야한다.

// promises.rename().then().catch(0)

//  동기적으로 파일 이름 변경
try {
  fs.renameSync("./file.txt", "./file-new.txt");
} catch {
  console.error("error");
}
// fs.renameSync("/file.txt", "/file-new.txt");
console.log("hello");

// 비동기적으로 파일 이름 변경 : 콜백함수를 사용

fs.rename("./text2.txt", "./text.txt", (error) => {
  console.log("비동기", error);
});
console.log("비동기 hello");

// 비동기적으로 파일 이름 변경 : promise 형태로 사용하기

fs.promises
  .rename("./text10.txt", "./text-new.txt")
  .then(() => console.log("Done"))
  .catch(console.error);
