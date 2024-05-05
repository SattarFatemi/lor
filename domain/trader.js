const Verifier = require('./verifier');

class Trader {
    constructor(id) {
        this.id = id;
        this.verifier = new Verifier();
    }

    printTradersInfo() {
        console.log(`trader info:\nid: ${this.id}`);
    }

    createCoin(service) {
        console.log(`creating coin with service ${service}...`);
        // TODO
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
