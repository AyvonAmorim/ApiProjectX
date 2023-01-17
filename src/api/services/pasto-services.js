const Pasto = require('../models/pasto-model');

const createPasto = (body) => Pasto.create(body);

const VerificaDuplicidade = (PastoName, retiro_id) =>
	Pasto.findOne({ PastoName: PastoName, retiro_id: retiro_id });

const listPastoByRetiroId = (retiro_id) => Pasto.find({ retiro_id: retiro_id });

const listPastoByFarmId = (farm_id) => Pasto.find({ farm_id: farm_id });

module.exports = {
	createPasto,
	VerificaDuplicidade,
	listPastoByRetiroId,
	listPastoByFarmId,
};
