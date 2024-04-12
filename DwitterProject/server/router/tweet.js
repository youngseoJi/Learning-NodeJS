import express from "express";

// /tweet 경로, tweet 기능 api 라우터

const router = express.Router();

/**
 * {
  id: string,  // 트윗 아이디
  text: string,  // 트윗 텍스트
  createdAt: Date, // 트윗 생성 날짜
  name: string,  // 사용자 이름
  username: string,  // 사용자 닉네임 (아이디)
  url: string (optional) // 사용자 프로파일 사진 URL
} */

// 트윗 데이터
let tweets = [
  {
    id: "1",
    text: "테스트1 입니다.",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "테스트1 입니다.",
    createdAt: Date.now().toString(),
    name: "Estell",
    username: "ys",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

/* ## 기능 정리 api##

1. 전체 트윗 갖고오기 Get /tweets
2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username
3. 특정 트윗 조회 Get /tweets/:id
4. 새로운 트윗 생성 POST /tweets
5. 트윗 삭제 DELETE /tweets/:id
6. 트윗 수정 PUT /tweets/:id
*/

// API 기능 구현

// 전체 트윗 조회
// 특정 유저 트윗 조회
router.get("/", (req, res) => {
  // username 유뮤 -> username 유? 해당 tweet만 가져오고, 무? 전체 tweet을 조회
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;

  res.status(200).json(data);
});

// 특정 트윗 조회
router.get("/:id", (req, res) => {
  // id 값으로 특정 트윗을 조회
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// 새로운 트윗 생성
router.post("/", (req, res) => {
  // 필수 데이터 : text, name, username
  const { text, name, username } = req.body;

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// 트윗 삭제
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);

  res.status(204).send("해당 트윗이 삭제되었습니다.");
});

// 트윗 수정
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    // 업데이트 하는 부분
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

export default router;
