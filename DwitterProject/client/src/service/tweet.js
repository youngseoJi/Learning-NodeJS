export default class TweetService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  // async getTweets(username) {
  //   const query = username ? `?username=${username}` : "";
  //   return this.http.fetch(`/tweets${query}`, {
  //     method: "GET",
  //     headers: this.getHeaders(),
  //   });
  // }

  async getTweets(username) {
    try {
      const query = username ? `?username=${username}` : "";
      return this.http.fetch(`/tweets${query}`, {
        method: "GET",
        headers: this.getHeaders(),
      });
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
      throw error; // 오류를 재발생시켜 필요한 경우 상위 컴포넌트에서 처리할 수 있도록 함
    }
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    if (!token) {
      throw new Error("No token available");
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
