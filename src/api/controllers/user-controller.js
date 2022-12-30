const userService = require("../services/user-services");
const fs = require("fs");

// Criar Usuário
const CreateUser = async (req, res) => {
	try {
		const { nome, sobrenome, email, senha, AdmAccess, client_id, ActiveFarms } =
			req.body;

		const login = nome + "." + sobrenome;
		const img = req.file.path;

		if (!nome || !sobrenome || !email || !senha || !client_id || !AdmAccess) {
			fs.unlink(req.file.path, (err) => {
				if (err) {
					console.log(err);
				}
			});
			return res.status(400).send({ mensagem: "Envie todos os campos" });
		}

		const user = await userService.createUser(
			nome,
			sobrenome,
			login,
			email,
			senha,
			client_id,
			AdmAccess,
			img
		);

		if (!user) {
			fs.unlink(req.file.path, (err) => {
				if (err) {
					console.log(err);
				}
			});
			return res.status(400).send({ message: "Error creating User" });
		}

		res.status(201).send({
			message: "Usuário criado com sucesso",
			user: nome,
		});
	} catch (err) {
		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.log(err);
			}
		});
		console.log(err.message);
		res.status(500).send({ message: err.message });
	}
};

// Lista Usuários sem acesso administrativo.
const ListUserNoAdm = async (req, res) => {
	try {
		const client_id = req.params.client_id;

		if (!client_id) {
			return res.status(400).send({ mensagem: "Consulta Invalida" });
		}

		const list = await userService.findByClient(client_id);

		if (!list[0]) {
			return res
				.status(404)
				.send({ message: "CLIENTE NÃO POSSUI USUÁRIOS CADASTRADOS" });
		}

		return res.status(200).send(list);
	} catch (error) {
		res.status(500).send({ message: err.message });
	}
};

const ListAdmAccess = async (req, res) => {
	try {
		const user_id = req.params.user_id;

		if (!user_id) {
			return res.status(400).send({ mensagem: "Consulta Invalida" });
		}

		const AdmAccess = await userService.findAdmAccess(user_id);

		return res.status(200).send(AdmAccess.ActiveFarms);
	} catch (error) {
		res.status(500).send({ message: err.message });
	}
};

//Edita a lista de acesso as fazendas

const updateFarmAccess = async (req, res) => {
	try {
		const {ActiveFarms, user_id} = req.body

		if(!ActiveFarms || !user_id){
			return res.status(400).send({ mensagem: "Consulta Invalida" });
		}

		const editado = await userService.updateFarmAccess(ActiveFarms, user_id);

		if(editado.matchedCount === 0) {
			return res.status(400).send({ mensagem: "Edição Invalida" });
		}

		return res.status(200).send({message: 'Acesso Editado'});

	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

module.exports = {
	CreateUser,
	ListUserNoAdm,
	ListAdmAccess,
	updateFarmAccess,
};
