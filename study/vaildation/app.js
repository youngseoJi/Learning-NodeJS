import express from "express";

// express-validator : 유효성 검사 미들웨어
// 유효성 검사 실습하기
import { body, param, validationResult } from "express-validator";

const app = express();
app.use(express.json());

// 중복되는 유효성 검사 로직을 미들웨어로 분리
const validate = (req, res, next) => {
  const errors = validationResult(req);
  // 애러가 없으면? 다음 미들웨어로 넘어감
  if (errors.isEmpty()) {
    return next();
  }
  // 에러가 있으면? 에러 메세지 응답
  return res.status(400).json({ message: errors.array()[0].msg });
};

app.post(
  "/users",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("이름은 두글자 이상!"),
    body("age").isInt().withMessage("숫자를 입력해"),
    body("email").isEmail().withMessage("이메일 입력해요").normalizeEmail(),
    body("job.name").notEmpty(),
    // 확인한 후 유효성 검사 함수 추가
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  "/:email",
  [param("email").isEmail().withMessage("이메일 입력해요"), validate],
  (req, res, next) => {
    res.send("💌");
  }
);

app.listen(8080);
