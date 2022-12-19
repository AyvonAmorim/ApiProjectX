const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const UserSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true,
		trim: true,
	},
	sobrenome: {
		type: String,
		required: true,
		trim: true,
	},
	login: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: {
			validator: validator.isEmail,
			message: "Email invalido",
			isAsync: false,
		},
	},
	senha: {
		type: String,
		required: true,
		select: false,
	},
	client_id: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Clientes'
	},
	AdmAccess: {
		type: Boolean,
		required: true,
	},
	ActiveFarms: {
		type: Array,
		required: false,
	},
	ImgPerfil: {
		type: String,
		required: false
	}
});

UserSchema.pre("save", async function (next) {
	this.senha = await bcrypt.hash(this.senha, 10);
});

const User = mongoose.model("Usuário", UserSchema);

module.exports = User;
