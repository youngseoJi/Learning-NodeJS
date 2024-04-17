export default class TweetService {
  constructor(http) {
    this.http = http;
  }
  // 1. 전체 트윗 갖고오기
  // 2. 특정 유저 트윗 갖고 오기

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
    });
  }

  // 3. 새로운 트윗 생성
  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({
        text,
        username: "estell",
        name: "estell",
      }),
    });
  }

  // 4. 트윗 삭제
  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
    });
  }

  // 5. 트윗 수정 PUT
  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}
