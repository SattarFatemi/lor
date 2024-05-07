const mongoose = require('mongoose');


const traderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
}, {timestamps: true, _id: false});

const Trader = mongoose.model('Trader', traderSchema);
module.exports = Trader;
