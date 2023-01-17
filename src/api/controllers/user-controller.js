const userService = require('../services/user-services');
const farmService = require('../services/farm-services');
const config = require('../../config/config');
const aws= require("aws-sdk")

const s3 = new aws.S3({
    accessKeyId: config.multerS3id,
    secretAccessKey: config.multerS3key,
	region: 'us-east-1'
});


// Criar Usuário
const CreateUser = async (req, res) => {
	try {
		const { nome, sobrenome, email, senha, AdmAccess, client_id, ActiveFarms } =
			req.body;

		const login = nome + '.' + sobrenome;
		const img = req.file.location;

		if (!nome || !sobrenome || !email || !senha || !client_id || !AdmAccess) {
			const params = {
				Bucket: 'api-projectx-hub',
				Key: req.file.originalname,
			};
			s3.deleteObject(params, function (err, data) {
				if (err) console.log(err, err.stack);
				else console.log('Deleted Successfully', data);
			});
			return res.status(400).send({ mensagem: 'Envie todos os campos' });
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
			const params = {
				Bucket: 'api-projectx-hub',
				Key: req.file.originalname,
			};
			s3.deleteObject(params, function (err, data) {
				if (err) console.log(err, err.stack);
				else console.log('Deleted Successfully', data);
			});
			return res.status(400).send({ message: 'Error creating User' });
		}

		res.status(201).send({
			message: 'Usuário criado com sucesso',
			user: nome,
		});
	} catch (err) {
		const params = {
			Bucket: 'api-projectx-hub',
			Key: req.file.originalname,
		};
		s3.deleteObject(params, function (err, data) {
			if (err) console.log(err, err.stack);
			else console.log('Deleted Successfully', data);
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
			return res.status(400).send({ mensagem: 'Consulta Invalida' });
		}

		const list = await userService.findByClient(client_id);

		if (!list[0]) {
			return res
				.status(404)
				.send({ message: 'CLIENTE NÃO POSSUI USUÁRIOS CADASTRADOS' });
		}

		return res.status(200).send(list);
	} catch (error) {
		res.status(500).send({ message: err.message });
	}
};

// Lista Acessos do usuário
const ListAdmAccess = async (req, res) => {
	try {
		const user_id = req.params.user_id;

		if (!user_id) {
			return res.status(400).send({ mensagem: 'Consulta Invalida' });
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
		const { ActiveFarms, user_id } = req.body;

		if (!ActiveFarms || !user_id) {
			return res.status(400).send({ mensagem: 'Consulta Invalida' });
		}

		const editado = await userService.updateFarmAccess(ActiveFarms, user_id);

		if (editado.matchedCount === 0) {
			return res.status(400).send({ mensagem: 'Edição Invalida' });
		}

		return res.status(200).send({ message: 'Acesso Editado' });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

//Recebe a Lista de Acesso verifica o nome de cada fazenda e retorna array com nome e ID
const ListAccessNames = async (req, res) => {
	try {
		const client_id = req.params.client_id;

		if (!client_id) {
			return res.status(400).send({ mensagem: 'Consulta Invalida' });
		}

		const accessList = await userService.findAdmAccess(client_id);

		accessList.index = [];

		for (const elemento of accessList.ActiveFarms) {
			if (elemento === null) {
				continue;
			}
			console.log(elemento)
			const fazenda = await farmService.findById(elemento);
			accessList.index.push(fazenda);
		}

		return res.status(200).send(accessList.index);
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message });
	}
};

module.exports = {
	CreateUser,
	ListUserNoAdm,
	ListAdmAccess,
	updateFarmAccess,
	ListAccessNames,
};
