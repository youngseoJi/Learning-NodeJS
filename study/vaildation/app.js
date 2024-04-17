import express from "express";

// express-validator : 유효성 검사 미들웨어

// 유효성 검사 실습하기

// * 유효성 검사하기 validation
// - 데이터의 형식이나 규칙을 검사하는 것

// * 데이터 정제하기 Sanitization
// - 띄어쓰기 제거, 이메일 소문자로 변경, 특수문자 제거 등

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
    // 적절하게 뭐 부터 해야하는지 판단하는게 중요한 것 같음 밑에 예시들

    // ex)  유효성 검사하기전에 trim() 같은 스페이스(공백)제거 같은 정제 작업후 -> 검사해야한다.
    // 최소 2글자 유효성 검사가 앞에있으면, 공백 2개가 들어가 있어도 유효성 통과헤바린다!

    // 공백 정제 후 -> 유효성 검사
    body("name").trim().isLength({ min: 2 }).withMessage("이름은 두글자 이상!"),
    body("age").isInt().withMessage("숫자를 입력해"),

    //ex)  이메일 형식이 맞는지 확인 후 -> 정제 (소문자로 변경)
    // - 이메일 형식이아 아니면 정제할 필요도 없기떄문, 유효성 검사부터한다!
    body("email").isEmail().withMessage("이메일 입력해요").normalizeEmail(),
    body("job.name").notEmpty().withMessage("직업을 입력하세요"),
    // 확인한 후 유효성 검사 함수 추가
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: "유효성 검사 통과" });
  }
);

app.get(
  "/:email",
  [param("email").isEmail().withMessage("이메일 입력하세요"), validate],
  (req, res, next) => {
    res.send("이메일,유효성 검사 통과!");
  }
);

app.listen(8080);
