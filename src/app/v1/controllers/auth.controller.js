//* IMPORT
const { SuccessResponse } = require("../../../cores/success.response");
const authService = require("../services/auth.service");

class LoginController {
  async login(_, res, ___) {
    new SuccessResponse({
      metadata: await authService.login(),
    }).send(res);
  }
  async signup(req, res, ___) {
    new SuccessResponse({
      metadata: await authService.signup(req.body),
    }).send(res);
  }
}

module.exports = new LoginController();
