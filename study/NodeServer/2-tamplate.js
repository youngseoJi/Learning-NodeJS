// 서버 만들기
const http = require("http"); // 개발할때는 http를 사용한다.왜냐하면 https는 인증서가 필요하기 때문이다. 복잡하다.
const fs = require("fs");
const ejs = require("ejs");

const name = "ys";
const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    ejs
      .renderFile("./template/index.ejs", { name })
      .then((data) => res.end(data));
  } else if (url === "/courses") {
    ejs
      .renderFile("./template/courses.ejs", { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile("./template/not-found.ejs", { name })
      .then((data) => res.end(data));
  }
});
// end : 서버 종료

// 서버등록
server.listen(8001);
// 서버에서 어떤 포트를 사용할지 정해주기
