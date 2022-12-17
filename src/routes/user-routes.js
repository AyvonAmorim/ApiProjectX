const express = require("express");
const UserController = require("../api/controllers/user-controller");
const UserRouter = express.Router();

UserRouter.post("/", UserController.CreateUser)

module.exports = UserRouter;
