const dotenv = require('dotenv');

dotenv.config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
	token: process.env.JWT_SECRET,
	port: 3000,
	database: {
		uri: process.env.DB_URI,
	},
	AyvonPass: process.env.AYVON_ADMIN_PASS,
	multerS3id: process.env.SECRET_ACCESS_S3_ID,
	multerS3key: process.env.SECRET_ACCESS_S3_KEY,
};
