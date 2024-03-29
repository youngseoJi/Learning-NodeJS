// 로그 함수 사용하기
const logger = require("./logger.js");
// const emitter = new logger.Logger();
const emitter = new logger.Logger();

emitter.on("log", (event) => {
  console.log(event);
});

emitter.log(() => {
  console.log("..... ꝍ doing ꝍ....");
});

// logger.log(() => {
//   console.log("..... ꝍ doing ꝍ....");
// });
