import * as userRepository from "./auth.js";
// MVC 중 "Model" 부분 "데이터 베이스" 역할
// 순수하게 데이터를 저장하고, 조회하는 역할을 하는 저장소

/**
 * {
  id: string,  // 트윗 async  텍스트
  createdAt: Date, // 트윗 생성 날짜
  name: string,  // 사용자 이름
  username: string,  // 사용자 닉네임 (아이디)
  url: string (optional) // 사용자 프로파일 사진 URL
} */

let tweets = [
  {
    id: "1",
    text: "첫 번째 트윗 1 / TEST",
    createdAt: new Date().toString(),
    // 유저 id를 갖고 유저 데이터베이스와 연동 -> 사용자의 정보를 조회 및 변경할수 있다.
    userId: "1",
  },
  {
    id: "2",
    text: "두 번째 트윗 2 / TEST",
    createdAt: new Date().toString(),
    userId: "2",
  },
];

/**  모델 함수명을 생성할때 tweet안적은 이유 "중복 제거"
 * tweetRepository  데이터를 관리하는 파일명이 이미 주어지기에 tweet이라는 데이터를 관리하는 파일이라는 것을 알 수 있기 때문에
 * tweet이라는 단어를 생략해도 된다.
 */

// 전체 트윗 조회
// export async function getAll() {
//   return Promise.all(
//     tweets.map(async (tweet) => {
//       console.log("getAll tweets", tweets);
//       const { username, name, url } = await userRepository.findById(
//         tweet.userId
//       );
//       console.log("getAll username", username);
//       console.log("getAll tweet.userId", tweet.userId);
//       return { ...tweet, username, name, url };
//     })
//   );
// }

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepository.findById(tweet.userId);
      if (!user) {
        console.log(`User not found for ID: ${tweet.userId}`);
        return { ...tweet, username: "Unknown", name: "Unknown", url: "" };
      }
      const { username, name, url } = user;
      return { ...tweet, username, name, url };
    })
  );
}
// 특정 유저 트윗 조회
export async function getAllByUserName(username) {
  // 모든 트윗을 조회한 후, username에 해당하는 트윗만 필터링
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

// 특정 트윗 조회

// export async function getById(id) {
//   const found = tweets.find((tweet) => tweet.id === id);
//   if (!found) {
//     return null;
//   }
//   const { username, name, url } = await userRepository.findById(found.userId);
//   return { ...found, username, name, url };
// }

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.findById(found.userId);
  if (!user) {
    console.log(`User not found for ID: ${found.userId}`);
    return { ...found, username: "Unknown", name: "Unknown", url: "" }; // Default values if user not found
  }
  const { username, name, url } = user;
  return { ...found, username, name, url };
}

// 새로운 트윗 생성
export async function create(text, userId) {
  // 데이터 모델 생성
  const newTweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [newTweet, ...tweets];

  return getById(newTweet.id);
}
export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
