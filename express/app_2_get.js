/**
 * express 미들웨어 사용 , 미들웨어 체인 사용
 */

import express from "express";

const app = express();

// all : 해당 경로에 대해서만 실행
// use : 해당 경로를 포함한, 뒤에 이어지는 모든 경로에 대해 실행
app.all("/api", (req, res, next) => {
  console.log("all");
  next();
});

app.use("/aaa", (req, res, next) => {
  console.log("use");
  next();
});

app.get(
  "/",
  // 똑같은 경로에 대해 여러개의 미들웨어를 사용할 수 있으며, 순차적으로 실행된다.
  // 미들웨어에서는 항상 res, next를 이용하여 흐름이 이어지도록 해야한다.

  (req, res, next) => {
    console.log("1번");
    // next(); 다음 미들웨어로 넘어간다. next()가 없으면 다음 미들웨어로 넘어가지 않는다.
    next(new Error("error 발생"));
  },
  (req, res, next) => {
    console.log("1번의 2번째");
    next();
  }
);

app.get("/", (req, res, next) => {
  console.log("2번");
});

// 에러처리 미들웨어 : 에러가 발생하면 이 미들웨어로 넘어온다.

// 경로 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.status(404).send("sorry, Not Found");
});
// 서버 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("sorry, try later");
});
app.listen(8008);
