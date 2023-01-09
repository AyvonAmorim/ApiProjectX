const mongoose = require('mongoose');

const PastoSchema = new mongoose.Schema({
	PastoName: {
		type: String,
		required: true,
	},
	client_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'clientes',
		required: true,
	},
	farm_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'fazendas',
		required: true,
	},
	retiro_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'retiro',
		required: true,
	},
});

const Pasto = mongoose.model('Pasto', PastoSchema);

module.exports = Pasto;
