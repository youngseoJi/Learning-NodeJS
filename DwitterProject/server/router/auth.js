/**  유효성 검사를 서버에서 빠르게 해야하는이유
 *
 * 데이터 베이스에 접근해서 읽고 쓰고 하는 것은 시간이 오래 걸리고 비용이 많이 든다.
 * 그래서 서버에서 빠르게 유효성 검사를 해서 잘못된 데이터를 빨리 거르는 것이 좋다.
 * validation, sanitization을 통해 데이터를 정제하고 일관성있게 유지할 수 있다.
 */

// import 하는 순서는 보통 외부 라이브러리 -> 내부 파일 순서로 한다.
import express from "express";
import { body, param } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/vaildator.js";

// /auth 경로, 인증 기능 api 라우터
const router = express.Router();

// 로그인 유효성 검사
const validateLogin = [
  body("username").trim().notEmpty().withMessage("아이디를 입력해주세요."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요.")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
    .withMessage(
      "비밀번호는 숫자와 특수문자를 포함하여 6글자 이상 입력해주세요."
    ),
  validate,
];

// 회원가입 유효성 검사 함수
const validateSignUp = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("이름을 입력해주세요."),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식이 아닙니다."),
  body("url")
    .isURL()
    .withMessage("이미지 url 형식이 아닙니다.")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

// 회원가입 /auth
router.post("/signup", validateSignUp, authController.signUp);

// 로그인 /auth
router.post("/login", validateLogin, authController.login);

// // 로그인한 내 정보 /auth/me
// router.get("/me", authController.me);

export default router;
