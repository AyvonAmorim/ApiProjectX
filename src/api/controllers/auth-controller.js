const AuthServices = require('../services/auth-services');
const bcrypt = require('bcryptjs');
const cache = require('memory-cache');

// Verifica os dados e retorna um token
const doLogin = async (req, res) => {
	const { login, senha } = req.body;

	if (!login || !senha) {
		return res.status(404).send({ message: 'Insira todos os campos' });
	}

	try {
		const user = await AuthServices.getUserLogin(login);

		if (!user) {
			return res.status(404).send({ message: 'Usuário Invalido' });
		}

		const senhaIsValid = bcrypt.compareSync(senha, user.senha);

		if (!senhaIsValid) {
			return res.status(400).send({ message: 'Senha ou Usuário Invalido' });
		}

		const refreshToken = AuthServices.GenerateRefreshToken(user);

		if (!refreshToken) {
			return res.status(500).send({ message: 'Erro ao gerar token' });
		}

		const SavedInBD = await AuthServices.updateRefreshToken(user, refreshToken);

		if (!SavedInBD) {
			return res
				.status(500)
				.send({ message: 'Erro ao salvar token no banco de dados' });
		}

		console.log(user.id);
		cache.put(user.id, refreshToken, 3600000);

		const token = AuthServices.GenerateToken(user, refreshToken);

		return res.send({ token });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

// Verifica o Token recebido no sistema
const VerifyLogin = async (req, res) => {
	const { token } = req.body;
	if (!token) {
		return res.status(404).send({ message: 'invalid signature' });
	}

	try {
		await AuthServices.VerifyToken(token);

		return res.status(200).send({ message: 'valid' });
	} catch (err) {
		return res.status(404).send({ message: err.message });
	}
};

module.exports = {
	doLogin,
	VerifyLogin,
};
