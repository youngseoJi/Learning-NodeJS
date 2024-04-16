// MVC 중 "Model" 부분 "데이터 베이스" 역할
// 순수하게 데이터를 저장하고, 조회하는 역할을 하는 저장소

/**
 * {
  id: string,  // 트윗 아이디
  text: string,  // 트윗 텍스트
  createdAt: Date, // 트윗 생성 날짜
  name: string,  // 사용자 이름
  username: string,  // 사용자 닉네임 (아이디)
  url: string (optional) // 사용자 프로파일 사진 URL
} */

let tweets = [
  {
    id: "1",
    text: "첫 번째 트윗",
    createdAt: "2022-01-01T00:00:00Z",
    name: "Alice",
    username: "alice",
    url: "https://example.com/profile/alice.png",
  },
  {
    id: "2",
    text: "두 번째 트윗",
    createdAt: "2022-01-02T002:00:00Z",
    name: "Bob",
    username: "bob",
    url: "https://example.com/profile/bob.png",
  },
];

/**  모델 함수명을 생성할때 tweet안적은 이유 "중복 제거"
 * tweetRepository  데이터를 관리하는 파일명이 이미 주어지기에 tweet이라는 데이터를 관리하는 파일이라는 것을 알 수 있기 때문에
 * tweet이라는 단어를 생략해도 된다.
 */

// 전체 트윗 조회
export function getAll() {
  return tweets;
}

// 특정 유저 트윗 조회
export function getAllByUserName(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

// 특정 트윗 조회
export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

// 새로운 트윗 생성
export function create(text, name, username) {
  // 데이터 모델 생성
  const newTweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [newTweet, ...tweets];
}

// 트윗 수정
export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return text;
}

// 트윗 삭제
export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
