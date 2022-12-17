const Client = require("../models/client-model");

const createClient = (Nome, Document, ClientCode, Status) => Client.create({Nome: Nome, Documento: Document, ClientCode: ClientCode, Status: Status});

const CountClient = () => Client.count();


module.exports = {
	createClient,
    CountClient,
};