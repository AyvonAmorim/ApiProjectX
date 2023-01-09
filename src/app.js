const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const connectDatabase = require('./database/dbConnect');
const multer = require('multer');
const cors = require('cors');

//Import das Rotas
const rotaClient = require('./routes/client-routes');
const rotaUser = require('./routes/user-routes');
const rotaAuth = require('./routes/auth-routes');
const FarmRouter = require('./routes/farm-routes');
const RetiroRouter = require('./routes/retiro-routes');
const PastoRouter = require('./routes/pasto-routes');

//Middleware Guard
const Guard = require('./api/guard/router-guard');

connectDatabase();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//http configs
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);

	res.setHeader('Access-Control-Expose-Headers', 'Authorization');
	next();
});

//UPLOAD DE IMAGENS
const storagePerfil = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname +
				'-' +
				Date.now() +
				req.body.nome +
				'.' +
				req.body.sobrenome +
				'.jpg'
		);
	},
});
const uploadPerfil = multer({
	storage: storagePerfil,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
});

app.use(cors());

//ROUTES
app.use('/uploads', express.static('uploads'));
app.use('/client', rotaClient);
app.use('/user', uploadPerfil.single('img'), rotaUser);
app.use('/auth', rotaAuth);
app.use('/farm', FarmRouter);
app.use('/retiro', Guard, RetiroRouter);
app.use('/pasto', Guard, PastoRouter);

// Tratamento de erro
app.use((req, res, next) => {
	const erro = new Error('Rota Não Encontrada');
	erro.status = 404;
	next(erro);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	return res.send({
		erro: {
			mensagem: error.message,
		},
	});
});

module.exports = app;
