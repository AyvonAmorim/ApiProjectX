const express = require("express");
const RetiroController = require("../api/controllers/retiro-controller");
const RetiroRouter = express.Router();

RetiroRouter.post("/", RetiroController.CreateRetiro);

module.exports = RetiroRouter;