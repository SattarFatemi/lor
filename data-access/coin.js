const mongoose = require('mongoose');
const Coin = require('../models/coin');


class CoinDataAccess {
    static async insert(coin) {
        try {
            const newCoin = new Coin({
                ownerId: coin.ownerId,
                amountBasedOnOneUnit: coin.amountBasedOnOneUnit,
                status: coin.status,
                serviceName: coin.serviceName,
            });
            await Coin.insertMany([newCoin]);
        } catch (error) {
            console.error('Error inserting coin:', error);
        }
    }
}

module.exports = CoinDataAccess;
