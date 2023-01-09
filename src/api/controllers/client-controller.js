const ClientService = require('../services/client-services');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');

// Criar Cadastro de Cliente
const CreateClient = async (req, res) => {
	const count = await ClientService.CountClient();
	let clientCode = count + 1000;

	try {
		const { name, document, status, AdminPass } = req.body;

		if (!name || !document || !status || !AdminPass) {
			return res.status(400).send({ mensagem: 'Envie todos os campos' });
		}

		const admPassValid = bcrypt.compareSync(AdminPass, config.AyvonPass);

		if (!admPassValid) {
			return res
				.status(400)
				.send({ mensagem: 'Senha de Administrador Invalida' });
		}

		const Client = await ClientService.createClient(
			name,
			document,
			clientCode,
			status
		);

		if (!Client) {
			return res
				.status(400)
				.send({ message: 'Erro ao Criar Cadastro de cliente' });
		}

		return res.status(201).send(Client);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	CreateClient,
};
