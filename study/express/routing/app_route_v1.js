import express from "express";

const app = express();

app.use(express.json());

// 반복되는 코드를 줄이기 위해 router를 사용한다.
// 동일한 경로끼리 묶기
app
  .route("/posts")
  .get((req, res) => {
    res.status(201).send("GET: /posts");
  })
  .post((req, res) => {
    res.status(201).send("POST: /posts");
  });

app
  .route("/posts/:id")
  .put((req, res) => {
    res.status(201).send("PUT: /posts/:id");
  })
  .delete((req, res) => {
    res.status(201).send("DELETE: /posts/:id");
  });

app.listen(8080);
