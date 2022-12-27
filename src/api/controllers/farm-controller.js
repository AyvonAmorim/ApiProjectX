const farmService = require("../services/farm-services");

//Criar Fazenda no DB
const CreateFarm = async (req, res) => {
	const { name, client_id } = req.body;

	if (!name || !client_id) {
		return res.status(400).send({ mensagem: "Envie todos os campos" });
	}
	try {
		const Created = await farmService.createFarm(name, client_id);

		return res
			.status(200)
			.send({ message: "Fazenda Criada Com Sucesso", name: name });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

//Listar Fazendas na tela
const ListFarm = async (req, res) => {
	const client_id = req.params.client_id;

	try {
		if (!client_id) {
			return res.status(400).send({ mensagem: "Envie o ID do cliente" });
		}

		const list = await farmService.listFarm(client_id);

		if (!list[0]) {
			return res
				.status(404)
				.send({ mensagem: "CLIENTE NÃO POSSUI FAZENDAS CADASTRADAS" });
		}

		return res.status(200).send(list);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};

module.exports = {
	CreateFarm,
	ListFarm,
};
