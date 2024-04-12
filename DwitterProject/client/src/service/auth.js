export default class AuthService {
  async login(username, password) {
    return {
      username: "estell",
      token: "abc1234",
    };
  }

  async me() {
    return {
      username: "estell",
      token: "abc1234",
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return {
      username: "estell",
      token: "abc1234",
    };
  }
}
