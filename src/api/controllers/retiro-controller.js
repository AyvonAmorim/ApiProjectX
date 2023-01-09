const retiroService = require('../services/retiro-services');
const cache = require('memory-cache');

//Criar Retiro no BD
const CreateRetiro = async (req, res) => {
	const { retName, client_id, farm_id } = req.body;

	//Verifica se todos os campos obrigatorios foram preenchidos
	if (!retName || !client_id || !farm_id) {
		return res.status(400).send({ mensagem: 'Envie todos os campos' });
	}

	try {
		//Cria um novo retiro
		const Created = await retiroService.createRetiro(
			retName,
			farm_id,
			client_id
		);

		//envia a mensagem de sucesso
		return res
			.status(200)
			.send({ message: 'Retiro criado com sucesso', name: Created.RetiroName });
	} catch (error) {
		// trata qualquer erro que ocorra durante o processo de criação do novo retiro.
		return res.status(500).send({
			mensagem:
				'Ocorreu um erro ao criar o retiro. Por favor, tente novamente mais tarde.',
		});
	}
};

const FindRetiroList = async (req, res) => {
	const farm_id = req.params.farm_id;

	if (!farm_id) {
		return res.status(400).send({ mensagem: 'Consulta Invalida' });
	}

	try {
		const RetiroList = await retiroService.getRetiroByFarmID(farm_id);

		return res.status(200).send(RetiroList);
	} catch (error) {
		return res.status(500).send({
			mensagem:
				'Ocorreu um erro ao consultar a lista de retiros. Por favor, tente novamente mais tarde.',
		});
	}
};

module.exports = { CreateRetiro, FindRetiroList };
