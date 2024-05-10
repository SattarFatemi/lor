const mongoose = require('mongoose');
const Coin = require('../models/coin');

class CoinDataAccess {
    static async insert(coin) {
        let newCoin;
        if (coin._id) {
            const fetchedCoin = await this.fetch(coin._id);
            if (!fetchedCoin) {
                newCoin = new Coin({
                    _id: coin._id,
                    ownerId: coin.ownerId,
                    amountBasedOnOneUnit: coin.amountBasedOnOneUnit,
                    status: coin.status,
                    type: coin.type,
                    serviceName: coin.serviceName,
                    nextInCooperationRing: coin.nextInCooperationRing,
                    prevInCooperationRing: coin.prevInCooperationRing,
                });
            } else {
                return fetchedCoin._id;
            }
        } else {
            newCoin = new Coin({
                ownerId: coin.ownerId,
                amountBasedOnOneUnit: coin.amountBasedOnOneUnit,
                status: coin.status,
                type: coin.type,
                serviceName: coin.serviceName,
                nextInCooperationRing: coin.nextInCooperationRing,
                prevInCooperationRing: coin.prevInCooperationRing,
            });
        }
        try {
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
            return coin;
        } catch (error) {
            console.error('Error fetching coin:', error);
            throw error;
        }
    }
}

module.exports = CoinDataAccess;
