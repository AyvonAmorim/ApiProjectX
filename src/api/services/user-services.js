const User = require("../models/user-model");

const createUser = (
	name,
	sobrenome,
	login,
	email,
	senha,
	client_id,
	AdmAccess,
	img
) =>
	User.create({
		nome: name,
		sobrenome: sobrenome,
		login: login,
		email: email,
		senha: senha,
		client_id: client_id,
		AdmAccess: AdmAccess,
		ImgPerfil: img,
	});

const findByClient = (client_id) =>
	User.find({ client_id: client_id, AdmAccess: false }).select('-login').select('-client_id').select('-AdmAccess').select('-email').select('-ActiveFarms').select('-__v')
module.exports = {
	createUser,
	findByClient,
};
