const express = require('express');
const PastoController = require('../api/controllers/pasto-controller');
const PastoRouter = express.Router();

PastoRouter.post('/', PastoController.CreatePasto);

module.exports = PastoRouter;
