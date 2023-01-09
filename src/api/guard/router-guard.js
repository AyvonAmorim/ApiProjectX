const authService = require('../services/auth-services');
const cache = require('memory-cache');

const Guard = async (req, res, next) => {
	try {
		const PreToken = req.headers['authorization'];
		const token = PreToken && PreToken.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Acesso Negado' });
		}

		const decodedToken = await authService.VerifyToken(token);

		if (decodedToken.exp - Date.now() / 100 < 3600) {
			decode = authService.DecodeToken(token);

			const onCache = cache.get(decode.id);

			if (!onCache) {
				onDataBase = await authService.GetRefreshToken(decode.id);
				if (onDataBase.refreshToken === decode.refreshToken) {
					NewToken = await authService.RefreshTokens(decode);
					res.setHeader('Authorization', `Bearer ${NewToken}`);
				}
			} else {
				if (onCache === decode.refreshToken) {
					NewToken = await authService.RefreshTokens(decode);
					res.setHeader('Authorization', `Bearer ${NewToken}`);
				}
			}
			next();
		}
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

module.exports = Guard;
