import express from "express";
// import * as tweetRepository from "../data/tweet.js"; // tweet 데이터를 가져옴

import * as tweetController from "../controller/tweet.js";

// /tweet 경로, tweet 기능 api 라우터
const router = express.Router();

// 전체 트윗 조회 Get /tweets
// 특정 유저 트윗 조회 Get /tweets?username=:username
router.get("/", tweetController.getTweets);

// 특정 트윗 조회 /tweets/:id
router.get("/:id", tweetController.getTweet);

// 새로운 트윗 생성 /tweets
router.post("/", tweetController.createTweet);

// 트윗 삭제 /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

// 트윗 수정 /tweets/:id
router.put("/:id", tweetController.updateTweet);

export default router;
