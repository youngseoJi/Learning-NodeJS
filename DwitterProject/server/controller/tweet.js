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

export async function getTweets(req, res) {
  // username 유뮤 -> username 유? 해당 tweet만 가져오고, 무? 전체 tweet을 조회
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUserName(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}
