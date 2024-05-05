const Verifier = require('./verifier');
const Coin = require('./models/Coin');
const CooperationRing = require('./models/CooperationRing');
const FractalRing = require('./models/FractalRing');


function getTraderId() {
    // TODO
}

class Trader {
    constructor() {
        this.id = getTraderId();
        this.verifier = new Verifier();
    }

    printTradersInfo() {
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
