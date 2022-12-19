const express = require("express");
const AuthController = require("../api/controllers/auth-controller");
const AuthRouter = express.Router();

AuthRouter.post("/login", AuthController.doLogin);
AuthRouter.post("/login/verifica", AuthController.VerifyLogin);

module.exports = AuthRouter;