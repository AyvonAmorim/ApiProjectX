const User = require("../models/user-model");

const createUser = (name, sobrenome, login, email, senha, client_id, AdmAccess, img) =>
	User.create({nome: name, sobrenome: sobrenome, login: login, email: email, senha: senha, client_id: client_id, AdmAccess: AdmAccess, ImgPerfil: img});

module.exports = {
    createUser,
}