const express = require('express');
const PastoController = require('../api/controllers/pasto-controller');
const PastoRouter = express.Router();

PastoRouter.post('/', PastoController.CreatePasto);
PastoRouter.get('/byretiro/:retiro_id', PastoController.ListByRetiro);
PastoRouter.get('/byfarm/:farm_id', PastoController.ListByFarm);

module.exports = PastoRouter;
