const express = require("express");
const FarmController = require("../api/controllers/farm-controller");
const FarmRouter = express.Router();

FarmRouter.post("/", FarmController.CreateFarm);
FarmRouter.get("/:client_id", FarmController.ListFarm);

module.exports = FarmRouter;