import express from "express";

// 각 라우터를 가져온다.
import userRouter from "./routers/user.js";
import postRouter from "./routers/post.js";

const app = express();

// 유용한 express 내부 미들웨어 함수
app.use(express.json()); // REST API -> body 데이터를 json으로 변환
// app.use(express.urlencoded({ extended: false })); // HTML Form 애서 제출한-> html에서 생성한 데이터를 -> body 데이터 파싱
// app.use(express.static()); // 정적 파일 제공 -> 이미지, css 파일, js 파일 등 모든 리소스를 사용자가 읽을 수 있도록 해준다.
// app.use(express.static('public 폴더명', 옵션)); -> public 폴더를 정적 파일 제공을 위한 폴더로 사용한다.

// 도메인이 2개 가 있음을 알 수 있다.

// /posts 경로로 들어오는 요청은 postRouter로 라우팅해라
app.use("/posts", postRouter);
// /users 경로로 들어오는 요청은 userRouter로 라우팅해라
app.use("/users", userRouter);

app.listen(8080);
