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
            const savedCoin = await newCoin.save();
            return savedCoin._id;
        } catch (error) {
            console.error('Error inserting coin:', error);
            throw error;
        }
    }

    static async fetch(id) {
        try {
            const coin = await Coin.findById(id);
            if (!coin) {
                throw new Error('Coin not found');
            }
            return coin;
        } catch (error) {
            console.error('Error fetching coin:', error);
            throw error;
        }
    }
}

module.exports = CoinDataAccess;
