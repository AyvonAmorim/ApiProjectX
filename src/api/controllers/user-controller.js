const userService = require("../services/user-services");
const multer = require('multer');

// Criar Usuário
const CreateUser = async (req, res) => { 
	try{
	const { nome, sobrenome, email, senha, AdmAccess, client_id, ActiveFarms} = req.body;

	const login = nome + '.' + sobrenome;
	console.log(login)
	const img = req.file.path;

	if (!nome || !sobrenome || !email || !senha || !client_id || !AdmAccess) {
        return res.status(400).send({ mensagem: "Envie todos os campos" });
    }

	const user = await userService.createUser(nome, sobrenome, login, email, senha, client_id, AdmAccess, img);

	if (!user) {
		return res.status(400).send({ message: "Error creating User" });
	}

	res.status(201).send({
		message: "Usuário criado com sucesso",
		user: {
			id: user._id,
			nome,
			email,
		},
	});
	} catch (err) {
		res.status(500).send({message: err.message})
	}
};

module.exports = {
	CreateUser,
};
