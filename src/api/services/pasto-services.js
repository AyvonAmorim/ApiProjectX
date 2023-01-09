const Pasto = require('../models/pasto-model');

const createPasto = (body) => Pasto.create(body);

const VerificaDuplicidade = (PastoName, retiro_id) => Pasto.findOne({PastoName: PastoName, retiro_id: retiro_id});

module.exports = { createPasto, VerificaDuplicidade };
