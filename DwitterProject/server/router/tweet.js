import express from "express";
// import * as tweetRepository from "../data/tweet.js"; // tweet 데이터를 가져옴

import * as tweetController from "../controller/tweet.js";

// /tweet 경로, tweet 기능 api 라우터
const router = express.Router();

// 전체 트윗 조회
// 특정 유저 트윗 조회
router.get("/", tweetController.getTweets);

// 특정 트윗 조회
router.get("/:id", tweetController.getTweet);

// 새로운 트윗 생성
router.post("/", tweetController.createTweet);

// 트윗 수정
router.put("/:id", tweetController.updateTweet);

// 트윗 삭제
router.delete("/:id", tweetController.deleteTweet);

export default router;
