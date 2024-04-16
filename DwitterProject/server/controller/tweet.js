// MVC 중 "Controller" 부분 "비즈니스 로직" 역할
import * as tweetRepository from "../data/tweet.js";

/* API 기능 구현 정리 

1. 전체 트윗 갖고오기 Get /tweets
2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username
3. 특정 트윗 조회 Get /tweets/:id
4. 새로운 트윗 생성 POST /tweets
5. 트윗 삭제 DELETE /tweets/:id
6. 트윗 수정 PUT /tweets/:id
*/

export function getTweets(req, res) {
  // username 유뮤 -> username 유? 해당 tweet만 가져오고, 무? 전체 tweet을 조회
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUserName(username)
    : tweetRepository.getAll();
  res.status(200).json(data);
}

export function getTweet(req, res) {
  const id = req.params.id;
  const tweet = tweetRepository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function createTweet(req, res) {
  // 필수 데이터 : text, name, username
  const { text, name, username } = req.body;
  const tweet = tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res) {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    // 업데이트 하는 부분
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function deleteTweet(req, res) {
  const id = req.params.id;
  tweetRepository.remove(id);

  res.status(204).send("해당 트윗이 삭제되었습니다.");
}
