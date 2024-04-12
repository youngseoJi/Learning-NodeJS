import express from "express";

const app = express();
app.use(express.json());

// 반복되는 코드를 줄이기 위해 router를 사용헤애한다!

app.get("/posts", (req, res) => {
  res.status(201).send("GET: /posts");
});

app.post("/posts", (req, res) => {
  res.status(201).send("POST: /posts");
});

app.put("/posts/:id", (req, res) => {
  res.status(201).send("PUT: /posts/:id");
});

app.delete("/posts/:id", (req, res) => {
  res.status(201).send("DELETE: /posts/:id");
});

app.listen(8080);
