const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const connectDatabase = require("./database/dbConnect");
const multer = require("multer");

//Import das Rotas
const rotaClient = require("./routes/client-routes");
const rotaUser = require("./routes/user-routes");
const rotaAuth = require("./routes/auth-routes");
const FarmRouter = require("./routes/farm-routes");

connectDatabase();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//http configs
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type"
	);

	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

//UPLOAD DE IMAGENS
const storagePerfil = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname +
				"-" +
				Date.now() +
				req.body.nome +
				"." +
				req.body.sobrenome +
				".jpg"
		);
	},
});
const uploadPerfil = multer({
	storage: storagePerfil,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
});

//ROUTES
app.use("/uploads", express.static("uploads"));
app.use("/client", rotaClient);
app.use("/user", uploadPerfil.single("img"), rotaUser);
app.use("/auth", rotaAuth);
app.use("/farm", FarmRouter);


// Tratamento de erro
app.use((req, res, next) => {
	const erro = new Error("Rota Não Encontrada");
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
