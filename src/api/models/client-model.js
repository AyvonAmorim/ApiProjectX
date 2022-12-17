const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true,
    },
    Documento: {
        type: String,
        required: true,
        unique: true,
    },
    ClientCode: {
        type: Number,
        required: true,
    },
    Status: { 
        type: Boolean,
        required: true,
    },
});

const Client = mongoose.model("Clientes", UserSchema);

module.exports = Client;
