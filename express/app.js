/**
 * espress 이용한 서버 생성 및 실행
 *
 */

// express 모듈 가져오기
import express from "express";
// express 어플리케이션 생성
const app = express();

app.get("/we/:id", (req, res, next) => {
  // req : 요청에 대한 정보를 담고 있는 객체
  // 요청에서 갖고 올수 있는 정보들 확인 해보기
  console.log(req.url);
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.params);
  console.log(req.params.id);
  console.log(req.query);
  console.log(req.query.keyword);

  // res.send : 클라이언트에게 응답을 보낸다.
  res.send("응답 완료");
});

// port 라우팅 설정 , 서버를 지정된 포트에서 실행한다.
app.listen(8080);
