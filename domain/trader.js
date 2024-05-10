const {v4: uuidv4} = require('uuid');
const sha3 = require('js-sha3');
const Verifier = require('./verifier');
const Validator = require('../util/validator');
const coinStatus = require('../config/coinStatus');
const coinType = require('../config/coinType');
const services = require('../config/services.js');
const errors = require('../config/errors');
const Coin = require('./models/Coin');
const CooperationRing = require('./models/CooperationRing');
const FractalRing = require('./models/FractalRing');
const TraderRepository = require('../repository/trader');
const CoinDA = require('../data-access/coin');
const CoinModel = require('../models/coin');


async function selectRandomCoinsBasedOnHash(selectedCoin) {
    // TODO
    // try {
    //     const hash = sha3.sha3_256(selectedCoin);
    //     const truncatedHash = hash.substring(0, 8);
    //     const hashInteger = parseInt(hash, 16);
    //     const randomCoin = await CoinModel.findOne({
    //         $expr: {
    //             $gte: [
    //                 {
    //                     $mod: [
    //                         {$toLong: {$toString: "$_id"}},
    //                         hashInteger
    //                     ]
    //                 },
    //                 0
    //             ]
    //         }
    //     });
    //     return randomCoin;
    // } catch (error) {
    //     console.log("selecting random coin", error);
    // }
}

function createCooperationRing(coins) {

}


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
            const savedCoinId = await TraderRepository.saveCoin(coin.toDB());
            const savedCoin = await CoinDA.fetch(savedCoinId);
            TraderRepository.broadcastNewCoin(savedCoin);
        } catch (error) {
            console.log('could not create the coin.\nreverting balance changes...', error);
            this.deposit(service.price);
        }
    }

    async createCooperationRing() {
        console.log(`creating cr`);
        const investorCoinId = ''; // TODO
        const coins = await selectRandomCoinsBasedOnHash(investorCoinId);
        
    }

    createFractalRing() {
        console.log(`creating fr`);
        // TODO
    }
}

module.exports = Trader;
