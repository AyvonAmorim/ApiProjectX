const mongoose = require("mongoose");

const RetiroSchema = new mongoose.Schema({
    RetiroName: {
        type: String,
        required: true,
        unique: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes',
        required: true
    },
    farm_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fazendas',
        required: true
    }

})

const Retiro = mongoose.model('Retiro', RetiroSchema);

module.exports = Retiro;