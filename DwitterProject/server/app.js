import express from "express";
import cors from "cors";
// 디버깅
import morgan from "morgan";
// 보안
import helmet from "helmet";

import tweetRouter from "./router/tweet.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// /tweets 경로로 들어오는 요청은 tweetRouter로 라우팅하도록 설정
app.use("/tweets", tweetRouter);

// 공통 에러 처리 미들웨어

// 다른 url의 요청에 대한 에러 (지원하지 않는 api이다)
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
