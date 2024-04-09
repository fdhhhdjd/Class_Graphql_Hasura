//* LIB
const express = require("express");

//* IMPORT
const loginController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../../../commons/helpers/asyncHandler");

const router = express.Router();

router.post("/login", asyncHandler(loginController.login));
router.post("/signup", asyncHandler(loginController.signup));
router.post("/event", asyncHandler(loginController.eventCron));

module.exports = router;
