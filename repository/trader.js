const kafkaConfig = require('../config/kafkaConfig');
const kafkaService = require('../data-access/kafkaService').getInstance();
const mongoService = require('../data-access/mongodbService');


function handleNewTrader() {
    // TODO
}

function handleNewCoin(coinString) {
    // TODO
}

function handleNewCooperationRing() {
    // TODO
}

function handleNewFractalRing() {
    // TODO
}

class Trader {
    static startListening() {
        kafkaService.listen(kafkaConfig.topics.TRADERS, handleNewTrader);
        kafkaService.listen(kafkaConfig.topics.COINS, handleNewCoin);
        kafkaService.listen(kafkaConfig.topics.COOPERATION_RINGS, handleNewCooperationRing);
        kafkaService.listen(kafkaConfig.topics.FRACTAL_RINGS, handleNewFractalRing);
    }

    static async getIdForNewTrader() {
        const db = await mongoService.connect();
        console.log(db);
        // return (await kafkaService.getMaxTraderIdFromTopic()) + 1;
    }

    static async broadcastNewTraderId(id) {
        await kafkaService.sendMessage(kafkaConfig.topics.TRADER_IDS, id.toString(), id.toString());
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
