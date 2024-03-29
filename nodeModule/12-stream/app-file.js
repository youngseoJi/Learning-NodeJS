const fs = require("fs");

// 💩
const beforeMem = process.memoryUsage().rss;
// 파일을 읽고 쓰는 작업을 할 때 메모리를 사용하는 양을 비교해보기

// 모든 데이터를 읽고 쓰는 것은 비효율적인 방식임 -> 스트림을 사용해야함 (app-stream.js 참고 ㄴ)
fs.readFile("./file.txt", (_, data) => {
  fs.writeFile("./file2.txt", data, () => {});
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});
