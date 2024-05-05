const kafkaConfig = require('../config/kafkaConfig');
const kafkaService = require('../data-access/kafkaService').getInstance();

class Trader {
    static async getIdForNewTrader() {
        return (await kafkaService.getMaxTraderIdFromTopic()) + 1;
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
