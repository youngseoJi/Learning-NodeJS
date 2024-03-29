const fs = require("fs");
// 스트림을 사용하면 파일을 읽고 쓰는 작업을 할 때 메모리를 적게 사용할 수 있다.

const data = [];
const readStream = fs.createReadStream("./file.txt", {
  // highWaterMark: 8, // 64 kbytes
  encoding: "utf-8",
});

const beforeMem = process.memoryUsage().rss;

readStream.on("data", (chunk) => {
  console.log(chunk);
  data.push(chunk);
  console.count("data count");
  readStream.close();
});

// 스트림을 다 읽어오면,
readStream.on("close", () => {
  console.log(data.join(""));
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});

// 에러
readStream.on("error", (error) => {
  console.log(error);
});
