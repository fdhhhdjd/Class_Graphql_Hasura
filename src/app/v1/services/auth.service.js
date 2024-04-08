class AuthService {
  async pub() {
    const data = {
      id: "id",
      name: "name",
    };
    return data;
  }
  async login() {
    const data = {
      id: "id",
      name: "name",
    };
    return data;
  }
  async signup(data) {
    return data;
  }
}

module.exports = new AuthService();
