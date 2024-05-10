const kafkaConfig = require('../config/kafkaConfig');
const kafkaService = require('../data-access/kafkaService').getInstance();
const TraderDA = require('../data-access/trader');
const CoinDA = require('../data-access/coin');


function handleNewTrader(traderString) {
    console.log('New trader detected:', traderString);
    TraderDA.insert(JSON.parse(traderString));
}

function handleNewCoin(coinString) {
    console.log('New coin detected:', coinString);
    CoinDA.insert(JSON.parse(coinString))
}

function handleNewCooperationRing(cooperationRingString) {
    // TODO
}

function handleNewFractalRing(fractalRingString) {
    // TODO
}

class Trader {
    static startListening() {
        kafkaService.listen([
            {
                topic: kafkaConfig.topics.TRADERS,
                callback: handleNewTrader
            },
            {
                topic: kafkaConfig.topics.COINS,
                callback: handleNewCoin
            },
            {
                topic: kafkaConfig.topics.COOPERATION_RINGS,
                callback: handleNewCooperationRing
            },
            {
                topic: kafkaConfig.topics.FRACTAL_RINGS,
                callback: handleNewFractalRing
            },
        ]);
    }

    static async saveCoin(coin) {
        return CoinDA.insert(coin);
    }

    static async saveCooperationRing(cooperationRing) {
        return CooperationRingDA.insert(cooperationRing);
    }

    static async broadcastNewTrader(trader) {
        await kafkaService.sendMessage(kafkaConfig.topics.TRADERS, trader.id.toString(), JSON.stringify(trader));
    }

    static async broadcastNewCoin(coin) {
        await kafkaService.sendMessage(kafkaConfig.topics.COINS, coin._id.toString(), JSON.stringify(coin));
    }

    static async broadcastNewCooperationRing(cooperationRing) {
        await kafkaService.sendMessage(kafkaConfig.topics.COOPERATION_RINGS, cooperationRing.id, cooperationRing);
    }

    static async sendMessageToTrader(traderId, message) {
        await kafkaService.sendMessageToTrader(traderId, message);
    }
}

module.exports = Trader;
