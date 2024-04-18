import { validationResult } from "express-validator";

// 중복되는 유효성 검사 로직을 미들웨어로 분리

// 유효성 검사 미들웨어
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  // 애러가 없으면? 다음 미들웨어로 넘어감
  if (errors.isEmpty()) {
    return next();
  }
  // 에러가 있으면? 에러 메세지 응답
  return res.status(400).json({ message: errors.array()[0].msg });
};
