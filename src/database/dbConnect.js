const mongoose = require("mongoose");
const config = require("../config/config");


const connectDatabase = () => {
	console.log("Aguarde a conexão");
	mongoose.set('strictQuery', true);
	
	mongoose
		.connect(
			config.database.uri,
			{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'ProjectFarm'}
		)
		.then(() => console.log("MongoDB Atlas Conectado"))
		.catch((error) => console.log(error));
};

module.exports = connectDatabase;
