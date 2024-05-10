const mongoose = require('mongoose');


const coinSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    amountBasedOnOneUnit: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    nextInCooperationRing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin',
    },
    prevInCooperationRing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin',
    },
}, {timestamps: true});

const Coin = mongoose.model('Coin', coinSchema);
module.exports = Coin;
