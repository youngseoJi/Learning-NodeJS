const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt");
// zlib: 파일을 압축하는 모듈
const zlibStream = zlib.createGzip();
// 파일 쓰기
const writeStream = fs.createWriteStream("./file4.zip");

// pipe: 스트림끼리 연결하는 것, 데이터가 물 흐르듯이 전달된다.
// readStream -> zlibStream -> writeStream 연결
const piping = readStream.pipe(zlibStream).pipe(writeStream);
piping.on("finish", () => {
  console.log("done!!");
});

// 서버에 파일을 보낼 때
const http = require("http");
const server = http.createServer((req, res) => {
  // 스트림 자체를 응답에 pipe로 연결하여 보낼수있다. 실시간. (한번에 보내는것보다 효율적임)
  const stream = fs.createReadStream("./file.txt");
  stream.pipe(res);
});
server.listen(3000);
