const mongoose = require('mongoose');


const traderSchema = new mongoose.Schema({

});

const Trader = mongoose.model('Trader', traderSchema);
module.exports = Trader;
