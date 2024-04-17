import tweetDatajson from "../data/tweets" assert { type: "json" };
// let tweetData = tweetDatajson;
// API 기능 구현

/* ## 기능 정리 api##

1. 전체 트윗 갖고오기 Get /tweets
2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username
3. 특정 트윗 조회 Get /tweets/:id
4. 새로운 트윗 생성 POST /tweets
5. 트윗 삭제 DELETE /tweets/:id
6. 트윗 수정 PUT /tweets/:id
*/

// 1. 전체 트윗 갖고오기 Get /tweets
export const getAllTweets = (req, res) => {
  res.status(200).json(tweetData);
};

// 2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username
export const getUserTweet = (req, res) => {
  // username 유뮤 -> username 유? 해당 tweet만 가져오고, 무? 전체 tweet을 조회
  const username = req.query.username;
  const data = username
    ? tweetData.filter((tweet) => tweet.username === username)
    : tweetData;

  res.status(200).json(data);
};

// 3. 특정 트윗 조회 Get /tweets/:id
export const getTweet = (req, res) => {
  // id 값으로 특정 트윗을 조회
  const id = req.params.id;
  const tweet = tweetData.find((tweet) => tweet.id === id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

// 4. 새로운 트윗 생성 POST /tweets
export const createTweet = (req, res) => {
  // 필수 데이터 : text, name, username
  const { text, name, username } = req.body;

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweetData = [tweet, ...tweetData];
  res.status(201).json(tweet);
};
// 5. 트윗 삭제 DELETE /tweets/:id

export const deleteTweet = (req, res) => {
  const id = req.params.id;
  tweetData = tweetData.filter((tweet) => tweet.id !== id);

  res.status(204).send("해당 트윗이 삭제되었습니다.");
};
// 6. 트윗 수정 PUT /tweets/:id

export const updateTweet = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweetData.find((tweet) => tweet.id === id);

  if (tweet) {
    // 업데이트 하는 부분
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

/**
 * {
  id: string,  // 트윗 아이디
  text: string,  // 트윗 텍스트
  createdAt: Date, // 트윗 생성 날짜
  name: string,  // 사용자 이름
  username: string,  // 사용자 닉네임 (아이디)
  url: string (optional) // 사용자 프로파일 사진 URL
} */
