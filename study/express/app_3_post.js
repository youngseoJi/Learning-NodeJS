import express from "express";
const app = express();

// 데이타를 json 형식으로 받게해줌
app.use(express.json());

app.post("/", (req, res, next) => {
  console.log("req.body", req.body);
});

app.listen(8080);
