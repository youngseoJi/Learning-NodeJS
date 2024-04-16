import express from "express";
import tweetData from "../data/tweetData.js";
import {
  CreateTweet,
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  getUserTweet,
  postTweetCreate,
  putTweetUpdate,
  updateTweet,
} from "../controller/tweetController.js";
// /tweet 경로, tweet 기능 api 라우터

const router = express.Router();

/* ## 기능 정리 api##

1. 전체 트윗 갖고오기 Get /tweets
2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username
3. 특정 트윗 조회 Get /tweets/:id
4. 새로운 트윗 생성 POST /tweets
5. 트윗 삭제 DELETE /tweets/:id
6. 트윗 수정 PUT /tweets/:id
*/

// 전체 트윗 조회
router.get("/", getAllTweets);

// 특정 유저 트윗 조회
router.get("/", getUserTweet);

// 특정 트윗 조회
router.get("/:id", getTweet);

// 새로운 트윗 생성
router.post("/", createTweet);

// 트윗 삭제
router.delete("/:id", deleteTweet);

// 트윗 수정
router.put("/:id", updateTweet);

export default router;
