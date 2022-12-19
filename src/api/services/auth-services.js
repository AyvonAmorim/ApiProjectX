const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const getUserLogin = (login) => User.findOne({ login: login }).select("+senha");

//Gerar Token
const GenerateToken = (
	id,
	ImgPerfil,
	client_id,
	nome,
	sobrenome,
	email,
	AdmAccess,
	ActiveFarms
) =>
	jwt.sign(
		{
			id: id,
			ImgPerfil: ImgPerfil,
			client_id: client_id,
			nome: nome,
			sobrenome: sobrenome,
			email: email,
			AdmAccess: AdmAccess,
			ActiveFarms: ActiveFarms,
		},
		config.token,
		{ expiresIn: "1h" }
	);

const VerifyLogin = (token) => jwt.verify(token, config.token)


module.exports = {
	getUserLogin,
	GenerateToken,
	VerifyLogin,
};
