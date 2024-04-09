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
    console.log(data);
    return data;
  }
  async eventCron(data) {
    console.log('==== eventCron ====',data);
  }
}

module.exports = new AuthService();
