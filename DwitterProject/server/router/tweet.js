// import 하는 순서는 보통 외부 라이브러리 -> 내부 파일 순서로 한다.
import express from "express";
import { body, param } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/vaildator.js";

// /tweet 경로, tweet 기능 api 라우터
const router = express.Router();

// 따로 빼놓은 유효성 검사 함수
const validateTweet = [
  body("text")
    .trim()
    // .notEmpty()
    .isLength({ min: 2 })
    .withMessage("메세지를 두 글자 이상 입력해주세요."),
  validate,
];

// 전체 트윗 조회 Get /tweets
// 특정 유저 트윗 조회 Get /tweets?username=:username
router.get("/", tweetController.getTweets);

// 특정 트윗 조회 /tweets/:id -> 프론트 단에서 사용 X
router.get("/:id", tweetController.getTweet);

// 새로운 트윗 생성 /tweets
router.post("/", validateTweet, tweetController.createTweet);

// 트윗 삭제 /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

// 트윗 수정 /tweets/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

export default router;
