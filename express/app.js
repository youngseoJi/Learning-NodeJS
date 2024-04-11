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

  // res : 응답에 대한 정보를 담고 있는 객체
  // 응답 데이터를 json 형식, 상태값만, 상태값과 데이터를 같이 보내는 등 다양한 형식으로 보낼수 있다.

  // res.send("데이터");
  // res.json({ name: "ys", age: 20 });
  // res.sendStatus(201);
  // 필요시 헤더에 데이터를 추가하여 보낼 수 있음
  res.setHeader("key", "value");
  res.status(201).send("created");
});

// port 라우팅 설정 , 서버를 지정된 포트에서 실행한다.
app.listen(8080);
