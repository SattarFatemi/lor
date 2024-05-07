const mongoose = require('mongoose');
const Trader = require('../models/trader');


class TraderDataAccess {
    static async insert(trader) {
        try {
            const newTrader = new Trader({
                id: trader.id,
            });
            await Trader.insertMany([newTrader]);
        } catch (error) {
            console.error('Error inserting trader:', error);
        }
    }
}

module.exports = TraderDataAccess;
