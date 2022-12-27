const Farm = require("../models/farm-model");

const createFarm = (FarmName, Client_ID) => Farm.create({FarmName: FarmName, Client_ID: Client_ID});

const listFarm = (Client_ID) => Farm.find({Client_ID: Client_ID})

module.exports = { createFarm, listFarm };
