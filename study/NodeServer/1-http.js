/**
 * 1. http 모듈 사용하여 서버 만들기
 * 2. fs 모듈 사용하여 파일 읽기
 * 3. 읽어온 파일을 웹페이지로 보여주기
 */

// 서버 만들기
const http = require("http"); // 개발할때는 http를 사용한다.왜냐하면 https는 인증서가 필요하기 때문이다. 복잡하다.
const fs = require("fs");
// const http2 = require("http2"); //http2는 https를 사용할때 사용
// 배포할떄 https를 사용하여 배포하는 경우가 많다.

// createServer : 서버 만들기
const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  // console.log(req.httpVersion);
  // console.log(req.method);
  // console.log(req.url);

  const url = req.url;
  // url에 따라 다른 응답을 보내는 방법

  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else if (url === "/courses") {
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});
// end : 서버 종료

// 서버등록
server.listen(8080);
// 서버에서 어떤 포트를 사용할지 정해주기
