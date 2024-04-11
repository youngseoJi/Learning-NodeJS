import express from "express";

// 각 라우터를 가져온다.
import userRouter from "./routers/user.js";
import postRouter from "./routers/post.js";

const app = express();

app.use(express.json());

// 도메인이 2개 가 있음을 알 수 있다.

// /posts 경로로 들어오는 요청은 postRouter로 라우팅해라
app.use("/posts", postRouter);
// /users 경로로 들어오는 요청은 userRouter로 라우팅해라
app.use("/users", userRouter);

app.listen(8080);
