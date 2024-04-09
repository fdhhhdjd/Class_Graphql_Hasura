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
    const  header = req.headers
    const { input } = req.body.input;
    new SuccessResponse({
      metadata: await authService.signup(input,header),
    }).send(res);
  }
  async eventCron(req, res, ___) {
    new SuccessResponse({
      metadata: await authService.eventCron(req.body.payload),
    }).send(res);
  }
}

module.exports = new LoginController();
