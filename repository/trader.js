const kafkaConfig = require('../config/kafkaConfig');


class Trader {
    constructor(kafka) {
        this.kafka = kafka;
    }

    broadcastNewCoin(coin) {
        this.kafka.sendMessage(kafkaConfig.topics.COINS, coin.id, coin);
    }

    broadcastNewCooperationRing(cooperationRing) {
        this.kafka.sendMessage(kafkaConfig.topics.COOPERATION_RINGS, cooperationRing.id, cooperationRing);
    }

    sendMessageToTrader(traderId, message) {
        this.kafka.sendMessageToTrader(traderId, message);
    }
}

module.exports = Trader;
