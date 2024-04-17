export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  // 1. 전체 트윗 갖고오기 Get /tweets
  // 2. 특정 유저 트윗 갖고 오기 Get /tweets?username=:username

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  // // 3. 특정 트윗 조회 Get /tweets/:id
  async getTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  // 4. 새로운 트윗 생성 POST /tweets
  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        username: "estell",
        name: "estell",
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  }

  // 5. 트윗 삭제 DELETE /tweets/:id
  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 204) {
      throw new Error("Tweet not found");
    }
  }
  // 6. 트윗 수정 PUT /tweets/:id
  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
