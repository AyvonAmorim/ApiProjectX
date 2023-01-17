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

//Consulta a lista de Pastos de acordo com o ID de retiro recebido
const ListByRetiro = async (req, res) => {
	const retiro_id = req.params.retiro_id;

	if (!retiro_id) {
		return res.status(400).send({
			mensagem: 'Falha na consulta',
		});
	}

	try {
		const list = await PastoService.listPastoByRetiroId(retiro_id);
		return res.status(200).send(list);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({
			message:
				'Desculpe, parece que houve um problema ao tentar consulta a lista de retiros. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico se o problema persistir.',
		});
	}
};

//Consulta a lista de pastos de acordo com o ID da fazenda
const ListByFarm = async (req, res) => {
	const farm_id = req.params.farm_id;

	if (!farm_id) {
		return res.status(400).send({
			mensagem: 'Falha na consulta',
		});
	}

	try {
		const list = await PastoService.listPastoByFarmId(farm_id);
		return res.status(200).send(list);
	} catch (error) {
		return res.status(500).send({
			message:
				'Desculpe, parece que houve um problema ao tentar consulta a lista de retiros. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico se o problema persistir.',
		});
	}
};

module.exports = { CreatePasto, ListByRetiro, ListByFarm };
