const {v4: uuidv4} = require('uuid');
const Verifier = require('./verifier');
const Validator = require('../util/validator');
const coinStatus = require('../config/coinStatus');
const coinType = require('../config/coinType');
const services = require('../config/services.js');
const Coin = require('./models/Coin');
const CooperationRing = require('./models/CooperationRing');
const FractalRing = require('./models/FractalRing');
const TraderRepository = require('../repository/trader');
const errors = require('../config/errors');


class Trader {
    constructor(id) {
        this.id = id;
        this.balance = Math.floor(Math.random() * 1000000);
        this.verifier = new Verifier();
    }

    static getTraderId() {
        return uuidv4();
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount;
    }

    printTradersInfo() {
        console.log(this);
    }

    async createCoin(type, serviceName) {
        Validator.checkPossibleValue(type, Object.values(coinType));
        Validator.checkPossibleValue(serviceName, services.map(service => service.name));
        const service = services.find(service => service.name === serviceName);
        Validator.checkEnoughBalanceForService(this, service);
        try {
            console.log(`creating coin with type ${type} and service ${serviceName}...`);
            this.withdraw(service.price);
            const coin = new Coin(
                this.id,
                serviceName,
                type,
            );
            await TraderRepository.saveCoin(coin.toDB());
        } catch (error) {
            console.log('could not create the coin.\nreverting balance changes...', error);
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
