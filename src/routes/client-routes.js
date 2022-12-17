const express = require("express");
const clientController = require("../api/controllers/client-controller");
const clientRouter = express.Router();

clientRouter.post("/", clientController.CreateClient)

module.exports = clientRouter;

