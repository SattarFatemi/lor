const Verifier = require('./verifier');
const Coin = require('./models/Coin');
const CooperationRing = require('./models/CooperationRing');
const FractalRing = require('./models/FractalRing');
const TraderRepository = require('../repository/trader');
const {v4: uuidv4} = require('uuid');


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
        console.log(`trader info:\nid: ${this.id}`);
    }

    createCoin(type, serviceName) {
        // TODO validate type and service
        console.log(`creating coin with type ${type} and service ${serviceName}...`);
        const coin = new Coin(
            1,
            this.id,
            serviceName,
            type,
        );
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
