const PastoService = require('../services/pasto-services');

const CreatePasto = async (req, res) => {
	const { PastoName, client_id, farm_id, retiro_id } = req.body;

	if (!PastoName || !client_id || !farm_id || !retiro_id) {
		return res.status(400).send({
			mensagem:
				'Os seguintes campos são obrigatórios: PastoName, client_id, farm_id, retiro_id. Por favor, envie todos os campos.',
		});
	}

	try {
		const CheckDuplicidade = await PastoService.VerificaDuplicidade(
			PastoName,
			retiro_id
		);

		if (CheckDuplicidade) {
			return res.status(400).send({
				message:
					'Já existe um Pasto com o mesmo nome cadastrado neste retiro. Por favor, escolha outro nome ou retiro.',
			});
		}

		const CreatedPasto = await PastoService.createPasto(req.body);
		return res.status(201).send({
			message: 'Retiro criado com sucesso',
			name: CreatedPasto.PastoName,
		});
	} catch (error) {
		return res.status(500).send({
			message:
				'Desculpe, parece que houve um problema ao tentar criar o retiro. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico se o problema persistir.',
		});
	}
};

module.exports = { CreatePasto };
