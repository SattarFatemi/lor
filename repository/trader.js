const kafkaConfig = require('../config/kafkaConfig');
const kafkaService = require('../data-access/kafkaService').getInstance();
const mongoService = require('../data-access/mongodbService');


function handleNewTrader(traderString) {
    console.log('New trader detected:', traderString);
}

function handleNewCoin(coinString) {
    // TODO
}

function handleNewCooperationRing(cooperationRingString) {
    // TODO
}

function handleNewFractalRing(fractalRingString) {
    // TODO
}

class Trader {
    static startListening() {
        kafkaService.listen(kafkaConfig.topics.TRADERS, handleNewTrader);
        kafkaService.listen(kafkaConfig.topics.COINS, handleNewCoin);
        kafkaService.listen(kafkaConfig.topics.COOPERATION_RINGS, handleNewCooperationRing);
        kafkaService.listen(kafkaConfig.topics.FRACTAL_RINGS, handleNewFractalRing);
    }

    static async broadcastNewTrader(trader) {
        await kafkaService.sendMessage(kafkaConfig.topics.TRADERS, trader.id.toString(), JSON.stringify(trader));
    }

    static async broadcastNewCoin(coin) {
        await kafkaService.sendMessage(kafkaConfig.topics.COINS, coin.id, coin);
    }

    static async broadcastNewCooperationRing(cooperationRing) {
        await kafkaService.sendMessage(kafkaConfig.topics.COOPERATION_RINGS, cooperationRing.id, cooperationRing);
    }

    static async sendMessageToTrader(traderId, message) {
        await kafkaService.sendMessageToTrader(traderId, message);
    }
}

module.exports = Trader;
