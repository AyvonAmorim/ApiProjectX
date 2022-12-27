const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
	FarmName: {
		type: String,
		required: true,
        unique: true,
	},
	Client_ID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clientes",
		required: true,
	},
});

const Farm = mongoose.model("Fazendas", FarmSchema);

module.exports = Farm;
