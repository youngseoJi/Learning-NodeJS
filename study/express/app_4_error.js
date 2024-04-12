/**
 * 에러 처리
 * 1. 동기식 에러 처리
 * 2. 비동기식 에러 처리
 */

import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

// 동기식 에러 처리
app.get("/file", (req, res) => {
  fs.readFile("/file1.txt", (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.get("/file1", (req, res) => {
  try {
    const data = fs.readFileSync("/file1.txt");
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

// 비동기식 에러 처리
// 비동기식 에러 처리는 express에서 지원하지 않기에, 직접 에러처리를 해주어야한다. 필수!

// app.get("/file2", (req, res) => {
//   // 프로미스
//   return fsAsync.readFile("/file2.txt").then((data) => {
//     res.send(data);
//   });
//   // .catch((error) => {
//   //   res.sendStatus(404);
//   // });
// });
app.get("/file3", async (req, res) => {
  try {
    const data = await fsAsync.readFile("/file2.txt");
    res.send(data);
  } catch (error) {
    next(error); // 에러를 Express의 에러 핸들러로 전달
  }
});

//   // } catch {
//   //   res.sendStatus(404);
//   // }
// });

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
