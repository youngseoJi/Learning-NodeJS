/**
 * json으로 데이터 주고 받기
 * 사용자에서 json형태로 데이터를 제공하는 서버 생성
 *
 * 포스트맨 데스크탑 앱을 사용하여 서버에 데이터를 보내고 받는 것을 확인
 */

const http = require("http");

const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
];

// const http2 = require("http2"); //http2는 https를 사용할때 사용
const server = http.createServer((req, res) => {
  const url = req.url; // what? 무엇을 요청했는지
  const method = req.method; // how?, action? 어떤 방식으로 요청했는지, 무엇을 받아 왔는지

  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      // courses의 객체 데이터를 json으로 변환해서 보내준다.
      res.end(JSON.stringify(courses));
    }
    // POST 요청일때 : 새로운 데이터를 추가할때
    else if (method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });

      // 모든 데이터가 다 받아질때
      req.on("end", () => {
        const course = JSON.parse(Buffer.concat(body).toString());
        courses.push(course);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end();
      });
    }
  }
});

server.listen(8000);
