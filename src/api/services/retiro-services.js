const Retiro = require("../models/retiro-model");

const createRetiro = (ret_name, farm_id, client_id) => Retiro.create({RetiroName: ret_name, client_id: client_id, farm_id: farm_id});

module.exports = {createRetiro}