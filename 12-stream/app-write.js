const fs = require("fs");

// 파일 쓰기
const writeStream = fs.createWriteStream("./file3.txt");

// 파일 쓰기 종료시 실행
writeStream.on("finish", () => {
  console.log("finished!");
});

writeStream.write("hello!");
writeStream.write("world!");

// 파일 쓰기 종료임을 알린다.
writeStream.end();
