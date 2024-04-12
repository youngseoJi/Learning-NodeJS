import express from "express";

// users 경로 라우터
const router = express.Router();

router.use((req, res, next) => {
  console.log("middleware for users!");
  next();
});

// 중복되는 최상위 루트 경로는 이미 app.js에서 처리하므로, 하위 경로만 작성한다.

router.get("/", (req, res) => {
  res.status(201).send("GET: /users");
});

router.post("/", (req, res) => {
  res.status(201).send("POST: /users");
});

router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /users/:id");
});

router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /users/:id");
});

export default router;
