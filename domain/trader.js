const {v4: uuidv4} = require('uuid');
const Verifier = require('./verifier');
const Validator = require('../util/validator');
const coinStatus = require('../config/coinStatus');
const coinType = require('../config/coinType');
const services = require('../config/services.json');
const Coin = require('./models/Coin');
const CooperationRing = require('./models/CooperationRing');
const FractalRing = require('./models/FractalRing');
const TraderRepository = require('../repository/trader');


class Trader {
    constructor(id) {
        this.id = id;
        this.balance = 0;
        this.verifier = new Verifier();
    }

    static getTraderId() {
        return uuidv4();
    }

    printTradersInfo() {
        console.log(this);
    }

    createCoin(type, serviceName) {
        try {
            Validator.checkPossibleValue(type, Object.values(coinType));
            Validator.checkPossibleValue(serviceName, services.map(service => service.name));
            console.log(`creating coin with type ${type} and service ${serviceName}...`);
            const coin = new Coin(
                this.id,
                serviceName,
                type,
            );
            TraderRepository.saveCoin(coin.toDB());
        } catch (error) {
            console.log("Could not create the coin:", error);
        }
    }

    createCooperationRing() {
        console.log(`creating cr`);
        // TODO
    }

    createFractalRing() {
        console.log(`creating fr`);
        // TODO
    }
}

module.exports = Trader;
