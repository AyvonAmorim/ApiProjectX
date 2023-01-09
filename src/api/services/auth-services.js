const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const cache = require('memory-cache');

const getUserLogin = (login) => User.findOne({ login: login }).select('+senha');

//Gerar Token
const GenerateToken = (user, refreshToken) =>
	jwt.sign(
		{
			id: user.id,
			ImgPerfil: user.ImgPerfil,
			client_id: user.client_id,
			nome: user.nome,
			sobrenome: user.sobrenome,
			email: user.email,
			AdmAccess: user.AdmAccess,
			ActiveFarms: user.ActiveFarms,
			refreshToken: refreshToken,
		},
		config.token,
		{ expiresIn: '1h' }
	);

const GenerateRefreshToken = (user) =>
	jwt.sign({ _id: user.id }, config.token, { expiresIn: '1d' });

const updateRefreshToken = (user, refreshToken) =>
	User.findOneAndUpdate({ _id: user.id }, { refreshToken: refreshToken });

const VerifyToken = (token) => jwt.verify(token, config.token);

const DecodeToken = (token) => jwt.decode(token);

const GetRefreshToken = (id) => User.findById({ _id: id });

const RefreshTokens = async (decode) => {
	cache.del(decode.id);
	const refresh = await GenerateRefreshToken(decode);
	await updateRefreshToken(decode, refresh);
	cache.put(decode.id, refresh, 3600000);
	newToken = await GenerateToken(decode, refresh);

	return newToken;
};

module.exports = {
	getUserLogin,
	GenerateToken,
	VerifyToken,
	GenerateRefreshToken,
	updateRefreshToken,
	DecodeToken,
	GetRefreshToken,
	RefreshTokens,
};
