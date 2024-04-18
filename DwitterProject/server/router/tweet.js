import express from "express";
// import * as tweetRepository from "../data/tweet.js"; // tweet 데이터를 가져옴
import { body, param, validationResult } from "express-validator";

import * as tweetController from "../controller/tweet.js";

// /tweet 경로, tweet 기능 api 라우터
const router = express.Router();

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

// 전체 트윗 조회 Get /tweets
// 특정 유저 트윗 조회 Get /tweets?username=:username
router.get("/", tweetController.getTweets);

// 특정 트윗 조회 /tweets/:id -> 프론트 단에서 사용 X
router.get("/:id", tweetController.getTweet);

// 새로운 트윗 생성 /tweets
router.post(
  "/",
  [
    body("text")
      .trim()
      .notEmpty()
      .withMessage("메세지를 한 글자 이상 입력해주세요."),
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("이름을 두 글자 이상 입력해주세요."),
    body("username")
      .trim()
      .isLength({ min: 2 })
      .withMessage("유저 이름을 두 글자 이상 입력해주세요."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("유효한 이메일 주소를 입력해주세요."),
    validate,
  ],
  tweetController.createTweet
);

// 트윗 삭제 /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

// 트윗 수정 /tweets/:id
router.put(
  "/:id",
  [
    body("text")
      .trim()
      .isLength({ min: 1 })
      .withMessage("메세지를 한 글자 이상 입력해주세요."),
    validate,
  ],
  tweetController.updateTweet
);

export default router;
